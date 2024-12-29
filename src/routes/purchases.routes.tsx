import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import PurchaseRetrieved from '../pages/Modules/Manager/StorePurchases/Retrieved';
import NonRetrieved from '../pages/Modules/Manager/StorePurchases/NonRetrieved';

const Purchase = createMaterialTopTabNavigator();

const PurchaseRoutes: React.FC = () => {
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="chevron-down" color="#273a9a" size={20} />
        </TouchableOpacity>
        <View
          style={{ width: '100%', alignItems: 'center', position: 'relative' }}
        >
          <Text
            style={{
              color: '#273a9a',
              fontSize: RFValue(18),
              fontFamily: 'Arial',
              marginRight: RFValue(35),
            }}
          >
            Compras da lojinha
          </Text>
        </View>
      </View>
      <Purchase.Navigator
        initialRouteName="Pendentes"
        sceneContainerStyle={{ backgroundColor: '#fff' }}
        tabBarOptions={{
          activeTintColor: '#FFFFFF',
          inactiveTintColor: '#F8F8F8',
          style: {
            backgroundColor: '#fff',
          },
          labelStyle: {
            fontSize: RFValue(12),
            textAlign: 'center',
            fontFamily: 'Arial',
            color: '#273a9a',
          },
          indicatorStyle: {
            borderBottomColor: '#273a9a',
            borderBottomWidth: 2,
          },
        }}
      >
        <Purchase.Screen name="Pendentes" component={NonRetrieved} />
        <Purchase.Screen name="Entregues" component={PurchaseRetrieved} />
      </Purchase.Navigator>
    </>
  );
};

export default PurchaseRoutes;
