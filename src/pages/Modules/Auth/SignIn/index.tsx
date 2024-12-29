import React, { useRef, useCallback, useState } from 'react';
import {
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '@app/utils/getValidationErrors';
import { useAuth } from '@app/hooks/auth';
import Input from '@app/components/Input';
import Button from '@app/components/AuthButton';
import logo_name from '@app/assets/logo_name.png';
import TouchID from 'react-native-touch-id';
import {
  Container,
  LoginFailedText,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const passwordRef = useRef<TextInput>(null);

  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      setLoading(true);
      setShowError(false);

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e=mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({ email: data.email, password: data.password });
        setLoading(false);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          setLoading(false);
        }
        setShowError(true);
        setLoading(false);
      }
    },
    [signIn],
  );
  const imageHeight = Dimensions.get('window').height * 0.4;
  const imageWidth = Dimensions.get('window').width;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Image
            source={logo_name}
            style={{
              height: imageHeight,
              width: imageWidth,
              resizeMode: 'contain',
              marginTop: '10%',
            }}
          />

          <Form
            ref={formRef}
            onSubmit={handleSignIn}
            style={{ width: '100%', marginTop: '5%' }}
          >
            <Input
              name="email"
              icon="mail"
              password={false}
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              testID="email"
            />
            <Input
              name="password"
              ref={passwordRef}
              password
              icon="lock"
              autoCapitalize="none"
              placeholder="Senha"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
              testID="password"
            />

            <LoginFailedText isErrored={showError}>
              Credenciais inválidas
            </LoginFailedText>
            <Button
              title="submitButton"
              loading={loading}
              onPress={() => formRef.current?.submitForm()}
              testID="logIn"
            >
              Entrar
            </Button>
          </Form>
          <ForgotPassword onPress={() => navigation.navigate('ForgotPassword')}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
          <CreateAccountButton
            onPress={() => navigation.navigate('ProfileSignUp')}
          >
            <FeatherIcon name="log-in" size={20} color="#000" />
            <CreateAccountText>Criar conta</CreateAccountText>
          </CreateAccountButton>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
