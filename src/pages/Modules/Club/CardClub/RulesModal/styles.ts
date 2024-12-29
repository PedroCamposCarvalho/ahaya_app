import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RulesProps } from './index';

export const Container = styled.View`
  height: ${RFValue(450)};
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
  margin-top: ${RFValue(20)};
  height: ${RFValue(380)};
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
