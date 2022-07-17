import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import BikeRequestSteps from '../../views/BikeRequestSteps';
import DashBoardView from '../../views/DashBoardView';
import IntroView from '../../views/IntroView';
import LoginView from '../../views/LoginView';
import SplashView from '../../views/SplashView';

const Navigators = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashView">
        <Stack.Screen
          name="SplashView"
          component={SplashView}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginView"
          options={{headerShown: false}}
          component={LoginView}
        />
        <Stack.Screen
          name="IntroView"
          options={{headerShown: false, gestureEnabled: false}}
          component={IntroView}
        />
        <Stack.Screen
          name="DashBoardView"
          options={{headerShown: false, gestureEnabled: false}}
          component={DashBoardView}
        />
        <Stack.Screen name="BikeRequestPage"
          options={{ headerShown: false, gestureEnabled: false }}
          component={BikeRequestSteps}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigators;
