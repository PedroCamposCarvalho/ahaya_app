import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)};
  color: #fff;
  font-family: 'Arial';
  margin-top: 48px;
  text-align: center;
`;

export const Description = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(16)};
  color: #fff;
  margin-top: 16px;
  text-align: center;
`;

export const OkButton = styled(RectButton)`
  background: #4bb543;
  justify-content: center;
  align-items: center;
  border-radius: ${RFValue(10)};
  margin-top: 24px;
  height: ${RFValue(40)};
  width: ${RFValue(60)};
`;

export const OkButtonText = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(16)};
`;
