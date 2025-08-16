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
  Button,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import SignatureCanvas from 'react-native-signature-canvas';
import colors from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppState } from '../context/AppStateContext';
import { API_URL } from '../config';
import { useUser } from '@clerk/clerk-expo';
import { useOnboarding } from '../context/OnBoardingContext';
import Popup from './auth/components/Popup';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import * as MediaLibrary from 'expo-media-library';

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
const [popupVisible, setPopupVisible] = useState(false);
const [popupTitle, setPopupTitle] = useState('');
const [popupMessage, setPopupMessage] = useState('');
const [popupConfirm, setPopupConfirm] = useState<() => void>(() => {});
const [popupCancel, setPopupCancel] = useState<() => void | undefined>(() => undefined);
const [popupConfirmText, setPopupConfirmText] = useState('Confirm');
const [popupCancelText, setPopupCancelText] = useState('Cancel');
 const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
   const [hasMediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
   const [hasCheckedPermission, setHasCheckedPermission] = useState(false);
  // Answers for existing questions
  const [answers, setAnswers] = useState({
    habit: '',
    trigger: '',
    feeling: '',
  });
  const [inputValue, setInputValue] = useState('');

  // New states for photo, signature, message
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<any>(photoUri);
const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [message, setMessage] = useState('');
const [committed, setCommitted] = useState(false);
const { user } = useUser();
  const signatureRef = useRef<any>(null);
const { onboardingData, setOnboardingData } = useOnboarding();
const [permissionChecked, setPermissionChecked] = useState(false);

const [granted, setGranted] = useState(false);
  const currentStep = steps[stepIndex];
const showPopup = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
) => {
  setPopupTitle(title);
  setPopupMessage(message);
  setPopupConfirm(() => onConfirm);
  setPopupCancel(() => onCancel);
  setPopupConfirmText(confirmText);
  setPopupCancelText(cancelText);
  setPopupVisible(true);
};

// if (!permission) return <View />;
//   if (!permission.granted) {
//     return (
//       <View>
//         <Text>Camera permission needed</Text>
//         <TouchableOpacity onPress={requestPermission}>
//           <Text>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

   const toggleCameraFacing = () =>
    setFacing(current => (current === 'back' ? 'front' : 'back'));

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


// if (hasCameraPermission === null) {
//   return <Text>Requesting camera permissions...</Text>;
// } else if (hasCameraPermission === false) {
//   return <Text>Camera permission not granted.</Text>;
// }

  useEffect(() => {
  (async () => {
    const savedUri = await AsyncStorage.getItem('photoUri');
    if (savedUri) {
      setPhotoUri(savedUri);
    }
  })();
}, []);






//   const checkPermissions = async () => {
//     const { status } = await ImagePicker.getCameraPermissionsAsync();
//     if (status !== 'granted') {
//       const { status: newStatus } = await ImagePicker.requestCameraPermissionsAsync();
//       if (newStatus !== 'granted') {
//        showPopup(
//   'Permission Denied',
//   'Camera access is required to take your photo.',
//   () => setPopupVisible(false)
// );

//         return false;
//       }
//     }
//     return true;
//   };
  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedPhoto(photo);
      } catch (error) {
        console.log('Error taking photo:', error);
      }
    }
  };

  const savePhoto = async () => {
    if (capturedPhoto && hasMediaLibraryPermission?.granted) {
      await MediaLibrary.saveToLibraryAsync(capturedPhoto.uri);
    } else {
      await requestMediaLibraryPermission();
    }
  };

if (!permission) {
    // Permission is still loading
    return <View />;
  }

  if (!permission.granted) {
  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-center text-lg text-gray-700 mb-4">
        We need your permission to show the camera
      </Text>
      <Button onPress={requestPermission} title="Grant Permission" />
    </View>
  );
}

// useEffect(() => {
//   const getPermission = async () => {
//     const { status } = await Camera.requestCameraPermissionsAsync();
//     setHasPermission(status === 'granted');
//   };
//   getPermission();
// }, []);
  // Image picker for photo step
// const pickImage = async () => {
//   const hasPermission = await checkPermissions();
//   if (!hasPermission) return;

//   try {
//     const result = await ImagePicker.launchCameraAsync({
//       quality: 0.7,
//       base64: false,
//     });
//     if (!result.canceled) {
//       const uri = result.assets[0].uri;
//       setPhotoUri(uri);
//       await AsyncStorage.setItem('photoUri', uri);
//     }
//   } catch (e) {
//     const errorMessage = (e instanceof Error && e.message) ? e.message : 'Something went wrong taking the photo.';
//     showPopup(
//   'Error',
//   errorMessage,
//   () => setPopupVisible(false)
// );

//   }
// };

