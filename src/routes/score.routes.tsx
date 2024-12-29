import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Colors from '@app/Config/Colors';
import Score from '../pages/Modules/Score';
import UserScore from '../pages/Modules/Score/UserScore';

const ScoreStack = createStackNavigator();

const ScoreStackRoutes: React.FC = () => (
  <ScoreStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: Colors.blue },
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <ScoreStack.Screen name="UserScore" component={UserScore} />
  </ScoreStack.Navigator>
);

export default ScoreStackRoutes;
