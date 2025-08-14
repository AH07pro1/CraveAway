import React from 'react';
import { TouchableOpacity, Text, Alert, Image } from 'react-native';
import { useSSO, useSession } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../../config';

export default function GoogleSignInButton() {
  const { startSSOFlow } = useSSO();
  const { session } = useSession();
  const navigation = useNavigation<any>();

const handleGoogleSignIn = async () => {
  try {
    const onboardStr = await AsyncStorage.getItem('pendingOnboarding');

    // Start SSO (Google OAuth)
    const { createdSessionId, setActive } = await startSSOFlow({
      strategy: 'oauth_google',
    });

    if (!createdSessionId) throw new Error('Failed to create session');

    // Activate the session so Clerk knows it's active
    if (setActive) {
      await setActive({ session: createdSessionId });
    }

    console.log('✅ Signed in with Google!');

    // Use createdSessionId directly as the Bearer token
    const token = createdSessionId;

    // Post onboarding if any
    if (onboardStr) {
      const onboardingPayload = JSON.parse(onboardStr);
      const res = await fetch(`${API_URL}/api/onboarding`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
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

    // Navigate after onboarding
    const hasPaid = await AsyncStorage.getItem('hasPaid');
    navigation.reset({ index: 0, routes: [{ name: hasPaid === 'true' ? 'Tabs' : 'Paywall' }] });

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
        backgroundColor: '#FFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#DDD',
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/1002px-Google_Favicon_2025.svg.png'
        }}
        style={{ width: 25, height: 25, marginRight: 10 }}
        resizeMode="contain"
      />
      <Text style={{ color: '#000', fontWeight: '500' }}>Sign in with Google</Text>
    </TouchableOpacity>
  );
}
