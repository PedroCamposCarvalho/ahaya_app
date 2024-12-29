import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import CreditCardForm from 'react-native-credit-card-form-ui';
import { shade } from 'polished';
import { useAuth } from '../../../../../hooks/auth';
import { useStoreContext } from '../../../../../hooks/store';
import env from '../../../../../Config/Environment';
import api from '../../../../../services/api';
import { PayCreditCard } from '../../../../../utils/Payments/vindi_credit_card';
import { useDayUse } from '../../../../../hooks/dayuse';
import GetCardFlag from '../../../../../utils/Payments/get_card_flag';
import {
  Container,
  Header,
  BackButton,
  TitleView,
  HeaderTitle,
  CreditCardTitle,
  CreditCardContainer,
  Content,
  FinishButton,
  FinishButtonText,
  UseExistingCardView,
  UseExistingCardButton,
  UseExistingCardText,
} from './styles';

interface CardProps {
  cardName: string;
  cardNumber: string;
  cardCvc: string;
  cardExpiry: string;
}

const CreditCardPayment: React.FC = () => {
  const errorToastOpts = useMemo(
    () => ({
      data: 'Erro ao realizar pagamento!',
      textColor: '#fff',
      backgroundColor: '#c53030',
      duration: WToast.duration.LONG,
      position: WToast.position.TOP,
    }),
    [],
  );

  const generalErrorToastOpts = useMemo(
    () => ({
      data: 'Erro ao processar solicitação!',
      textColor: '#fff',
      backgroundColor: '#c53030',
      duration: WToast.duration.LONG,
      position: WToast.position.TOP,
    }),
    [],
  );

  const paymentSuccessToastOpts = useMemo(
    () => ({
      data: 'Pagamento Realizado com sucesso!',
      textColor: '#231f20',
      backgroundColor: '#99d420',
      duration: WToast.duration.LONG,
      position: WToast.position.TOP,
    }),
    [],
  );

  const cardCreatedOpts = useMemo(
    () => ({
      data: 'Cartão salvo com sucesso!',
      textColor: '#fff',
      backgroundColor: 'green',
      duration: WToast.duration.LONG,
      position: WToast.position.TOP,
    }),
    [],
  );

  const navigation = useNavigation();
  const { store } = useStoreContext();
  const creditCardRef = useRef() as any;
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [hasSavedCards, setHasSavedCards] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  const [cardData, setCardData] = useState<CardProps>({} as CardProps);

  useEffect(() => {
    let tempPrice = 0;
    store.map(item => {
      tempPrice += item.price;
      return null;
    });
    setFinalPrice(tempPrice);
  }, [store]);

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

  // const handleSaveCreditCard = useCallback(
  //   (data: CardProps, id_transaction: string) => {},
  //   [],
  // );

  const handleFinish = useCallback(async () => {
    if (env.byPass) {
      navigation.navigate('PurchaseCompleted', {
        id_transaction: '',
      });
    } else {
      setLoading(true);

      try {
        const response = await PayCreditCard(
          user,
          finalPrice,
          800566,
          cardData,
        );
        if (response.paid) {
          user.customer_id = response.customer_id;
          updateUser(user);
          api
            .get(
              `/creditCards/findByDigitsUser?id_user=${
                user.id
              }&final_digits=${cardData.cardNumber.slice(-4)}`,
            )
            .then(response2 => {
              if (!response2.data.id) {
                Alert.alert(
                  'Salvar cartão',
                  'Deseja salvar esse cartão para futuras compras?',
                  [
                    {
                      text: 'Não',
                      onPress: () => {
                        navigation.navigate('PurchaseCompleted', {
                          id_transaction: String(response.id_transaction),
                        });
                      },
                    },
                    {
                      text: 'Sim',
                      onPress: () => {
                        api
                          .post('/creditCards/create', {
                            id_user: user.id,
                            token: response.payment_profile,
                            final_digits: cardData.cardNumber.slice(-4),
                            flag: GetCardFlag(cardData.cardNumber),
                          })
                          .then(() => {
                            WToast.show(cardCreatedOpts);
                            navigation.navigate('PurchaseCompleted', {
                              id_transaction: String(response.id_transaction),
                            });
                          });
                      },
                    },
                  ],
                  { cancelable: false },
                );
              } else {
                navigation.navigate('PurchaseCompleted', {
                  id_transaction: String(response.id_transaction),
                });
              }
            });
        }
      } catch (error) {
        WToast.show(generalErrorToastOpts);
        setLoading(false);
      }
    }
  }, [
    cardData,
    generalErrorToastOpts,
    navigation,
    updateUser,
    user,
    cardCreatedOpts,
    finalPrice,
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

        <Content>
          <CreditCardForm
            ref={creditCardRef}
            expirationDateFormat="MM/YY"
            onValidStateChange={() => {}}
            background="#006edb"
            textColor="#fff"
            placeholders={{
              number: '0000 0000 0000 0000',
              holder: 'NOME',
              expiration: 'MM/YY',
              cvv: 'CVC',
            }}
            placeholderTextColor={shade(0.1, '#fff')}
          />

          <UseExistingCardView visible={hasSavedCards}>
            <UseExistingCardButton
              enabled={hasSavedCards}
              onPress={() => navigation.navigate('SavedCreditCardPayment')}
            >
              <UseExistingCardText>Usar cartão salvo</UseExistingCardText>
            </UseExistingCardButton>
          </UseExistingCardView>
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
      </Container>
    </LinearGradient>
  );
};
export default CreditCardPayment;
