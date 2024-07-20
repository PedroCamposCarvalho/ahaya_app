import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Options from '../pages/Modules/Options';
import Profile from '../pages/Modules/Options/Profile';
import PlaceMap from '../pages/Modules/Options/PlaceMap';
import Prices from '../pages/Modules/Options/Prices';
import TalkToUs from '../pages/Modules/Options/TalkToUs';
import TermsConditions from '../pages/Modules/Options/TermsConditions';
import Vouchers from '../pages/Modules/Options/Vouchers';
import SelectPaymentMethod from '../pages/Modules/Options/Vouchers/SelectPaymentMethod';
import PixPayment from '../pages/Modules/Options/Vouchers/PixPayment';
import CreditCardPayment from '../pages/Modules/Options/Vouchers/CreditCardPayment';
import Test from '../pages/Modules/Options/Test';
import Store from '../pages/Modules/Options/Store';
import StoreCreditCardPayment from '../pages/Modules/Options/Store/CreditCardPayment';
import PurchaseCompleted from '../pages/Modules/Options/Store/PurchaseCompleted';
import AdminRoutes from './manager.routes';

const SettingsRouter = createStackNavigator();

const SettingsRoutes: React.FC = () => (
  <SettingsRouter.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <SettingsRouter.Screen name="Options" component={Options} />
    <SettingsRouter.Screen name="Profile" component={Profile} />
    <SettingsRouter.Screen name="PlaceMap" component={PlaceMap} />
    <SettingsRouter.Screen name="Prices" component={Prices} />
    <SettingsRouter.Screen name="TalkToUs" component={TalkToUs} />
    <SettingsRouter.Screen name="TermsConditions" component={TermsConditions} />
    <SettingsRouter.Screen name="Vouchers" component={Vouchers} />
    <SettingsRouter.Screen name="Test" component={Test} />
    <SettingsRouter.Screen name="AdminRoutes" component={AdminRoutes} />
    <SettingsRouter.Screen name="Store" component={Store} />
    <SettingsRouter.Screen
      name="PurchaseCompleted"
      component={PurchaseCompleted}
    />
    <SettingsRouter.Screen
      name="StoreCreditCardPayment"
      component={StoreCreditCardPayment}
    />
    <SettingsRouter.Screen
      name="SelectPaymentMethod"
      component={SelectPaymentMethod}
    />
    <SettingsRouter.Screen name="PixPayment" component={PixPayment} />
    <SettingsRouter.Screen
      name="CreditCardPayment"
      component={CreditCardPayment}
    />
  </SettingsRouter.Navigator>
);

export default SettingsRoutes;
