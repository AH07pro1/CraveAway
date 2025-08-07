import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import SignatureCanvas from 'react-native-signature-canvas';
import colors from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppState } from '../context/AppStateContext';
import { API_URL } from '../config';
import { useUser } from '@clerk/clerk-expo';

const steps = [
  { type: 'intro', title: 'Welcome to CraveAway', description: 'Let’s help you take control of your cravings.' },
  { type: 'question', title: 'What do you want to gain control over?', options: ['Smoking', 'Overeating', 'Phone addiction', 'Drinking', 'Other'] },
  { type: 'input', title: 'Write your habit below:' },
  { type: 'question', title: 'When do cravings hit hardest?', options: ['When I’m stressed', 'At night', 'After eating', 'When I’m alone', 'Other'] },
  { type: 'question', title: 'How does it usually make you feel?', options: ['Anxious', 'Guilty', 'Powerless', 'Empty', 'I don’t know'] },
  { type: 'text', title: 'Imagine your life without it...', description: 'No guilt. No loss of control. Just calm and clarity.' },
  { type: 'text', title: 'CraveAway helps you get there.', description: 'Track urges. Breathe. Build streaks. Let’s start now.' },

  // Commitment decision
  {
    type: 'commitmentCheck',
    title: 'Are You Ready to Commit?',
    description: 'The next steps are only for those who are serious about changing their life. Are you ready to commit?',
  },

  // Only shown if committed
  { type: 'photo', title: 'Take your Day 1 Photo' },
  { type: 'signature', title: 'Sign Your Commitment' },
  { type: 'message', title: 'Write a Personal Message' },
];


export default function OnboardingScreen({ navigation }: any) {
  const { setHasOnboarded } = useAppState();
  const [stepIndex, setStepIndex] = useState(0);

  // Answers for existing questions
  const [answers, setAnswers] = useState({
    habit: '',
    trigger: '',
    feeling: '',
  });
  const [inputValue, setInputValue] = useState('');

  // New states for photo, signature, message
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [message, setMessage] = useState('');
const [committed, setCommitted] = useState(false);
const { user } = useUser();
  const signatureRef = useRef<any>(null);

  const currentStep = steps[stepIndex];

  // Handle selecting options in questions
  const handleOptionSelect = (option: string) => {
    if (stepIndex === 1) {
      if (option === 'Other') {
        setStepIndex(stepIndex + 1); // Go to input habit
      } else {
        setAnswers({ ...answers, habit: option });
        setStepIndex(stepIndex + 2); // Skip input habit
      }
    } else if (stepIndex === 3) {
      setAnswers({ ...answers, trigger: option });
      setStepIndex(stepIndex + 1);
    } else if (stepIndex === 4) {
      setAnswers({ ...answers, feeling: option });
      setStepIndex(stepIndex + 1);
    }
  };

  // Handle input text submit for habit
  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      if (stepIndex === 2) {
        setAnswers({ ...answers, habit: inputValue.trim() });
      }
      setInputValue('');
      setStepIndex(stepIndex + 1);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Camera permission is required to take your photo.');
      }
    })();
  }, []);

  useEffect(() => {
  (async () => {
    const savedUri = await AsyncStorage.getItem('photoUri');
    if (savedUri) {
      setPhotoUri(savedUri);
    }
  })();
}, []);

  const checkPermissions = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (newStatus !== 'granted') {
        Alert.alert('Permission denied', 'Camera access is required to take your photo.');
        return false;
      }
    }
    return true;
  };

  // Image picker for photo step
const pickImage = async () => {
  const hasPermission = await checkPermissions();
  if (!hasPermission) return;

  try {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      base64: false,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhotoUri(uri);
      await AsyncStorage.setItem('photoUri', uri);
    }
  } catch (e) {
    const errorMessage = (e instanceof Error && e.message) ? e.message : 'Something went wrong taking the photo.';
    Alert.alert('Error', errorMessage);
  }
};

