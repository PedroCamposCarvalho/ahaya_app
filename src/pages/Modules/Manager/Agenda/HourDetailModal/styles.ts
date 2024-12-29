import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '@app/Config/Colors';
import getCourtProps from '../../../../../utils/getCourtProps';
import { MaterialsProps } from './index';

export const Container = styled.View`
  height: 500px;
  background: #fff;
  border-radius: 50px;
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  width: 80%;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(18)};
  color: #999;
`;

export const CloseButton = styled.TouchableOpacity`
  height: ${RFValue(30)};
  width: ${RFValue(30)};
  align-items: center;
  justify-content: center;
  background: #c53030;
  border-radius: ${RFValue(50)};
`;

export const Content = styled.View`
  width: 80%;
  padding-top: ${RFValue(10)};
`;

export const ItemContent = styled.View`
  flex-direction: row;
  margin-top: ${RFValue(7)};
`;

export const ItemTitle = styled.Text`
  width: ${RFValue(100)};
  color: #999;
`;

export const ItemValue = styled.Text`
  color: #999;
`;

export const MaterialsList = styled(
  FlatList as new () => FlatList<MaterialsProps>,
)``;

export const MaterialName = styled.Text`
  color: #999;
  width: ${RFValue(70)};
`;

export const MaterialAmount = styled.Text`
  color: #999;
`;

export const WhatsAppButton = styled.TouchableOpacity`
  height: ${RFValue(40)};
  width: ${RFValue(40)};
  background: #25d366;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(40)};
  align-self: center;
  margin-top: ${RFValue(40)};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 10%;
  align-items: center;
  justify-content: space-between;
`;

export const EditButton = styled.TouchableOpacity`
  background: #239be4;
  width: 45%;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(5)};
`;

export const DeleteButton = styled.TouchableOpacity`
  background: ${Colors.red};
  width: 45%;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(5)};
`;

export const ButtonText = styled.Text`
  color: #fff;
`;
