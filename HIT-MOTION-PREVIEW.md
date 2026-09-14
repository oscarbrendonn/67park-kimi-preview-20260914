# Isolated action animation preview

Original releases and map geometry are unchanged. Familiar controls from the previous preview remain unchanged.

- F / Vur: locally authored short punch on the existing character rig; moving cancels it, with no movement lock.
- Landing uses a short knee/torso recovery; existing compact airborne pose remains.
- Reduced-motion disables additional squash/stretch. No new camera flash, knockback, physics or model download.
- This is animation feedback, not multiplayer combat. No player damage or networked pushing is implemented. The multiplayer server is still not connected.
- Rollback checkpoint: `checkpoint-before-hit-fall-20260914`. Revert the action-animation commit to remove this experiment without rewriting history.

Verification: both variants pass 30/60/120 FPS control regression tests and authored-clip finite-value, cooldown, recovery and interruption checks. Local browser: Codex Gorilla and Kimi Buddy #1 entered successfully and selected `previewPunch` with ready animation rigs. Codex jump returned to grounded idle. Not all 45 characters, real phones or multiplayer sessions were tested.
