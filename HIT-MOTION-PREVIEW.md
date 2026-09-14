# Isolated action animation preview

CURRENT STATUS — Punch is disabled after a reported game freeze. The separate button and F listener are removed; the action timer is forced to zero. This is mitigation, not a verified root-cause fix. Desktop Buddy #1 did not reproduce the freeze; device and exact button identification are pending. Earlier feature notes below describe the quarantined experiment.

Original releases and map geometry are unchanged. Familiar controls from the previous preview remain unchanged.

- F / Vur: locally authored upper-body additive punch on the existing rig. Running continues underneath; jumping cancels it. No movement lock.
- Fluid-motion-2: visual facing follows the shortest turn arc independently of immediate physics heading. Transition time warping removed. Moving landings retain the locomotion clip.
- Latest rollback checkpoint: `checkpoint-before-fluid-motion-20260914`.
- Landing uses a short knee/torso recovery; existing compact airborne pose remains.
- Reduced-motion disables additional squash/stretch. No new camera flash, knockback, physics or model download.
- This is animation feedback, not multiplayer combat. No player damage or networked pushing is implemented. The multiplayer server is still not connected.
- Rollback checkpoint: `checkpoint-before-hit-fall-20260914`. Revert the action-animation commit to remove this experiment without rewriting history.

Verification: both variants pass 30/60/120 FPS control regression tests and authored-clip finite-value, cooldown, recovery and interruption checks. Local browser: Codex Gorilla and Kimi Buddy #1 entered successfully and selected `previewPunch` with ready animation rigs. Codex jump returned to grounded idle. Not all 45 characters, real phones or multiplayer sessions were tested.
