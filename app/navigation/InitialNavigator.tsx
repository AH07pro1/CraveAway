import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnBoardingScreen';
import PaywallScreen from '../screens/PaywallScreen';
import AuthStack from './AuthStack';
import { useAppState } from '../context/AppStateContext';

const Stack = createNativeStackNavigator();

export default function InitialNavigator() {
  const { hasOnboarded, hasPaid, isSignedIn } = useAppState();

  let initialRoute = 'Onboarding';

 if (!hasOnboarded) {
  initialRoute = 'Onboarding';
} else if (!hasPaid && isSignedIn) {
  initialRoute = 'Paywall';
} else if (hasPaid && !isSignedIn) {
  initialRoute = 'AuthStack';
} else if (hasPaid && isSignedIn) {
  initialRoute = 'Tabs';
} else {
  // fallback, maybe go to AuthStack or Onboarding
  initialRoute = 'AuthStack';
}

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Paywall" component={PaywallScreen} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
}
