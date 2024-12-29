import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Image, Platform, Animated } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { io } from 'socket.io-client';
import LinearGradient from 'react-native-linear-gradient';
import CartModal from './CartModal';
import { useStoreContext } from '../../../../hooks/store';
import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';
import env from '../../../../Config/Environment';
import {
  Container,
  Header,
  BackButton,
  Title,
  CartButton,
  ProductsList,
  ProductContainer,
  ProductName,
  ProductPrice,
  DetailsButton,
  ModalContainer,
  ModalHeader,
  ModalHeaderTitle,
  ModalHeaderButton,
  ModalContent,
  ModalImages,
  ModalProductDescription,
  ModalProductPrice,
  ModalProductIventory,
  ModalDetailsContainer,
  ModalButtonsContainer,
  ModalAddButton,
  ModalMinusButton,
  ModalTotalItem,
  ModalAddToCardButton,
  ModalAddToCardButtonText,
} from './styles';

export interface Products {
  id: string;
  product: string;
  description: string;
  price: number;
  inventory: number;
  image1: string;
  image2: string;
  image3: string;
}

const Store: React.FC = () => {
  const productAddedToCartToastOpts = useMemo(
    () => ({
      data: 'Produto adicionado ao carrinho!',
      textColor: '#fff',
      backgroundColor: '#4bb543',
      duration: WToast.duration.LONG,
      position: WToast.position.TOP,
    }),
    [],
  );

  const animation = useMemo(() => new Animated.Value(0), []);
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  const [products, setProducts] = useState<Products[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Products>(
    {} as Products,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const navigation = useNavigation();
  const { addItem, store } = useStoreContext();
  const { user } = useAuth();

  const socket = useMemo(
    () =>
      io(`${env.url}`, {
        query: {
          id_user: user.id,
        },
      }),
    [user.id],
  );

  useEffect(() => {
    socket.on('productCreated', () => {
      api.get('/store/findAll').then(response => {
        setProducts(response.data);
      });
    });
  }, [socket]);

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

  const handleOpenModal = useCallback(
    (id: string) => {
      products.map(product => {
        if (product.id === id) {
          setSelectedProduct(product);
        }
        return null;
      });
      store.map(item => {
        if (item.id_product === id) {
          setTotalItems(item.product_amount);
        }
        return null;
      });
      setModalOpen(true);
    },
    [products, store],
  );

  const handleRemoveItem = useCallback(() => {
    if (totalItems > 0) {
      setTotalItems(totalItems - 1);
    }
  }, [totalItems]);

  const handleAddItem = useCallback(() => {
    if (totalItems < selectedProduct.inventory) {
      setTotalItems(totalItems + 1);
    }
  }, [totalItems, selectedProduct]);

  const handleCloseModal = useCallback(() => {
    setTotalItems(0);
    setModalOpen(false);
  }, []);

  const handleAddToCart = useCallback(() => {
    const { id, product, price } = selectedProduct;

    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    addItem({
      id_product: id,
      product_name: product,
      product_amount: totalItems,
      price: totalItems * price,
    });
    setTimeout(() => {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }, 500);
    WToast.show(productAddedToCartToastOpts);
    setTotalItems(0);
    setModalOpen(false);
  }, [
    selectedProduct,
    addItem,
    totalItems,
    productAddedToCartToastOpts,
    animation,
  ]);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-down" color="#fff" size={RFValue(20)} />
          </BackButton>
          <Title>Lojinha</Title>
          <Animated.View style={[{ transform: [{ scale }] }]}>
            <CartButton onPress={() => setCartModalOpen(true)}>
              <MaterialIcon
                name="cart-outline"
                color="#273a9a"
                size={RFValue(20)}
              />
            </CartButton>
          </Animated.View>
        </Header>
        <ProductsList
          data={products}
          keyExtractor={product => product.id}
          renderItem={({ item: product }) => (
            <ProductContainer
              inventory={product.inventory}
              onPress={() => handleOpenModal(product.id)}
            >
              <Image
                style={{
                  width: RFValue(40),
                  height: RFValue(40),
                  borderRadius: RFValue(10),
                }}
                source={{
                  uri: product.image1
                    ? product.image1
                    : 'https://app-ahaya.s3.amazonaws.com/ahaya_logo.png',
                }}
              />
              <ProductName>{product.product}</ProductName>
              <ProductPrice>
                {`R$ ${String(product.price).replace('.', ',')}`}
              </ProductPrice>
              <DetailsButton onPress={() => handleOpenModal(product.id)}>
                <MaterialIcon name="plus" color="#fff" size={RFValue(20)} />
              </DetailsButton>
            </ProductContainer>
          )}
        />
        <Modal isVisible={modalOpen} backdropOpacity={0.2}>
          <ModalContainer>
            <ModalHeader>
              <ModalHeaderTitle>{selectedProduct.product}</ModalHeaderTitle>
              <ModalHeaderButton onPress={() => handleCloseModal()}>
                <MaterialIcon name="close" color="#fff" size={RFValue(20)} />
              </ModalHeaderButton>
            </ModalHeader>
            <ModalContent>
              <ModalImages>
                <SliderBox
                  dotColor="#273a9a"
                  inactiveDotColor="#90A4AE"
                  resizeMethod="resize"
                  resizeMode="contain"
                  paginationBoxStyle={{
                    paddingVertical: 10,
                  }}
                  dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    padding: 0,
                    margin: 0,
                    backgroundColor: 'rgba(128, 128, 128, 0.92)',
                  }}
                  ImageComponentStyle={{
                    marginTop: 5,
                    marginRight: Platform.OS === 'ios' ? 40 : 20,
                  }}
                  imageLoadingColor="#2196F3"
                  images={[
                    selectedProduct.image1,
                    selectedProduct.image2,
                    selectedProduct.image3,
                  ]}
                />
                <ModalProductDescription>
                  {selectedProduct.description}
                </ModalProductDescription>
                <ModalDetailsContainer>
                  <ModalProductPrice>
                    {`R$ ${String(selectedProduct.price).replace('.', ',')}`}
                  </ModalProductPrice>
                  <ModalProductIventory>
                    {`Estoque: ${selectedProduct.inventory}`}
                  </ModalProductIventory>
                </ModalDetailsContainer>
                <ModalButtonsContainer>
                  <ModalMinusButton onPress={() => handleRemoveItem()}>
                    <MaterialIcon
                      name="minus"
                      color="#fff"
                      size={RFValue(20)}
                    />
                  </ModalMinusButton>
                  <ModalTotalItem>{totalItems}</ModalTotalItem>
                  <ModalAddButton onPress={() => handleAddItem()}>
                    <MaterialIcon name="plus" color="#fff" size={RFValue(20)} />
                  </ModalAddButton>
                </ModalButtonsContainer>
                <ModalAddToCardButton
                  enabled={totalItems > 0}
                  disabled={totalItems === 0}
                  onPress={() => handleAddToCart()}
                >
                  <ModalAddToCardButtonText enabled={totalItems > 0}>
                    Adicionar no carrinho
                  </ModalAddToCardButtonText>
                  <MaterialIcon
                    name="cart-plus"
                    color={totalItems > 0 ? '#fff' : '#999'}
                    size={RFValue(20)}
                  />
                </ModalAddToCardButton>
              </ModalImages>
            </ModalContent>
          </ModalContainer>
        </Modal>
        <Modal isVisible={cartModalOpen}>
          <CartModal closeModal={() => setCartModalOpen(false)} />
        </Modal>
      </Container>
    </LinearGradient>
  );
};

export default Store;
