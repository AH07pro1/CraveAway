import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';
import colors from '../utils/colors';
import { useAppState } from '../context/AppStateContext';

export default function PaywallScreen({ navigation }: any) {
  const { setHasPaid , setHasOnboarded} = useAppState();
  async function completePayment() {
  try {
    const offerings = await Purchases.getOfferings();
    const currentOffering = offerings.current;

    if (currentOffering && currentOffering.availablePackages.length > 0) {
      const { customerInfo } = await Purchases.purchasePackage(currentOffering.availablePackages[0]);

      const isPro = typeof customerInfo.entitlements.active['Monthly Membership'] !== 'undefined';

      if (isPro) {
        await AsyncStorage.setItem('hasPaid', 'true');
setHasPaid(true);
navigation.navigate('AuthStack');

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


    async function continueWithoutSubscribe() {
    await AsyncStorage.setItem('hasPaid', 'true');
setHasPaid(true);
navigation.navigate('AuthStack');

  }
  const resetAppData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All AsyncStorage data cleared.');
  } catch (e) {
    console.warn('Failed to clear AsyncStorage:', e);
  }
};
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, backgroundColor: colors.background }}>
      <View className="flex-1 justify-center items-center">
        {/* Header */}
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: colors.primary, textAlign: 'center', marginBottom: 12 }}>
          Try CraveAway Free
        </Text>
        <Text style={{ fontSize: 16, color: colors.textSecondary, textAlign: 'center', marginBottom: 24 }}>
          Get full access to all features with your 3-day free trial. Cancel anytime.
        </Text>

        {/* Features */}
        <View style={{ width: '100%', marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textMain, marginBottom: 8 }}>
            What’s included:
          </Text>
          {[
            'Unlimited craving logs',
            'Personalized breathing exercises',
            'Progress streaks & habit tracking',
            'Mindful recovery tools & stats',
          ].map((feature, i) => (
            <Text key={i} style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 4 }}>
              • {feature}
            </Text>
          ))}
        </View>

        {/* Pricing Box */}
        <View style={{
          backgroundColor: colors.accentLight,
          padding: 24,
          borderRadius: 16,
          alignItems: 'center',
          marginBottom: 24,
          width: '100%',
        }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: colors.primary, marginBottom: 6 }}>
            $2.99 / month
          </Text>
          <Text style={{ fontSize: 14, color: colors.textSecondary, textAlign: 'center' }}>
            3-day free trial • Cancel anytime
          </Text>
        </View>

        {/* CTA */}
        <TouchableOpacity
          onPress={completePayment}
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 16,
            paddingHorizontal: 32,
            borderRadius: 100,
            marginBottom: 16,
            width: '100%',
            alignItems: 'center',
          }}
          activeOpacity={0.85}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Start Free Trial</Text>
        </TouchableOpacity>

        {/* Skip Button (testing/dev) */}
        <TouchableOpacity onPress={continueWithoutSubscribe} activeOpacity={0.7}>
          <Text style={{ fontSize: 14, color: colors.textSecondary, textDecorationLine: 'underline' }}>
           Continue to Sign Up / Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={resetAppData} activeOpacity={0.7}>
          <Text style={{ fontSize: 14, color: colors.textSecondary, textDecorationLine: 'underline' }}>
           Reset Data
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
