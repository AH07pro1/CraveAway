import React from 'react';
import { TouchableOpacity, Text, Alert, Image } from 'react-native';
import { useOAuth, useSignIn, useSession } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../../config';

export default function GoogleSignInButton() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { setActive } = useSignIn();
  const { session } = useSession();
  const navigation = useNavigation<any>();

  async function waitForSession(timeoutMs = 5000) {
    const start = Date.now();
    while (!session && Date.now() - start < timeoutMs) {
      await new Promise(res => setTimeout(res, 200));
    }
    if (!session) throw new Error('Session not loaded after waiting');
  }

const handleGoogleSignIn = async () => {
  try {
    const onboardStr = await AsyncStorage.getItem('pendingOnboarding');

    const { createdSessionId } = await startOAuthFlow();

    if (createdSessionId && setActive) {
      await setActive({ session: createdSessionId });
      console.log('✅ Signed in with Google!');

      // Grab session token to send to backend
      const token = session?.id; // Clerk session token

      if (onboardStr) {
        const onboardingPayload = JSON.parse(onboardStr);

        console.log('Posting onboarding data to backend...', onboardingPayload);

        const res = await fetch(`${API_URL}/api/onboarding`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // pass token in header
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
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  }}
>
  <Image
     source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/1002px-Google_Favicon_2025.svg.png' }}
    style={{ width: 25, height: 25, marginRight: 10 }}
     resizeMode="contain"
  />
  <Text style={{ color: '#000', fontWeight: '500' }}>Sign in with Google</Text>
</TouchableOpacity>

  );
}
