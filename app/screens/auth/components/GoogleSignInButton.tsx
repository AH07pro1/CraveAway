import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { useOAuth, useSignIn, useUser } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../../config';

export default function GoogleSignInButton() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { setActive } = useSignIn();
  const { user, isLoaded: userLoaded } = useUser();
  const navigation = useNavigation<any>();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        console.log('✅ Signed in with Google!');
        Alert.alert('Success', 'Signed in with Google!');

        // Wait for user info to be loaded and available
        if (!userLoaded || !user) {
          console.warn('User info not loaded yet, waiting...');
          // Simple delay or you can refactor to wait properly
          await new Promise((resolve) => setTimeout(resolve, 1000));
          if (!user) {
            console.error('User data still not available after waiting');
            return;
          }
        }

        const userId = user.id;
        console.log('Using userId:', userId);

        // Fetch onboarding data from AsyncStorage
        const onboardingString = await AsyncStorage.getItem('pendingOnboarding');
        console.log('pendingOnboarding:', onboardingString);

        if (onboardingString) {
          const onboardingPayload = JSON.parse(onboardingString);

          // Prepare POST body, only add photoUrl if valid string
          const bodyPayload: any = {
            userId: userId,
            message: onboardingPayload.message || null,
          };
          if (onboardingPayload.photoUri && onboardingPayload.photoUri.trim() !== '') {
            bodyPayload.photoUrl = onboardingPayload.photoUri;
          }

          try {
            const response = await fetch(`${API_URL}/api/onboarding`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(bodyPayload),
            });

            if (!response.ok) {
              const text = await response.text();
              console.warn('Onboarding post failed:', text);
            } else {
              console.log('Onboarding data posted successfully.');
              Alert.alert('Onboarding', 'Data posted successfully.');
            }
          } catch (fetchErr) {
            console.error('Fetch error:', fetchErr);
          }

          await AsyncStorage.removeItem('pendingOnboarding');
          console.log('Onboarding data removed from AsyncStorage.');
        } else {
          console.log('No onboarding data to post.');
        }

        // Check if user has paid
        const hasPaid = await AsyncStorage.getItem('hasPaid');
        console.log('hasPaid:', hasPaid);

        // Navigate based on payment status
        navigation.reset({
          index: 0,
          routes: [{ name: hasPaid === 'true' ? 'Tabs' : 'Paywall' }],
        });
        console.log('Navigation done.');
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
