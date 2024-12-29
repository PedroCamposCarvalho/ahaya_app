import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { ActivityIndicator, Alert, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAuth } from '../../../../hooks/auth';
import { useMonthly } from '../../../../hooks/monthly';
import api from '../../../../services/api';
import { PayCreditCard } from '../../../../utils/Payments/vindi_credit_card';
import GetCardFlag from '../../../../utils/Payments/get_card_flag';
import ImageCardFlag from '../../../../components/ImageCardFlag';
import env from '../../../../Config/Environment';
import ids from '../../../../Config/ProductsIds';
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
  ModalSavedCardsList,
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
  const { monthly, setPaymentData } = useMonthly();

  const { user, updateUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [hasSavedCards, setHasSavedCards] = useState(false);
  const [savedCards, setSavedCards] = useState<SavedCards[]>([]);
  const [cardData, setCardData] = useState<CardProps>({} as CardProps);

  useEffect(() => {
    api.get(`/creditCards/findByUser?id_user=${user.id}`).then(response => {
      setSavedCards(response.data);

      response.data.length > 0
        ? setHasSavedCards(true)
        : setHasSavedCards(false);

      setPageLoading(false);
    });
  }, [user.id]);

  const handleCreditCardChange = useCallback(form => {
    if (form.valid) {
      setValid(true);
      const { name, number, expiry, cvc } = form.values;

      const splitExpiry = String(expiry).split('/');

      const formattedDate = `${splitExpiry[0]}/${splitExpiry[1]}`;

      const newCardData: CardProps = {
        cardName: name,
        cardNumber: number,
        cardExpiry: formattedDate,
        cardCvc: cvc,
      };
      setCardData(newCardData);
    } else {
      setValid(false);
    }
  }, []);

  const handleSaveCreditCard = useCallback(
    (data: CardProps, id_transaction: string, payment_profile: string) => {
      const finalDigits = data.cardNumber.substring(
        data.cardNumber.length - 4,
        data.cardNumber.length,
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
                    navigation.navigate('MonthlyCreated', {
                      id_transaction: String(id_transaction),
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
                    api
                      .post('/creditCards/create', createCardData)
                      .then(response => {
                        navigation.navigate('MonthlyCreated', {
                          id_transaction: String(id_transaction),
                        });
                      });
                  },
                },
              ],
              { cancelable: false },
            );
          } else {
            navigation.navigate('MonthlyCreated', {
              id_transaction: String(id_transaction),
            });
          }
        });
    },
    [user.id, navigation],
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
          monthly.final_price,
          ids(env.environment).monthly,
          newData,
          payment_profile,
        );

        if (response.paid) {
          const savedCard = savedCards.filter(
            item => item.token === payment_profile,
          )[0];

          setPaymentData(
            user.id,
            savedCard.flag,
            savedCard.final_digits,
            savedCard.token,
          );
          navigation.navigate('MonthlyCreated', {
            id_transaction: response.id_transaction,
          });
        }
      } catch (error) {
        WToast.show(generalErrorToastOpts);
        setLoading(false);
      }
    },
    [
      user,
      navigation,
      generalErrorToastOpts,
      monthly,
      savedCards,
      setPaymentData,
    ],
  );

  const handleFinish = useCallback(async () => {
    setLoading(true);
    if (env.byPass) {
      navigation.navigate('MonthlyCreated', {
        id_transaction: '',
      });
    }

    try {
      const response = await PayCreditCard(
        user,
        monthly.final_price,
        ids(env.environment).monthly,
        cardData,
        '',
      );
      if (response.paid) {
        user.customer_id = response.customer_id;
        updateUser(user);
        setPaymentData(
          user.id,
          response.flag,
          cardData.cardNumber.substring(cardData.cardNumber.length, 4),
          response.payment_profile,
        );
        handleSaveCreditCard(
          cardData,
          String(response.id_transaction),
          response.payment_profile,
        );
      }
    } catch (error) {
      WToast.show(generalErrorToastOpts);
      setLoading(false);
    }
  }, [
    monthly,
    cardData,
    generalErrorToastOpts,
    user,
    navigation,
    updateUser,
    handleSaveCreditCard,
    setPaymentData,
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
            <Content
              onTouchStart={() => Keyboard.dismiss()}
              showsVerticalScrollIndicator={false}
            >
              <UseExistingCardView visible={hasSavedCards}>
                <UseExistingCardButton onPress={() => setModalOpened(true)}>
                  <Icon name="save" size={25} color="#fff" />
                  <UseExistingCardText>Usar cartão salvo</UseExistingCardText>
                </UseExistingCardButton>
              </UseExistingCardView>
              <CreditCardContainer>
                <CreditCardTitle>Informe seu cartão de crédito</CreditCardTitle>
                <CreditCardInput
                  requiresName
                  labels={{
                    name: 'Nome (como está no cartão)',
                    number: 'Número do Cartão',
                    expiry: 'Expira em',
                    cvc: 'CVC',
                  }}
                  placeholders={{
                    name: 'Nome',
                    number: '1234 5678 1234 5678',
                    expiry: 'MM/YY',
                    cvc: 'CVC',
                  }}
                  inputStyle={{ color: '#fff' }}
                  inputContainerStyle={{
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                  }}
                  placeholderColor="#999"
                  labelStyle={{ color: '#fff' }}
                  onChange={form => handleCreditCardChange(form)}
                />
              </CreditCardContainer>
            </Content>
            <FinishButton
              enabled={(valid && !loading) || env.byPass}
              onPress={() => handleFinish()}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <FinishButtonText>Finalizar</FinishButtonText>
              )}
            </FinishButton>
          </>
        )}
      </Container>
      <Modal isVisible={modalOpened}>
        <ModalView>
          <ModalHeader>
            <ModalHeaderTitle>Meus cartões</ModalHeaderTitle>
            <ModalHeaderButton onPress={() => setModalOpened(false)}>
              <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
            </ModalHeaderButton>
          </ModalHeader>
          <ModalSavedCardsList
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
    </LinearGradient>
  );
};
export default CreditCardPayment;
