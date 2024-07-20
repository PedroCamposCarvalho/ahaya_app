import React, { useEffect, useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import {
  Container,
  BackButton,
  LoadingContainer,
  Content,
  TitleContainer,
  Title,
} from './styles';

const Vouchers: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <BackButton onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={24} color="#999" />
          </BackButton>
          <Content>
            <TitleContainer>
              <Title>Vouchers</Title>
            </TitleContainer>
            {loading ? (
              <LoadingContainer>
                <ActivityIndicator color="#fff" size="large" />
              </LoadingContainer>
            ) : (
              <></>
            )}
          </Content>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Vouchers;
