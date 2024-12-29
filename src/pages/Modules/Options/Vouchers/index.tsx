/* eslint-disable no-plusplus */
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Emoji from 'react-native-emoji';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { useVoucher } from '../../../../hooks/voucherpayment';
import { useNotificationVoucher } from '../../../../hooks/vouchernotifications';
import api from '../../../../services/api';
import {
  Container,
  Header,
  BackButton,
  OptionsButton,
  Badge,
  BadgeText,
  HeaderTitle,
  Content,
  DescriptionContainer,
  DescriptionText,
  LittleDescriptionContainer,
  LittleDescriptionText,
  VouchersList,
  LoadingContainer,
  VoucherButton,
  SportTitle,
  PercentageText,
  OffText,
  Description,
} from './styles';

export interface VoucherProps {
  id: string;
  id_sport: string;
  percentage: number;
  name: string;
  photo: string;
}

const GiftVourchers: React.FC = () => {
  const errorToastOpts = useMemo(
    () => ({
      data: 'Erro ao processar a solicitação',
      textColor: '#fff',
      backgroundColor: '#c53030',
      duration: WToast.duration.LONG,
      position: WToast.position.TOP,
    }),
    [],
  );

  const navigation = useNavigation();
  const { setPercentage } = useVoucher();
  const { notifications } = useNotificationVoucher();
  const [notificationCount, setNotificationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [vouchers, setVouchers] = useState<VoucherProps[]>([]);

  useEffect(() => {
    api
      .get('/vouchers/findAllMenu')
      .then(response => {
        setVouchers(response.data);
        let BagdeQtd = 0;
        for (let i = 0; i < notifications.length; i++) {
          if (
            !notifications[i].read &&
            notifications[i].id_voucher !== 'Menu Option'
          ) {
            BagdeQtd += 1;
          }
        }
        setNotificationCount(BagdeQtd);
        setLoading(false);
      })
      .catch(() => {
        WToast.show(errorToastOpts);
      });
  }, [errorToastOpts, notificationCount, notifications]);

  const handleNavigation = useCallback(
    (percentage: number, id_sport: string) => {
      setPercentage(percentage, id_sport);
      navigation.navigate('SelectPaymentMethod');
    },
    [setPercentage, navigation],
  );

  return (
    <Provider>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" color="#fff" size={20} />
          </BackButton>
          <HeaderTitle>Vouchers</HeaderTitle>

          <Menu
            visible={optionsVisible}
            onDismiss={() => setOptionsVisible(false)}
            anchor={
              <OptionsButton onPress={() => setOptionsVisible(true)}>
                <>
                  {notificationCount > 0 ? (
                    <Badge>
                      <BadgeText>{notificationCount}</BadgeText>
                    </Badge>
                  ) : (
                    <></>
                  )}
                </>
                <Icon name="more-horizontal" color="#fff" size={30} />
              </OptionsButton>
            }
          >
            <Menu.Item onPress={() => {}} title="Item 1" />
            <Menu.Item onPress={() => {}} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Item 3" />
          </Menu>
        </Header>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#fff" size="large" />
          </LoadingContainer>
        ) : (
          <Content>
            <DescriptionContainer>
              <DescriptionText>
                Dê um presente para alguém querido por você!
              </DescriptionText>
              <LittleDescriptionContainer>
                <LittleDescriptionText>
                  Quem sabe até um crush?
                </LittleDescriptionText>
                <Emoji name="wink" style={{ fontSize: 20 }} />
              </LittleDescriptionContainer>
            </DescriptionContainer>
            <VouchersList
              data={vouchers}
              keyExtractor={voucher => voucher.id}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              renderItem={({ item: voucher }) => (
                <VoucherButton
                  onPress={() =>
                    handleNavigation(voucher.percentage, voucher.id_sport)
                  }
                >
                  <LinearGradient
                    start={{ x: 0.0, y: 0.25 }}
                    end={{ x: 0.5, y: 1.0 }}
                    locations={[0, 0.5, 0.6]}
                    colors={['#fff', '#99d420']}
                    style={{
                      flex: 1,
                      paddingLeft: 15,
                      paddingRight: 15,
                      borderRadius: 5,
                    }}
                  >
                    <SportTitle>{voucher.name}</SportTitle>
                    <PercentageText>{`${voucher.percentage}%`}</PercentageText>
                    <OffText>OFF</OffText>
                  </LinearGradient>
                </VoucherButton>
              )}
            />
          </Content>
        )}
        <Description>
          O desconto será no valor da reserva, os materiais não serão
          descontados
        </Description>
      </Container>
    </Provider>
  );
};

export default GiftVourchers;
