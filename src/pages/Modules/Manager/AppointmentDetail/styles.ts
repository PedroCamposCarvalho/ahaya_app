import styled from 'styled-components/native';
import { Platform, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { MaterialsProps } from './index';

interface CancelButtonProps {
  enabled: boolean;
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 40px 30px ${Platform.OS === 'android' ? 150 : 0}px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  width: 70%;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 60%;
`;

export const BackButton = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-family: 'Arial';
  font-size: 16px;
  color: #fff;
  margin-left: auto;
`;

export const Content = styled.View`
  margin-top: 20px;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const ItemTitle = styled.Text`
  font-family: 'Arial';
  font-size: ${RFPercentage(2)};
  color: #99d420;
`;

export const ItemDescription = styled.Text`
  font-family: 'Arial';
  margin-left: auto;
  font-size: ${RFPercentage(1.6)};
  color: #fff;
`;

export const MaterialsContainer = styled.View`
  margin-top: 20px;
`;

export const MaterialsTitle = styled.Text`
  font-family: 'Arial';
  font-size: 18px;
  color: #99d420;
`;

export const MaterialsList = styled(
  FlatList as new () => FlatList<MaterialsProps>,
)`
  padding: 32px 24px 16px;
`;

export const MaterialsContent = styled.View`
  flex-direction: row;
  align-items: center;
  width: 80%;
  margin-top: 5px;
`;

export const MaterialsDescription = styled.Text`
  font-family: 'Arial';
  color: #99d420;
  font-size: 16px;
`;

export const MaterialsAmount = styled.Text`
  font-family: 'Arial';
  color: #fff;
  margin-left: auto;
  font-size: 16px;
`;

export const OptionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: red;
`;

export const EditAppointmentButton = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  background: #d5b60a;
  padding: 10px;
  border-radius: 10px;
  width: 150px;
`;

export const EditAppointmentText = styled.Text`
  color: #fff;
  font-family: 'Arial';
`;

export const CancelAppointmentButton = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  background: #c53030;
  padding: 10px;
  border-radius: 10px;
  width: 150px;
`;

export const CancelAppointmentText = styled.Text`
  color: #fff;
  font-family: 'Arial';
`;

export const WhatsAppButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
`;
