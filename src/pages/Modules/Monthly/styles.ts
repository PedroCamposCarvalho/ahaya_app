import styled from 'styled-components/native';
import { shade } from 'polished';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { WeekDays, HoursProps } from './index';

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const Header = styled.View`
  flex-direction: row;
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  height: ${RFValue(32)};
  width: ${RFValue(32)};
  border-radius: ${RFValue(8)};
  align-items: center;
  justify-content: center;
`;
export const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: 'Arial';
  align-self: center;
`;

export const CartButton = styled.TouchableOpacity`
  height: ${RFValue(32)};
  width: ${RFValue(32)};
  border-radius: ${RFValue(8)};
  background: #fff;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
`;

export const ContentTitle = styled.Text`
  color: #fff;
  font-size: 14px;
  font-family: 'Arial';
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const WeekList = styled(FlatList as new () => FlatList<WeekDays>)`
  width: 80%;
`;

export const WeekHeaderContainer = styled.View`
  background: rgba(255, 255, 255, 0.3);
  height: ${RFValue(40)};
  margin-top: ${RFValue(10)};
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(10)};
`;

export const WeekHeaderTitle = styled.Text`
  color: #fff;
`;

export const HourList = styled(FlatList as new () => FlatList<HoursProps>)`
  height: 100%;
  width: 100%;
`;

export const ItemContent = styled.TouchableOpacity`
  background: #999;
  width: 102%;
  height: ${RFValue(40)};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: ${RFValue(10)};
  padding-right: ${RFValue(10)};
  margin-left: -${RFValue(8)};
  margin-bottom: ${RFValue(5)};
  border-radius: ${RFValue(10)};
`;

export const ItemText = styled.Text`
  color: #fff;
`;
export const ModalView = styled.View`
  height: ${RFValue(450)};
  background: #fff;
  border-radius: ${RFValue(40)};
  align-items: center;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  width: 80%;
  justify-content: space-between;
`;

export const ModalHeaderTitle = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(18)};
  color: #999;
`;

export const ModalHeaderButton = styled.TouchableOpacity`
  height: ${RFValue(25)};
  width: ${RFValue(25)};
  align-items: center;
  justify-content: center;
  background: #c53030;
  border-radius: ${RFValue(14)};
`;

export const CartEmpty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const CartEmptyText = styled.Text`
  color: #999;
  font-family: 'Arial';
  margin-top: 5px;
  font-size: ${RFValue(14)};
`;

export const ModalHourContainer = styled.View`
  flex-direction: row;
  width: 80%;
  align-self: center;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(20)};
`;

export const ModalHourText = styled.Text`
  font-size: ${RFValue(12)};
  color: #999;
`;

export const ModalRemoveHourButton = styled.TouchableOpacity``;

export const AppointmentInHourButton = styled.TouchableOpacity``;
