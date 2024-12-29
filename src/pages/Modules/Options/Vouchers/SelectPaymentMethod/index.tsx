import React, { useEffect, useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Emoji from 'react-native-emoji';
import api from '../../../../../services/api';
import { useVoucher } from '../../../../../hooks/voucherpayment';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Content,
  OptionButton,
  OptionView,
  OptionText,
  ItemDescription,
  HoursContainer,
  MinusButton,
  HourText,
  PlusButton,
  PaymentContainer,
  PriceContainer,
  PriceText,
  ValueText,
  LoadingContainer,
  ContinueButton,
  ContinueButtonText,
} from './styles';

const SelectPaymentMethod: React.FC = () => {
  const navigation = useNavigation();
  const { voucher, setFinalPrice, setCreated } = useVoucher();
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [sportPrice, setSportPrice] = useState(0);
  const [hours, setHours] = useState(0);
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0.0);
  const [emoji, setEmoji] = useState('confused');
  const [loading, setLoading] = useState(true);

  const handleNavigation = useCallback((type: number) => {
    setPaymentMethod(type);
  }, []);

  useEffect(() => {
    const { id_sport } = voucher;
    api
      .get(`/sports/findPriceBySportId?id_sport=${id_sport}`)
      .then(response => {
        setSportPrice(response.data.regular);
        setLoading(false);
      });
  }, [voucher]);

  useEffect(() => {
    switch (hours) {
      case 0:
        setEmoji('confused');
        break;
      case 1:
        setEmoji(':blush:');
        break;
      case 2:
        setEmoji(':smile:');
        break;
      case 3:
        setEmoji(':grin:');
        break;
      case 4:
        setEmoji(':scream:');
        break;
      default:
        setEmoji(':scream:');
        break;
    }
  }, [hours]);

  const handleMinusHours = useCallback(() => {
    const { percentage } = voucher;
    if (hours > 0) {
      const totalPrice = Number(sportPrice) * (hours - 1);
      setOriginalPrice(totalPrice);
      setHours(hours - 1);
      setPrice((percentage * totalPrice) / 100);
      setCreated(false);
    }
  }, [hours, sportPrice, voucher, setCreated]);

  const handleAddHours = useCallback(() => {
    const { percentage } = voucher;
    const totalPrice = Number(sportPrice) * (hours + 1);
    setOriginalPrice(totalPrice);
    setHours(hours + 1);
    setPrice((percentage * totalPrice) / 100);
    setCreated(false);
  }, [hours, sportPrice, voucher, setCreated]);

  const handleContinue = useCallback(() => {
    setFinalPrice(price);

    if (paymentMethod === 2) {
      navigation.navigate('CreditCardPayment');
    } else {
      navigation.navigate('PixPayment');
    }
  }, [setFinalPrice, price, paymentMethod, navigation]);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" color="#fff" size={20} />
        </BackButton>
        <HeaderTitle>Detalhes do Voucher</HeaderTitle>
      </Header>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator color="#fff" size="large" />
        </LoadingContainer>
      ) : (
        <Content>
          <ItemDescription>Informe a quantidade de horas</ItemDescription>
          <HoursContainer>
            <MinusButton onPress={() => handleMinusHours()}>
              <Icon name="minus" color="#fff" size={20} />
            </MinusButton>
            <HourText>{hours}</HourText>
            <PlusButton onPress={() => handleAddHours()}>
              <Icon name="plus" color="#fff" size={20} />
            </PlusButton>
            <Emoji name={emoji} style={{ fontSize: 20 }} />
          </HoursContainer>
          <ItemDescription>Selecione a forma de pagamento</ItemDescription>
          <PaymentContainer>
            <OptionButton onPress={() => setPaymentMethod(2)}>
              <OptionView selected={paymentMethod === 2} />
              <OptionText>Cartão de Crédito</OptionText>
            </OptionButton>
            <OptionButton onPress={() => setPaymentMethod(6)}>
              <OptionView selected={paymentMethod === 6} />
              <OptionText>PIX</OptionText>
            </OptionButton>
          </PaymentContainer>
          <PriceContainer>
            <PriceText>Preço da hora:</PriceText>
            <ValueText>
              {`R$ ${String(sportPrice).replace('.', ',')}`}
            </ValueText>
          </PriceContainer>
          <PriceContainer>
            <PriceText>Preço sem desconto:</PriceText>
            <ValueText>
              {`R$ ${String(originalPrice).replace('.', ',')},00`}
            </ValueText>
          </PriceContainer>
          <PriceContainer>
            <PriceText>Preço a ser pago:</PriceText>
            <ValueText>{`R$ ${String(price).replace('.', ',')},00`}</ValueText>
          </PriceContainer>
        </Content>
      )}

      <ContinueButton
        enabled={price > 0 && paymentMethod > 0}
        onPress={() => handleContinue()}
      >
        <ContinueButtonText>Continuar</ContinueButtonText>
      </ContinueButton>
    </Container>
  );
};

export default SelectPaymentMethod;
