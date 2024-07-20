import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import getCourtProps from '../../../../../utils/getCourtProps';
import { AppointmentProps } from '../index';

interface CourtButtonProps {
  number: number;
}

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

export const Content = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

export const AppointmentsList = styled(
  FlatList as new () => FlatList<AppointmentProps>,
)``;

export const AppointmentItem = styled.View`
  width: 80%;
  flex-direction: row;
  margin-top: ${RFValue(20)};
  align-self: center;
  align-items: center;
`;

export const AppointmentObservation = styled.Text`
  width: 45%;
`;
export const CourtNumber = styled.View<CourtButtonProps>`
  background: ${props => getCourtProps(props.number)?.color};
  border-radius: ${RFValue(25)};
  height: ${RFValue(25)};
  width: ${RFValue(25)};
  align-items: center;
  justify-content: center;
`;

export const CourtName = styled.Text`
  color: #fff;
  font-size: ${RFValue(12)};
`;

export const EditButton = styled.TouchableOpacity`
  margin-left: auto;
`;

export const DeleteButton = styled.TouchableOpacity`
  margin-left: ${RFValue(10)};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
