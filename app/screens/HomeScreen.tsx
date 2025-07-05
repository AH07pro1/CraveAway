import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View className="flex-1 justify-center items-center bg-[#e0f7f6] px-6">
      <View className="w-full items-center mb-12">
        <Text className="text-3xl font-extrabold text-[#08BAAC] mb-2">Welcome to CraveAway</Text>
        <Text className="text-base text-[#0d6e67] text-center">
          Manage your cravings with calming sessions and track your progress.
        </Text>
      </View>
      <TouchableOpacity
        className="bg-[#08BAAC] px-10 py-6 rounded-2xl shadow-lg mb-8 w-full items-center"
        onPress={() => navigation.navigate('CalmingSession')}
        activeOpacity={0.85}
      >
        <Text className="text-white text-2xl font-bold tracking-wide">I Have a Craving</Text>
      </TouchableOpacity>
      <View className="w-full items-center">
        <Text className="text-[#26c9c0] text-sm italic">
          Take a deep breath. You’re in control.
        </Text>
      </View>
    </View>
  );
}
