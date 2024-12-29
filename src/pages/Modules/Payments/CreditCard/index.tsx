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
} from 'react-native';
import { shade } from 'polished';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import CreditCardForm from 'react-native-credit-card-form-ui';
import { useAuth } from '../../../../hooks/auth';
import CreditCardPayment from '../../../../utils/Payments/credit_card';
import api from '../../../../services/api';
import {
  Container,
  Header,
  HeaderBackButton,
  TitleView,
  Title,
  DescriptionText,
  Content,
  ContinueButton,
  ContinueButtonText,
} from './styles';

interface PageProps {
  id_plan: string;
}

const CreditCard: React.FC = () => {
  const creditCardRef = useRef() as any;
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(40);

  const { id_plan } = route.params as PageProps;

  useEffect(() => {
    const { id } = user;
    api.get(`users/isUserVIP?id_user=${id}`).then(response => {
      if (String(response.data) === 'true') {
        setPrice(30);
      }
    });
    setLoading(false);
  }, [user]);

  const handleSubmit = useCallback(async () => {
    // if (creditCardRef.current) {
    //   setLoading(true);

    //   navigation.navigate('DayUseCreated');
    // } else {
    //   WToast.show(refusedChargeToastOpts);
    //   setLoading(false);
    // }
    api
      .post('/club/createMember', {
        id_user: user.id,
        id_plan,
        id_transaction: 'nothing to show',
      })
      .then(response => {
        navigation.navigate('MemberCreated');
      });
  }, [user, id_plan, navigation, price]);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={20}
      enabled
    >
      <Container>
        <Header>
          <HeaderBackButton onPress={() => navigation.goBack()}>
            <FeatherIcon
              name="chevron-left"
              color="#e00265"
              size={RFValue(30)}
            />
          </HeaderBackButton>
          <TitleView>
            <Title>Pagamento</Title>
          </TitleView>
        </Header>
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
            background="#139fd4"
            textColor="#fff"
            placeholders={{
              number: '0000 0000 0000 0000',
              holder: 'NOME',
              expiration: 'MM/YY',
              cvv: 'CVC',
            }}
            placeholderTextColor={shade(0.1, '#fff')}
          />
        </Content>
        <ContinueButton onPress={() => handleSubmit()}>
          <ContinueButtonText>Finalizar compra</ContinueButtonText>
        </ContinueButton>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default CreditCard;
