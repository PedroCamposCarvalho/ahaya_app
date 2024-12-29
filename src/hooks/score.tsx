import api from '@app/services/api';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useAuth } from './auth';

export interface ScoreRules {
  id: string;
  module: string;
  points: number;
  each_point_worth: number;
  description: string;
  discount: boolean;
  image: string;
  price: number;
}

interface ScoreProvider {
  scores: ScoreRules[];
  userPoints: number;
  showWelcomeScreen: boolean;
  refreshUserScore: () => void;
  updateShowWelcomeScreen: () => void;
}

const ScoreContext = createContext<ScoreProvider>({} as ScoreProvider);

export const ScoreProvider: React.FC = ({ children }) => {
  const [scores, setScores] = useState<ScoreRules[]>([]);
  const [userPoints, setUserPoints] = useState(0);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [scoreLoading, setScoreLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    AsyncStorage.getItem('@App:showWelcomeScreeen').then(item => {
      if (String(item) === 'false') {
        setShowWelcomeScreen(false);
      }
    });
    api.get('/score/findAllScoreRules').then(response => {
      setScores(response.data);
      api.get(`/score/findUserPoints?id_user=${user.id}`).then(response2 => {
        setUserPoints(Number(response2.data));
      });
    });
  }, [user]);

  const refreshUserScore = useCallback(() => {
    setTimeout(() => {
      api.get(`/score/findUserPoints?id_user=${user.id}`).then(response2 => {
        setUserPoints(Number(response2.data));
      });
    }, 2000);
  }, [user]);

  const updateShowWelcomeScreen = useCallback(async () => {
    await AsyncStorage.setItem('@App:showWelcomeScreeen', 'false');
    setShowWelcomeScreen(false);
  }, []);

  return (
    <ScoreContext.Provider
      value={{
        scores,
        userPoints,
        showWelcomeScreen,
        refreshUserScore,
        updateShowWelcomeScreen,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export function useScoreContext(): ScoreProvider {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScoreContext must be used within an ScoreProvider');
  }
  return context;
}
