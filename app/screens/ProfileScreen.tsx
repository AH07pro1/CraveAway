import React from 'react';
import { View, Text, Image } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { format } from 'date-fns';
import colors from '../utils/colors';
import { SignOutButton } from './auth/components/SignOutButton';

export default function ProfileScreen() {
  const { user, isLoaded } = useUser();

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

  const createdDate = user.createdAt
    ? format(new Date(user.createdAt), 'PPP')
    : 'N/A';
  const lastSignInDate = user.lastSignInAt
    ? format(new Date(user.lastSignInAt), 'PPP p')
    : 'N/A';

  return (
    <View className="flex-1 px-6 pb-10 justify-between" style={{ backgroundColor: colors.background, paddingTop: 48 }}>
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
              <Text className="text-5xl font-bold text-white">
                {user.firstName?.[0] ?? 'U'}
              </Text>
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

      {/* Sign Out Button */}
      <View className="mt-8">
        <SignOutButton />
      </View>
    </View>
  );
}
