import { useClerk } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const navigation = useNavigation<any>();

  const handleSignOut = async () => {
    console.log("Signing out...");
    try {
      await signOut();
      navigation.replace('SignIn');
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSignOut}
      className="bg-red-600 py-3 rounded-lg mt-6 mx-4"
      activeOpacity={0.8}
    >
      <Text className="text-white text-center font-semibold text-lg">
        Sign Out
      </Text>
    </TouchableOpacity>
  );
};
