import React, { useCallback } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PinchZoomView from 'react-native-pinch-zoom-view';
import Icon from 'react-native-vector-icons/Feather';
import { Container, BackButton, ImageView } from './styles';

export interface CreditCards {
  id: string;
  final_digits: string;
  flag: string;
}

const PlaceMap: React.FC = () => {
  const navigation = useNavigation();
  const imageHeight = Dimensions.get('window').height * 0.35;
  const imageWidth = Dimensions.get('window').width;
  return (
    <>
      <Container>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#999" />
        </BackButton>
        <ImageView>
          <PinchZoomView>
            <Image
              source={{
                uri: 'https://app-ahaya.s3.amazonaws.com/planta_arena2.png',
              }}
              style={{
                height: imageHeight,
                width: imageWidth,
                resizeMode: 'contain',
              }}
            />
          </PinchZoomView>
        </ImageView>
      </Container>
    </>
  );
};
export default PlaceMap;
