import React from 'react';
import { View } from 'react-native';
import CustomText from '@components/CustomText';
import FindIt from '@app/games/FindIt';

import styles from './styles';

export default function Home() {
  return (
    <View style={styles.container}>
      <FindIt />
    </View>
  );
}
