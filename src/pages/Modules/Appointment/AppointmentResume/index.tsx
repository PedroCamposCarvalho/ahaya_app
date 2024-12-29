import React, { useCallback, useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { format } from 'date-fns';
import { useAppointmentContext } from '@app/hooks/appointment';
import { useScoreContext } from '@app/hooks/score';
import { useAuth } from '@app/hooks/auth';
import env from '@app/Config/Environment';
import SelectPaymentTypeModal from './SelectPaymentTypeModal';
import PointsContainer from './PointsContainer';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Content,
  DescriptionText,
  HourContainer,
  HourDetailsContainer,
  HourCourt,
  HourStartDate,
  HourFinishDate,
  MaterialsButton,
  MaterialsButtonText,
  MaterialsList,
  MaterialContainer,
  MaterialName,
  MaterialAmount,
  Footer,
  FinalPriceText,
  ContinueButton,
  ContinueButtonText,
  HousDetailsView,
  HourNumberOfPlayersContainer,
  NumberOfPlayersLabel,
  PlayerAmountContainer,
  NumberOfPlayersAmount,
} from './styles';

const AppointmentResume: React.FC = () => {
  const navigation = useNavigation();
  const {
    appointment,
    hours,
    materials,
    setPriceToPayAndPoints,
    setIdTransactionAndUserData,
  } = useAppointmentContext();
  const { scores, userPoints } = useScoreContext();
  const { user } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);

  const appointmentFinalPrice = useMemo(() => {
    const temp = 0;
    const { finalPrice } = appointment;
    const { each_point_worth } = scores[0];

    const valueToDiscount = each_point_worth * pointsToUse;

    const price = Number(finalPrice) - valueToDiscount;

    if (price <= 0) {
      return 0;
    }

    return price;
  }, [appointment, scores, pointsToUse]);

  const handleContinue = useCallback(() => {
    const pointsToWin = hours.length;

    setPriceToPayAndPoints(appointmentFinalPrice, pointsToUse, pointsToWin);

    if (appointmentFinalPrice === 0) {
      Alert.alert(
        'De graça!',
        'Você não pagará nada! Pressione Sim para continuar!',
        [
          {
            text: 'Não',
            style: 'destructive',
          },
          {
            text: 'Sim',
            style: 'default',
            onPress: () => {
              setIdTransactionAndUserData(
                '',
                user.id,
                env.id_place,
                user.name,
                user.email,
              );
              navigation.navigate('AppointmentCreatedFree');
            },
          },
        ],
        { cancelable: false },
      );
    } else {
      setModalOpen(true);
    }
  }, [
    appointmentFinalPrice,
    hours,
    pointsToUse,
    navigation,
    user,
    setPriceToPayAndPoints,
    setIdTransactionAndUserData,
  ]);

  const handleNavigation = useCallback(
    (item: string) => {
      setModalOpen(false);
      if (item === 'PIX') {
        navigation.navigate('PixPayment');
      } else {
        navigation.navigate('CreditCardPayment');
      }
    },
    [navigation],
  );

  const handleChangePointsToUse = useCallback(
    (points: number) => {
      if (appointmentFinalPrice > 0) {
        setPointsToUse(points);
      }
      if (points < pointsToUse) {
        setPointsToUse(points);
      }
    },
    [appointmentFinalPrice, pointsToUse],
  );

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FeatherIcon name="chevron-down" size={RFValue(20)} color="#fff" />
          </BackButton>
          <HeaderTitle>Resumo da reserva</HeaderTitle>
          <BackButton>
            <FeatherIcon
              name="chevron-down"
              size={RFValue(20)}
              color="transparent"
            />
          </BackButton>
        </Header>
        <Content>
          <DescriptionText>Por favor, revise sua reserva</DescriptionText>
          <FlatList
            data={hours}
            keyExtractor={item => item.court_name}
            style={{ flex: 1, width: '100%' }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: hour, index }) => (
              <HourContainer>
                <HousDetailsView>
                  <HourDetailsContainer>
                    <HourCourt>{hour.court_name}</HourCourt>
                    <HourStartDate>
                      Início: {format(hour.start_date, '  dd/MM/yyyy HH:mm')}
                    </HourStartDate>
                    <HourFinishDate>
                      Fim: {format(hour.finish_date, '    dd/MM/yyyy HH:mm')}
                    </HourFinishDate>
                  </HourDetailsContainer>
                  <HourNumberOfPlayersContainer>
                    <NumberOfPlayersLabel>N˚ de jogadores</NumberOfPlayersLabel>
                    <PlayerAmountContainer>
                      <NumberOfPlayersAmount>
                        {hour.number_of_players}
                      </NumberOfPlayersAmount>
                    </PlayerAmountContainer>
                  </HourNumberOfPlayersContainer>
                </HousDetailsView>
                <MaterialsButton>
                  <MaterialsButtonText>Materiais:</MaterialsButtonText>
                  <FlatList
                    data={materials.filter(item => item.id_hour === hour.id)}
                    keyExtractor={item => item.id}
                    renderItem={({ item: material }) => (
                      <MaterialContainer>
                        <MaterialName>{material.material}</MaterialName>
                        <MaterialAmount>{material.amount}</MaterialAmount>
                      </MaterialContainer>
                    )}
                  />
                </MaterialsButton>
              </HourContainer>
            )}
          />
        </Content>
        <Footer>
          <PointsContainer
            scoreRule={scores[0]}
            userPoints={userPoints}
            usePoints={usePoints}
            pointsToUse={pointsToUse}
            tickets={0}
            isUsingPointsAppointment={false}
            setUsePoints={(i: boolean) => setUsePoints(i)}
            handleChangePointsToUse={(points: number) =>
              handleChangePointsToUse(points)
            }
          />
          <FinalPriceText>
            {`Preço final: R$ ${String(
              appointmentFinalPrice.toFixed(2),
            ).replace('.', ',')}`}
          </FinalPriceText>
          <ContinueButton onPress={() => handleContinue()}>
            <ContinueButtonText>Ir para o pagamento</ContinueButtonText>
          </ContinueButton>
        </Footer>
      </Container>
      <Modal isVisible={modalOpen}>
        <SelectPaymentTypeModal
          closeModal={() => setModalOpen(false)}
          handleNavigation={(item: string) => handleNavigation(item)}
        />
      </Modal>
    </LinearGradient>
  );
};

export default AppointmentResume;
