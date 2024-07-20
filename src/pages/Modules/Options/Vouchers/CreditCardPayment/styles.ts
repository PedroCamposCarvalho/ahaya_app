import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  margin-top: 50%;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #32312f;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const BackButton = styled(RectButton)`
  margin-right: auto;
`;

export const HeaderTitle = styled.Text`
  color: #f5ede8;
  font-family: 'Arial';
  font-size: 20px;
  margin-right: auto;
`;

export const PageDescription = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Arial';
  text-align: center;
  margin-top: 20px;
`;

export const CreditCardTitle = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: 24px;
  margin: 0 24px 24px;
`;

export const CreditCardContainer = styled.View`
  margin-top: 20px;
`;
