import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { shade } from 'polished';
import { Products } from './index';

interface ProductProps {
  inventory: number;
}

interface AddToCartButtonProps {
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

export const CartButton = styled.TouchableOpacity`
  height: ${RFValue(32)};
  width: ${RFValue(32)};
  border-radius: ${RFValue(8)};
  background: #fff;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
  position: relative;
  z-index: 1;
`;

export const Title = styled.Text`
  color: #f5ede8;
  font-family: 'Arial';
  font-size: 20px;
`;

export const ProductsList = styled(FlatList as new () => FlatList<Products>)`
  flex: 1;
`;

export const ProductContainer = styled.TouchableOpacity<ProductProps>`
  flex-direction: row;
  align-self: center;
  justify-content: space-between;
  width: 80%;
  background: ${props => (props.inventory === 0 ? '#c53030' : '#139fd4')};
  margin-top: ${RFValue(20)};
  padding: ${RFValue(16)}px;
  border-radius: ${RFValue(10)};
  align-items: center;
`;

export const ProductName = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(14)};
  width: 40%;
`;

export const ProductPrice = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(14)};
`;

export const ProductInventory = styled.Text`
  width: 40px;
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(14)};
`;

export const DetailsButton = styled.TouchableOpacity``;

export const ModalContainer = styled.View`
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

export const ModalContent = styled.View`
  margin-top: ${RFValue(20)};
  flex: 1;
`;

export const ModalImages = styled.ScrollView`
  flex: 1;
`;

export const ModalProductDescription = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  color: #999;
  margin-top: ${RFValue(20)};
  align-self: center;
`;

export const ModalDetailsContainer = styled.View`
  flex-direction: row;
  margin-top: ${RFValue(20)};
  width: 80%;
  align-self: center;
  align-items: center;
  justify-content: space-around;
`;

export const ModalProductPrice = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  color: #999;
`;

export const ModalProductIventory = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  color: #999;
`;

export const ModalButtonsContainer = styled.View`
  flex-direction: row;
  align-self: center;
  margin-top: ${RFValue(20)};
  align-items: center;
  justify-content: space-around;
  width: 40%;
`;

export const ModalMinusButton = styled.TouchableOpacity`
  background: #c53030;
  border-radius: ${RFValue(10)};
`;

export const ModalAddButton = styled.TouchableOpacity`
  background: #04d461;
  border-radius: ${RFValue(10)};
`;

export const ModalTotalItem = styled.Text`
  color: #999;
`;

export const ModalAddToCardButton = styled.TouchableOpacity<AddToCartButtonProps>`
  flex-direction: row;
  width: 80%;
  align-self: center;
  background: ${props => (props.enabled ? '#04d461' : shade(0.5, '#04d461'))};
  align-items: center;
  justify-content: space-around;
  margin-top: ${RFValue(40)};
  margin-bottom: 10px;
  height: ${RFValue(40)};
  border-radius: ${RFValue(10)};
`;

export const ModalAddToCardButtonText = styled.Text<AddToCartButtonProps>`
  font-family: 'Arial';
  font-size: ${RFValue(14)};
  color: ${props => (props.enabled ? '#fff' : '#999')};
`;
