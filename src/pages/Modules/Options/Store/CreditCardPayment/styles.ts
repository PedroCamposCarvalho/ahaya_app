import styled from 'styled-components/native';
import { shade } from 'polished';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface UseExistingCard {
  visible: boolean;
}

interface FinishButtonProps {
  enabled: boolean;
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
  color: #fff;
  font-family: 'Arial';
  font-size: 20px;
  margin-right: 50px;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 80%;
`;

export const CreditCardTitle = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(20)};
  align-self: center;
  margin: 0 24px 24px;
`;

export const CreditCardContainer = styled.View`
  margin-top: 20px;
  flex: 1;
`;

export const Content = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const UseExistingCardView = styled.View<UseExistingCard>`
  align-items: center;
  margin-top: 10%;
  opacity: ${props => (props.visible ? 1 : 0)};
`;

export const UseExistingCardButton = styled(RectButton)``;

export const UseExistingCardText = styled.Text`
  color: #fff;
  text-decoration: underline;
  text-decoration-color: #fff;
  font-family: 'Arial';
`;

export const CreditCartContent = styled.View`
  height: 50px;
`;

export const FinishButton = styled(RectButton)<FinishButtonProps>`
  height: ${RFValue(40)};
  background: #4bb543;
  border-radius: ${RFValue(10)};
  align-items: center;
  justify-content: center;
  width: 90%;
  align-self: center;
  margin-bottom: 7%;
  opacity: ${props => (props.enabled ? 1 : 0.3)};
`;

export const FinishButtonText = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(16)};
`;
