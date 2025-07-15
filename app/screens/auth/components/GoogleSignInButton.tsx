import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';
import { useSignIn } from '@clerk/clerk-expo'; // to access setActive

export default function GoogleSignInButton() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { setActive } = useSignIn(); // get setActive here

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        console.log('✅ Signed in with Google!');
        // Optionally, navigate to Home screen here or via parent component
      }
    } catch (err) {
      console.error('Google sign-in failed:', err);
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
