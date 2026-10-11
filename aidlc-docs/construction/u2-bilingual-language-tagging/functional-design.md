# U2 — Language Pair Controls: Functional Design

**Status:** v3, decisions approved 2026-10-10 (§8)
**Folder name kept for history.** The unit was "Bilingual-locale language tagging". It was rescoped to **language pair controls**.

## 0. Rescope (human direction, 2026-10-10)

- **Detection parked:** automatic language detection (`LanguageDetector`, FR-AZ-3 / FR-AZ-4 tagging) is parked with conversation mode (R2-U1).
- **User-set languages:** outside conversation mode, the user sets the spoken language and the translation language, and can swap them.
- **Engine-reported language:** if a recognition model reports the language it heard (Azure's special case), we respect it. We don't add detection of our own.
- **Model deletion:** only if the Chrome API permits it. It doesn't (§5), so the UI explains this and links to Chrome's documentation instead.

## 1. Current state

| Item | Finding |
|---|---|
| `SettingsState.lang` | Does **two jobs**: it is the interface language (`translate.use(lang)` in `app.component`, the `setLanguage` effect, and the UI-settings preview), **and** the base of recognition (`activeLanguage` = dialect, otherwise `lang`). The dialect selectors are filtered by `lang`. |
| Translation language | `translation.targetLanguage`, chosen from the 17 `AvailableTranslationLanguages`. |
| Recognizable languages | The 11 `InterfaceLanguage`s, which have dialects in `SupportedDialects`. Seven translation targets (ja, ko, hi, vi, ru, nl, tr) can't be spoken. |
| Server sync | UI settings sync to the server through a fixed Mongoose schema (`server/.../ui-settings.model.ts`), with `lang` and `dialect` fields. Any new synced field needs a schema prop. |
| Mid-session language change | **Web Speech** applies `lang` only on the next `start()`. **Azure** `setLanguage()` rebuilds the recognizer but **never restarts continuous recognition**, so captions silently stop (existing bug, fixed here, §4). |
| Engine-reported language | The Azure SDK `RecognitionResult.language` is filled "if provided". It's documented only for language-ID configs, which we don't use. |

## 2. Spoken language vs interface language (decision §8.2)

**The spoken language is the recognition language.** The existing `lang` + `dialect` fields keep their storage and meaning for recognition, so **no data migration** is needed. In the UI:
- The "Language" select becomes **"Spoken language"**.
- The dialect select stays bound to the spoken language, as it is today.

**New, optional interface language:**
- **State:** `uiLanguage: InterfaceLanguage | 'spoken'`, default `'spoken'`. It is persisted in local storage and added to the server UI-settings schema so it syncs with the other UI settings.
- **Selector:** `selectUiLanguage` = `uiLanguage === 'spoken' ? lang : uiLanguage`.
- **UI-settings form:** a second select, "Interface language". Its first option is **"Same as spoken language"**, followed by the 11 interface languages.
- **Wiring:** the three `translate.use(...)` call sites switch to the effective UI language. The new `setUiLanguage` action has its own effect, which persists the value and calls `translate.use`.
- **Recognition is unchanged:** everything that reads `languageSelector` for recognition or translation (the recognition facade, render components, broadcast, sidebar) keeps using the spoken language. Only the three `translate.use` sites change.

**Consequence to be aware of:** with the default "Same as spoken language", swapping the spoken language also switches the interface language. A user who wants a fixed interface sets "Interface language" explicitly. The swap button's title says what it does.

## 3. Swap

**Where the controls appear:**
- **Translation settings panel:** the spoken-language select (with its dialect select), the translation-language select and a swap button.
- **Caption view** (`recognition-render`, split and translated-only modes): a swap button beside the target select.
- **Sidebar** (`recognition-control-sidebar`): a swap button beside its target select.

**Behaviour:** new action `SettingsActions.swapTranslationLanguages()`. The reducer does the following, and the settings effects persist it:

```
spoken = fr (dialect fr-CA),  target = en
swap → spoken = en, dialect = remembered en dialect ?? 'unspecified' (→ DefaultDialects)
       target = fr
swap → spoken = fr, dialect = fr-CA (remembered), target = en
```

- **The new spoken language** is the old target. It must be an `InterfaceLanguage`, otherwise the swap is a no-op and the button is disabled with an explanation.
- **The new target** is the old spoken language.
- **The dialect** comes from `translation.dialectByLanguage`, a small persisted map updated on every `setDialect`. That way swapping back restores `fr-CA`.
- `uiLanguage` is untouched. The UI follows the spoken language only when it's set to "Same as spoken language".

## 4. Applying a spoken-language change mid-session (decision §8.3)

- **Web Speech:** if streaming, `setLanguage()` also calls `recog.stop()`. The `end` handler restarts with the new `lang`. U1's `start` snapshot tags the new segments. Interim text is finalized by the existing `end` path.
- **Azure (bug fix):** if streaming, `setLanguage()` starts continuous recognition on the rebuilt recognizer, using the same success and error handling as `connectToStream`.
  - **The recognizer configuration is unchanged:** only `speechRecognitionLanguage` and profanity are set, exactly as before.
  - The old recognizer is stopped before it is closed.
  - The token-refresh timer is not duplicated.
  - The new recognizer's `sessionStarted` / `sessionStopped` events drive usage tracking (approved).
- **Earlier segments keep their own `lang`** (U1). Translation uses each segment's `lang` (§6), so the history stays correct after a swap.

## 5. Model deletion → information note with a link (decision §8.1)

**Findings** (Chrome built-in AI docs, via docs-mcp):
- The Translator API has **no deletion method**. `destroy()` only frees the in-memory instance.
- Chrome manages model storage automatically and removes models itself, for example on low disk space.
- Chrome hides per-pair download status for privacy.
- Web pages can't link to `chrome://` pages.

**UI:** in translation settings, next to the existing "Translation models" note, add one sentence:

> "Chrome manages downloaded translation models and may remove them to free space."

The sentence is followed by a **"Learn more"** link (opens in a new tab) to Chrome's page, *Understand built-in model management in Chrome*: `https://developer.chrome.com/docs/ai/understand-built-in-model-management`. That's the relevant page found in the indexed docs. It is written for developers, and no user-facing Chrome Help article on this was found.

## 6. Translation by segment language (FR-9)

In `recognition-render`, `translatePendingSegments()`:
- groups untranslated segments by `normalize(seg.lang)` and calls `translateSegments` once per group
- passes through groups whose language equals the target, with no translator call
- stores `{ lang, text }` per ID, and retranslates a segment if its `lang` changes.

The logic is in pure helpers in `segment-translations.ts` (`planTranslations`).

**Live text** translates from the current spoken dialect.

**Model status and the download button** follow the current pair, recomputed on swap. Older segments in the previous language use that pair's translator if it's cached or `available`. Otherwise they show untranslated, as today's fallback does.

## 7. Engine-reported language and the bilingual hint (decision §8.4)

- **Azure `recognized`:** segment `lang` = `event.result.language` when it's non-empty, otherwise the configured locale. This is read-only, and recognizer configuration is unchanged (FR-AZ-2).
- **`BilingualDialects` metadata** (FR-AZ-1): `fr-CA` → `[fr, en]`, `es-US` → `[es, en]`, the 16 `ar-*` locales → `[ar, en]`, `en-IN` → `[en]`.
- **Hint** (FR-AZ-5, US-AZ3, kept): in engine settings, under the Azure dialect selector, show "This dialect also recognizes English" when the form's dialect has two languages.

## 8. Decisions (approved 2026-10-10)

1. **Model deletion:** not permitted by the API. Add the note **with a link** to the relevant help page.
2. **Dialect** is bound to recognition, not the UI. Rename "Language" to **"Spoken language"**, and add an optional **"Interface language"** select whose default is **"Same as spoken language"**.
3. **Azure mid-session language change:** fix it so recognition restarts on the rebuilt recognizer.
4. **Bilingual-locale hint:** keep it.

## 9. Strings (i18n)

New `en.json` keys, one sentence each. The other locales are generated with `cd scripts && python3 translate.py`:

| Key | English |
|---|---|
| `LABELS.spokenLanguage` | Spoken language |
| `LABELS.uiLanguage` | Interface language |
| `LABELS.sameAsSpoken` | Same as spoken language |
| `SETTINGS.TRANSLATION.swapLanguages` | Swap spoken and translation languages |
| `SETTINGS.TRANSLATION.swapUnavailable` | Speech recognition isn't available for this language. |
| `SETTINGS.TRANSLATION.modelsManagedByChrome` | Chrome manages downloaded translation models and may remove them to free space. |
| `SETTINGS.TRANSLATION.learnMore` | Learn more |
| `SETTINGS.PROVIDER.bilingualHint` | This dialect also recognizes English. |

The existing `LABELS.language` key stays in place for any other users of it. The selectors switch to the new keys.

## 10. Test plan

| Spec | Cases |
|---|---|
| `settings.reducer.spec.ts` | **Swap:** fr/fr-CA + en → en/(remembered or unspecified) + fr → back to fr-CA. A non-recognizable target makes the swap a no-op. `uiLanguage` is untouched by a swap. `dialectByLanguage` is updated on `setDialect`. `setUiLanguage` works. |
| `settings.selector.spec.ts` (new) | `selectUiLanguage` follows the spoken language when set to `'spoken'`, otherwise uses the fixed value. |
| `settings.effects` (new spec or extended) | The `setUiLanguage` effect calls `translate.use` and persists. `setLanguage` with `uiLanguage` fixed **does not** change the interface language. |
| `web-recognition.service.spec.ts` | A language change while streaming stops and restarts with the new `lang`. Not streaming → no stop. |
| `azure-recognition.service.spec.ts` | `setLanguage` while streaming: the old recognizer is stopped and closed, a new one is built, **continuous recognition starts**, and the config is still only locale + profanity. `result.language` is used when present. Every bilingual locale's config is unchanged. |
| `segment-translations.spec.ts` | `planTranslations` grouping, pass-through, and retranslation on a `lang` change. |
| `bilingual-dialects` | The map's contents. `ar-EG` and `ar-JO` are absent. |
| Component specs (translation-settings, ui-settings, recognition-engine) | Several already fail on the existing test setup. Logic is tested through the reducer, selectors and pure helpers. Component cases are added where a spec can be made to pass with providers only. |
| Server `ui-settings.service.spec.ts` | `uiLanguage` round-trips. |

**Pass criteria:** no new failing client suites compared with the baseline, compared by name (45 of 103 after U1), and a clean client typecheck. The server user-module specs are unchanged or pass.

## 11. Parked / out of scope

- `LanguageDetector` detection (R2-U1).
- Per-line `dir` (U3).
- Broadcast payload (U4).
- Transcript `lang` (FR-T1).
