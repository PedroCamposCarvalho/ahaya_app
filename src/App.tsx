import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { View, StatusBar, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { WRootToastApp } from 'react-native-smart-tip';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';
import AppProvider from './hooks';

import Routes from './routes';

class LandingPage extends Component {
  async componentDidMount() {
    console.disableYellowBox = true;
    SplashScreen.hide();
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#006edb"
          translucent
        />
        <AppProvider>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <WRootToastApp>
              <Routes />
            </WRootToastApp>
          </View>
        </AppProvider>
      </NavigationContainer>
    );
  }
}

export default LandingPage;
