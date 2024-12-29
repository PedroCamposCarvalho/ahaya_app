import styled from 'styled-components/native';
import { Keyboard } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const HeaderBackButton = styled.TouchableOpacity`
  margin-left: ${RFValue(10)};
  padding-bottom: 3px;
`;

export const Header = styled.View`
  padding-top: ${getStatusBarHeight() + 22}px;
  background: #fff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TitleView = styled.View`
  width: 100%;
  align-items: center;
  position: relative;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)};
  font-family: 'Arial';
  color: #e00265;
  padding-bottom: 3px;
  margin-right: ${RFValue(70)};
`;

export const DescriptionText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  margin-bottom: 10px;
`;

export const Content = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

export const ContinueButton = styled.TouchableOpacity`
  width: 80%;
  background: #99d420;
  border-radius: ${RFValue(10)};
  height: ${RFValue(40)};
  align-items: center;
  justify-content: center;
  margin-top: auto;
  margin-bottom: ${RFValue(20)};
  align-self: center;
`;

export const ContinueButtonText = styled.Text`
  font-size: ${RFValue(16)};
  font-family: 'Arial';
  color: #fff;
`;
