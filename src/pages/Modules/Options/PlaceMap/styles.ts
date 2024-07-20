import styled from 'styled-components/native';
import { Platform, FlatList } from 'react-native';
import { shade } from 'polished';

import { CreditCards } from './index';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const ImageView = styled.View`
  flex: 1;
  position: absolute;
  margin-top: 40%;
`;
