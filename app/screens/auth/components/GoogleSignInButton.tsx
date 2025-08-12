import React, { useEffect, useState } from 'react';
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

  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    async function postOnboardingAndNavigate() {
      console.log('useEffect triggered with:', { signedIn, userLoaded, user });

      if (!signedIn) {
        console.log('Not signed in yet, returning');
        return;
      }

      if (!userLoaded) {
        console.log('User not loaded yet, returning');
        return;
      }

      if (!user) {
        console.log('User is null, waiting for user to load...');
        return; // wait here until user is ready
      }

      // Small delay to ensure everything is ready
      await new Promise((resolve) => setTimeout(resolve, 500));

      try {
        const userId = user.id;
        console.log('User loaded with ID:', userId);

        const onboardingString = await AsyncStorage.getItem('pendingOnboarding');
        console.log('pendingOnboarding:', onboardingString);

        if (onboardingString) {
          const onboardingPayload = JSON.parse(onboardingString);

          const bodyPayload: any = {
            userId,
            message: onboardingPayload.message || null,
          };
          if (onboardingPayload.photoUri && onboardingPayload.photoUri.trim() !== '') {
            bodyPayload.photoUrl = onboardingPayload.photoUri;
          }

          console.log('Posting onboarding data:', bodyPayload);

          const response = await fetch(`${API_URL}/api/onboarding`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyPayload),
          });

          if (!response.ok) {
            const text = await response.text();
            console.warn('Onboarding post failed:', text);
            Alert.alert('Onboarding post failed', text);
            return; // Stop here to avoid navigating before fixing
          } else {
            console.log('Onboarding data posted successfully.');
            Alert.alert('Onboarding', 'Data posted successfully.');
          }

          await AsyncStorage.removeItem('pendingOnboarding');
          console.log('Onboarding data removed from AsyncStorage.');
        } else {
          console.log('No onboarding data to post.');
        }

        const hasPaid = await AsyncStorage.getItem('hasPaid');
        console.log('hasPaid:', hasPaid);

        navigation.reset({
          index: 0,
          routes: [{ name: hasPaid === 'true' ? 'Tabs' : 'Paywall' }],
        });
        console.log('Navigation done.');

        setSignedIn(false);
      } catch (err) {
        console.error('Error during onboarding post and navigation:', err);
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    }

    postOnboardingAndNavigate();
  }, [signedIn, userLoaded, user]);

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
        Alert.alert('Success', 'Signed in with Google!');

        setSignedIn(true); // trigger effect to post onboarding & navigate
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
