#!/usr/bin/env python3
"""Fills missing keys in the non-English locale files from en.json.

Only keys that are missing from a locale are translated (use --retranslate to redo given keys), so
existing translations are never touched. Output is machine translation: have a native speaker review
new strings before a release.

Backends
  llm   (default) Any OpenAI-compatible chat-completions server, for example a local vLLM or Ollama.
        TRANSLATE_API_BASE   base URL, e.g. http://localhost:8000/v1   (required)
        TRANSLATE_MODEL      model name                                 (required)
        TRANSLATE_API_KEY    bearer token                               (optional)
        TRANSLATE_WORKERS    parallel requests, default 6               (optional)
  m2m   Facebook M2M100 418M, run locally with transformers and torch. Works offline, but it
        mistranslates context-dependent words such as "captions". Needs: pip install torch transformers sentencepiece

Examples
  python3 translate.py                                       # fill missing keys in every locale
  python3 translate.py --lang fr,es                          # only these locales
  python3 translate.py --retranslate BUTTONS.accept,LABELS.menu
  python3 translate.py --dry-run                             # list what would be translated
"""
import argparse
import concurrent.futures as futures
import json
import os
import re
import sys
import urllib.error
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
I18N_FOLDER = os.path.join(HERE, "..", "packages", "client", "src", "assets", "i18n")
BASE_LANG = "en"
BASE_FILE = os.path.join(I18N_FOLDER, f"{BASE_LANG}.json")
GLOSSARY_FILE = os.path.join(HERE, "translation-glossary.json")
CONTEXT_FILE = os.path.join(HERE, "translation-context.json")

LANGUAGE_NAMES = {
    "fr": "French", "es": "Spanish", "de": "German", "it": "Italian", "pt": "Portuguese",
    "id": "Indonesian", "pl": "Polish", "uk": "Ukrainian", "ar": "Arabic", "zh": "Simplified Chinese",
}

SYSTEM_PROMPT = (
    "You translate short user-interface strings for Zip Captions, a web app that shows live captions "
    "(the on-screen text of what is being said, like subtitles, for accessibility) and can translate them. "
    "Translate the English string into {language}.\n"
    "Rules:\n"
    "- Use the word {language}-speaking users expect for 'captions' (subtitles or closed captions). Never a "
    "word for photographs, hoods, capsules or recordings.\n"
    "- Keep brand and technical names unchanged: Zip Captions, ZipCaptions, OBS, OBS Studio, CEA-608, "
    "Picture-in-Picture, Azure, Chrome, GitHub, Discord, PeerJS.\n"
    "- Keep the register of the string: short and imperative for buttons, a noun phrase for labels, a full "
    "sentence for sentences.\n"
    "- If the string names a language, translate the language's name into {language} and keep any "
    "parenthesised native name as it is.\n"
    "- Translate every word. Do not drop qualifiers such as 'only' or 'same as', and do not add words.\n"
    "- Keep punctuation, capitalisation style, line breaks and any {{placeholders}} exactly.\n"
    "- Do not add explanations or quotes. Reply with the translation only."
)


