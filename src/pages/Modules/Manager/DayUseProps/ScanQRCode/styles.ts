import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background: #006edb;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: ${RFValue(18)};
  font-family: 'Arial';
  margin-bottom: ${RFValue(25)};
`;

export const BackButton = styled.TouchableOpacity`
  background: #fff;
  width: 80%;
  flex-direction: row;
  height: ${RFValue(40)};
  border-radius: ${RFValue(20)};
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(50)};
`;

export const BackButtonText = styled.Text`
  color: #006edb;
  font-size: ${RFValue(14)};
`;
