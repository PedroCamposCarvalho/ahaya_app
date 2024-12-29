import React, { useRef, useCallback, useState } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { RFValue } from 'react-native-responsive-fontsize';

import api from '@app/services/api';
import Input from '@app/components/Input';
import Button from '@app/components/AuthButton';
import getValidationErrors from '@app/utils/getValidationErrors';
import Colors from '@app/Config/Colors';
import logo from '@app/assets/logo_blue.png';
import {
  Container,
  Title,
  UserNotFoundText,
  BackContainer,
  BackButton,
  BackButtonText,
} from './styles';

interface SignInFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

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
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users/createPasswordCode', {
          email: data.email,
        });
        setLoading(false);
        navigation.navigate('InputCode', {
          email: data.email,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          setLoading(false);
          return;
        }
        setShowError(true);
        setLoading(false);
      }
    },
    [navigation],
  );

  const imageHeight = Dimensions.get('window').height * 0.2;
  const imageWidth = Dimensions.get('window').width;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="never"
      >
        <Container>
          <Image
            source={logo}
            style={{
              height: imageHeight,
              width: imageWidth,
              resizeMode: 'contain',
              marginTop: '10%',
            }}
          />
          <View>
            <Title>Esqueci minha senha</Title>
          </View>
          <Form ref={formRef} onSubmit={handleSignIn} style={{ width: '100%' }}>
            <Input
              name="email"
              icon="mail"
              password={false}
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <UserNotFoundText isErrored={showError}>
              Usuário não encontrado
            </UserNotFoundText>
            <Button
              title="submitButton"
              loading={loading}
              onPress={() => formRef.current?.submitForm()}
            >
              Finalizar
            </Button>
          </Form>
          <BackContainer>
            <BackButton onPress={() => navigation.goBack()}>
              <FeatherIcon
                name="arrow-left"
                size={RFValue(20)}
                color={Colors.primary}
              />
              <BackButtonText>Voltar</BackButtonText>
            </BackButton>
          </BackContainer>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
