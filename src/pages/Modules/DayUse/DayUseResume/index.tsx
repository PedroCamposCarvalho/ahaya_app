import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { ActivityIndicator, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { io } from 'socket.io-client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { useAuth } from '../../../../hooks/auth';
import { useDayUse } from '../../../../hooks/dayuse';
import env from '../../../../Config/Environment';
import PixPaymentData from '../../../../utils/Payments/pix';
import api from '../../../../services/api';
import {
  Container,
  Header,
  BackButton,
  TitleView,
  HeaderTitle,
  Content,
  DateText,
  HourText,
  GoToPaymentButton,
  GoToPaymentButtonText,
  TicketsItemContainer,
  TicketsTitle,
  TicketsDetailsContainer,
  TicketPrice,
  TicketCountContainer,
  TicketMinusButton,
  TicketAmmount,
  TicketPlusButton,
  FinalPriceText,
} from './styles';

interface RouteParams {
  special_image: string;
}

const DayUsePayment: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const { dayUse, setPrice, setMaterialAmount, setTicketsAmount } = useDayUse();
  const { id, limit, start_date, finish_date, price } = dayUse;
  const [needMaterial, setNeedMaterial] = useState(3);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [materials, setMaterials] = useState(0);
  const { special_image } = route.params as RouteParams;

  const socket = useMemo(
    () =>
      io(`${env.url}`, {
        query: {
          id_user: user.id,
        },
      }),
    [user.id],
  );
  useEffect(() => {
    socket.on('NewDayUseList', () => {
      api.get(`/dayUse/findAvailability?id_dayuse=${id}`).then(response2 => {
        const availability = limit - Number(response2.data);
        if (availability === 0) {
          navigation.goBack();
        }
      });
    });
  }, [socket, id, limit, navigation]);

  const handleContinue = useCallback(() => {
    setPrice(finalPrice);
    setMaterialAmount(materials);
    setTicketsAmount(tickets);
    navigation.navigate('DayUseCreditCardPayment');
  }, [
    navigation,
    finalPrice,
    materials,
    tickets,
    setPrice,
    setMaterialAmount,
    setTicketsAmount,
  ]);

  const handleRemoveTicket = useCallback(() => {
    if (tickets !== 0) {
      if (materials === tickets) {
        setMaterials(materials - 1);
      }
      setTickets(tickets - 1);
      setFinalPrice(finalPrice - Number(dayUse.price));
    }
  }, [tickets, finalPrice, materials, dayUse.price]);

  const handleAddTicket = useCallback(() => {
    setTickets(tickets + 1);
    setFinalPrice(finalPrice + Number(dayUse.price));
  }, [tickets, finalPrice, dayUse.price]);

  const handleRemoveMaterial = useCallback(() => {
    if (materials !== 0) {
      setMaterials(materials - 1);
    }
  }, [materials]);

  const handleAddMaterial = useCallback(() => {
    if (materials + 1 > tickets) {
    } else {
      setMaterials(materials + 1);
    }
  }, [materials, tickets]);

  function getDayDescription(): string {
    const formattedDate = format(
      new Date(start_date),
      "EEEE', ' dd'/'MM'/'yyyy'",
      {
        locale: ptBR,
      },
    );
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  function getHourDescription(): string {
    const firstHour = format(new Date(start_date), 'HH:00', {
      locale: ptBR,
    });
    const lastHour = format(new Date(finish_date), 'HH:00', {
      locale: ptBR,
    });
    return `De ${firstHour} às ${lastHour}`;
  }

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="chevron-down" size={RFValue(25)} color="#fff" />
          </BackButton>
          <TitleView>
            <HeaderTitle>Check Out</HeaderTitle>
          </TitleView>
        </Header>
        <Content contentContainerStyle={{ alignItems: 'center' }}>
          <DateText>{`Data: ${getDayDescription()}`}</DateText>
          <HourText>{getHourDescription()}</HourText>
          <TicketsItemContainer>
            <TicketsDetailsContainer>
              <TicketsTitle>Ingressos:</TicketsTitle>
              <TicketPrice>
                R$ {String(dayUse.price).replace('.', ',')}
              </TicketPrice>
            </TicketsDetailsContainer>
            <TicketCountContainer>
              <TicketMinusButton onPress={() => handleRemoveTicket()}>
                <Icon name="minus" color="#fff" size={RFValue(18)} />
              </TicketMinusButton>
              <TicketAmmount>{tickets}</TicketAmmount>
              <TicketPlusButton onPress={() => handleAddTicket()}>
                <Icon name="plus" color="#fff" size={RFValue(18)} />
              </TicketPlusButton>
            </TicketCountContainer>
          </TicketsItemContainer>
          <TicketsItemContainer>
            <TicketsDetailsContainer>
              <TicketsTitle>Raquetes :</TicketsTitle>
              <TicketPrice>1 para cada ticket</TicketPrice>
            </TicketsDetailsContainer>
            <TicketCountContainer>
              <TicketMinusButton onPress={() => handleRemoveMaterial()}>
                <Icon name="minus" color="#fff" size={RFValue(18)} />
              </TicketMinusButton>
              <TicketAmmount>{materials}</TicketAmmount>
              <TicketPlusButton onPress={() => handleAddMaterial()}>
                <Icon name="plus" color="#fff" size={RFValue(18)} />
              </TicketPlusButton>
            </TicketCountContainer>
          </TicketsItemContainer>
          {special_image > '' ? (
            <Image
              source={{
                uri: `https://app-ahaya.s3.amazonaws.com/${special_image}`,
              }}
              style={{
                height: RFValue(200),
                width: RFValue(200),
                borderRadius: 20,
              }}
            />
          ) : (
            <></>
          )}
        </Content>
        <FinalPriceText>Preço a ser pago: R$ {finalPrice},00</FinalPriceText>
        <GoToPaymentButton
          enabled={tickets > 0}
          onPress={() => handleContinue()}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <GoToPaymentButtonText>Continuar</GoToPaymentButtonText>
          )}
        </GoToPaymentButton>
      </Container>
    </LinearGradient>
  );
};

export default DayUsePayment;
