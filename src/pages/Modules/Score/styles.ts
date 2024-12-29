import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Colors from '@app/Config/Colors';

interface ContainerProps {
  paddingTop: boolean;
}

interface OpacityProps {
  opacity: number;
}

export const Container = styled.View<ContainerProps>`
  align-items: center;
  justify-content: space-between;
  padding-top: ${props => (props.paddingTop ? getStatusBarHeight() + 24 : 0)}px;
  height: 100%;
`;

export const Title = styled.Text<OpacityProps>`
  color: #fff;
  font-size: ${RFValue(24)};
  text-align: center;
  opacity: ${props => props.opacity};
  margin-top: ${RFValue(12)};
`;

export const AnimationContainer = styled.View`
  background: #fff;
  width: ${RFValue(150)};
  height: ${RFValue(150)};
  border-radius: ${RFValue(90)};
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const DescriptionContent = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const DescriptionText = styled.Text<OpacityProps>`
  color: #fff;
  width: 80%;
  font-size: ${RFValue(18)};
  text-align: center;
  opacity: ${props => props.opacity};
`;

export const ContinueButton = styled.TouchableOpacity`
  background: ${Colors.white};
  width: 80%;
  height: ${RFValue(40)};
  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(12)};
  margin-bottom: ${RFValue(40)};
`;

export const ContinueButtonText = styled.Text`
  color: ${Colors.blue};
  font-size: ${RFValue(14)};
`;
