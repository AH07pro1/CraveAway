import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Platform,
} from "react-native";
import colors from "../utils/colors";
import { useUser } from "@clerk/clerk-expo";
import { API_URL } from "../config";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import ConfettiCannon from "react-native-confetti-cannon";

export default function SessionCompleteScreen({ route, navigation }: any) {
  const { user } = useUser();
  const { timeSpent = 0 } = route.params || {};
  const seconds = Number(timeSpent) || 0;

  const [showXPReward, setShowXPReward] = useState(false);
  const [xpGained, setXpGained] = useState<number | null>(null);
  const xpScale = useRef(new Animated.Value(0)).current;
  const confettiRef = useRef<any>(null);

  // Format time display
  let displayTime = "";
  if (seconds < 60) {
    displayTime = `${seconds} second${seconds !== 1 ? "s" : ""}`;
  } else {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    displayTime = `${mins} minute${mins !== 1 ? "s" : ""}`;
    if (secs > 0) displayTime += ` and ${secs} second${secs !== 1 ? "s" : ""}`;
  }

  useEffect(() => {
    const sendXP = async () => {
      try {
        const response = await fetch(`${API_URL}/api/session-complete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user?.id, timeSpent: seconds }),
        });

        const data = await response.json();
        setXpGained(data.xpGained);
        setShowXPReward(true);

        // Haptic feedback
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        // Animate XP popup
        Animated.spring(xpScale, { toValue: 1, useNativeDriver: true }).start();

        // Fire confetti
        confettiRef.current?.start();

        setTimeout(() => {
          Animated.timing(xpScale, { toValue: 0, duration: 300, useNativeDriver: true }).start();
          setShowXPReward(false);
        }, 2000);
      } catch (err) {
        console.error("XP update failed:", err);
      }
    };

    if (user?.id && seconds > 0) sendXP();
  }, [user, seconds]);

  return (
    <LinearGradient
      colors={["#D4EDFF", "#FFFFFF"]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}
    >
      {/* Confetti */}
      <ConfettiCannon ref={confettiRef} count={50} origin={{ x: -10, y: 0 }} fadeOut />

      {/* XP Reward Popup */}
      {showXPReward && (
        <Animated.View
          style={{
            transform: [{ scale: xpScale }],
            position: "absolute",
            top: 80,
            backgroundColor: "#FFD700",
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 999,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            zIndex: 999,
            alignSelf: "center",
            borderWidth: 1,
            borderColor: "#FFF3B0",
          }}
        >
          <Text style={{ fontWeight: "700", color: "white", fontSize: 18, textAlign: "center" }}>
            +{xpGained ?? "?"} XP!
          </Text>
        </Animated.View>
      )}

      {/* Session Completion Info */}
      <Text style={{ fontSize: 28, fontWeight: "700", color: colors.primary, textAlign: "center", marginBottom: 12 }}>
        Session Complete 🌿
      </Text>
      <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "600", color: colors.textMain, marginBottom: 16 }}>
        You stayed for{" "}
        <Text style={{ fontWeight: "900", color: colors.primary }}>{displayTime}</Text> — great job!
      </Text>
      <Text style={{ fontSize: 16, textAlign: "center", color: colors.textMain, marginBottom: 24 }}>
        Remember to be gentle with yourself and keep practicing.
      </Text>

      {/* Continue Button */}
      <Pressable
        style={{
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 999,
          backgroundColor: colors.primary,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 4,
        }}
        onPress={() => navigation.navigate("CreateCravingForm")}
      >
        <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>Continue</Text>
      </Pressable>

     
    </LinearGradient>
  );
}
