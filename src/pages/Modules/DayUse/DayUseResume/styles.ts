import styled, { css } from 'styled-components/native';
import { shade } from 'polished';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

interface MaterialButtonProps {
  selected: boolean;
}

interface ContinueButtonProps {
  enabled: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  position: relative;
  z-index: 1;
`;

export const TitleView = styled.View`
  width: 100%;
  align-items: center;
  position: relative;
`;

export const HeaderTitle = styled.Text`
  color: #f5ede8;
  font-family: 'Arial';
  font-size: ${RFValue(18)};
  margin-right: 50px;
`;

export const LoadingContainer = styled.View``;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const DateText = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(16)};
  color: #fff;
  margin-top: 5%;
`;

export const HourText = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(16)};
  color: #fff;
  margin: 2% 0;
`;

export const TicketsItemContainer = styled.View`
  flex-direction: row;
  background: rgba(255, 255, 255, 0.3);
  margin-bottom: 20px;
  padding: 10px 24px;
  border-radius: 10px;
  width: 90%;
`;

export const TicketsDetailsContainer = styled.View``;

export const TicketsTitle = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(14)};
`;

export const TicketPrice = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(10)};
  margin-top: 3px;
`;

export const TicketCountContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: auto;
`;

export const TicketMinusButton = styled.TouchableWithoutFeedback`
  height: ${RFValue(18)};
  width: ${RFValue(18)};
`;

export const TicketAmmount = styled.Text`
  color: #fff;
  margin: 0 10px;
`;

export const TicketPlusButton = styled.TouchableWithoutFeedback``;

export const GoToPaymentButton = styled(RectButton)<ContinueButtonProps>`
  align-self: center;
  width: 90%;
  background: #006edb;
  margin-bottom: ${RFValue(30)};
  height: ${RFValue(40)};
  border-radius: ${RFValue(10)};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  ${props =>
    !props.enabled &&
    css`
      opacity: 0.3;
    `}

  ${props =>
    props.enabled &&
    css`
      opacity: 1;
    `}
`;

export const GoToPaymentButtonText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(14)};
  margin-right: 10px;
`;

export const PaymentTypeText = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(14)};
  color: #fff;
  margin-top: 5%;
`;

export const FinalPriceText = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(16)};
  color: #fff;
  margin-bottom: ${RFValue(20)};
  align-self: center;
`;
