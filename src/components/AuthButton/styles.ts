import styled, { css } from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { shade } from 'polished';

interface ButtonProps {
  disabled: boolean;
}

export const Container = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  height: ${RFValue(45)};
  background: #006edb;
  border-radius: 10px;
  margin-top: 8px;
  justify-content: center;
  align-items: center;
  ${props =>
    props.disabled &&
    css`
      background: ${shade(0.5, '#006edb')};
    `}
`;

export const ButtonText = styled.Text`
  font-family: 'Arial';
  color: #f4ede8;
  font-size: ${RFValue(16)};
`;
