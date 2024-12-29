import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { shade } from 'polished';
import DayOfWeek from '../../../../../interfaces/DayOfWeek';
import Court from '../../../../../interfaces/Court';

interface ButtonProps {
  selected: boolean;
}

interface SaveButtonProps {
  disabled: boolean;
}

export const Container = styled.View`
  height: ${RFValue(360)};
  background: #fff;
  border-radius: ${RFValue(40)};
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  width: 80%;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(18)};
  color: #999;
`;

export const HeaderButton = styled.TouchableOpacity`
  height: ${RFValue(25)};
  width: ${RFValue(25)};
  align-items: center;
  justify-content: center;
  background: #c53030;
  border-radius: ${RFValue(14)};
`;

export const Content = styled.ScrollView`
  width: 80%;
`;

export const DayOfWeekList = styled(FlatList as new () => FlatList<DayOfWeek>)`
  margin-top: ${RFValue(10)};
`;

export const DayOfWeekContainer = styled.View`
  align-items: center;
  margin-right: ${RFValue(20)};
`;

export const DayOfWeekButton = styled.TouchableOpacity<ButtonProps>`
  height: ${RFValue(30)};
  width: ${RFValue(30)};
  background: ${props => (props.selected ? '#ccc' : 'transparent')};
  border-radius: ${RFValue(50)};
  border-width: 1px;
  border-color: #999;
  margin-top: ${RFValue(5)};
`;

export const DayOfWeekLabel = styled.Text`
  font-size: ${RFValue(10)};
  color: #999;
`;

export const SelectHourContainer = styled.View`
  justify-content: space-between;
`;

export const ItemTitle = styled.Text`
  color: #999;
  font-size: ${RFValue(14)};
  margin-top: ${RFValue(10)};
`;

export const CourtsContainer = styled.View``;

export const NoCourtsContainer = styled.View`
  align-items: center;
  margin-top: ${RFValue(30)};
  margin-bottom: ${RFValue(30)};
`;

export const NoCourtsText = styled.Text`
  color: #999;
  font-size: ${RFValue(12)};
  text-decoration: underline;
  text-decoration-color: #999;
`;

export const PriceContainer = styled.View``;

export const SaveButton = styled.TouchableOpacity<SaveButtonProps>`
  height: ${RFValue(30)};
  width: 100%;
  background: ${props => (props.disabled ? shade(0.4, '#273a9a') : '#273a9a')};
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(30)};
  margin-top: ${RFValue(20)};
  margin-bottom: ${RFValue(20)};
`;

export const SaveButtonText = styled.Text<SaveButtonProps>`
  color: ${props => (props.disabled ? shade(0.4, '#fff') : '#fff')};
  font-size: ${RFValue(14)};
`;

export const CourtsList = styled(FlatList as new () => FlatList<Court>)`
  width: 100%;
`;

export const CourtContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${RFValue(10)};
`;

export const CourtButton = styled.TouchableOpacity<ButtonProps>`
  height: ${RFValue(25)};
  width: ${RFValue(25)};
  border-width: 1px;
  border-color: #999;
  border-radius: ${RFValue(50)};
  background: ${props => (props.selected ? '#ccc' : 'transparent')};
`;

export const CourtName = styled.Text`
  margin-left: ${RFValue(10)};
  color: #999;
`;

export const LoadingContainer = styled.View`
  height: ${RFValue(80)};
  align-items: center;
  justify-content: center;
`;
