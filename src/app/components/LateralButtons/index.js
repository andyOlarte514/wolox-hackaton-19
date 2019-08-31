import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

function LateralButtons({ onTouchLeft, onTouchRight }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onTouchLeft} style={styles.button} />
      <TouchableOpacity onPress={onTouchRight} style={styles.button} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%'
  },
  button: {
    flex: 1
  }
})

export default LateralButtons;
