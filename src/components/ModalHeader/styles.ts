import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import colors from "@app/Config/Colors";

export const Container = styled.View`
  width: 80%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(20)};
`;

export const Title = styled.Text`
  color: #999;
  font-size: ${RFValue(18)};
`;

export const CloseButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background: ${colors.red};
  height: ${RFValue(25)};
  width: ${RFValue(25)};
  border-radius: ${RFValue(40)};
`;
