import React, { useCallback, useEffect, useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import Tick from './Tick';
import { Container, MeasureNumber } from './styles';

interface PageProps {
  value: number;
}

const AnimatedNumbers: React.FC<PageProps> = ({ value }) => {
  const [height, setHeight] = useState(30);

  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const [value5, setValue5] = useState(0);
  const [value6, setValue6] = useState(0);
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  function getRandom(min: number, max: number): number {
    const newMin = Math.ceil(min);
    const newMax = Math.floor(max);
    return Math.floor(Math.random() * (newMax - newMin)) * newMin;
  }

  useEffect(() => {
    if (height > 0) {
      const convertedValue = String(value).split('').reverse().join('');
      setTimeout(() => {
        setValue1(Number(convertedValue[5]) || 0);
        setValue2(Number(convertedValue[4]) || 0);
        setValue3(Number(convertedValue[3]) || 0);
        setValue4(Number(convertedValue[2]) || 0);
        setValue5(Number(convertedValue[1]) || 0);
        setValue6(Number(convertedValue[0]) || 0);
      }, 1000);
    }
  }, [height, value]);

  return (
    <Container>
      <View
        style={{
          height,
          flexDirection: 'row',
          overflow: 'hidden',
        }}
      >
        {height > 0 && (
          <>
            <Tick height={height} value={value1} numbers={numbers} />
            <Tick height={height} value={value2} numbers={numbers} />
            <Tick height={height} value={value3} numbers={numbers} />
            <Tick height={height} value={value4} numbers={numbers} />
            <Tick height={height} value={value5} numbers={numbers} />
            <Tick height={height} value={value6} numbers={numbers} />
          </>
        )}
        <MeasureNumber onLayout={e => setHeight(e.nativeEvent.layout.height)}>
          0
        </MeasureNumber>
      </View>
    </Container>
  );
};

export default AnimatedNumbers;
