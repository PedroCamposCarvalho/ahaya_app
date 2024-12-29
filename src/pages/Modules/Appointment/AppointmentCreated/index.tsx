import React, { useEffect, useCallback, useState, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { View } from 'react-native-animatable';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import api from '@app/services/api';
import { useAppointmentContext } from '@app/hooks/appointment';
import { useScoreContext } from '@app/hooks/score';
import {
  Container,
  Content,
  Title,
  Description,
  OkButton,
  OkButtonText,
  LoadingContainer,
} from './styles';

interface RouteParams {
  createAppointment: boolean;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const route = useRoute();

  const { createAppointment } = route.params as RouteParams;

  const { appointment, hours, materials } = useAppointmentContext();
  const { refreshUserScore } = useScoreContext();

  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [descriptionOpacity, setDescriptionOpacity] = useState(0);
  const [buttonOpacity, setButtonOpacity] = useState(0);

  const titleRef = useRef<View & View>(null);
  const descriptionRef = useRef<View & View>(null);
  const buttonRef = useRef<View & View>(null);
  useEffect(() => {
    setDescriptionText(`Você ganhou ${appointment.winningPoints} pontos!`);

    if (createAppointment) {
      api
        .post('/appointments/createScore', { appointment, hours, materials })
        .then(() => {
          setLoading(false);
          refreshUserScore();
        })
        .catch(() => {
          setFailed(true);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [appointment, hours, materials, createAppointment, refreshUserScore]);

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'SelectSport' }],
      index: 0,
    });
  }, [reset]);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="#fff" size="large" />
          </LoadingContainer>
        ) : (
          <Content>
            {failed ? (
              <>
                <Icon name="x" size={RFValue(80)} color="#c53030" />
                <Title opacity={titleOpacity}>Erro processar solicitação</Title>
                <Description opacity={descriptionOpacity}>
                  Tente novamente, caso o erro persista, entre em contato com a
                  gente
                </Description>
                <OkButton onPress={handleOkPressed}>
                  <OkButtonText>Ok</OkButtonText>
                </OkButton>
              </>
            ) : (
              <>
                <View>
                  <Title opacity={titleOpacity}>Obrigado pela compra!</Title>
                </View>
                <View ref={descriptionRef}>
                  <Description opacity={1}>{descriptionText}</Description>
                </View>
                <View ref={buttonRef} style={{ height: 30, width: 50 }}>
                  <OkButton onPress={() => handleOkPressed()}>
                    <OkButtonText>Ok</OkButtonText>
                  </OkButton>
                </View>
              </>
            )}
          </Content>
        )}
      </Container>
    </LinearGradient>
  );
};

export default AppointmentCreated;
