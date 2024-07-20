import React, { useEffect, useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../../../../services/api';
import {
  Container,
  LoadingContainer,
  Header,
  HeaderBackButton,
  TitleView,
  Title,
  Content,
  DescriptionText,
  RulesList,
  RuleContainer,
  RuleNumber,
  RuleDescription,
  ContinueButton,
  ContinueButtonText,
} from './styles';

export interface RulesProps {
  order: number;
  description: string;
}

const Rules: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [rules, setRules] = useState<RulesProps[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    api.get('/club/findAllRules').then(response => {
      setRules(response.data);
      setLoading(false);
    });
  }, []);

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
              <Title>Regras</Title>
            </TitleView>
          </Header>
          <Content>
            <DescriptionText>
              No clubinho você poderá jogar em 2 quadras exclusivas, quando
              quiser, sem pagar a mais. Confira nossas regras:
            </DescriptionText>
            <RulesList
              data={rules}
              keyExtractor={rule => String(rule.order)}
              renderItem={({ item: rule }) => (
                <RuleContainer>
                  <RuleNumber>{rule.order}. </RuleNumber>
                  <RuleDescription>{rule.description}</RuleDescription>
                </RuleContainer>
              )}
            />
          </Content>
        </>
      )}
      <ContinueButton onPress={() => navigation.navigate('Plans')}>
        <ContinueButtonText>Estou de acordo</ContinueButtonText>
      </ContinueButton>
    </Container>
  );
};

export default Rules;
