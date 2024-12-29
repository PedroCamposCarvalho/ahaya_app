import React, { useEffect, useCallback, useState, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Linking,
  Dimensions,
  Image,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import WhatsAppLogo from '../../../../assets/whatsapplogo.png';
import InstagramLogo from '../../../../assets/instagramlogo.png';
import api from '../../../../services/api';
import {
  Container,
  BackButton,
  Content,
  ItemContainer,
  ItemTitle,
  ItemDescription,
  ButtonsContainer,
  OpenWhatsAppButton,
  OpenInstagramButton,
  OpenSpotifyButton,
} from './styles';

export interface MaterialsProps {
  id: string;
  material: string;
  amount: number;
}

const ContactUs: React.FC = () => {
  const navigation = useNavigation();

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
            <ItemContainer>
              <ItemTitle>Telefone: </ItemTitle>
              <ItemDescription>+55 (11) 94147-3456</ItemDescription>
            </ItemContainer>
            <ItemContainer>
              <ItemTitle>Endereço: </ItemTitle>
              <ItemDescription>Av Dr Dante Pazzanese</ItemDescription>
            </ItemContainer>
            <ItemContainer>
              <ItemTitle>Número: </ItemTitle>
              <ItemDescription>421</ItemDescription>
            </ItemContainer>
            <ItemContainer>
              <ItemTitle>CEP: </ItemTitle>
              <ItemDescription>04012-180</ItemDescription>
            </ItemContainer>
            <ItemContainer>
              <ItemTitle>E-mail: </ItemTitle>
              <ItemDescription>arenaibirapuera@hotmail.com</ItemDescription>
            </ItemContainer>
            <ButtonsContainer>
              <OpenWhatsAppButton
                onPress={() =>
                  Linking.openURL(
                    `whatsapp://send?text=Olá!&phone=5511941473456`,
                  )}
              >
                <Image
                  source={{
                    uri:
                      'https://app-arenaibirapuera.s3.amazonaws.com/whatsapplogo.png',
                  }}
                  style={{
                    height: RFValue(45),
                    width: RFValue(45),
                    resizeMode: 'contain',
                    marginTop: '10%',
                  }}
                />
              </OpenWhatsAppButton>
              <OpenInstagramButton
                onPress={() =>
                  Linking.openURL('instagram://user?username=arenaibirapuera')
                }
              >
                <Image
                  source={{
                    uri:
                      'https://app-arenaibirapuera.s3.amazonaws.com/instagramlogo.png',
                  }}
                  style={{
                    height: RFValue(55),
                    width: RFValue(55),
                    resizeMode: 'contain',
                    marginTop: '10%',
                  }}
                />
              </OpenInstagramButton>
            </ButtonsContainer>
          </Content>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ContactUs;
