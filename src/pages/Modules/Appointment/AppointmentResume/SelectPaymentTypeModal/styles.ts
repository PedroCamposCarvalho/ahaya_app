import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '@app/Config/Colors';

interface OptionProps {
  selected: boolean;
}

interface FinishButtonProps {
  disabled: boolean;
}

export const Container = styled.View`
  height: ${RFValue(260)};
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

export const Content = styled.View`
  flex: 1;
  width: 80%;
`;

export const OptionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: ${RFValue(40)};
`;

export const FakeButtonOption = styled.View<OptionProps>`
  height: ${RFValue(25)};
  width: ${RFValue(25)};
  border-width: ${RFValue(2)};
  border-radius: ${RFValue(50)};
  border-color: ${Colors.primary};
  background: ${props => (props.selected ? Colors.primary : 'transparent')};
`;

export const OptionText = styled.Text`
  color: ${Colors.modalGrey};
  margin-left: ${RFValue(10)};
  font-size: ${RFValue(14)};
`;

export const FinishButton = styled.TouchableOpacity<FinishButtonProps>`
  background: ${props => (props.disabled ? '#ccc' : Colors.primary)};
  margin-bottom: ${RFValue(10)};
  border-radius: ${RFValue(15)};
  height: ${RFValue(30)};
  width: 80%;
  align-items: center;
  justify-content: center;
`;

export const FinishButtonText = styled.Text`
  color: ${Colors.white};
  font-size: ${RFValue(14)};
`;
