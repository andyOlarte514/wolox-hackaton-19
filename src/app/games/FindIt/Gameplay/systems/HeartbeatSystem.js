import Sound from 'react-native-sound';

Sound.setCategory('Playback');

function updateSound(touchArea, heartbeat) {
  const { sound, screen: { width, height } } = heartbeat;
  const x = touchArea.x - heartbeat.x;
  const y = touchArea.y - heartbeat.y;
  const d = Math.hypot(x, y) / Math.hypot(width, height);
  sound.setVolume(0.5 + 0.5 * d);
  sound.setPan(x / width);
}

function HeartbeatSystem(entities) {
  const touchArea = entities[1];
  const heartbeat = entities[2];
  if (heartbeat) {
    if (heartbeat.sound) {
      if (heartbeat.soundLoaded) {
        updateSound(touchArea, heartbeat);
        return;
      }
    } else {
      heartbeat.sound = new Sound(require('../assets/audio/heartbeat.wav'), Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log(error);
          return;
        }
        heartbeat.soundLoaded = true;
        sound.setNumberOfLoops(-1);
        updateSound(touchArea, heartbeat)
        sound.play();
      })
    }
  }
  return entities;
}

export default HeartbeatSystem;