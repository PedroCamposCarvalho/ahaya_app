import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 90%;
  align-self: center;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${RFValue(16)};
`;
export const ScoreProps = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const SliderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const SliderValue = styled.Text`
  font-size: ${RFValue(14)};
  text-align: center;
  margin-top: ${RFValue(14)};
  margin-right: ${RFValue(14)};
  color: #fff;
`;

export const ZeroPoints = styled.View`
  width: 100%;
  align-items: center;
`;

export const ScoreDetails = styled.View``;

export const ScoreValue = styled.Text`
  font-size: ${RFValue(14)};
  color: #fff;
`;

export const ScoreDescription = styled.Text`
  font-size: ${RFValue(10)};
  color: #ccc;
  margin-left: ${RFValue(2)};
`;
export const SliderDisabledText = styled.Text`
  font-size: ${RFValue(14)};
  color: #ccc;
  text-align: center;
  align-self: center;
`;
