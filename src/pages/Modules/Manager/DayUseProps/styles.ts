import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { DayUseProps } from './index';

interface DayUseProps {
  available: number;
}

export const Container = styled.View`
  flex: 1;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(18)};
  color: #fff;
`;

export const AddButton = styled.TouchableOpacity``;

export const Content = styled.View``;

export const DayUseList = styled(FlatList as new () => FlatList<DayUseProps>)``;

export const DayUseContainer = styled.TouchableOpacity<DayUseProps>`
  align-self: center;
  flex-direction: row;
  width: 80%;
  background: rgba(255, 255, 255, 0.3);
  margin-top: ${RFValue(20)};
  height: ${RFValue(60)};
  border-radius: ${RFValue(10)};
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  border-width: 0.3px;
  border-color: #fff;
`;

export const DateHourContent = styled.View``;

export const DateText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(14)};
`;

export const HourText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  margin-top: 5px;
`;
