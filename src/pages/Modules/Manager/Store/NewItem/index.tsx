import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FakeCurrencyInput } from 'react-native-currency-input';
import LinearGradient from 'react-native-linear-gradient';
import {
  Container,
  Header,
  BackButton,
  Title,
  Content,
  ProductInputView,
  InventoryInputView,
  DescriptionInputView,
  Input,
  Icon,
  SaveButton,
  SaveButtonText,
} from './styles';
import api from '../../../../../services/api';

interface RouteParams {
  getProducts: () => void;
}

const NewItem: React.FC = () => {
  const [name, setName] = useState('');
  const [inventory, setInventory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { getProducts } = route.params as RouteParams;

  const handleSubmit = useCallback(() => {
    if (name === '' || inventory === '' || description === '' || price === 0) {
    } else {
      setLoading(true);
      api
        .post('/store/createProduct', {
          product: name,
          description,
          inventory,
          price,
        })
        .then(response => {
          getProducts();
          navigation.goBack();
        });
    }
  }, [name, inventory, description, price, navigation, getProducts]);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-down" color="#fff" size={RFValue(20)} />
          </BackButton>
          <Title>Novo produto</Title>
        </Header>
        <Content>
          <ProductInputView>
            <Input
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Nome"
              placeholderTextColor="#999"
            />
          </ProductInputView>
          <InventoryInputView>
            <Input
              value={inventory}
              onChangeText={text => setInventory(text)}
              placeholder="Quantidade no estoque"
              placeholderTextColor="#999"
              keyboardType="numeric"
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
            value={price}
            onChangeValue={value => (value ? setPrice(value) : setPrice(0))}
            unit="R$ "
            delimiter="."
            separator=","
            precision={2}
          />
          <DescriptionInputView>
            <Input
              multiline
              value={description}
              onChangeText={text => setDescription(text)}
              placeholder="Descrição"
              placeholderTextColor="#999"
            />
          </DescriptionInputView>
        </Content>
        <SaveButton onPress={() => handleSubmit()}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <SaveButtonText>Salvar</SaveButtonText>
          )}
        </SaveButton>
      </Container>
    </LinearGradient>
  );
};

export default NewItem;
