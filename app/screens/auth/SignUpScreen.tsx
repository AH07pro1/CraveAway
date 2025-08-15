import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useSignUp, useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import colors from '../../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config';
import { useOnboarding } from '../../context/OnBoardingContext';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigation = useNavigation<any>();
  const { user, isLoaded: userLoaded } = useUser();
  const { onboardingData } = useOnboarding();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [justVerified, setJustVerified] = React.useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setError(null);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'Sign-up failed.');
    }
  };

  const onVerifyPress = async () => {
  if (!isLoaded) return;
  setError(null);

  try {
    const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

    if (signUpAttempt.status === 'complete') {
      await setActive({ session: signUpAttempt.createdSessionId });
      setPendingVerification(false);

      const token = signUpAttempt.createdSessionId;

      // Post onboarding
      try {
        await fetch(`${API_URL}/api/onboarding`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // ✅ secure session auth
          },
          body: JSON.stringify({
            photoUrl: onboardingData.photoUrl,
            message: onboardingData.message,
          }),
        });
      } catch (err) {
        console.warn('Failed to post onboarding data after sign-up', err);
      }

      // Navigate
      const hasPaid = await AsyncStorage.getItem('hasPaid');
      navigation.reset({
        index: 0,
        routes: [{ name: hasPaid === 'true' ? 'Tabs' : 'Paywall' }],
      });
    } else {
      setError('Verification incomplete. Please try again.');
    }
  } catch (err: any) {
    setError(err?.errors?.[0]?.message || 'Verification failed.');
  }
};


  useEffect(() => {
  let interval: any;

  if (justVerified) {
    interval = setInterval(() => {
      if (userLoaded && user) {
        clearInterval(interval);
        (async () => {
          try {
            console.log('Posting onboarding data after sign-up...');
            await fetch(`${API_URL}/api/onboarding`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: user.id,
                photoUrl: onboardingData.photoUrl,
                message: onboardingData.message,
              }),
            });
            console.log('Posted onboarding data after sign-up');

            const hasPaid = await AsyncStorage.getItem('hasPaid');
            navigation.reset({
              index: 0,
              routes: [{ name: hasPaid === 'true' ? 'Tabs' : 'Paywall' }],
            });
          } catch (err) {
            console.warn('Failed to post onboarding data after sign-up', err);
          } finally {
            setJustVerified(false);
          }
        })();
      }
    }, 200);
  }

  return () => clearInterval(interval);
}, [justVerified, userLoaded, user]);


  if (pendingVerification) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.primary, marginBottom: 24, textAlign: 'center' }}>
          Verify your email
        </Text>

        <TextInput
          placeholder="Enter verification code"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
            fontSize: 16,
            color: colors.textMain,
            backgroundColor: colors.accentLight,
            textAlign: 'center',
          }}
        />

        {error && <Text style={{ color: colors.error, textAlign: 'center', marginBottom: 16 }}>{error}</Text>}

        <TouchableOpacity
          onPress={onVerifyPress}
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
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: '600' }}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 24, textAlign: 'center' }}>
        Sign Up
      </Text>

      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
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

      {error && <Text style={{ color: colors.error, textAlign: 'center', marginBottom: 16 }}>{error}</Text>}

      <TouchableOpacity
        onPress={onSignUpPress}
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
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: '600' }}>Continue</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={{ color: colors.textSecondary }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={{ color: colors.primary, fontWeight: '600' }}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
