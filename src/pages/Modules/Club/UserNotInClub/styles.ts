import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #fff;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)};
  font-family: 'Arial';
  color: #e00265;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
`;

export const DescriptionText = styled.Text`
  font-size: ${RFValue(20)};
  font-family: 'Arial';
  height: ${RFValue(63)};
  color: #999;
  width: 80%;
  margin-top: ${RFValue(30)};
  text-align: center;
`;

export const PlayingImage = styled.Image`
  height: ${RFValue(250)};
  width: ${RFValue(250)};
  margin-top: ${RFValue(40)};
`;

export const JoinButton = styled.TouchableOpacity`
  width: 80%;
  background: #f1d72a;
  border-radius: ${RFValue(10)};
  height: ${RFValue(40)};
  align-items: center;
  justify-content: center;
  margin-top: auto;
  margin-bottom: ${RFValue(20)};
`;

export const JoinButtonText = styled.Text`
  font-size: ${RFValue(16)};
  font-family: 'Arial';
  color: #fff;
`;
