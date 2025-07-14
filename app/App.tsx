import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native'; // ✅ ADD THIS
import Navigation from './navigation/Navigation';
import SignInScreen from './screens/auth/SignInScreen';
import '../global.css';
import AuthStack from './navigation/AuthStack'; // Import your AuthStack

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
    <ClerkProvider publishableKey="pk_test_bGl2ZS13aGFsZS0xMy5jbGVyay5hY2NvdW50cy5kZXYk" tokenCache={tokenCache}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <SignedIn>
            <Navigation /> {/* Your main app */}
          </SignedIn>
          <SignedOut>
            <AuthStack />  {/* <-- Auth screens inside a navigator */}
          </SignedOut>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}
