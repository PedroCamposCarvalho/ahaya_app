import styled from 'styled-components/native';
import { shade } from 'polished';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

interface SelectedOptionProps {
  selected: boolean;
}
interface ContinueButtonProps {
  enabled: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const LoadingContainer = styled.View``;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #32312f;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const BackButton = styled(RectButton)`
  margin-right: auto;
`;

export const HeaderTitle = styled.Text`
  color: #f5ede8;
  font-family: 'Arial';
  font-size: 20px;
  margin-right: auto;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 40px;
`;

export const HoursContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  width: 30%;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const MinusButton = styled(RectButton)``;

export const HourText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Arial';
`;

export const PlusButton = styled(RectButton)``;

export const PaymentContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const OptionButton = styled.TouchableOpacity`
  width: 80%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5%;
`;

export const OptionView = styled.View<SelectedOptionProps>`
  background: ${props => (props.selected ? '#99d420' : 'transparent')};
  height: 20px;
  width: 20px;
  border: 3px;
  border-radius: 50px;
  border-color: #99d420;
`;

export const OptionText = styled.Text`
  margin-left: 20px;
  color: #fff;
`;

export const ItemDescription = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Arial';
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 60%;
`;

export const PriceText = styled.Text`
  width: 80%;
  color: #fff;
  font-size: 15px;
  font-family: 'Arial';
`;

export const ValueText = styled.Text`
  margin-left: 30px;
  width: 150px;
  color: #99d420;
  font-size: 15px;
  font-family: 'Arial';
`;

export const ContinueButton = styled(RectButton)<ContinueButtonProps>`
  align-self: center;
  margin-bottom: 5%;
  width: 90%;
  background: ${props => (props.enabled ? '#99d420' : shade(0.4, '#99d420'))};
  margin: 5% 0;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const ContinueButtonText = styled.Text`
  color: #32312f;
  font-family: 'Arial';
  font-size: 18px;
  margin-right: 10px;
`;
