import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { shade } from 'polished';
import { getBottomSpace } from 'react-native-iphone-x-helper';

interface ErrorProps {
  isErrored: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: #000;
  font-family: 'Arial';
  margin: 64px 0 24px;
`;

export const LoginFailedText = styled.Text<ErrorProps>`
  display: none;
  color: #c53030;
  font-size: 16px;
  font-family: 'Arial';
  margin: 5px 0;
  ${props =>
    props.isErrored &&
    css`
      display: flex;
    `}
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #000;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
`;

export const CreateAccountButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 24px;
`;

export const CreateAccountText = styled.Text`
  color: #000;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  margin-left: 16px;
`;
