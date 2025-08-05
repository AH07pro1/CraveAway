// navigation/RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import { useAppState } from '../context/AppStateContext';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { hasOnboarded, hasPaid } = useAppState();

  let initialRoute = 'Tabs'; // default if all good

  if (!hasOnboarded) initialRoute = 'Onboarding';
  else if (!hasPaid) initialRoute = 'Paywall';

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      {!hasOnboarded && <Stack.Screen name="Onboarding" component={require('../screens/OnBoardingScreen').default} />}
      {!hasPaid && <Stack.Screen name="Paywall" component={require('../screens/PaywallScreen').default} />}
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
}
