import React, { useCallback, useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import api from '@app/services/api';
import Colors from '@app/Config/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Header,
  BackButton,
  ItemContainer,
  ItemDescription,
  ItemTitle,
  UserPhoto,
  ButtonsContainer,
  ActionButton,
} from './styles';

interface RouteParams {
  id: string;
}

interface User {
  name: string;
  email: string;
  avatar: string;
  ssn: string;
  cellphone: string;
  street: string;
  number: string;
  district: string;
  complement: string;
  zipCode: string;
  city: string;
  state: string;
  vip: boolean;
}

const UserDetail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as RouteParams;

  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/users/findById?id_user=${id}`).then(response => {
      setUser(response.data);
      setLoading(false);
    });
  }, [id]);

  const handleOpenTelephone = useCallback((cellphone: string) => {
    const formattedCellphone = cellphone.replace('(', '').replace(')', '');
    if (Platform.OS === 'ios') {
      Linking.openURL(`telprompt:${formattedCellphone}`);
    } else {
      Linking.openURL(`tel:${formattedCellphone}`);
    }
  }, []);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={30} color={Colors.white} />
          </BackButton>
          <UserPhoto
            source={{
              uri: 'https://app-jardins.s3.amazonaws.com/avatar.jpeg',
            }}
          />
        </Header>
        <ItemContainer>
          <ItemTitle>Nome: </ItemTitle>
          <ItemDescription>{user.name}</ItemDescription>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>CPF: </ItemTitle>
          <ItemDescription>{user.ssn}</ItemDescription>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>E-mail: </ItemTitle>
          <ItemDescription>{user.email}</ItemDescription>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>Telefone: </ItemTitle>
          <ItemDescription>{user.cellphone}</ItemDescription>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>Endereço: </ItemTitle>
          <ItemDescription>{user.street}</ItemDescription>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>Número: </ItemTitle>
          <ItemDescription>{user.number}</ItemDescription>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>Complemento: </ItemTitle>
          <ItemDescription>{user.complement}</ItemDescription>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>Bairro: </ItemTitle>
          <ItemDescription>{user.district}</ItemDescription>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>CEP: </ItemTitle>
          <ItemDescription>{user.zipCode}</ItemDescription>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>Cidade: </ItemTitle>
          <ItemDescription>{user.city}</ItemDescription>
        </ItemContainer>
        <ItemContainer>
          <ItemTitle>Estado: </ItemTitle>
          <ItemDescription>{user.state}</ItemDescription>
        </ItemContainer>
        <ButtonsContainer>
          <ActionButton onPress={() => handleOpenTelephone(user.cellphone)}>
            <FeatherIcon name="phone" size={RFValue(25)} color="#fff" />
          </ActionButton>
          <ActionButton
            onPress={() =>
              Linking.openURL(
                `whatsapp://send?text=Olá!&phone=55${user.cellphone
                  .replace('(', '')
                  .replace(')', '')}`,
              )
            }
          >
            <FontAwesomeIcon name="whatsapp" size={RFValue(25)} color="#fff" />
          </ActionButton>
        </ButtonsContainer>
      </Container>
    </LinearGradient>
  );
};
export default UserDetail;
