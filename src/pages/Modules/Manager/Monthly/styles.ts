/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import styled from 'styled-components/native';
import { shade } from 'polished';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Monthly from '../../../../interfaces/MonthlyAdmin';
import Court from '../../../../interfaces/Court';
import DayOfWeek from '../../../../interfaces/DayOfWeek';

interface ButtonProps {
  selected: boolean;
}

interface HourContainer {
  hasUser: boolean;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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

export const AddButton = styled.TouchableOpacity`
  height: ${RFValue(32)};
  width: ${RFValue(32)};
  border-radius: ${RFValue(8)};
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  flex-direction: row;
  height: 70%;
`;

export const HoursList = styled(FlatList as new () => FlatList<Monthly>)`
  width: 70%;
`;

export const MonthlyContainer = styled.View<HourContainer>`
  width: 80%;
  height: ${RFValue(40)};
  align-self: center;
  background: ${props =>
    props.hasUser ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  flex-direction: row;
  border-radius: ${RFValue(5)};
  margin-top: ${RFValue(20)};
  align-items: center;
`;

export const MonthlyHour = styled.Text`
  margin-left: ${RFValue(5)};
  color: #fff;
`;

export const MonthlyUser = styled.Text`
  margin-left: ${RFValue(5)};
  color: #fff;
`;

export const NoHoursContainer = styled.View`
  width: 70%;
  align-items: center;
  justify-content: center;
`;

export const NoHoursText = styled.Text`
  color: #fff;
  text-decoration: underline;
  text-decoration-color: #fff;
  font-size: ${RFValue(14)};
`;

export const CourtsContent = styled.View`
  width: 20%;
  align-items: center;
`;

export const CourtsList = styled(FlatList as new () => FlatList<Court>)`
  margin-top: ${RFValue(80)};
`;

export const CourtContainer = styled.View`
  height: ${RFValue(80)};
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CourtButton = styled.TouchableOpacity<ButtonProps>`
  height: ${RFValue(30)};
  width: ${RFValue(30)};
  background: ${props => (props.selected ? '#fff' : 'transparent')};
  border-width: 1px;
  border-radius: ${RFValue(50)};
  border-color: #fff;
`;

export const CourtText = styled.Text`
  font-size: ${RFValue(12)};
  color: #fff;
  margin-top: ${RFValue(5)};
`;

export const ClearCourtSelectionButton = styled.TouchableOpacity``;

export const ClearCourtSelectionText = styled.Text`
  color: #fff;
  text-decoration: underline;
  text-decoration-color: #fff;
  font-size: ${RFValue(12)};
  margin-bottom: ${RFValue(30)};
`;

export const DayOfWeekList = styled(FlatList as new () => FlatList<DayOfWeek>)`
  margin-top: ${RFValue(10)};
  width: 90%;
`;

export const DayOfWeekContainer = styled.View`
  align-items: center;
  margin-right: ${RFValue(20)};
`;

export const DayOfWeekButton = styled.TouchableOpacity<ButtonProps>`
  height: ${RFValue(30)};
  width: ${RFValue(30)};
  background: ${props => (props.selected ? '#fff' : 'transparent')};
  border-radius: ${RFValue(50)};
  border-width: 1px;
  border-color: #fff;
  margin-top: ${RFValue(5)};
`;

export const DayOfWeekLabel = styled.Text`
  font-size: ${RFValue(10)};
  color: #fff;
`;
