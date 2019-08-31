import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

function LateralButtons({ onTouchLeft, onTouchRight, disabled }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onTouchLeft} style={styles.button} disabled={disabled} />
      <TouchableOpacity onPress={onTouchRight} style={styles.button} disabled={disabled} />
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
