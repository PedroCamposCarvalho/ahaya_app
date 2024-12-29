import styled, { css } from 'styled-components/native';
import { shade } from 'polished';
import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Courts } from './index';

interface HeaderProps {
  isMultiSelection: boolean;
}

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

interface ContinueButtonProps {
  available: boolean;
}

interface MultiSelecionButtonProps {
  disabled: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View<HeaderProps>`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: ${props =>
    props.isMultiSelection ? shade(0.2, '#1e90ff') : '#32312f'};
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const QuitMultiSelectionButton = styled(RectButton)``;

export const MultiSelectionQuantity = styled.Text`
  color: #f5ede8;
  font-family: 'Arial';
  font-size: 20px;
`;

export const BackButton = styled.TouchableOpacity`
  position: relative;
  z-index: 1;
`;

export const TitleView = styled.View`
  width: 100%;
  align-items: center;
  position: relative;
`;

export const HeaderTitle = styled.Text`
  color: #f5ede8;
  font-family: 'Arial';
  font-size: 20px;
  margin-right: 50px;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 25%;
  padding-bottom: 25%;
`;

export const Content = styled.ScrollView`
  z-index: 1;
`;

export const CourtListContainer = styled.View`
  height: 190px;
  z-index: 1;
`;

export const CourtsList = styled(FlatList as new () => FlatList<Courts>)`
  padding: 32px 0;
  padding-left: 5px;
`;

export const CourtContainer = styled(RectButton)<CourtContainerProps>`
  background: ${props => (props.selected ? '#99d420' : shade(0.25, '#32312f'))};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
  height: 40px;
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

export const CalendarContainer = styled.View`
  z-index: 0;
`;

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
  margin-top: -10%;
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
  showsHorizontalScrollIndicator: false,
})`
  margin-bottom: 40px;
`;

export const Hour = styled.TouchableOpacity<HourProps>`
  padding: 12px;
  background: ${shade(0.3, '#c53030')};
  border-radius: 10px;
  margin-top: 8px;
  ${props =>
    props.available &&
    css`
      background: ${shade(0.3, '#99d420')};
    `}

  ${props =>
    props.selected &&
    css`
      background: ${shade(0.2, '#1e90ff')};
    `}
`;

export const HourText = styled.Text`
  color: #f4ede8;
  font-family: 'Arial';
  font-size: 16px;
`;

export const MultiSelectionContainer = styled.View`
  position: absolute;
  bottom: 0;
  height: 80px;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  z-index: 1;
  width: 100%;
  padding-bottom: 20px;
  background: #2c2b2a;
`;

export const MultiSelectionCreateButton = styled(
  RectButton,
)<MultiSelecionButtonProps>`
  height: 50px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  z-index: 1;
  background: ${shade(0.2, '#4bb543')};
  width: 160px;
  border-radius: 10px;
  opacity: ${props => (props.disabled ? 0.2 : 1)};
`;

export const MultiSelectionCreateButtonText = styled.Text`
  color: #f4ede8;
  font-family: 'Arial';
  font-size: 16px;
`;

export const MultiSelectionCancelButton = styled(
  RectButton,
)<MultiSelecionButtonProps>`
  height: 50px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  z-index: 1;
  background: ${shade(0.2, '#999')};
  width: 160px;
  border-radius: 10px;
  opacity: ${props => (props.disabled ? 0.2 : 1)};
`;

export const MultiSelectionCancelButtonText = styled.Text`
  color: #f4ede8;
  font-family: 'Arial';
  font-size: 16px;
`;
