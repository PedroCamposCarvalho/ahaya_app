import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px 30px 40px;
  margin-top: 7%;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  width: 70%;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 50%;
`;

export const BackButton = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(14)};
  color: #fff;
  margin-left: auto;
`;

export const Content = styled.View`
  margin-top: 20px;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const ItemTitle = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(16)};
  color: #99d420;
`;

export const ItemDescription = styled.Text`
  font-family: 'Arial';
  margin-left: auto;
  font-size: ${RFValue(14)};
  color: #fff;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: space-around;
  width: 50%;
  margin-top: 20%;
`;

export const OpenWhatsAppButton = styled.TouchableWithoutFeedback``;

export const OpenInstagramButton = styled.TouchableWithoutFeedback``;

export const OpenSpotifyButton = styled.TouchableWithoutFeedback``;
