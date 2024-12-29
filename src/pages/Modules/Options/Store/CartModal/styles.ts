import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Store } from '../../../../../hooks/store';

export const Container = styled.View`
  height: ${RFValue(450)};
  background: #fff;
  border-radius: ${RFValue(40)};
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  width: 80%;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(18)};
  color: #999;
`;

export const HeaderButton = styled.TouchableOpacity`
  height: ${RFValue(25)};
  width: ${RFValue(25)};
  align-items: center;
  justify-content: center;
  background: #c53030;
  border-radius: ${RFValue(14)};
`;

export const Content = styled.View`
  flex: 1;
  width: 80%;
`;

export const ProductsList = styled(FlatList as new () => FlatList<Store>)``;

export const ProductContainer = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: space-between;
  width: 100%;
  margin-top: ${RFValue(20)};
`;

export const ProductName = styled.Text`
  font-size: ${RFValue(14)};
  width: 50%;
  font-family: 'Arial';
  color: #999;
`;

export const ProductPrice = styled.Text`
  font-size: ${RFValue(14)};
  width: 25%;
  font-family: 'Arial';
  color: #999;
`;

export const ProductAmount = styled.Text``;

export const RemoveFromCartButton = styled.TouchableOpacity``;

export const TotalPriceContainer = styled.View`
  margin-bottom: ${RFValue(10)};
`;

export const TotalPriceText = styled.Text`
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  color: #999;
`;

export const ContinueButton = styled.TouchableOpacity`
  background: #04d461;
  margin-bottom: 10px;
  height: ${RFValue(40)};
  border-radius: ${RFValue(10)};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const ContinueButtonText = styled.Text`
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  color: #fff;
`;

export const CartEmpty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const CartEmptyText = styled.Text`
  color: #999;
  font-family: 'Arial';
  margin-top: 5px;
  font-size: ${RFValue(14)};
`;
