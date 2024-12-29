import styled from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10%;
`;

export const BackButton = styled.TouchableOpacity`
  margin-left: 20px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)};
  color: #fff;
  font-family: 'Arial';
`;

export const DeleteButton = styled.TouchableOpacity`
  margin-right: 20px;
`;

export const Content = styled.ScrollView`
  flex: 1;
  margin-top: ${RFValue(30)};
`;

export const ProductInputView = styled.View`
  width: 80%;
  height: ${RFValue(50)}px;
  padding: 0 16px;
  background: #ccc;
  border-radius: 10px;
  border-width: 2px;
  border-color: #ccc;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

export const InventoryInputView = styled.View`
  width: 80%;
  height: ${RFValue(50)}px;
  padding: 0 16px;
  background: #ccc;
  border-radius: 10px;
  border-width: 2px;
  border-color: #ccc;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

export const DescriptionInputView = styled.View`
  width: 80%;
  height: ${RFValue(200)}px;
  padding: 0 16px;
  background: #ccc;
  border-radius: 10px;
  border-width: 2px;
  border-color: #ccc;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

export const Input = styled.TextInput`
  flex: 1;
  color: #000;
  font-size: 16px;
  padding: 0;
  font-family: 'Arial';
`;

export const Icon = styled(MaterialIcon)`
  margin-right: 16px;
`;

export const ImagesContainer = styled.View`
  flex-direction: row;
  width: 80%;
  align-self: center;
  justify-content: space-around;
`;

export const ImageButton = styled.TouchableOpacity`
  align-self: center;
  height: ${RFValue(120)};
  width: ${RFValue(120)};
  margin: 12px;
  justify-content: center;
  align-items: center;
  border-radius: ${RFValue(10)};
  border: 1px;
  border-color: #999;
  border-style: dashed;
`;

export const ImageButtonText = styled.Text`
  font-family: 'Arial';
  color: #999;
`;

export const SaveButton = styled.TouchableOpacity`
  background: #006edb;
  margin-bottom: ${RFValue(40)};
  width: 80%;
  height: ${RFValue(40)};
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(10)};
`;

export const SaveButtonText = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(14)};
  color: #fff;
`;
