import React, { useEffect, useCallback, useState } from 'react';
import { View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useStoreContext, Store } from '../../../../../hooks/store';
import {
  Container,
  Header,
  HeaderButton,
  HeaderTitle,
  Content,
  ProductsList,
  ProductContainer,
  ProductName,
  ProductPrice,
  ProductAmount,
  RemoveFromCartButton,
  TotalPriceContainer,
  TotalPriceText,
  ContinueButton,
  ContinueButtonText,
  CartEmpty,
  CartEmptyText,
} from './styles';

interface PageProps {
  closeModal: () => void;
}

const CartModal: React.FC<PageProps> = ({ closeModal }) => {
  const { store, removeItem } = useStoreContext();
  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    store.map(item => {
      total += item.price;
      return null;
    });
    setTotalPrice(total);
  }, [store]);

  const handleFinish = useCallback(() => {
    closeModal();
    navigation.navigate('StoreCreditCardPayment');
  }, [navigation, closeModal]);

  function formatPrice(price: string): string {
    const splitString = price.split('.');
    if (splitString.length > 1) {
      if (Number(splitString[1]) < 9) {
        return `R$ ${splitString[0]},${splitString[1]}0`;
      }
      return `R$ ${splitString[0]},${splitString[1]}`;
    }

    return `R$ ${price},00`;
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>Meu carrinho</HeaderTitle>
        <HeaderButton onPress={() => closeModal()}>
          <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
        </HeaderButton>
      </Header>
      <Content>
        {store.length === 0 ? (
          <CartEmpty>
            <MaterialIcon name="cart-minus" color="#999" size={RFValue(20)} />
            <CartEmptyText>Carrinho Vazio</CartEmptyText>
          </CartEmpty>
        ) : (
          <>
            <ProductsList
              data={store}
              keyExtractor={product => product.id_product}
              renderItem={({ item: product }) => (
                <ProductContainer>
                  <ProductName>{product.product_name}</ProductName>
                  <ProductPrice>
                    {formatPrice(String(product.price))}
                  </ProductPrice>
                  <RemoveFromCartButton
                    onPress={() => removeItem(product.id_product)}
                  >
                    <MaterialIcon
                      name="cart-remove"
                      color="#c53030"
                      size={RFValue(20)}
                    />
                  </RemoveFromCartButton>
                </ProductContainer>
              )}
            />
            <TotalPriceContainer>
              <TotalPriceText>
                {`Total a pagar: ${formatPrice(String(totalPrice))}`}
              </TotalPriceText>
            </TotalPriceContainer>
            <ContinueButton onPress={() => handleFinish()}>
              <ContinueButtonText>Ir para o pagamento</ContinueButtonText>
              <MaterialIcon
                name="cart-arrow-right"
                color="#fff"
                size={RFValue(20)}
              />
            </ContinueButton>
          </>
        )}
      </Content>
    </Container>
  );
};

export default CartModal;
