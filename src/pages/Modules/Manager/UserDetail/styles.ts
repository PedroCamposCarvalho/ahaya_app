import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Colors from '@app/Config/Colors';

export const Container = styled.View`
  flex: 1;
  padding-left: ${RFValue(16)};
  padding-right: ${RFValue(16)};
`;

export const Header = styled.View`
  flex-direction: row;
  padding-top: ${getStatusBarHeight() + 24}px
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: ${RFValue(100)};
  position: absolute;
  left: 0;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 100%
  align-self:center;
`;

export const ItemTitle = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(16)};
  color: #fff;
`;

export const ItemDescription = styled.Text`
  font-family: 'Arial';
  margin-left: auto;
  font-size: ${RFValue(16)};
  color: #fff;
`;

export const UserPhoto = styled.Image`
  width: ${RFValue(130)};
  height: ${RFValue(130)};
  border-radius: 100px;
  margin-bottom: ${RFValue(20)};
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  width: 30%;
  align-self: center;
  margin-top: ${RFValue(20)};
  align-items: center;
  justify-content: space-between;
`;

export const ActionButton = styled.TouchableOpacity`
  background: ${Colors.creditCard};
  height: ${RFValue(40)};
  width: ${RFValue(40)};
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(15)};
`;
