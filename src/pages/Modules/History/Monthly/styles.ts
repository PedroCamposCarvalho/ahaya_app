import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import MonthlyProps from '../../../../interfaces/Monthly';

export const Container = styled.View`
  flex: 1;
`;
export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const NoMonthlyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NoMonthlyText = styled.Text`
  color: #fff;
  font-size: ${RFValue(14)};
  text-decoration: underline;
  text-decoration-color: #fff;
`;

export const MonthlyList = styled(FlatList as new () => FlatList<MonthlyProps>)`
  flex: 1;
`;

export const MonthlyContainer = styled.View`
  background: rgba(255, 255, 255, 0.3);
  margin-top: ${RFValue(20)};
  width: 80%;
  align-self: center;
  border-radius: ${RFValue(10)};
  flex-direction: row;
  padding: ${RFValue(8)}px;
  justify-content: space-between;
`;

export const MonthlyDetails = styled.View``;

export const MonthlyHour = styled.Text`
  color: #fff;
  font-size: ${RFValue(14)};
`;

export const MonthlyCourt = styled.Text`
  color: #fff;
  font-size: ${RFValue(14)};
`;

export const MonthlyDayOfWeek = styled.Text`
  color: #fff;
  font-size: ${RFValue(14)};
`;

export const MonthlyPaidContainer = styled.View`
  color: #fff;
  font-size: ${RFValue(14)};
`;

export const MonthlyRenewDateLabel = styled.Text`
  color: #fff;
  font-size: ${RFValue(14)};
`;

export const MonthlyRenewDate = styled.Text`
  color: #fff;
  font-size: ${RFValue(14)};
  margin-left: auto;
`;
export const PullToRefreshView = styled.View``;

export const PullToRefreshText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  align-self: center;
  margin-bottom: ${RFValue(30)};
  position: absolute;
  bottom: 0;
`;
