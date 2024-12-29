import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const DescriptionView = styled.View`
  margin-top: -20%;
`;

export const DescriptionText = styled.Text`
  font-size: ${RFValue(16)};
  font-family: 'Arial';
  color: #999;
  text-align: center;
  height: ${RFValue(40)};
`;

export const GoBackButton = styled.TouchableOpacity`
  background: #99d420;
  margin-top: 20px;
  border-radius: ${RFValue(5)};
  width: ${RFValue(80)};
  height: ${RFValue(40)};
  align-items: center;
  justify-content: center;
`;

export const GoBackButtonText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(14)};
`;
