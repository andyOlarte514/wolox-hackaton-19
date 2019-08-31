import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, Text, View, Alert} from 'react-native';
import Sound from 'react-native-sound';

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
          sound1.play();
          sound1.setCurrentTime(0);
        }, timeout);
      } else if (pattern[i] === 2) {
        setTimeout(() => {
          sound2.play();
          sound2.setCurrentTime(0);
        }, timeout);
      }
    }
  };

  playButtonPress1 = () => {
    sound1.play();
    sound1.setCurrentTime(0);
    this.isWinner(1);
  };

  playButtonPress2 = () => {
    sound2.play();
    sound2.setCurrentTime(0);
    this.isWinner(2);
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
    const {disabled} = this.state;
    console.log(disabled);
    return (
      <View style={styles.container}>
        <TouchableHighlight disabled={disabled} style={styles.button1} onPress={this.playButtonPress1}>
          <Text>Press</Text>
        </TouchableHighlight>
        <TouchableHighlight disabled={disabled} style={styles.button2} onPress={this.playButtonPress2}>
          <Text>Press</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  button1: {
    backgroundColor: 'blue',
    width: 200,
    height: '100%',
  },
  button2: {
    backgroundColor: 'red',
    width: 200,
    height: '100%',
  },
});

export default SoundTap;
