import React, { useEffect, useCallback, useState, useMemo } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  BackHandler,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WToast } from 'react-native-smart-tip';
import axios from 'axios';
import env from '../../../../Config/Environment';
import {
  Container,
  LoadingContainer,
  Header,
  HeaderTitle,
  PageDescription,
  Content,
  QRCodeImage,
  KeyCodeContainer,
  KeyCodeTitle,
  KeyCode,
  KeyCodeCopyButton,
  KeyCodeCopyText,
  ContinueButton,
  ContinueButtonText,
} from './styles';

interface RouteParams {
  id_transaction: string;
}

interface DataProps {
  url: string;
  key: string;
}

const DayUsePixPaymentSuccess: React.FC = () => {
  const headers = useMemo(
    () => ({
      'x-api-key': env.x_api_key,
      'Content-Type': 'application/json',
    }),
    [],
  );

  const generalErrorToastOpts = useMemo(
    () => ({
      data: 'Erro ao processar solicitação!',
      textColor: '#fff',
      backgroundColor: '#c53030',
      duration: WToast.duration.LONG,
      position: WToast.position.TOP,
    }),
    [],
  );

  const copiedToClipboardToastOpts = useMemo(
    () => ({
      data: 'Copiado para a área de transferência',
      textColor: '#fff',
      backgroundColor: '#999',
      duration: WToast.duration.LONG,
      position: WToast.position.TOP,
    }),
    [],
  );

  const thanksToastOpts = useMemo(
    () => ({
      data: 'Obrigado e bom jogo!',
      textColor: '#fff',
      backgroundColor: '#99d420',
      duration: WToast.duration.LONG,
      position: WToast.position.TOP,
    }),
    [],
  );

  const route = useRoute();
  const { reset } = useNavigation();
  const navigation = useNavigation();
  const [data, setData] = useState<DataProps>({} as DataProps);
  const [loading, setLoading] = useState(true);
  const { id_transaction } = route.params as RouteParams;

  const handleBackButton = useCallback(() => true, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    axios
      .get(
        `https://api.safe2pay.com.br/v2/transaction/Get?Id=${id_transaction}`,
        {
          headers,
        },
      )
      .then(response => {
        const newData = {
          url: response.data.ResponseDetail.PaymentObject.QrCode,
          key: response.data.ResponseDetail.PaymentObject.Key,
        };
        setData(newData);
        setLoading(false);
      })
      .catch(error => {
        WToast.show(generalErrorToastOpts);
      });
  }, [handleBackButton, id_transaction, generalErrorToastOpts, headers]);

  const handleCopyToClipboard = useCallback(() => {
    Clipboard.setString(data.key);
    WToast.show(copiedToClipboardToastOpts);
  }, [data.key, copiedToClipboardToastOpts]);

  const handleContinue = useCallback(() => {
    WToast.show(thanksToastOpts);
    reset({
      routes: [{ name: 'DayUse' }],
      index: 0,
    });
  }, [reset, thanksToastOpts]);

  return (
    <Container>
      <Header>
        <HeaderTitle>Pagar com PIX</HeaderTitle>
      </Header>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <PageDescription>
            Pague utilizando o QR Code abaixo ou usando o código gerado
          </PageDescription>
          {loading ? (
            <LoadingContainer>
              <ActivityIndicator color="#fff" size="large" />
            </LoadingContainer>
          ) : (
            <Content>
              <QRCodeImage
                style={{ resizeMode: 'cover' }}
                source={{
                  uri: data.url,
                }}
              />
              <KeyCodeContainer>
                <KeyCodeTitle>Código: </KeyCodeTitle>
                <KeyCodeCopyButton
                  activeOpacity={0}
                  onPress={() => handleCopyToClipboard()}
                >
                  <Icon name="copy" color="#99d420" size={20} />
                  <KeyCodeCopyText>Copiar código (Ctrl + C)</KeyCodeCopyText>
                </KeyCodeCopyButton>
                <KeyCode>{data.key}</KeyCode>
              </KeyCodeContainer>
            </Content>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <ContinueButton onPress={() => handleContinue()}>
        <ContinueButtonText>Finalizar</ContinueButtonText>
      </ContinueButton>
    </Container>
  );
};

export default DayUsePixPaymentSuccess;
