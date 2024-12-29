import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Club from '../pages/Modules/Club';
import Rules from '../pages/Modules/Club/UserNotInClub/Rules';
import Plans from '../pages/Modules/Club/UserNotInClub/Plans';
import MemberCreated from '../pages/Modules/Club/UserNotInClub/MemberCreated';
import CreditCard from '../pages/Modules/Payments/CreditCard';
import DebitCard from '../pages/Modules/Payments/DebitCard';
import PIX from '../pages/Modules/Payments/PIX';

const ClubRouter = createStackNavigator();

const ClubRoutes: React.FC = () => (
  <ClubRouter.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <ClubRouter.Screen name="Club" component={Club} />
    <ClubRouter.Screen name="Rules" component={Rules} />
    <ClubRouter.Screen name="Plans" component={Plans} />
    <ClubRouter.Screen name="MemberCreated" component={MemberCreated} />
    <ClubRouter.Screen name="CreditCard" component={CreditCard} />
    <ClubRouter.Screen name="DebitCard" component={DebitCard} />
    <ClubRouter.Screen name="PIX" component={PIX} />
  </ClubRouter.Navigator>
);

export default ClubRoutes;
