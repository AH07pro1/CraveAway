import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, Platform } from 'react-native';
import Purchases from 'react-native-purchases';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navigation from './navigation/Navigation';
import AuthStack from './navigation/AuthStack';
import OnboardingOrPaywallNavigator from './navigation/OnboardingOrPaywallNavigator';
import OnboardingScreen from './screens/OnBoardingScreen';
import PaywallScreen from './screens/PaywallScreen';
import Tabs from './navigation/Tabs';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { OnboardingProvider } from './context/OnBoardingContext';
import { VoiceProvider } from './context/VoiceContext';

import '../global.css';

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

const Stack = createNativeStackNavigator();

function NavigatorWrapper() {
  const { isLoading, hasOnboarded, hasPaid, isSignedIn, setHasPaid } = useAppState();
  const { isLoaded } = useAuth();

  // --- RevenueCat subscription check ---
  useEffect(() => {
    async function checkSubscriptionStatus() {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        const isPro = !!customerInfo.entitlements.active['Monthly Membership'];
        await AsyncStorage.setItem('hasPaid', isPro ? 'true' : 'false');
        setHasPaid(isPro);
      } catch (error) {
        console.warn('Failed to fetch subscription status:', error);
      }
    }

    checkSubscriptionStatus();
  }, []);

  if (isLoading || !isLoaded) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

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
  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    Purchases.configure({ apiKey: REVENUECAT_API_KEY });
  }, []);

  return (
    <ClerkProvider
      publishableKey="pk_test_bGl2ZS13aGFsZS0xMy5jbGVyay5hY2NvdW50cy5kZXYk"
      tokenCache={tokenCache}
      proxyUrl="https://CraveAway.expo.dev"
    >
      <OnboardingProvider>
        <AppStateProvider>
          <VoiceProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <NavigatorWrapper />
            </GestureHandlerRootView>
          </VoiceProvider>
        </AppStateProvider>
      </OnboardingProvider>
    </ClerkProvider>
  );
}
