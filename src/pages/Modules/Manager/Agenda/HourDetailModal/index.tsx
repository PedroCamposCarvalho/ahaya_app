import React, { useEffect, useCallback, useState } from 'react';
import { ActivityIndicator, Linking, Alert } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import api from '@app/services/api';
import Colors from '@app/Config/Colors';
import { format } from 'date-fns';
import {
  Container,
  Header,
  Title,
  CloseButton,
  Content,
  ItemContent,
  ItemTitle,
  ItemValue,
  MaterialsList,
  MaterialName,
  MaterialAmount,
  WhatsAppButton,
  LoadingContainer,
  ButtonsContainer,
  EditButton,
  DeleteButton,
  ButtonText,
} from './styles';

export interface MaterialsProps {
  material_name: string;
  amount: number;
}

export interface AppointmentsProps {
  id: string;
  price: string;
  observation: string;
  start_date: Date;
  finish_date: Date;
  cellphone: string;
  court_name: string;
  created_at: string;
  sport_name: string;
  materials: MaterialsProps[];
}
interface PageProps {
  id_appointment: string;
  closeModal: () => void;
  closeAndRefresh: () => void;
  handleEditAppointment: () => void;
}
const HourDetailModal: React.FC<PageProps> = ({
  id_appointment,
  closeModal,
  closeAndRefresh,
  handleEditAppointment,
}) => {
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState<AppointmentsProps>(
    {} as AppointmentsProps,
  );

  useEffect(() => {
    api
      .get(`appointments/findById?id_appointment=${id_appointment}`)
      .then(response => {
        setAppointment(response.data);
        setLoading(false);
      });
  }, [id_appointment]);

  const handleOpenWhatsApp = useCallback(cellphone => {
    Linking.openURL(
      `whatsapp://send?text=Olá&phone=55${cellphone
        .replace('(', '')
        .replace(')', '')}`,
    );
  }, []);

  const handleDeleteAppointment = useCallback(() => {
    Alert.alert(
      'Atenção',
      'Deseja realmente apagar esta reserva?',
      [
        {
          style: 'destructive',
          text: 'Não',
        },
        {
          style: 'default',
          text: 'Sim',
          onPress: () => {
            setLoading(true);
            api
              .delete(
                `/appointments/deleteAppointment?id_appointment=${id_appointment}`,
              )
              .then(() => {
                closeAndRefresh();
              });
          },
        },
      ],
      { cancelable: false },
    );
  }, [id_appointment, closeAndRefresh]);

  function formatObservation(observation: string): string {
    if (observation.indexOf(' ') >= 0) {
      return String(observation).substring(0, String(observation).length - 6);
    }
    return observation;
  }

  function formatPrice(price: string): string {
    return `R$ ${String(price).replace('.', ',')}`;
  }

  return (
    <Container>
      <Header>
        <Title>Detalhes</Title>
        <CloseButton onPress={() => closeModal()}>
          <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
        </CloseButton>
      </Header>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator color="#999" size="small" />
        </LoadingContainer>
      ) : (
        <Content>
          <ItemContent>
            <ItemTitle>Cliente:</ItemTitle>
            <ItemValue>{formatObservation(appointment.observation)}</ItemValue>
          </ItemContent>
          <ItemContent>
            <ItemTitle>Telefone:</ItemTitle>
            <ItemValue>{appointment.cellphone}</ItemValue>
          </ItemContent>
          <ItemContent>
            <ItemTitle>Quadra:</ItemTitle>
            <ItemValue>{appointment.court_name}</ItemValue>
          </ItemContent>
          <ItemContent>
            <ItemTitle>Início:</ItemTitle>
            <ItemValue>
              {format(new Date(appointment.start_date), 'dd/MM/yyyy HH:mm')}
            </ItemValue>
          </ItemContent>
          <ItemContent>
            <ItemTitle>Fim:</ItemTitle>
            <ItemValue>
              {format(new Date(appointment.finish_date), 'dd/MM/yyyy HH:mm')}
            </ItemValue>
          </ItemContent>
          <ItemContent>
            <ItemTitle>Valor Pago:</ItemTitle>
            <ItemValue>{formatPrice(appointment.price)}</ItemValue>
          </ItemContent>
          {appointment.sport_name > '' && (
            <ItemContent>
              <ItemTitle>Esporte:</ItemTitle>
              <ItemValue>{appointment.sport_name}</ItemValue>
            </ItemContent>
          )}

          {/* <MaterialsList
            data={appointment.materials}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.material_name}
            renderItem={({ item: material }) => (
              <ItemContent>
                <ItemTitle>Material:</ItemTitle>
                <MaterialName>{material.material_name}</MaterialName>
                <MaterialAmount>({material.amount})</MaterialAmount>
              </ItemContent>
            )}
          /> */}
          {appointment.cellphone > '' && (
            <WhatsAppButton
              onPress={() => handleOpenWhatsApp(appointment.cellphone)}
            >
              <MaterialIcon name="whatsapp" color="#fff" size={RFValue(25)} />
            </WhatsAppButton>
          )}
          <ButtonsContainer>
            <EditButton onPress={() => handleEditAppointment()}>
              <ButtonText>Editar</ButtonText>
            </EditButton>
            <DeleteButton onPress={() => handleDeleteAppointment()}>
              <ButtonText>Apagar</ButtonText>
            </DeleteButton>
          </ButtonsContainer>
        </Content>
      )}
    </Container>
  );
};

export default HourDetailModal;
