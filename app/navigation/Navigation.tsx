import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import CreateCravingForm from '../screens/CreateCravingForm';

export type RootStackParamList = {
  Tabs: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined
  CreateCravingForm: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="CreateCravingForm" component={CreateCravingForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
