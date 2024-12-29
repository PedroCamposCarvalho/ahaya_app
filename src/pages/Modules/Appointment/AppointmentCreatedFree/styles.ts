import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '@app/Config/Colors';

interface AnimationProps {
  opacity: number;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text<AnimationProps>`
  text-align: center;
  color: #fff;
  font-size: ${RFValue(24)};
  opacity: ${props => props.opacity};
`;

export const Description = styled.Text<AnimationProps>`
  text-align: center;
  color: #fff;
  font-size: ${RFValue(18)};
  width: 80%;
  margin-top: ${RFValue(14)};
  opacity: ${props => props.opacity};
`;

export const OkButton = styled.TouchableOpacity`
  background: ${Colors.white};
  justify-content: center;
  align-items: center;
  border-radius: ${RFValue(8)};
  margin-top: 24px;
  height: ${RFValue(30)};
  width: ${RFValue(80)};
`;

export const OkButtonText = styled.Text`
  font-family: 'Arial';
  color: ${Colors.blue};
  font-size: ${RFValue(14)};
`;
