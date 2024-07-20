import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { ActivityIndicator, Animated, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import formatPrice from '@app/utils/formatPrice';
import formatHour from '@app/utils/formatHour';
import colors from '@app/Config/Colors';
import api from '@app/services/api';
import ModalHeader from '@app/components/ModalHeader';
import { SelectedHours } from '@app/interfaces/SelectedHours';
import { useAppointmentContext, MaterialsProps } from '@app/hooks/appointment';
import separateHours from '@app/utils/Appointment/separateHours';
import AvailableHours, {
  ICourts,
} from '@app/interfaces/AppointmentsAvailableHours';

import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  CartButton,
  LoadingContainer,
  Content,
  CalendarContainer,
  DateLabel,
  AndroidDateButton,
  AndroidDateButtonText,
  IosButtonContainer,
  HoursList,
  HourContainer,
  HourLabel,
  CourtContainer,
  CourtName,
  CourtPrice,
  AddToCartButton,
  ModalView,
  ModalCartList,
  ModalCartItemContainer,
  ModalDateText,
  RemoveButton,
  FinalPriceText,
  ContinueButton,
  ContinueButtonText,
  CourtImage,
} from './styles';

interface RouteParams {
  id_sport: string;
}

export interface HourProps {
  hour: number;
  date: number;
  id_court: string;
  court_name: string;
  price: number;
}

