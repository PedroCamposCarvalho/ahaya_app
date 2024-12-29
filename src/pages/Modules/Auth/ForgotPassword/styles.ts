import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

interface ErrorProps {
  isErrored: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 0 : 40}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)};
  color: #000;
  font-family: 'Arial';
  margin: 64px 0 24px;
`;

export const UserNotFoundText = styled.Text<ErrorProps>`
  display: none;
  color: #f00;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  margin: 5px 0;
  ${props =>
    props.isErrored &&
    css`
      display: flex;
    `}
`;

export const BackContainer = styled.View`
  margin-top: 10px;
  width: 100%;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const BackButtonText = styled.Text`
  font-size: ${RFValue(14)};
  color: #006edb;
  font-family: 'Arial';
`;
