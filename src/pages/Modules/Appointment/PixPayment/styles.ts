import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '@app/Config/Colors';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LoadingDescription = styled.Text`
  color: #fff;
  font-size: ${RFValue(16)};
  margin-top: ${RFValue(20)};
  width: 100%;
  text-align: center;
`;

export const Content = styled.View`
  align-items: center;
`;

export const PixImage = styled.Image`
  height: ${RFValue(200)};
  width: ${RFValue(200)};
  border-radius: ${RFValue(150)};
  overflow: hidden;
`;

export const Description = styled.Text`
  text-align: center;
  color: #fff;
  font-weigth: bold;
  font-size: ${RFValue(24)};
`;

export const SubDescription = styled.Text`
  text-align: center;
  color: #ccc;
  font-size: ${RFValue(16)};
  margin-top: ${RFValue(20)};
`;

export const CodeContainer = styled.View`
  margin-top: ${RFValue(20)};
  flex-direction: row;
  width: 80%;
  border-width: ${RFValue(1)};
  border-style: dashed;
  border-color:#fff;
  border-radius:${RFValue(10)}
  padding: ${RFValue(10)}px;
  align-items: center;
`;

export const CodeText = styled.Text`
  color: #fff;
  font-size: ${RFValue(16)};
`;

export const CopyToClipboardButton = styled.TouchableOpacity`
  margin-left: ${RFValue(5)};
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;
`;

export const CopyButton = styled.TouchableOpacity`
  margin-top: ${RFValue(40)};
  background: ${Colors.creditCard};
  width: 85%;
  height: ${RFValue(40)};
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(10)};
`;

export const CopyButtonText = styled.Text`
  color: #fff;
  font-size: ${RFValue(14)};
`;

export const TimeoutContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const TimeoutText = styled.Text`
  text-align: center;
  color: #fff;
  font-size: ${RFValue(18)};
  width: 90%;
`;

export const ReloadButton = styled.TouchableOpacity`
  background: ${Colors.creditCard};
  width: 80%;
  margin-top: ${RFValue(20)};
  align-items: center;
  justify-content: center;
  height: ${RFValue(40)};
  border-radius: ${RFValue(10)};
`;

export const ReloadButtonText = styled.Text`
  color: ${Colors.white};
  font-size: ${RFValue(18)};
`;

export const ErrorContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ErrorDescription = styled.Text`
  color: #fff;
  text-align: center;
  margin-top: ${RFValue(20)};
  margin-bottom: ${RFValue(20)};
`;

export const ErrorButton = styled.TouchableOpacity`
  height: ${RFValue(30)};
  width: 80%;
  background: ${Colors.creditCard};
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(10)};
`;

export const ErrorButtonText = styled.Text`
  color: #fff;
`;
