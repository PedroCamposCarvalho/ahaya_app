import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialsProps } from '@app/hooks/appointment';
import fonts from '@app/Config/FontFamily';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const BackButton = styled.TouchableOpacity`
  position: relative;
  z-index: 1;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-family: ${fonts.primary};
  font-size: ${RFValue(18)};
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
`;

export const DescriptionText = styled.Text`
  color: #fff;
  font-family: ${fonts.primary};
  font-size: ${RFValue(16)};
`;

export const HousDetailsView = styled.View`
  flex-direction: row;
`;

export const HourContainer = styled.View`
  background: rgba(255, 255, 255, 0.8);
  width: 80%;
  align-self: center;
  margin-top: ${RFValue(20)};
  height: ${RFValue(180)};
  border-radius: ${RFValue(10)};
  justify-content: space-between;
  margin-bottom: ${RFValue(10)};
`;

export const HourDetailsContainer = styled.View`
  padding: ${RFValue(8)}px;
`;

export const HourCourt = styled.Text`
  font-size: ${RFValue(14)};
  font-family: ${fonts.primary};
  margin-top: ${RFValue(8)};
`;

export const HourStartDate = styled.Text`
  font-size: ${RFValue(12)};
  font-family: ${fonts.primary};
  margin-top: ${RFValue(8)};
`;

export const HourFinishDate = styled.Text`
  font-size: ${RFValue(12)};
  font-family: ${fonts.primary};
  margin-top: ${RFValue(8)};
`;

export const HourNumberOfPlayersContainer = styled.View`
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

export const NumberOfPlayersLabel = styled.Text`
  font-size: ${RFValue(12)};
  font-family: ${fonts.primary};
  margin-top: ${RFValue(8)};
`;

export const PlayerAmountContainer = styled.View`
  flex-direction: row;
  width: ${RFValue(80)};
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(10)};
`;

export const NumberOfPlayersAmount = styled.Text``;

export const MaterialsButton = styled.View`
  height: ${RFValue(80)};
  border-bottom-left-radius: ${RFValue(10)};
  border-bottom-right-radius: ${RFValue(10)};
  padding: ${RFValue(8)}px;
`;

export const MaterialsButtonText = styled.Text`
  font-size: ${RFValue(12)};
  font-family: ${fonts.primary};
`;

export const MaterialsList = styled(
  FlatList as new () => FlatList<MaterialsProps>,
)`
  margin-top: ${RFValue(5)};
`;

export const MaterialContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${RFValue(3)}px;
`;

export const MaterialName = styled.Text`
  font-size: ${RFValue(12)};
  font-family: ${fonts.primary};
  width: ${RFValue(50)};
`;

export const MaterialAmount = styled.Text`
  font-size: ${RFValue(12)};
  font-family: ${fonts.primary};
  width: ${RFValue(10)};
`;

export const ContinueButton = styled.TouchableOpacity`
  align-self: center;
  width: 90%;
  background: #006edb;
  margin-bottom: ${RFValue(30)};
  height: ${RFValue(40)};
  border-radius: ${RFValue(10)};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const ContinueButtonText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(14)};
  margin-right: 10px;
`;

export const FinalPriceText = styled.Text`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${RFValue(5)};
  margin-top: ${RFValue(5)};
  color: #fff;
  font-size: ${RFValue(14)};
  font-family: ${fonts.primary};
`;

export const Footer = styled.View`
  z-index: 1;
`;
