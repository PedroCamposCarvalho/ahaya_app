import React from 'react';
import { Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Content,
  TitleView,
  TitleText,
  DescriptionContent,
  DescriptionText,
} from './styles';

const AppInMaintence: React.FC = () => {
  const imageHeight = Dimensions.get('window').height * 0.3;
  const imageWidth = Dimensions.get('window').width;

  return (
    <Container>
      <Content>
        <Image
          source={{
            uri: 'https://app-ahaya.s3.amazonaws.com/ahaya_logo.png',
          }}
          style={{
            height: imageHeight,
            width: imageWidth,
            resizeMode: 'contain',
            marginTop: '10%',
          }}
        />
        <TitleView>
          <Icon name="tool" color="#f1eae8" size={30} />
          <TitleText>Jajá vamos estar online!</TitleText>
        </TitleView>
        <DescriptionContent>
          <DescriptionText>
            Nosso espaço está finalizando as obras
          </DescriptionText>
        </DescriptionContent>
      </Content>
    </Container>
  );
};

export default AppInMaintence;
