import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';

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

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err?.errors?.[0]?.message || 'Sign-up failed.');
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        navigation.replace('Home'); // Adjust to your actual home screen name
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        setError('Verification incomplete. Please try again.');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err?.errors?.[0]?.message || 'Verification failed.');
    }
  };

  if (pendingVerification) {
    return (
      <View className="flex-1 justify-center px-6 bg-white">
        <Text className="text-2xl font-bold text-center mb-6">Verify your email</Text>
        <TextInput
          className="border border-gray-300 rounded p-3 mb-4"
          value={code}
          placeholder="Enter your verification code"
          onChangeText={setCode}
        />
        <TouchableOpacity onPress={onVerifyPress} className="bg-blue-500 p-3 rounded mb-4">
          <Text className="text-white text-center">Verify</Text>
        </TouchableOpacity>
        {error && <Text className="text-red-500 text-center">{error}</Text>}
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold text-center mb-6">Sign up</Text>

      <TextInput
        className="border border-gray-300 rounded p-3 mb-4"
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
      />

      <TextInput
        className="border border-gray-300 rounded p-3 mb-4"
        value={password}
        placeholder="Enter password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={onSignUpPress} className="bg-blue-500 p-3 rounded mb-4">
        <Text className="text-white text-center">Continue</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text className="text-blue-600">Sign in</Text>
        </TouchableOpacity>
      </View>

      {error && <Text className="text-red-500 text-center mt-2">{error}</Text>}
    </View>
  );
}
