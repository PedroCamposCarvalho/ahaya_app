import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';
import { useDayUse } from '../../../../hooks/dayuse';
import {
  Container,
  Content,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  id_transaction: string;
}

const DayUseCreated: React.FC = () => {
  const route = useRoute();

  const { reset } = useNavigation();
  const navigation = useNavigation();

  const { user } = useAuth();
  const { dayUse } = useDayUse();

  const { id_transaction } = route.params as RouteParams;

  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const { id, material_amount, price, tickets } = dayUse;

    for (let i = 0; i < tickets; i++) {
      const data = {
        id_dayuse: id,
        id_user: user.id,
        paid: true,
        observation: `${user.name} - DayUse`,
        paid_price: price,
        id_transaction,
        material_amount,
      };
      api
        .post('/dayUse/createUser', data)
        .then(() => {
          setFailed(false);
          setLoading(false);
        })
        .catch(() => {
          setFailed(true);
          setLoading(false);
        });
    }
  }, [dayUse, id_transaction, user.id, user.name]);

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'DayUse' }],
      index: 0,
    });
  }, [reset]);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        {loading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Content>
            {failed ? (
              <>
                <Icon name="x" size={RFValue(80)} color="#c53030" />
                <Title>Erro processar solicitação</Title>
                <Description>
                  Tente novamente, caso o erro persista, entre em contato com a
                  gente
                </Description>
                <OkButton onPress={handleOkPressed}>
                  <OkButtonText>Ok</OkButtonText>
                </OkButton>
              </>
            ) : (
              <>
                <Icon name="check" size={RFValue(80)} color="#04d461" />
                <Title>Pagamento concluído</Title>
                <Description>
                  Você pode consultar seu ticket virtual no menu de histórico
                </Description>
                <OkButton onPress={() => handleOkPressed()}>
                  <OkButtonText>Ok</OkButtonText>
                </OkButton>
              </>
            )}
          </Content>
        )}
      </Container>
    </LinearGradient>
  );
};

export default DayUseCreated;
