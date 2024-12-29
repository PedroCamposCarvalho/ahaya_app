import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const ButtonsContainer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 30px 0 ${16 + getBottomSpace()}px;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

export const ButtonContent = styled.TouchableOpacity`
  height: ${RFValue(50)};
  width: ${RFValue(50)};
  background: #006edb;
  border-radius: ${RFValue(10)};
  width: 40%;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
`;
