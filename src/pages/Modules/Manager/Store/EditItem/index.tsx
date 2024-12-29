import React, { useEffect, useCallback, useState, useMemo } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FakeCurrencyInput } from 'react-native-currency-input';
import ImagePicker from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../../../../services/api';
import {
  Container,
  Header,
  BackButton,
  Title,
  DeleteButton,
  Content,
  ProductInputView,
  InventoryInputView,
  DescriptionInputView,
  Input,
  Icon,
  ImagesContainer,
  ImageButton,
  ImageButtonText,
  SaveButton,
  SaveButtonText,
} from './styles';

interface RouteParams {
  id_product: string;
  getProducts: () => void;
}

interface ProductProps {
  id: string;
  product: string;
  description: string;
  price: number;
  inventory: number;
  image1: string;
  image2: string;
  image3: string;
}

const EditItem: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductProps>({} as ProductProps);
  const navigation = useNavigation();
  const route = useRoute();
  const { id_product, getProducts } = route.params as RouteParams;
  const image1 = new FormData();

  useEffect(() => {
    api.get(`/store/findById?id_product=${id_product}`).then(response => {
      setProduct(response.data);
    });
  }, [id_product]);

  const handleSubmit = useCallback(() => {
    if (
      product.product === '' ||
      product.inventory === 0 ||
      product.description === '' ||
      product.price === 0
    ) {
    } else {
      setLoading(true);
      api.put('/store/updateProduct', product).then(response => {
        getProducts();
        navigation.goBack();
      });
    }
  }, [product, getProducts, navigation]);

  const handleNameChange = useCallback(
    (productName: string) => {
      const newItem = {
        id: product.id,
        product: productName,
        description: product.description,
        price: product.price,
        inventory: product.inventory,
        image1: product.image1,
      };
      setProduct(newItem);
    },
    [product],
  );

  const handleInventoryChange = useCallback(
    (newInventory: string) => {
      const newItem = {
        id: product.id,
        product: product.product,
        description: product.description,
        price: product.price,
        inventory: Number(newInventory),
        image1: product.image1,
      };
      setProduct(newItem);
    },
    [product],
  );

  const handlePriceChange = useCallback(
    (newPrice: number) => {
      const newItem = {
        id: product.id,
        product: product.product,
        description: product.description,
        price: newPrice,
        inventory: product.inventory,
        image1: product.image1,
      };
      setProduct(newItem);
    },
    [product],
  );

  const handleDescriptionChange = useCallback(
    (newDescription: string) => {
      const newItem = {
        id: product.id,
        product: product.product,
        description: newDescription,
        price: product.price,
        inventory: product.inventory,
        image1: product.image1,
      };
      setProduct(newItem);
    },
    [product],
  );

  const handleDeleteProduct = useCallback(() => {
    Alert.alert(
      'Excluir produto',
      'Deseja salvar esse cartão para futuras compras?',
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          onPress: () => {
            setLoading(true);
            api
              .delete(`/store/deleteProduct?id_product=${product.id}`)
              .then(() => {
                WToast.show(productDeletedToastOpts);
                getProducts();
                navigation.goBack();
              });
          },
        },
      ],
      { cancelable: false },
    );
  }, [product, getProducts, navigation, productDeletedToastOpts]);

  const handleUpdateImage1 = useCallback(() => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ).then(result => {
      if (result === String('granted')) {
        request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA,
        ).then(result2 => {
          if (result2 === String('granted')) {
            ImagePicker.showImagePicker(
              {
                title: 'Selecione um foto',
                cancelButtonTitle: 'Cancelar',
                takePhotoButtonTitle: 'Usar câmera',
                chooseFromLibraryButtonTitle: 'Escolher da galeria',
              },
              responseImage => {
                if (responseImage.didCancel) {
                  return;
                }

                if (responseImage.error) {
                  Alert.alert('Erro ao atualizar a foto.');
                }

                const data = new FormData();

                data.append('image1', {
                  type: 'image/jpeg',
                  name: `${product.id}.jpg`,
                  uri: responseImage.uri,
                });

                api
                  .patch(`/store/updateImage1?id=${product.id}`, data)
                  .then(response => {
                    api
                      .get(`/store/findById?id_product=${id_product}`)
                      .then(response2 => {
                        setProduct(response2.data);
                      });
                  });
              },
            );
          } else {
            WToast.show(permissionDeniedToastOpts);
          }
        });
      } else {
        WToast.show(permissionDeniedToastOpts);
      }
    });
  }, [product, permissionDeniedToastOpts, id_product]);

  const handleUpdateImage2 = useCallback(() => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ).then(result => {
      if (result === String('granted')) {
        request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA,
        ).then(result2 => {
          if (result2 === String('granted')) {
            ImagePicker.showImagePicker(
              {
                title: 'Selecione um foto',
                cancelButtonTitle: 'Cancelar',
                takePhotoButtonTitle: 'Usar câmera',
                chooseFromLibraryButtonTitle: 'Escolher da galeria',
              },
              responseImage => {
                if (responseImage.didCancel) {
                  return;
                }

                if (responseImage.error) {
                  Alert.alert('Erro ao atualizar a foto.');
                }

                const data = new FormData();

                data.append('image2', {
                  type: 'image/jpeg',
                  name: `${product.id}.jpg`,
                  uri: responseImage.uri,
                });

                api
                  .patch(`/store/updateImage2?id=${product.id}`, data)
                  .then(response => {
                    api
                      .get(`/store/findById?id_product=${id_product}`)
                      .then(response2 => {
                        setProduct(response2.data);
                      });
                  });
              },
            );
          } else {
            WToast.show(permissionDeniedToastOpts);
          }
        });
      } else {
        WToast.show(permissionDeniedToastOpts);
      }
    });
  }, [product, permissionDeniedToastOpts, id_product]);

  const handleUpdateImage3 = useCallback(() => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ).then(result => {
      if (result === String('granted')) {
        request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA,
        ).then(result2 => {
          if (result2 === String('granted')) {
            ImagePicker.showImagePicker(
              {
                title: 'Selecione um foto',
                cancelButtonTitle: 'Cancelar',
                takePhotoButtonTitle: 'Usar câmera',
                chooseFromLibraryButtonTitle: 'Escolher da galeria',
              },
              responseImage => {
                if (responseImage.didCancel) {
                  return;
                }

                if (responseImage.error) {
                  Alert.alert('Erro ao atualizar a foto.');
                }

                const data = new FormData();

                data.append('image3', {
                  type: 'image/jpeg',
                  name: `${product.id}.jpg`,
                  uri: responseImage.uri,
                });

                api
                  .patch(`/store/updateImage3?id=${product.id}`, data)
                  .then(response => {
                    api
                      .get(`/store/findById?id_product=${id_product}`)
                      .then(response2 => {
                        setProduct(response2.data);
                      });
                  });
              },
            );
          } else {
            WToast.show(permissionDeniedToastOpts);
          }
        });
      } else {
        WToast.show(permissionDeniedToastOpts);
      }
    });
  }, [product, permissionDeniedToastOpts, id_product]);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="never"
        >
          <Container>
            <Header>
              <BackButton onPress={() => navigation.goBack()}>
                <FeatherIcon
                  name="chevron-down"
                  color="#fff"
                  size={RFValue(20)}
                />
              </BackButton>
              <Title>Editar produto</Title>
              <DeleteButton onPress={() => handleDeleteProduct()}>
                <FeatherIcon name="trash-2" color="#fff" size={RFValue(20)} />
              </DeleteButton>
            </Header>
            <Content>
              <ProductInputView>
                <Input
                  value={product.product}
                  onChangeText={text => handleNameChange(text)}
                  placeholder="Nome"
                  placeholderTextColor="#999"
                />
              </ProductInputView>
              <InventoryInputView>
                <Input
                  value={String(product.inventory)}
                  onChangeText={text => handleInventoryChange(text)}
                  placeholder="Quantidade no estoque"
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </InventoryInputView>
              <FakeCurrencyInput
                containerStyle={{
                  width: '80%',
                  height: RFValue(50),
                  paddingRight: 16,
                  paddingLeft: 16,
                  backgroundColor: '#ccc',
                  borderRadius: 8,
                  marginBottom: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
                style={{
                  color: '#000',
                  fontSize: RFValue(14),
                  fontFamily: 'Arial',
                }}
                value={product.price}
                onChangeValue={value =>
                  value ? handlePriceChange(value) : handlePriceChange(0)
                }
                unit="R$ "
                delimiter="."
                separator=","
                precision={2}
              />
              <DescriptionInputView>
                <Input
                  multiline
                  value={product.description}
                  onChangeText={text => handleDescriptionChange(text)}
                  placeholder="Descrição"
                  placeholderTextColor="#999"
                />
              </DescriptionInputView>
              <ImagesContainer>
                <ImageButton onPress={handleUpdateImage1}>
                  {product.image1 ? (
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                        borderRadius: RFValue(10),
                      }}
                      source={{
                        uri: product.image1,
                      }}
                    />
                  ) : (
                    <>
                      <FeatherIcon
                        name="camera"
                        color="#999"
                        size={RFValue(20)}
                      />
                      <ImageButtonText>Foto 1</ImageButtonText>
                    </>
                  )}
                </ImageButton>
                <ImageButton onPress={handleUpdateImage2}>
                  {product.image2 ? (
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                        borderRadius: RFValue(10),
                      }}
                      source={{
                        uri: product.image2,
                      }}
                    />
                  ) : (
                    <>
                      <FeatherIcon
                        name="camera"
                        color="#999"
                        size={RFValue(20)}
                      />
                      <ImageButtonText>Foto 2</ImageButtonText>
                    </>
                  )}
                </ImageButton>
              </ImagesContainer>
              <ImageButton onPress={handleUpdateImage3}>
                {product.image3 ? (
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                      borderRadius: RFValue(10),
                    }}
                    source={{
                      uri: product.image3,
                    }}
                  />
                ) : (
                  <>
                    <FeatherIcon
                      name="camera"
                      color="#999"
                      size={RFValue(20)}
                    />
                    <ImageButtonText>Foto 2</ImageButtonText>
                  </>
                )}
              </ImageButton>
              <SaveButton onPress={() => handleSubmit()}>
                {loading ? (
                  <ActivityIndicator color="#32312f" size="small" />
                ) : (
                  <SaveButtonText>Salvar alterações</SaveButtonText>
                )}
              </SaveButton>
            </Content>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default EditItem;
