import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { FakeCurrencyInput } from 'react-native-currency-input';
import Court from '../../../../../interfaces/Court';
import DayOfWeek from '../../../../../interfaces/DayOfWeek';
import getDayOfWeekList from '../../../../../utils/getDayOfWeekList';
import api from '../../../../../services/api';
import products from '../../../../../Config/ProductsIds';
import {
  Container,
  Header,
  HeaderTitle,
  HeaderButton,
  Content,
  DayOfWeekList,
  DayOfWeekContainer,
  DayOfWeekButton,
  DayOfWeekLabel,
  SelectHourContainer,
  ItemTitle,
  CourtsContainer,
  NoCourtsContainer,
  NoCourtsText,
  CourtsList,
  CourtContainer,
  CourtButton,
  CourtName,
  PriceContainer,
  SaveButton,
  SaveButtonText,
  LoadingContainer,
} from './styles';

interface PageProps {
  closeModal: () => void;
}

const AddDayModal: React.FC<PageProps> = ({ closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [weekDayList, setWeekDayList] = useState<DayOfWeek[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [selectedCourts, setSelectedCourts] = useState<Court[]>([]);
  const [price, setPrice] = useState(0);
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<DayOfWeek>(
    {} as DayOfWeek,
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().setMinutes(0)),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setLoading(false);
    setWeekDayList(getDayOfWeekList());
  }, []);

  useEffect(() => {
    setSelectedCourts([]);
    if (selectedDayOfWeek.number >= 0) {
      setLoading(true);
      api
        .get(
          `/monthly/findAvailableHoursForCourt?dayOfWeek=${
            selectedDayOfWeek.number
          }&hour=${selectedDate.getHours()}`,
        )
        .then(response => {
          setCourts(response.data);
          setLoading(false);
        });
    }
  }, [selectedDayOfWeek, selectedDate]);

  const handleSelectCourt = useCallback(
    (court: Court) => {
      if (selectedCourts.indexOf(court) === -1) {
        setSelectedCourts([...selectedCourts, court]);
      } else {
        setSelectedCourts(selectedCourts.filter(item => item !== court));
      }
    },
    [selectedCourts],
  );

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      setShowDatePicker(false);

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const handleFinish = useCallback(() => {
    setButtonLoading(true);
    selectedCourts.map(async court => {
      const data = {
        id_court: court.id,
        week_day: selectedDayOfWeek.number,
        hour: selectedDate.getHours(),
        price,
        sandbox_product: products('dev').monthly,
        production_product: products('prod').monthly,
      };
      await api.post('/monthly/createMonthlyHour', data).catch(() => {
        setButtonLoading(false);
      });
      return null;
    });

    closeModal();
  }, [
    selectedCourts,
    selectedDayOfWeek,
    selectedDate,
    price,
    successToastOpts,
    closeModal,
  ]);

  return (
    <Container>
      <Header>
        <HeaderTitle>Novo Horário</HeaderTitle>
        <HeaderButton onPress={() => closeModal()}>
          <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
        </HeaderButton>
      </Header>
      <Content showsVerticalScrollIndicator={false}>
        <ItemTitle>Dia da semana:</ItemTitle>
        <DayOfWeekList
          data={weekDayList}
          keyExtractor={item => item.label}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: day }) => (
            <DayOfWeekContainer>
              <DayOfWeekLabel>{day.label}</DayOfWeekLabel>
              <DayOfWeekButton
                onPress={() => setSelectedDayOfWeek(day)}
                selected={selectedDayOfWeek === day}
              />
            </DayOfWeekContainer>
          )}
        />
        <SelectHourContainer>
          <ItemTitle>Hora:</ItemTitle>
          <DateTimePicker
            mode="time"
            locale="pt-BR"
            textColor="#f4ede8"
            value={selectedDate}
            onChange={handleDateChanged}
            style={{
              borderRadius: 50,
              height: 46,
              backgroundColor: '#fff',
              width: 100,
            }}
          />
        </SelectHourContainer>
        <CourtsContainer>
          <ItemTitle>Quadras disponíveis:</ItemTitle>
          {loading ? (
            <LoadingContainer>
              <ActivityIndicator color="#999" size="small" />
            </LoadingContainer>
          ) : (
            <>
              {courts.length === 0 ? (
                <NoCourtsContainer>
                  <NoCourtsText>Nenhuma quadra a mostrar</NoCourtsText>
                </NoCourtsContainer>
              ) : (
                <CourtsList
                  data={courts}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item: court }) => (
                    <CourtContainer>
                      <CourtButton
                        selected={selectedCourts.indexOf(court) > -1}
                        onPress={() => handleSelectCourt(court)}
                      />
                      <CourtName>{court.name}</CourtName>
                    </CourtContainer>
                  )}
                />
              )}
            </>
          )}
        </CourtsContainer>
        <PriceContainer>
          <ItemTitle>Preço da hora:</ItemTitle>
          <FakeCurrencyInput
            containerStyle={{
              width: '100%',
              height: RFValue(50),
              paddingRight: 16,
              paddingLeft: 10,
              borderRadius: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#999',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}
            style={{
              color: '#999',
              fontSize: RFValue(14),
              fontFamily: 'Arial',
            }}
            value={price}
            onChangeValue={value => (value ? setPrice(value) : setPrice(0))}
            unit="R$ "
            delimiter="."
            separator=","
            precision={2}
          />
        </PriceContainer>
        <SaveButton
          disabled={selectedCourts.length === 0}
          onPress={() => handleFinish()}
        >
          <SaveButtonText disabled={selectedCourts.length === 0}>
            Salvar
          </SaveButtonText>
        </SaveButton>
      </Content>
    </Container>
  );
};

export default AddDayModal;
