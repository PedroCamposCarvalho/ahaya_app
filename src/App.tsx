import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, StatusBar, YellowBox, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { enableScreens } from 'react-native-screens';
import AppProvider from './hooks';
import Routes from './routes';

class LandingPage extends Component {
  async componentDidMount() {
    LogBox.ignoreAllLogs(true);
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
            <Routes />
            <Toast />
          </View>
        </AppProvider>
      </NavigationContainer>
    );
  }
}

export default LandingPage;
