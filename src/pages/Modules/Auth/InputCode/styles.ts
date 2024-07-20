import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import NextTextInput from 'react-native-next-input';
import Colors from '@app/Config/Colors';

export interface Props {
  resendCode: boolean;
}
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #fff;
`;
export const SMSSentTitle = styled.Text`
  color: #999;
  font-size: ${RFValue(30)};
  font-family: 'Arial';
`;

export const SMSSentText = styled.Text`
  color: #999;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  margin-top: 10px;
`;

export const BoxResendCode = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  margin-top: 10px;
`;
export const BoxCode = styled(NextTextInput)`
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  margin-top: 80px;
`;
export const InputCode = styled.TextInput`
  text-align: center;
  width: 48px;
  height: 92px;
  margin: 0px 5px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  font-size: ${RFValue(55)};
`;
export const ResendCode = styled.Text`
  color: ${(p: Props) => (p.resendCode ? '#808080' : '#999')};
  /* color: #9999; */
  /* font-size: ${RFValue(14)}; */
  font-family: 'Arial';
  margin-top: ${RFValue(20)}px;
  margin-left: 10px;
  text-decoration: underline;
  text-decoration-color: #999;
`;
export const Clear = styled.Text`
  font-family: 'Arial';
  margin-top: 10px;
  margin-left: 10px;
  color: #999;
  text-decoration: underline;
  text-decoration-color: #999;
`;

export const LoadingContainer = styled.View`
  background: rgba(0, 0, 0, 0.6);
  align-self: center;
  position: absolute;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
