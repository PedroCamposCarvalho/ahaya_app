import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  height: 500px;
  background: #fff;
  border-radius: 50px;
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  width: 80%;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(18)};
  color: #999;
`;

export const CloseButton = styled.TouchableOpacity`
  height: ${RFValue(30)};
  width: ${RFValue(30)};
  align-items: center;
  justify-content: center;
  background: #c53030;
  border-radius: ${RFValue(50)};
`;

export const Content = styled.ScrollView`
  flex: 1;
  width: 80%;
  padding-top: ${RFValue(20)};
`;

export const Description = styled.Text`
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  color: #999;
`;

export const ButtonsContainer = styled.View`
  margin-top: ${RFValue(40)};
  margin-bottom: ${RFValue(20)};
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const YesButton = styled.TouchableOpacity`
  height: ${RFValue(30)};
  width: ${RFValue(80)};
  border-radius: ${RFValue(10)};
  align-items: center;
  justify-content: center;
  background: #4bb543;
`;

export const YesButtonText = styled.Text`
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  color: #fff;
`;

export const CancelButton = styled.TouchableOpacity`
  height: ${RFValue(30)};
  width: ${RFValue(80)};
  border-radius: ${RFValue(10)};
  align-items: center;
  justify-content: center;
  background: #ff9494;
`;

export const CancelButtonText = styled.Text`
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  color: #fff;
`;
