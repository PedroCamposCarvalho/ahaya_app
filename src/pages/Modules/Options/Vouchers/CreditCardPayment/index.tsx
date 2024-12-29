import React, { useEffect, useCallback, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { CreditCardInput } from 'react-native-credit-card-input';
import { useAuth } from '../../../../../hooks/auth';
import { useVoucher } from '../../../../../hooks/voucherpayment';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Content,
  CreditCardContainer,
  CreditCardTitle,x
} from './styles';

interface CardProps {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
}

const CreditCardPayment: React.FC = () => {
  const { user } = useAuth();
  const { voucher } = useVoucher();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const [valid, setValid] = useState(false);
  const [cardData, setCardData] = useState<CardProps>({} as CardProps);

  useEffect(() => {
    const { finalPrice } = voucher;
    setPrice(finalPrice);
  }, [voucher]);

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

  const handleCreditCardChange = useCallback(form => {
    if (form.valid) {
      setValid(true);
      const { name, number, expiry, cvc } = form.values;

      const splitExpiry = String(expiry).split('/');

      const formattedDate = `${splitExpiry[0]}/20${splitExpiry[1]}`;

      const newCardData: CardProps = {
        name,
        number,
        expiry: formattedDate,
        cvc,
      };
      setCardData(newCardData);
    } else {
      setValid(false);
    }
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => handleNavigationgoBack()}>
          <Icon name="chevron-left" color="#fff" size={20} />
        </BackButton>
        <HeaderTitle>Catão de Crédito</HeaderTitle>
      </Header>
      <Content>
        <CreditCardContainer>
          <CreditCardTitle>Informe seu cartão de crédito</CreditCardTitle>
          <CreditCardInput
            requiresName
            labels={{
              name: 'Nome Completo',
              number: 'Número do Cartão',
              expiry: 'Expira em',
              cvc: 'CVC',
            }}
            placeholders={{
              name: 'Nome',
              number: '1234 5678 1234 5678',
              expiry: 'MM/YY',
              cvc: 'CVC',
            }}
            inputStyle={{ color: '#fff' }}
            inputContainerStyle={{
              borderBottomColor: '#fff',
              borderBottomWidth: 1,
            }}
            placeholderColor="#999"
            labelStyle={{ color: '#fff' }}
            onChange={(form: any) => handleCreditCardChange(form)}
          />
        </CreditCardContainer>
      </Content>
    </Container>
  );
};

export default CreditCardPayment;
