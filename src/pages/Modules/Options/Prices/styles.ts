import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Sports, Materials } from './index';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px 30px 40px;
  margin-top: 7%;
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
  margin-top: 50%;
`;

export const BackButton = styled.TouchableOpacity``;

export const TitleContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(16)};
  color: #fff;
`;

export const Content = styled.View`
  margin-top: 20px;
`;

export const SportsList = styled(FlatList as new () => FlatList<Sports>)`
  padding: 32px 24px 16px;
`;

export const ItemContainer = styled.View`
  justify-content: center;
  margin-top: 10px;
  flex-direction: row;
`;

export const ItemTitle = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  color: #fff;
  width: 80%;
`;

export const ItemDescription = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  color: #fff;
  margin-left: auto;
`;

export const MaterialsList = styled(FlatList as new () => FlatList<Materials>)`
  padding: 32px 24px 16px;
`;

export const MaterialsContainer = styled.View`
  align-items: center;
`;

export const MaterialsTitle = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(16)};
  color: #fff;
  margin-top: 20px;
`;

export const MaterialsItem = styled.View`
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
`;

export const MaterialsDescription = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFPercentage(1.5)};
`;

export const MaterialSport = styled.Text`
  margin-left: auto;
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFPercentage(1.5)};
`;
