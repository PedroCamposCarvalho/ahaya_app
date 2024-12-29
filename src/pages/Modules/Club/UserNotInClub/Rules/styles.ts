import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RulesProps } from './index';

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

export const Content = styled.View`
  flex: 1;
  align-items: center;
`;

export const DescriptionText = styled.Text`
  font-size: ${RFValue(20)};
  font-family: 'Arial';
  height: ${RFValue(130)};
  color: #999;
  width: 90%;
  margin-top: ${RFValue(30)};
  text-align: center;
`;

export const RulesList = styled(FlatList as new () => FlatList<RulesProps>)`
  width: 100%;
`;

export const RuleContainer = styled.View`
  flex-direction: row;
  width: 90%;
  align-self: center;
  margin-bottom: ${RFValue(20)};
`;

export const RuleNumber = styled.Text`
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  color: #e00265;
`;

export const RuleDescription = styled.Text`
  font-size: ${RFValue(16)};
  font-family: 'Arial';
  color: #999;
`;

export const ContinueButton = styled.TouchableOpacity`
  width: 80%;
  background: #f1d72a;
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
