/* eslint-disable no-nested-ternary */
/* eslint-disable no-confusing-arrow */
import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { shade } from 'polished';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '@app/Config/Colors';
import AvailableHours from '@app/interfaces/AppointmentsAvailableHours';
import fonts from '@app/Config/FontFamily';
import { SelectedHours } from '@app/interfaces/SelectedHours';

interface CourtAvailableProps {
  available: boolean;
  inCart?: boolean;
}
interface ContinueButtonProps {
  disabled: boolean;
}

export const Container = styled.View`
  flex: 1;
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
  color: #fff;
  font-family: ${fonts.primary};
  font-size: ${RFValue(18)};
`;

export const CartButton = styled.TouchableOpacity`
  height: ${RFValue(32)};
  width: ${RFValue(32)};
  border-radius: ${RFValue(8)};
  background: #fff;
  align-items: center;
  justify-content: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const CalendarContainer = styled.View`
  width: 85%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const DateLabel = styled.Text`
  color: #fff;
  font-size: ${RFValue(16)};
  font-family: ${fonts.primary};
`;

export const AndroidDateButton = styled.TouchableOpacity`
  background: rgba(255, 255, 255, 0.4);
  width: 40%;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(4)};
`;

export const AndroidDateButtonText = styled.Text`
  color: #fff;
  font-family: ${fonts.primary};
`;

export const IosButtonContainer = styled.View``;

export const HoursList = styled(FlatList as new () => FlatList<AvailableHours>)`
  width: 100%;
  margin-top: ${RFValue(10)};
  margin-bottom: ${RFValue(30)};
`;

export const HourContainer = styled.View`
  width: 85%;
  align-self: center;
  border-bottom-width: 2px;
  border-color: #fff;
  margin-top: 3px;
  margin-bottom: 3px;
`;

export const HourLabel = styled.Text`
  color: #fff;
  font-size: ${RFValue(16)};
  font-family: ${fonts.primary};
`;

export const CourtContainer = styled.View`
  align-self: center;
  flex-direction: row;
  width: 80%;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(8)};
  margin-bottom: ${RFValue(8)};
`;

export const CourtName = styled.Text<CourtAvailableProps>`
  color: ${props => (props.available ? '#fff' : '#ccc')};
  text-decoration: ${props => (props.available ? 'none' : 'line-through')};
  text-decoration-color: #ccc;
  font-size: ${RFValue(14)};
  width: ${RFValue(130)};
  font-family: ${fonts.primary};
`;

export const CourtPrice = styled.Text<CourtAvailableProps>`
  color: ${props => (props.available ? '#fff' : '#ccc')};
  text-decoration: ${props => (props.available ? 'none' : 'line-through')};
  text-decoration-color: #ccc;
  font-size: ${RFValue(14)};
  font-family: ${fonts.primary};
`;

export const AddToCartButton = styled.TouchableOpacity<CourtAvailableProps>`
  background: ${props =>
    props.available
      ? props.inCart
        ? 'red'
        : shade(0.2, '#4BB543')
      : 'transparent'};
  border-radius: ${RFValue(50)};
  height: ${RFValue(20)};
  width: ${RFValue(20)};
  align-items: center;
  justify-content: center;
`;

export const ModalView = styled.View`
  height: ${RFValue(450)};
  background: #fff;
  border-radius: ${RFValue(40)};
  align-items: center;
`;

export const ModalCartList = styled(
  FlatList as new () => FlatList<SelectedHours>,
)`
  width: 100%;
  margin-top: ${RFValue(20)};
`;

export const ModalCartItemContainer = styled.View`
  flex-direction: row;
  width: 80%;
  align-self: center;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(15)};
`;

export const ModalDateText = styled.Text`
  color: #999;
  font-size: ${RFValue(14)};
  font-family: ${fonts.primary};
`;

export const RemoveButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const FinalPriceText = styled.Text`
  color: ${colors.blue};
  font-size: ${RFValue(18)};
  margin-bottom: ${RFValue(20)};
  font-family: ${fonts.primary};
`;

export const ContinueButton = styled.TouchableOpacity<ContinueButtonProps>`
  align-self: center;
  width: 90%;
  background: #006edb;
  margin-bottom: ${RFValue(30)};
  height: ${RFValue(40)};
  border-radius: ${RFValue(10)};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  opacity: ${props => (props.disabled ? 0.3 : 1)};
`;

export const ContinueButtonText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(14)};
  margin-right: 10px;
`;

export const CourtImage = styled.Image`
  height: ${RFValue(50)};
  width: ${RFValue(50)};
  border-radius: ${RFValue(80)};
  background: #fff;
  margin-left: -40px;
  margin-right: 20px;
`;
