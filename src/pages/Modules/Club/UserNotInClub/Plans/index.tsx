import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../../../../services/api';
import {
  Container,
  Header,
  HeaderBackButton,
  TitleView,
  Title,
  LoadingContainer,
  Content,
  DescriptionText,
  PlansList,
  PlanContainer,
  PlanContent,
  PlanDuration,
  PlanValue,
  PlanContinueFakeButton,
} from './styles';

export interface PlansProps {
  id: string;
  months: number;
  price: number;
}

const Plans: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<PlansProps[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    api.get('/club/findAllPlans').then(response => {
      setPlans(response.data);
    });
  }, []);

  function formatPlanMonths(months: number): string {
    if (months === 1) {
      return 'Mensal';
    }
    if (months === 3) {
      return 'Trimestral';
    }
    if (months === 6) {
      return 'Semestral';
    }
    return 'Anual';
  }

  function formatPrice(price: number): string {
    return `R$ ${String(price).replace('.', ',')}`;
  }

  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator color="#fff" size="large" />
        </LoadingContainer>
      ) : (
        <>
          <Header>
            <HeaderBackButton onPress={() => navigation.goBack()}>
              <FeatherIcon
                name="chevron-left"
                color="#e00265"
                size={RFValue(30)}
              />
            </HeaderBackButton>
            <TitleView>
              <Title>Planos</Title>
            </TitleView>
          </Header>
          <Content>
            <DescriptionText>Selecione seu plano:</DescriptionText>
          </Content>
          <PlansList
            data={plans}
            keyExtractor={plan => plan.id}
            renderItem={({ item: plan }) => (
              <PlanContainer
                onPress={() =>
                  navigation.navigate('CreditCard', { id_plan: plan.id })
                }
              >
                <PlanContent>
                  <PlanDuration>{formatPlanMonths(plan.months)}</PlanDuration>
                  <PlanValue>{formatPrice(plan.price)}</PlanValue>
                </PlanContent>
                <PlanContinueFakeButton>
                  <FeatherIcon
                    name="arrow-right"
                    color="#fff"
                    size={RFValue(20)}
                  />
                </PlanContinueFakeButton>
              </PlanContainer>
            )}
          />
        </>
      )}
    </Container>
  );
};

export default Plans;
