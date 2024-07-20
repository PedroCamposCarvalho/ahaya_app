import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '@app/Config/Colors';

interface AnimationProps {
  opacity: number;
}
export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text<AnimationProps>`
  font-size: ${RFValue(18)};
  color: #fff;
  font-family: 'Arial';
  margin-top: 48px;
  text-align: center;
  opacity: ${props => props.opacity};
`;

export const Description = styled.Text<AnimationProps>`
  font-family: 'Arial';
  font-size: ${RFValue(16)};
  color: rgba(255, 255, 255, 0.8);
  margin-top: 16px;
  text-align: center;
  opacity: ${props => props.opacity};
`;

export const OkButton = styled.TouchableOpacity`
  background: ${Colors.white};
  justify-content: center;
  align-items: center;
  border-radius: ${RFValue(8)};
  margin-top: 24px;
  height: ${RFValue(30)};
  width: ${RFValue(50)};
`;

export const OkButtonText = styled.Text`
  font-family: 'Arial';
  color: ${Colors.blue};
  font-size: ${RFValue(14)};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
