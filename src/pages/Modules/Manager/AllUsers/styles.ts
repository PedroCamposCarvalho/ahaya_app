import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Colors from '@app/Config/Colors';

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

export const TitleView = styled.View`
  width: 100%;
  align-items: center;
  position: relative;
`;

export const HeaderTitle = styled.Text`
  color: ${Colors.white};
  font-family: 'Arial';
  font-size: 20px;
  margin-right: 50px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const UserContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: 90%;
  background: rgba(255,255,255,0.5)
  align-self: center;
  justify-content: space-around;
  padding: 16px;
  border-radius: 15px;
  margin-bottom: 15px;
  align-items: center;
`;

export const UserName = styled.Text`
  font-family: 'Arial';
  margin-left: 10px;
  color: #fff;
  width: 70%;
`;

export const UserPhoto = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const SearchInputContainer = styled.View`
  align-self: center;
  height: 50px;
  width: 80%;
  background: ${Colors.primary}
  margin-top: 20px;
  flex-direction: row;
  padding: 12px;
  border-radius: 15px;
  align-items:center
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: 10px;
  padding: 0;
  color: #fff;
`;

export const RemoveSearchTextButton = styled.TouchableOpacity``;

export const UserVIPContainer = styled.View`
  margin-left: 10px;
  right: 0;
`;

export const UserTotalContainer = styled.View`
  align-self: center;
  width: 80%;
  margin-top: 15px;
`;

export const UserTotalText = styled.Text`
  font-family: 'Arial';
  color: #fff;
`;
