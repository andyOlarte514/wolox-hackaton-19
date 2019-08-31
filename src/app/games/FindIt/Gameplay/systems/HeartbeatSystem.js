import Sound from 'react-native-sound';

Sound.setCategory('Playback');

function updateSound(touchArea, heartbeat) {
  const { sound, screen: { width, height } } = heartbeat;
  const x = touchArea.x - heartbeat.x;
  const y = touchArea.y - heartbeat.y;
  const d = 1 - (Math.hypot(x, y) / Math.hypot(width, height));
  if (sound._loaded) {
    sound.setVolume(0.5 + 0.5 * d);
    sound.setSpeed(Math.max(1, d * 10));
    if (!!sound._playing) {
      sound.play();
    }
  }
}

function HeartbeatSystem(entities) {
  const touchArea = entities[1];
  const heartbeat = entities[2];
  if (heartbeat) {
    if (heartbeat.sound) {
      updateSound(touchArea, heartbeat);
    } else {
      heartbeat.sound = new Sound(require('../assets/audio/heartbeat.wav'));
      heartbeat.sound.setNumberOfLoops(100);
      updateSound(touchArea, heartbeat);
      heartbeat.sound.play();
    }
  }
  return entities;
}

export default HeartbeatSystem;