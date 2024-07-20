import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { shade } from 'polished';

interface SendButtonProps {
  enabled: boolean;
}

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

export const Content = styled.View`
  flex: 1;
  margin-top: ${RFValue(20)};
`;

export const TitleInputView = styled.View`
  width: 80%;
  height: ${RFValue(50)}px;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  border-width: 0.5px;
  border-color: #ccc;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

export const MessageInputView = styled.View`
  width: 80%;
  height: ${RFValue(200)}px;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  border-width: 0.5px;
  border-color: #ccc;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

export const Input = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: ${RFValue(14)};
  padding: 0;
  font-family: 'Arial';
`;

export const Icon = styled(MaterialIcon)`
  margin-right: 16px;
`;

export const SendButton = styled.TouchableOpacity<SendButtonProps>`
  background: ${props => (props.enabled ? '#273a9a' : 'rgba(255,255,255,0.1)')};
  margin-bottom: ${RFValue(30)};
  border-width: 0.5px;
  border-color: #ccc;
  width: 80%;
  height: ${RFValue(40)};
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(10)};
`;

export const SendButtonText = styled.Text<SendButtonProps>`
  font-family: 'Arial';
  font-size: ${RFValue(14)};
  color: ${props => (props.enabled ? '#fff' : 'rgba(255,255,255,0.3)')};
`;
