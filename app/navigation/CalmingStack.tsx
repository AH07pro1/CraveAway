import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalmingSessionScreen from '../screens/CalmingSessionScreen';
import CreateCravingForm from '../screens/CreateCravingForm';

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
        options={{ title: 'Create Craving' }}
      />
    </Stack.Navigator>
  );
}
