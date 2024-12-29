import styled from 'styled-components/native';
import { Platform, FlatList } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { shade } from 'polished';

import { CreditCards } from './index';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px 40px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #ffffff;
  font-family: 'Arial';
  margin: 24px 0 24px;
`;

export const CreditCardList = styled(
  FlatList as new () => FlatList<CreditCards>,
)`
  padding: 32px 24px 16px;
`;

export const CreditCardContainer = styled.View`
  background: ${shade(0.25, '#32312f')};
  padding: 8px 16px;
  border-radius: 10px;
  flex-direction: row;
`;

export const DigitsText = styled.Text`
  font-size: ${RFValue(20)};
  color: #ffffff;
  font-family: 'Arial';
  margin: 10px 5px;
`;

export const SlideToDeleteText = styled.Text`
  font-size: 16px;
  color: #ffffff;
  font-family: 'Arial';
`;
