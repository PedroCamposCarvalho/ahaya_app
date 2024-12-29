import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { RFValue } from 'react-native-responsive-fontsize';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { io } from 'socket.io-client';
import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';
import env from '../../../../Config/Environment';
import NewDayUseModal from './NewDayUseModal';
import DayUseUsersModal from './DayUseUsersModal';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  AddButton,
  LoadingContainer,
  Content,
  DayUseList,
  DayUseContainer,
  DateHourContent,
  DateText,
  HourText,
} from './styles';

export interface DayUseProps {
  id: string;
  id_court: number;
  price: number;
  limit: number;
  start_date: Date;
  finish_date: Date;
  users_in_list: number;
}

const DayUseProps: React.FC = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [usersModal, setUsersModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [dayUse, setDayUse] = useState<DayUseProps[]>([]);
  const navigation = useNavigation();
  const { user } = useAuth();

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
    socket.on('daylistavailability', () => {
      api.get(`/dayuse/findAll?limit=5&page=${page}`).then(response => {
        setDayUse(response.data.dayuse);
        setLoading(false);
      });
    });
    socket.on('NewDayUseList', () => {
      api.get(`/dayuse/findAll?limit=5&page=${page}`).then(response => {
        setDayUse(response.data.dayuse);
        setLoading(false);
      });
    });
  }, [socket, page]);

  useEffect(() => {
    api.get(`/dayuse/findAll?limit=5&page=${page}`).then(response => {
      setDayUse(response.data.dayuse);
      setLoading(false);
    });
  }, [page]);

  const handleOpenModal = useCallback((id: string, price: number) => {
    setSelectedId(id);
    setSelectedPrice(price);
    setUsersModal(true);
  }, []);

  function getDayDescription(date: Date): string {
    const formattedDate = format(date, "EEEE', ' dd'/'MM'/'yyyy'", {
      locale: ptBR,
    });
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  function getHourDescription(start_date: Date, finish_date: Date): string {
    const firstHour = format(start_date, 'HH:00', {
      locale: ptBR,
    });
    const lastHour = format(finish_date, 'HH:00', {
      locale: ptBR,
    });
    return `De ${firstHour} às ${lastHour}`;
  }

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-down" color="#fff" size={RFValue(20)} />
          </BackButton>
          <HeaderTitle>Day Uses</HeaderTitle>
          <AddButton onPress={() => setModalOpened(true)}>
            <FeatherIcon name="plus-circle" color="#fff" size={RFValue(20)} />
          </AddButton>
        </Header>

        <Content>
          <DayUseList
            data={dayUse}
            keyExtractor={item => item.id}
            renderItem={({ item: day }) => (
              <>
                <DayUseContainer
                  available={day.limit - day.users_in_list === 0}
                  onPress={() => handleOpenModal(day.id, day.price)}
                >
                  <DateHourContent>
                    <DateText>
                      {getDayDescription(new Date(day.start_date))}
                    </DateText>
                    <HourText>
                      {`${getHourDescription(
                        new Date(day.start_date),
                        new Date(day.finish_date),
                      )} Vagas: ${day.limit - day.users_in_list}`}
                    </HourText>
                  </DateHourContent>
                  <FeatherIcon name="eye" color="#fff" size={RFValue(20)} />
                </DayUseContainer>
              </>
            )}
          />
        </Content>
        <Modal isVisible={modalOpened}>
          <NewDayUseModal closeModal={() => setModalOpened(false)} />
        </Modal>
        <Modal isVisible={usersModal}>
          <DayUseUsersModal
            id_dayuse={selectedId}
            price={selectedPrice}
            closeModal={() => setUsersModal(false)}
          />
        </Modal>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#006edb" size="large" />
          </LoadingContainer>
        ) : (
          <></>
        )}
      </Container>
    </LinearGradient>
  );
};

export default DayUseProps;
