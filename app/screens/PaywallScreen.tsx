import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../utils/colors';
import Purchases from 'react-native-purchases';

export default function PaywallScreen({ navigation }: any) {
  async function completePayment() {
    try {
      const offerings = await Purchases.getOfferings();
      const currentOffering = offerings.current;

      if (currentOffering && currentOffering.availablePackages.length > 0) {
        const { customerInfo } = await Purchases.purchasePackage(currentOffering.availablePackages[0]);

        const isPro = typeof customerInfo.entitlements.active['Monthly Membership'] !== 'undefined';

        if (isPro) {
          await AsyncStorage.setItem('hasPaid', 'true');
          navigation.replace('Tabs');
        } else {
          alert("Purchase didn't unlock the entitlement.");
        }
      } else {
        alert('No available subscription packages found.');
      }
    } catch (error: any) {
      if (!error.userCancelled) {
        alert('Something went wrong during purchase.');
        console.warn('Purchase error', error);
      }
    }
  }

  // Handle continue without subscribing (testing)
  async function continueWithoutSubscribe() {
    await AsyncStorage.setItem('hasPaid', 'true'); // Mark as paid for testing
    navigation.replace('Tabs');
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 justify-center items-center p-8 bg-white" style={{ backgroundColor: colors.background }}>
        <Text className="text-3xl font-extrabold text-center mb-4" style={{ color: colors.primary }}>
          Unlock Your Recovery Journey
        </Text>
        <Text className="text-base text-center mb-8" style={{ color: colors.textSecondary }}>
          Gain full access to CraveAway and start your transformation today.
        </Text>

        <View className="w-full mb-6">
          <Text className="text-lg font-semibold mb-2" style={{ color: colors.textPrimary }}>Premium Includes:</Text>
          <Text className="mb-1" style={{ color: colors.textSecondary }}>• Unlimited craving logs</Text>
          <Text className="mb-1" style={{ color: colors.textSecondary }}>• Personalized breathing exercises</Text>
          <Text className="mb-1" style={{ color: colors.textSecondary }}>• Progress streaks & motivational tracking</Text>
        </View>

        <View className="items-center mb-8">
          <Text className="text-xl font-bold mb-2" style={{ color: colors.primary }}>$4.99/month</Text>
          <Text className="text-sm text-gray-500">No subscriptions. Pay once, heal forever.</Text>
        </View>

        <TouchableOpacity
          onPress={completePayment}
          className="bg-blue-600 rounded-full px-10 py-4 mb-4"
          style={{ backgroundColor: colors.primary }}
          activeOpacity={0.85}
        >
          <Text className="text-white font-bold text-lg">Subscribe Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={continueWithoutSubscribe}
          activeOpacity={0.6}
        >
          <Text className="text-sm underline text-gray-500">Continue without subscribing</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
