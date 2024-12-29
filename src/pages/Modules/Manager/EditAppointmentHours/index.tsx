/* eslint-disable prefer-const */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, addHours } from 'date-fns';

import Icon from 'react-native-vector-icons/Feather';
import api from '../../../../services/api';

import {
  Container,
  BackButton,
  LoadingContainer,
  Content,
  CourtListContainer,
  CourtsList,
  CourtContainer,
  CourtPhoto,
  CourtName,
  CalendarContainer,
  CalendarTitle,
  CalendarTitleIOS14,
  OpenDatePickerButton,
  OpenDatePickerText,
  SelectedDateView,
  SelectedDate,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  FinishButton,
  FinishButtonText,
} from './styles';

interface RouteParams {
  id_appointment: string;
  id_court: string;
  start_date: Date;
  created_sequence: boolean;
  observation: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
  hourFormatted: string;
}

export interface Courts {
  id: string;
  courtname: string;
  typename: string;
  photo: string;
}

interface SelectedHours {
  hour: number;
  date: number;
}

const EditAppointmentHour: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { reset } = useNavigation();
  const { id_appointment, id_court, start_date, observation } =
    route.params as RouteParams;
  const [courts, setCourts] = useState<Courts[]>([]);
  const [selectedCourt, setSelectedCourt] = useState(id_court);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showInputDialog, setShowInputDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(start_date));

  const [selectedHour, setSelectedHour] = useState(
    new Date(start_date).getHours() + 3,
  );
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCourts(): Promise<void> {
      setLoading(true);
      api
        .get(
          '/appointments/findAll?id_place=fbc94f36-b5e8-493e-8c19-f309dce6ab0a&page=1',
        )
        .then(response => {
          setCourts(response.data);
        });
    }
    getCourts();
    setLoading(false);
  }, []);

  useEffect(() => {
    async function getDayAvailability(): Promise<void> {
      setLoading(true);

      const response = await api.get('/appointments/findByDay', {
        params: {
          id_court: selectedCourt,
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      });
      setAvailability(response.data);
      setLoading(false);
    }
    getDayAvailability();
  }, [selectedDate, selectedCourt]);

  const handleSelectCourt = useCallback((id: string) => {
    setSelectedCourt(id);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      setShowDatePicker(false);

      if (date) {
        setSelectedDate(date);
      }
      setSelectedHour(-1);
    },
    [],
  );

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleContinue = useCallback(
    (newObservation: string) => {
      setLoading(true);
      const date = new Date(selectedDate);

      api
        .put('/appointments/editAppointment', {
          id_appointment,
          newDate: date.setHours(selectedHour),
          observation: newObservation === '' ? observation : newObservation,
          id_court: selectedCourt,
        })
        .then(response => {
          reset({
            routes: [{ name: 'Calendar' }],
            index: 0,
          });
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
        });
    },
    [selectedDate, id_appointment, reset, selectedHour, selectedCourt],
  );

  const morningAvailability = useMemo(
    () =>
      availability
        .filter(
          ({ hour }) =>
            hour >= 0 &&
            hour < 12 &&
            hour !== 1 &&
            hour !== 2 &&
            hour !== 3 &&
            hour !== 4 &&
            hour !== 5,
        )
        .map(({ hour, available }) => ({
          hour,
          available,
          hourFormatted: String(format(new Date().setHours(hour), 'HH:00')),
        })),
    [availability],
  );

  const afternoonAvailability = useMemo(
    () =>
      availability
        .filter(({ hour }) => hour >= 12 && hour < 18)
        .map(({ hour, available }) => ({
          hour,
          available,
          hourFormatted: String(format(new Date().setHours(hour), 'HH:00')),
        })),
    [availability],
  );

  const nightAvailability = useMemo(
    () =>
      availability
        .filter(({ hour }) => hour >= 18)
        .map(({ hour, available }) => ({
          hour,
          available,
          hourFormatted: String(format(new Date().setHours(hour), 'HH:00')),
        })),
    [availability],
  );

  return (
    <Container>
      <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="chevron-left" size={25} color="#999591" />
      </BackButton>
      <CourtListContainer>
        <CourtsList
          data={courts}
          horizontal
          keyExtractor={court => court.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: court }) => (
            <CourtContainer
              selected={court.id === selectedCourt}
              onPress={() => handleSelectCourt(court.id)}
            >
              <CourtPhoto
                source={{
                  uri: `https://app-arenaibirapuera.s3.amazonaws.com/${court.photo}`,
                }}
              />
              <CourtName selected={court.id === selectedCourt}>
                {court.courtname}
              </CourtName>
            </CourtContainer>
          )}
        />
      </CourtListContainer>

      <Content>
        <CalendarContainer>
          {Platform.Version >= 14.0 && Platform.OS === 'ios' ? (
            <>
              <CalendarTitleIOS14>Data selecionada:</CalendarTitleIOS14>
              <DateTimePicker
                mode="date"
                textColor="#f4ede8"
                value={selectedDate}
                onChange={handleDateChanged}
                style={{
                  alignSelf: 'center',
                  width: '90%',
                  borderRadius: 10,
                  height: 46,
                }}
              />
            </>
          ) : (
            <>
              <SelectedDateView>
                <CalendarTitle>Data selecionada: </CalendarTitle>
                <SelectedDate>
                  {String(format(selectedDate, 'dd/MM/yyyy'))}
                </SelectedDate>
              </SelectedDateView>
              <OpenDatePickerButton
                onPress={() => {
                  handleToggleDatePicker();
                }}
              >
                <OpenDatePickerText>Selecionar outra data</OpenDatePickerText>
              </OpenDatePickerButton>
              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  textColor="#f4ede8"
                  value={selectedDate}
                  onChange={handleDateChanged}
                />
              )}
            </>
          )}
        </CalendarContainer>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#99d420" size="large" />
          </LoadingContainer>
        ) : (
          <Schedule>
            <CalendarTitle>Selecione outro horário</CalendarTitle>
            <Section>
              <SectionTitle>Manhã</SectionTitle>
              <SectionContent>
                {morningAvailability.map(
                  ({ hourFormatted, hour, available }) => (
                    <>
                      {available ||
                      hour === new Date(start_date).getHours() + 3 ? (
                        <Hour
                          enabled={available}
                          selected={selectedHour === hour}
                          available={available}
                          key={hourFormatted}
                          onPress={() => handleSelectHour(hour)}
                        >
                          <HourText selected={selectedHour === hour}>
                            {hourFormatted}
                          </HourText>
                        </Hour>
                      ) : (
                          <></>
                      )}
                    </>
                  ),
                )}
              </SectionContent>
            </Section>
            <Section>
              <SectionTitle>Tarde</SectionTitle>
              <SectionContent>
                {afternoonAvailability.map(
                  ({ hourFormatted, hour, available }) => (
                    <>
                      {available ||
                      hour === new Date(start_date).getHours() + 3 ? (
                        <Hour
                          enabled={available}
                          selected={selectedHour === hour}
                          available={available}
                          key={hourFormatted}
                          onPress={() => handleSelectHour(hour)}
                        >
                          <HourText selected={selectedHour === hour}>
                            {hourFormatted}
                          </HourText>
                        </Hour>
                      ) : (
                          <></>
                      )}
                    </>
                  ),
                )}
              </SectionContent>
            </Section>
            <Section>
              <SectionTitle>Noite</SectionTitle>
              <SectionContent>
                {nightAvailability.map(({ hourFormatted, hour, available }) => (
                  <>
                    {available ||
                    hour === new Date(start_date).getHours() + 3 ? (
                      <Hour
                        enabled={available || hour === selectedHour}
                        selected={selectedHour === hour}
                        available={available || hour === selectedHour}
                        key={hourFormatted}
                        onPress={() => handleSelectHour(hour)}
                      >
                        <HourText selected={selectedHour === hour}>
                          {hourFormatted}
                        </HourText>
                      </Hour>
                    ) : (
                        <></>
                    )}
                  </>
                ))}
              </SectionContent>
            </Section>
          </Schedule>
        )}
        <FinishButton
          enabled={selectedHour > 0}
          onPress={() => setShowInputDialog(true)}
        >
          {loading ? (
            <ActivityIndicator color="#32312f" size="small" />
          ) : (
            <FinishButtonText>Salvar</FinishButtonText>
          )}
        </FinishButton>
      </Content>
    </Container>
  );
};

export default EditAppointmentHour;
