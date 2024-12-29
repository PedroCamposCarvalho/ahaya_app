import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { shade, lighten } from 'polished';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-size: ${RFValue(18)};
  font-family: 'Arial';
`;

export const UserName = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(16)};
`;

export const UserProfilePicture = styled.Image`
  height: ${RFValue(50)};
  width: ${RFValue(50)};
  border-radius: 50px;
`;

export const NotificationButton = styled.TouchableOpacity``;

export const Badge = styled.View`
  height: 17px;
  width: 17px;
  border-radius: 20px;
  background: red;
  position: absolute;
  margin-left: 20px;
  margin-top: -5px;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const BadgeText = styled.Text`
  color: #fff;
  font-size: 10px;
`;
export const PageDescription = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(16)};
  align-self: center;
`;

export const SportContainer = styled.TouchableOpacity`
  width: ${RFValue(135)};
  border-radius: ${RFValue(45)};
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(20)};
  margin-left: auto;
  margin-right: auto;
`;

export const SportImage = styled.Image`
  height: ${RFValue(100)};
  width: ${RFValue(100)};
  border-radius: ${RFValue(60)};
`;
export const SportDescription = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(12)};
  margin-top: ${RFValue(5)};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const PoweredByImage = styled.Image`
  height: ${RFValue(80)};
  width: ${RFValue(80)};
  align-self: center;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const SportsContainer = styled.View`
  flex: 1;
  align-items: center;
`;
