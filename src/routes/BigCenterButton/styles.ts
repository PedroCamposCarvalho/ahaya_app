import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  height: 64;
  width: 64;
  border-radius: 32;
  background: transparent;
  justify-content: center;
  align-items: center;
`;

export const InnerContainer = styled.View`
  height: ${RFValue(60)};
  width: ${RFValue(60)};
  border-radius: ${RFValue(50)};
  background: #006edb;
  justify-content: center;
  align-items: center;
  margin-bottom: ${RFValue(4)};
`;

export const HiddenBox = styled.View`
  height: 48;
  width: 100;
  background: transparent;
  position: absolute;
  bottom: 0;
`;
