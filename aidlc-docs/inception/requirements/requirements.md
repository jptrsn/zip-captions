# Requirements — On-Device Caption Translation

Status: **APPROVED 2026-10-10.** Verification questions are answered (see `requirement-verification-questions.md` and the decisions in §7).

## 1. Intent

Let Zip Captions translate live captions into another language **entirely in the browser**, with no audio or text sent to a translation server. This builds on Chrome's built-in Translator API. Translation supports three ways of using it: two-way conversation, a single translated feed for an audience, and a side-by-side view of the original and translated text.

The feature also delivers **automatic English/French language switching for the Azure engine when `fr-CA` is selected**. This is expected product behavior that the code doesn't implement today (see §3.1).

## 2. Platform capability (researched 2026-10-10)

### 2.0 Translation approach (clarified 2026-10-10)
**Zip Captions uses Chrome's built-in, on-device translation**, the approach in crippit's PoC. "Translator API" in this spec is the **web-platform JavaScript API name** (`self.Translator.create()` / `.translate()`) that Chrome exposes for that built-in model. It is **not** a cloud translation service.

| | Chrome built-in Translator API (**what we use**) | Cloud translation services (**not used**) |
|---|---|---|
| Examples | `self.Translator` in Chrome 138+ / Edge 148+ | Google Cloud Translation API, Azure AI Translator, DeepL API |
| Where it runs | On the user's device. Chrome downloads per-language "expert model" packs once. | Vendor servers |
| Cost | Free, with no API key or account | Paid per character |
| Privacy | "No data is sent to Google or any third party when using the model." The network is used only to download the model. | Text is sent to the vendor |

crippit's PoC called this same API. Its extra probes (`window.translation.createTranslator`, `ai.translator`) were **pre-release origin-trial names of the same API** that current Chrome no longer exposes. U0 kept the shipped `self.Translator` and dropped the stale names. No model or approach changed.

**Hardware:** Chrome's built-in AI docs list GPU / 16 GB RAM / 22 GB disk requirements **only for the Gemini Nano APIs** (Prompt, Summarizer, Writer, Rewriter, Proofreader). The Translator and Language Detector use smaller expert models, and no requirements are listed for them. The inherited 16 GB / 20 GB warning was removed in `da8445b`. Chrome doesn't publish per-pack sizes, so the UI describes per-pair downloads without a size figure.

**Speech recognition is separate and not on-device:** Web Speech (Chrome) and Azure both process audio in the cloud. Only *translation* is on-device.