const saveOnboardingData = async () => {
  try {
    if (!user) throw new Error('User not logged in');

    const response = await fetch(`${API_URL}/api/onboarding`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        photoUrl: photoUri,
        message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save onboarding data');
    }

    console.log('Onboarding data saved successfully');
  } catch (err) {
    console.warn('Failed to save onboarding info', err);
  }
};




  // Signature done callback
  const handleSignature = (signatureData: string) => {
    setSignature(signatureData);
  };

  // Clear signature button
  const clearSignature = () => {
    signatureRef.current?.clearSignature();
    setSignature(null);
  };

  // Next button logic for all steps
  const handleNext = async () => {
    // Validate steps

    if (currentStep.type === 'photo' && !photoUri) {
      // Alert.alert('Please take your Day 1 photo to continue.');
      // return;
    }
    if (currentStep.type === 'signature' && !signature) {
      Alert.alert('Please provide your signature to continue.');
      return;
    }
    if (currentStep.type === 'message' && message.trim().length === 0) {
      Alert.alert('Please enter a personal message to continue.');
      return;
    }
if (currentStep.type === 'message') {
  try {
    await saveOnboardingData(); // Save to backend DB
    await AsyncStorage.setItem('hasOnboarded', 'true');
    setHasOnboarded(true);
    Alert.alert('Thank you for committing!');
    navigation.navigate('Paywall');
  } catch (error) {
    console.warn('Failed to save onboarding flag', error);
  }
  return;
}

if (stepIndex >= steps.length - 1) {
  try {
    await AsyncStorage.setItem('hasOnboarded', 'true');
    setHasOnboarded(true);
    navigation.navigate('Paywall');
  } catch (error) {
    console.warn('Failed to save onboarding flag on skip to end', error);
  }
}

    // Normal next for intro, questions, input, text steps
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }

    // On last step (message), save onboarding & navigate
    if (currentStep.type === 'message') {
      try {
        // Save onboarding complete flag
        await AsyncStorage.setItem('hasOnboarded', 'true');
        setHasOnboarded(true);

        // Save or send user inputs here (optional)
        // e.g. AsyncStorage.setItem('onboardingData', JSON.stringify({ answers, photoUri, signature, message }));

        Alert.alert('Thank you for committing!');

        // Navigate to Paywall
        navigation.navigate('Paywall');
      } catch (error) {
        console.warn('Failed to save onboarding flag', error);
      }
    }
  };

  // Skip confirmation helper
  const confirmSkip = (stepName: string) => {
    Alert.alert(
      `Skip ${stepName}?`,
      `This step helps you commit to your journey. Are you sure you want to skip?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Skip',
          style: 'destructive',
          onPress: () => setStepIndex(stepIndex + 1),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background, padding: 24 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        {/* Title */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: '800',
            color: colors.primary,
            marginBottom: 24,
            textAlign: 'center',
          }}
        >
          {currentStep.title}
        </Text>

        {/* Step content rendering */}
        {/* Intro & Text */}
        {(currentStep.type === 'intro' || currentStep.type === 'text') && (
          <>
            <Text
              style={{
                fontSize: 16,
                color: colors.textSecondary,
                textAlign: 'center',
                marginBottom: 24,
              }}
            >
              {currentStep.description}
            </Text>
            <TouchableOpacity
              onPress={handleNext}
              style={{ backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 30, alignItems: 'center' }}
              activeOpacity={0.85}
            >
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>Continue</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Question Step */}
        {currentStep.type === 'question' && (
          <View>
            {currentStep.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleOptionSelect(option)}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 20,
                  paddingVertical: 14,
                  paddingHorizontal: 24,
                  marginBottom: 16,
                  backgroundColor: 'white',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 16, color: colors.textMain }}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {currentStep.type === 'commitmentCheck' && (
  <View style={{ alignItems: 'center' }}>
    <Text style={{ fontSize: 16, color: colors.textSecondary, textAlign: 'center', marginBottom: 32 }}>
      {currentStep.description}
    </Text>
    <TouchableOpacity
    
     onPress={() => {
    setCommitted(true);
    setStepIndex(stepIndex + 1);
  }}// continue to photo
      style={{
        backgroundColor: colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginBottom: 16,
      }}
    >
      <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>I’m Committed</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={async () => {
  try {
    await AsyncStorage.setItem('hasOnboarded', 'true');
    setHasOnboarded(true);
    navigation.navigate('Paywall');
  } catch (error) {
    console.warn('Failed to save onboarding flag', error);
  }
}}
 // skip photo/signature/message
      style={{
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.primary,
      }}
    >
      <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 18 }}>Skip to End</Text>
    </TouchableOpacity>
  </View>
)}


        {/* Input Step */}
        {currentStep.type === 'input' && (
          <View>
            <TextInput
              placeholder="Type here..."
              value={inputValue}
              onChangeText={setInputValue}
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 20,
                paddingVertical: 14,
                paddingHorizontal: 20,
                fontSize: 16,
                color: colors.textMain,
                backgroundColor: 'white',
                marginBottom: 24,
              }}
              placeholderTextColor="#999"
              onSubmitEditing={handleInputSubmit}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={handleInputSubmit}
              style={{ backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 30, alignItems: 'center' }}
              activeOpacity={0.85}
            >
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* New Photo Step */}
        {currentStep.type === 'photo' && (
          <View style={{ alignItems: 'center' }}>
            {photoUri ? (
              <Image
                source={{ uri: photoUri }}
                style={{ width: 220, height: 220, borderRadius: 110, marginBottom: 24 }}
              />
            ) : (
              <View
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: 110,
                  backgroundColor: colors.accentLight,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 24,
                }}
              >
                <Text style={{ color: colors.textSecondary }}>No photo taken yet</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={pickImage}
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 14,
                paddingHorizontal: 40,
                borderRadius: 30,
                marginBottom: 16,
              }}
            >
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNext}
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 14,
                paddingHorizontal: 40,
                borderRadius: 30,
                marginBottom: 12,
              }}
              activeOpacity={0.85}
            >
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>Continue</Text>
            </TouchableOpacity>

            
            {!committed && (
  <TouchableOpacity
    onPress={() => confirmSkip('Photo')}
    style={{
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: colors.primary,
      alignItems: 'center',
    }}
  >
    <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 18 }}>Skip</Text>
  </TouchableOpacity>
)}

          </View>
        )}

        {/* New Signature Step */}
        {currentStep.type === 'signature' && (
          <View style={{ flex: 1 }}>
            <View
              style={{ height: 320, borderWidth: 1, borderColor: colors.border, borderRadius: 20, overflow: 'hidden' }}
            >
              <SignatureCanvas
  ref={signatureRef}
  onOK={handleSignature}
  onEnd={() => signatureRef.current?.readSignature()}
  webStyle={`.m-signature-pad--footer {display: none; margin: 0;}`}
  descriptionText="Sign above"
/>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
              <TouchableOpacity
                onPress={clearSignature}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 30,
                  backgroundColor: colors.accentLight,
                  borderRadius: 20,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: colors.textSecondary, fontWeight: '600' }}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNext}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 30,
                  backgroundColor: colors.primary,
                  borderRadius: 20,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontWeight: '700' }}>Continue</Text>
              </TouchableOpacity>
            </View>

            
            {!committed && (
  <TouchableOpacity
    onPress={() => confirmSkip('Signature')}
    style={{
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: colors.primary,
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 4,
    }}
  >
    <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 18 }}>Skip</Text>
  </TouchableOpacity>
)}

          </View>
        )}

        {/* New Personal Message Step */}
        {currentStep.type === 'message' && (
          <View>
            <TextInput
              placeholder="Why do you want to change?"
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 20,
                padding: 16,
                fontSize: 16,
                color: colors.textMain,
                backgroundColor: 'white',
                textAlignVertical: 'top',
                marginBottom: 24,
              }}
            />
            <TouchableOpacity
              onPress={handleNext}
              style={{ backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 30, alignItems: 'center' }}
              activeOpacity={0.85}
            >
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>Finish</Text>
            </TouchableOpacity>

            <Text
              style={{
                color: colors.textSecondary,
                fontStyle: 'italic',
                marginTop: 16,
                marginBottom: 12,
                textAlign: 'center',
              }}
            >
              Writing a personal message helps solidifies your commitment.
            </Text>
            {!committed && (
  <TouchableOpacity
    onPress={() => confirmSkip('Personal Message')}
    style={{
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: colors.primary,
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 4,
    }}
  >
    <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 18 }}>Skip</Text>
  </TouchableOpacity>
)}

          </View>
        )}

        {/* Progress Dots */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 32,
            gap: 8,
          }}
        >
          {steps.map((_, i) => (
            <View
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: i === stepIndex ? colors.primary : colors.border,
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
