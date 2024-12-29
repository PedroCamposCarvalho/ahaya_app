import React, { useCallback, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import api from '../../../../../services/api';
import { AppointmentProps } from '../index';
import {
  Container,
  Header,
  Title,
  CloseButton,
  Content,
  AppointmentsList,
  AppointmentItem,
  AppointmentObservation,
  CourtNumber,
  CourtName,
  EditButton,
  DeleteButton,
  LoadingContainer,
} from './styles';

interface PageProps {
  closeModal: () => void;
  data: AppointmentProps[];
}

const HourDetails: React.FC<PageProps> = ({ closeModal, data }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteOnlyOneAppointment = useCallback(() => {
    setLoading(false);
    api
      .delete(`/appointments/deleteAppointment?id_appointment=${data[0].id}`)
      .then(response => {
        if (String(response.data) === 'true') {
          closeModal();
        }
      })
      .catch(error => {
        setLoading(false);
      });
  }, [data, closeModal]);

  const handleDeleteAllAppointments = useCallback(() => {
    setLoading(true);
    const splitDate = data[0].start_date.substring(0, 10).split('-');
    const date = new Date(
      Number(splitDate[0]),
      Number(splitDate[1]) - 1,
      Number(splitDate[2]),
    );
    api
      .delete(
        `/appointments/allUserDayAppointments?observation=${
          data[0].observation
        }&day=${date.getDay()}`,
      )
      .then(response => {
        if (String(response.data) === 'true') {
          closeModal();
        }
      })
      .catch(error => {
        setLoading(false);
      });
  }, [data, closeModal]);

  const handleDelete = useCallback(() => {
    const splitDate = data[0].start_date.substring(0, 10).split('-');
    const date = new Date(
      Number(splitDate[0]),
      Number(splitDate[1]) - 1,
      Number(splitDate[2]),
    );
    api
      .get(
        `/appointments/verifyMoreThan1Hour?observation=${
          data[0].observation
        }&day=${date.getDay()}`,
      )
      .then(response => {
        if (String(response.data) === 'true') {
          Alert.alert(
            'Multiplos agendamentos',
            // This is body text
            'Identificamos que essa reserva é de um mensalista. O que deseja apagar?',
            [
              {
                text: 'Apagar só essa',
                onPress: () => handleDeleteOnlyOneAppointment(),
              },
              {
                text: 'Apagar tudo',
                onPress: () => handleDeleteAllAppointments(),
              },
              {
                text: 'Cancelar',
                style: 'destructive',
              },
            ],
            { cancelable: true },
          );
        }
      });
  }, [data, handleDeleteOnlyOneAppointment, handleDeleteAllAppointments]);
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
          <AppointmentsList
            data={data}
            keyExtractor={appointment => appointment.id}
            renderItem={({ item: appointment }) => (
              <AppointmentItem>
                <AppointmentObservation>
                  {appointment.observation}
                </AppointmentObservation>
                <CourtNumber number={Number(appointment.court_name.slice(-2))}>
                  <CourtName>
                    {Number(appointment.court_name.slice(-2))}
                  </CourtName>
                </CourtNumber>

                <EditButton>
                  <FeatherIcon name="edit" color="#fff" size={RFValue(15)} />
                </EditButton>
                <DeleteButton onPress={() => handleDelete()}>
                  <FeatherIcon
                    name="trash-2"
                    color="#c53030"
                    size={RFValue(15)}
                  />
                </DeleteButton>
              </AppointmentItem>
            )}
          />
        </Content>
      )}
    </Container>
  );
};

export default HourDetails;
