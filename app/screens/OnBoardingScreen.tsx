import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';

const steps = [
  {
    title: 'Welcome to CraveAway',
    description: 'Track cravings. Stay in control. Let’s get started!',
  },
  {
    title: 'Daily Support',
    description: 'Get daily quotes and reminders to stay strong.',
  },
  {
    title: 'Unlock Premium',
    description: 'Pay once and enjoy full access to all features.',
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);

  const handleNext = async () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      // TODO: mark onboarding done & navigate to paywall or main app
      navigation.replace('Paywall'); 
    }
  };

  const { title, description } = steps[stepIndex];

  return (
    <View className="flex-1 justify-center items-center px-6 bg-white" style={{ backgroundColor: colors.background }}>
      <Text
        className="text-3xl font-extrabold mb-4 text-center"
        style={{ color: colors.primary }}
      >
        {title}
      </Text>
      <Text
        className="text-center text-base mb-8"
        style={{ color: colors.textSecondary }}
      >
        {description}
      </Text>

      <TouchableOpacity
        onPress={handleNext}
        className="bg-blue-600 rounded-full px-8 py-4"
        style={{ backgroundColor: colors.primary }}
        activeOpacity={0.85}
      >
        <Text className="text-white font-bold text-lg">
          {stepIndex === steps.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>

      <View className="flex-row mt-6 space-x-2">
        {steps.map((_, i) => (
          <View
            key={i}
            className={`w-3 h-3 rounded-full ${i === stepIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            style={{ backgroundColor: i === stepIndex ? colors.primary : colors.border }}
          />
        ))}
      </View>
    </View>
  );
}
