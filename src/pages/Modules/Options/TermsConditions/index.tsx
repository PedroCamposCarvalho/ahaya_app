import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import api from '@app/services/api';

import {
  Container,
  LoadingContainer,
  BackButton,
  Header,
  TitleView,
  Title,
  Content,
  TermsText,
} from './styles';

export interface Sports {
  id: string;
  name: string;
  regular: number;
}

export interface Materials {
  id: string;
  material: string;
  price: number;
  sport_name: string;
}

const TermsConditions: React.FC = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [terms, setTerms] = useState<string>('');

  useEffect(() => {
    api.get('/terms/find').then(response => {
      setTerms(response.data.terms);
      setLoading(false);
    });
  }, []);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-down" color="#fff" size={RFValue(20)} />
          </BackButton>
          <TitleView>
            <Title>Termos e Condições</Title>
          </TitleView>
        </Header>
        <Content showsVerticalScrollIndicator={false}>
          {loading ? (
            <LoadingContainer>
              <ActivityIndicator color="#fff" size="large" />
            </LoadingContainer>
          ) : (
            <TermsText>{terms}</TermsText>
          )}
        </Content>
      </Container>
    </LinearGradient>
  );
};

export default TermsConditions;
