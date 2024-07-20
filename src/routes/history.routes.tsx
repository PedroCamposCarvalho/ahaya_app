import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import DayUseHistoryStackRoutes from './dayUseHistoryStack.routes';
import MonthlyHistory from './monthlyhistory.routes';
import Appointments from '../pages/Modules/History/Appointments';

const History = createMaterialTopTabNavigator();

const HistoryRoutes: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          paddingTop: getStatusBarHeight() + 24,
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 24,
          paddingLeft: 24,
        }}
      >
        <View
          style={{ width: '100%', alignItems: 'center', position: 'relative' }}
        >
          <Text
            style={{
              color: '#273a9a',
              fontSize: RFValue(18),
              fontFamily: 'Arial',
            }}
          >
            Histórico
          </Text>
        </View>
      </View>
      <History.Navigator
        initialRouteName="Ativos"
        sceneContainerStyle={{ backgroundColor: '#32312f' }}
        tabBarOptions={{
          activeTintColor: '#273a9a',
          inactiveTintColor: '#273a9a',
          style: {
            backgroundColor: '#fff',
          },
          labelStyle: {
            fontSize: RFValue(12),
            textAlign: 'center',
            fontFamily: 'Arial',
          },
          indicatorStyle: {
            borderBottomColor: '#273a9a',
            borderBottomWidth: 2,
          },
        }}
      >
        <History.Screen name="Avulsas" component={Appointments} />
        <History.Screen name="Day Use" component={DayUseHistoryStackRoutes} />
        <History.Screen name="Mensalista" component={MonthlyHistory} />
      </History.Navigator>
    </>
  );
};

export default HistoryRoutes;
