import styled from 'styled-components/native';
import { shade } from 'polished';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { Sports, Materials } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const TitleView = styled.View`
  width: 100%;
  align-items: center;
  position: relative;
`;

export const Title = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: 20px;
  margin-right: 50px;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 70%;
`;
export const Content = styled.ScrollView`
  margin-top: 20px;
  width: 90%;
  align-self: center;
`;

export const TermsText = styled.Text`
  color: #fff;
  font-size: ${RFValue(16)};
  font-family: 'Arial';
  text-align: justify;
`;
