import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSignIn, useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import colors from '../../utils/colors';
import GoogleSignInButton from './components/GoogleSignInButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useOnboarding } from '../../context/OnBoardingContext';
import { API_URL } from '../../config';
import { Ionicons } from '@expo/vector-icons';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const navigation = useNavigation<any>();
  const { onboardingData } = useOnboarding();
  const { user, isLoaded: userLoaded } = useUser();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  useEffect(() => {
    console.warn('SignInScreen mounted');
  }, []);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    setError(null);
    setLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        const token = signInAttempt.createdSessionId;

        const onboardingString = await AsyncStorage.getItem('pendingOnboarding');
        if (onboardingString) {
          const onboardingPayload = JSON.parse(onboardingString);
          const res = await fetch(`${API_URL}/api/onboarding`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              photoUrl: onboardingPayload.photoUri || null,
              message: onboardingPayload.message || null,
            }),
          });
          if (res.ok) await AsyncStorage.removeItem('pendingOnboarding');
        }

        const hasPaid = await AsyncStorage.getItem('hasPaid');
        navigation.reset({
          index: 0,
          routes: [{ name: hasPaid === 'true' ? 'Tabs' : 'Paywall' }],
        });
      } else {
        setError('Email or password is incorrect.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.errors?.[0]?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

return (
  <View style={{ flex: 1, backgroundColor: colors.background, padding: 24 }}>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {/* Small brand/logo */}
      {/* <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 16, color: colors.textSecondary }}>
        CraveAway
      </Text> */}

      {/* Main Heading */}
      <Text style={{ fontSize: 28, lineHeight: 34, fontWeight: 'bold', textAlign: 'center', marginBottom: 32, color: colors.primary }}>
        Sign In
      </Text>

      {/* Email Input */}
      <View style={{ marginBottom: 20 }}>
        {emailAddress || emailFocused ? (
          <Text style={{ color: colors.primary, fontSize: 14, marginBottom: 6 }}>Email</Text>
        ) : null}
        <TextInput
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={emailAddress}
          onChangeText={setEmailAddress}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          style={{
            borderWidth: 1,
            borderColor: emailFocused ? colors.primary : colors.border,
            padding: 16,
            borderRadius: 12,
            fontSize: 16,
            color: colors.textMain,
            backgroundColor: colors.accentLight,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
          }}
        />
      </View>

      {/* Password Input */}
      <View style={{ marginBottom: 16 }}>
        {password || passwordFocused ? (
          <Text style={{ color: colors.primary, fontSize: 14, marginBottom: 6 }}>Password</Text>
        ) : null}
        <View style={{ position: 'relative' }}>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            style={{
              borderWidth: 1,
              borderColor: passwordFocused ? colors.primary : colors.border,
              padding: 16,
              borderRadius: 12,
              fontSize: 16,
              color: colors.textMain,
              backgroundColor: colors.accentLight,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
            }}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: 16, top: 18 }}
          >
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Error Message */}
      {error && <Text style={{ color: colors.error, textAlign: 'center', marginBottom: 16 }}>{error}</Text>}

      {/* Sign In Button */}
      <TouchableOpacity
        onPress={onSignInPress}
        disabled={loading}
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
          alignItems: 'center',
        }}
      >
        {loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Sign In</Text>
        )}
      </TouchableOpacity>

      {/* Social Login */}
      <GoogleSignInButton />

      {/* Sign Up Prompt */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
        <Text style={{ color: colors.textSecondary }}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ color: colors.primary, fontWeight: '600' }}>Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* Trust Note */}
      <Text style={{ textAlign: 'center', color: colors.textSecondary, fontSize: 12, marginTop: 8 }}>
        Your credentials are securely encrypted.
      </Text>
    </View>
  </View>
);




}
