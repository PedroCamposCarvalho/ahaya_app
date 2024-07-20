import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { shade } from 'polished';
import { PurchaseProps } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const PullToRefreshView = styled.View``;

export const PullToRefreshText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  align-self: center;
  margin-bottom: 14px;
  position: absolute;
  bottom: 0;
`;

export const PurchasesList = styled(
  FlatList as new () => FlatList<PurchaseProps>,
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
