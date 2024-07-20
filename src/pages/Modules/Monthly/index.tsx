import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Container } from './styles';

const Monthly: React.FC = () => (
  <LinearGradient
    colors={['#006edb', '#273a9a']}
    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
  >
    <Text style={{ color: '#fff' }}>Em breve...</Text>
  </LinearGradient>
);

export default Monthly;
