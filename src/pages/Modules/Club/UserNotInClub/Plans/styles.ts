import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { PlansProps } from './index';

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
  color: #139fd4;
  width: 90%;
  margin-top: ${RFValue(30)};
  text-align: center;
`;

export const PlansList = styled(FlatList as new () => FlatList<PlansProps>)`
  width: 100%;
`;

export const PlanContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: 60%;
  align-self: center;
  align-items: center;
  justify-content: space-around;
  margin-bottom: ${RFValue(20)};
  border-radius: ${RFValue(10)};
  background: #ccc;
  padding: 16px 0;
`;

export const PlanContent = styled.View``;

export const PlanDuration = styled.Text`
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  color: #fff;
  margin-bottom: ${RFValue(10)};
`;

export const PlanValue = styled.Text`
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  color: #fff;
`;

export const PlanContinueFakeButton = styled.View``;
