import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../../../services/api';
import {
  Container,
  Header,
  BackButton,
  Title,
  AddButton,
  ProductsList,
  ProductContainer,
  ProductName,
  ProductInventory,
  DetailsButton,
} from './styles';

export interface Products {
  id: string;
  product: string;
  description: string;
  price: number;
  inventory: number;
  image1: string;
}

const Store: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    api.get('/store/findAll').then(response => {
      setProducts(response.data);
    });
  }, []);

  const getProducts = useCallback(() => {
    api.get('/store/findAll').then(response => {
      setProducts(response.data);
    });
  }, []);

  const handleEditItem = useCallback(
    (id_product: string) => {
      navigation.navigate('EditItem', { id_product, getProducts });
    },
    [navigation, getProducts],
  );

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-down" color="#fff" size={RFValue(20)} />
          </BackButton>
          <Title>Lojinha</Title>
          <AddButton
            onPress={() => navigation.navigate('NewItem', { getProducts })}
          >
            <FeatherIcon name="plus-circle" color="#fff" size={RFValue(20)} />
          </AddButton>
        </Header>
        <ProductsList
          data={products}
          keyExtractor={product => product.id}
          renderItem={({ item: product }) => (
            <>
              {product.inventory > 0 ? (
                <ProductContainer
                  inventory={product.inventory}
                  onPress={() => handleEditItem(product.id)}
                >
                  <ProductName>{product.product}</ProductName>
                  <ProductInventory>{product.inventory}</ProductInventory>
                  <DetailsButton onPress={() => handleEditItem(product.id)}>
                    <FeatherIcon
                      name="chevron-right"
                      color="#fff"
                      size={RFValue(20)}
                    />
                  </DetailsButton>
                </ProductContainer>
              ) : (
                <></>
              )}
            </>
          )}
        />
      </Container>
    </LinearGradient>
  );
};

export default Store;