const saveOnboardingData = async () => {
  if (!capturedPhoto?.uri) return; // safety check

  const dataToSave = {
    photoUri: capturedPhoto.uri, // save only the URI
    message,
  };

  console.log('Saving onboarding data to AsyncStorage:', dataToSave);

  try {
    await AsyncStorage.setItem('pendingOnboarding', JSON.stringify(dataToSave));
    console.log('Onboarding data saved to AsyncStorage');
  } catch (err) {
    console.warn('Failed to save onboarding data to AsyncStorage', err);
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

    if (currentStep.type === 'photo' && !capturedPhoto) {
  showPopup(
    'Photo Required',
    'Please take your Day 1 photo to continue.',
    () => setPopupVisible(false)
  );
  return;
}
    if (currentStep.type === 'signature' && !signature) {
      showPopup(
  'Signature Required',
  'Please provide your signature to continue.',
  () => setPopupVisible(false)
);

      return;
    }
    if (currentStep.type === 'message' && message.trim().length === 0) {
     showPopup(
  'Message Required',
  'Please enter a personal message to continue.',
  () => setPopupVisible(false)
);

      return;
    }
if (currentStep.type === 'message') {
  try {
    await saveOnboardingData(); 
    await AsyncStorage.setItem('hasOnboarded', 'true');
    setHasOnboarded(true);
   showPopup(
  'Thank You!',
  'Thank you for committing!',
  () => {
    setPopupVisible(false);
    navigation.navigate('Paywall');
  }
);

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

         showPopup(
  'Thank You!',
  'Thank you for committing!',
  () => {
    setPopupVisible(false);
    navigation.navigate('Paywall');
  }


      )} catch (error) {
        console.warn('Failed to save onboarding flag', error);
      }
    }
  };

  // Skip confirmation helper
const confirmSkip = (stepName: string) => {
  showPopup(
    `Skip ${stepName}?`,
    `This step helps you commit to your journey. Are you sure you want to skip?`,
    () => {
      setStepIndex(stepIndex + 1); 
      setPopupVisible(false);
    },
    () => setPopupVisible(false),
    'Skip',
    'Cancel'
  );
};


  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background, padding: 24 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      
      <Popup
  visible={popupVisible}
  title={popupTitle}
  message={popupMessage}
  onConfirm={popupConfirm}
  onCancel={popupCancel}
  confirmText={popupConfirmText}
  cancelText={popupCancelText}
/>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        {/* Title */}
      {/* Title */}
{currentStep.type !== 'signature' && currentStep.type !== 'photo' && (
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
)}

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
          
          {!capturedPhoto ? (
            <View style={{ width: '100%', height: 300, borderRadius: 20, overflow: 'hidden', marginBottom: 16 }}>
              <CameraView
                ref={cameraRef}
                style={{ flex: 1 }}
                facing={facing}
              >
                <TouchableOpacity onPress={toggleCameraFacing} style={{ position: 'absolute', bottom: 20, right: 20 }}>
                  <Text style={{ color: 'white', fontWeight: '700' }}>Flip</Text>
                </TouchableOpacity>
              </CameraView>
            </View>
          ) : (
            <Image
              source={{ uri: capturedPhoto.uri }}
              style={{ width: 220, height: 220, borderRadius: 110, marginBottom: 24 }}
            />
          )}

          {!capturedPhoto ? (
            <TouchableOpacity
              onPress={takePhoto}
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
          ) : (
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
              <TouchableOpacity
                onPress={() => setCapturedPhoto(null)}
                style={{
                  paddingVertical: 14,
                  paddingHorizontal: 40,
                  backgroundColor: colors.accentLight,
                  borderRadius: 30,
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontWeight: '700', color: colors.textSecondary }}>Retake</Text>
              </TouchableOpacity>

              {hasMediaLibraryPermission?.granted && (
                <TouchableOpacity
                  onPress={savePhoto}
                  style={{
                    paddingVertical: 14,
                    paddingHorizontal: 40,
                    backgroundColor: colors.primary,
                    borderRadius: 30,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>Save</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <TouchableOpacity
            onPress={handleNext}
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 14,
              paddingHorizontal: 40,
              borderRadius: 30,
              marginBottom: 12,
            }}
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
        {/* Signature Step */}
{currentStep.type === 'signature' && (
  <ScrollView
    contentContainerStyle={{
      flexGrow: 1,
      justifyContent: 'center',
      paddingVertical: 40,
      paddingHorizontal: 24,
    }}
  >
    <View style={{ alignItems: 'center' }}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: '800',
          color: colors.primary,
          marginBottom: 24,
          textAlign: 'center',
        }}
      >
        {currentStep.title}
      </Text>

      <View
        style={{
          height: 320,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 20,
          overflow: 'hidden',
          marginBottom: 24,
          width: '100%',
        }}
      >
        <SignatureCanvas
          ref={signatureRef}
          onOK={handleSignature}
          onEnd={() => signatureRef.current?.readSignature()}
          webStyle={`.m-signature-pad--footer {display: none; margin: 0;}`}
          descriptionText="Sign above"
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 16 }}>
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
            marginBottom: 16, // space for dots
          }}
        >
          <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 18 }}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* <-- Move dots here inside the signature view */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 16,
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
    </View>
  </ScrollView>
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
       {/* Progress Dots (skip on signature step) */}
{currentStep.type !== 'signature' && (
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
)}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
