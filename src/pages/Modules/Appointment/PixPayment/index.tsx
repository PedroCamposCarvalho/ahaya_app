import React, { useEffect, useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { differenceInMinutes } from 'date-fns';
import Toast from 'react-native-toast-message';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-community/clipboard';
import { PayPix } from '@app/utils/Payments/vindi_pix';
import api from '@app/services/api';
import { useAppointmentContext } from '@app/hooks/appointment';
import { useAuth } from '@app/hooks/auth';
import productId from '@app/Config/ProductsIds';
import env from '@app/Config/Environment';
import pixImage from '@app/assets/pix.png';
import {
  Container,
  LoadingContainer,
  LoadingDescription,
  Content,
  PixImage,
  Description,
  SubDescription,
  CodeContainer,
  CodeText,
  CopyToClipboardButton,
  Footer,
  CopyButton,
  CopyButtonText,
  TimeoutContainer,
  TimeoutText,
  ReloadButton,
  ReloadButtonText,
  ErrorContainer,
  ErrorDescription,
  ErrorButton,
  ErrorButtonText,
} from './styles';

interface PixProps {
  id_transaction: string;
  pix_code: string;
  pix_qr_code: string;
}
const DayUsePixPayment: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PixProps>({} as PixProps);
  const [paid, setPaid] = useState(false);
  const [paymentTimeout, setPaymentTimeout] = useState(false);
  const [reCreate, setReCreate] = useState(false);
  const [createdDate, setCreatedDate] = useState(new Date());
  const { reset } = useNavigation();
  const navigation = useNavigation();
  const { user } = useAuth();
  const [error, setError] = useState(false);
  const { appointment, hours, materials, setIdTransactionAndUserData } =
    useAppointmentContext();

  useEffect(() => {
    setCreatedDate(new Date());
    const priceToPay = env.byPass ? 2 : appointment.priceToPay;
    PayPix(user, priceToPay, productId.appointment).then(response => {
      setData(response);
      const tempAppointment = appointment;
      tempAppointment.email = user.email;
      tempAppointment.id_user = user.id;
      tempAppointment.id_place = env.id_place;
      tempAppointment.user_name = user.name;
      tempAppointment.finalPrice = appointment.finalPrice;
      tempAppointment.id_transaction = response.id_transaction;
      tempAppointment.paid = false;
      api
        .post('/appointments/createScore', {
          appointment: tempAppointment,
          hours,
          materials,
        })
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
      setLoading(false);
    });
  }, [user, appointment, hours, materials, reCreate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paid && !paymentTimeout) {
        if (differenceInMinutes(new Date(), createdDate) > 29) {
          setPaymentTimeout(true);
        } else {
          api
            .get(`/payments/consultCharge?id=${data.id_transaction}`)
            .then(response => {
              if (String(response.data.status) !== 'paid') {
                setPaid(true);
                setLoading(true);
                navigation.navigate('AppointmentCreated', {
                  createAppointment: false,
                });
              }
            });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [paid, paymentTimeout, data, user, navigation, createdDate]);

  const copyToClipboard = useCallback(() => {
    Clipboard.setString(data.pix_code);
    Toast.show({
      type: 'info',
      text2: 'Código copiado!',
    });
  }, [data]);

  const handleReCreateCode = useCallback(() => {
    setLoading(true);
    setReCreate(!reCreate);
    setPaymentTimeout(false);
  }, [reCreate]);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#fff" size="large" />
            <LoadingDescription>
              {
                'Aguarde... estamos criando o código do PIX.\nIsso pode levar alguns segundos'
              }
            </LoadingDescription>
          </LoadingContainer>
        ) : (
          <>
            {error ? (
              <ErrorContainer>
                <MaterialIcon name="error" color="#ECAC04" size={RFValue(64)} />
                <ErrorDescription>
                  {
                    'Ops, parece que outra pessoa estava fazendo a mesma reserva ao mesmo tempo que você.\nPara evitar duplicidade nós consideramos quem fez a reserva primeiro, e, por isso, infelizmente sua reserva não foi concluída.\nAperte no botão abaixo para ver novos horários!'
                  }
                </ErrorDescription>
                <ErrorButton
                  onPress={() => {
                    reset({
                      routes: [{ name: 'SelectSport' }],
                      index: 0,
                    });
                  }}
                >
                  <ErrorButtonText>Voltar para seleção de hora</ErrorButtonText>
                </ErrorButton>
              </ErrorContainer>
            ) : (
              <>
                {paymentTimeout ? (
                  <TimeoutContainer>
                    <TimeoutText>
                      {
                        'Ops, essa cobrança expirou.\nSe quiser gerar um novo código, aperte no botão abaixo'
                      }
                    </TimeoutText>
                    <ReloadButton onPress={() => handleReCreateCode()}>
                      <ReloadButtonText>Gerar novo código</ReloadButtonText>
                    </ReloadButton>
                  </TimeoutContainer>
                ) : (
                  <>
                    <Content>
                      <PixImage source={pixImage} />

                      <Description>Aguardando pagamento...</Description>
                      <SubDescription>
                        {
                          'Copie o código abaixo para pagar via Pix em qualquer aplicativo habilitado.\nApós o pagamento essa tela fechará sozinha.\nEste processo pode levar alguns segundos...'
                        }
                      </SubDescription>
                      <CodeContainer>
                        <CodeText numberOfLines={1}>{data.pix_code}</CodeText>
                        <CopyToClipboardButton
                          onPress={() => copyToClipboard()}
                        >
                          <FeatherIcon
                            name="copy"
                            color="#fff"
                            size={RFValue(20)}
                          />
                        </CopyToClipboardButton>
                      </CodeContainer>
                    </Content>
                    <Footer>
                      <CopyButton onPress={() => copyToClipboard()}>
                        <CopyButtonText>Copiar código</CopyButtonText>
                      </CopyButton>
                    </Footer>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </LinearGradient>
  );
};

export default DayUsePixPayment;
