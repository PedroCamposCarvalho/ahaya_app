/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { io } from 'socket.io-client';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../../../hooks/auth';
import { useDayUse } from '../../../hooks/dayuse';
import env from '../../../Config/Environment';
import api from '../../../services/api';
import {
  Container,
  Header,
  Title,
  Content,
  LoadingContainer,
  NoListAvailable,
  NoListText,
  OtherDayUseList,
  OtherDayUseContent,
  OtherDateHourContent,
  OtherDateText,
  OtherHourText,
  OtherDayUseTitle,
  ContentTitle,
  ReloadButton,
  ReloadButtonText,
} from './styles';

export interface DayUseProps {
  id: string;
  limit: number;
  start_date: Date;
  finish_date: Date;
  price: number;
  material_amount: number;
  users_in_list: number;
  special_thumbnail: string;
  special_image: string;
}

const DayUse: React.FC = () => {
  const { user } = useAuth();
  const { setDayUseProps } = useDayUse();
  const navigation = useNavigation();
  const [dayuse, setDayUse] = useState<DayUseProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState(0);

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
    api
      .get('/dayuse/findAll?past=false')
      .then(response => {
        setDayUse(response.data.dayuse);
        setLoading(false);
      })
      .catch(error => {});
  }, []);

  useEffect(() => {
    socket.on('daylistavailability', () => {
      api
        .get('/dayuse/findAll?past=false')
        .then(response => {
          setDayUse(response.data.dayuse);
          setLoading(false);
        })
        .catch(error => {});
    });
    socket.on('NewDayUseList', () => {
      api
        .get('/dayuse/findAll')
        .then(response => {
          setDayUse(response.data.dayuse);
          setLoading(false);
        })
        .catch(error => {});
    });
  }, [socket]);

  const handleNavigation = useCallback(
    (data: DayUseProps, special_image: string) => {
      const newData = {
        id: data.id,
        limit: data.limit,
        start_date: data.start_date,
        finish_date: data.finish_date,
        price: data.price,
        tickets: 0,
        material_amount: 0,
      };
      setDayUseProps(newData);
      navigation.navigate('DayUseResume', { special_image });
    },
    [navigation, setDayUseProps],
  );

  const handleRefresh = useCallback(() => {
    api
      .get('/dayuse/findAll?limit=5')
      .then(response => {
        setDayUse(response.data.dayuse);
        setLoading(false);
      })
      .catch(error => {});
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
          <Title>Day Use</Title>
        </Header>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#fff" size="large" />
          </LoadingContainer>
        ) : (
          <Content>
            <ContentTitle />
            {dayuse.length === 0 && !loading ? (
              <NoListAvailable>
                <NoListText>Nenhuma lista disponível</NoListText>
                <ReloadButton onPress={() => handleRefresh()}>
                  <ReloadButtonText>Recarregar</ReloadButtonText>
                </ReloadButton>
              </NoListAvailable>
            ) : (
              <>
                <OtherDayUseList
                  refreshControl={
                    <RefreshControl
                      tintColor="#fff"
                      colors={['#fff']}
                      refreshing={loading}
                      onRefresh={() => handleRefresh()}
                    />
                  }
                  data={dayuse.filter(
                    item => item.limit - item.users_in_list > 0,
                  )}
                  keyExtractor={hour => String(hour.start_date)}
                  renderItem={({ item: hour, index }) => (
                    <>
                      {hour.special_thumbnail > '' ? (
                        <ImageBackground
                          source={{
                            uri: `https://app-ahaya.s3.amazonaws.com/${hour.special_thumbnail}`,
                          }}
                          imageStyle={{ borderRadius: RFValue(10) }}
                          style={{ flex: 1 }}
                        >
                          <OtherDayUseContent
                            special={hour.special_thumbnail > ''}
                            onPress={() =>
                              handleNavigation(hour, hour.special_image)
                            }
                          >
                            <OtherDateHourContent>
                              <OtherDateText>
                                {getDayDescription(new Date(hour.start_date))}
                              </OtherDateText>
                              <OtherHourText>
                                {`${getHourDescription(
                                  new Date(hour.start_date),
                                  new Date(hour.finish_date),
                                )}`}
                              </OtherHourText>
                            </OtherDateHourContent>
                            <Icon
                              name="chevron-right"
                              color="#fff"
                              size={RFValue(25)}
                            />
                          </OtherDayUseContent>
                        </ImageBackground>
                      ) : (
                        <>
                          <OtherDayUseContent
                            special={hour.special_thumbnail > ''}
                            onPress={() => handleNavigation(hour)}
                          >
                            <OtherDateHourContent>
                              <OtherDateText>
                                {getDayDescription(new Date(hour.start_date))}
                              </OtherDateText>
                              <OtherHourText>
                                {`${getHourDescription(
                                  new Date(hour.start_date),
                                  new Date(hour.finish_date),
                                )}`}
                              </OtherHourText>
                            </OtherDateHourContent>
                            <Icon
                              name="chevron-right"
                              color="#fff"
                              size={RFValue(25)}
                            />
                          </OtherDayUseContent>
                        </>
                      )}
                    </>
                  )}
                />
              </>
            )}
          </Content>
        )}
      </Container>
    </LinearGradient>
  );
};

export default DayUse;
