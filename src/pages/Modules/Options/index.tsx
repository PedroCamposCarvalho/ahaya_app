import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '@app/hooks/auth';
import api from '@app/services/api';
import {
  Container,
  Header,
  TitleView,
  Title,
  LogOutButton,
  Content,
  ItemContainer,
  ItemButton,
  ItemText,
} from './styles';

const Options: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    api.get(`/users/isUserAdmin?id_user=${user.id}`).then(response => {
      if (String(response.data) === 'true') {
        setIsUserAdmin(true);
      }
    });
  }, [user]);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <TitleView>
            <Title>Opções</Title>
          </TitleView>
          <LogOutButton onPress={() => signOut()}>
            <Icon name="log-out" color="#fff" size={RFValue(20)} />
          </LogOutButton>
        </Header>
        <Content>
          <ItemContainer>
            <ItemButton
              onPress={() => navigation.navigate('Profile')}
              testID="profileButton"
            >
              <Icon name="user" color="#f4ede8" size={RFValue(24)} />
              <ItemText>Meu perfil</ItemText>
            </ItemButton>
            <ItemButton onPress={() => navigation.navigate('PlaceMap')}>
              <Icon name="map" color="#f4ede8" size={RFValue(24)} />
              <ItemText>Mapa do local</ItemText>
            </ItemButton>
          </ItemContainer>
          <ItemContainer>
            <ItemButton onPress={() => navigation.navigate('Store')}>
              <Icon name="package" color="#f4ede8" size={RFValue(24)} />
              <ItemText>Lojinha</ItemText>
            </ItemButton>
            <ItemButton onPress={() => navigation.navigate('Prices')}>
              <Icon name="dollar-sign" color="#f4ede8" size={RFValue(24)} />
              <ItemText>Preços</ItemText>
            </ItemButton>
          </ItemContainer>
          <ItemContainer>
            <ItemButton onPress={() => navigation.navigate('TalkToUs')}>
              <Icon name="headphones" color="#f4ede8" size={RFValue(24)} />
              <ItemText>Fale conosco</ItemText>
            </ItemButton>
            <ItemButton onPress={() => navigation.navigate('TermsConditions')}>
              <Icon name="align-center" color="#f4ede8" size={RFValue(24)} />
              <ItemText>Termos e condições</ItemText>
            </ItemButton>
          </ItemContainer>
          {isUserAdmin && (
            <ItemContainer>
              <ItemButton onPress={() => navigation.navigate('AdminRoutes')}>
                <Icon name="home" color="#f4ede8" size={RFValue(24)} />
                <ItemText>Administrador</ItemText>
              </ItemButton>
            </ItemContainer>
          )}
        </Content>
      </Container>
    </LinearGradient>
  );
};

export default Options;
