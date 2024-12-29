import React, { useEffect, useCallback, useState, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
  Linking,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { format, differenceInMinutes, addHours } from 'date-fns';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import ptBR from 'date-fns/locale/pt-BR';
import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';
import {
  Container,
  LoadingContainer,
  Header,
  HeaderContent,
  BackButton,
  Title,
  Content,
  ItemContainer,
  ItemTitle,
  ItemDescription,
  MaterialsContainer,
  MaterialsTitle,
  MaterialsList,
  MaterialsContent,
  MaterialsDescription,
  MaterialsAmount,
  OptionsContainer,
  EditAppointmentButton,
  EditAppointmentText,
  CancelAppointmentButton,
  CancelAppointmentText,
  WhatsAppButton,
} from './styles';

interface RouteParams {
  id_appointment: string;
  observation: string;
  onGoBack: () => void;
}

interface AppointmentProps {
  id: string;
  price: number;
  start_date: Date;
  finish_date: Date;
  canceled: boolean;
  created_at: Date;
  court_name: string;
  id_court: string;
  created_sequence: boolean;
  id_transaction: string;
  count_transaction: number;
  observation: string;
  cellphone: string;
}

export interface MaterialsProps {
  id: string;
  material: string;
  amount: number;
  length: number;
}

interface PaymentDataProps {
  x_api_key: string;
  vendor: string;
  customer: string;
  customer_ssn: string;
  customer_phone: string;
  customer_email: string;
  customer_zipcode: string;
  customer_street: string;
  customer_number: string;
  customer_complement: string;
  customer_district: string;
  customer_cityname: string;
  customer_stateinitials: string;
  customer_countryname: string;
}

const FutureAppointmentDetail: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();

  const navigation = useNavigation();
  const { reset } = useNavigation();

  const { id_appointment, observation, onGoBack } = route.params as RouteParams;

  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState<AppointmentProps>(
    {} as AppointmentProps,
  );

  const [paymentData, setPaymentData] = useState<PaymentDataProps>(
    {} as PaymentDataProps,
  );

  const [materials, setMaterias] = useState<MaterialsProps[]>([]);

  function formatDate(date: Date): string {
    const newDate = new Date(date);
    const dateToReturn = format(
      addHours(newDate.getTime(), 3),
      "dd/MM/yyyy 'às' HH:mm'h'",
      {
        locale: ptBR,
      },
    );
    return dateToReturn;
  }

  function formatCreatedAtDate(date: Date): string {
    const newDate = new Date(date);
    const dateToReturn = format(newDate.getTime(), "dd/MM/yyyy 'às' HH:mm'h'", {
      locale: ptBR,
    });
    return dateToReturn;
  }
  useEffect(() => {
    api
      .get(`/appointments/findById?id_appointment=${id_appointment}`)
      .then(response => {
        const { start_date } = response.data;
        const now = new Date();

        setAppointment(response.data);

        api
          .get(`/materials/findByAppointment?id_appointment=${id_appointment}`)
          .then(materialsResponse => {
            setMaterias(materialsResponse.data);
            setLoading(false);
          })
          .catch(error => {});
      })
      .catch(error => {});
  }, [id_appointment]);

  function numberToReal(value: number): string {
    const numero = value.toFixed(2).split('.');
    numero[0] = `R$ ${numero[0].split(/(?=(?:...)*$)/).join('.')}`;
    return String(numero.join(','));
  }

  const headers = useMemo(
    () => ({
      'x-api-key': paymentData.x_api_key,
      'Content-Type': 'application/json',
    }),
    [paymentData.x_api_key],
  );

  const handleCancelAppointment = useCallback(() => {
    setLoading(true);

    api
      .put(`/appointments/cancelAppointment?id_appointment=${id_appointment}`)
      .then(response2 => {
        setLoading(false);
        onGoBack();
        navigation.goBack();
      });
  }, [id_appointment, navigation]);

  const confirmCancel = useCallback(() => {
    Alert.alert(
      'Cancelar reserva',
      'Deseja realmente cancelar esta reserva?',
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          onPress: () => {
            handleCancelAppointment();
          },
        },
      ],
      { cancelable: false },
    );
  }, []);

  const handleEditAppointment = useCallback(() => {
    const { id, id_court, start_date } = appointment;

    navigation.navigate('EditAppointmentHours', {
      id_appointment: id,
      id_court,
      start_date,
      observation,
    });
  }, [appointment, navigation, observation]);

  const textPriceReturn = useMemo(() => {
    const now = new Date();
    const date = new Date(appointment.start_date);

    if (differenceInMinutes(date.getTime(), now.getTime()) <= 180) {
      return {
        text: 'O valor não será estornado!',
      };
    }
    if (
      differenceInMinutes(date.getTime(), now.getTime()) > 180 &&
      differenceInMinutes(date.getTime(), now.getTime()) <= 1440
    ) {
      return {
        text: '50% do valor desta reserva será estornado',
      };
    }
    return {
      text: 'O valor total desta reserva será estornado',
    };
  }, [appointment.start_date]);

  const paydPrice = useMemo(
    () => ({
      text: numberToReal(appointment.price / appointment.count_transaction),
    }),
    [appointment.price, appointment.count_transaction],
  );
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <Header>
              <HeaderContent>
                <BackButton onPress={() => navigation.goBack()}>
                  <Icon name="chevron-left" size={24} color="#999" />
                </BackButton>
                <Title>Detalhes da reserva</Title>
              </HeaderContent>
            </Header>
            {loading ? (
              <LoadingContainer>
                <ActivityIndicator color="#99d420" size="large" />
              </LoadingContainer>
            ) : (
              <Content>
                <ItemContainer>
                  <ItemTitle>Quadra: </ItemTitle>
                  <ItemDescription>{appointment.court_name}</ItemDescription>
                </ItemContainer>
                <ItemContainer>
                  <ItemTitle>Horário: </ItemTitle>
                  <ItemDescription>
                    {formatDate(appointment.start_date)}
                  </ItemDescription>
                </ItemContainer>
                <ItemContainer>
                  <ItemTitle>Cliente: </ItemTitle>
                  <ItemDescription>{observation}</ItemDescription>
                </ItemContainer>
                <ItemContainer>
                  <ItemTitle>Telefone: </ItemTitle>
                  <ItemDescription>{appointment.cellphone}</ItemDescription>
                </ItemContainer>
                <WhatsAppButton
                  activeOpacity={false}
                  onPress={() =>
                    Linking.openURL(
                      `whatsapp://send?text=Olá!&phone=55${appointment.cellphone
                        .replace('(', '')
                        .replace(')', '')}`,
                    )
                  }
                >
                  <Image
                    source={{
                      uri: 'https://app-arenaibirapuera.s3.amazonaws.com/whatsapplogo.png',
                    }}
                    style={{
                      height: 30,
                      width: 30,
                      resizeMode: 'contain',
                    }}
                  />
                </WhatsAppButton>

                {materials.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <ItemContainer>
                      <ItemTitle>Criado em: </ItemTitle>
                      <ItemDescription>
                        {formatCreatedAtDate(appointment.created_at)}
                      </ItemDescription>
                    </ItemContainer>
                    <ItemContainer>
                      <ItemTitle>Valor pago: </ItemTitle>
                      <ItemDescription>{paydPrice.text}</ItemDescription>
                    </ItemContainer>
                  </>
                )}
              </Content>
            )}
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default FutureAppointmentDetail;
