import React from 'react';
import { ImageBackground } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import colors from '@app/Config/Colors';
import SelectSport from '../pages/Modules/Appointment/SelectSport';
import SelectDayHour from '../pages/Modules/Appointment/SelectDayHour';
import SelectMaterials from '../pages/Modules/Appointment/SelectMaterials';
import AppointmentResume from '../pages/Modules/Appointment/AppointmentResume';
import CreditCardPayment from '../pages/Modules/Appointment/CreditCardPayment';
import PixPayment from '../pages/Modules/Appointment/PixPayment';
import AppointmentCreated from '../pages/Modules/Appointment/AppointmentCreated';
import AppointmentCreatedFree from '../pages/Modules/Appointment/AppointmentCreatedFree';

const Appointment = createStackNavigator();

const AppointmentsSaga: React.FC = () => (
  <ImageBackground
    source={{ uri: 'https://app-ahaya.s3.amazonaws.com/sand_background.jpg' }}
    style={{ width: '100%', height: '100%' }}
  >
    <Appointment.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
    >
      <Appointment.Screen
        name="SelectSport"
        component={SelectSport}
        options={{
          headerShown: false,
        }}
      />
      <Appointment.Screen name="SelectDayHour" component={SelectDayHour} />
      <Appointment.Screen name="SelectMaterials" component={SelectMaterials} />
      <Appointment.Screen
        name="AppointmentResume"
        component={AppointmentResume}
      />
      <Appointment.Screen
        name="CreditCardPayment"
        component={CreditCardPayment}
      />
      <Appointment.Screen name="PixPayment" component={PixPayment} />
      <Appointment.Screen
        name="AppointmentCreated"
        component={AppointmentCreated}
      />
      <Appointment.Screen
        name="AppointmentCreatedFree"
        component={AppointmentCreatedFree}
      />
    </Appointment.Navigator>
  </ImageBackground>
);

export default AppointmentsSaga;
