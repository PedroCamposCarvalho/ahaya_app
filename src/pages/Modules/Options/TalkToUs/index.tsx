import React, { useCallback } from 'react';
import { Linking, Platform } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Container,
  Header,
  BackButton,
  TitleView,
  Content,
  ItemView,
  ItemButton,
  Title,
  Footer,
  AddressText,
  ComplementText,
} from './styles';

const TalkToUs: React.FC = () => {
  const navigation = useNavigation();

  const handleOpenWhatsApp = useCallback(() => {
    //Linking.openURL('whatsapp://send?text=Olá&phone=5511941609562');
  }, []);

  const handleOpenInstagram = useCallback(() => {
    Linking.openURL('instagram://user?username=ahaya.arena');
  }, []);

  const handleOpenFacebook = useCallback(() => {
    Linking.openURL(
      'https://www.facebook.com/Ahaya-Beach-Sports-109054377995997',
    );
  }, []);

  const handleOpenTelephone = useCallback(() => {
    if (Platform.OS === 'ios') {
      Linking.openURL('telprompt:5511941609562');
    } else {
      Linking.openURL('tel:5511941609562');
    }
  }, []);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-down" color="#fff" size={RFValue(20)} />
          </BackButton>
          <TitleView>
            <Title>Fale Conosco</Title>
          </TitleView>
        </Header>
        <Content>
          <ItemView>
            <ItemButton onPress={() => handleOpenWhatsApp()}>
              <MaterialIcon
                name="whatsapp"
                color="#25d366"
                size={RFValue(40)}
              />
            </ItemButton>
            <ItemButton onPress={() => handleOpenInstagram()}>
              <MaterialIcon
                name="instagram"
                color="#dd2a7b"
                size={RFValue(40)}
              />
            </ItemButton>
          </ItemView>
          <ItemView>
            <ItemButton onPress={() => handleOpenFacebook()}>
              <MaterialIcon
                name="facebook"
                color="#4267B2"
                size={RFValue(40)}
              />
            </ItemButton>
          </ItemView>
        </Content>
        <Footer>
          <AddressText>Rua Vidal Ramos, 90</AddressText>
          <ComplementText>Budag - Rio do Sul/SC </ComplementText>
        </Footer>
      </Container>
    </LinearGradient>
  );
};

export default TalkToUs;
