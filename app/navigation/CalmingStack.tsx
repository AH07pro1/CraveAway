import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalmingSessionScreen from '../screens/CalmingSessionScreen';
import CreateCravingForm from '../screens/CreateCravingForm';
import SessionCompleteScreen from '../screens/SessionCompleteScreen'; // Import if needed

const Stack = createNativeStackNavigator();

export default function CalmingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CalmingSession"
        component={CalmingSessionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateCravingForm"
        component={CreateCravingForm}
        options={{ title: 'Create Craving', headerShown: false }}
      />
      <Stack.Screen name="SessionComplete" component={SessionCompleteScreen} options={{ title: 'Session Complete', headerShown: false }}/>
    </Stack.Navigator>
  );
}
