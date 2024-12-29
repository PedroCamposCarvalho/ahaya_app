import React from 'react';
import { ButtonProps, ActivityIndicator } from 'react-native';
import colors from '@app/Config/Colors';
import { Container, ButtonText } from './styles';

interface ButtonProperties extends ButtonProps {
  children: string;
  loading: boolean;
}

const Button: React.FC<ButtonProperties> = ({ children, loading, ...rest }) => (
  <Container disabled={loading} {...rest}>
    {loading ? (
      <ActivityIndicator color={colors.blue} />
    ) : (
      <ButtonText>{children}</ButtonText>
    )}
  </Container>
);

export default Button;
