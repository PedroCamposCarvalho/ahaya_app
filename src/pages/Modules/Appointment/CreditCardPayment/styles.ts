import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import fonts from '@app/Config/FontFamily';

interface UseExistingCard {
  visible: boolean;
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
  font-family: ${fonts.primary};
  font-size: 20px;
  margin-right: 50px;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 80%;
`;

export const CreditCardTitle = styled.Text`
  font-family: ${fonts.primary};
  color: #fff;
  font-size: ${RFValue(20)};
  align-self: center;
  margin: 0 24px 24px;
`;

export const CreditCardContainer = styled.View`
  margin-top: 10px;
  flex: 1;
  align-items: center;
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

export const UseExistingCardButton = styled.TouchableOpacity`
  flex-direction: row;
  background: rgba(255, 255, 255, 0.5);
  padding: 14px;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(10)};
`;

export const UseExistingCardText = styled.Text`
  color: #fff;
  font-size: ${RFValue(16)};
  font-family: ${fonts.primary};
  margin-left: ${RFValue(10)};
`;

export const CreditCartContent = styled.View`
  height: 50px;
`;

export const FinishButton = styled.TouchableOpacity`
  align-self: center;
  width: 90%;
  background: #006edb;
  margin-bottom: ${RFValue(30)};
  height: ${RFValue(40)};
  border-radius: ${RFValue(10)};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const FinishButtonText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(14)};
  margin-right: 10px;
`;

export const ModalView = styled.View`
  height: ${RFValue(450)};
  background: #fff;
  border-radius: ${RFValue(40)};
  align-items: center;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  width: 80%;
  justify-content: space-between;
`;

export const ModalHeaderTitle = styled.Text`
  font-family: ${fonts.primary};
  font-size: ${RFValue(18)};
  color: #999;
`;

export const ModalHeaderButton = styled.TouchableOpacity`
  height: ${RFValue(25)};
  width: ${RFValue(25)};
  align-items: center;
  justify-content: center;
  background: #c53030;
  border-radius: ${RFValue(14)};
`;
export const SavedCardContainer = styled.TouchableOpacity`
  background: rgba(0, 0, 0, 0.05);
  flex-direction: row;
  width: 80%;
  align-self: center;
  align-items: center;
  padding: ${RFValue(6)}px;
  border-radius: ${RFValue(10)};
`;

export const SavedCardLastDigits = styled.Text`
  font-size: ${RFValue(16)};
  font-family: 'Arial';
  margin-left: ${RFValue(30)};
`;