def load_json(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(file_path, data):
    # No trailing newline, like the committed locale files
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def is_url(value):
    url_pattern = re.compile(r"^(https?|ftp)://[^\s/$.?#].[^\s]*$", re.IGNORECASE)
    return isinstance(value, str) and bool(url_pattern.match(value))


# A key's path is a tuple of its segments: some keys (such as "1.1" under PRIVACY) contain a dot themselves
def flatten(obj, prefix=()):
    for key, value in obj.items():
        path = prefix + (key,)
        if isinstance(value, dict):
            yield from flatten(value, path)
        else:
            yield path, value


def dotted(path):
    return ".".join(path)


def get_path(obj, path):
    for part in path:
        if not isinstance(obj, dict) or part not in obj:
            return None
        obj = obj[part]
    return obj


def set_path(obj, path, value):
    for part in path[:-1]:
        obj = obj.setdefault(part, {})
    obj[path[-1]] = value


# ---------------------------------------------------------------- validation

def problems(source, translated):
    """Reasons a translation can't be trusted; empty when it looks fine."""
    found = []
    if not translated or not translated.strip():
        return ["empty"]
    if sorted(re.findall(r"\{\{.*?\}\}", source)) != sorted(re.findall(r"\{\{.*?\}\}", translated)):
        found.append("placeholders differ")
    if source.count("\n") != translated.count("\n"):
        found.append("line breaks differ")
    if len(translated) > max(40, len(source) * 4):
        found.append("much longer than the source")
    return found


# ---------------------------------------------------------------- backends

class LlmBackend:
    def __init__(self, glossary, context):
        self.context = context
        self.base = os.environ.get("TRANSLATE_API_BASE", "").rstrip("/")
        self.model = os.environ.get("TRANSLATE_MODEL", "")
        self.key = os.environ.get("TRANSLATE_API_KEY", "")
        if not self.base or not self.model:
            sys.exit("The llm backend needs TRANSLATE_API_BASE and TRANSLATE_MODEL (see --help), "
                     "or use --backend m2m.")
        self.glossary = glossary
        self.workers = int(os.environ.get("TRANSLATE_WORKERS", "6"))

    def _system(self, lang, text_to_translate, key):
        text = SYSTEM_PROMPT.format(language=LANGUAGE_NAMES.get(lang, lang))
        # Only terms that occur in this string, so a term can't leak into strings that don't contain it
        terms = [f"'{english}' -> '{by_lang[lang]}'" for english, by_lang in self.glossary.items()
                 if not english.startswith("_") and lang in by_lang
                 and re.search(rf"\b{re.escape(english)}s?\b", text_to_translate, re.I)]
        if terms:
            text += "\nGlossary, use these terms exactly: " + "; ".join(terms) + "."
        note = self.context.get(key)
        if note:
            text += "\nContext for this string: " + note
        return text

    def _post(self, body):
        headers = {"Content-Type": "application/json"}
        if self.key:
            headers["Authorization"] = f"Bearer {self.key}"
        request = urllib.request.Request(self.base + "/chat/completions", data=json.dumps(body).encode(), headers=headers)
        with urllib.request.urlopen(request, timeout=300) as response:
            return json.load(response)

    def translate(self, text, lang, key=""):
        body = {
            "model": self.model, "temperature": 0.2, "max_tokens": 400,
            "messages": [{"role": "system", "content": self._system(lang, text, key)}, {"role": "user", "content": text}],
            # vLLM option that skips the reasoning phase of thinking models; servers that don't know it may refuse it
            "chat_template_kwargs": {"enable_thinking": False},
        }
        try:
            result = self._post(body)
        except urllib.error.HTTPError as err:
            if err.code != 400:
                raise
            body.pop("chat_template_kwargs")
            result = self._post(body)
        out = result["choices"][0]["message"]["content"]
        out = re.sub(r"<think>.*?</think>", "", out, flags=re.S).strip()
        if len(out) >= 2 and out[0] in "\"'«“" and out[-1] in "\"'»”" and text[0] not in "\"'«“":
            out = out[1:-1].strip()
        return out


class M2mBackend:
    workers = 1

    def __init__(self, _glossary, _context):
        import torch  # noqa: F401  (imported lazily: only this backend needs it)
        from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer
        name = "facebook/m2m100_418M"
        self.torch = torch
        self.tokenizer = M2M100Tokenizer.from_pretrained(name)
        self.model = M2M100ForConditionalGeneration.from_pretrained(name)

    def translate(self, text, lang, key=""):
        self.tokenizer.src_lang = BASE_LANG
        encoded = self.tokenizer(text, return_tensors="pt")
        with self.torch.no_grad():
            tokens = self.model.generate(**encoded, forced_bos_token_id=self.tokenizer.get_lang_id(lang))
        return self.tokenizer.batch_decode(tokens, skip_special_tokens=True)[0]


def translate_checked(backend, text, lang, key="", attempts=3):
    last = []
    for _ in range(attempts):
        try:
            out = backend.translate(text, lang, key)
        except Exception as err:  # noqa: BLE001  (network and model errors are retried, then reported)
            last = [f"request failed: {err}"]
            continue
        last = problems(text, out)
        if not last:
            return out, []
    return None, last


# ---------------------------------------------------------------- main

def update_translations(args):
    base_data = load_json(BASE_FILE)
    base_items = dict(flatten(base_data))
    glossary = load_json(GLOSSARY_FILE) if os.path.exists(GLOSSARY_FILE) else {}
    context = load_json(CONTEXT_FILE) if os.path.exists(CONTEXT_FILE) else {}
    forced = {k.strip() for k in args.retranslate.split(",") if k.strip()} if args.retranslate else set()
    unknown = [k for k in forced if k not in {dotted(p) for p in base_items}]
    if unknown:
        sys.exit(f"--retranslate: not keys of {BASE_LANG}.json: {', '.join(unknown)}")
    only = {c.strip() for c in args.lang.split(",") if c.strip()} if args.lang else None

    backend = None
    skipped = []
    for file in sorted(os.listdir(I18N_FOLDER)):
        if not file.endswith(".json") or file == f"{BASE_LANG}.json":
            continue
        lang = file.removesuffix(".json")
        if only and lang not in only:
            continue
        path = os.path.join(I18N_FOLDER, file)
        data = load_json(path)

        todo = []  # (key path, English value, is retranslation)
        for key, value in base_items.items():
            if dotted(key) in forced or get_path(data, key) is None:
                todo.append((key, value))
        if not todo:
            continue

        if args.dry_run:
            print(f"{file}: {len(todo)} to translate")
            for key, value in todo:
                print(f"  - {dotted(key)}: {value[:70]}")
            continue

        if backend is None:
            backend = (M2mBackend if args.backend == "m2m" else LlmBackend)(glossary, context)

        new_entries = []
        translatable = [(k, v) for k, v in todo if not is_url(v)]
        for key, value in todo:
            if is_url(value):
                set_path(data, key, value)  # URLs are copied, not translated
                new_entries.append(key)
        with futures.ThreadPoolExecutor(max_workers=backend.workers) as pool:
            results = list(pool.map(lambda item: translate_checked(backend, item[1], lang, dotted(item[0])), translatable))
        for (key, value), (out, why) in zip(translatable, results):
            if out is None:
                skipped.append((file, key, "; ".join(why)))
                continue
            set_path(data, key, out)
            new_entries.append(key)
            print(f"{lang} {dotted(key)}: {out}")

        if new_entries:
            print(f"Updated {file}:")
            for entry in new_entries:
                print(f"  - {dotted(entry)}")
            save_json(path, data)

    if skipped:
        print("\nNot translated (left missing, run again to retry):")
        for file, key, why in skipped:
            print(f"  {file} {dotted(key)}: {why}")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description="Fill missing keys in the locale files from en.json.",
                                     epilog=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--backend", choices=["llm", "m2m"], default="llm")
    parser.add_argument("--lang", help="comma separated locale codes to update, default all")
    parser.add_argument("--retranslate", help="comma separated dotted keys to translate again even if present")
    parser.add_argument("--dry-run", action="store_true", help="list what would be translated and change nothing")
    update_translations(parser.parse_args())


if __name__ == "__main__":
    main()
