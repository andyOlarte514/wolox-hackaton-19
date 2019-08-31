import React, { Component } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import Orientation from 'react-native-orientation-locker';

import PressSystem from './systems/PressSystem';
import CircleAnimationSystem from './systems/CircleAnimationSystem';

import Circle from '@components/Circle';

class Gameplay extends Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <GameEngine
        style={styles.container}
        systems={[PressSystem, CircleAnimationSystem]}
        entities={{
          // Finger
          1: { x: -1000, y: -1000, radius: 0, passingTime: 0, open: false, backgroundColor: '#fff', renderer: <Circle /> },
          // Heartbeat
          2: { x: Math.random() }
        }}
      >
        <StatusBar hidden />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width: '100%',
    height: '100%'
  }
});

export default Gameplay;
