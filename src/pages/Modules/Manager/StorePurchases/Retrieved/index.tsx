/* eslint-disable prefer-const */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../../../../services/api';
import {
  Container,
  LoadingContainer,
  PurchaseList,
  PurchaseDetails,
  PurchaseContainer,
  PurchaseItemContainer,
  PurchaseItemTitle,
  PurchaseProduct,
  PurchaseAmount,
  PurchasePricePaid,
  PurchaseRetrievedContainer,
  PurchaseRetrievedTitle,
  PurchaseRetrievedImage,
  PullToRefreshText,
  ModalContainer,
  ModalHeader,
  ModalHeaderTitle,
  ModalHeaderButton,
  ModalContent,
  ModalDescription,
  ModalButtonsContainer,
  ModalButtonContent,
  ModalButton,
  ModalButtonDescription,
  ModalUpdateButton,
  ModalUpdateButtonText,
} from './styles';

export interface PurchasesProps {
  id: string;
  product: string;
  id_product: string;
  amount: number;
  price_paid: number;
  retrieved: boolean;
  name: string;
}

const Retrieved: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState<PurchasesProps[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [purchaseProps, setPurchaseProps] = useState<PurchasesProps>(
    {} as PurchasesProps,
  );

  useEffect(() => {
    api.get('/store/findRetrievedPurchases').then(response => {
      setPurchases(response.data);
    });
    setLoading(false);
  }, []);

  const handleRefresh = useCallback(() => {
    api.get('/store/findRetrievedPurchases').then(response => {
      setPurchases(response.data);
    });
  }, []);

  const handleOpenModal = useCallback((purchase: PurchasesProps) => {
    setPurchaseProps(purchase);
    setModalOpened(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpened(false);
    api.get('/store/findRetrievedPurchases').then(response => {
      setPurchases(response.data);
    });
  }, []);

  const handleRetrieveProduct = useCallback(() => {
    api
      .put(`/store/updateRetrievedFlag?id=${purchaseProps.id}`)
      .then(response => {
        setModalOpened(false);
        handleRefresh();
      });
  }, [purchaseProps, handleRefresh]);

  function formatPrice(price: string): string {
    const splitString = price.split('.');
    if (splitString.length > 1) {
      if (splitString[1].length === 1) {
        return `R$ ${splitString[0]},${splitString[1]}0`;
      }
      return `R$ ${splitString[0]},${splitString[1]}`;
    }

    return `R$ ${price},00`;
  }

  function formatClientName(name: string): string {
    const stringSplit = name.split(' ');
    return `${stringSplit[0]} ${stringSplit[1]}`;
  }

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#fff" size="large" />
          </LoadingContainer>
        ) : (
          <PurchaseList
            refreshControl={
              <RefreshControl
                tintColor="#fff"
                colors={['#fff']}
                refreshing={loading}
                onRefresh={() => handleRefresh()}
              />
            }
            data={purchases}
            keyExtractor={purchase => purchase.id}
            renderItem={({ item: purchase }) => (
              <PurchaseContainer onPress={() => handleOpenModal(purchase)}>
                <PurchaseDetails>
                  <PurchaseItemContainer>
                    <PurchaseItemTitle>Cliente:</PurchaseItemTitle>
                    <PurchaseProduct>
                      {formatClientName(purchase.name)}
                    </PurchaseProduct>
                  </PurchaseItemContainer>
                  <PurchaseItemContainer>
                    <PurchaseItemTitle>Produto:</PurchaseItemTitle>
                    <PurchaseProduct>{purchase.product}</PurchaseProduct>
                  </PurchaseItemContainer>
                  <PurchaseItemContainer>
                    <PurchaseItemTitle>Qtd.:</PurchaseItemTitle>
                    <PurchaseAmount>{purchase.amount}</PurchaseAmount>
                  </PurchaseItemContainer>
                  <PurchaseItemContainer>
                    <PurchaseItemTitle>Valor pago:</PurchaseItemTitle>
                    <PurchasePricePaid>
                      {formatPrice(String(purchase.price_paid))}
                    </PurchasePricePaid>
                  </PurchaseItemContainer>
                </PurchaseDetails>
                <PurchaseRetrievedContainer>
                  <PurchaseRetrievedTitle>Retirado?</PurchaseRetrievedTitle>
                  <PurchaseRetrievedImage>
                    {purchase.retrieved ? (
                      <FeatherIcon
                        name="check-circle"
                        color="#04d461"
                        size={RFValue(20)}
                      />
                    ) : (
                      <FeatherIcon
                        name="minus-circle"
                        color="#c53030"
                        size={RFValue(20)}
                      />
                    )}
                  </PurchaseRetrievedImage>
                </PurchaseRetrievedContainer>
              </PurchaseContainer>
            )}
          />
        )}

        <PullToRefreshText>Arraste para baixo para atualizar</PullToRefreshText>
      </Container>
    </LinearGradient>
  );
};

export default Retrieved;
