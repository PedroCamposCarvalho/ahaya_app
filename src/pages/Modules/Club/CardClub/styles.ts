import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface CardProps {
  background: string;
}

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const CardView = styled.View<CardProps>`
  background: ${props => props.background};
  height: ${RFValue(220)};
  width: 90%;
  border-radius: ${RFValue(5)};
`;

export const CardHeader = styled.View`
  width: 100%;
  padding: ${RFValue(8)}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const CardProfileImage = styled.Image`
  height: ${RFValue(60)};
  width: ${RFValue(60)};
  border-radius: ${RFValue(50)};
`;

export const CardTitle = styled.Text`
  font-size: ${RFValue(18)};
  font-family: 'Arial';
  color: #fff;
  margin-top: ${RFValue(15)};
`;

export const CardHakaLogo = styled.Image`
  height: ${RFValue(40)};
  width: ${RFValue(40)};
  border-radius: ${RFValue(100)};
`;

export const CardNameContainer = styled.View`
  flex-direction: row;
  margin-top: ${RFValue(20)};
`;

export const CardNameTitle = styled.Text`
  font-size: ${RFValue(16)};
  font-family: 'Arial';
  color: #fff;
  width: ${RFValue(100)};
  padding: 0 ${RFValue(8)}px;
`;

export const CardName = styled.Text`
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  color: #fff;
`;

export const CardExpiresIn = styled.Text`
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  color: #fff;
`;

export const RulesButton = styled.TouchableOpacity`
  margin-top: ${RFValue(20)};
  width: ${RFValue(100)};
  flex-direction: row;
  align-items: center;
  margin-left: ${RFValue(10)};
  height: ${RFValue(40)};
  border-radius: ${RFValue(5)};
`;

export const RulesText = styled.Text`
  font-size: ${RFValue(14)};
  font-family: 'Arial';
  color: #fff;
  height: ${RFValue(15)};
  margin-left: ${RFValue(10)};
  text-decoration: underline;
  text-decoration-color: #fff;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const RenewPlanButton = styled.TouchableOpacity`
  width: 90%;
  background: #f1d72a;
  margin-top: ${RFValue(20)};
  height: ${RFValue(40)};
  border-radius: ${RFValue(5)};
  align-items: center;
  justify-content: center;
`;

export const RenewPlanButtonText = styled.Text`
  font-size: ${RFValue(18)};
  font-family: 'Arial';
  color: #fff;
`;
