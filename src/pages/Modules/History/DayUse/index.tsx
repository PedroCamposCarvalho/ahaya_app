/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ImageBackground,
  Image,
  View,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-generator';
import Modal from 'react-native-modal';
import { io } from 'socket.io-client';
import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';
import { RefundCharge } from '../../../../utils/Payments/vindi_refund_transaction';
import env from '../../../../Config/Environment';
import {
  Container,
  PullToRefreshText,
  LoadingContainer,
  DayUseList,
  TicketView,
  DayUseItem,
  DayUseDayView,
  DayUseDay,
  DayUseHourView,
  DayUseHour,
  TicketAmountView,
  TicketAmount,
  TicketQRCodeView,
  TicketDetailsView,
  ScanQRCodeButton,
  ScanQRCodeText,
  ModalView,
  ModalHeader,
  ModalHeaderTitle,
  ModalHeaderButton,
  ModalContent,
  ModalQRCodeDescription,
  TicketRetrievedView,
} from './styles';

export interface DayUseProps {
  id: string;
  id_dayuse: string;
  paid: boolean;
  paid_price: number;
  material_amount: number;
  id_transaction: string;
  ticket_number: number;
  created_at: Date;
  start_date: Date;
  finish_date: Date;
  retrieved: number;
}

const DayUse: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [canCancel, setCanCancel] = useState(false);
  const [dayUses, setDayUses] = useState<DayUseProps[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    api
      .get(`/dayuse/findAllByUser?id_user=${user.id}`)
      .then(response => {
        setDayUses(response.data);

        if (response.data.length > 0) {
          const today = new Date();
          if (
            today.getDate() !== new Date(response.data[0].start_date).getDate()
          ) {
            setCanCancel(true);
          }
        }
        setLoading(false);
      });
  }, [user.id]);

  const handleRefresh = useCallback(async () => {
    setLoading(true);
    api
      .get(`/dayuse/findAllByUser?id_user=${user.id}`)
      .then(response => {
        setDayUses(response.data);
        if (response.data.length > 0) {
          const today = new Date();
          if (
            today.getDate() === new Date(response.data[0].start_date).getDate()
          ) {
            setCanCancel(false);
          }
        }
        setLoading(false);
      });
  }, [user.id]);

  const cancelDayUse = useCallback(
    async (
      id_dayuse: string,
      id_transaction: string,
      price: number,
      paid: boolean,
    ) => {
      setLoading(true);
      const data = {
        id_transaction,
        amount: price,
      };

      const response = await RefundCharge(data);
      if (String(response) === 'true') {
        api
          .delete(`dayUse/deleteUser?id_user=${user.id}&id_dayuse=${id_dayuse}`)
          .then(response2 => {
            setLoading(false);
            setDayUses([]);
          });
      }

      setDayUses([]);
    },
    [user.id],
  );

  const handleCancel = useCallback(
    (
      id_dayuse: string,
      id_transaction: string,
      price: number,
      paid: boolean,
    ) => {
      Alert.alert(
        'Cancelar DayUse',
        'Deseja realmente cancelar seu ticket?',
        [
          {
            text: 'Não',
          },
          {
            text: 'Sim',
            onPress: () => {
              cancelDayUse(id_dayuse, id_transaction, price, paid);
            },
          },
        ],
        { cancelable: false },
      );
    },
    [cancelDayUse],
  );

  const handleOpenQRCodeModal = useCallback((id: string) => {
    setTicketId(id);
    setModalOpened(true);
  }, []);

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
      api.get(`/dayuse/findAllByUser?id_user=${user.id}`).then(response => {
        setDayUses(response.data);

        if (response.data.length > 0) {
          const today = new Date();
          if (
            today.getDate() !== new Date(response.data[0].start_date).getDate()
          ) {
            setCanCancel(true);
          }
        }
      });
    });
  }, [user.id, socket]);

  useEffect(() => {
    socket.on('ticket_retrieved', () => {
      setModalOpened(false);
      api
        .get(`/dayuse/findAllByUser?id_user=${user.id}`)
        .then(response => {
          setDayUses(response.data);
        });
    });
  }, [socket, user.id]);

  function getDayDescription(date: Date): string {
    const formattedDate = format(date, "EEEE', ' dd'/'MM'/'yyyy'", {
      locale: ptBR,
    });
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  function getHourDescription(start_date: Date, finish_date: Date): string {
    const firstHour = format(
      start_date.setHours(start_date.getHours() + 3),
      'HH:00',
      {
        locale: ptBR,
      },
    );
    const lastHour = format(
      finish_date.setHours(finish_date.getHours() + 3),
      'HH:00',
      {
        locale: ptBR,
      },
    );
    return `De ${firstHour} às ${lastHour}`;
  }

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#fff" size="large" />
          </LoadingContainer>
        ) : (
          <DayUseList
            refreshControl={
              <RefreshControl
                tintColor="#fff"
                colors={['#fff']}
                refreshing={loading}
                onRefresh={() => handleRefresh()}
              />
            }
            data={dayUses}
            keyExtractor={dayUse => dayUse.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: dayUse }) => (
              <>
                <TicketView>
                  <TicketQRCodeView>
                    {dayUse.retrieved > 0 ? (
                      <TicketRetrievedView>
                        <Icon
                          name="check-circle"
                          color="#4bb543"
                          size={RFValue(24)}
                        />
                      </TicketRetrievedView>
                    ) : (
                      <ScanQRCodeButton
                        onPress={() => handleOpenQRCodeModal(dayUse.id)}
                      >
                        <MaterialIcon
                          name="qrcode"
                          color="#006edb"
                          size={RFValue(24)}
                        />
                        <ScanQRCodeText>QR Code</ScanQRCodeText>
                      </ScanQRCodeButton>
                    )}
                  </TicketQRCodeView>
                  <TicketDetailsView>
                    <DayUseItem>
                      <DayUseDayView>
                        <Icon name="calendar" color="#fff" size={20} />
                        <DayUseDay>
                          {getDayDescription(new Date(dayUse.start_date))}
                        </DayUseDay>
                      </DayUseDayView>
                      <DayUseHourView>
                        <Icon name="clock" color="#fff" size={20} />
                        <DayUseHour>
                          {getHourDescription(
                            new Date(dayUse.start_date),
                            new Date(dayUse.finish_date),
                          )}
                        </DayUseHour>
                      </DayUseHourView>
                      <TicketAmountView>
                        <Icon name="link" color="#fff" size={20} />
                        <TicketAmount>
                          Ingresso Nº: {dayUse.ticket_number}
                        </TicketAmount>
                      </TicketAmountView>
                    </DayUseItem>
                  </TicketDetailsView>
                </TicketView>
              </>
            )}
          />
        )}
        <PullToRefreshText>Arraste para baixo para atualizar</PullToRefreshText>
      </Container>
      <Modal isVisible={modalOpened}>
        <ModalView>
          <ModalHeader>
            <ModalHeaderTitle>QR Code</ModalHeaderTitle>
            <ModalHeaderButton onPress={() => setModalOpened(false)}>
              <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
            </ModalHeaderButton>
          </ModalHeader>
          <ModalContent>
            <QRCode
              value={ticketId}
              size={RFValue(180)}
              bgColor="#000"
              fgColor="#fff"
            />
            <ModalQRCodeDescription>
              Apresente esse QR Code na Arena e o troque pela pulseirinha de Day
              Use
            </ModalQRCodeDescription>
          </ModalContent>
        </ModalView>
      </Modal>
    </LinearGradient>
  );
};

export default DayUse;
