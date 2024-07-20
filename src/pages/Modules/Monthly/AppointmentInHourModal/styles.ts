import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  height: ${RFValue(360)};
  background: #fff;
  border-radius: ${RFValue(40)};
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  width: 80%;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(18)};
  color: #999;
`;

export const HeaderButton = styled.TouchableOpacity`
  height: ${RFValue(25)};
  width: ${RFValue(25)};
  align-items: center;
  justify-content: center;
  background: #c53030;
  border-radius: ${RFValue(14)};
`;

export const Content = styled.View`
  width: 80%;
  margin-top: ${RFValue(20)};
`;

export const DescriptionText = styled.Text`
  margin-top: ${RFValue(20)};
  color: #999;
  width: 100%;
  font-size: ${RFValue(16)};
`;
