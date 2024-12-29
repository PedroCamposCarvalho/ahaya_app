import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import ActionButton from 'react-native-action-button';
import { io } from 'socket.io-client';
import { useAuth } from '../../../../../hooks/auth';
import api from '../../../../../services/api';
import env from '../../../../../Config/Environment';
import {
  Container,
  LoadingContainer,
  Header,
  HeaderTitle,
  BackButton,
  ScanButton,
  Content,
  TableHeader,
  TableUserNameTitle,
  TableUserRacketTitle,
  TableUserTicketsAmountTitle,
  UsersList,
  UserContainer,
  UserName,
  UserRackets,
  UserTickets,
  NoClientsFoundContainer,
  NoClientsFoundText,
  TotalContainer,
  TotalText,
} from './styles';

interface RouteParams {
  id_dayuse: string;
  onGoBack: () => void;
}

export interface DayUseProps {
  id: string;
  name: string;
  paid_price: number;
  material_amount: number;
  tickets: number;
  tickets_retrieved: number;
}

const DayUseDetail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [dayUse, setDayUse] = useState<DayUseProps[]>([]);
  const { user } = useAuth();
  const { id_dayuse, onGoBack } = route.params as RouteParams;

  useEffect(() => {
    api.get(`dayUse/findUsersByList?id_dayuse=${id_dayuse}`).then(response => {
      setDayUse(response.data);
      setLoading(false);
    });
  }, [id_dayuse]);

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
    socket.on('ticket_retrieved', () => {
      api
        .get(`dayUse/findUsersByList?id_dayuse=${id_dayuse}`)
        .then(response => {
          setDayUse(response.data);
        });
    });
  }, [socket, user.id, id_dayuse]);

  const handleDeleteDayUse = useCallback(() => {
    Alert.alert(
      'Atenção!',
      'Deseja realmente excluir este Day Use?',
      [
        {
          style: 'destructive',
          text: 'Não',
        },
        {
          style: 'default',
          text: 'Sim',
          onPress: () => {
            setLoading(true);
            api
              .delete(`/dayUse/deleteDayUse?id_dayuse=${id_dayuse}`)
              .then(response => {
                navigation.goBack();
                onGoBack();
              });
          },
        },
      ],
      { cancelable: false },
    );
  }, [id_dayuse, navigation, onGoBack]);
  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-down" color="#fff" size={RFValue(20)} />
          </BackButton>
          <HeaderTitle>Detalhes de lista</HeaderTitle>
          <ScanButton onPress={() => navigation.navigate('ScanQRCode')}>
            <MaterialIcon name="qrcode-scan" color="#fff" size={RFValue(20)} />
          </ScanButton>
        </Header>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#fff" size="large" />
          </LoadingContainer>
        ) : (
          <Content>
            <TableHeader>
              <TableUserNameTitle>Cliente</TableUserNameTitle>
              <TableUserRacketTitle>Rqts.</TableUserRacketTitle>
              <TableUserTicketsAmountTitle>Tick.</TableUserTicketsAmountTitle>
              <TableUserTicketsAmountTitle>Rtd.</TableUserTicketsAmountTitle>
            </TableHeader>
            {dayUse.length === 0 && !loading ? (
              <NoClientsFoundContainer>
                <NoClientsFoundText>Lista vazia</NoClientsFoundText>
              </NoClientsFoundContainer>
            ) : (
              <>
                <UsersList
                  data={dayUse}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item: data }) => (
                    <UserContainer
                      allTicketsRetrieved={
                        data.tickets === data.tickets_retrieved
                      }
                    >
                      <UserName>{data.name}</UserName>
                      <UserRackets>{data.material_amount}</UserRackets>
                      <UserTickets>{data.tickets}</UserTickets>
                      <UserTickets>{data.tickets_retrieved}</UserTickets>
                    </UserContainer>
                  )}
                />
                <TotalContainer>
                  <TotalText>{`Total: ${dayUse.length}`}</TotalText>
                </TotalContainer>
              </>
            )}
          </Content>
        )}
        <ActionButton
          buttonColor="#d8142d"
          renderIcon={() => (
            <MaterialIcon
              name="trash-can-outline"
              color="#fff"
              size={RFValue(30)}
            />
          )}
          onPress={() => {
            handleDeleteDayUse();
          }}
        />
      </Container>
    </LinearGradient>
  );
};

export default DayUseDetail;
