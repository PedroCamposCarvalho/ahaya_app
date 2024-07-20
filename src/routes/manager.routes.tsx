import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Manager from '../pages/Modules/Manager';
import Calendar from '../pages/Modules/Manager/Calendar';
import AppointmentDetail from '../pages/Modules/Manager/AppointmentDetail';
import EditAppointmentHours from '../pages/Modules/Manager/EditAppointmentHours';
import AllUsers from '../pages/Modules/Manager/AllUsers';
import UserDetail from '../pages/Modules/Manager/UserDetail';
import DayUseProps from '../pages/Modules/Manager/DayUseProps';
import DayUseDetail from '../pages/Modules/Manager/DayUseProps/DayUseDetail';
import ScanQRCode from '../pages/Modules/Manager/DayUseProps/ScanQRCode';
import Notifications from '../pages/Modules/Manager/Notifications';
import Agenda from '../pages/Modules/Manager/Agenda';
import Store from '../pages/Modules/Manager/Store';
import NewItem from '../pages/Modules/Manager/Store/NewItem';
import EditItem from '../pages/Modules/Manager/Store/EditItem';
import Monthly from '../pages/Modules/Manager/Monthly';
import PurchasesRoutes from './purchases.routes';

const ManagerRouter = createStackNavigator();

const ManagerRoutes: React.FC = () => (
  <ManagerRouter.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <ManagerRouter.Screen name="Manager" component={Manager} />
    <ManagerRouter.Screen name="AllUsers" component={AllUsers} />
    <ManagerRouter.Screen name="UserDetail" component={UserDetail} />
    <ManagerRouter.Screen name="Calendar" component={Calendar} />
    <ManagerRouter.Screen name="DayUseProps" component={DayUseProps} />
    <ManagerRouter.Screen name="DayUseDetail" component={DayUseDetail} />
    <ManagerRouter.Screen name="Notifications" component={Notifications} />
    <ManagerRouter.Screen name="Agenda" component={Agenda} />
    <ManagerRouter.Screen name="Store" component={Store} />
    <ManagerRouter.Screen name="NewItem" component={NewItem} />
    <ManagerRouter.Screen name="EditItem" component={EditItem} />
    <ManagerRouter.Screen name="StorePurchases" component={PurchasesRoutes} />
    <ManagerRouter.Screen name="ScanQRCode" component={ScanQRCode} />
    <ManagerRouter.Screen name="Monthly" component={Monthly} />
    <ManagerRouter.Screen
      name="EditAppointmentHours"
      component={EditAppointmentHours}
    />
    <ManagerRouter.Screen
      name="AppointmentDetail"
      component={AppointmentDetail}
    />
  </ManagerRouter.Navigator>
);

export default ManagerRoutes;
