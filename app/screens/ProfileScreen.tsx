import React from 'react';
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import { useUser, useClerk } from '@clerk/clerk-expo';
import { format } from 'date-fns';
import colors from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigation = useNavigation<any>();

  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background }}>
        <Text className="text-lg" style={{ color: colors.textSecondary }}>
          Loading profile...
        </Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background }}>
        <Text className="text-lg font-semibold" style={{ color: colors.error }}>
          No user is signed in.
        </Text>
      </View>
    );
  }

  const profileImageUrl = user.imageUrl;
  const createdDate = user.createdAt ? format(new Date(user.createdAt), 'PPP') : 'N/A';
  const lastSignInDate = user.lastSignInAt ? format(new Date(user.lastSignInAt), 'PPP p') : 'N/A';

  const handleSignOut = () => {
    Alert.alert(
      'Confirm Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              navigation.replace('SignIn'); // Adjust if needed
            } catch (err) {
              console.error("Error signing out", err);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      `Are you sure you want to delete your account, ${user.fullName || user.firstName || 'User'}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await user.delete();
              // After deletion, navigate to sign-in or landing page
              navigation.replace('SignIn');
            } catch (error) {
              console.error('Failed to delete account:', error);
              Alert.alert('Error', 'Failed to delete account. Please try again later.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View
      className="flex-1 px-6 pb-10 justify-between"
      style={{ backgroundColor: colors.background, paddingTop: 48 }}
    >
      <View>
        <View className="items-center mb-6">
          {profileImageUrl ? (
            <Image
              source={{ uri: profileImageUrl }}
              className="w-32 h-32 rounded-full mb-4 border-2"
              style={{ borderColor: colors.primary }}
            />
          ) : (
            <View
              className="w-32 h-32 rounded-full mb-4 justify-center items-center"
              style={{ backgroundColor: colors.primary }}
            >
              <Text className="text-5xl font-bold text-white">{user.firstName?.[0] ?? 'U'}</Text>
            </View>
          )}

          <Text className="text-2xl font-extrabold mb-1" style={{ color: colors.textMain }}>
            {user.fullName || user.firstName || 'User'}
          </Text>
          <Text className="text-base font-medium" style={{ color: colors.textSecondary }}>
            {user.primaryEmailAddress?.emailAddress || 'No email'}
          </Text>
        </View>

        <View className="border-t border-gray-300 pt-6 space-y-5">
          <View>
            <Text className="text-sm font-semibold mb-1" style={{ color: colors.textSecondary }}>
              Username
            </Text>
            <Text className="text-base font-semibold" style={{ color: colors.textMain }}>
              {user.username || user.id || 'N/A'}
            </Text>
          </View>

          <View>
            <Text className="text-sm font-semibold mb-1" style={{ color: colors.textSecondary }}>
              Email Verified
            </Text>
            <Text className="text-base font-semibold" style={{ color: colors.textMain }}>
              {user.primaryEmailAddress?.verification?.status === 'verified' ? 'Yes ✅' : 'No ❌'}
            </Text>
          </View>

          <View>
            <Text className="text-sm font-semibold mb-1" style={{ color: colors.textSecondary }}>
              Phone Number
            </Text>
            <Text className="text-base font-semibold" style={{ color: colors.textMain }}>
              {user.phoneNumbers && user.phoneNumbers.length > 0
                ? user.phoneNumbers[0].phoneNumber
                : 'N/A'}
            </Text>
          </View>

          <View>
            <Text className="text-sm font-semibold mb-1" style={{ color: colors.textSecondary }}>
              Account Created
            </Text>
            <Text className="text-base font-semibold" style={{ color: colors.textMain }}>
              {createdDate}
            </Text>
          </View>

          <View>
            <Text className="text-sm font-semibold mb-1" style={{ color: colors.textSecondary }}>
              Last Sign In
            </Text>
            <Text className="text-base font-semibold" style={{ color: colors.textMain }}>
              {lastSignInDate}
            </Text>
          </View>
        </View>
      </View>

      {/* Buttons container */}
      <View
        className="mt-8 flex-row justify-center space-x-4"
        style={{ paddingHorizontal: 16 }}
      >
        <TouchableOpacity
  onPress={handleSignOut}
  style={{
    backgroundColor: colors.error,
    paddingHorizontal: 24,
    paddingVertical: 8,   // less vertical padding
    borderRadius: 20,     // slightly smaller radius
    width: 140,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  }}
>
  <Text
    style={{
      color: 'white',
      fontWeight: '600',
      fontSize: 14,   // slightly smaller font size
      textAlign: 'center',
      overflow: 'hidden',
    }}
  >
    Sign Out
  </Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={handleDeleteAccount}
  style={{
    backgroundColor: '#b91c1c',
    paddingHorizontal: 24,
    paddingVertical: 8,   // less vertical padding
    borderRadius: 20,
    width: 140,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  }}
>
  <Text
    style={{
      color: 'white',
      fontWeight: '600',
      fontSize: 14,
      textAlign: 'center',
      overflow: 'hidden',
    }}
  >
    Delete Account
  </Text>
</TouchableOpacity>

      </View>
    </View>
  );
}
