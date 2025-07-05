import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, Pressable, Animated as RNAnimated } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import * as Speech from 'expo-speech';
import { useFocusEffect } from '@react-navigation/native';
import { runOnUI } from 'react-native-reanimated';


const SESSION_DURATION = 60;
const BREATH_DURATION = 16000;
const BORDER_THICKNESS = 8;
const tips = [
  "Remember to be gentle with yourself.",
  "Focus on your breath, not your thoughts.",
  "This moment is your safe space.",
  "Each breath brings calm and clarity.",
  "You are stronger than your cravings.",
];

const BOX_SIZE = 240; // bigger box
const BALL_SIZE = 48;
const BORDER_WIDTH = 4;

export default function CalmingSessionScreen({ navigation }: any) {
  const [secondsLeft, setSecondsLeft] = useState(SESSION_DURATION);
  const [finished, setFinished] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Exhale' | 'Hold'>('Inhale');

  const [paused, setPaused] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [tip, setTip] = useState('');
  const [breathingType, setBreathingType] = useState<'circle' | 'box'>('circle');

  const progressAnim = useRef(new RNAnimated.Value(1)).current;

  const scale = useSharedValue(1);
  const moveAnim = useSharedValue(0);

  const breathingInterval = useRef<NodeJS.Timeout | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  useEffect(() => {
    // Choose random breathing type on mount
    const types: ('circle' | 'box')[] = ['circle', 'box'];
    setBreathingType(types[Math.floor(Math.random() * types.length)]);
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimation(scale);
      cancelAnimation(moveAnim);
    };
  }, []);

  const startBreathingCircle = useCallback(() => {
    if (voiceEnabled) Speech.speak('Inhale', { rate: 0.9 });

    breathingInterval.current = setInterval(() => {
      setPhase((prev) => {
        const next = prev === 'Inhale' ? 'Exhale' : 'Inhale';
        if (voiceEnabled) Speech.speak(next, { rate: 0.9 });

        scale.value = withTiming(next === 'Inhale' ? 1.5 : 0.9, {
          duration: BREATH_DURATION / 2,
        });

        return next;
      });
    }, BREATH_DURATION / 2);
  }, [voiceEnabled]);

  const startBreathingBox = useCallback(() => {
  if (voiceEnabled) Speech.speak('Inhale', { rate: 0.9 });
  setPhase('Inhale');
  startBoxLoop();

  // Clear any existing interval to prevent overlap
  if (breathingInterval.current) {
    clearInterval(breathingInterval.current);
  }

  const steps: ('Inhale' | 'Hold' | 'Exhale' | 'Hold')[] = ['Inhale', 'Hold', 'Exhale', 'Hold'];
  let step = 1; // We already started with 'Inhale'

  breathingInterval.current = setInterval(() => {
    const next = steps[step % 4];
    setPhase(next);
    if (voiceEnabled) Speech.speak(next, { rate: 0.9 });
    step++;
  }, BREATH_DURATION / 4);
}, [voiceEnabled]);







  const startSession = useCallback(() => {
  // Pick breathing type randomly each session start
const chosenType = breathingType;


  setSecondsLeft(SESSION_DURATION);
  setFinished(false);
  setPaused(false);
  setPhase('Inhale');

  progressAnim.setValue(1);
  RNAnimated.timing(progressAnim, {
    toValue: 0,
    duration: SESSION_DURATION * 1000,
    useNativeDriver: false,
  }).start();

  if (chosenType === 'circle') {
    scale.value = withTiming(1.5, { duration: BREATH_DURATION / 2 });
    startBreathingCircle();
  } else if (chosenType === 'box') {
    moveAnim.value = 0;
    startBreathingBox();
  }

  timerInterval.current = setInterval(() => {
    setSecondsLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timerInterval.current!);
        clearInterval(breathingInterval.current!);
        Speech.stop();
        setFinished(true);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
}, [startBreathingCircle, startBreathingBox]);


  useFocusEffect(
    useCallback(() => {
      startSession();
      return () => {
        clearInterval(timerInterval.current!);
        clearInterval(breathingInterval.current!);
        Speech.stop();
      };
    }, [startSession])
  );

  const finishEarly = () => {
    clearInterval(timerInterval.current!);
    clearInterval(breathingInterval.current!);
    Speech.stop();
    RNAnimated.timing(progressAnim).stop();
    setFinished(true);
    setSecondsLeft(0);
  };

  const pause = () => {
    setPaused(true);
    clearInterval(timerInterval.current!);
    clearInterval(breathingInterval.current!);
    Speech.stop();
    RNAnimated.timing(progressAnim).stop();
    cancelAnimation(scale);
    cancelAnimation(moveAnim);
  };

  const resume = () => {
    setPaused(false);

    timerInterval.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval.current!);
          clearInterval(breathingInterval.current!);
          Speech.stop();
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    RNAnimated.timing(progressAnim, {
      toValue: 0,
      duration: secondsLeft * 1000,
      useNativeDriver: false,
    }).start();

    if (breathingType === 'circle') {
      startBreathingCircle();
    } else if (breathingType === 'box') {
      startBreathingBox();
    }
  };

  const startBoxLoop = () => {
  runOnUI(() => {
    const phaseDur = BREATH_DURATION / 4;

    const loop = () => {
      moveAnim.value = withTiming(0.25, { duration: phaseDur }, (fin) => {
        if (fin) {
          moveAnim.value = withTiming(0.25, { duration: phaseDur }, () => {
            moveAnim.value = withTiming(0.5, { duration: phaseDur }, (fin) => {
              if (fin) {
                moveAnim.value = withTiming(0.5, { duration: phaseDur }, () => {
                  moveAnim.value = withTiming(0.75, { duration: phaseDur }, (fin) => {
                    if (fin) {
                      moveAnim.value = withTiming(0.75, { duration: phaseDur }, () => {
                        moveAnim.value = withTiming(1, { duration: phaseDur }, (fin) => {
                          if (fin) {
                            moveAnim.value = withTiming(1, { duration: phaseDur }, () => {
                              // Restart loop
                              moveAnim.value = 0;
                              loop();
                            });
                          }
                        });
                      });
                    }
                  });
                });
              }
            });
          });
        }
      });
    };

    moveAnim.value = 0;
    loop();
  })();
};


  // Circle ball scale style
  const ballStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Box breathing ball movement style
