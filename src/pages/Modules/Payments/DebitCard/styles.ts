import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const DescriptionText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  margin-bottom: 10px;
`;

export const Content = styled.View`
  align-items: center;
  width: 100%;

  justify-content: center;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  width: 80%;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
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
  border-radius: 5px;
`;

export const ContinueButtonText = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(13)};
`;

export const LoadingContainer = styled.View`
  width: 100%;
`;

export const PaymentSuccessContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

export const PaymentDescription = styled.Text`
  color: #fff;
  font-family: 'Arial';
  width: 80%;
  text-align: center;
  font-size: ${RFValue(14)};
`;

export const LinkButton = styled.TouchableOpacity``;

export const LinkButtonText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  width: 80%;
  font-size: ${RFValue(14)};
  text-decoration: underline;
  text-decoration-color: #fff;
`;

export const FinishButton = styled.TouchableOpacity`
  background: #4bb543;
  padding: 16px;
  border-radius: 5px;
`;

export const FinishButtonText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(14)};
`;
