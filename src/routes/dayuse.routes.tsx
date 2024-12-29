import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import DayUse from '../pages/Modules/DayUse';
import DayUseResume from '../pages/Modules/DayUse/DayUseResume';
import DayUseCreditCardPayment from '../pages/Modules/DayUse/DayUseCreditCardPayment';
import DayUseCreated from '../pages/Modules/DayUse/DayUseCreated';

const DayUseRouter = createStackNavigator();

const DayUseRoutes: React.FC = () => (
  <DayUseRouter.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <DayUseRouter.Screen name="DayUse" component={DayUse} />
    <DayUseRouter.Screen name="DayUseResume" component={DayUseResume} />
    <DayUseRouter.Screen name="DayUseCreated" component={DayUseCreated} />
    <DayUseRouter.Screen
      name="DayUseCreditCardPayment"
      component={DayUseCreditCardPayment}
    />
  </DayUseRouter.Navigator>
);

export default DayUseRoutes;
