import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import api from '../../../../../services/api';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  Header,
  HeaderTitle,
  HeaderButton,
  Content,
  RulesList,
  RuleContainer,
  RuleNumber,
  RuleDescription,
} from './styles';

export interface RulesProps {
  order: number;
  description: string;
}

interface PageProps {
  closeModal: () => void;
}

const RulesModal: React.FC<PageProps> = ({ closeModal }) => {
  const [loading, setLoading] = useState(true);
  const [rules, setRules] = useState<RulesProps[]>([]);

  useEffect(() => {
    api.get('/club/findAllRules').then(response => {
      setRules(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>Regras do Clubinho</HeaderTitle>
        <HeaderButton onPress={() => closeModal()}>
          <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
        </HeaderButton>
      </Header>
      <Content>
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
    </Container>
  );
};

export default RulesModal;
