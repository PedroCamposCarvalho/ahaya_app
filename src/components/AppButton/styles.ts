/* eslint-disable operator-linebreak */
import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '@app/Config/Colors';
import { shade } from 'polished';

interface ButtonProps {
  disabled: boolean;
}

export const Container = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  height: ${RFValue(45)};
  background: ${colors.blue};
  border-radius: 10px;
  margin-top: 8px;
  justify-content: center;
  align-items: center;
  ${props =>
    props.disabled &&
    css`
      background: ${shade(0.5, colors.blue)};
    `}
`;

export const ButtonText = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(16)};
`;
