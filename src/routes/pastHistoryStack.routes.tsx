import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PastAppointments from '../pages/Modules/History/PastAppointments';
import PastAppointmentDetail from '../pages/Modules/History/PastAppointmentDetail';

const History = createStackNavigator();

const HistoryStackRoutes: React.FC = () => (
  <History.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
    }}
  >
    <History.Screen name="PastAppointments" component={PastAppointments} />
    <History.Screen
      name="PastAppointmentDetail"
      component={PastAppointmentDetail}
    />
  </History.Navigator>
);

export default HistoryStackRoutes;
