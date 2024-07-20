import React, { useEffect, useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useStoreContext } from '../../../../../hooks/store';
import { useAuth } from '../../../../../hooks/auth';
import api from '../../../../../services/api';
import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  id_transaction: string;
}

const PurchaseCompleted: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const { store } = useStoreContext();
  const { user } = useAuth();
  const { reset } = useNavigation();
  const route = useRoute();

  const { id_transaction } = route.params as RouteParams;

  useEffect(() => {
    store.map(item => {
      const data = {
        id_product: item.id_product,
        amount: item.product_amount,
        price_paid: item.price,
        id_transaction,
        id_user: user.id,
        retrieved: false,
      };
      api.post('/store/createPurchase', data);
      return null;
    });
    setLoading(false);
  }, [store, id_transaction, user]);

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Options' }],
      index: 0,
    });
  }, [reset]);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        {loading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <>
            <FeatherIcon name="check" size={RFValue(80)} color="#fff" />
            <Title>Pagamento efetuado!</Title>
            <Description>
              Você pode consultar suas compras no menu de histórico
            </Description>
            <OkButton onPress={() => handleOkPressed()}>
              <OkButtonText>Ok</OkButtonText>
            </OkButton>
          </>
        )}
      </Container>
    </LinearGradient>
  );
};

export default PurchaseCompleted;
