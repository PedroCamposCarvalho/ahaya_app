import styled from 'styled-components/native';
import { lighten } from 'polished';
import { FlatList } from 'react-native';
import { shade } from 'polished';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  margin-bottom: 20px;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const TitleView = styled.View`
  width: 100%;
  align-items: center;
  position: relative;
`;

export const Title = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: 20px;
`;

export const LogOutButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  width: 90%;
  align-self: center;
  align-items: center;
  justify-content: space-around;
`;

export const ItemButton = styled.TouchableOpacity`
  width: ${RFValue(100)};
  height: ${RFValue(100)};
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  margin-top: 30px;
  align-items: center;
  border-radius: ${RFValue(10)};
`;

export const ItemText = styled.Text`
  color: #f4ede8;
  font-family: 'Arial';
  font-size: ${RFValue(13)};
  margin-top: ${RFValue(10)};
`;

export const BadgeAlert = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c53030;
  border-radius: 50px;
  width: 25px;
  height: 25px;
  position: absolute;
`;

export const BadgeAlertText = styled.Text`
  color: #fff;
`;

export const NewBadgeAlert = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c53030;
  border-radius: 50px;
  width: 50px;
  height: 25px;
  margin-left: 30%;
`;
