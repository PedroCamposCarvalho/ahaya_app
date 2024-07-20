import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Products } from './index';

interface ProductProps {
  inventory: number;
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

export const Title = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: 20px;
`;

export const AddButton = styled.TouchableOpacity`
  margin-right: 10px;
`;

export const ProductsList = styled(FlatList as new () => FlatList<Products>)`
  flex: 1;
`;

export const ProductContainer = styled.TouchableOpacity<ProductProps>`
  flex-direction: row;
  align-self: center;
  justify-content: space-between;
  width: 80%;
  background: ${props =>
    props.inventory === 0 ? '#c53030' : 'rgba(255,255,255,0.3)'};
  margin-top: ${RFValue(20)};
  padding: ${RFValue(16)}px;
  border-radius: ${RFValue(10)};
`;

export const ProductName = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(14)};
  width: 150px;
`;

export const ProductInventory = styled.Text`
  width: 40px;
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(14)};
`;

export const DetailsButton = styled.TouchableOpacity``;
