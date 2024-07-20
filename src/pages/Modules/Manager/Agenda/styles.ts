import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  height: 100%;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10%;
`;

export const BackButton = styled.TouchableOpacity`
  margin-left: 20px;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(18)};
  color: #006edb;
`;
export const AddButton = styled.TouchableOpacity`
  margin-right: 20px;
`;

export const Content = styled.ScrollView`
  flex: 1;
  height: 100%;
  padding-bottom: 120px;
`;

export const HourContainer = styled.View`
  flex-direction: row;
  width: ${RFValue(346)};
  padding: 16px;
  border-bottom-width: 0.5px;
  border-color: #999;
`;

export const HourView = styled.View`
  width: 25%;
`;

export const HourText = styled.Text`
  margin-left: ${RFValue(10)};
`;

export const AppointmentContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${RFValue(10)};
`;

export const CourtName = styled.Text`
  width: 21%;
  font-size: ${RFValue(10)};
`;

export const ClientName = styled.Text`
  width: 50%;
  font-size: ${RFValue(10)};
`;

export const DeleteButton = styled.TouchableOpacity``;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const InfoButton = styled.TouchableOpacity``;
