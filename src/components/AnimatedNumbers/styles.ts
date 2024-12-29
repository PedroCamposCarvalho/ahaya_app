import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  margin-left: auto;
`;
export const ScoreValue = styled.Text`
  color: #fff;
  font-size: ${RFValue(24)};
`;

export const MeasureNumber = styled.Text`
  color: #fff;
  font-size: ${RFValue(24)};
  opacity: 0;
`;
