import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from '../pages/Modules/Auth/MainPage';
import SignIn from '../pages/Modules/Auth/SignIn';
import ProfileSignUp from '../pages/Modules/Auth/ProfileSignUp';
import ForgotPassword from '../pages/Modules/Auth/ForgotPassword';
import ForgotPasswordEmailSent from '../pages/Modules/Auth/ForgotPasswordEmailSent';
import InputCode from '../pages/Modules/Auth/InputCode';
import ResetPassword from '../pages/Modules/Auth/ResetPassword';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
    }}
  >
    <Auth.Screen name="MainPage" component={MainPage} />
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="ProfileSignUp" component={ProfileSignUp} />
    <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
    <Auth.Screen name="InputCode" component={InputCode} />
    <Auth.Screen name="ResetPassword" component={ResetPassword} />
  </Auth.Navigator>
);

export default AuthRoutes;
