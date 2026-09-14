import * as THREE from 'three';

// Original poses built on the existing rig; no third-party animation assets.
export function addPreviewActionClips(clips) {
  const idle = clips.find(c => c.name === 'idle');
  function poseClip(name, duration, poses) {
    const times = [0, duration * .22, duration * .42, duration * .68, duration];
    const tracks = idle.tracks.map(track => {
      const size = track.getValueSize();
      const values = [];
      const bone = track.name.split('.')[0];
      for (let frame = 0; frame < times.length; frame++) {
        const value = Array.from(track.values.slice(0, size));
        if (track.name.endsWith('.quaternion') && poses[bone]) {
          const angles = poses[bone][frame];
          const rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(...angles));
          new THREE.Quaternion().fromArray(value).multiply(rotation).normalize().toArray(value);
        }
        values.push(...value);
      }
      const result = track.clone();
      result.times = new Float32Array(times);
      result.values = new Float32Array(values);
      result.setInterpolation(THREE.InterpolateLinear);
      return result;
    });
    return new THREE.AnimationClip(name, duration, tracks);
  }
  const zero = [0, 0, 0];
  const sequence = (a, b, c) => [zero, a, b, c, zero];
  const punch = poseClip('previewPunch', .46, {
    Spine2: sequence([0,-.14,0], [.08,.22,0], [.03,.1,0]),
    BiscepR: sequence([-.25,0,.12], [-1.1,.12,.2], [-.6,0,.12]),
    ArmR: sequence([.8,0,0], [.08,0,0], [.4,0,0]),
    BiscepL: sequence([-.15,0,-.1], [-.3,0,-.1], [-.15,0,0]),
    ArmL: sequence([.4,0,0], [.55,0,0], [.3,0,0]),
  });
  punch.tracks = punch.tracks.filter(t => /^(Spine[123]|Head|Biscep[LR]|Arm[LR]|Hand[LR])\.quaternion$/.test(t.name));
  const landing = poseClip('land', .32, {
    Spine1: sequence([.16,0,0], [.1,0,0], [.035,0,0]),
    ThighL: sequence([-.24,0,0], [-.16,0,0], [-.04,0,0]),
    ThighR: sequence([-.24,0,0], [-.16,0,0], [-.04,0,0]),
    ShinL: sequence([.38,0,0], [.24,0,0], [.06,0,0]),
    ShinR: sequence([.38,0,0], [.24,0,0], [.06,0,0]),
  });
  return [...clips.map(c => c.name === 'land' ? landing : c), punch];
}

// Quarantined after a user-reported freeze. No input listeners or DOM observers.
// Animation assets remain recoverable in git; do not re-enable without device QA.
export function updatePreviewHit(state) {
  state.punchT = 0;
}
