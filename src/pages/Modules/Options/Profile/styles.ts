import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  padding-bottom: ${RFValue(40)};
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const TitleView = styled.View`
  width: 100%;
  align-items: center;
  position: relative;
`;

export const Title = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: 20px;
  margin-right: 50px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;

export const CameraButton = styled.TouchableOpacity`
  background: #fff;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-left: 100px;
  margin-top: -30px;
  border-radius: 35px;
`;

export const ProblemsContainer = styled.View`
  margin-left: 20px;
  margin-top: 20px;
`;

export const ProblemItem = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Arial';
`;

export const DeleteAccountButton = styled.TouchableOpacity`
  background: #ec4434;
  width: 90%;
  align-self: center;
  margin-top: -${RFValue(32)};
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(10)};
  height: ${RFValue(40)};
`;

export const DeleteAccountButtonText = styled.Text`
  color: #fff;
  font-size: ${RFValue(14)};
`;
