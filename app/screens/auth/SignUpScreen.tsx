import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import colors from '../../utils/colors';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigation = useNavigation<any>();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

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
        navigation.replace('Home');
      } else {
        setError('Verification incomplete. Please try again.');
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'Verification failed.');
    }
  };

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

        {error && (
          <Text style={{ color: colors.error, textAlign: 'center', marginBottom: 16 }}>{error}</Text>
        )}

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
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: '600' }}>
            Verify
          </Text>
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

      {error && (
        <Text style={{ color: colors.error, textAlign: 'center', marginBottom: 16 }}>{error}</Text>
      )}

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
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: '600' }}>
          Continue
        </Text>
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
