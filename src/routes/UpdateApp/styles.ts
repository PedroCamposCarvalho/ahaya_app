import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  align-items: center;
`;

export const TitleView = styled.View`
  margin-top: 10%;
`;

export const TitleText = styled.Text`
  font-family: 'Arial';
  font-size: 22px;
  color: #000;
  margin-top: 10px;
`;

export const DescriptionContent = styled.View`
  width: 80%;
  margin-top: 10%;
`;

export const DescriptionText = styled.Text`
  font-family: 'Arial';
  font-size: 14px;
  color: #000;
  margin-top: 10px;
  text-align: center;
`;

export const GoToStoreButton = styled.TouchableOpacity`
  align-self: center;
  width: 70%;
  background: #006edb;
  margin: 10% 0;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const GoToStoreText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: 18px;
  margin-right: 10px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
