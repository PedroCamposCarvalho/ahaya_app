import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { DayUseProps } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const PullToRefreshText = styled.Text`
  color: #fff;
  font-family: 'Arial';
  font-size: 14px;
  align-self: center;
  margin-bottom: ${RFValue(30)};
  position: absolute;
  bottom: 0;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const DayUseList = styled(FlatList as new () => FlatList<DayUseProps>)`
  margin-bottom: ${RFValue(50)};
`;

export const TicketView = styled.View`
  width: 90%;
  align-self: center;
  height: ${RFValue(100)};
  flex-direction: row;
  align-items: center;
  margin-bottom: ${RFValue(20)};
  border-radius: ${RFValue(10)};
  border-width: 1px;
  border-color: #fff;
  margin-top: ${RFValue(10)};
`;

export const TicketQRCodeView = styled.View``;

export const TicketRetrievedView = styled.View`
  flex: 1;
  width: ${RFValue(80)};
  background: #fff;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${RFValue(10)};
  border-bottom-left-radius: ${RFValue(10)};
`;
export const ScanQRCodeButton = styled.TouchableOpacity`
  flex: 1;
  width: ${RFValue(80)};
  background: #fff;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${RFValue(10)};
  border-bottom-left-radius: ${RFValue(10)};
`;

export const ScanQRCodeText = styled.Text`
  color: #006edb;
  margin-top: ${RFValue(5)};
`;

export const TicketDetailsView = styled.View``;

export const TicketTitleView = styled.View``;

export const TicketTitle = styled.Text`
  font-size: ${RFValue(16)};
  font-family: 'Arial';
  color: #fff;
  margin-bottom: 10px;
`;

export const DayUseItem = styled.View``;

export const DayUseDayView = styled.View`
  flex-direction: row;
  padding: ${RFValue(5)}px;
  margin-left: 10px;
`;

export const DayUseDay = styled.Text`
  font-size: ${RFValue(12)};
  font-family: 'Arial';
  color: #fff;
  margin-left: 10px;
`;
export const DayUseHourView = styled.View`
  flex-direction: row;
  padding: ${RFValue(5)}px;
  margin-left: 10px;
`;

export const DayUseHour = styled.Text`
  font-size: ${RFValue(12)};
  font-family: 'Arial';
  color: #fff;
  margin-left: 10px;
`;

export const TicketAmountView = styled.View`
  flex-direction: row;
  padding: ${RFValue(5)}px;
  margin-left: 10px;
`;

export const TicketAmount = styled.Text`
  font-size: ${RFValue(12)};
  font-family: 'Arial';
  color: #fff;
  margin-left: 10px;
`;

export const CancelButton = styled.TouchableOpacity`
  align-self: center;
`;

export const CancelText = styled.Text`
  color: #999;
  text-decoration: underline;
  text-decoration-color: #999;
`;

export const ModalView = styled.View`
  height: ${RFValue(450)};
  background: #fff;
  border-radius: ${RFValue(40)};
  align-items: center;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  width: 80%;
  justify-content: space-between;
`;

export const ModalHeaderTitle = styled.Text`
  font-family: 'Arial';
  font-size: ${RFValue(18)};
  color: #999;
`;

export const ModalHeaderButton = styled.TouchableOpacity`
  height: ${RFValue(25)};
  width: ${RFValue(25)};
  align-items: center;
  justify-content: center;
  background: #c53030;
  border-radius: ${RFValue(14)};
`;

export const ModalContent = styled.View`
  flex: 1;
  align-items: center;
  padding-top: ${RFValue(80)};
`;

export const ModalQRCodeDescription = styled.Text`
  margin-top: ${RFValue(20)};
  text-align: center;
  font-size: ${RFValue(14)};
`;
