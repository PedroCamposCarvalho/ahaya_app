import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '@app/Config/Colors';

interface ErrorProps {
  isErrored: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 0 : 40}px;
  background: #fff;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)};
  color: #999;
  font-family: 'Arial';
  margin-bottom: ${RFValue(20)};
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
  color: ${Colors.white};
  font-family: 'Arial';
`;
