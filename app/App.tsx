import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation/Navigation';
import AuthStack from './navigation/AuthStack';
import { VoiceProvider } from './context/VoiceContext';
import { Platform } from 'react-native';
import OnboardingOrPaywallNavigator from './navigation/OnboardingOrPaywallNavigator';
import '../global.css';

import Purchases from 'react-native-purchases';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootNavigator from './navigation/Navigation';

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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        Purchases.configure({ apiKey: REVENUECAT_API_KEY });

        const customerInfo = await Purchases.getCustomerInfo();
        const isPro = !!customerInfo.entitlements.active['Monthly Membership'];

        if (isPro) {
          await AsyncStorage.setItem('hasPaid', 'true');
        } else {
          await AsyncStorage.removeItem('hasPaid');
        }

        setHasPaid(isPro);

        Purchases.addCustomerInfoUpdateListener(async (info) => {
          const active = !!info.entitlements.active['Monthly Membership'];
          await AsyncStorage.setItem('hasPaid', active ? 'true' : 'false');
          setHasPaid(active);
        });
      } catch (e) {
        console.warn('RevenueCat or AsyncStorage error:', e);
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, []);

  if (isLoading) return null;

  return (
    <ClerkProvider
      publishableKey="pk_test_bGl2ZS13aGFsZS0xMy5jbGVyay5hY2NvdW50cy5kZXYk"
      tokenCache={tokenCache}
      proxyUrl="https://CraveAway.expo.dev"
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <SignedIn>
            {/* <VoiceProvider>
              {hasPaid ? <Navigation /> : <OnboardingOrPaywallNavigator />}
            </VoiceProvider> */}
            <VoiceProvider>
  <RootNavigator />
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
