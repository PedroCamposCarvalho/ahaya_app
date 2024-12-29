/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { format } from 'date-fns';
import { io } from 'socket.io-client';
import api from '../../../../services/api';
import env from '../../../../Config/Environment';
import MonthlyProps from '../../../../interfaces/Monthly';
import DayOfWeek from '../../../../interfaces/DayOfWeek';
import Court from '../../../../interfaces/Court';
import { useAuth } from '../../../../hooks/auth';
import getDayOfWeek from '../../../../utils/getDayOfWeekList';
import {
  Container,
  LoadingContainer,
  NoMonthlyContainer,
  NoMonthlyText,
  MonthlyList,
  MonthlyContainer,
  MonthlyDetails,
  MonthlyHour,
  MonthlyCourt,
  MonthlyDayOfWeek,
  MonthlyPaidContainer,
  MonthlyRenewDateLabel,
  MonthlyRenewDate,
  PullToRefreshView,
  PullToRefreshText,
} from './styles';
import Environment from '../../../../Config/Environment';

const Monthly: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [monthly, setMonthly] = useState<MonthlyProps[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [days, setDays] = useState<DayOfWeek[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    setDays(getDayOfWeek());
    api
      .get(`/courts/findAll?id_place=${Environment.id_place}`)
      .then(response => {
        setCourts(response.data);
      });
  }, []);

  useEffect(() => {
    api.get(`/monthly/findUserMonthly?id_user=${user.id}`).then(response => {
      setMonthly(response.data);
    });
    setLoading(false);
  }, [user]);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    api.get(`/monthly/findUserMonthly?id_user=${user.id}`).then(response => {
      setMonthly(response.data);
    });
    setLoading(false);
  }, [user.id]);

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
    socket.on('monthly_user_created', () => {
      api.get(`/monthly/findUserMonthly?id_user=${user.id}`).then(response => {
        setMonthly(response.data);
      });
    });
  }, [socket, user.id]);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#fff" size="large" />
          </LoadingContainer>
        ) : (
          <>
            {monthly.length === 0 ? (
              <NoMonthlyContainer>
                <NoMonthlyText>Você ainda não é mensalista :(</NoMonthlyText>
              </NoMonthlyContainer>
            ) : (
              <MonthlyList
                refreshControl={
                  <RefreshControl
                    tintColor="#fff"
                    colors={['#fff']}
                    refreshing={loading}
                    onRefresh={() => handleRefresh()}
                  />
                }
                data={monthly}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: hour }) => (
                  <MonthlyContainer>
                    <MonthlyDetails>
                      <MonthlyDayOfWeek>
                        {
                          days.filter(item => item.number === hour.week_day)[0]
                            ?.label
                        }
                      </MonthlyDayOfWeek>
                      <MonthlyHour>{`${hour.hour}:00`}</MonthlyHour>
                      <MonthlyCourt>
                        {
                          courts.filter(item => item.id === hour.id_court)[0]
                            ?.courtname
                        }
                      </MonthlyCourt>
                    </MonthlyDetails>
                    <MonthlyPaidContainer>
                      <MonthlyRenewDateLabel>
                        Próxima cobrança:
                      </MonthlyRenewDateLabel>
                      <MonthlyRenewDate>
                        {format(new Date(hour.renew_date), 'dd/MM/yyyy')}
                      </MonthlyRenewDate>
                    </MonthlyPaidContainer>
                  </MonthlyContainer>
                )}
              />
            )}
          </>
        )}
      </Container>
      <PullToRefreshView>
        <PullToRefreshText>Arraste para baixo para atualizar</PullToRefreshText>
      </PullToRefreshView>
    </LinearGradient>
  );
};

export default Monthly;
