import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../utils/colors'; // Adjust path as needed

export default function HomeScreen({ navigation }: any) {
  return (
    <View className="flex-1 justify-center items-center px-6" style={{ backgroundColor: colors.background }}>
      <View className="w-full items-center mb-12">
        <Text
          className="text-3xl font-extrabold mb-2"
          style={{ color: colors.primary }}
        >
          Welcome to CraveAway
        </Text>
        <Text
          className="text-base text-center"
          style={{ color: colors.textSecondary }}
        >
          Manage your cravings with calming sessions and track your progress.
        </Text>
      </View>

      <TouchableOpacity
        className="px-10 py-6 rounded-2xl shadow-md mb-8 w-full items-center"
        style={{ backgroundColor: colors.primary }}
        onPress={() =>
          navigation.navigate('Calming', {
            screen: 'CalmingSession',
          })
        }
        activeOpacity={0.85}
      >
        <Text className="text-white text-2xl font-bold tracking-wide">
          I Have a Craving
        </Text>
      </TouchableOpacity>

      <View className="w-full items-center">
        <Text
          className="text-sm italic"
          style={{ color: colors.textSecondary }}
        >
          Take a deep breath. You’re in control.
        </Text>
      </View>
    </View>
  );
}
