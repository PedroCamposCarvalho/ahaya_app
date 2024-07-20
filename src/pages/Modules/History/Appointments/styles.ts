import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '@app/Config/Colors';
import user_history_appointments from '@app/interfaces/user_history_appointments';
import months from '@app/interfaces/months';

interface MonthsContainerProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: ${RFValue(20)};
`;

export const Title = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(16)};
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const LoadingContainer = styled.View`
  width: 70%;
  align-items: center;
  justify-content: center;
`;

export const AppointmentsList = styled(
  FlatList as new () => FlatList<user_history_appointments>,
)`
  width: 70%;
`;

export const AppointmentContainer = styled.View`
  flex-direction: row;
  align-self: center;
  width: 80%;
  border-width: ${RFValue(1)};
  border-color: #fff;
  border-radius: ${RFValue(10)};
  margin-top: ${RFValue(20)};
  padding: 10px;
`;

export const AppointmentDetails = styled.View`
  width: 80%;
`;

export const CourtName = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
`;

export const StartDate = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  margin-top: ${RFValue(8)};
`;

export const FinishDate = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  margin-top: ${RFValue(8)};
`;

export const CreatedAt = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  margin-top: ${RFValue(8)};
`;

export const NumberPlayers = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  margin-top: ${RFValue(8)};
`;

export const ViewDetailsButton = styled.TouchableOpacity`
  flex: 1;
  width: 20%;
  align-items: center;
  justify-content: center;
`;

export const MonthsList = styled(FlatList as new () => FlatList<months>)`
  width: 30%;
`;

export const MonthContainer = styled.TouchableOpacity<MonthsContainerProps>`
  align-self: center;
  border-radius: ${RFValue(10)};
  border: ${RFValue(1)}px;
  border-color: #fff;
  width: ${RFValue(50)};
  height: ${RFValue(30)};
  margin-top: ${RFValue(20)};
  align-items: center;
  justify-content: center;
  background: ${props => (props.selected ? '#fff' : 'transparent')};
`;

export const MonthNumber = styled.Text<MonthsContainerProps>`
  color: ${props => (props.selected ? '#999' : '#fff')};
`;

export const NoAppointmentsContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 70%;
`;

export const NoAppointmentsText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(16)};
  text-align: center;
`;

export const ModalView = styled.View`
  height: ${RFValue(450)};
  background: #fff;
  border-radius: ${RFValue(40)};
`;
