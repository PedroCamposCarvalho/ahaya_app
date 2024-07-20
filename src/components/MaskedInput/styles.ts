import styled, { css } from 'styled-components/native';
import { shade } from 'polished';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: ${RFValue(55)}px;
  padding: 0 ${RFValue(16)}px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  border-width: 1px;
  border-color: #999;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #006edb;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #000;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const EyeIconContainer = styled.TouchableWithoutFeedback``;
