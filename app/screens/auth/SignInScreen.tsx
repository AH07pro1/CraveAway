import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useSignIn, useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import colors from '../../utils/colors';
import GoogleSignInButton from './components/GoogleSignInButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useOnboarding } from '../../context/OnBoardingContext';
import { API_URL } from '../../config';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const navigation = useNavigation<any>();
  const { onboardingData } = useOnboarding();
  const { user, isLoaded: userLoaded } = useUser();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [justSignedIn, setJustSignedIn] = React.useState(false);

  useEffect(() => {
    console.warn('SignInScreen mounted');
  }, []);

  const onSignInPress = async () => {
    console.warn('onSignInPress triggered');
    Alert.alert('Debug', 'onSignInPress triggered');

    console.warn('signIn:', signIn);
    console.warn('setActive:', setActive);
    console.warn('isLoaded:', isLoaded);

    if (!isLoaded) {
      console.warn('Sign-in not loaded yet, aborting.');
      return;
    }
    setError(null);

    try {
      console.warn('Starting sign-in process...');
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });
      console.warn('signInAttempt object:', signInAttempt);

     if (signInAttempt.status === 'complete') {
  await setActive({ session: signInAttempt.createdSessionId });

  const token = signInAttempt.createdSessionId;

  // Post onboarding if any
  const onboardingString = await AsyncStorage.getItem('pendingOnboarding');
  if (onboardingString) {
    const onboardingPayload = JSON.parse(onboardingString);

    const res = await fetch(`${API_URL}/api/onboarding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // ✅ use token not userId
      },
      body: JSON.stringify({
        photoUrl: onboardingPayload.photoUri || null,
        message: onboardingPayload.message || null,
      }),
    });

    if (!res.ok) {
      console.warn('Onboarding post failed:', await res.text());
    } else {
      await AsyncStorage.removeItem('pendingOnboarding');
    }
  }

  // Navigate
  const hasPaid = await AsyncStorage.getItem('hasPaid');
  navigation.reset({
    index: 0,
    routes: [{ name: hasPaid === 'true' ? 'Tabs' : 'Paywall' }],
  });
}
 else {
        setError('Sign in incomplete. Please try again.');
        console.warn('Sign in incomplete status:', signInAttempt.status);
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(err?.errors?.[0]?.message || 'Sign in failed');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 24, textAlign: 'center' }}>
        Sign In
      </Text>

      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        keyboardType="email-address"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          padding: 16,
          borderRadius: 12,
          marginBottom: 16,
          fontSize: 16,
          color: colors.textMain,
          backgroundColor: colors.accentLight,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          padding: 16,
          borderRadius: 12,
          marginBottom: 16,
          fontSize: 16,
          color: colors.textMain,
          backgroundColor: colors.accentLight,
        }}
      />

      {error && (
        <Text style={{ color: colors.error, textAlign: 'center', marginBottom: 16 }}>{error}</Text>
      )}

      <TouchableOpacity
        onPress={() => {
          console.warn('Button pressed');
          onSignInPress();
        }}
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 16,
          borderRadius: 12,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 3 },
          elevation: 5,
        }}
        activeOpacity={0.85}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: '600' }}>
          Continue
        </Text>
      </TouchableOpacity>

      <GoogleSignInButton />

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 28 }}>
        <Text style={{ color: colors.textSecondary }}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ color: colors.primary, fontWeight: '600' }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
