import styled from 'styled-components/native';
import { shade } from 'polished';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';
import { Courts } from './index';

interface CourtContainerProps {
  selected: boolean;
}

interface CourtTextProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  margin-top: 15%;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 10px;
  margin-left: 10px;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 40%;
  margin-bottom: 40%;
`;

export const Content = styled.ScrollView``;

export const CourtListContainer = styled.View`
  height: 112px;
`;

export const CourtsList = styled(FlatList as new () => FlatList<Courts>)`
  padding: 32px 24px;
`;

export const CourtContainer = styled(RectButton)<CourtContainerProps>`
  background: ${props => (props.selected ? '#99d420' : shade(0.25, '#32312f'))};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`;

export const CourtPhoto = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const CourtName = styled.Text<CourtTextProps>`
  color: ${props => (props.selected ? '#32312f' : '#fff')};
  font-family: 'Arial';
  font-size: 14px;
  margin-left: 10px;
`;

export const CalendarContainer = styled.View``;

export const CalendarTitle = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: 24px;
  margin: 0 14px 24px;
`;

export const CalendarTitleIOS14 = styled.Text`
  font-family: 'Arial';
  color: #fff;
  font-size: 18px;
  margin: 0 24px 5px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #99d420;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDatePickerText = styled.Text`
  font-family: 'Arial';
  color: #32312f;
  font-size: 16px;
`;

export const SelectedDateView = styled.View`
  flex-direction: row;
`;

export const SelectedDate = styled.Text`
  color: #99d420;
  font-family: 'Arial';
  font-size: 24px;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #999591;
  font-family: 'Arial';
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  background: ${props => (props.selected ? '#99d420' : shade(0.25, '#32312f'))};
  border-radius: 10px;
  margin-right: 8px;
  opacity: ${props => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${props => (props.selected ? '#32312f' : '#f4ede8')};
  font-family: 'Arial';
  font-size: 16px;
`;

export const FinishButton = styled(RectButton)`
  height: 50px;
  background: #99d420;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 90%;
  margin-bottom: 20px;
`;

export const FinishButtonText = styled.Text`
  font-family: 'Arial';
  color: #32312f;
  font-size: 18px;
`;
