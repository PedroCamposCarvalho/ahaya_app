import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import {
  Agenda as Calendar,
  AgendaItemsMap,
  DateObject,
} from 'react-native-calendars';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import api from '@app/services/api';
import CreateAppointmentModal from './CreateAppointmentModal';
import EditAppointmentModal from './EditAppointmentModal';
import HoursDetails from './HourDetailModal';
import MonthlyMissedDayModal from './MonthlyMissedDayModal';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  AddButton,
  Content,
  HourContainer,
  HourView,
  HourText,
  AppointmentContainer,
  CourtName,
  ClientName,
  DeleteButton,
  LoadingContainer,
  InfoButton,
} from './styles';

export interface AppointmentProps {
  id: string;
  court_name: string;
  start_date: Date;
  observation: string;
}

export interface DateProps {
  hour: number;
  appointment: AppointmentProps[];
}

const Agenda: React.FC = () => {
  const [selectedMonthlyHour, setSelectedMonthlyHour] = useState(0);
  const [selectedMonthly, setSelectedMonthly] = useState<string>('');
  const [modalOpened, setModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailsModalOpened, setDetailsModalOpened] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [searchByNameModalOpened, setSearchByNameModalOpened] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [appointments, setAppointments] = useState<DateProps[]>([]);
  const [selectedHours, setSelectedHours] = useState<AppointmentProps>(
    {} as AppointmentProps,
  );

  const navigation = useNavigation();

  useEffect(() => {
    const newDate = new Date(selectedDate);
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    api
      .get(
        `/appointments/findAgenda?day=${day}&month=${month + 1}&year=${year}`,
      )
      .then(response => {
        setAppointments(response.data);
      })
      .catch();
  }, [selectedDate]);

  const handleDateChange = useCallback((day: DateObject) => {
    setSelectedDate(new Date(day.year, day.month - 1, day.day));
  }, []);

  const handleOpenAppointmentModal = useCallback((data: AppointmentProps) => {
    setSelectedHours(data);
    setDetailsModalOpened(true);
  }, []);

  const handleCloseDetailsModal = useCallback(() => {
    setDetailsModalOpened(false);
    const newDate = new Date(selectedDate);
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    api
      .get(
        `/appointments/findAgenda?day=${day}&month=${month + 1}&year=${year}`,
      )
      .then(response => {
        setAppointments(response.data);
      })
      .catch();
  }, [selectedDate]);

  const handleDeleteAppointment = useCallback(
    (id_appointment: string, clientName: string) => {
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
                .then(response => {
                  const newDate = new Date(selectedDate);
                  const day = newDate.getDate();
                  const month = newDate.getMonth();
                  const year = newDate.getFullYear();
                  api
                    .get(
                      `/appointments/findAgenda?day=${day}&month=${
                        month + 1
                      }&year=${year}`,
                    )
                    .then(response2 => {
                      setAppointments(response2.data);
                      setLoading(false);
                    });
                });
            },
          },
        ],
        { cancelable: false },
      );
    },
    [selectedDate],
  );

  const handleRefresh = useCallback(() => {
    setModalOpened(false);
    setDetailsModalOpened(false);
    setEditModalOpen(false);
    const newDate = new Date(selectedDate);
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    api
      .get(
        `/appointments/findAgenda?day=${day}&month=${month + 1}&year=${year}`,
      )
      .then(response => {
        setAppointments(response.data);
      })
      .catch();
  }, [selectedDate]);

  const handleOpenMonthlyMondal = useCallback((id: string, hour: number) => {
    setSelectedMonthlyHour(hour);
    setSelectedMonthly(id);
    setSearchByNameModalOpened(true);
  }, []);

  const handleInfoButton = useCallback(
    (ap: AppointmentProps, hour: number) => {
      const type = ap.observation.substring(ap.observation.length - 6);

      if (type === 'Mensal') {
        handleOpenMonthlyMondal(ap.id, hour);
      } else {
        setSelectedAppointment(ap.id);
        handleOpenAppointmentModal(ap);
      }
    },
    [handleOpenAppointmentModal, handleOpenMonthlyMondal],
  );

  const handleOpenEditAppointmentModal = useCallback(() => {
    setDetailsModalOpened(false);
    setTimeout(() => {
      setEditModalOpen(true);
    }, 1000);
  }, []);

  function isMonthly(obs: string): boolean {
    return obs.substring(obs.length - 6) === 'Mensal';
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <FeatherIcon name="chevron-down" color="#006edb" size={RFValue(20)} />
        </BackButton>
        <HeaderTitle>Agenda</HeaderTitle>
        <AddButton onPress={() => setModalOpened(true)}>
          <FeatherIcon name="plus-circle" color="#006edb" size={RFValue(20)} />
        </AddButton>
      </Header>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator color="#006edb" size="large" />
        </LoadingContainer>
      ) : (
        <Calendar
          style={{ height: '100%' }}
          renderEmptyData={() => (
            <Content showsVerticalScrollIndicator={false}>
              {appointments.map(hour => (
                <HourContainer>
                  <HourView>
                    <HourText>
                      {`${hour.hour < 10 ? `0${hour.hour}` : hour.hour}:00`}
                    </HourText>
                  </HourView>
                  <FlatList
                    data={hour.appointment}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item2 => item2.id}
                    renderItem={({ item: ap }) => (
                      <AppointmentContainer>
                        <InfoButton
                          onPress={() => handleInfoButton(ap, hour.hour)}
                        >
                          <FeatherIcon
                            name={
                              isMonthly(ap.observation) ? 'info' : 'plus-circle'
                            }
                            color={
                              isMonthly(ap.observation) ? '#FFA500' : '#000'
                            }
                            size={RFValue(15)}
                          />
                        </InfoButton>
                        <CourtName>{ap.court_name}</CourtName>
                        <ClientName>{ap.observation}</ClientName>
                        <DeleteButton
                          onPress={() =>
                            handleDeleteAppointment(ap.id, ap.observation)
                          }
                        >
                          <FeatherIcon
                            name="trash-2"
                            color="red"
                            size={RFValue(15)}
                          />
                        </DeleteButton>
                      </AppointmentContainer>
                    )}
                  />
                </HourContainer>
              ))}
            </Content>
          )}
          selected={selectedDate}
          onDayPress={day => handleDateChange(day)}
        />
      )}
      <Modal isVisible={detailsModalOpened}>
        <HoursDetails
          closeModal={() => handleCloseDetailsModal()}
          id_appointment={selectedHours.id}
          closeAndRefresh={() => handleRefresh()}
          handleEditAppointment={() => handleOpenEditAppointmentModal()}
        />
      </Modal>
      <Modal isVisible={editModalOpen}>
        <EditAppointmentModal
          id_appointment={selectedAppointment}
          closeModal={() => setEditModalOpen(false)}
          closeModalAndRefresh={() => handleRefresh()}
        />
      </Modal>
      <Modal isVisible={modalOpened} backdropOpacity={0.2}>
        <CreateAppointmentModal
          closeModal={() => {
            handleRefresh();
          }}
        />
      </Modal>

      <Modal isVisible={searchByNameModalOpened} backdropOpacity={0.2}>
        <MonthlyMissedDayModal
          closeModal={() => setSearchByNameModalOpened(false)}
          selectedDate={selectedDate}
          id_monthly={selectedMonthly}
          hour={selectedMonthlyHour}
        />
      </Modal>
    </Container>
  );
};

export default Agenda;
