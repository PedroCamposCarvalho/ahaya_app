import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Content = styled.View`
  align-self: center;
  margin-top: ${RFValue(20)};
  width: 80%;
`;

export const CourtName = styled.Text`
  color: #999;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
`;

export const StartDate = styled.Text`
  color: #999;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  margin-top: ${RFValue(8)};
`;

export const FinishDate = styled.Text`
  color: #999;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  margin-top: ${RFValue(8)};
`;

export const CreatedAt = styled.Text`
  color: #999;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  margin-top: ${RFValue(8)};
`;

export const NumberPlayers = styled.Text`
  color: #999;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  margin-top: ${RFValue(8)};
`;

export const MaterialsLabel = styled.Text`
  color: #999;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
  margin-top: ${RFValue(20)};
`;

export const MaterialContainer = styled.View`
  flex-direction: row;
  margin-top: ${RFValue(10)};
  align-items: center;
`;

export const MaterialName = styled.Text`
  width: ${RFValue(80)};
  color: #999;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
`;

export const MaterialAmount = styled.Text`
  margin-left: ${RFValue(20)};
  color: #999;
  font-family: 'Arial';
  font-size: ${RFValue(12)};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const CancelationDescription = styled.Text``;

export const CancelButton = styled.TouchableOpacity`
  margin-top: ${RFValue(120)};
  height: ${RFValue(30)};
  background: #dc0c0c;
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(8)};
`;

export const CancelButtonText = styled.Text`
  color: #fff;
`;
