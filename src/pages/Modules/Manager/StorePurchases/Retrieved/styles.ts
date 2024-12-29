import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { shade } from 'polished';
import { RFValue } from 'react-native-responsive-fontsize';
import { PurchasesProps } from './index';

interface RetrievedProps {
  retrieved: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const PurchaseList = styled(
  FlatList as new () => FlatList<PurchasesProps>,
)``;

export const PurchaseContainer = styled.View`
  width: 90%;
  background: rgba(255, 255, 255, 0.3);
  align-self: center;
  margin-top: ${RFValue(20)};
  padding: 16px;
  border-radius: ${RFValue(10)};
  flex-direction: row;
`;

export const PurchaseDetails = styled.View`
  width: 70%;
`;

export const PurchaseItemContainer = styled.View`
  flex-direction: row;
`;

export const PurchaseItemTitle = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(14)};
  width: 45%;
`;

export const PurchaseProduct = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(14)};
  width: 60%;
`;

export const PurchaseAmount = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(14)};
  width: 60%;
`;

export const PurchasePricePaid = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(14)};
  width: 60%;
`;

export const PurchaseRetrievedContainer = styled.View`
  align-items: center;
  width: 30%;
`;

export const PurchaseRetrievedTitle = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: ${RFValue(14)};
`;

export const PurchaseRetrievedImage = styled.View`
  margin-top: ${RFValue(10)};
`;
export const PullToRefreshText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  align-self: center;
  margin-bottom: ${RFValue(30)};
  position: absolute;
  bottom: 0;
`;

export const ModalContainer = styled.View`
  height: ${RFValue(140)};
  background: #fff;
  border-radius: ${RFValue(40)};
  align-items: center;
  justify-content: space-between;
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

export const ModalContent = styled.View`
  flex: 1;
  align-items: center;
`;

export const ModalDescription = styled.Text`
  margin-top: ${RFValue(20)};
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  color: #999;
`;

export const ModalButtonsContainer = styled.View`
  margin-top: ${RFValue(20)};
  flex-direction: row;
  justify-content: space-between;
  width: 50%;
`;

export const ModalButtonContent = styled.View`
  margin-top: ${RFValue(20)};
  align-items: center;
  width: 60%;
  justify-content: space-between;
`;

export const ModalButton = styled.TouchableOpacity<RetrievedProps>`
  height: ${RFValue(40)};
  width: ${RFValue(40)};
  border-radius: ${RFValue(20)};
  border: ${RFValue(2)}px;
  border-color: #fff;
  background: ${props => (props.retrieved ? '#99d420' : 'transparent')};
`;

export const ModalButtonDescription = styled.Text`
  margin-top: ${RFValue(10)};
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  color: #999;
`;

export const ModalUpdateButton = styled.TouchableOpacity`
  background: #04d461;
  margin-bottom: 10px;
  height: ${RFValue(40)};
  border-radius: ${RFValue(20)};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 80%;
`;

export const ModalUpdateButtonText = styled.Text`
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  color: #fff;
`;
