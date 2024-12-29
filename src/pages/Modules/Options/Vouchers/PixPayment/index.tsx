import React, { useEffect, useCallback, useState, useMemo } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../../../../services/api';
import { useAuth } from '../../../../../hooks/auth';
import { useVoucher } from '../../../../../hooks/voucherpayment';
import { useNotificationVoucher } from '../../../../../hooks/vouchernotifications';
import PixPaymentData from '../../../../../utils/Payments/pix';
import {
  Container,
  LoadingContainer,
  Header,
  BackButton,
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

interface PixProps {
  url: string;
  key: string;
  requestSuccess: boolean;
}

const PixPaymentVoucher: React.FC = () => {
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

  const voucherCreatedToastOpts = useMemo(
    () => ({
      data: 'Voucher criado com sucesso!',
      textColor: '#231f20',
      backgroundColor: '#99d420',
      duration: WToast.duration.LONG,
      position: WToast.position.TOP,
    }),
    [],
  );

  const { reset } = useNavigation();
  const navigation = useNavigation();
  const { voucher, setCreated, setIdDatabase, resetContext } = useVoucher();
  const { setNotification } = useNotificationVoucher();
  const { user } = useAuth();

  const [data, setData] = useState<PixProps>({} as PixProps);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData(): Promise<void> {
      const response = await PixPaymentData(voucher.finalPrice, user);
      setData(response);
      setLoading(false);

      const voucherData = {
        id_sport: voucher.id_sport,
        percentage: voucher.percentage,
        id_user: user.id,
        pix_url: response.url,
        pix_key: response.key,
        paid: false,
        price: voucher.finalPrice,
        observation: '',
      };
      if (!voucher.created) {
        if (!voucher.id_database) {
          api.post('/vouchers/createVoucher', voucherData).then(response2 => {
            setIdDatabase(response2.data.id);
            setCreated(true);
          });
        } else {
          const voucherData2 = {
            id: voucher.id_database,
            id_sport: voucher.id_sport,
            percentage: voucher.percentage,
            id_user: user.id,
            pix_url: response.url,
            pix_key: response.key,
            paid: false,
            price: voucher.finalPrice,
            observation: '',
          };
          api.put('/vouchers/updateVoucher', voucherData2).then(response2 => {
            setCreated(true);
          });
        }
      }
    }

    getData();
  }, [
    voucher.finalPrice,
    user,
    voucher.id_sport,
    voucher.percentage,
    voucher.id_database,
    voucher,
    setCreated,
    setIdDatabase,
  ]);

  const handleCopyToClipboard = useCallback(() => {
    Clipboard.setString(data.key);
    WToast.show(copiedToClipboardToastOpts);
  }, [data.key, copiedToClipboardToastOpts]);

  const handleNavigationgoBack = useCallback(() => {
    Alert.alert(
      'Atenção!',
      'As alterações ainda não foram salvas, deseja realmente voltar?',
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      { cancelable: false },
    );
  }, [navigation]);

  const handleSaveVoucher = useCallback(() => {
    Alert.alert(
      'Salvar Voucher',
      'Por favor, aperte em SIM para salvar este voucher',
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          onPress: () => {
            resetContext();
            setNotification(voucher.id_database);
            WToast.show(voucherCreatedToastOpts);
            reset({
              routes: [{ name: 'Options' }],
              index: 0,
            });
          },
        },
      ],
      { cancelable: false },
    );
  }, [
    voucherCreatedToastOpts,
    reset,
    resetContext,
    voucher.id_database,
    setNotification,
  ]);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => handleNavigationgoBack()}>
          <Icon name="chevron-left" color="#fff" size={20} />
        </BackButton>
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
      <ContinueButton onPress={() => handleSaveVoucher()}>
        <ContinueButtonText>Salvar Voucher</ContinueButtonText>
      </ContinueButton>
    </Container>
  );
};

export default PixPaymentVoucher;
