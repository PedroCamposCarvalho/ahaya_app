import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  margin-top: 50%;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #32312f;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const BackButton = styled(RectButton)`
  margin-right: auto;
`;

export const HeaderTitle = styled.Text`
  color: #f5ede8;
  font-family: 'Arial';
  font-size: 20px;
  margin-right: auto;
`;

export const PageDescription = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Arial';
  text-align: center;
  margin-top: 20px;
`;

export const QRCodeImage = styled.Image`
  height: ${RFValue(166)};
  width: ${RFPercentage(25)};
  margin-top: 20px;
`;

export const KeyCodeContainer = styled.View`
  margin-top: 20px;
  width: 80%;
`;

export const KeyCodeTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Arial';
`;

export const KeyCode = styled.Text`
  color: #999;
  font-size: 14px;
  font-family: 'Arial';
  margin-top: 20px;
  padding-bottom: 40px;
`;
export const KeyCodeCopyButton = styled(RectButton)`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;

export const KeyCodeCopyText = styled.Text`
  color: #99d420;
  font-size: 16px;
  font-family: 'Arial';
  margin-left: 20px;
`;

export const ContinueButton = styled(RectButton)`
  align-self: center;
  margin-bottom: 5%;
  width: 90%;
  background: #99d420;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const ContinueButtonText = styled.Text`
  color: #32312f;
  font-family: 'Arial';
  font-size: 18px;
  margin-right: 10px;
`;
