import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider, SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation/Navigation';
import AuthStack from './navigation/AuthStack';
import { VoiceProvider } from './context/VoiceContext';
import { Platform } from 'react-native';
import OnboardingOrPaywallNavigator from './navigation/OnboardingOrPaywallNavigator';
import '../global.css';
import { ActivityIndicator } from 'react-native';
import Purchases from 'react-native-purchases';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootNavigator from './navigation/Navigation';
import InitialNavigator from './navigation/InitialNavigator';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { OnboardingProvider } from './context/OnBoardingContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnBoardingScreen';
import PaywallScreen from './screens/PaywallScreen';
import Tabs from './navigation/Tabs';
const REVENUECAT_API_KEY = Platform.select({
  android: 'goog_lTWAjIdmkcFLTnkNzVyEhdLiVZL',
}) ?? '';

const tokenCache = {
  async getToken(key: string) {
    return SecureStore.getItemAsync(key);
  },
  async saveToken(key: string, value: string) {
    return SecureStore.setItemAsync(key, value);
  },
};

const Stack = createNativeStackNavigator()
function NavigatorWrapper() {
  const { isLoading, hasOnboarded, hasPaid, isSignedIn } = useAppState();
const { isLoaded } = useAuth(); // Add this here

if (isLoading || !isLoaded) {
  return <ActivityIndicator size="large" style={{ flex: 1 }} />;
}


  const Stack = createNativeStackNavigator();

  let screenToRender: React.ComponentType<any> = OnboardingScreen;
  let screenName = 'Onboarding';

  if (!hasOnboarded) {
  screenName = 'Onboarding';
  screenToRender = OnboardingScreen;
} else if (!hasPaid) {
  screenName = 'Paywall';
  screenToRender = PaywallScreen;
} else if (!isSignedIn) {
  screenName = 'AuthStack';
  screenToRender = AuthStack;
} else {
  screenName = 'Tabs';
  screenToRender = Tabs;
}

  console.log('🚀 Navigator launching:', screenName);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={screenName} component={screenToRender} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ClerkProvider
      publishableKey="pk_test_bGl2ZS13aGFsZS0xMy5jbGVyay5hY2NvdW50cy5kZXYk"
      tokenCache={tokenCache}
      proxyUrl="https://CraveAway.expo.dev"
    >
      <OnboardingProvider>
      <AppStateProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigatorWrapper />
        </GestureHandlerRootView>
      </AppStateProvider>
      </OnboardingProvider>
    </ClerkProvider>
  );
}
