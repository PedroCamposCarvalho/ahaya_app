import React, { useRef, useCallback, useState } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '@app/services/api';
import Input from '@app/components/Input';
import Button from '@app/components/AuthButton';
import getValidationErrors from '@app/utils/getValidationErrors';
import Toast from 'react-native-toast-message';
import { Container, Title } from './styles';

interface SignInFormData {
  password: string;
}

interface RouteParams {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const { email } = route.params as RouteParams;

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      setLoading(true);
      setShowError(false);
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/reset', {
          email,
          password: data.password,
        });
        setLoading(false);
        Toast.show({
          type: 'success',
          text2: 'Senha alterada com sucesso!',
        });
        navigation.navigate('SignIn');
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
    [navigation, email],
  );

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
          <View>
            <Title>Digite uma nova senha</Title>
          </View>
          <Form ref={formRef} onSubmit={handleSignIn} style={{ width: '100%' }}>
            <Input
              name="password"
              icon="lock"
              password
              placeholder="Nova senha"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button
              title="submitButton"
              loading={loading}
              onPress={() => formRef.current?.submitForm()}
            >
              Finalizar
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
