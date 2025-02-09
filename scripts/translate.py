import os
import json
import torch
from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer

# Paths
I18N_FOLDER = "../packages/client/src/assets/i18n"
BASE_LANG = "en"
BASE_FILE = f"{I18N_FOLDER}/{BASE_LANG}.json"

# Load translation model
MODEL_NAME = "facebook/m2m100_418M"
tokenizer = M2M100Tokenizer.from_pretrained(MODEL_NAME)
model = M2M100ForConditionalGeneration.from_pretrained(MODEL_NAME)

def load_json(file_path):
    """Loads a JSON file."""
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(file_path, data):
    """Saves a JSON object to a file."""
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def translate_text(text, src_lang, tgt_lang):
    """Translates text using the AI model."""
    tokenizer.src_lang = src_lang
    encoded_text = tokenizer(text, return_tensors="pt")

    with torch.no_grad():
        generated_tokens = model.generate(**encoded_text, forced_bos_token_id=tokenizer.get_lang_id(tgt_lang))

    return tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0]

def update_translations():
    base_data = load_json(BASE_FILE)

    for file in os.listdir(I18N_FOLDER):
        if file.endswith(".json") and file != f"{BASE_LANG}.json":
            lang_code = file.removesuffix(".json")  # Keeps full language code, including dialects
            file_path = os.path.join(I18N_FOLDER, file)
            trans_data = load_json(file_path)

            new_entries = []

            def check_and_translate(base_obj, trans_obj, path=""):
                """Recursively check and translate missing keys."""
                for key, value in base_obj.items():
                    full_path = f"{path}.{key}" if path else key

                    if isinstance(value, dict):
                        trans_obj.setdefault(key, {})
                        check_and_translate(value, trans_obj[key], full_path)
                    else:
                        if key not in trans_obj:
                            translated_text = translate_text(value, BASE_LANG, lang_code)
                            print(f"Translated {key}: {translated_text}")
                            trans_obj[key] = translated_text
                            new_entries.append(full_path)

            check_and_translate(base_data, trans_data)

            if new_entries:
                print(f"Updated {file} with new translations:")
                for entry in new_entries:
                    print(f"  - {entry}")
                save_json(file_path, trans_data)

if __name__ == "__main__":
    update_translations()
