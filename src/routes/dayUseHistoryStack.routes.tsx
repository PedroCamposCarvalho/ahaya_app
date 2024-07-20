import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FutureAppointments from '../pages/Modules/History/DayUse';

const DayUseHistory = createStackNavigator();

const DayUseHistoryStackRoutes: React.FC = () => (
  <DayUseHistory.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
    }}
  >
    <DayUseHistory.Screen
      name="FutureAppointments"
      component={FutureAppointments}
    />
  </DayUseHistory.Navigator>
);

export default DayUseHistoryStackRoutes;
