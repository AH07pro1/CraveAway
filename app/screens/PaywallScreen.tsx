import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PaywallScreen({ navigation }: any) {
  async function completePayment() {
    // process payment logic here, then:
    await AsyncStorage.setItem('hasPaid', 'true');
    navigation.replace('Tabs');
  }

  return (
    <View className="flex-1 justify-center items-center p-6">
      <Text className="text-2xl mb-6">Unlock full access by subscribing!</Text>
      {/* Your paywall UI here */}
      <Button title="Subscribe Now" onPress={completePayment} />
    </View>
  );
}
