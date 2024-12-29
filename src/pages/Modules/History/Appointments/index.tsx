import React, { useEffect, useCallback, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { RFValue } from 'react-native-responsive-fontsize';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

import { format } from 'date-fns';
import { useAuth } from '@app/hooks/auth';
import api from '@app/services/api';
import user_history_appointments from '@app/interfaces/user_history_appointments';
import IMonths from '@app/interfaces/months';
import getMonths from '@app/utils/getMonths';
import DetailsModal from './DetailsModal';
import {
  Container,
  Header,
  Title,
  Content,
  LoadingContainer,
  AppointmentsList,
  AppointmentContainer,
  AppointmentDetails,
  StartDate,
  FinishDate,
  CreatedAt,
  NumberPlayers,
  ViewDetailsButton,
  CourtName,
  MonthsList,
  MonthContainer,
  MonthNumber,
  NoAppointmentsContainer,
  NoAppointmentsText,
  ModalView,
} from './styles';

const Appointments: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    new Date().getMonth() + 1,
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [appointments, setAppointments] = useState<user_history_appointments[]>(
    [],
  );
  const [selectedAppointment, setSelectedAppointment] =
    useState<user_history_appointments>({} as user_history_appointments);
  const [months, setMonths] = useState<IMonths[]>(getMonths());
  const [modalOpen, setModalOpen] = useState(false);

  const years = [2021, 2022];

  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    api
      .get(
        `/appointments/findUserHistory?id_user=${user.id}&month=${selectedMonth}&year=${selectedYear}`,
      )
      .then(response => {
        setAppointments(response.data);
        setLoading(false);
      });
  }, [selectedMonth, selectedYear, user.id]);

  const handleOpenModal = useCallback(
    (appointment: user_history_appointments) => {
      setSelectedAppointment(appointment);
      setModalOpen(true);
    },
    [],
  );

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <Title>Suas reservas passadas:</Title>
          <SelectDropdown
            data={years}
            onSelect={(selectedItem, index) => {
              setSelectedYear(selectedItem);
            }}
            defaultValue={new Date().getFullYear()}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
            rowTextForSelection={(item, index) => item}
            buttonStyle={{
              width: RFValue(100),
              borderRadius: RFValue(10),
              backgroundColor: 'transparent',
              borderWidth: RFValue(1),
              borderColor: '#fff',
            }}
            buttonTextStyle={{ color: '#fff' }}
          />
        </Header>
        <Content>
          <>
            {loading ? (
              <LoadingContainer>
                <ActivityIndicator size="large" color="#fff" />
              </LoadingContainer>
            ) : (
              <>
                {appointments.length === 0 ? (
                  <NoAppointmentsContainer>
                    <NoAppointmentsText>
                      Nenhuma reserva encontrada
                    </NoAppointmentsText>
                  </NoAppointmentsContainer>
                ) : (
                  <FlatList
                    data={appointments}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item: appointment }) => (
                      <AppointmentContainer>
                        <AppointmentDetails>
                          <CourtName>{appointment.court_name}</CourtName>
                          <StartDate>
                            {`De: ${format(
                              new Date(appointment.start_date),
                              'dd/MM/yyyy HH:mm',
                            )}`}
                          </StartDate>
                          <FinishDate>
                            {`Até: ${format(
                              new Date(appointment.finish_date),
                              'dd/MM/yyyy HH:mm',
                            )}`}
                          </FinishDate>

                          <NumberPlayers>
                            {`Jogadores: ${appointment.number_of_players}`}
                          </NumberPlayers>
                        </AppointmentDetails>
                        <ViewDetailsButton
                          onPress={() => handleOpenModal(appointment)}
                        >
                          <FeatherIcon
                            name="more-horizontal"
                            color="#fff"
                            size={RFValue(20)}
                          />
                        </ViewDetailsButton>
                      </AppointmentContainer>
                    )}
                  />
                )}
              </>
            )}
            <FlatList
              data={months}
              keyExtractor={item => String(item.number)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: month }) => (
                <MonthContainer
                  selected={selectedMonth === month.number}
                  onPress={() => setSelectedMonth(month.number)}
                >
                  <MonthNumber selected={selectedMonth === month.number}>
                    {month.name === 'Todos'
                      ? month.name
                      : month.name.substring(0, 3)}
                  </MonthNumber>
                </MonthContainer>
              )}
            />
          </>
        </Content>
        <Modal isVisible={modalOpen}>
          <ModalView>
            <DetailsModal
              appointment={selectedAppointment}
              closeModal={() => setModalOpen(false)}
            />
          </ModalView>
        </Modal>
      </Container>
    </LinearGradient>
  );
};

export default Appointments;
