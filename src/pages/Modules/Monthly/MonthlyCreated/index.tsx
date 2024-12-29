import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';
import { useMonthly } from '../../../../hooks/monthly';
import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
  Content,
} from './styles';

const MonthlyCreated: React.FC = () => {
  const { reset } = useNavigation();
  const navigation = useNavigation();

  const { user } = useAuth();
  const { monthly } = useMonthly();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    monthly.ids.map(id => {
      const data = {
        id_user: monthly.id_user,
        id_monthly: id,
        flag: monthly.flag,
        last_digits: monthly.last_digits,
        payment_profile: monthly.payment_profile,
      };
      api.post('/monthly/createMonthlyUser', data);
      return null;
    });
    setLoading(false);
  }, [monthly]);

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Monthly' }],
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
            <Icon name="check" size={RFValue(80)} color="#04d461" />
            <Title>Horário mensal adicionado!</Title>
            <Description>
              Você pode consultar seus horários no menu de histórico
            </Description>
            <OkButton onPress={() => handleOkPressed()}>
              <OkButtonText>Ok</OkButtonText>
            </OkButton>
          </Content>
        )}
      </Container>
    </LinearGradient>
  );
};

export default MonthlyCreated;
