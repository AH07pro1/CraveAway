import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import Tabs from './Tabs';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  Tabs: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
