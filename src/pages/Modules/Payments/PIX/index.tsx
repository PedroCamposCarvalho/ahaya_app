import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-community/clipboard';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import PixPayment from '../../../../utils/Payments/pix';
import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';

import {
  Container,
  LoadingContainer,
  ScrollContent,
  Content,
  QRCodeTitle,
  QRCodeImage,
  OrText,
  KeyCodeView,
  KeyCodeText,
  KeyCodeButton,
  ButtonsContainer,
  BackButton,
  BackButtonText,
  ContinueButton,
  ContinueButtonText,
} from './styles';

interface PageProps {
  id_dayuse: string;
  operation: string;
}

interface PixPaymentProps {
  id_transaction: string;
  url: string;
  key: string;
  requestSuccess: boolean;
}

const PIX: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(40);
  const { user } = useAuth();
  const [pixPaymentProps, setPixPaymentProps] = useState<PixPaymentProps>(
    {} as PixPaymentProps,
  );
  const { id_dayuse, operation } = route.params as PageProps;

  useEffect(() => {
    const { id } = user;
    let tempPrice = 40;
    api.get(`users/isUserVIP?id_user=${id}`).then(response => {
      if (String(response.data) === 'true') {
        tempPrice = 30;
      }
    });
    setPrice(tempPrice);
    PixPayment(tempPrice, user)
      .then(response => {
        setPixPaymentProps(response);
        setLoading(false);
      })
      .catch(error => {});
  }, [user]);

  const handleCopyToClipboard = useCallback(() => {
    const { key } = pixPaymentProps;
    Clipboard.setString(key);
    Toast.show({
      type: 'info',
      text2: 'Código copiado com sucesso!',
    });
  }, [pixPaymentProps]);

  const handleFinish = useCallback(() => {
    const { name, ssn, email } = user;
    Alert.alert(
      'Atenção!',
      'Uma vaga será reservada para você, deseja realmente continuar?',
      [
        {
          style: 'destructive',
          text: 'Não',
        },
        {
          style: 'default',
          text: 'Sim',
          onPress: () => {
            api.post('/dayUse/createUser', {
              id_dayuse,
              name,
              ssn,
              email,
              paid: false,
              observation: '',
              paid_price: price,
              material_amount: 0,
              id_transaction: pixPaymentProps.id_transaction,
            });
            navigation.navigate('DayUseCreated');
          },
        },
      ],
      { cancelable: false },
    );
  }, [user, pixPaymentProps, navigation, price, id_dayuse]);

  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator color="#fff" size="large" />
        </LoadingContainer>
      ) : (
        <ScrollContent>
          <Content>
            <QRCodeTitle>Pague usando o QR Code</QRCodeTitle>
            <QRCodeImage source={{ uri: pixPaymentProps.url }} />
            <OrText>ou copie o código</OrText>
            <KeyCodeView>
              <KeyCodeText>Copiar código</KeyCodeText>
              <KeyCodeButton onPress={() => handleCopyToClipboard()}>
                <FeatherIcon name="copy" color="#fff" size={20} />
              </KeyCodeButton>
            </KeyCodeView>
            <ButtonsContainer>
              <BackButton onPress={() => navigation.goBack()}>
                <FeatherIcon
                  name="arrow-left"
                  size={RFValue(20)}
                  color="#fff"
                />
                <BackButtonText>Voltar</BackButtonText>
              </BackButton>
              <ContinueButton onPress={() => handleFinish()}>
                <FeatherIcon
                  name="check-circle"
                  size={RFValue(20)}
                  color="#fff"
                />
              </ContinueButton>
            </ButtonsContainer>
          </Content>
        </ScrollContent>
      )}
    </Container>
  );
};

export default PIX;
