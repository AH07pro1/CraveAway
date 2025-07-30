import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import colors from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const steps = [
  {
    type: 'intro',
    title: 'Welcome to CraveAway',
    description: 'Let’s help you take control of your cravings.',
  },
  {
    type: 'question',
    title: 'What do you want to gain control over?',
    options: ['Smoking', 'Overeating', 'Phone addiction', 'Drinking', 'Other'],
  },
  {
    type: 'input',
    title: 'Write your habit below:',
  },
  {
    type: 'question',
    title: 'When do cravings hit hardest?',
    options: ['When I’m stressed', 'At night', 'After eating', 'When I’m alone', 'Other'],
  },
  {
    type: 'question',
    title: 'How does it usually make you feel?',
    options: ['Anxious', 'Guilty', 'Powerless', 'Empty', 'I don’t know'],
  },
  {
    type: 'text',
    title: 'Imagine your life without it...',
    description: 'No guilt. No loss of control. Just calm and clarity.',
  },
  {
    type: 'text',
    title: 'CraveAway helps you get there.',
    description: 'Track urges. Breathe. Build streaks. Let’s start now.',
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({
    habit: '',
    trigger: '',
    feeling: '',
  });
  const [inputValue, setInputValue] = useState('');

  const currentStep = steps[stepIndex];

  const handleOptionSelect = (option: string) => {
    if (stepIndex === 1) {
      if (option === 'Other') {
        setStepIndex(stepIndex + 1);
      } else {
        setAnswers({ ...answers, habit: option });
        setStepIndex(stepIndex + 2); // Skip input step
      }
    } else if (stepIndex === 3) {
      setAnswers({ ...answers, trigger: option });
      setStepIndex(stepIndex + 1);
    } else if (stepIndex === 4) {
      setAnswers({ ...answers, feeling: option });
      setStepIndex(stepIndex + 1);
    }
  };

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      if (stepIndex === 2) {
        setAnswers({ ...answers, habit: inputValue.trim() });
      }
      setInputValue('');
      setStepIndex(stepIndex + 1);
    }
  };

  const handleNext = async () => {
  if (stepIndex < steps.length - 1) {
    setStepIndex(stepIndex + 1);
  } else {
    // Save onboarding completion flag
    try {
      await AsyncStorage.setItem('hasOnboarded', 'true');
    } catch (error) {
      console.warn('Failed to save onboarding flag', error);
    }
    navigation.replace('Paywall');
  }
};
  return (
    <KeyboardAvoidingView
      className="flex-1 justify-center items-center px-6 bg-white"
      style={{ backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="w-full items-center">
        <Text
          className="text-3xl font-extrabold mb-4 text-center"
          style={{ color: colors.primary }}
        >
          {currentStep.title}
        </Text>

        {currentStep.type === 'intro' || currentStep.type === 'text' ? (
          <>
            <Text
              className="text-base text-center mb-8"
              style={{ color: colors.textSecondary }}
            >
              {currentStep.description}
            </Text>
            <TouchableOpacity
              onPress={handleNext}
              className="bg-blue-600 rounded-full px-8 py-4"
              style={{ backgroundColor: colors.primary }}
            >
              <Text className="text-white font-bold text-lg">Continue</Text>
            </TouchableOpacity>
          </>
        ) : null}

        {currentStep.type === 'question' && (
          <View className="w-full">
            {currentStep.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleOptionSelect(option)}
                className="border border-gray-300 rounded-xl px-4 py-3 mb-3"
                style={{
                  borderColor: colors.border,
                  backgroundColor: 'white',
                }}
              >
                <Text className="text-base text-center" style={{ color: colors.textMain }}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {currentStep.type === 'input' && (
          <View className="w-full mt-4">
            <TextInput
              placeholder="Type here..."
              value={inputValue}
              onChangeText={setInputValue}
              className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
              placeholderTextColor="#999"
              style={{ color: colors.textMain, borderColor: colors.border }}
            />
            <TouchableOpacity
              onPress={handleInputSubmit}
              className="bg-blue-600 rounded-full px-8 py-4"
              style={{ backgroundColor: colors.primary }}
            >
              <Text className="text-white font-bold text-lg">Continue</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Progress dots */}
      <View className="flex-row mt-10 space-x-2">
        {steps.map((_, i) => (
          <View
            key={i}
            className={`w-3 h-3 rounded-full ${i === stepIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            style={{
              backgroundColor: i === stepIndex ? colors.primary : colors.border,
            }}
          />
        ))}
      </View>
    </KeyboardAvoidingView>
  );
}
