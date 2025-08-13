import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { useOAuth, useSignIn, useSession } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../../config';

export default function GoogleSignInButton() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { setActive } = useSignIn();
  const { session } = useSession();
  const navigation = useNavigation<any>();

  // Helper to wait until session is loaded or timeout
  async function waitForSession(timeoutMs = 5000) {
    const start = Date.now();
    while (!session && Date.now() - start < timeoutMs) {
      await new Promise(res => setTimeout(res, 200));
    }
    if (!session) throw new Error('Session not loaded after waiting');
  }

  const handleGoogleSignIn = async () => {
    try {
      console.log('handleGoogleSignIn called');

      const onboardStr = await AsyncStorage.getItem('pendingOnboarding');
      console.log('Before Google sign-in, pendingOnboarding:', onboardStr);

      const { createdSessionId } = await startOAuthFlow();
      console.log('startOAuthFlow returned:', createdSessionId);

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        console.log('✅ Signed in with Google!');

        // Wait for the session to be ready before continuing
        await waitForSession();

        if (!session) throw new Error('Session is not available');
        const clerkSessionToken = await session.getToken();
        if (!clerkSessionToken) throw new Error('Could not get Clerk session token');

        if (onboardStr) {
          const onboardingPayload = JSON.parse(onboardStr);
          console.log('Posting onboarding data to backend...');

          const res = await fetch(`${API_URL}/api/onboarding`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${clerkSessionToken}`,
            },
            body: JSON.stringify(onboardingPayload),
          });

          if (!res.ok) {
            const text = await res.text();
            console.warn('Onboarding post failed:', text);
            Alert.alert('Error', 'Failed to post onboarding data');
          } else {
            console.log('✅ Onboarding posted successfully');
            await AsyncStorage.removeItem('pendingOnboarding');
          }
        } else {
          console.log('No onboarding data to post');
        }

        const hasPaid = await AsyncStorage.getItem('hasPaid');
        navigation.reset({
          index: 0,
          routes: [{ name: hasPaid === 'true' ? 'Tabs' : 'Paywall' }],
        });
      }
    } catch (err) {
      console.error('Google sign-in failed:', err);
      Alert.alert('Error', 'Google sign-in failed');
    }
  };

  return (
    <TouchableOpacity
      onPress={handleGoogleSignIn}
      style={{ backgroundColor: 'red', padding: 12, borderRadius: 8, marginTop: 20 }}
    >
      <Text style={{ color: 'white', textAlign: 'center' }}>Continue with Google</Text>
    </TouchableOpacity>
  );
}
