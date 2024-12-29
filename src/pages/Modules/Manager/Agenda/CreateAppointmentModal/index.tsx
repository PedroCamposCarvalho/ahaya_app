/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '@app/services/api';
import { useCourtContext, Court } from '@app/hooks/courts';
import { useSportContext } from '@app/hooks/sports';
import { FlatList } from 'react-native-gesture-handler';
import Environment from '@app/Config/Environment';
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

interface PageProps {
  closeModal: () => void;
}

const CreateAppointmentModal: React.FC<PageProps> = ({ closeModal }) => {
  const [initialDate, setInitialDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clientName, setClientName] = useState('');
  const [initialHour, setInitialHour] = useState('');
  const [finalHour, setFinalHour] = useState('');
  const [courtNumber, setCourtNumber] = useState(0);
  const [selectedCourts, setSelectedCourts] = useState<Court[]>([]);

  const { courts } = useCourtContext();
  const { sports } = useSportContext();
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
    try {
      if (clientName === '') {
        throw new Error('Informe o cliente');
      }
      if (Number(initialHour) >= Number(finalHour)) {
        throw new Error(
          'Data final não pode ser maior ou igual a data inicial',
        );
      }
      if (selectedCourts.length === 0) {
        throw new Error('Selecione uma quadra');
      }

      const appointment = {
        id_sport: sports[0].id,
        id_place: Environment.id_place,
        sport_name: 'Beach Tennis',
        finalPrice: 0,
        id_transaction: '',
        id_user: '',
        user_name: clientName,
        email: 'temp',
        paid: true,
        priceToPay: 0,
        points: 0,
        winningPoints: 0,
      };
      const hours: any[] = [];
      selectedCourts.map(item => {
        hours.push({
          id: '123',
          id_court: item.id,
          start_date: new Date(
            new Date(initialDate.setHours(Number(initialHour))).setMinutes(0),
          ),
          finish_date: new Date(
            new Date(initialDate.setHours(Number(finalHour))).setMinutes(0),
          ),
          number_of_players: 0,
          court_name: item.courtname,
        });
        return null;
      });

      api.post('/appointments/create', { appointment, hours }).then(() => {
        closeModal();
      });
    } catch (error) {}
  }, [
    clientName,
    initialHour,
    finalHour,
    selectedCourts,
    initialDate,
    sports,
    closeModal,
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

  const handleCourtChange = useCallback(
    (item: Court) => {
      const tempArray = selectedCourts;
      if (tempArray.indexOf(item) > -1) {
        setSelectedCourts(tempArray.filter(e => e !== item));
      } else {
        setSelectedCourts([...selectedCourts, item]);
      }
    },
    [selectedCourts],
  );

  return (
    <Container>
      <Header>
        <Title>Nova reserva</Title>
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
              renderItem={({ item: court, index }) => (
                <CourtView>
                  <CourtOption
                    selected={selectedCourts.indexOf(court) > -1}
                    onPress={() => handleCourtChange(court)}
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

export default CreateAppointmentModal;
