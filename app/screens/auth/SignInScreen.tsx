import { useSignIn } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const navigation = useNavigation<any>();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        navigation.replace('Home'); // or your home screen route name
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="p-6">
      <Text className="text-xl font-bold mb-4">Sign in</Text>

      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
        className="border p-3 mb-3 rounded"
      />

      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry
        onChangeText={setPassword}
        className="border p-3 mb-3 rounded"
      />

      <TouchableOpacity onPress={onSignInPress} className="bg-blue-500 p-3 rounded mb-4">
        <Text className="text-white text-center">Continue</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center">
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text className="text-blue-600">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
