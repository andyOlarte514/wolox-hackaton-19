import React from 'react';
import { View } from 'react-native';
import SoundTap from '@app/games/SoundTap';

import styles from './styles';

console.log('sound tap');

export default function Home() {
  return (
    <View style={styles.container}>
      <SoundTap />
    </View>
  );
}
