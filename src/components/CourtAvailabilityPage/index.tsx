/* eslint-disable no-plusplus */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import { io } from 'socket.io-client';
import env from '../../Config/Environment';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
  Container,
  LoadingContainer,
  CourtContainer,
  CourtName,
  AddToCartButton,
} from './styles';

interface SelectedHours {
  hour: number;
  date: number;
  id_court: string;
}

interface PageProps {
  name: string;
  id_court: string;
  selectedHour: number;
  date: Date;
  id_sport: string;
  selectedHours: SelectedHours[];
  handleAddItemToCart: (
    id_court: string,
    price: number,
    court_name: string,
  ) => void;
}

interface AvailabilityItem {
  id_court: string;
  hour: number;
  available: boolean;
  hourFormatted: string;
}

const CourtAvailabilityPage: React.FC<PageProps> = ({
  name,
  id_court,
  selectedHour,
  date,
  id_sport,
  handleAddItemToCart,
  selectedHours,
}) => {
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    api
      .get('/appointments/findByDay', {
        params: {
          id_court,
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
      })
      .then(response => {
        setAvailability(response.data);
        api
          .get(`/sports/findPriceBySportId?id_sport=${id_sport}`)
          .then(response2 => {
            api.get(`/users/isUserVIP?id_user=${user.id}`).then(response3 => {
              if (response3.data === true) {
                setPrice(Number(response2.data.regular) - 30);
              } else {
                setPrice(Number(response2.data.regular));
              }
            });
          });
      });
    setLoading(false);
  }, [date, id_court, id_sport, selectedHour, user.id]);

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
    socket.on('newAppointment', () => {
      setLoading(true);
      api
        .get('/appointments/findByDay', {
          params: {
            id_court,
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
          },
        })
        .then(response => {
          setAvailability(response.data);
          api
            .get(`/sports/findPriceBySportId?id_sport=${id_sport}`)
            .then(response2 => {
              api.get(`/users/isUserVIP?id_user=${user.id}`).then(response3 => {
                if (response3.data === true) {
                  setPrice(Number(response2.data.regular) - 30);
                } else {
                  setPrice(Number(response2.data.regular));
                }
              });
            });
        });
      setLoading(false);
    });
  }, [socket, date, id_court, id_sport, selectedHour, user.id]);

  const dayAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => selectedHour === hour)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: String(format(new Date().setHours(hour), 'HH:00')),
        };
      });
  }, [availability, selectedHour]);

  const changeIcon = useMemo(() => {
    const newDate = new Date(date);
    newDate.setHours(selectedHour);
    newDate.setMinutes(0);
    newDate.setSeconds(0);

    let found = false;

    date.setMilliseconds(0);
    for (let i = 0; i < selectedHours.length; i++) {
      if (
        selectedHours[i].hour === selectedHour &&
        selectedHours[i].id_court === id_court &&
        selectedHours[i].date === newDate.setMilliseconds(0)
      ) {
        found = true;
        break;
      }
    }
    if (found) {
      return {
        available: false,
      };
    }
    return {
      available: true,
    };
  }, [date, id_court, selectedHours, selectedHour]);

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator color="#99d420" size="small" />
        </LoadingContainer>
      ) : (
        <>
          {dayAvailability.length > 0 && dayAvailability[0].available ? (
            <Container>
              <CourtContainer>
                <CourtName>{name}</CourtName>
                <CourtName>
                  {price === 0 ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>{`R$ ${String(price).replace('.', ',')},00`}</>
                  )}
                </CourtName>
                <AddToCartButton
                  onPress={() => handleAddItemToCart(id_court, price, name)}
                >
                  {changeIcon.available ? (
                    <Icon name="cart-plus" color="#04d461" size={20} />
                  ) : (
                    <Icon name="cart-remove" color="#c53030" size={20} />
                  )}
                </AddToCartButton>
              </CourtContainer>
            </Container>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default CourtAvailabilityPage;
