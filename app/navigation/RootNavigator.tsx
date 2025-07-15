import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import OnboardingScreen from '../screens/OnBoardingScreen';
import PaywallScreen from '../screens/PaywallScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    async function checkFlags() {
      try {
        const onboarded = await AsyncStorage.getItem('hasOnboarded');
        const paid = await AsyncStorage.getItem('hasPaid');
        setHasOnboarded(onboarded === 'true');
        setHasPaid(paid === 'true');
      } catch (error) {
        console.error('Error reading onboarding/payment flags:', error);
      } finally {
        setIsLoading(false);
      }
    }
    checkFlags();
  }, []);

  if (isLoading) {
    // You can replace this with a proper loading component/screen
    return null;
  }

  // Decide initial route based on flags
  let initialRoute = 'Onboarding';
  if (hasOnboarded) {
    initialRoute = hasPaid ? 'Tabs' : 'Paywall';
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Paywall" component={PaywallScreen} />
      <Stack.Screen name="Tabs" component={Tabs} />
    </Stack.Navigator>
  );
}
