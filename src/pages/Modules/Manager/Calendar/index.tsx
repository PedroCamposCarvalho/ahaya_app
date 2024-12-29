/* eslint-disable prefer-const */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Platform, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';
import {
  Container,
  Header,
  QuitMultiSelectionButton,
  MultiSelectionQuantity,
  BackButton,
  TitleView,
  HeaderTitle,
  LoadingContainer,
  Content,
  CourtListContainer,
  CourtsList,
  CourtContainer,
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
  MultiSelectionContainer,
  MultiSelectionCreateButton,
  MultiSelectionCreateButtonText,
  MultiSelectionCancelButton,
  MultiSelectionCancelButtonText,
} from './styles';

interface AvailabilityItem {
  hour: number;
  available: boolean;
  hourFormatted: string;
  id_appointment: string;
  observation: string;
}

interface MultiSelectionItems {
  hour: number;
  id_appointment: string;
}

export interface Courts {
  id: string;
  courtname: string;
  typename: string;
  photo: string;
}

const SelectDayHour: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useAuth();

  const [courts, setCourts] = useState<Courts[]>([]);
  const [selectedCourt, setSelectedCourt] = useState(
    'ae9dcc52-9b3c-4e22-a582-abfe66c569b7',
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showInputDialog, setShowInputDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [multiSelection, setMultiSelection] = useState(false);
  const [multiSelectionItems, setMultiSelectionItems] = useState<
    MultiSelectionItems[]
  >([]);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showCreateAppointmentButton, setShowCreateAppointmentButton] =
    useState(false);

  useEffect(() => {
    async function getCourts(): Promise<void> {
      setLoading(true);
      api
        .get(
          '/appointments/findAll?id_place=fbc94f36-b5e8-493e-8c19-f309dce6ab0a&page=1',
        )
        .then(response => {
          setCourts(response.data);
          setLoading(false);
        })
        .catch(error => {});
    }
    getCourts();
  }, []);

  useEffect(() => {
    setLoading(true);

    api
      .get('/appointments/findByDayWithAppointment', {
        params: {
          id_court: selectedCourt,
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      })
      .then(response => {
        setAvailability(response.data);
        setLoading(false);
      })
      .catch(error => {});
  }, [selectedDate, selectedCourt]);

  useEffect(() => {
    setShowCancelButton(false);
    setShowCreateAppointmentButton(false);
    if (multiSelection) {
      multiSelectionItems.map(item => {
        if (item.id_appointment > '') {
          setShowCancelButton(true);
        } else {
          setShowCreateAppointmentButton(true);
        }
      });
    }
  }, [multiSelection, multiSelectionItems]);

  const disableMultiSelection = useCallback(() => {
    setMultiSelection(false);
    setMultiSelectionItems([]);
  }, []);

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
    },
    [],
  );

  const handleNavigationBack = useCallback(() => {
    setLoading(true);
    api
      .get('/appointments/findByDayWithAppointment', {
        params: {
          id_court: selectedCourt,
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      })
      .then(response => {
        setAvailability(response.data);
        setLoading(false);
      })
      .catch(error => {});
  }, [selectedCourt, selectedDate]);

  const handleLockHour = useCallback(
    (inputText: string) => {
      setLoading(true);
      if (multiSelection) {
        multiSelectionItems.map(item => {
          const newDate = new Date(selectedDate);
          api
            .post('/appointments/create', {
              id_court: selectedCourt,
              price: 0.0,
              start_date: Number(selectedDate.setHours(item.hour)),
              hours: [
                { hour: selectedHour, date: newDate.setHours(item.hour) },
              ],
              users: [{ id_user: user.id }],
              materials: [null],
              sequencehours: null,
              id_transaction: '',
              observation: inputText,
            })
            .then(response => {
              api
                .get('/appointments/findByDayWithAppointment', {
                  params: {
                    id_court: selectedCourt,
                    day: selectedDate.getDate(),
                    month: selectedDate.getMonth() + 1,
                    year: selectedDate.getFullYear(),
                  },
                })
                .then(response2 => {
                  setAvailability(response2.data);
                  setLoading(false);
                })
                .catch(error => {});
              setLoading(false);
              setShowInputDialog(false);
            })
            .catch(error => {
              setLoading(false);
              setShowInputDialog(false);
            });
        });
        disableMultiSelection();
      } else {
        const newDate = new Date(selectedDate);
        api
          .post('/appointments/create', {
            id_court: selectedCourt,
            price: 0.0,
            start_date: Number(selectedDate.setHours(selectedHour)),
            hours: [
              { hour: selectedHour, date: newDate.setHours(selectedHour) },
            ],
            users: [{ id_user: user.id }],
            materials: [null],
            sequencehours: null,
            id_transaction: '',
            observation: inputText,
          })
          .then(response => {
            api
              .get('/appointments/findByDayWithAppointment', {
                params: {
                  id_court: selectedCourt,
                  day: selectedDate.getDate(),
                  month: selectedDate.getMonth() + 1,
                  year: selectedDate.getFullYear(),
                },
              })
              .then(response2 => {
                setAvailability(response2.data);
                setLoading(false);
              })
              .catch(error => {});
            setLoading(false);
            setShowInputDialog(false);
          })
          .catch(error => {
            setLoading(false);
            setShowInputDialog(false);
          });
      }
    },
    [
      selectedCourt,
      selectedDate,
      selectedHour,
      user.id,
      multiSelection,
      multiSelectionItems,
      disableMultiSelection,
    ],
  );

  const handleNavigation = useCallback(
    (
      id_appointment: string,
      hour: number,
      observation: string,
      available: boolean,
    ) => {
      if (multiSelection) {
        if (multiSelectionItems.map(e => e.hour).indexOf(hour) !== -1) {
          setMultiSelectionItems(
            multiSelectionItems.filter(item => item.hour !== hour),
          );
        } else {
          setMultiSelectionItems([
            ...multiSelectionItems,
            { hour, id_appointment },
          ]);
        }
      } else {
        setSelectedHour(hour);
        if (id_appointment !== '') {
          navigation.navigate('AppointmentDetail', {
            id_appointment,
            observation,
            onGoBack: () => handleNavigationBack(),
          });
        } else {
          Alert.alert(
            'Reservar horário',
            'Deseja realmente reservar este horário?',
            [
              {
                text: 'Não',
                onPress: () => {
                  setShowInputDialog(false);
                },
              },
              {
                text: 'Sim',
                onPress: () => {
                  setShowInputDialog(true);
                },
              },
            ],
            { cancelable: false },
          );
        }
      }
    },
    [navigation, multiSelection, multiSelectionItems, handleNavigationBack],
  );

  const handleSetMultiSelection = useCallback(
    (hour: number, id_appointment: string) => {
      setMultiSelection(true);

      setMultiSelectionItems([
        ...multiSelectionItems,
        { hour, id_appointment },
      ]);
    },
    [multiSelectionItems],
  );

  const cancelAllSelectedAppointments = useCallback(() => {
    Alert.alert(
      'Cancelar reservas',
      'Deseja realmente cancelar as reservas selecionadas?',
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          onPress: () => {
            setLoading(true);
            multiSelectionItems.map(item => {
              if (item.id_appointment > '') {
                api
                  .delete(
                    `/appointments/deleteAppointment?id_appointment=${item.id_appointment}`,
                  )
                  .then(() => {
                    api
                      .get('/appointments/findByDayWithAppointment', {
                        params: {
                          id_court: selectedCourt,
                          day: selectedDate.getDate(),
                          month: selectedDate.getMonth() + 1,
                          year: selectedDate.getFullYear(),
                        },
                      })
                      .then(response => {
                        setAvailability(response.data);
                        disableMultiSelection();

                        setLoading(false);
                      })
                      .catch(error => {});
                  })
                  .catch(() => {});
              }
            });
          },
        },
      ],
      { cancelable: false },
    );
  }, [disableMultiSelection, multiSelectionItems, selectedCourt, selectedDate]);

  const createAllSelectedAppointments = useCallback(() => {
    Alert.alert(
      'Criar reservas',
      'Deseja realmente criar as reservas nos horários selecionados?',
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          onPress: () => {
            setShowInputDialog(true);
          },
        },
      ],
      { cancelable: false },
    );
  }, []);

  const morningAvailability = useMemo(
    () =>
      availability
        .filter(
          ({ hour }) =>
            hour >= 0 &&
            hour <= 24 &&
            hour !== 1 &&
            hour !== 2 &&
            hour !== 3 &&
            hour !== 4 &&
            hour !== 5,
        )
        .map(({ hour, available, id_appointment, observation }) => ({
          hour,
          available,
          hourFormatted: String(format(new Date().setHours(hour), 'HH:00')),
          id_appointment,
          observation,
        })),
    [availability],
  );

  return (
    <Container>
      <Header isMultiSelection={multiSelection}>
        {multiSelection ? (
          <>
            <QuitMultiSelectionButton onPress={() => disableMultiSelection()}>
              <Icon name="x-circle" size={25} color="#f5ede8" />
            </QuitMultiSelectionButton>
            <MultiSelectionQuantity>
              {`${multiSelectionItems.length} item(s)`}
            </MultiSelectionQuantity>
          </>
        ) : (
          <>
            <BackButton
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="chevron-left" size={25} color="#999591" />
            </BackButton>
            <TitleView>
              <HeaderTitle>Horários</HeaderTitle>
            </TitleView>
          </>
        )}
      </Header>

      <CourtListContainer>
        <DialogInput
          isDialogVisible={showInputDialog}
          title="Cliente"
          message="Digite o nome do cliente"
          hintInput="Nome"
          submitInput={(inputText: string) => {
            handleLockHour(inputText);
          }}
          closeDialog={() => {
            setShowInputDialog(false);
          }}
        />
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
              <CourtName selected={court.id === selectedCourt}>
                {court.courtname}
              </CourtName>
            </CourtContainer>
          )}
        />
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
      </CourtListContainer>

      <Content>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#99d420" size="large" />
          </LoadingContainer>
        ) : (
          <Schedule>
            <Section>
              <SectionTitle>Horários:</SectionTitle>
              <SectionContent>
                {morningAvailability.map(
                  ({
                    hourFormatted,
                    hour,
                    available,
                    id_appointment,
                    observation,
                  }) => (
                    <Hour
                      available={available}
                      key={hourFormatted}
                      onLongPress={() =>
                        handleSetMultiSelection(hour, id_appointment || '')
                      }
                      selected={
                        multiSelectionItems.map(e => e.hour).indexOf(hour) !==
                        -1
                      }
                      onPress={() =>
                        handleNavigation(
                          id_appointment,
                          hour,
                          observation,
                          available,
                        )
                      }
                    >
                      <HourText>{hourFormatted}</HourText>
                      {observation !== '' ? (
                        <HourText>{observation}</HourText>
                      ) : (
                        <></>
                      )}
                    </Hour>
                  ),
                )}
              </SectionContent>
            </Section>
          </Schedule>
        )}
      </Content>
      {multiSelection ? (
        <MultiSelectionContainer>
          <MultiSelectionCancelButton
            disabled={!showCancelButton}
            onPress={() => cancelAllSelectedAppointments()}
          >
            <MultiSelectionCancelButtonText>
              Cancelar reservas
            </MultiSelectionCancelButtonText>
          </MultiSelectionCancelButton>
          <MultiSelectionCreateButton
            disabled={!showCreateAppointmentButton}
            onPress={() => createAllSelectedAppointments()}
          >
            <MultiSelectionCreateButtonText>
              Reservar horários
            </MultiSelectionCreateButtonText>
          </MultiSelectionCreateButton>
        </MultiSelectionContainer>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default SelectDayHour;
