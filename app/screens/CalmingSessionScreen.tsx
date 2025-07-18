import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text,Dimensions, Pressable, Animated as RNAnimated } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  cancelAnimation,
  runOnUI,
} from "react-native-reanimated";
import * as Speech from "expo-speech";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../utils/colors";
import TappingDotsGame from "./TappingDotsGame";

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

const BOX_SIZE = 240;
const BALL_SIZE = 48;
const { width, height } = Dimensions.get("window");
export default function CalmingSessionScreen({ navigation }: any) {
  const [totalDuration, setTotalDuration] = useState(SESSION_DURATION);
  const [secondsLeft, setSecondsLeft] = useState(SESSION_DURATION);
  const [phase, setPhase] = useState<"Inhale" | "Exhale" | "Hold">("Inhale");

  const [paused, setPaused] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [tip, setTip] = useState("");
  const [breathingType, setBreathingType] = useState<"circle" | "box" | "tapping">("circle");

  const topUIHeight = 140;    // approx height of top buttons + padding
  const bottomUIHeight = 150; // approx height of bottom buttons + padding

  const spawnArea = {
    xMin: 0,
    yMin: topUIHeight,
    xMax: width -20,
    yMax: height - bottomUIHeight,
  };


  const elapsedRef = useRef(0);
  const animationStartTimeRef = useRef<number | null>(null);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const breathingInterval = useRef<NodeJS.Timeout | null>(null);

  const progressAnim = useRef(new RNAnimated.Value(1)).current;
  const scale = useSharedValue(1);
  const moveAnim = useSharedValue(0);

  const voiceRef = useRef(voiceEnabled);
  useEffect(() => {
    voiceRef.current = voiceEnabled;
  }, [voiceEnabled]);

  useEffect(() => {
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

 useEffect(() => {
  if (breathingType === "tapping") {
    if (animationTimerRef.current) clearInterval(animationTimerRef.current);
    if (timerInterval.current) clearInterval(timerInterval.current);
    if (breathingInterval.current) clearInterval(breathingInterval.current);
    Speech.stop();
    RNAnimated.timing(progressAnim).stop();
    cancelAnimation(scale);
    cancelAnimation(moveAnim);
  }
}, [breathingType]);


  // Breathing circle logic
  const startBreathingCircle = useCallback(() => {
    setPhase("Inhale");
    Speech.stop();
    if (voiceRef.current) Speech.speak("Inhale", { rate: 0.9 });

    scale.value = withTiming(1.5, { duration: BREATH_DURATION / 2 });

    if (breathingInterval.current) clearInterval(breathingInterval.current);
    breathingInterval.current = setInterval(() => {
      setPhase((prev) => {
        const next = prev === "Inhale" ? "Exhale" : "Inhale";
        Speech.stop();
        if (voiceRef.current) Speech.speak(next, { rate: 0.9 });

        scale.value = withTiming(next === "Inhale" ? 1.5 : 0.9, {
          duration: BREATH_DURATION / 2,
        });

        return next;
      });
    }, BREATH_DURATION / 2);
  }, [scale]);

  // Breathing box logic
  const startBoxLoop = () => {
    runOnUI(() => {
      const phaseDur = BREATH_DURATION / 4;
      const pts = [0.25, 0.5, 0.75, 1];

      const getNextIndex = (progress: number) => {
        for (let i = 0; i < pts.length; i++) {
          if (progress < pts[i]) return i;
        }
        return 0;
      };

      const animateSegment = (idx: number) => {
        if (idx >= pts.length) {
          moveAnim.value = withTiming(0, { duration: 0 }, () => {
            animateSegment(0);
          });
          return;
        }

        moveAnim.value = withTiming(pts[idx], { duration: phaseDur }, (finished) => {
          if (finished) animateSegment(idx + 1);
        });
      };

      const currentProgress = moveAnim.value;
      const currentIdx = getNextIndex(currentProgress);

      animateSegment(currentIdx);
    })();
  };

  const startBreathingBox = useCallback(() => {
    const steps: ("Inhale" | "Hold" | "Exhale" | "Hold")[] = [
      "Inhale",
      "Hold",
      "Exhale",
      "Hold",
    ];
    let step = 0;

    setPhase(steps[step]);
    Speech.stop();
    if (voiceRef.current) Speech.speak(steps[step], { rate: 0.9 });

    startBoxLoop();

    if (breathingInterval.current) clearInterval(breathingInterval.current);

    breathingInterval.current = setInterval(() => {
      step = (step + 1) % steps.length;
      setPhase(steps[step]);
      Speech.stop();
      if (voiceRef.current) Speech.speak(steps[step], { rate: 0.9 });
    }, BREATH_DURATION / 4);
  }, [moveAnim]);

  // ==== TIMER + PROGRESS ANIMATION LOGIC ==== //

  // Start or restart the countdown timer and progress animation
  const startTimer = useCallback(
    (newTotalDuration: number, elapsed = 0) => {
      // Stop old animations & timers
      RNAnimated.timing(progressAnim).stop();
      if (animationTimerRef.current) clearInterval(animationTimerRef.current);
      if (timerInterval.current) clearInterval(timerInterval.current);

      animationStartTimeRef.current = Date.now() - elapsed * 1000;
      elapsedRef.current = elapsed;

      // Set progress to remaining ratio
      progressAnim.setValue((newTotalDuration - elapsed) / newTotalDuration);

      // Animate progress bar from current progress to zero over remaining time
      RNAnimated.timing(progressAnim, {
        toValue: 0,
        duration: (newTotalDuration - elapsed) * 1000,
        useNativeDriver: false,
      }).start();

      // Update secondsLeft and elapsed every 200ms
      animationTimerRef.current = setInterval(() => {
        const elapsedMs = Date.now() - (animationStartTimeRef.current ?? Date.now());
        elapsedRef.current = elapsedMs / 1000;

        const timeLeft = newTotalDuration - elapsedRef.current;
        if (timeLeft <= 0) {
          clearInterval(animationTimerRef.current!);
          clearInterval(timerInterval.current!);
          clearInterval(breathingInterval.current!);
          Speech.stop();
          const timeSpent = Math.floor(elapsedRef.current);
navigation.replace("SessionComplete", { timeSpent });

          setSecondsLeft(0);
          return;
        }
        setSecondsLeft(Math.ceil(timeLeft));
      }, 200);

      
    },
    [navigation, progressAnim]
  );

  // Start session fresh or on focus
 useFocusEffect(
  useCallback(() => {
    setTotalDuration(SESSION_DURATION);
    setSecondsLeft(SESSION_DURATION);
    elapsedRef.current = 0;
    setPaused(false);

    if (breathingType === "circle") {
      scale.value = withTiming(1.5, { duration: BREATH_DURATION / 2 });
      startBreathingCircle();
    } else if (breathingType === "box") {
      startBreathingBox();
    }
    // If tapping, do NOT start breathing voice or animation

    startTimer(SESSION_DURATION, 0);

    return () => {
      if (animationTimerRef.current) clearInterval(animationTimerRef.current);
      if (timerInterval.current) clearInterval(timerInterval.current);
      if (breathingInterval.current) clearInterval(breathingInterval.current);
      Speech.stop();
    };
  }, [breathingType, scale, startBreathingCircle, startBreathingBox, startTimer])
);


  // Add 30 seconds without resetting progress bar
  const addTime = () => {
    const elapsed = elapsedRef.current;
    const newTotal = totalDuration + 30;
    setTotalDuration(newTotal);
    startTimer(newTotal, elapsed);
  };

  const finishEarly = () => {
    if (animationTimerRef.current) clearInterval(animationTimerRef.current);
    if (timerInterval.current) clearInterval(timerInterval.current);
    if (breathingInterval.current) clearInterval(breathingInterval.current);
    Speech.stop();
    RNAnimated.timing(progressAnim).stop();
    const timeSpent = Math.floor(elapsedRef.current);
navigation.replace("SessionComplete", { timeSpent });
  };

  const pause = () => {
    setPaused(true);
    if (animationTimerRef.current) clearInterval(animationTimerRef.current);
    if (timerInterval.current) clearInterval(timerInterval.current);
    if (breathingInterval.current) clearInterval(breathingInterval.current);
    Speech.stop();
    RNAnimated.timing(progressAnim).stop();
    cancelAnimation(scale);
    cancelAnimation(moveAnim);
  };

  const resume = () => {
    setPaused(false);
    startTimer(totalDuration, elapsedRef.current);

    if (breathingType === "circle") {
      startBreathingCircle();
    } else {
      startBreathingBox();
    }
  };

  // Animated styles
  const ballStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

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

  // Progress bar width interpolation
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View
      className="flex-1 pt-20 px-6 pb-8"
      style={{ backgroundColor: colors.background }}
    >
      {/* User Controls */}
      <View className="mb-4 space-y-2">
        <View className="flex-row space-x-4 justify-center">
          <Pressable
  onPress={() =>
    setBreathingType((prev) =>
      prev === "circle" ? "box" : prev === "box" ? "tapping" : "circle"
    )
}
  className="flex-1 px-4 py-2 rounded-full items-center shadow"
  style={{ backgroundColor: colors.primary }}
>
  <Text className="text-white font-semibold">
    Breathing: {breathingType}
  </Text>
</Pressable>


          <Pressable
            onPress={addTime}
            className="flex-1 px-4 py-2 rounded-full items-center shadow"
            style={{ backgroundColor: colors.accentLight }}
          >
            <Text style={{ color: colors.primary, fontWeight: "600" }}>+30s</Text>
          </Pressable>
        </View>
      </View>

      {/* Progress Bar */}
      <View
        className="w-full h-2 rounded-full mb-4 overflow-hidden"
        style={{ backgroundColor: colors.accentLight }}
      >
        <RNAnimated.View
          style={{ width: progressWidth, backgroundColor: colors.primary }}
          className="h-full"
        />
      </View>

      {/* Timer */}
      <View className="items-center mb-6">
        <Text className="text-4xl font-extrabold drop-shadow" style={{ color: colors.primary }}>
  {secondsLeft < 60
    ? `${secondsLeft}s`
    : `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`}
</Text>

      </View>

      {/* Breathing Visual */}
      <View className="flex-1 justify-center items-center relative">
       <View className="flex-1 justify-center items-center relative">
  {breathingType === "circle" ? (
    <Animated.View
      className="w-48 h-48 rounded-full shadow-lg justify-center items-center border-4"
      style={[
        ballStyle,
        {
          backgroundColor: colors.accentLight,
          borderColor: colors.primary,
        },
      ]}
    >
      <View className="absolute inset-0 justify-center items-center">
        <Text
          className="text-3xl font-semibold"
          style={{ color: colors.textMain }}
        >
          {phase}
        </Text>
      </View>
    </Animated.View>
  ) : breathingType === "box" ? (
    <View
      style={{
        width: BOX_SIZE,
        height: BOX_SIZE,
        borderWidth: BORDER_THICKNESS,
        borderColor: colors.border,
        borderRadius: 24,
        position: "relative",
        backgroundColor: colors.accentLight,
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            width: BALL_SIZE,
            height: BALL_SIZE,
            borderRadius: BALL_SIZE / 2,
            backgroundColor: colors.primary,
            borderWidth: 3,
            borderColor: colors.accentLight,
          },
          boxBallStyle,
        ]}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 32, fontWeight: "600", color: colors.textMain }}
        >
          {phase}
        </Text>
      </View>
    </View>
  ) : (

  <View style={{ position: "relative", width, height }}>
  <TappingDotsGame
  colors={colors}
  spawnArea={spawnArea}
  paused={paused}
  voiceEnabled={voiceEnabled}
/>




</View>

  )}
</View>

      </View>

      {/* Action Buttons */}
      <View className="space-y-4 mt-8">
        <View className="flex-row justify-center space-x-4">
          <Pressable
            onPress={finishEarly}
            className="flex-1 px-6 py-3 rounded-full border shadow-sm items-center"
            style={{ borderColor: colors.primary, backgroundColor: colors.background }}
          >
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              Finish Early
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setVoiceEnabled((v) => !v)}
            className="flex-1 px-6 py-3 rounded-full items-center shadow"
            style={{
              backgroundColor: voiceEnabled ? colors.primary : colors.border,
            }}
          >
            <Text
              style={{
                color: voiceEnabled ? "#fff" : colors.textMain,
                fontWeight: "600",
              }}
            >
              Voice: {voiceEnabled ? "On" : "Off"}
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={paused ? resume : pause}
          className="w-full py-3 rounded-full items-center shadow"
          style={{
            backgroundColor: paused ? colors.primary : colors.textSecondary,
          }}
        >
          <Text className="text-white text-lg font-semibold">
            {paused ? "Resume" : "Pause"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
