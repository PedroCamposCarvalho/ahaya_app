import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { DayUseProps } from './index';

interface DayUseUserBackground {
  allTicketsRetrieved: boolean;
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

export const ScanButton = styled.TouchableOpacity``;

export const Content = styled.View`
  flex: 1;
  align-items: center;
`;

export const TableHeader = styled.View`
  width: 85%;
  flex-direction: row;
`;

export const TableUserNameTitle = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(16)};
  width: 43%;
`;

export const TableUserRacketTitle = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(16)};
  width: 25%;
`;

export const TableUserTicketsAmountTitle = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(16)};
  width: 25%;
`;

export const UsersList = styled(FlatList as new () => FlatList<DayUseProps>)`
  flex: 1;
  width: 100%;
`;

export const UserContainer = styled.View<DayUseUserBackground>`
  background: ${props => (props.allTicketsRetrieved ? 'green' : '#ff0033')};
  flex-direction: row;
  width: 90%;
  padding: ${RFValue(8)}px;
  height: ${RFValue(60)};
  margin-top: ${RFValue(20)};
  align-self: center;
  align-items: center;
  border-width: 0.5px;
  border-color: #fff;
  border-radius: ${RFValue(10)};
`;

export const UserName = styled.Text`
  width: 45%;
  color: #fff;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
`;

export const UserRackets = styled.Text`
  width: 25%;
  color: #fff;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
`;

export const UserTickets = styled.Text`
  width: 25%;
  color: #fff;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
`;

export const NoClientsFoundContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const NoClientsFoundText = styled.Text`
  color: #fff;
  font-size: ${RFValue(18)};
  font-family: 'Arial';
`;

export const TotalContainer = styled.View`
  margin-bottom: ${RFValue(30)};
`;

export const TotalText = styled.Text`
  color: #fff;
  font-size: ${RFValue(16)};
  font-family: 'Arial';
`;
