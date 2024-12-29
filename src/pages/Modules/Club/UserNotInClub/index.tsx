import React from 'react';
import { View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Header,
  Title,
  Content,
  DescriptionText,
  PlayingImage,
  JoinButton,
  JoinButtonText,
} from './styles';

const UserNotInClub: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Header>
        <Title>Clubinho</Title>
      </Header>
      <Content>
        <DescriptionText>
          Acesso exclusivo à quadras! Jogue o quanto quiser sem pagar a mais!
        </DescriptionText>
        <PlayingImage
          source={{
            uri: 'https://app-haka.s3.amazonaws.com/main_person.png',
          }}
          style={{ resizeMode: 'contain' }}
        />
        <JoinButton onPress={() => navigation.navigate('Rules')}>
          <JoinButtonText>Quero fazer parte!</JoinButtonText>
        </JoinButton>
      </Content>
    </Container>
  );
};

export default UserNotInClub;
