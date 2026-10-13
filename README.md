# ZipCaptions
**Free Speech-To-Text In Your Browser**

ZipCaptions is a platform that allows users to generate text from a given audio source, using only your web browser. Zip Captions has never been and never will be pay-to-play: we believe that accessibility needs to be freely available.

## Support
We accept monetary support through [Patreon](https://patreon.com/zipcaptions). Any contributions are put toward offsetting the operating costs (such as they are) or implementing new features. We operate without any formal financial backers or sponsorhips, and have no corporate backers in any form. This is an entirely community-supported endeavour.

We also welcome bug reports, feature requests, and conversation in our Discord server&mdash;the more feedback we get, the better the tool will be for everyone.

## Language Support
The interface is available in several languages. Under `Settings` you choose the **spoken language** (what the microphone is listening for, including regional dialects) and, separately, an optional **interface language**. By default the interface follows the spoken language.

## Live Translation (experimental)
ZipCaptions can translate captions into another language while you speak. Translation runs **on your device**, using the browser's built-in [Translator API](https://developer.chrome.com/docs/ai/translator-api): translated text is never sent to a server.

* **Requirements:** a desktop browser that provides the Translator API (Chrome 138 or later, Edge 148 or later). On other browsers and on phones the option is shown as unavailable and captions work as usual. The browser downloads a small language model the first time you use a language pair; use the download button in `Settings` > `Translation` to prepare a pair ahead of time. Chrome manages the downloaded models and may remove them to free space.
* **Privacy:** speech recognition is separate from translation. Depending on the speech engine you choose, audio may be processed in the cloud, as before. Only the translation step is on-device. Transcripts keep the original text only.
* **Settings:** turn translation on, pick the translation language, and swap the spoken and translation languages with one click (also from the caption view and the sidebar).
* **Layouts:** show the original, the translation, or both in two panes, stacked or side by side. The panes can be swapped.
* **Picture-in-Picture:** the floating window shows the original, the translation or both, and has a small switch inside the window to change it.
* **Broadcasting:** when a broadcaster translates, viewers receive both the original and the translated captions, so viewers on devices that cannot translate (including phones) can still read the translation. A viewer can also translate on their own device into a language the broadcaster is not offering.
* **OBS Studio:** under `Settings` > `OBS Studio` choose whether OBS receives the original or the translated captions. OBS stream captions use the CEA-608 format, which has no characters for Arabic, Chinese, Japanese, Korean, Hindi, Russian or Ukrainian. OBS shows nothing for those languages, and the settings page says so. If translation is off, or the device cannot translate, OBS receives the original captions.

# Contributing
Contributions are welcome! Anything from bug reports to feature enhancements to pull requests are welcomed and encouraged. If you have questions about using the application, we recommend visiting the [Discord Server](https://discord.gg/Swe2JeHnPc) and asking your questions there.

## Languages
ZipCaptions supports multiple languages to the best of our ability. If you notice a spelling or grammatical issue, feel free to adjust the text and submit a pull request (guidelines below). For additional language support, you are welcome to create a new translation file.

### Translating the interface
Interface text lives in one JSON file per language in `packages/client/src/assets/i18n`. Add new text to `en.json` first (one sentence per key, and avoid `{{placeholders}}`), then fill the other languages with `scripts/translate.py`. The script only adds keys that are missing from a language, so it never overwrites an existing translation.

```
cd scripts
export TRANSLATE_API_BASE=http://localhost:8000/v1    # any OpenAI-compatible chat server
export TRANSLATE_MODEL=<model name>
export TRANSLATE_API_KEY=<token>                      # only if the server needs one
python3 translate.py                                  # fill every missing key
python3 translate.py --lang fr,es                     # only these languages
python3 translate.py --retranslate BUTTONS.accept     # redo specific keys, in every language
python3 translate.py --dry-run                        # list what would be translated
```

* The default backend is a language model behind an OpenAI-compatible API (for example a local vLLM or Ollama server). It reads the context in `scripts/translation-context.json` (a note about what a string means in the interface) and the preferred terms in `scripts/translation-glossary.json` (for example the word for "captions" in each language). When a string comes out wrong, add a note or a term there and run `--retranslate` for that key, rather than editing the translation by hand.
* `python3 translate.py --backend m2m` uses a small offline model (`pip install torch transformers sentencepiece`). It needs no server but mistranslates words that depend on context, such as "captions", so avoid it for anything user-facing.
* The output is machine translation. Have a native speaker review new text before a release, and keep the committed files' formatting (two-space indent, no trailing newline in the non-English files).

## Reporting Bugs
Before reporting a bug, please search for any open issues in the GitHub repository, and add your information there if one already exists. When creating a bug report, please include as many details as possible (e.g. the device being used, browser and version, etc). If you use ZipCaptions on more than one device, check if the problem is isolated to one or the other, or if it affects both. Consider answering the following questions:
* Can you reproduce the problem consistently, or does it come and go?
* Does the problem represent a change from something that used to work in the past?
* What do you expect to happen, and what actually happens when the bug appears?

## Suggesting Improvements
We welcome feature requests or suggestions for added functionality. There are a few guiding principles for ZipCaptions, to which features must adhere:

1. The application may not collect any personal information, or include 3rd party libraries which do so.
1. The feature must ensure that it adds to the accessibility first ethos of the platform. Designs must include accessibility features and allow all users easy access.
1. The feature must be able to be provided for zero cost (or as near zero as possible).
1. Functionality must be implemented in the client-side application wherever possible.
1. All new text must include the required translations to all language files included in the `assets/i18n` folder. Generate them with `scripts/translate.py` (see [Translating the interface](#translating-the-interface)), or with another translation tool, and have the result reviewed by a speaker of the language wherever possible.