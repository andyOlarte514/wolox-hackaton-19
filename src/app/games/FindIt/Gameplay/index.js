import React, { Component } from 'react';
import { StatusBar, StyleSheet, Dimensions } from 'react-native';
import { GameEngine } from "react-native-game-engine";

import PressSystem from './systems/PressSystem';
import CircleAnimationSystem from './systems/CircleAnimationSystem';
import HeartbeatSystem from './systems/HeartbeatSystem';

import Circle from '@components/Circle';

class Gameplay extends Component {
  render() {
    const screen = Dimensions.get('window');
    const { height, width } = screen;
    const hearbeat = { 
      screen,
      radius: 5,
      x: 10 + (width - 20) * Math.random(),
      y: 10 + (height - 20) * Math.random(),
      backgroundColor: '#f00',
      renderer: <Circle />
    };
    return (
      <GameEngine
        style={styles.container}
        systems={[PressSystem, CircleAnimationSystem, HeartbeatSystem]}
        entities={{
          // Finger
          1: { x: -1000, y: -1000, radius: 0, passingTime: 0, open: false, backgroundColor: '#fff', renderer: <Circle /> },
          // Heartbeat
          2: hearbeat
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
