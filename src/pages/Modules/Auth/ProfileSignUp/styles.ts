import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '@app/Config/Colors';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  margin-top: ${RFValue(40)};
  width: 90%;
  align-self: center;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const BackButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: ${RFValue(30)};
  width: ${RFValue(30)};
`;

export const RaquetImage = styled.Image`
  width: 40px;
  height: 40px;
`;

export const Content = styled.View`
  flex: 1;
  width: 90%;
  margin-top: ${RFValue(20)};
  align-self: center;
`;

export const CreateAccountLabel = styled.Text`
  color: ${Colors.primary};
  font-size: ${RFValue(20)};
  margin-bottom: ${RFValue(20)};
`;

export const StateCityContainer = styled.View`
  z-index: 8;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const StateView = styled.View`
  height: ${RFValue(80)};
  justify-content: center;
  z-index: 3;
  border-width: 2px;
  border-radius: 20px;
`;

export const TermsPrivacyContainer = styled.View`
  flex-direction: row;
`;

export const ReadTermsText = styled.Text`
  color: #000;
  margin-left: ${RFValue(20)};
`;

export const TermsButton = styled.TouchableOpacity``;

export const TermsButtonText = styled.Text`
  color: #48b6d7;
  text-decoration: underline;
  text-decoration-color: #48b6d7;
`;

export const StateContainer = styled.View`
  width: 35%;
`;

export const CityContainer = styled.View`
  width: 60%;
`;

export const ZipCodeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ZipCodeView = styled.View`
  width: 75%;
`;

export const SeachZipCodeButton = styled.TouchableOpacity`
  width: 13%;
  height: ${RFValue(43)};
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(40)};
  margin-bottom: 8px;
  background: ${Colors.primary};
`;
