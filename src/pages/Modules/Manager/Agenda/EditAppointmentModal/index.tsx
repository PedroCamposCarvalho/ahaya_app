/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
import React, { useEffect, useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '@app/services/api';
import { useCourtContext, Court } from '@app/hooks/courts';
import { useSportContext } from '@app/hooks/sports';
import { FlatList } from 'react-native-gesture-handler';
import Environment from '@app/Config/Environment';
import Colors from '@app/Config/Colors';
import {
  Container,
  Header,
  Title,
  CloseButton,
  Content,
  ClientNameView,
  ClientName,
  Icon,
  InitialDateView,
  InitialDateTitle,
  HoursView,
  InitialHourView,
  InitialHour,
  FinalHourView,
  FinalHour,
  FinishButton,
  FinishButtonText,
  CourtsContainer,
  CourtsTitle,
  CourtView,
  CourtsContent,
  CourtOption,
  CourtNumber,
} from './styles';

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
  number_of_players: number;
}

interface PageProps {
  id_appointment: string;
  closeModal: () => void;
  closeModalAndRefresh: () => void;
}

const EditAppointmentModal: React.FC<PageProps> = ({
  id_appointment,
  closeModal,
  closeModalAndRefresh,
}) => {
  const [initialDate, setInitialDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clientName, setClientName] = useState('');
  const [initialHour, setInitialHour] = useState('');
  const [finalHour, setFinalHour] = useState('');
  const [selectedCourt, setSelectedCourt] = useState<Court>({} as Court);
  const [appointment, setAppointment] = useState<AppointmentsProps>(
    {} as AppointmentsProps,
  );

  const { courts } = useCourtContext();
  const { sports } = useSportContext();

  useEffect(() => {
    api
      .get(`appointments/findById?id_appointment=${id_appointment}`)
      .then(response => {
        setAppointment(response.data);

        setLoading(false);
        setInitialHour(String(new Date(response.data?.start_date).getHours()));
        setFinalHour(String(new Date(response.data?.finish_date).getHours()));
        setInitialDate(new Date(response.data?.finish_date));
        setClientName(response.data?.observation);
        setSelectedCourt(
          courts.filter(item => item.id === response.data.id_court)[0],
        );
      });
  }, [id_appointment, courts]);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      setShowDatePicker(false);
      if (date) {
        setInitialDate(date);
      }
    },
    [],
  );

  const handleFinish = useCallback(() => {
    if (clientName === '') {
      throw new Error('Informe o cliente');
    }
    if (Number(initialHour) >= Number(finalHour)) {
      throw new Error('Data final não pode ser maior ou igual a data inicial');
    }
    const data = {
      id: appointment.id,
      id_court: selectedCourt.id,
      observation: clientName,
      start_date: new Date(
        new Date(initialDate.setHours(Number(initialHour))).setMinutes(0),
      ),
      finish_date: new Date(
        new Date(initialDate.setHours(Number(finalHour))).setMinutes(0),
      ),
      price: appointment.price.replace('R$', '').replace(',', '.').trim(),
      number_of_players: appointment.number_of_players,
    };
    setLoading(true);
    api.put('/appointments/editAppointment', data).then(() => {
      closeModalAndRefresh();
    });
  }, [
    appointment,
    clientName,
    initialHour,
    finalHour,
    selectedCourt,
    initialDate,
    closeModalAndRefresh,
  ]);

  const handleInitialHourChange = useCallback((text: string) => {
    if (Number(text) >= 25) {
      setInitialHour('24');
    } else {
      setInitialHour(text);
    }
  }, []);

  const handleFinalHourChange = useCallback((text: string) => {
    if (Number(text) >= 25) {
      setFinalHour('24');
    } else {
      setFinalHour(text);
    }
  }, []);

  return (
    <Container>
      <Header>
        <Title>Editar reserva</Title>
        <CloseButton onPress={() => closeModal()}>
          <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
        </CloseButton>
      </Header>

      <Content showsVerticalScrollIndicator={false}>
        <ClientNameView>
          <Icon name="user" color="#999" size={RFValue(20)} />
          <ClientName
            placeholder="Cliente"
            placeholderTextColor="#999"
            autoCapitalize="words"
            value={clientName}
            onChangeText={text => setClientName(text)}
          />
        </ClientNameView>
        <InitialDateView>
          <InitialDateTitle>Data início</InitialDateTitle>
          <DateTimePicker
            mode="date"
            textColor="#000"
            value={initialDate}
            onChange={handleDateChanged}
            style={{
              alignSelf: 'center',
              width: '100%',
              borderRadius: 10,
              marginTop: 5,
              height: RFValue(40),
            }}
          />
        </InitialDateView>
        <HoursView>
          <InitialHourView>
            <Icon name="clock" color="#999" size={RFValue(16)} />
            <InitialHour
              placeholder="Início"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={2}
              value={initialHour}
              onChangeText={text => handleInitialHourChange(text)}
            />
          </InitialHourView>
          <FinalHourView>
            <Icon name="clock" color="#999" size={RFValue(16)} />
            <FinalHour
              placeholder="Fim"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={2}
              value={finalHour}
              onChangeText={text => handleFinalHourChange(text)}
            />
          </FinalHourView>
        </HoursView>
        <CourtsContainer>
          <CourtsTitle>Selecione as quadras</CourtsTitle>
          <CourtsContent>
            <FlatList
              data={courts}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              renderItem={({ item: court }) => (
                <CourtView>
                  <CourtOption
                    selected={selectedCourt === court}
                    onPress={() => setSelectedCourt(court)}
                  />
                  <CourtNumber>{court.courtname}</CourtNumber>
                </CourtView>
              )}
            />
          </CourtsContent>
        </CourtsContainer>
        <FinishButton onPress={() => handleFinish()}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <FinishButtonText>Concluir</FinishButtonText>
          )}
        </FinishButton>
      </Content>
    </Container>
  );
};

export default EditAppointmentModal;
