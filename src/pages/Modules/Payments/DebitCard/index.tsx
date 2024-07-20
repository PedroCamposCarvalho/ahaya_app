/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef,
} from 'react';
import {
  View,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { shade } from 'polished';
import Icon from 'react-native-vector-icons/Feather';
import { WToast } from 'react-native-smart-tip';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import CreditCardForm from 'react-native-credit-card-form-ui';
import { useAuth } from '../../../../hooks/auth';
import DebitCardPayment from '../../../../utils/Payments/debit_card';
import api from '../../../../services/api';
import {
  Container,
  DescriptionText,
  Content,
  ButtonsContainer,
  BackButton,
  BackButtonText,
  ContinueButton,
  ContinueButtonText,
  LoadingContainer,
  PaymentSuccessContainer,
  PaymentDescription,
  LinkButton,
  LinkButtonText,
  FinishButton,
  FinishButtonText,
} from './styles';

interface PageProps {
  id_dayuse: string;
  operation: string;
}

const DebitCard: React.FC = () => {
  const refusedChargeToastOpts = useMemo(() => {
    return {
      data: 'Transação recusada!',
      textColor: '#fff',
      backgroundColor: '#c53030',
      duration: WToast.duration.LONG,
      position: WToast.position.TOP,
    };
  }, []);

  const invalidCardToastOpts = useMemo(() => {
    return {
      data: 'Cartão inválido!',
      textColor: '#fff',
      backgroundColor: '#c53030',
      duration: WToast.duration.LONG,
      position: WToast.position.TOP,
    };
  }, []);

  const generalErrorToastOpts = useMemo(() => {
    return {
      data: 'Erro ao processar solicitação!',
      textColor: '#fff',
      backgroundColor: '#c53030',
      duration: WToast.duration.LONG,
      position: WToast.position.TOP,
    };
  }, []);

  const thanksToastOpts = useMemo(() => {
    return {
      data: 'Obrigado e bom jogo!',
      textColor: '#fff',
      backgroundColor: '#4bb543',
      duration: WToast.duration.LONG,
      position: WToast.position.TOP,
    };
  }, []);

  const creditCardRef = useRef() as any;
  const navigation = useNavigation();
  const { reset } = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');
  const [transactionApproved, setTransactionApproved] = useState(false);
  const [price, setPrice] = useState(40);

  const { id_dayuse, operation } = route.params as PageProps;

  useEffect(() => {
    const { id } = user;
    api.get(`users/isUserVIP?id_user=${id}`).then(response => {
      if (String(response.data) === 'true') {
        setPrice(30);
      }
    });
    setLoading(false);
  }, [user]);

  const handleCreateAppointments = useCallback(
    (id_transaction: string) => {
      const { name, ssn, email } = user;
      api.post('/dayUse/createUser', {
        id_dayuse,
        name,
        ssn,
        email,
        paid: true,
        observation: '',
        paid_price: price,
        material_amount: 0,
        id_transaction,
      });
    },
    [user, id_dayuse, navigation, price],
  );

  const handleSubmit = useCallback(async () => {
    if (creditCardRef.current) {
      setLoading(true);
      const { error, data } = creditCardRef.current.submit();
      if (error) {
        WToast.show(invalidCardToastOpts);
        setLoading(false);
      } else {
        const {
          name,
          ssn,
          cellphone,
          email,
          zipCode,
          street,
          number,
          complement,
          district,
          city,
          state,
        } = user;
        const paymentReturn = await DebitCardPayment({
          price,
          name,
          ssn,
          cellphone,
          email,
          zipCode,
          street,
          number,
          complement,
          district,
          city,
          state,
          cardNumber: data.number,
          cardExpiry: data.expiration,
          cardCvc: data.cvv,
        });

        if (paymentReturn.id_transaction !== '') {
          setTransactionApproved(true);
          setLink(paymentReturn.url);
          handleCreateAppointments(paymentReturn.id_transaction);
        } else {
          WToast.show(refusedChargeToastOpts);
          setLoading(false);
        }
      }
    }
  }, [
    invalidCardToastOpts,
    refusedChargeToastOpts,
    user,
    handleCreateAppointments,
    price,
  ]);

  const handleOkPressed = useCallback(() => {
    navigation.navigate('DayUseCreated');
    reset({
      routes: [{ name: 'SelectSport' }],
      index: 0,
    });
  }, [reset, navigation]);

  return (
    <>
      {transactionApproved ? (
        <PaymentSuccessContainer>
          <PaymentDescription>
            Sua reerva está marcada! Porém, precisamos que você finalize a
            transação no link abaixo:
          </PaymentDescription>
          <LinkButton onPress={() => Linking.openURL(link)}>
            <LinkButtonText>Acessar link</LinkButtonText>
          </LinkButton>
          <FinishButton onPress={() => handleOkPressed()}>
            <FinishButtonText>Já Paguei</FinishButtonText>
          </FinishButton>
        </PaymentSuccessContainer>
      ) : (
        <KeyboardAvoidingView
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={20}
          enabled
        >
          <Content>
            <View>
              <DescriptionText>
                Aperte no cartão para informar os valroes
              </DescriptionText>
            </View>
            <CreditCardForm
              ref={creditCardRef}
              expirationDateFormat="MM/YY"
              onValidStateChange={() => {}}
              background="#FF4500"
              textColor="#fff"
              placeholders={{
                number: '0000 0000 0000 0000',
                holder: 'NOME',
                expiration: 'MM/YY',
                cvv: 'CVC',
              }}
              placeholderTextColor={shade(0.1, '#fff')}
            />
            <ButtonsContainer>
              {loading ? (
                <LoadingContainer>
                  <ActivityIndicator color="#fff" size="small" />
                </LoadingContainer>
              ) : (
                <>
                  <BackButton onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={RFValue(20)} color="#fff" />
                    <BackButtonText>Voltar</BackButtonText>
                  </BackButton>
                  <ContinueButton onPress={() => handleSubmit()}>
                    <ContinueButtonText>Pagar</ContinueButtonText>
                  </ContinueButton>
                </>
              )}
            </ButtonsContainer>
          </Content>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default DebitCard;
