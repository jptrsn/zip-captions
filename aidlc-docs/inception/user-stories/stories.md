# User Stories — On-Device Translation

Priority: **M** = MVP, **S** = should, **C** = could. FR/NFR IDs refer to `../requirements/requirements.md`.

---

## Epic 0 — Translation foundation

### US-0.1 Eligibility-aware Experimental toggle (M)
As any user, I want the Experimental translation toggle to be enabled only when my device can translate on-device.
- **Given** mobile, or a browser without `Translator`, **then** the toggle is visible but disabled, with a "Requires desktop Chrome 138+ or Edge 148+" hint, and captioning is unaffected.
- **Given** an eligible desktop browser, **then** the toggle is enabled and defaults to off.

### US-0.2 Prepare languages ahead of time (M)
As a user preparing for a session, I want to download language packs from Settings with visible progress.
- **Given** a pair whose status is `downloadable`, **when** I click Prepare, **then** progress is shown and the pair is marked Ready when it finishes.
- **Given** the download fails, **then** I see a retryable error.

### US-0.3 Choose display mode (M)
As a user, I want **Original**, **Translated** or **Split** display, which persists and can be changed from the sidebar during a session.

---

## Epic AZ — Azure bilingual locales (`fr-CA`, `es-US`, `ar-*`)

### US-AZ1 Preserve native bilingual recognition (M)
As a Canadian user on Azure with French (Canada) selected, I want captions to keep following whichever of English or French is being spoken.
- **Given** engine Azure and dialect `fr-CA`, **when** speakers alternate English and French, **then** each is transcribed in its own language, exactly as today. This is a regression guard: the recognizer config is unchanged.

### US-AZ2 Translate mixed-language captions correctly (M)
As Marco presenting with Azure `fr-CA` and target English, I want French segments translated and English segments shown as spoken.
- **Given** translation is on, **then** each final segment is language-tagged with `LanguageDetector`, restricted to [fr, en]. French segments are translated, and English segments pass through.
- **Given** detection confidence is low, **then** the segment keeps the previous segment's language.

### US-AZ3 Tell the user about bilingual locales (S)
As a user selecting French (Canada), US Spanish or an Arabic dialect with Azure, I want a hint that English is recognized too.

---

## Epic A — Speak-and-translate conversation

### US-A1 Set up a conversation pair (M)
As Dana, I want to pick "My language" and "Their language" from the interface languages, and have both directions prepared.

### US-A2 Switch turns manually (M)
As Dana using Web Speech (or Azure without a bilingual profile), I want a large Switch control and a keyboard shortcut to change who is speaking.
- **When** I press Switch, **then** the current live line is finalized, recognition restarts in the other language, translation reverses direction, and the active speaker is highlighted.
- The control is keyboard reachable and has an accessible label that names the active language.

### US-A3 Automatic turns with a bilingual engine (M)
As Dana using Azure with French (Canada) and an English↔French pair, I want the turn to follow whoever is speaking.
- **Given** Azure, `fr-CA` and pair en↔fr, **when** a segment is detected as `en-CA`, **then** it's translated en→fr, and the turn indicator shows English. The reverse also holds.
- The manual Switch is hidden in this mode.

### US-A4 Two-pane conversation view (M)
As Dana and my partner, we each want a pane showing the conversation in our own language, with a language label on each line. No rotation option.

---

## Epic B — Single translated feed (presenter)

### US-B1 Translated-only captions (M)
As Marco, I want the caption screen to show only translated text, using my size, font and flow settings.
- No original-language text appears on the audience screen. A segment still being translated shows a neutral placeholder.
- Segments already in the target language (for example English from bilingual `fr-CA` with target `en`) pass through unchanged.

### US-B2 Full-screen & PiP (M)
The translated feed works in full-screen and Document PiP.

### US-B3 Long-running stability (M)
Translation keeps up through an hour-long talk. Stale interim requests are dropped, and memory is bounded in both engines.

### US-B4 OBS feed choice (M)
As Marco, I choose whether OBS receives original or translated captions.

---

## Epic C — Original + translation split

### US-C1 Both feeds simultaneously (M)
Two panes, each labeled with its language and correct `lang`/`dir`.

### US-C2 Orientation (M)
Horizontal (side-by-side) or vertical (stacked). Panes can be swapped, and the choice persists. Works in full-screen and PiP.

### US-C3 Aligned panes (M)
Segments are matched by ID. A pending translation shows a placeholder, and lines never shift.

### US-C4 Adjustable split ratio (C)
Drag the divider.

---

## Epic D — Broadcast viewers

### US-D1 Broadcast both feeds (M)
As a broadcaster with translation on, I want viewers to receive both original and translated segments.

### US-D2 Viewer chooses display (M)
As a viewer, I want to pick original, translated or split on my own device. Older clients still show the original.
