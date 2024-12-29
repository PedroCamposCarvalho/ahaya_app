import React from 'react';
import { Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo_name from '@app/assets/logo_name.png';
import {
  Container,
  ButtonsContainer,
  ButtonContent,
  ButtonText,
} from './styles';

const Auth: React.FC = () => {
  const navigation = useNavigation();
  const imageHeight = Dimensions.get('window').height * 0.5;
  const imageWidth = Dimensions.get('window').width;

  return (
    <Container testID="MainPage">
      <Image
        source={logo_name}
        style={{
          height: imageHeight,
          width: imageWidth,
          resizeMode: 'contain',
          marginTop: '10%',
        }}
      />
      <ButtonsContainer>
        <ButtonContent
          onPress={() => navigation.navigate('SignIn')}
          testID="logInButton"
        >
          <ButtonText>Já tenho cadastro</ButtonText>
        </ButtonContent>
        <ButtonContent
          onPress={() => navigation.navigate('ProfileSignUp')}
          testID="signUpButton"
        >
          <ButtonText>Sou novo aqui!</ButtonText>
        </ButtonContent>
      </ButtonsContainer>
    </Container>
  );
};

export default Auth;
