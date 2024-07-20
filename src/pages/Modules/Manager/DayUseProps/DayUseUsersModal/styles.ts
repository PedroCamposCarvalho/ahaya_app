import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { UserProps } from './index';

export const Container = styled.View`
  height: 500px;
  background: #fff;
  border-radius: 50px;
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  width: 80%;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(18)};
  color: #999;
`;

export const CloseButton = styled.TouchableOpacity`
  height: ${RFValue(30)};
  width: ${RFValue(30)};
  align-items: center;
  justify-content: center;
  background: #c53030;
  border-radius: ${RFValue(50)};
`;
export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
  width: 80%;
  align-items: center;
  justify-content: center;
`;

export const NoUsersFoundText = styled.Text`
  color: #999;
`;

export const TableTitleContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-top: ${RFValue(10)};
`;

export const UserTitle = styled.Text`
  width: 65%;
  font-size: ${RFValue(14)};
  color: #999;
`;

export const MaterialsTitle = styled.Text`
  width: 20%;
  font-size: ${RFValue(14)};
  color: #999;
`;

export const TicketsTitle = styled.Text`
  width: 20%;
  font-size: ${RFValue(14)};
  color: #999;
`;

export const UsersList = styled(FlatList as new () => FlatList<UserProps>)`
  flex: 1;
  width: 100%;
`;

export const UserContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-top: ${RFValue(10)};
`;

export const UserName = styled.Text`
  width: 70%;
  font-size: ${RFValue(12)};
`;

export const MaterialsAmount = styled.Text`
  width: 20%;
  font-size: ${RFValue(12)};
`;

export const TicketsAmount = styled.Text`
  width: 20%;
  font-size: ${RFValue(12)};
`;
