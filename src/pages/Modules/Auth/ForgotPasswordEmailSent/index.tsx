import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  EmailSentTitle,
  EmailSentText,
  BackToSignInButton,
  BackToSignInText,
} from './styles';

const ForgotPasswordEmailSent: React.FC = () => {
  const navigation = useNavigation();
  return (

      <Container>
        <EmailSentTitle>E-mail enviado com sucesso!</EmailSentTitle>
        <EmailSentText>Verifique sua caixa de entrada</EmailSentText>
        <BackToSignInButton onPress={() => navigation.navigate('SignIn')}>
          <BackToSignInText>Voltar para o login</BackToSignInText>
        </BackToSignInButton>
      </Container>
  );
};

export default ForgotPasswordEmailSent;
