import styled from 'styled-components/native';
import { shade } from 'polished';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { SavedCards } from './index';

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
  flex: 1;
  align-items: center;
  justify-content: center;
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

export const Content = styled.ScrollView`
  width: 100%;
  flex: 1;
  margin-bottom: ${RFValue(20)};
`;

export const UseExistingCardView = styled.View<UseExistingCard>`
  align-items: center;

  opacity: ${props => (props.visible ? 1 : 0)};
`;

export const UseExistingCardButton = styled.TouchableOpacity`
  flex-direction: row;
  background: rgba(0, 0, 0, 0.2);
  padding: 6px;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(10)};
`;

export const UseExistingCardText = styled.Text`
  color: #fff;
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  margin-left: ${RFValue(10)};
`;

export const CreditCartContent = styled.View`
  height: 50px;
`;

export const FinishButton = styled(RectButton)<FinishButtonProps>`
  height: ${RFValue(40)};
  background: #006edb;
  border-radius: ${RFValue(10)};
  align-items: center;
  justify-content: center;
  width: 90%;
  align-self: center;
  margin-bottom: ${RFValue(30)};
  opacity: ${props => (props.enabled ? 1 : 0.3)};
`;

export const FinishButtonText = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(16)};
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
  font-family: 'Arial';
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

export const ModalSavedCardsList = styled(
  FlatList as new () => FlatList<SavedCards>,
)`
  flex: 1;
  width: 100%;
`;

export const SavedCardContainer = styled.TouchableOpacity`
  background: rgba(0, 0, 0, 0.05);
  flex-direction: row;
  width: 80%;
  align-self: center;
  align-items: center;
  margin-top: ${RFValue(10)};
  padding: ${RFValue(6)}px;
  border-radius: ${RFValue(10)};
`;

export const SavedCardLastDigits = styled.Text`
  font-size: ${RFValue(16)};
  font-family: 'Arial';
  margin-left: ${RFValue(30)};
`;
