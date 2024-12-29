import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Monthly from '../pages/Modules/History/Monthly';

const MonthlyHistoryRouter = createStackNavigator();

const MonthlyHistoryRoutes: React.FC = () => (
  <MonthlyHistoryRouter.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <MonthlyHistoryRouter.Screen name="Monthly" component={Monthly} />
  </MonthlyHistoryRouter.Navigator>
);

export default MonthlyHistoryRoutes;
