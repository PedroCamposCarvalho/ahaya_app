import styled from 'styled-components/native';
import { shade } from 'polished';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: 'Arial';
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
