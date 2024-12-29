import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Monthly from '../pages/Modules/Monthly';
import CreditCardPayment from '../pages/Modules/Monthly/CreditCardPayment';
import MonthlyCreated from '../pages/Modules/Monthly/MonthlyCreated';

const MonthlyRouter = createStackNavigator();

const MonthlyRoutes: React.FC = () => (
  <MonthlyRouter.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <MonthlyRouter.Screen name="Monthly" component={Monthly} />
    <MonthlyRouter.Screen
      name="CreditCardPayment"
      component={CreditCardPayment}
    />
    <MonthlyRouter.Screen name="MonthlyCreated" component={MonthlyCreated} />
  </MonthlyRouter.Navigator>
);

export default MonthlyRoutes;
