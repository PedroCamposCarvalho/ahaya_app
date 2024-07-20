/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';
import {
  Container,
  LoadingContainer,
  PullToRefreshText,
  PurchasesList,
  PurchaseContainer,
  PurchaseDetails,
  PurchaseItemContainer,
  PurchaseItemTitle,
  PurchaseProduct,
  PurchaseAmount,
  PurchasePricePaid,
  PurchaseRetrievedContainer,
  PurchaseRetrievedTitle,
  PurchaseRetrievedImage,
} from './styles';

export interface PurchaseProps {
  id: string;
  product: string;
  id_product: string;
  amount: number;
  price_paid: number;
  retrieved: boolean;
}

const Store: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState<PurchaseProps[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    api.get(`/store/findUserPurchases?id_user=${user.id}`).then(response => {
      setPurchases(response.data);
    });
    setLoading(false);
  }, [user]);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    api.get(`/store/findUserPurchases?id_user=${user.id}`).then(response => {
      setPurchases(response.data);
    });
    setLoading(false);
  }, [user]);

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

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#99d420" size="large" />
          </LoadingContainer>
        ) : (
          <PurchasesList
            refreshControl={
              <RefreshControl
                tintColor="#99d420"
                colors={['#99d420']}
                refreshing={loading}
                onRefresh={() => handleRefresh()}
              />
            }
            data={purchases}
            keyExtractor={purchase => purchase.id}
            renderItem={({ item: purchase }) => (
              <PurchaseContainer>
                <PurchaseDetails>
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

export default Store;
