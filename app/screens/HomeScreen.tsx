import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-bold text-blue-600 mb-8">Home Screen</Text>
      <TouchableOpacity
        className="bg-blue-600 px-8 py-6 rounded-xl shadow-lg"
        onPress={() => {
          navigation.navigate('CalmingSession'); // ✅ navigate properly
        }}
      >
        <Text className="text-white text-2xl font-bold">I Have a Craving</Text>
      </TouchableOpacity>
    </View>
  );
}
