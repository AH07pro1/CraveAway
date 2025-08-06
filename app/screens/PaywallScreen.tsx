import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';
import colors from '../utils/colors';
import { useAppState } from '../context/AppStateContext';

export default function PaywallScreen({ navigation }: any) {
  const { setHasPaid } = useAppState();

  async function completePayment() {
    try {
      const offerings = await Purchases.getOfferings();
      const currentOffering = offerings.current;

      if (currentOffering && currentOffering.availablePackages.length > 0) {
        const { customerInfo } = await Purchases.purchasePackage(currentOffering.availablePackages[0]);
        const isPro = !!customerInfo.entitlements.active['Monthly Membership'];

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
  <View style={{ alignItems: 'center', marginTop: 48, marginBottom: 28 }}>
    <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.primary, textAlign: 'center', marginBottom: 8 }}>
      Try CraveAway Free
    </Text>
    <Text style={{ fontSize: 16, color: colors.textSecondary, textAlign: 'center' }}>
      3-day free trial • Cancel anytime
    </Text>
  </View>


      {/* Value Highlights */}
      <View style={{
        backgroundColor: colors.accentLight,
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
      }}>
        {['Just $0.10/day', 'Cheaper than coffee ☕', 'Helps you stay on track'].map((value, i) => (
          <Text key={i} style={{ fontSize: 14, color: colors.textMain, marginBottom: 6 }}>
            ✅ {value}
          </Text>
        ))}
      </View>

      {/* Features */}
      <View style={{
        backgroundColor: colors.accentLight,
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
      }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.textMain, marginBottom: 12 }}>
          What's Included:
        </Text>
        {[
          'Unlimited craving logs',
          'Personalized breathing exercises',
          'Progress streaks & habit tracking',
          'Mindful recovery tools & stats',
        ].map((feature, i) => (
          <Text key={i} style={{ fontSize: 15, color: colors.textSecondary, marginBottom: 6 }}>
            • {feature}
          </Text>
        ))}
      </View>

      {/* Price Box */}
      <View style={{
        backgroundColor: colors.primary,
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
      }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>
          $2.99 / month
        </Text>
        <Text style={{ fontSize: 14, color: 'white', textAlign: 'center' }}>
          Start your free 3-day trial now
        </Text>
        <Text style={{ fontSize: 12, color: 'white', textAlign: 'center', marginTop: 6 }}>
          Cancel anytime • No hidden fees
        </Text>
      </View>

      {/* CTA */}
      <TouchableOpacity
        onPress={completePayment}
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 16,
          borderRadius: 100,
          alignItems: 'center',
          width: '100%',
          marginBottom: 12,
        }}
        activeOpacity={0.85}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          Start My Free 3-Day Trial
        </Text>
      </TouchableOpacity>

      {/* Dev Buttons */}
      <TouchableOpacity onPress={continueWithoutSubscribe} activeOpacity={0.7} style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 14, color: colors.textSecondary, textDecorationLine: 'underline', textAlign: 'center' }}>
          Continue to Sign Up / Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={resetAppData} activeOpacity={0.7} style={{ marginTop: 6 }}>
        <Text style={{ fontSize: 14, color: colors.textSecondary, textDecorationLine: 'underline', textAlign: 'center' }}>
          Reset App Data
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
