import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation/Navigation'; // will point to RootNavigator
import AuthStack from './navigation/AuthStack'; // your auth stack for sign-in/up
import '../global.css';

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
            <Navigation /> {/* RootNavigator */}
          </SignedIn>
          <SignedOut>
            <AuthStack /> {/* Your auth stack */}
          </SignedOut>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}
