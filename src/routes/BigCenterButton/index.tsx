import React from 'react';
import { Image, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import logoImg from '../../assets/logo.png';
import { Container, InnerContainer, HiddenBox } from './styles';

interface PageProps {
  focused: boolean;
}

const BigCenterButton: React.FC<PageProps> = ({ focused }) => (
  <Container>
    <HiddenBox />
    <InnerContainer
      style={{
        shadowColor: 'rgba(255,255,255,0.4)',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 2.25,
        shadowRadius: 7.84,
        elevation: Platform.OS === 'ios' ? 25 : 0,
      }}
    >
      {Platform.OS === 'ios' ? (
        <Image
          source={{
            uri: 'https://app-ahaya.s3.amazonaws.com/logowhite.png',
          }}
          style={{
            width: RFValue(45),
            height: RFValue(45),
            resizeMode: 'contain',
          }}
        />
      ) : (
        <FastImage
          source={logoImg}
          style={{
            width: RFValue(45),
            height: RFValue(45),
          }}
        />
      )}
    </InnerContainer>
  </Container>
);

export default BigCenterButton;
