
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation/Navigation'; // will point to RootNavigator
import AuthStack from './navigation/AuthStack'; // your auth stack for sign-in/up
import { VoiceProvider } from './context/VoiceContext'; // Context for voice settings
import { Platform } from 'react-native';
import OnboardingOrPaywallNavigator from './navigation/OnboardingOrPaywallNavigator';
import '../global.css';

import Purchases from 'react-native-purchases';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REVENUECAT_API_KEY =
  Platform.select({
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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
  Purchases.configure({ apiKey: REVENUECAT_API_KEY });
}, []); // fixes the error in the build were the subscribe button was not working(supposedly it's a test)

useEffect(() => {
  const listener = Purchases.addCustomerInfoUpdateListener(async (customerInfo) => {
    const isPro = typeof customerInfo.entitlements.active['Monthly Membership'] !== 'undefined';
    if (isPro) {
      await AsyncStorage.setItem('hasPaid', 'true');
      setHasPaid(true); // <- this makes App re-render and go to <Navigation />
    }
  });


}, []);

  useEffect(() => {
    async function checkPayment() {
      try {
        const paidFlag = await AsyncStorage.getItem('hasPaid');
        setHasPaid(paidFlag === 'true');
      } catch (e) {
        console.warn('Failed to read payment status:', e);
      } finally {
        setIsLoading(false);
      }
    }
    checkPayment();
  }, []);

  if (isLoading) {
    // Show splash/loading screen or null while checking
    return null;
  }

  useEffect(() => {
  async function syncWithRevenueCat() {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      const isPro = typeof customerInfo.entitlements.active['Monthly Membership'] !== 'undefined';
      if (isPro) {
        await AsyncStorage.setItem('hasPaid', 'true');
        setHasPaid(true);
      }
    } catch (e) {
      console.warn('Failed to fetch RevenueCat info:', e);
    }
  }

  syncWithRevenueCat();
}, []);


  return (
    <ClerkProvider
      publishableKey="pk_test_bGl2ZS13aGFsZS0xMy5jbGVyay5hY2NvdW50cy5kZXYk"
      tokenCache={tokenCache}
      proxyUrl="https://CraveAway.expo.dev"
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <SignedIn>
            <VoiceProvider>
              {/* 
                Decide initial screen based on payment status:
                - If paid, go to main app
                - If not, go to onboarding/paywall flow 
              */}
              {hasPaid ? <Navigation /> : <OnboardingOrPaywallNavigator />}
            </VoiceProvider>
          </SignedIn>
          <SignedOut>
            <AuthStack />
          </SignedOut>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}