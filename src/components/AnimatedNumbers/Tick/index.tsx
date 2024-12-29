import React, { useEffect, useMemo } from 'react';
import { View, Animated } from 'react-native';

import { ScoreValue } from '../styles';

interface PageProps {
  height: number;
  value: number;
  numbers: number[];
}
const Tick: React.FC<PageProps> = ({ height, value, numbers }) => {
  const animation = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: value * height * -1,
      useNativeDriver: true,
      duration: 3000,
    }).start();
  }, [animation, value, height]);
  return (
    <Animated.View
      style={{
        transform: [{ translateY: animation }],
        alignItems: 'center',
      }}
    >
      {numbers.map(item => (
        <ScoreValue key={item}>{item}</ScoreValue>
      ))}
    </Animated.View>
  );
};

export default Tick;
