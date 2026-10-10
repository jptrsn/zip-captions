# Requirement Verification Questions

Fill in each `[Answer]:` with a letter, or write your own answer. Construction starts once these are answered.

## Q1. Conversation turn switching (MVP)
How does the active speaker change in conversation mode?
- A) Manual only: a large toggle button plus a keyboard shortcut **(recommended)**
- B) Manual, plus automatic detection when the Azure engine is active (continuous language identification)
- C) Manual, plus best-effort automatic detection with `LanguageDetector` on the Web Speech output
- D) Other

[Answer]: A

## Q2. Face-to-face layout for conversation
When two people share one device across a table, should the conversation view put each person's language in its own pane, with the top pane optionally rotated 180°?
- A) Yes. Conversation mode reuses the split view and adds an optional "face-to-face" rotation **(recommended)**
- B) No. Show one interleaved, labeled history
- C) Offer both

[Answer]: A but do not include the rotation option, since this is only available on desktop.

## Q3. Target languages
- A) Limit targets to the 11 interface languages, so a conversation pair can always be recognized in both directions **(recommended for conversation)**
- B) Allow any language the browser's translator supports as a **target** for the presenter and dual-display modes, and limit conversation pairs to recognizable languages
- C) Other

[Answer]: A

## Q4. Interim (live) text translation
- A) Translate interim text with a throttled "latest wins" rule, plus a setting to turn it off **(recommended)**
- B) Translate finalized segments only
- C) Interim only for presenter/split, finals only for conversation

[Answer]: A

## Q5. Engine scope
- A) Web Speech engine only for the MVP
- B) Both Web Speech and Azure. Translation sits after the engine facade, so it doesn't depend on the engine **(recommended)**

[Answer]: B

## Q6. OBS output
When translation is on, which text goes to OBS `sendCaption`?
- A) A setting: original or translated **(recommended)**
- B) Always original
- C) Always translated

[Answer]: A

## Q7. Peer broadcast
- A) Broadcaster picks one feed (original or translated) to send to viewers
- B) Send both. The viewer picks original, translated or split on their own device
- C) Out of scope for MVP: broadcast stays original only **(recommended, keeps the MVP small)**

[Answer]: B

## Q8. Saved transcripts
- A) Save the original only (unchanged)
- B) Save the original plus a translation for each segment
- C) Out of scope for MVP **(recommended)**

[Answer]: A

## Q9. Rollout
- A) Ship behind a settings toggle labeled "Experimental" **(recommended)**
- B) Ship as a standard feature
- C) Gate behind a remote feature flag

[Answer]: A and make sure that the toggle to enable it is disabled on ineligible platforms

## Q10. Pack preparation UX
- A) A "Prepare languages" button in Settings → Translation that downloads packs ahead of time **(recommended)**
- B) Download on first Start only
- C) Both

[Answer]: A
