/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { DayUseProps } from './index';

interface AvailableHourProps {
  available: boolean;
}

interface SpecialDayUseProps {
  special: boolean;
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24};

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: ${RFValue(18)};
  font-family: 'Arial';
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ContentTitle = styled.Text`
  color: #006edb;
  font-size: ${RFValue(18)};
  font-family: 'Arial';
  align-self: center;
  margin-top: ${RFValue(20)};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NoListAvailable = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NoListText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(22)};
`;

export const OtherDayUseList = styled(
  FlatList as new () => FlatList<DayUseProps>,
)`
  padding: 0 24px;
`;

export const OtherDayUseContent = styled.TouchableOpacity<SpecialDayUseProps>`
  flex-direction: row;
  width: 100%;
  background: ${props =>
    props.special ? 'transparent' : 'rgba(255,255,255,0.2)'};
  margin-top: ${RFValue(20)};
  height: ${props => (props.special ? RFValue(200) : RFValue(60))};
  border-radius: ${RFValue(10)};
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  border-width: ${props => (props.special ? 0 : 0.3)};
  border-color: #fff;
`;

export const OtherDateHourContent = styled.View``;

export const OtherDateText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(14)};
`;

export const OtherHourText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  margin-top: 5px;
`;

export const OtherDayUseTitle = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(18)};
  width: 100%;
`;

export const ReloadButton = styled.TouchableOpacity`
  background: #fff;
  height: ${RFValue(40)};
  width: ${RFValue(150)};
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(10)};
  margin-top: ${RFValue(20)};
`;

export const ReloadButtonText = styled.Text`
  color: #006edb;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
`;
