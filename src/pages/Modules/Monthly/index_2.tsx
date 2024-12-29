/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { ActivityIndicator, RefreshControl, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DropDownItem from 'react-native-drop-down-item';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
import { useNavigation } from '@react-navigation/native';
import { io } from 'socket.io-client';
import AppointmentInHourModal from './AppointmentInHourModal';
import InfoModal from './InfoModal';
import api from '../../../services/api';
import env from '../../../Config/Environment';
import { useMonthly } from '../../../hooks/monthly';
import { useAuth } from '../../../hooks/auth';
import HoursProps, {
  AppointmentProps,
} from '../../../interfaces/MonthlyHoursProps';
import IconUp from '../../../assets/ic_arr_up.png';
import IconDown from '../../../assets/ic_arr_down.png';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  CartButton,
  Content,
  ContentTitle,
  LoadingContainer,
  WeekList,
  WeekHeaderContainer,
  WeekHeaderTitle,
  HourList,
  ItemContent,
  ItemText,
  ModalView,
  ModalHeader,
  ModalHeaderTitle,
  ModalHeaderButton,
  CartEmpty,
  CartEmptyText,
  ModalHourContainer,
  ModalHourText,
  ModalRemoveHourButton,
  AppointmentInHourButton,
} from './styles';

export interface WeekDays {
  number: number;
  day: string;
}
const Monthly: React.FC = () => {
  const { setHours } = useMonthly();
  const { user } = useAuth();
  const navigation = useNavigation();

  const [weekDays, setWeekDays] = useState<WeekDays[]>([
    {
      number: 0,
      day: 'Domingo',
    },
    {
      number: 1,
      day: 'Segunda',
    },
    {
      number: 2,
      day: 'Terça',
    },
    {
      number: 3,
      day: 'Quarta',
    },
    {
      number: 4,
      day: 'Quinta',
    },
    {
      number: 5,
      day: 'Sexta',
    },
    {
      number: 6,
      day: 'Sábado',
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [availableHours, setAvailableHours] = useState<HoursProps[]>([]);
  const [selectedHours, setSelectedHours] = useState<HoursProps[]>([]);
  const [
    selectedAppointment,
    setSelectedAppointment,
  ] = useState<AppointmentProps>({} as AppointmentProps);
  const animation = useMemo(() => new Animated.Value(0), []);
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  useEffect(() => {
    api.get('monthly/findAllAvailableDays').then(response => {
      setAvailableHours(response.data);
      setLoading(false);
    });
  }, [setAvailableHours]);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    api.get('monthly/findAllAvailableDays').then(response => {
      setAvailableHours(response.data);
      setLoading(false);
    });
  }, [setAvailableHours]);

  const handleOpenAppointmentModal = useCallback(
    (appointment: AppointmentProps) => {
      setSelectedAppointment(appointment);
      setAppointmentModalOpen(true);
    },
    [],
  );

  const handleRemoveHourFromCart = useCallback(
    (hour: HoursProps) => {
      setSelectedHours(
        selectedHours.filter(selectedHour => selectedHour !== hour),
      );
    },
    [selectedHours],
  );

  const handleAddItemToCart = useCallback(
    (newHour: HoursProps) => {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      let found = false;
      selectedHours.map(hour => {
        if (
          hour.hour === newHour.hour &&
          hour.id_court === newHour.id_court &&
          hour.week_day === newHour.week_day
        ) {
          found = true;
        }
        return null;
      });
      if (found) {
        const tempArray: HoursProps[] = [];
        selectedHours.map(currentHour => {
          if (
            !(
              Number(currentHour.hour) === Number(newHour.hour) &&
              currentHour.id_court === newHour.id_court &&
              Number(currentHour.week_day) === Number(newHour.week_day)
            )
          ) {
            tempArray.push(currentHour);
          }
          return null;
        });
        setSelectedHours(tempArray);
      } else {
        setSelectedHours([...selectedHours, newHour]);
      }
      setTimeout(() => {
        Animated.spring(animation, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }, 500);
    },
    [selectedHours, animation],
  );

  const handleContinue = useCallback(() => {
    const ids: string[] = [];
    let finalPrice = 0;
    selectedHours.map(item => {
      ids.push(item.id);
      finalPrice += Number(item.price);
      return null;
    });
    setHours(ids, finalPrice);
    navigation.navigate('CreditCardPayment');
  }, [selectedHours, setHours, navigation]);

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
    socket.on('monthly_hour_created', () => {
      setLoading(true);
      setAvailableHours([]);
      api.get('monthly/findAllAvailableDays').then(response => {
        setAvailableHours(response.data);
      });
    });

    socket.on('monthly_user_created', () => {
      setLoading(true);
      setAvailableHours([]);
      api.get('monthly/findAllAvailableDays').then(response => {
        setAvailableHours(response.data);
      });
    });
  }, [socket]);

  function formatHour(hour: number): string {
    if (hour < 10) {
      return `0${hour}:00`;
    }
    return `${hour}:00`;
  }

  return (
    <LinearGradient
      colors={['#006edb', '#273a9a']}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Container>
        <Header>
          <BackButton
            onPress={() => {
              setInfoModalOpen(true);
            }}
          >
            <FeatherIcon name="info" color="#fff" size={RFValue(25)} />
          </BackButton>
          <HeaderTitle>Mensalistas</HeaderTitle>
          <Animated.View style={[{ transform: [{ scale }] }]}>
            <CartButton onPress={() => setModalOpen(true)}>
              <MaterialIcon
                name="cart-outline"
                color="#006edb"
                size={RFValue(20)}
              />
            </CartButton>
          </Animated.View>
        </Header>
        <Content>
          <ContentTitle>Dias disponíveis</ContentTitle>
          {loading ? (
            <LoadingContainer>
              <ActivityIndicator color="#fff" size="large" />
            </LoadingContainer>
          ) : (
            <WeekList
              refreshControl={
                <RefreshControl
                  tintColor="#fff"
                  colors={['#fff']}
                  refreshing={loading}
                  onRefresh={() => handleRefresh()}
                />
              }
              nestedScrollEnabled
              data={weekDays}
              keyExtractor={item => String(item.day)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: weekDay, i }) => (
                <DropDownItem
                  key={i}
                  invisibleImage={IconDown}
                  visibleImage={IconUp}
                  contentVisible={false}
                  header={
                    <WeekHeaderContainer>
                      <WeekHeaderTitle>{weekDay.day}</WeekHeaderTitle>
                    </WeekHeaderContainer>
                  }
                >
                  <HourList
                    data={availableHours.filter(
                      hour => hour.week_day === weekDay.number,
                    )}
                    keyExtractor={item => item.id}
                    renderItem={({ item: hour }) => (
                      <ItemContent onPress={() => handleAddItemToCart(hour)}>
                        <ItemText>{hour.court_name}</ItemText>
                        <ItemText>{formatHour(hour.hour)}</ItemText>
                        <ItemText>
                          {`R$${String(hour.price).replace('.', ',')}`}
                        </ItemText>
                        {hour.appointmentInDay ? (
                          <AppointmentInHourButton
                            onPress={() =>
                              handleOpenAppointmentModal(hour.appointmentInDay)
                            }
                          >
                            <FeatherIcon
                              name="alert-circle"
                              color="yellow"
                              size={20}
                            />
                          </AppointmentInHourButton>
                        ) : (
                          <AppointmentInHourButton disabled>
                            <FeatherIcon
                              name="alert-circle"
                              color="transparent"
                              size={20}
                            />
                          </AppointmentInHourButton>
                        )}
                        {selectedHours
                          .map(e => {
                            if (
                              e.hour === hour.hour &&
                              e.id_court === hour.id_court &&
                              e.week_day === hour.week_day
                            ) {
                              return true;
                            }
                            return false;
                          })
                          .indexOf(true) === -1 ? (
                          <MaterialIcon
                            name="cart-plus"
                            color="#fff"
                            size={20}
                          />
                        ) : (
                          <MaterialIcon
                            name="cart-remove"
                            color="red"
                            size={20}
                          />
                        )}
                      </ItemContent>
                    )}
                  />
                </DropDownItem>
              )}
            />
          )}
        </Content>
      </Container>
      <Modal isVisible={modalOpen}>
        <ModalView>
          <ModalHeader>
            <ModalHeaderTitle>Meu Carrinho</ModalHeaderTitle>
            <ModalHeaderButton onPress={() => setModalOpen(false)}>
              <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
            </ModalHeaderButton>
          </ModalHeader>
          {selectedHours.length === 0 ? (
            <CartEmpty>
              <MaterialIcon name="cart-minus" color="#999" size={RFValue(20)} />
              <CartEmptyText>Carrinho Vazio</CartEmptyText>
            </CartEmpty>
          ) : (
            <HourList
              data={selectedHours}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item: hour }) => (
                <ModalHourContainer>
                  <ModalHourText>{hour.court_name}</ModalHourText>
                  <ModalHourText>
                    {
                      weekDays.filter(
                        weekDay => weekDay.number === hour.week_day,
                      )[0].day
                    }
                  </ModalHourText>
                  <ModalHourText>{formatHour(hour.hour)}</ModalHourText>
                  <ModalHourText>
                    {`R$${String(hour.price).replace('.', ',')}`}
                  </ModalHourText>
                  <ModalRemoveHourButton
                    onPress={() => handleRemoveHourFromCart(hour)}
                  >
                    <FeatherIcon
                      name="minus-circle"
                      color="red"
                      size={RFValue(20)}
                    />
                  </ModalRemoveHourButton>
                </ModalHourContainer>
              )}
            />
          )}
        </ModalView>
      </Modal>
      <Modal isVisible={appointmentModalOpen}>
        <AppointmentInHourModal
          id={selectedAppointment.id}
          start_date={selectedAppointment.start_date}
          closeModal={() => setAppointmentModalOpen(false)}
        />
      </Modal>
      <Modal isVisible={infoModalOpen}>
        <InfoModal closeModal={() => setInfoModalOpen(false)} />
      </Modal>
      {selectedHours.length === 0 ? (
        <></>
      ) : (
        <ActionButton
          buttonColor="#4bb543"
          renderIcon={() => (
            <>
              <MaterialIcon
                name="cart-arrow-right"
                color="#fff"
                size={RFValue(30)}
              />
            </>
          )}
          onPress={() => {
            handleContinue();
          }}
        />
      )}
    </LinearGradient>
  );
};

export default Monthly;
