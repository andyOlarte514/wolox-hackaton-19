import React, {Component} from 'react';
import {StyleSheet, Vibration, Text, View, Alert} from 'react-native';
import Tts from 'react-native-tts';
import Sound from 'react-native-sound';
import LateralButtons from '@components/LateralButtons';

Sound.setCategory('Ambient', true);
const sound1 = new Sound(require('./kick.wav'), error => error);
const sound2 = new Sound(require('./snare.wav'), error => error);
const success = new Sound(require('./success.wav'), error => error);
const defeat = new Sound(require('./incorrect.mp3'), error => error);

const winAudio = 'Ganaste, presiona en la mitad de la pantalla para continuar, suerte!';
const loseAudio = 'Perdiste, presiona en la mitad de la pantalla para continuar!';

const randomDataSet = (dataSetSize, minValue, maxValue) => {
  return new Array(dataSetSize)
    .fill(0)
    .map((_, i, set) => {
      if (i == 0) {
        return Math.floor(Math.random() * (maxValue - minValue) + minValue)
      }
      const lastPattern = set[i - 1];
      return Math.random() > 0.6 ? lastPattern : Math.abs(1 - lastPattern);
    });
};

class SoundTap extends Component {
  state = {
    pattern: randomDataSet(3, 0, 1),
    newArray: [],
    intro: true,
    disabled: true,
    leftBlink: false,
    rightBlink: false,
    buttonStop: false
  };

  componentDidMount() {
    this.playIntro();
  }

  playIntro = () => {
    Tts.speak("Recuerda, si suena este sonido");
    setTimeout(() => { this.setState({ leftBlink: true }); sound1.play() }, 2500);
    setTimeout(() => { this.setState({ leftBlink: false }); Tts.speak("deberás presionar a la izquierda.\n En cambio, si suena el siguiente") }, 3000);
    setTimeout(() => { this.setState({ rightBlink: true }); sound2.play() }, 7500);
    setTimeout(() => { this.setState({ rightBlink: false }); Tts.speak("deberás presionar a la derecha.\n ¡Buena suerte!") }, 8500);
    setTimeout(() => this.playPattern(this.state.pattern), 11500);
  };

  playPattern = (pattern) => {
    let timeout = 2400;
    this.setState({ disabled: true });
    Tts.speak("Escucha la secuencia y luego repite.");
    const speed = Math.max(125, 800 - 100 * (this.state.pattern.length - 3));
    for (let i = 0; i < pattern.length; i++) {
      timeout += speed;
      switch (pattern[i]) {
        case 0: {
          setTimeout(() => {
            sound1.setCurrentTime(0);
            sound1.play();
            this.setState({leftBlink: true, rightBlink: false});
          }, timeout);
          break;
        }
        case 1: {
          setTimeout(() => {
            sound2.setCurrentTime(0);
            sound2.play();
            this.setState({leftBlink: false, rightBlink: true});
          }, timeout);          
          break;
        }
      }
      timeout += 500;
      setTimeout(() => {
        this.setState({leftBlink: false, rightBlink: false});
      }, timeout);
    }
    setTimeout(() => Tts.speak("Ahora, repite la secuencia"), timeout + 1000);
    setTimeout(() => this.setState({leftBlink: false, rightBlink: false, disabled: false }), timeout + 3000);
  };

  checkVictory() {
    const { pattern } = this.state;
    if (this.state.victory) {  
      const lastPattern = pattern[pattern.length - 1];
      this.setState({ victory: false });
      // Intentamos que el patron sea 60-40, para que no sea tan repetitivo
      const newPattern = [...pattern, Math.random() > 0.6 ? lastPattern : Math.abs(1 - lastPattern)];
      this.setState({newArray: [], victory: false, pattern: newPattern });
      this.playPattern(newPattern);
      return true;
    }
    return false
  };

  checkDefeat() {
    if (this.state.defeat) {
      const newPattern = randomDataSet(3, 0, 1);
      this.setState({ newArray: [], pattern: newPattern, defeat: false });
      this.playPattern(newPattern);      
      return true;
    }
    return false;
  }

  playButtonPress1 = () => {
    if (this.checkVictory()) {
      return;
    }
    if (this.checkDefeat()) {
      return
    }
    sound1.setCurrentTime(0);
    sound1.play();
    Vibration.vibrate(300);
    this.isWinner(0);
    this.setState({leftBlink: true});
    setTimeout(() => this.setState({leftBlink: false}), 500);
  };

  playButtonPress2 = () => {
    if (this.checkVictory()) {
      return;
    }
    if (this.checkDefeat()) {
      return
    }    
    sound2.setCurrentTime(0);
    sound2.play();
    Vibration.vibrate(300);
    this.isWinner(1);
    this.setState({rightBlink: true});
    setTimeout(() => this.setState({rightBlink: false}), 500);
  };

  isWinner = i => {
    const {pattern, newArray} = this.state;
    newArray.push(i);
    if (newArray.length === pattern.length) {
      const isEquals = this.isEqualArrays();
      if (isEquals) {
        success.setCurrentTime(0);
        success.setVolume(1);
        success.play();
        setTimeout(() => Tts.speak('Felicidades, haz ganado. Ahora puedes intentar el próximo nivel. Toca la pantalla para continuar.'), 1000);          
        this.setState({ disabled: true, victory: true });
        setTimeout(() => this.setState({ disabled: false }), 2000);
        return;
      }
      defeat.setCurrentTime(0);
      defeat.setVolume(0.5);
      defeat.play();        
      setTimeout(() => Tts.speak('Lo siento, has perdido. Toca la pantalla si quieres volver a empezar.'), 1000);
      this.setState({ disabled: true, defeat: true });
      setTimeout(() => this.setState({ disabled: false }), 2000);
    }
  };

  isEqualArrays = () => {
    const {pattern, newArray} = this.state;
    const equal = JSON.stringify(pattern) === JSON.stringify(newArray);
    return equal;
  };

  render() {
    const {disabled, leftBlink, rightBlink} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.blinks}>
          <View style={[styles.blink, {backgroundColor: leftBlink ? '#000' : '#fff'}]} />
          <View style={[styles.blink, {backgroundColor: rightBlink ? '#000' : '#fff'}]} />
        </View>
        <LateralButtons disabled={disabled} onTouchLeft={this.playButtonPress1} onTouchRight={this.playButtonPress2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  blinks: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
    height: '100%'
  },
  blink: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch'
  }
});

export default SoundTap;
