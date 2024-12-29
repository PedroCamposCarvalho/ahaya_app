import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  padding-top: ${getStatusBarHeight() + 24}px;
  width: 100%;
`;
export const Header = styled.View`
  flex-direction: column;
  padding-left: ${RFValue(32)};
  padding-right: ${RFValue(32)};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(16)};
`;

export const ScoreView = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const ScoreLabel = styled.Text`
  margin-right: auto;
  color: #fff;
  font-size: ${RFValue(20)};
`;

export const SeeHistoryButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: ${RFValue(8)};
`;

export const SeeHistoryButtonText = styled.Text`
  margin-left: ${RFValue(4)};
  font-size: ${RFValue(14)};
  color: #fff;
  text-decoration: underline;
  text-decoration-color: #fff;
`;

export const Content = styled.View`
  flex: 1;
  margin-top: ${RFValue(16)};
  align-items: center;
  padding-top: ${RFValue(8)};
  height: 100%;
`;

export const ContentTitle = styled.Text`
  font-size: ${RFValue(16)};
  color: #fff;
`;

export const ModuleContainer = styled.View`
  width: 80%;
  align-items: center;
  flex-direction: row;
  padding-left: ${RFValue(16)};
  margin-top: ${RFValue(16)};
`;

export const ModuleImage = styled.Image`
  height: ${RFValue(80)};
  width: ${RFValue(80)};
`;

export const ModuleContent = styled.View`
  height: 100%;
  width: 100%;
  padding-top: ${RFValue(4)};
  margin-left: ${RFValue(8)};
`;

export const ModuleName = styled.Text`
  color: #fff;
  font-size: ${RFValue(18)};
`;

export const ModuleDescription = styled.Text`
  width: 80%;
  color: #ccc;
`;
