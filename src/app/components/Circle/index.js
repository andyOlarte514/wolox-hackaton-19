import React from 'react';
import { View, StyleSheet } from 'react-native';

function Circle({ radius, x, y, backgroundColor }) {
  return <View style={[styles.circle, {
    backgroundColor: backgroundColor,
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    left: x - radius,
    top: y - radius
  }]} />
}

Circle.defaultProps = {
  backgroundColor: '#000',
  radius: 50,
  x: 0,
  y: 0,
};

const styles = StyleSheet.create({
  circle: { position: 'absolute' }
});

export default Circle;
