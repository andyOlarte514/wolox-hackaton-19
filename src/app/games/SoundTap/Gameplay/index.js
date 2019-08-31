import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, Text, View, Alert} from 'react-native';
import Tts from 'react-native-tts';
import Sound from 'react-native-sound';
import LateralButtons from '@components/LateralButtons';

Sound.setCategory('Ambient', true);
const sound1 = new Sound(require('./kick.wav'), error => error);
const sound2 = new Sound(require('./snare.wav'), error => error);

const randomDataSet = (dataSetSize, minValue, maxValue) => {
  return new Array(dataSetSize)
    .fill(0)
    .map(() => Math.floor(Math.random() * (maxValue - minValue) + minValue));
};

class SoundTap extends Component {
  state = {
    pattern: randomDataSet(5, 1, 3),
    newArray: [],
    disabled: true,
    leftBlink: false,
    rightBlink: false,
  };

  componentDidMount() {
    this.patternPlay();
  }

  patternPlay = () => {
    const {pattern} = this.state;
    let timeout = 100;
    for (let i = 0; i < pattern.length; i++) {
      timeout += Math.floor(Math.random() * 1000 + 100);
      if (pattern[i] === 1) {
        setTimeout(() => {
          // No sirve tener sonidos que son inentendibles para el usuario.
          // Agarren a una persona, sin saber nada de la App, vendenle los ojos, y diganlé que juegue
          // Si no puede adivinar que lado tocar, los sonidos no sirven en esta instancia.
          Tts.speak('Izquierda');
          this.setState({leftBlink: true, rightBlink: false});
        }, timeout);
      } else if (pattern[i] === 2) {
        setTimeout(() => {
          // No sirve tener sonidos que son inentendibles para el usuario.
          // Agarren a una persona, sin saber nada de la App, vendenle los ojos, y diganlé que juegue
          // Si no puede adivinar que lado tocar, los sonidos no sirven en esta instancia.          
          Tts.speak('Derecha');
          this.setState({leftBlink: false, rightBlink: true});
        }, timeout);
      }
      timeout += 500;
      setTimeout(() => {
        this.setState({leftBlink: false, rightBlink: false});
      }, timeout);
    }
    setTimeout(() => this.setState({leftBlink: false, rightBlink: false}), timeout + 1000);
  };

  playButtonPress1 = () => {
    sound1.setCurrentTime(0);
    sound1.play();
    this.isWinner(1);
    this.setState({leftBlink: true});
    setTimeout(() => this.setState({leftBlink: false}), 500);
  };

  playButtonPress2 = () => {
    sound2.setCurrentTime(0);
    sound2.play();
    this.isWinner(2);
    this.setState({rightBlink: true});
    setTimeout(() => this.setState({rightBlink: false}), 500);
  };

  isWinner = i => {
    const {pattern, newArray} = this.state;
    newArray.push(i);
    if (newArray.length === pattern.length) {
      const isEquals = this.isEqualArrays();
      if (isEquals) {
        Alert.alert(
          'Ganaste',
          'Avanza de nivel',
          [
            {
              text: 'Ok',
              onPress: () => {
                pattern.push(Math.floor(Math.random() * 2 + 1));
                this.setState({newArray: []});
                this.patternPlay();
              },
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      }
      Alert.alert(
        'Perdiste',
        'Re iniciar',
        [
          {
            text: 'Ok',
            onPress: () => {
              this.setState({newArray: []});
              this.patternPlay();
            },
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  };

  isEqualArrays = () => {
    const {pattern, newArray} = this.state;
    const iqual = JSON.stringify(pattern) === JSON.stringify(newArray);
    return iqual;
  };

  render() {
    const {disabled, leftBlink, rightBlink} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.blinks}>
          <View style={[styles.blink, {backgroundColor: leftBlink ? '#000' : '#fff'}]} />
          <View style={[styles.blink, {backgroundColor: rightBlink ? '#000' : '#fff'}]} />
        </View>
        <LateralButtons onTouchLeft={this.playButtonPress1} onTouchRight={this.playButtonPress2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  blinks: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
    height: '100%',
  },
  blink: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});

export default SoundTap;
