/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { ActivityIndicator, Alert, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { shade } from 'polished';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '@app/hooks/auth';
import productId from '@app/Config/ProductsIds';
import env from '@app/Config/Environment';
import api from '@app/services/api';
import { PayCreditCard } from '@app/utils/Payments/vindi_credit_card';
import GetCardFlag from '@app/utils/Payments/get_card_flag';
import ImageCardFlag from '@app/components/ImageCardFlag';
import CreditCardForm from '@app/components/CreditCard';
import { useAppointmentContext } from '@app/hooks/appointment';

import { FlatList } from 'react-native-gesture-handler';
import {
  Container,
  Header,
  BackButton,
  TitleView,
  HeaderTitle,
  CreditCardTitle,
  CreditCardContainer,
  ModalView,
  ModalHeader,
  ModalHeaderTitle,
  ModalHeaderButton,
  Content,
  FinishButton,
  FinishButtonText,
  UseExistingCardView,
  UseExistingCardButton,
  UseExistingCardText,
  SavedCardContainer,
  SavedCardLastDigits,
  LoadingContainer,
} from './styles';

interface CardProps {
  cardName: string;
  cardNumber: string;
  cardCvc: string;
  cardExpiry: string;
}

export interface SavedCards {
  id: string;
  id_user: string;
  token: string;
  final_digits: string;
  flag: string;
}

const CreditCardPayment: React.FC = () => {
  const navigation = useNavigation();
  const { appointment, setIdTransactionAndUserData, materials } =
    useAppointmentContext();
  const { user, updateUser } = useAuth();
  const creditCardRef = useRef() as any;

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [hasSavedCards, setHasSavedCards] = useState(false);
  const [savedCards, setSavedCards] = useState<SavedCards[]>([]);

  useEffect(() => {
    api.get(`/creditCards/findByUser?id_user=${user.id}`).then(response => {
      setSavedCards(response.data);

      response.data.length > 0
        ? setHasSavedCards(true)
        : setHasSavedCards(false);

      setPageLoading(false);
    });
  }, [user.id, materials]);

  const handleSaveCreditCard = useCallback(
    (data: CardProps, id_transaction: string, payment_profile: string) => {
      const finalDigits = data.cardNumber.substring(
        data.cardNumber.length - 4,
        data.cardNumber.length,
      );
      setIdTransactionAndUserData(
        id_transaction,
        user.id,
        env.id_place,
        user.name,
        user.email,
      );
      api
        .get(
          `/creditCards/findByDigitsUser?id_user=${user.id}&final_digits=${finalDigits}`,
        )
        .then(response => {
          if (!response.data) {
            Alert.alert(
              'Pagamento efetuado com sucesso!',
              'Deseja salvar seu cartão para futuras compras?',
              [
                {
                  style: 'destructive',
                  text: 'Não',
                  onPress: () => {
                    navigation.navigate('AppointmentCreated', {
                      createAppointment: true,
                    });
                  },
                },
                {
                  style: 'default',
                  text: 'Sim',
                  onPress: () => {
                    const createCardData = {
                      id_user: user.id,
                      token: payment_profile,
                      final_digits: finalDigits,
                      flag: GetCardFlag(data.cardNumber.replace(/\s/g, '')),
                    };
                    api.post('/creditCards/create', createCardData).then(() => {
                      navigation.navigate('AppointmentCreated', {
                        createAppointment: true,
                      });
                    });
                  },
                },
              ],
              { cancelable: false },
            );
          } else {
            navigation.navigate('AppointmentCreated', {
              createAppointment: true,
            });
          }
        });
    },
    [user, navigation, cardCreatedOpts, setIdTransactionAndUserData],
  );

  const handlePaySavedCard = useCallback(
    async (payment_profile: string) => {
      setModalOpened(false);
      setLoading(true);
      try {
        const newData: CardProps = {
          cardName: '',
          cardNumber: '',
          cardCvc: '',
          cardExpiry: '',
        };
        const response = await PayCreditCard(
          user,
          appointment.priceToPay,
          productId.appointment,
          newData,
          payment_profile,
        );

        if (response.paid) {
          setIdTransactionAndUserData(
            String(response.id_transaction),
            user.id,
            env.id_place,
            user.name,
            user.email,
          );
          navigation.navigate('AppointmentCreated', {
            createAppointment: true,
          });
        }
      } catch (error) {
        setLoading(false);
      }
    },
    [user, navigation, appointment, setIdTransactionAndUserData],
  );

  const handleFinish = useCallback(async () => {
    setLoading(true);
    if (env.byPass) {
      setIdTransactionAndUserData(
        '',
        user.id,
        env.id_place,
        user.name,
        user.email,
      );
      navigation.navigate('AppointmentCreated', {
        createAppointment: true,
      });
    } else {
      try {
        const { error, data } = creditCardRef.current.submit();

        const cardData: CardProps = {
          cardName: data.holder,
          cardNumber: data.number.replace(/ /g, ''),
          cardCvc: data.cvv,
          cardExpiry: data.expiration,
        };
        const response = await PayCreditCard(
          user,
          appointment.priceToPay,
          productId.appointment,
          cardData,
          '',
        );
        if (response.paid) {
          user.customer_id = response.customer_id;
          updateUser(user);
          handleSaveCreditCard(
            cardData,
            String(response.id_transaction),
            response.payment_profile,
          );
        }
      } catch (error) {
        setLoading(false);
      }
    }
  }, [
    appointment,
    updateUser,
    user,
    handleSaveCreditCard,
    navigation,
    setIdTransactionAndUserData,
  ]);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="chevron-down" size={25} color="#fff" />
          </BackButton>
          <TitleView>
            <HeaderTitle>Pagamento</HeaderTitle>
          </TitleView>
        </Header>
        {pageLoading ? (
          <LoadingContainer>
            <ActivityIndicator color="#fff" size="large" />
          </LoadingContainer>
        ) : (
          <>
            <Content onTouchStart={() => Keyboard.dismiss()}>
              <UseExistingCardView visible={hasSavedCards}>
                <UseExistingCardButton
                  disabled={!hasSavedCards}
                  onPress={() => setModalOpened(true)}
                >
                  <Icon name="save" size={25} color="#fff" />
                  <UseExistingCardText>Usar cartão salvo</UseExistingCardText>
                </UseExistingCardButton>
              </UseExistingCardView>
              <CreditCardContainer>
                <CreditCardTitle>Informe seu cartão de crédito</CreditCardTitle>
                <CreditCardForm
                  ref={creditCardRef}
                  expirationDateFormat="MM/YY"
                  onValidStateChange={() => {}}
                  background="#000"
                  textColor="#fff"
                  placeholders={{
                    number: '0000 0000 0000 0000',
                    holder: 'NOME',
                    expiration: 'MM/YY',
                    cvv: 'CVC',
                  }}
                  placeholderTextColor={shade(0.1, '#fff')}
                />
              </CreditCardContainer>
            </Content>
            <FinishButton onPress={() => handleFinish()}>
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <FinishButtonText>Finalizar</FinishButtonText>
              )}
            </FinishButton>
          </>
        )}
        <Modal isVisible={modalOpened}>
          <ModalView>
            <ModalHeader>
              <ModalHeaderTitle>Meus cartões</ModalHeaderTitle>
              <ModalHeaderButton onPress={() => setModalOpened(false)}>
                <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
              </ModalHeaderButton>
            </ModalHeader>
            <FlatList
              data={savedCards}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: card }) => (
                <SavedCardContainer
                  onPress={() => handlePaySavedCard(card.token)}
                >
                  <ImageCardFlag flag={card.flag} />
                  <SavedCardLastDigits>
                    **** **** **** {card.final_digits}
                  </SavedCardLastDigits>
                </SavedCardContainer>
              )}
            />
          </ModalView>
        </Modal>
      </Container>
    </LinearGradient>
  );
};
export default CreditCardPayment;
