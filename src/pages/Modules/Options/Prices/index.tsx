import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';
import api from '@app/services/api';
import {
  Container,
  BackButton,
  TitleContainer,
  Title,
  Content,
  ItemContainer,
  ItemTitle,
  ItemDescription,
  MaterialsContainer,
  MaterialsTitle,
  MaterialsItem,
  MaterialsDescription,
  MaterialSport,
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

const Prices: React.FC = () => {
  const navigation = useNavigation();

  const [sports, setSports] = useState<Sports[]>([]);
  const [materials, setMaterials] = useState<Materials[]>([]);

  useEffect(() => {
    api.get('/sports/findSportsForPricesPage').then(response => {
      setSports(response.data);
    });
    api.get('/materials/findAll').then(response => {
      setMaterials(response.data);
    });
  }, []);

  function numberToReal(value: number): string {
    const numero = value.toFixed(2).split('.');
    numero[0] = `R$ ${numero[0].split(/(?=(?:...)*$)/).join('.')}`;
    return String(numero.join(','));
  }

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <BackButton onPress={() => navigation.goBack()}>
              <Icon name="chevron-down" size={24} color="#fff" />
            </BackButton>
            <Content>
              <TitleContainer>
                <Title>Preços dos esportes (por hora)</Title>
              </TitleContainer>
              <ItemContainer>
                <ItemTitle>Areia (7h às 15h, de Segunda a Sexta):</ItemTitle>
                <ItemDescription>R$ 40,00</ItemDescription>
              </ItemContainer>
              <ItemContainer>
                <ItemTitle>Areia (15h às 18h, de Segunda a Sexta):</ItemTitle>
                <ItemDescription>R$ 60,00</ItemDescription>
              </ItemContainer>
              <ItemContainer>
                <ItemTitle>Areia (18h às 21h, de Segunda a Sexta):</ItemTitle>
                <ItemDescription>R$ 90,00</ItemDescription>
              </ItemContainer>
              <ItemContainer>
                <ItemTitle>Areia (Sábado):</ItemTitle>
                <ItemDescription>R$ 70,00</ItemDescription>
              </ItemContainer>

              <ItemContainer>
                <ItemTitle>Padel (7h às 15h, de Segunda a Sexta):</ItemTitle>
                <ItemDescription>R$ 75,00</ItemDescription>
              </ItemContainer>
              <ItemContainer>
                <ItemTitle>Padel (15h às 22h, de Segunda a Sexta):</ItemTitle>
                <ItemDescription>R$ 130,00</ItemDescription>
              </ItemContainer>
              <ItemContainer>
                <ItemTitle>Padel (Sábado):</ItemTitle>
                <ItemDescription>R$ 130,00</ItemDescription>
              </ItemContainer>
              <MaterialsContainer>
                <MaterialsTitle>Materiais: (por hora)</MaterialsTitle>
                <FlatList
                  data={materials}
                  keyExtractor={material => material.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item: material }) => (
                    <MaterialsItem>
                      <MaterialsDescription>
                        {`- ${material.material} (${numberToReal(
                          Number(material.price),
                        )})`}
                      </MaterialsDescription>
                      <MaterialSport>{material.sport_name}</MaterialSport>
                    </MaterialsItem>
                  )}
                />
              </MaterialsContainer>
            </Content>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Prices;
