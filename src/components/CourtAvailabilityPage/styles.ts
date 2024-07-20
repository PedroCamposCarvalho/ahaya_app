import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  align-self: center;
  width: 90%;
  background: #fff;
  padding: 16px;
  border-radius: 15px;
  margin-bottom: 15px;
`;

export const LoadingContainer = styled.View`
  height: 60px;
  margin-top: 5px;
`;

export const CourtContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CourtName = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: 16px;
`;

export const AddToCartButton = styled(RectButton)`
  padding: 4px;
`;
