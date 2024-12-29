import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ScrollContent = styled.ScrollView``;

export const Content = styled.View`
  align-items: center;
  margin-top: 20%;
`;

export const QRCodeTitle = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(16)};
`;

export const QRCodeImage = styled.Image`
  width: ${RFValue(210)};
  height: ${RFValue(200)};
  margin-top: 20px;
`;

export const OrText = styled.Text`
  margin-top: 20px;
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(16)};
`;

export const KeyCodeView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 32%;
  margin-top: 10%;
`;

export const KeyCodeText = styled.Text`
  color: #fff;
  font-size: ${RFValue(13)};
  text-decoration: underline;
  text-decoration-color: #fff;
`;

export const KeyCodeButton = styled.TouchableOpacity``;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  width: 60%;
  align-items: center;
  justify-content: space-between;
  margin-top: 20%;
`;

export const BackButton = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

export const BackButtonText = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(13)};
  margin-left: 5px;
`;

export const ContinueButton = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  background: #4bb543;
  padding: 8px;
  border-radius: 50px;
`;

export const ContinueButtonText = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(13)};
  margin-right: 5px;
`;
