import React from 'react';
import { Switch } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Slider from '@react-native-community/slider';
import { darken } from 'polished';
import { ScoreRules } from '@app/hooks/score';
import Colors from '@app/Config/Colors';
import {
  Container,
  ScoreProps,
  ScoreDetails,
  ScoreValue,
  ScoreDescription,
  SliderContainer,
  SliderValue,
  SliderDisabledText,
  ZeroPoints,
} from './styles';

interface PageProps {
  scoreRule: ScoreRules;
  userPoints: number;
  usePoints: boolean;
  pointsToUse: number;
  tickets: number;
  isUsingPointsAppointment: boolean;
  setUsePoints: (usePoints: boolean) => void;
  handleChangePointsToUse: (points: number) => void;
}

const PointsContainer: React.FC<PageProps> = ({
  scoreRule,
  userPoints,
  usePoints,
  pointsToUse,
  tickets,
  isUsingPointsAppointment,
  setUsePoints,
  handleChangePointsToUse,
}) => (
  <Container>
    <ScoreProps>
      {userPoints === 0 ? (
        <ZeroPoints>
          <ScoreValue>Faça compras no app e ganhe pontos!</ScoreValue>
        </ZeroPoints>
      ) : (
        <ScoreDetails>
          <ScoreValue>
            {`Você tem ${userPoints} pontos! Deseja usar?`}
          </ScoreValue>
          <ScoreDescription>
            {`Cada ponto disconta R$ ${String(
              scoreRule.each_point_worth,
            ).replace('.', ',')} no valor final`}
          </ScoreDescription>
        </ScoreDetails>
      )}

      {userPoints > 0 && (
        <Switch
          trackColor={{ false: '#767577', true: '#54dfd2' }}
          thumbColor={usePoints ? '#fff' : '#fff'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setUsePoints(!usePoints)}
          value={usePoints}
        />
      )}
    </ScoreProps>
    {userPoints > 0 && (
      <SliderContainer>
        <SliderValue>{`Qtd. pontos:\n${pointsToUse}`}</SliderValue>
        <Slider
          style={{ width: '70%', height: 40, marginTop: RFValue(18) }}
          minimumValue={0}
          maximumValue={userPoints}
          onValueChange={value =>
            handleChangePointsToUse(Number(value.toFixed(0)))
          }
          value={pointsToUse}
          minimumTrackTintColor="#54dfd2"
          maximumTrackTintColor={
            usePoints && tickets > 0 ? '#ccc' : darken(0.1, '#fff')
          }
          disabled={!usePoints}
        />
      </SliderContainer>
    )}
    {userPoints > 0 && (
      <SliderDisabledText>
        Arraste a barra acima para usar os pontos
      </SliderDisabledText>
    )}
  </Container>
);

export default PointsContainer;
