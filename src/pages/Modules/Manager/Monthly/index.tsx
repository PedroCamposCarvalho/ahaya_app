import React, { useEffect, useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Monthly from '../../../../interfaces/MonthlyAdmin';
import Court from '../../../../interfaces/Court';
import DayOfWeek from '../../../../interfaces/DayOfWeek';
import getDayOfWeekList from '../../../../utils/getDayOfWeekList';
import api from '../../../../services/api';
import AddDayModal from './AddDayModal';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  AddButton,
  Content,
  HoursList,
  MonthlyContainer,
  MonthlyHour,
  MonthlyUser,
  NoHoursContainer,
  NoHoursText,
  ClearCourtSelectionButton,
  ClearCourtSelectionText,
  CourtsContent,
  CourtsList,
  CourtContainer,
  CourtButton,
  CourtText,
  DayOfWeekList,
  DayOfWeekContainer,
  DayOfWeekButton,
  DayOfWeekLabel,
} from './styles';

const MonthlyConfig: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [addDayModalOpen, setAddDayModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(8);
  const [selectedCourt, setSelectedCourt] = useState<Court>({} as Court);
  const [courts, setCourts] = useState<Court[]>([]);
  const [hours, setHours] = useState<Monthly[]>([]);
  const [weekDayList, setWeekDayList] = useState<DayOfWeek[]>([]);
  useEffect(() => {
    setWeekDayList(getDayOfWeekList());
    setSelectedDay(new Date().getDay());
    api.get('/courts/findAll').then(response => {
      setCourts(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(
        `/monthly/findAllAdmin?dayOfWeek=${selectedDay}&id_court=${
          selectedCourt.id ? selectedCourt.id : ''
        }`,
      )
      .then(response => {
        setHours(response.data);
      });
  }, [selectedDay, selectedCourt]);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-down" color="#fff" size={RFValue(20)} />
          </BackButton>
          <HeaderTitle>Mensalistas</HeaderTitle>
          <AddButton onPress={() => setAddDayModalOpen(true)}>
            <FeatherIcon name="plus-circle" color="#fff" size={RFValue(20)} />
          </AddButton>
        </Header>
        <Content>
          {hours.length === 0 ? (
            <NoHoursContainer>
              <NoHoursText>Nenhum horário disponível</NoHoursText>
            </NoHoursContainer>
          ) : (
            <HoursList
              data={hours}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: hour }) => (
                <MonthlyContainer hasUser={hour.id_user > ''}>
                  <MonthlyHour>{`${hour.hour}:00`}</MonthlyHour>
                  <MonthlyUser>{hour.user_name}</MonthlyUser>
                </MonthlyContainer>
              )}
            />
          )}
          <CourtsContent>
            <CourtsList
              data={courts}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: court }) => (
                <CourtContainer>
                  <CourtButton
                    selected={selectedCourt === court}
                    onPress={() => setSelectedCourt(court)}
                  />
                  <CourtText>{court.courtname}</CourtText>
                </CourtContainer>
              )}
            />
            <ClearCourtSelectionButton
              onPress={() => setSelectedCourt({} as Court)}
            >
              <ClearCourtSelectionText>Limpar</ClearCourtSelectionText>
            </ClearCourtSelectionButton>
          </CourtsContent>
        </Content>
        <DayOfWeekList
          data={weekDayList}
          keyExtractor={item => item.label}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: day }) => (
            <DayOfWeekContainer>
              <DayOfWeekLabel>{day.label}</DayOfWeekLabel>
              <DayOfWeekButton
                onPress={() => setSelectedDay(day.number)}
                selected={selectedDay === day.number}
              />
            </DayOfWeekContainer>
          )}
        />
        <Modal isVisible={addDayModalOpen}>
          <AddDayModal closeModal={() => setAddDayModalOpen(false)} />
        </Modal>
      </Container>
    </LinearGradient>
  );
};

export default MonthlyConfig;
