import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import LateralButtons from '@components/LateralButtons';
import { black } from '@constants/colors';

class GameInstructions extends Component {
  componentDidMount = () => this.props.onSpeech();

  render() {
    const {instructions, title, onSpeech, onStart} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{instructions}</Text>
        <Text>Powered by</Text>
        <Image
          style={styles.image}
          source={{uri: 'https://miro.medium.com/max/800/1*D3XGGVYs4AaKv616xZm6JQ.png'}}
        />
        <LateralButtons onTouchLeft={onSpeech} onTouchRight={onStart} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  text: {
    fontSize: 18
  },
  title: {
    fontSize: 22
  },
  image: {
    width: '100%',
    height: 150,
  }
});

export default GameInstructions;
