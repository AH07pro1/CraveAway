import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useUser, useClerk } from '@clerk/clerk-expo';
import { format } from 'date-fns';
import colors from '../utils/colors';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppState } from '../context/AppStateContext';

const API_URL = "https://api.twins4soft.com";  // your API base URL

export default function ProfileScreen() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigation = useNavigation<any>();
  const { setIsSignedIn, setHasPaid } = useAppState();

  // State to hold backend onboarding info
  const [onboardingPhotoUrl, setOnboardingPhotoUrl] = useState<string | null>(null);
  const [onboardingMessage, setOnboardingMessage] = useState<string | null>(null);
  const [loadingOnboarding, setLoadingOnboarding] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
console.log('Fetching onboarding data for user:', user.id);

    // Fetch onboarding data from backend
    async function fetchOnboarding() {
      try {
        if (!user) return;
        const response = await fetch(`${API_URL}/api/onboarding?userId=${user.id}`);

        if (response.ok) {
          const json = await response.json();
          if (json.success && json.data) {
            setOnboardingPhotoUrl(json.data.photoUrl || null);
            setOnboardingMessage(json.data.message || null);
          }
        }
      } catch (error) {
        console.error("Failed to fetch onboarding data:", error);
      } finally {
        setLoadingOnboarding(false);
      }
    }

    fetchOnboarding();
  }, [user?.id]);

  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background }}>
        <Text style={{ color: colors.textSecondary, fontSize: 16 }}>Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background }}>
        <Text style={{ color: colors.error, fontSize: 16, fontWeight: '600' }}>No user is signed in.</Text>
      </View>
    );
  }

  const createdDate = user.createdAt ? format(new Date(user.createdAt), 'PPP') : 'N/A';
  const lastSignInDate = user.lastSignInAt ? format(new Date(user.lastSignInAt), 'PPP p') : 'N/A';

  const handleSignOut = () => {
    Alert.alert('Confirm Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut(); // Clerk sign-out
            await AsyncStorage.setItem('hasOnboarded', 'true'); // skip onboarding next time
            setIsSignedIn(false); // trigger Navigator rerender
            setHasPaid(false);    // Optional: show Paywall again
          } catch (err) {
            console.error("Error signing out", err);
          }
        },
      },
    ]);
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
              navigation.replace('SignIn');
            } catch (error) {
              console.error('Failed to delete account:', error);
              Alert.alert('Error', 'Failed to delete account. Please try again later.');
            }
          },
        },
      ]
    );
  };

  // Use backend photo if present, otherwise fallback to Clerk photo or initial
  const profileImageUrl = onboardingPhotoUrl || user.imageUrl;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 24 }}>
      {/* Header */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: colors.primary,
          textAlign: 'center',
          marginTop: 40,
          marginBottom: 24,
        }}
      >
        Your Profile
      </Text>

      {/* Profile card */}
      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.accentLight,
          padding: 20,
          borderRadius: 16,
          marginBottom: 24,
        }}
      >
        {profileImageUrl ? (
          <Image
            source={{ uri: profileImageUrl }}
            style={{
              width: 128,
              height: 128,
              borderRadius: 64,
              borderWidth: 3,
              borderColor: colors.primary,
              marginBottom: 12,
            }}
          />
        ) : (
          <View
            style={{
              width: 128,
              height: 128,
              borderRadius: 64,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 48, color: 'white', fontWeight: 'bold' }}>
              {user.firstName?.[0] ?? 'U'}
            </Text>
          </View>
        )}

        {/* Show onboarding message if present */}
        {onboardingMessage ? (
          <Text style={{ fontSize: 16, color: colors.textSecondary, fontStyle: 'italic', marginBottom: 12, textAlign: 'center' }}>
            {onboardingMessage}
          </Text>
        ) : null}

        <Text style={{ fontSize: 22, fontWeight: '800', color: colors.textMain }}>
          {user.fullName || user.firstName || 'User'}
        </Text>
        <Text style={{ fontSize: 16, color: colors.textSecondary, marginTop: 4 }}>
          {user.primaryEmailAddress?.emailAddress || 'No email'}
        </Text>
      </View>

      {/* Info Card */}
      <View
        style={{
          backgroundColor: colors.accentLight,
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
        }}
      >
        {[
          { label: 'Username', value: user.username || user.id || 'N/A' },
          {
            label: 'Email Verified',
            value: user.primaryEmailAddress?.verification?.status === 'verified' ? 'Yes ✅' : 'No ❌',
          },
          {
            label: 'Phone Number',
            value:
              user.phoneNumbers && user.phoneNumbers.length > 0
                ? user.phoneNumbers[0].phoneNumber
                : 'N/A',
          },
          { label: 'Account Created', value: createdDate },
          { label: 'Last Sign In', value: lastSignInDate },
        ].map((item, index) => (
          <View key={index} style={{ marginBottom: 16 }}>
            <Text style={{ color: colors.textSecondary, fontSize: 14, fontWeight: '600' }}>
              {item.label}
            </Text>
            <Text style={{ color: colors.textMain, fontSize: 16 }}>{item.value}</Text>
          </View>
        ))}
      </View>

      {/* Buttons */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <TouchableOpacity
          onPress={handleSignOut}
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 10,
            borderRadius: 20,
            flex: 1,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
        >
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDeleteAccount}
          style={{
            backgroundColor: colors.error,
            paddingVertical: 10,
            borderRadius: 20,
            flex: 1,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
        >
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
