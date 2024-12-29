import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAuth } from '@app/hooks/auth';
import {
  Container,
  Header,
  HeaderTitle,
  Content,
  ItemText,
  ItemButton,
  ItemContainer,
} from './styles';

const Manager: React.FC = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <HeaderTitle>Administrador</HeaderTitle>
        </Header>
        <Content>
          <ItemContainer>
            <ItemButton onPress={() => navigation.navigate('Agenda')}>
              <Icon name="calendar" color="#f4ede8" size={RFValue(24)} />
              <ItemText>Agenda</ItemText>
            </ItemButton>
            <ItemButton onPress={() => navigation.navigate('DayUseProps')}>
              <Icon name="clock" color="#f4ede8" size={RFValue(24)} />
              <ItemText>Day Use</ItemText>
            </ItemButton>
          </ItemContainer>
          <ItemContainer>
            <ItemButton onPress={() => navigation.navigate('Store')}>
              <Icon name="package" color="#f4ede8" size={RFValue(24)} />
              <ItemText>Lojinha</ItemText>
            </ItemButton>
            <ItemButton onPress={() => navigation.navigate('Notifications')}>
              <Icon name="bell" color="#f4ede8" size={RFValue(24)} />
              <ItemText>Notificações</ItemText>
            </ItemButton>
          </ItemContainer>
          <ItemContainer>
            <ItemButton onPress={() => navigation.navigate('AllUsers')}>
              <Icon name="user" color="#f4ede8" size={RFValue(24)} />
              <ItemText>Clientes</ItemText>
            </ItemButton>
            <ItemButton onPress={() => navigation.navigate('StorePurchases')}>
              <Icon name="dollar-sign" color="#f4ede8" size={RFValue(24)} />
              <ItemText>Produtos Vendidos</ItemText>
            </ItemButton>
          </ItemContainer>
        </Content>
      </Container>
    </LinearGradient>
  );
};

export default Manager;
