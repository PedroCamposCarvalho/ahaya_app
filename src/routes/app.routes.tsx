/* eslint-disable react/display-name */
import React, { useEffect, useState, useMemo } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

import AppointmentsRoutes from './appointments.routes';
import HistoryRoutes from './history.routes';
import OptionsRoutes from './options.routes';
import MonthlyRoutes from './monthly.routes';
import { useAuth } from '../hooks/auth';
import Environment from '../Config/Environment';
import api from '../services/api';
import ScoreRoutes from './score.routes';
import DayUseRoutes from './dayuse.routes';
import UpdateApp from './UpdateApp';
import AppInMaintence from './AppInMaintence';
import BigCenterButton from './BigCenterButton';

const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  const [appVersion, setAppVersion] = useState(Environment.appVersion);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [appUpToDate, setAppUpToDate] = useState(true);
  const [appInMaintence, setAppInMaintence] = useState(false);

  useEffect(() => {
    const updateDialogOptions = {
      updateTitle: 'Atenção!',
      optionalUpdateMessage:
        'Atualização importante disponível! Deseja instalar?',
      optionalIgnoreButtonLabel: 'Não',
      optionalInstallButtonLabel: 'Sim',
    };

    api
      .get('/profile/appMaintence')
      .then(response => {
        if (String(response.data.ok) === String(true)) {
          setAppInMaintence(true);
        } else {
          api
            .get(`/profile/verifyAppVersion?appVersion=${appVersion}`)
            .then(response2 => {
              if (String(response2.data.ok) !== String(true)) {
                setAppUpToDate(false);
              }
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  }, [appVersion, user.id]);

  return (
    <>
      {appInMaintence ? (
        <AppInMaintence />
      ) : (
        <>
          {!appUpToDate ? (
            <UpdateApp />
          ) : (
            <Tab.Navigator
              initialRouteName="AppointmentsRoutes"
              screenOptions={{
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#ccc',
                tabBarStyle: {
                  shadowColor: 'transparent',
                  shadowRadius: 1,
                  shadowOffset: { height: 0, width: 0 },
                  borderTopWidth: 0,
                  backgroundColor: '#273a9a',
                  height: RFValue(Platform.OS === 'ios' ? 70 : 55),
                },
                headerShown: false,
              }}
            >
              <Tab.Screen
                name="DayUse"
                component={DayUseRoutes}
                options={{
                  headerShown: false,
                  tabBarLabel: 'Day Use',
                  tabBarIcon: ({ color }) => (
                    <FeatherIcon
                      name="clock"
                      size={RFValue(21)}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Historico"
                component={HistoryRoutes}
                options={{
                  headerShown: false,
                  tabBarLabel: 'Histórico',
                  tabBarIcon: ({ color }) => (
                    <FeatherIcon
                      name="book-open"
                      size={RFValue(21)}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="AppointmentsRoutes"
                component={AppointmentsRoutes}
                options={{
                  headerShown: false,
                  tabBarLabel: '',
                  tabBarIcon: ({ focused }) => (
                    <BigCenterButton focused={focused} />
                  ),
                }}
              />
              <Tab.Screen
                name="Options"
                component={OptionsRoutes}
                options={{
                  headerShown: false,
                  tabBarTestID: 'optionRoute',
                  tabBarLabel: 'Opções',
                  tabBarIcon: ({ color }) => (
                    <FeatherIcon name="menu" size={RFValue(25)} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Score"
                component={ScoreRoutes}
                options={{
                  headerShown: false,
                  tabBarTestID: 'scoreRoute',
                  tabBarLabel: 'Fidelidade',
                  tabBarIcon: ({ color }) => (
                    <FeatherIcon name="star" size={RFValue(25)} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          )}
        </>
      )}
    </>
  );
};

export default AppRoutes;