Source: [Get started with built-in AI](https://developer.chrome.com/docs/ai/get-started).

### 2.1 Browser Translator / Language Detector
| Fact | Implication |
|---|---|
| Stable since **Chrome 138**. Edge 148 also ships it. Firefox and Safari don't support it. | Use feature detection (`'Translator' in self`), not user-agent checks. |
| **Desktop only.** | The Experimental toggle is **disabled** on mobile and in unsupported browsers, with an explanation. |
| `availability()` returns `unavailable` / `downloadable` / `downloading` / `available`. Chrome reports a pair's status only after this site has created a translator for it. | Each pair needs an explicit "Prepare" step. |
| `create()` **requires user activation** and emits `downloadprogress`. | Run pack preparation from a button in Settings → Translation. |
| **Translations run one at a time.** | Translate finalized segments. Interim text uses a throttled "latest wins" rule that drops stale requests. |
| Not available in Web Workers. | The service runs on the main thread. |
| BCP 47 codes. No API lists supported pairs. | Map each `RecognitionDialect` to a translator code (`es-MX`→`es`, `fr-CA`→`fr`, `zh-TW`/`zh-HK`→`zh-Hant`, …). |

Sources: [Translator API](https://developer.chrome.com/docs/ai/translator-api), [Language Detector API](https://developer.chrome.com/docs/ai/language-detection), [Client-side translation](https://developer.chrome.com/docs/ai/translate-on-device).

### 2.2 Azure multi-language options (reference; not used in MVP)
The MVP relies on Azure's **native bilingual locales** (§3.1). These alternatives were evaluated for future work, such as supporting pairs that aren't bilingual:
- **Continuous LID:** `AutoDetectSourceLanguageConfig.fromLanguages([...])` with `SpeechServiceConnection_LanguageIdMode = "Continuous"`. Up to 10 candidates. Detects per utterance, not within a sentence. Requires the v2 endpoint through `SpeechConfig.fromEndpoint`, but the app uses `fromAuthorizationToken`. The cost effect is unconfirmed.
- **Multilingual post-stream refinement (preview):** `fromOpenRange()` + `PostRefinement`. Covers 25 languages and needs Speech SDK ≥ 1.50; the client is on 1.42.0.

Sources: [Language identification](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-identification), [How to recognize speech](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech).

## 3. Current system (reverse-engineered)

```
SettingsState.lang / .dialect ──► RecognitionService (facade, 'web' | 'azure')
                                       │  getLiveOutput(): Signal<string>       (interim)
                                       │  getRecognizedText(): Signal<string[]> (finals)
                                       ▼
        ┌──────────────────────────────┼──────────────────────────────┐
RecognitionRenderComponent      StreamCaptionsComponent         BroadcastRoomComponent
 ├ app-recognized-text             └ OBS sendCaption(live)         └ peer broadcast
 └ app-recognized-live-text
 (hosted by Document PiP / full-screen; textFlow bottom-up | top-down)
```

Constraints this places on the design:
- **Segment identity:** finals are a bare `string[]`. Web trims it to 15 items. *(Azure was noted here as never trimming; the merged baseline already caps it at 15, per the correction in U1.)* Translation and split alignment need stable segment IDs and a per-segment `lang`.
- **Single active language:** Web Speech uses one `lang`, and a change only takes effect on the next `start()`. Azure rebuilds the recognizer when the language changes.
- **Fan-out:** OBS, broadcast and transcripts all consume original text.

### 3.1 Azure bilingual locales (native, no configuration)
Azure's **bilingual speech models** handle switching natively. Selecting the locale is all that's needed, and the current code (`speechRecognitionLanguage = 'fr-CA'`, `azure-recognition.service.ts:43`) already gets this behavior.

| Locale | Languages | Source |
|---|---|---|
| `fr-CA` | French + English | STT release notes, Nov 2023: "Choose es-US (Spanish and English) or fr-CA (French and English)… speak either language or mix them together." |
| `es-US` | Spanish + English | same |
| 16 Arabic locales: `ar-AE`, `ar-BH`, `ar-DZ`, `ar-IL`, `ar-IQ`, `ar-KW`, `ar-LB`, `ar-LY`, `ar-MA`, `ar-OM`, `ar-PS`, `ar-QA`, `ar-SA`, `ar-SY`, `ar-TN`, `ar-YE`. **Not** `ar-EG` or `ar-JO`. | Arabic + English | STT release notes: "Arabic locales (…) are now equipped with bilingual support for English" |
| `en-IN` | English + Hindi | STT release notes. Hindi is not an interface language, so English is the only translation source. |

Source: `articles/ai-services/speech-service/includes/release-notes/release-notes-stt.md` in [MicrosoftDocs/azure-ai-docs](https://github.com/MicrosoftDocs/azure-ai-docs), indexed in docs-mcp as `azure-speech-to-text`.

**What this means for translation:** a bilingual model produces mixed-language segments, but **single-locale results don't report which language each segment is in**. FR-9 needs that language, so it's found client-side:
1. **Primary:** `LanguageDetector.detect(segmentText)` restricted to the locale's two languages. It's available wherever translation is (same eligibility gate), and it works well for full sentences in two distinct languages. If confidence is low, the segment keeps its last known language.
2. **Not used:** continuous LID (§2.2). It would swap the native bilingual model for language-ID routing, add v2-endpoint/token risk, and possibly change cost, all to solve a problem the native model already handles.

A segment that mixes both languages within one sentence goes to the translator under its dominant detected language. The translator passes through words it recognizes as already being in the target language.

## 4. Functional requirements

### Foundation
- **FR-1:** `TranslationService` with an injectable `BrowserTranslatorAdapter`. It caches one translator per pair, queues requests, and exposes signals for translated segments and the translated live line.
- **FR-2:** An **Experimental** toggle in Settings → Translation. It is **disabled** (visible, with an explanation) when the API is missing or the platform is mobile, and captioning is never affected.
- **FR-3:** A "Prepare languages" button downloads packs ahead of time, showing progress, errors and retry.
- **FR-4:** Translation targets are the **17 languages** in `AvailableTranslationLanguages` (inherited from the merged baseline), excluding the current source language. Maps each dialect to a translator code. *(Release 2 conversation pairs will be limited to recognizable interface languages.)*
- **FR-5:** Finalized segments are always translated. Interim text uses a throttled "latest wins" rule, with a setting to turn it off.
- **FR-6:** Translated output has the correct `lang` and `dir` attributes (Arabic is RTL).
- **FR-7:** Settings persist: enabled, target, display mode, split orientation, interim on/off, conversation pair, OBS feed.
- **FR-8:** Translation is **engine-agnostic**. It consumes segments from the `RecognitionService` facade, so it works with both Web Speech and Azure.
- **FR-9:** **Per-segment source language.** The source language of a translation is the segment's `lang`, not the global setting. If the segment's language already matches the target, the text passes through untranslated.

### Azure bilingual locales
- **FR-AZ-1:** A `BilingualDialects` map describes Azure's native bilingual locales (§3.1): `fr-CA`→`[fr, en]`, `es-US`→`[es, en]`, the 16 listed `ar-*` locales→`[ar, en]`, `en-IN`→`[en]`. This is metadata only; recognizer configuration is unchanged.
- **FR-AZ-2:** The native switching is **preserved**. Azure recognition setup is not changed for these locales.
- **FR-AZ-3:** When translation is on, each final segment from a bilingual locale is tagged with its language through `LanguageDetector`, restricted to that pair (§3.1). When detection is unavailable or low-confidence, the segment keeps the configured dialect's language.
- **FR-AZ-4:** Translation uses the per-segment language (FR-9). In a French-to-English feed, English segments pass through, and the reverse holds too.
- **FR-AZ-5:** The settings UI says that the selected locale also recognizes English (Azure only).

### Conversation (Epic A) — **deferred to Release 2**
> Descoped from Release 1 on 2026-10-10. These requirements are kept for the next release and aren't built in Release 1.
- **FR-C1:** Choose a language pair A↔B, limited to the interface languages.
- **FR-C2:** The **default turn control is manual**: a large Switch control plus a keyboard shortcut. A switch finalizes the live line, then restarts recognition in the other language.
- **FR-C3:** **Automatic turns with bilingual locales:** when Azure is active with a bilingual locale that covers the pair (`fr-CA` + en↔fr, `es-US` + en↔es, `ar-*` + en↔ar), recognition already hears both speakers. Each segment's detected language (FR-AZ-3) sets the translation direction and the turn indicator, and the manual Switch is hidden. In every other case the manual Switch is used.
- **FR-C4:** Conversation uses the split layout: each pane shows the conversation in one person's language, with a language label on each segment. **No rotation option.**

### Presenter (Epic B)
- **FR-P1:** Display mode `translated` shows only translated text, using the existing typography and text-flow settings.
- **FR-P2:** Works in full-screen and Document PiP.
- **FR-P3:** OBS feed setting: `original` | `translated`.

### Dual display (Epic C)
- **FR-D1:** Display mode `split` shows original and translated text in two panes.
- **FR-D2:** Orientation `horizontal` | `vertical`, and the panes can be swapped.
- **FR-D3:** Segments are aligned by ID. A pending translation shows a placeholder.
- **FR-D4:** Works in full-screen and PiP.

### Broadcast (Q7 = B, refined 2026-10-10)
- **FR-B1:** When the broadcaster is translating, the broadcaster sends **both** original and translated segments, with matching segment IDs and per-segment languages, plus the target language. Viewers then get the translation **without needing translation support themselves** (any browser, including mobile).
- **FR-B2:** Viewers choose original, translated or split locally. Old viewers that don't understand the new payload keep receiving original text.
- **FR-B3:** **Viewer-side fallback:** if a viewer prefers a language the broadcaster isn't translating into, and the viewer's device is eligible (FR-2), the viewer can translate on their own device from the original feed. The merged branch already implements this path.
- **FR-B4:** The viewer's language picker lists the broadcaster's language(s) first, marked "from broadcaster", then languages available locally. Ineligible viewers see only what the broadcaster sends.
- **FR-B5:** Whenever the broadcaster's translation exists for the viewer's chosen language, viewers use it, so the same text isn't translated twice.

### Picture-in-Picture & multi-window (added 2026-10-10)
Platform constraint: the Document PiP spec (WICG §6.5) allows **at most one PiP window per top-level browsing context**. `requestWindow()` closes the opener's existing PiP window. Whether a *different* tab or window may hold a second PiP window at the same time is left to the browser.
- **FR-W1:** Single PiP window, configurable content: `original` | `translated` | `split` (stacked). The merged branch forces translated-only in PiP; this becomes a setting, defaulting to translated-only.
- **FR-W2:** **Per-language windows (option):** "Open <language> in a new window" opens a same-origin popup (`window.open`) that renders exactly one feed (original or translated) with the user's typography settings. It's synced live from the main window through `BroadcastChannel`, with no second recognition or translation run.
- **FR-W3:** A per-language popup can (a) go full-screen on its current or another display, for example a projector, and (b) request its **own** Document PiP window, *if the browser allows a second PiP window across top-level windows*. **Spike required** to verify Chrome behavior. If Chrome closes the other PiP window, (b) is dropped and the popup works as a normal window.
- **FR-W4:** Closing the main window closes its per-language popups. Closing a popup never stops recognition.
- **FR-W5:** Configuration: Settings → Translation → "Display windows", choosing a single window (split or translated-only) or separate windows per language.

### Transcripts (Q8 = A)
- **FR-T1:** Transcripts store the original text only. They store per-segment `lang` once FR-AZ-3 is in place.

## 5. Non-functional requirements & risks
- **NFR-1 Privacy:** Browser translation stays on the device. When Azure is active, the UI must not claim the session is fully on-device.
- **NFR-2 Latency:** A finalized segment's translation appears ≤ 1 s p95 after the original. Interim translation never shows stale text in place of newer text.
- **NFR-3 Resilience:** If translation fails, original captions keep working. If per-segment language detection is unavailable, segments keep the configured dialect's language.
- **NFR-4 A11y:** Labeled pane regions, `lang`/`dir` on all text, and (Release 2) a keyboard-operable Switch.
- **NFR-5 i18n:** New strings go into all 11 locale files.
- **NFR-6 Testability:** Translator and Azure SDK construction sit behind seams that Jest can mock.
- **NFR-7 Bounded memory:** Segment history is capped in **both** engines.

Risks: R-1 desktop only. R-2 the sequential queue can back up (mitigated by dropping stale interim requests). R-3 `LanguageDetector` can be inaccurate on very short segments from bilingual locales (mitigated by restricting it to the pair and keeping the last language when confidence is low). R-4 pack downloads are large (mitigated by preparing packs ahead of time).

## 6. Release plan & out of scope
- **Release 1:** foundation, Azure bilingual-locale tagging, presenter (translated-only), split view, broadcast (both feeds plus viewer fallback), PiP and per-language windows, OBS feed.
- **Release 2:** conversation / two-way translation (Epic A, FR-C*), with conversation pairs limited to recognizable languages.
- **Out of scope:** Server or cloud translation fallback. Translating transcripts after the session. Conversations with more than two languages. Mobile. Rotated face-to-face layout. Language detection in Web Speech.

## 7. Decisions log (from verification answers)
| Q | Decision |
|---|---|
| Q1 | Manual turn switching. *Amended 2026-10-10:* automatic turns are used when the engine reports per-segment language (Azure bilingual profiles such as `fr-CA`); see FR-C3. |
| Q2 | Split view for conversation, **without** the rotation option (desktop only). |
| Q3 | ~~Targets limited to the 11 interface languages.~~ *Amended 2026-10-10:* Release 1 keeps all 17 targets from the merged baseline. The 11-language limit applies only to Release 2 conversation pairs. |
| — | *2026-10-10:* conversation / two-way translation deferred to Release 2. |
| Q4 | Interim translation throttled with "latest wins", and it can be turned off. |
| Q5 | Both engines. |
| Q6 | OBS feed setting: original or translated. |
| Q7 | Broadcast both feeds, and the viewer chooses. *Refined:* viewer-side translation (FR-B3) is kept as a fallback for languages the broadcaster isn't translating into. |
| — | *Added 2026-10-10:* per-language windows (FR-W*). Built on crippit/zip-captions `translations` (merged `507fe2a`). |
| Q8 | Transcripts store original text only. |
| Q9 | Experimental toggle, **disabled on ineligible platforms**. |
| Q10 | "Prepare languages" button in Settings. |
