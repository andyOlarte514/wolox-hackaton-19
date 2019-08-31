import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import LateralButtons from '@components/LateralButtons';

class GameInstructions extends Component {
  componentDidMount = () => this.props.onSpeech();

  render() {
    const { instructions, onSpeech, onStart } = this.props;

    return (
      <View style={styles.container}>
        <Text>{instructions}</Text>
        <LateralButtons onTouchLeft={onSpeech} onTouchRight={onStart} />
      </View>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default GameInstructions;
