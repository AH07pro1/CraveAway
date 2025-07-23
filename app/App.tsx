import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation/Navigation'; // will point to RootNavigator
import AuthStack from './navigation/AuthStack'; // your auth stack for sign-in/up
import { VoiceProvider } from './context/VoiceContext'; // Context for voice settings
import { Platform } from 'react-native';

import '../global.css';

import Purchases from 'react-native-purchases';

const REVENUECAT_API_KEY = Platform.select({
  // ios: 'your_ios_revenuecat_key',
  android: 'goog_lTWAjIdmkcFLTnkNzVyEhdLiVZL',
});

useEffect(() => {
  Purchases.configure({ apiKey: REVENUECAT_API_KEY! });

}, []);



const tokenCache = {
  async getToken(key: string) {
    return SecureStore.getItemAsync(key);
  },
  async saveToken(key: string, value: string) {
    return SecureStore.setItemAsync(key, value);
  },
};

export default function App() {
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
                  <Navigation /> {/* RootNavigator */}
            </VoiceProvider>
            
          </SignedIn>
          <SignedOut>
            <AuthStack /> {/* Your auth stack */}
          </SignedOut>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}
