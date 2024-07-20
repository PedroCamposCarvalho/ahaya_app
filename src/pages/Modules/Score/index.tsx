import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View } from 'react-native-animatable';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useScoreContext } from '@app/hooks/score';
import { useAuth } from '@app/hooks/auth';
import animation from './animations/gift.json';
import UserScore from './UserScore';
import {
  Container,
  Title,
  AnimationContainer,
  DescriptionContent,
  DescriptionText,
  ContinueButton,
  ContinueButtonText,
} from './styles';

const Score: React.FC = () => {
  const navigation = useNavigation();
  const titleRef = useRef<Animatable.View & View>(null);
  const lottieViewRef = useRef<Animatable.View & View>(null);
  const descriptionRef = useRef<Animatable.View & View>(null);
  const continueButtonRef = useRef<Animatable.View & View>(null);

  const { showWelcomeScreen, updateShowWelcomeScreen } = useScoreContext();
  const { user } = useAuth();

  const [loadTitle, setLoadTitle] = useState(false);
  const [loadDescription, setLoadDescription] = useState(false);
  const [loadContinueButton, setLoadContinueButton] = useState(false);

  const handleNavigation = useCallback(() => {
    updateShowWelcomeScreen();
    navigation.navigate('UserScore');
  }, [updateShowWelcomeScreen, navigation]);

  return (
    <LinearGradient colors={['#006edb', '#273a9a']} style={{ flex: 1 }}>
      <Container paddingTop={showWelcomeScreen}>
        {showWelcomeScreen ? (
          <>
            <Animatable.View ref={titleRef}>
              <Title opacity={loadTitle ? 1 : 0}>{'Fidelidade\nAhaya'}</Title>
            </Animatable.View>
            <Animatable.View ref={lottieViewRef} style={{ width: '55%' }}>
              <AnimationContainer />
            </Animatable.View>
            <DescriptionContent>
              <Animatable.View
                ref={descriptionRef}
                style={{ width: '100%', alignItems: 'center' }}
              >
                <DescriptionText opacity={loadDescription ? 1 : 0}>
                  {
                    'Conheça o nosso programa de fidelidade!\nSuas compras no app geram pontos, que podem ser usados para futuras compras e reservas!'
                  }
                </DescriptionText>
              </Animatable.View>
            </DescriptionContent>
            <Animatable.View
              ref={continueButtonRef}
              style={{
                width: '100%',
                alignItems: 'center',
                opacity: loadContinueButton ? 1 : 0,
              }}
            >
              <ContinueButton onPress={() => handleNavigation()}>
                <ContinueButtonText>Eu quero!</ContinueButtonText>
              </ContinueButton>
            </Animatable.View>
          </>
        ) : (
          <UserScore />
        )}
      </Container>
    </LinearGradient>
  );
};

export default Score;
