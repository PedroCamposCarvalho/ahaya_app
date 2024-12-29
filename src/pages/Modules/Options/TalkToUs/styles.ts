import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { shade, lighten } from 'polished';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
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

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ItemView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 60%;
  margin-bottom: 6%;
`;

export const ItemButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background: #fff;
  height: ${RFValue(80)};
  width: ${RFValue(80)};
  border-radius: 20px;
`;

export const ItemText = styled.Text`
  color: #999;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  margin-top: 5px;
`;

export const Footer = styled.View`
  padding: 8px;
  align-items: center;
  margin-bottom: ${RFValue(25)};
`;

export const AddressText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
`;

export const ComplementText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(10)};
`;