const boxBallStyle = useAnimatedStyle(() => {
  const progress = moveAnim.value;
  const pathLength = BOX_SIZE - BORDER_THICKNESS * 2;

  let x = BORDER_THICKNESS;
  let y = BORDER_THICKNESS;

  if (progress < 0.25) {
    const local = progress / 0.25;
    x = BORDER_THICKNESS + local * pathLength;
    y = BORDER_THICKNESS;
  } else if (progress < 0.5) {
    const local = (progress - 0.25) / 0.25;
    x = BORDER_THICKNESS + pathLength;
    y = BORDER_THICKNESS + local * pathLength;
  } else if (progress < 0.75) {
    const local = (progress - 0.5) / 0.25;
    x = BORDER_THICKNESS + pathLength - local * pathLength;
    y = BORDER_THICKNESS + pathLength;
  } else {
    const local = (progress - 0.75) / 0.25;
    x = BORDER_THICKNESS;
    y = BORDER_THICKNESS + pathLength - local * pathLength;
  }

  return {
    transform: [
      { translateX: x - BALL_SIZE / 2 },
      { translateY: y - BALL_SIZE / 2 },
    ],
  };
});







  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View className="flex-1 bg-blue-200 pt-20 px-6 pb-8">
      {!finished && (
        <View className="w-full h-2 bg-blue-300 rounded-full mb-4 overflow-hidden">
          <RNAnimated.View
            style={{ width: progressWidth }}
            className="h-full bg-blue-700"
          />
        </View>
      )}

      {!finished && (
        <View className="items-center mb-6">
          <Text className="text-4xl font-extrabold text-blue-900">
            {secondsLeft}s
          </Text>
        </View>
      )}

      {!finished && (
        <View className="flex-1 justify-center items-center relative">
          {breathingType === 'circle' ? (
            <Animated.View
              style={ballStyle}
              className="w-48 h-48 rounded-full bg-blue-400 shadow-lg justify-center items-center"
            >
              <View className="absolute inset-0 justify-center items-center">
                <Text className="text-3xl font-semibold text-blue-800">{phase}</Text>
              </View>
            </Animated.View>
          ) : (
          
<View
  style={{
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: BORDER_THICKNESS,
    borderColor: '#3b82f6',
    position: 'relative',
  }}
>

  <Animated.View
    style={[
      {
        position: 'absolute',
        width: BALL_SIZE,
        height: BALL_SIZE,
        borderRadius: BALL_SIZE / 2,
        backgroundColor: '#2563eb',
      },
      boxBallStyle,
    ]}
  />
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ fontSize: 32, fontWeight: '600', color: '#1e40af' }}>
      {phase}
    </Text>
  </View>
</View>
          ) }

        </View>
      )}

      {finished && (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-2xl font-semibold text-blue-900 mb-4 text-center">
            Session Complete 🌿
          </Text>
          <Text className="text-lg italic text-blue-800 mb-10 text-center">{tip}</Text>
          <Pressable
            className="bg-blue-600 px-10 py-3 rounded-full shadow"
            onPress={() => navigation.navigate('Stats')}
          >
            <Text className="text-white text-lg font-semibold">Continue</Text>
          </Pressable>
        </View>
      )}

      {!finished && (
        <View className="space-y-4 mt-8">
          <View className="flex-row justify-center space-x-4">
            <Pressable
              onPress={finishEarly}
              className="flex-1 bg-white px-6 py-3 rounded-full border border-blue-500 shadow-sm items-center"
            >
              <Text className="text-blue-700 font-semibold">Finish Early</Text>
            </Pressable>

            <Pressable
              onPress={() => setVoiceEnabled((v) => !v)}
              className={`flex-1 px-6 py-3 rounded-full items-center shadow ${
                voiceEnabled ? 'bg-blue-600' : 'bg-gray-400'
              }`}
            >
              <Text className="text-white font-semibold">
                Voice: {voiceEnabled ? 'On' : 'Off'}
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={paused ? resume : pause}
            className={`w-full py-3 rounded-full items-center shadow ${
              paused ? 'bg-green-600' : 'bg-yellow-500'
            }`}
          >
            <Text className="text-white text-lg font-semibold">
              {paused ? 'Resume' : 'Pause'}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
