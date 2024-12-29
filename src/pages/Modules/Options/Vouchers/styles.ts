import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { VoucherProps } from './index';

export const Container = styled.View`
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

export const BackButton = styled.TouchableOpacity`
  position: relative;
  z-index: 1;
`;

export const HeaderTitle = styled.Text`
  color: #f5ede8;
  font-family: 'Arial';
  font-size: 20px;
`;

export const OptionsButton = styled(RectButton)``;

export const Badge = styled.View`
  height: 15px;
  width: 15px;
  border-radius: 20px;
  background: red;
  position: absolute;
  margin-left: 20px;
  margin-top: -5px;
  align-items: center;
  justify-content: center;
`;

export const BadgeText = styled.Text`
  color: #fff;
  font-size: 8px;
`;

export const Content = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const DescriptionContainer = styled.View`
  flex-direction: column;
  padding: 10px;
  width: 100%;
`;

export const DescriptionText = styled.Text`
  color: #f5ede8;
  font-family: 'Arial';
  font-size: 18px;
  margin-right: 50px;
  width: 100%;
`;

export const LittleDescriptionContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
`;

export const LittleDescriptionText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-family: 'Arial';
  margin-right: 10px;
`;

export const VouchersList = styled(
  FlatList as new () => FlatList<VoucherProps>,
)`
  margin-top: 10%;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const VoucherButton = styled.TouchableOpacity`
  height: ${RFValue(140)};
  width: ${RFValue(140)};
  justify-content: center;
  padding: 8px;
`;

export const PercentageText = styled.Text`
  font-size: ${RFValue(40)};
  color: purple;
  font-family: 'Arial';
  margin-bottom: 30px;
  align-self: center;
  margin-top: 20px;
`;

export const SportTitle = styled.Text`
  align-self: center;
  margin-top: 5px;
  color: purple;
`;

export const OffText = styled.Text`
  color: purple;
  margin-top: -20px;
  align-self: center;
`;

export const Description = styled.Text`
  margin-top: auto;
  margin-bottom: 10px;
  color: #fff;
  text-align: center;
`;
