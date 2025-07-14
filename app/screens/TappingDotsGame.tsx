import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";
import { Audio } from "expo-av";


const { width, height } = Dimensions.get("window");

const MESSAGES = [
  "You're okay.",
  "Stay with the breath.",
  "This moment will pass.",
  "You are safe.",
  "Breathe through the urge.",
  "Well done!",
];

type Dot = {
  id: number;
  x: number;
  y: number;
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
};

type SpawnArea = {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
};

export default function TappingDotsGame({
  colors,
  spawnArea,
  paused,
  voiceEnabled,
}: {
  colors: any;
  spawnArea: SpawnArea;
  paused: boolean;
  voiceEnabled: boolean;
}) {

  const [dots, setDots] = useState<Dot[]>([]);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [totalSpawned, setTotalSpawned] = useState(0);

  const messageOpacity = useRef(new Animated.Value(0)).current;
  const dotId = useRef(0);
  const spawnInterval = useRef<NodeJS.Timeout | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  const voiceRef = useRef(voiceEnabled);
useEffect(() => {
  voiceRef.current = voiceEnabled;
}, [voiceEnabled]);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/sounds/sharp-pop.mp3")
      );
      soundRef.current = sound;
    };

    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (paused) {
      if (spawnInterval.current) clearInterval(spawnInterval.current);
      return;
    }

    setScore(0);
    setTotalSpawned(0);
    setDots([]);

    spawnDot(); // spawn one immediately

    spawnInterval.current = setInterval(spawnDot, 800);

    return () => {
      if (spawnInterval.current) clearInterval(spawnInterval.current);
    };
  }, [paused]);

  const spawnDot = () => {
    const size = 60;
    const x =
      Math.random() * (spawnArea.xMax - spawnArea.xMin) + spawnArea.xMin;
    const y =
      Math.random() * (spawnArea.yMax - spawnArea.yMin) + spawnArea.yMin;

    const fadeAnim = new Animated.Value(1);
    const scaleAnim = new Animated.Value(0.6);

    const newDot: Dot = {
      id: dotId.current++,
      x,
      y,
      fadeAnim,
      scaleAnim,
    };

    setTotalSpawned((prev) => prev + 1);
    setDots((prev) => [...prev, newDot]);

    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setDots((prev) => prev.filter((dot) => dot.id !== newDot.id));
    }, 4000);
  };

  const handleTap = async (id: number) => {
  setDots((prev) => prev.filter((dot) => dot.id !== id));
  const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  setMessage(randomMessage);
  setScore((prev) => prev + 1);

  // ✅ Only play sound if voice is enabled
  if (soundRef.current && voiceRef.current) {
    await soundRef.current.replayAsync();
  }

  messageOpacity.setValue(0);

  Animated.timing(messageOpacity, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
  }).start(() => {
    setTimeout(() => {
      Animated.timing(messageOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 2000);
  });
};


  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width,
        height,
        zIndex: 50,
      }}
    >
      {/* Score UI */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 10,
          right: 20,
          backgroundColor: colors.primary,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 12,
          zIndex: 100,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
          Score: {score} / {totalSpawned}
        </Text>
      </View>

      {/* Dots */}
      {dots.map((dot) => (
        <Animated.View
          key={dot.id}
          pointerEvents="auto"
          style={{
            position: "absolute",
            top: dot.y,
            left: dot.x,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
            opacity: dot.fadeAnim,
            transform: [{ scale: dot.scaleAnim }],
            zIndex: 1000,
          }}
        >
          <Pressable
            onPress={() => handleTap(dot.id)}
            style={{ width: "100%", height: "100%" }}
          />
        </Animated.View>
      ))}

      {/* Message */}
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          bottom: 150,
          left: 20,
          right: 20,
          alignItems: "center",
          opacity: messageOpacity,
          backgroundColor: "rgba(0,0,0,0.3)",
          paddingVertical: 10,
          borderRadius: 10,
          zIndex: 200,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "white",
            textShadowColor: "#00000099",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 4,
          }}
        >
          {message}
        </Text>
      </Animated.View>
    </View>
  );
}
