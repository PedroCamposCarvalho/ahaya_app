import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import getCourtProps from '../../../../../utils/getCourtProps';

interface TypeButtonProps {
  selected: boolean;
}

interface CourtButtonProps {
  number: number;
  selected: boolean;
}

interface CourtTextProps {
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
  width: 90%;
  padding: 8px;
`;

export const LimitView = styled.View`
  width: 90%;
  height: ${RFValue(50)}px;
  border-bottom-width: 1px;
  border-color: #999;

  margin-top: ${RFValue(10)};
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

export const Limit = styled.TextInput`
  flex: 1;
  color: #999;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
`;

export const PriceView = styled.View`
  width: 95%;
  margin-left: ${RFValue(7)};
  margin-top: ${RFValue(7)};
  height: ${RFValue(50)}px;
  flex-direction: row;
  flex-direction: column;
  margin-bottom: ${RFValue(10)};
`;

export const PriceTitle = styled.Text`
  color: #999;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  margin-left: ${RFValue(7)};
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const InitialDateView = styled.View`
  width: 90%;
  align-self: center;
`;

export const InitialDateTitle = styled.Text`
  color: #999;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
`;

export const HoursView = styled.View`
  width: 90%;
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: center;
`;

export const InitialHourView = styled.View`
  width: 40%;
  height: ${RFValue(50)}px;
  border-bottom-width: 1px;
  border-color: #999;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

export const InitialHour = styled.TextInput`
  flex: 1;
  color: #999;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
`;

export const FinalHourView = styled.View`
  width: 40%;
  height: ${RFValue(50)}px;
  border-bottom-width: 1px;
  border-color: #999;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

export const FinalHour = styled.TextInput`
  flex: 1;
  color: #999;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
`;

export const TypeContainer = styled.View`
  margin-top: ${RFValue(20)};
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
  align-self: center;
`;

export const TypeContent = styled.View`
  align-items: center;
  margin: 0 ${RFValue(30)}px;
`;

export const TypeButton = styled.TouchableOpacity<TypeButtonProps>`
  height: ${RFValue(25)};
  width: ${RFValue(25)};
  background: ${props => (props.selected ? '#999' : 'transparent')};
  border-radius: ${RFValue(50)};
  border: 1px;
  border-color: #999;
`;

export const TypeDescription = styled.Text`
  color: #999;
  font-size: ${RFValue(12)};
  font-family: 'Arial';
  margin-top: ${RFValue(10)};
`;

export const CourtsContainer = styled.View`
  align-self: center;
  width: 90%;
`;

export const CourtsTitle = styled.Text`
  color: #999;
  font-size: ${RFValue(12)};
  font-family: 'Arial';
  margin-top: ${RFValue(10)};
`;

export const CourtsContent = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const CourtView = styled.View`
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const CourtOption = styled.TouchableOpacity<CourtButtonProps>`
  height: ${RFValue(30)};
  width: ${RFValue(30)};
  border-radius: ${RFValue(50)};
  border: 1px;
  border-color: ${props => getCourtProps(props.number)?.color};
  margin-top: ${RFValue(10)};
  background: ${props =>
    props.selected ? getCourtProps(props.number)?.color : 'transparent'};
`;

export const CourtNumber = styled.Text<CourtTextProps>`
  color: ${props => getCourtProps(props.number)?.color};
  font-size: ${RFValue(14)};
  font-family: 'Arial';
`;

export const FinishButton = styled.TouchableOpacity`
  background: #4bb543;
  margin-top: auto;
  margin-bottom: ${RFValue(20)};
  width: 90%;
  height: ${RFValue(40)};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const FinishButtonText = styled.Text`
  color: #fff;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
`;