const SelectDayHour: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { appointment, setHoursData, setHoursMaterials } =
    useAppointmentContext();

  const animation = useMemo(() => new Animated.Value(0), []);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableHours, setAvailableHours] = useState<AvailableHours[]>([]);
  const [selectedHours, setSelectedHours] = useState<SelectedHours[]>([]);
  const [materials, setMaterials] = useState<MaterialsProps[]>([]);

  const { id_sport } = route.params as RouteParams;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  useEffect(() => {
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    api
      .get(
        `/appointments/findDayAvailability?day=${day}&month=${month}&year=${year}&id_sport=${id_sport}&id_place=f13f0061-01f0-476f-9d6c-fe4a1a1f64ca`,
      )
      .then(response => {
        setAvailableHours(response.data);
        api
          .get(`/materials/findBySport?id_sport=${id_sport}`)
          .then(response2 => {
            setMaterials(response2.data);
            setLoading(false);
          });
      });
  }, [selectedDate, id_sport]);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      setShowDatePicker(false);
      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);

  const handleAddItemToCart = useCallback(
    (hour: number, data: ICourts) => {
      Animated.spring(animation, {
        toValue: 1,

        useNativeDriver: true,
      }).start();

      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();

      const newItem: SelectedHours = {
        hour,
        day,
        month,
        year,
        id_court: data.id,
        court_name: data.court_name,
        price: data.price,
      };
      let found = false;
      let index = -1;

      for (let i = 0; i < selectedHours.length; i++) {
        if (
          selectedHours[i].hour === hour &&
          selectedHours[i].id_court === data.id &&
          selectedHours[i].day === day &&
          selectedHours[i].month === month &&
          selectedHours[i].year === year
        ) {
          found = true;
          index = i;
          break;
        }
      }

      if (!found) {
        setSelectedHours([...selectedHours, newItem]);
      } else {
        const tempArray = [...selectedHours];
        tempArray.splice(index, 1);
        setSelectedHours(tempArray);
      }
      setTimeout(() => {
        Animated.spring(animation, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }, 500);
    },
    [selectedDate, selectedHours, animation],
  );

  const hourExists = useCallback(
    (hour: number, data: ICourts) => {
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      let found = false;

      for (let i = 0; i < selectedHours.length; i++) {
        if (
          selectedHours[i].hour === hour &&
          selectedHours[i].id_court === data.id &&
          selectedHours[i].day === day &&
          selectedHours[i].month === month &&
          selectedHours[i].year === year
        ) {
          found = true;

          break;
        }
      }
      return found;
    },
    [selectedHours, selectedDate],
  );

  const finalPrice = useMemo(() => {
    let price = 0;
    selectedHours.map(item => {
      price += item.price;
      return null;
    });
    return `R$ ${String(price)},00`;
  }, [selectedHours]);

  const handleContinue = useCallback(() => {
    const hoursProps = separateHours(selectedHours);

    const tempMaterials: MaterialsProps[] = [];
    for (let i = 0; i < hoursProps.length; i++) {
      for (let j = 0; j < materials.length; j++) {
        tempMaterials.push({
          id: materials[j].id,
          id_hour: hoursProps[i].id,
          amount: materials[j].amount,
          identifier: materials[j].identifier,
          material: materials[j].material,
          price: materials[j].price,
        });
      }
    }

    setHoursMaterials(tempMaterials);
    setHoursData(
      hoursProps,
      Number(finalPrice.replace('R$ ', '').replace(',', '.').trim()),
      selectedHours.length,
    );

    navigation.navigate('SelectMaterials');
  }, [
    selectedHours,
    finalPrice,
    materials,
    setHoursData,
    setHoursMaterials,
    navigation,
  ]);

  function createDateText(
    court_name: string,
    day: number,
    month: number,
    year: number,
    hour: number,
  ): string {
    return `${court_name} - ${String(day).padStart(2, '0')}/${String(
      month,
    ).padStart(2, '0')}/${String(year)} às ${String(hour).padStart(2, '0')}:00`;
  }

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <MaterialIcon name="chevron-down" color="#fff" size={RFValue(20)} />
          </BackButton>
          <HeaderTitle>Escolha os horários</HeaderTitle>
          <Animated.View style={[{ transform: [{ scale }] }]}>
            <CartButton onPress={() => setModalOpen(true)}>
              <MaterialIcon
                name="cart-outline"
                color={colors.blue}
                size={RFValue(20)}
              />
            </CartButton>
          </Animated.View>
        </Header>
        <Content>
          <CalendarContainer>
            <DateLabel>Selecione uma data:</DateLabel>
            {Platform.OS === 'ios' ? (
              <IosButtonContainer>
                <DateTimePicker
                  mode="date"
                  value={selectedDate}
                  onChange={handleDateChanged}
                  locale="pt-BR"
                  style={{
                    borderRadius: 10,
                    height: 35,
                    width: RFValue(98),
                    backgroundColor: '#fff',
                    alignItems: 'center',
                  }}
                />
              </IosButtonContainer>
            ) : (
              <>
                <AndroidDateButton
                  onPress={() => {
                    handleToggleDatePicker();
                  }}
                >
                  <AndroidDateButtonText>
                    {format(selectedDate, " dd'/'MM'/'yyyy", {
                      locale: ptBR,
                    })}
                  </AndroidDateButtonText>
                </AndroidDateButton>
                {showDatePicker && (
                  <DateTimePicker
                    display="calendar"
                    value={selectedDate}
                    onChange={handleDateChanged}
                  />
                )}
              </>
            )}
          </CalendarContainer>
          {loading ? (
            <LoadingContainer>
              <ActivityIndicator color="#fff" size="large" />
            </LoadingContainer>
          ) : (
            <>
              <HoursList
                data={availableHours}
                keyExtractor={item => String(item.hour)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: hour }) => (
                  <HourContainer>
                    <HourLabel>{formatHour(hour.hour)}</HourLabel>
                    {hour.props.map(court => (
                      <CourtContainer>
                        <CourtImage
                          style={{ resizeMode: 'contain' }}
                          source={{
                            uri: court.court_photo,
                          }}
                        />
                        <CourtName
                          available={court.available && court.price > 0}
                        >
                          {court.court_name}
                        </CourtName>
                        <CourtPrice
                          available={court.available && court.price > 0}
                        >
                          {formatPrice(court.price)}
                        </CourtPrice>
                        <AddToCartButton
                          available={court.available && court.price > 0}
                          inCart={hourExists(hour.hour, court)}
                          disabled={!court.available || court.price === 0}
                          onPress={() => handleAddItemToCart(hour.hour, court)}
                        >
                          {hourExists(hour.hour, court) ? (
                            <MaterialIcon
                              name="cart-remove"
                              color={
                                court.available && court.price > 0
                                  ? '#fff'
                                  : 'transparent'
                              }
                              size={RFValue(15)}
                            />
                          ) : (
                            <MaterialIcon
                              name="cart-plus"
                              color={
                                court.available && court.price > 0
                                  ? '#fff'
                                  : 'transparent'
                              }
                              size={RFValue(15)}
                            />
                          )}
                        </AddToCartButton>
                      </CourtContainer>
                    ))}
                  </HourContainer>
                )}
              />
              <ContinueButton
                disabled={selectedHours.length === 0}
                onPress={() => handleContinue()}
              >
                <ContinueButtonText>Continuar</ContinueButtonText>
              </ContinueButton>
            </>
          )}
        </Content>
        <Modal isVisible={modalOpen}>
          <ModalView>
            <ModalHeader
              title="Meu Carrinho"
              closeModal={() => setModalOpen(false)}
            />
            <ModalCartList
              data={selectedHours}
              keyExtractor={item => String(item.hour)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: hour }) => (
                <ModalCartItemContainer>
                  <ModalDateText>
                    {createDateText(
                      hour.court_name,
                      hour.day,
                      hour.month,
                      hour.year,
                      hour.hour,
                    )}
                  </ModalDateText>
                  <RemoveButton
                    onPress={() =>
                      handleAddItemToCart(hour.hour, {
                        id: hour.id_court,
                        court_name: hour.court_name,
                        available: true,
                        price: hour.price,
                      })
                    }
                  >
                    <MaterialIcon
                      name="cart-remove"
                      color={colors.red}
                      size={RFValue(18)}
                    />
                  </RemoveButton>
                </ModalCartItemContainer>
              )}
            />
            <FinalPriceText>{`Preço final: ${finalPrice}`}</FinalPriceText>
          </ModalView>
        </Modal>
      </Container>
    </LinearGradient>
  );
};

export default SelectDayHour;
