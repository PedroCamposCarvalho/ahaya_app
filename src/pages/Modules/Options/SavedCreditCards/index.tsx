import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Swipeout from 'react-native-swipeout';
import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';
import ImageCardFlag from '../../../../components/ImageCardFlag';
import {
  Container,
  BackButton,
  Title,
  CreditCardList,
  CreditCardContainer,
  DigitsText,
  SlideToDeleteText,
} from './styles';

export interface CreditCards {
  id: string;
  final_digits: string;
  flag: string;
}

const SavedCreditCards: React.FC = () => {
  const navigation = useNavigation();

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [creditCards, setCreditCards] = useState<CreditCards[]>([]);

  useEffect(() => {
    async function getCreditCards(): Promise<void> {
      const response = await api.get(
        `/creditCards/findByUser?id_user=${user.id}`,
      );
      setCreditCards(response.data);
    }
    getCreditCards();
  }, [user.id]);

  const handleDeleteCard = useCallback(async () => {
    await api.delete(`/creditCards/deleteCard?id_card=${selectedId}`);

    api.get(`/creditCards/findByUser?id_user=${user.id}`).then(response => {
      setCreditCards(response.data);
    });
  }, [selectedId, user.id]);

  const swipeoutBtns = [
    {
      text: 'Deletar',
      backgroundColor: '#c53030',
      onPress: () => {
        handleDeleteCard();
      },
    },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <BackButton onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={24} color="#999" />
          </BackButton>
          <View>
            <SlideToDeleteText>
              Arraste para a esquerda para deletar
            </SlideToDeleteText>
          </View>
        </Container>
        <CreditCardList
          data={creditCards}
          keyExtractor={card => card.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: card }) => (
            <Swipeout
              autoClose
              onOpen={() => setSelectedId(card.id)}
              right={swipeoutBtns}
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                marginBottom: 20,
                borderRadius: 5,
              }}
            >
              <CreditCardContainer>
                <ImageCardFlag flag={card.flag} />
                <DigitsText>**** **** **** {card.final_digits}</DigitsText>
              </CreditCardContainer>
            </Swipeout>
          )}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default SavedCreditCards;
