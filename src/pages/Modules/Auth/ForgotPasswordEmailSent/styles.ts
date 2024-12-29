import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmailSentTitle = styled.Text`
  color: #000;
  font-size: ${RFValue(18)};
  font-family: 'Arial';
`;

export const EmailSentText = styled.Text`
  color: #000;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  margin-top: 10px;
`;

export const BackToSignInButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: #006edb;
  margin-top: 20px;
  height: 40px;
  border-radius: 5px;
  padding: 8px;
`;

export const BackToSignInText = styled.Text`
  color: #fff;
  font-size: ${RFValue(12)};
  font-family: 'Arial';
`;
