import React from "react";
import { View, Text, Pressable } from "react-native";
import colors from "../utils/colors";

export default function SessionCompleteScreen({ route, navigation }: any) {
  const { timeSpent = 0 } = route.params || {};

  // Defensive fallback & parse
  const seconds = Number(timeSpent) || 0;

  // Display format: if >= 60s, show minutes & seconds, else show seconds
  let displayTime = "";
  if (seconds < 60) {
    displayTime = `${seconds} second${seconds !== 1 ? "s" : ""}`;
  } else {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    displayTime = `${mins} minute${mins !== 1 ? "s" : ""}`;
    if (secs > 0) displayTime += ` and ${secs} second${secs !== 1 ? "s" : ""}`;
  }

  return (
    <View
      className="flex-1 justify-center items-center px-6"
      style={{ backgroundColor: colors.background }}
    >
      <Text
        className="text-2xl font-semibold mb-4 text-center"
        style={{ color: colors.primary }}
      >
        Session Complete 🌿
      </Text>
      <Text
        className="text-lg italic mb-6 text-center"
        style={{ color: colors.textMain }}
      >
        You stayed for {displayTime} — great job!
      </Text>
      <Text
        className="text-base mb-10 text-center"
        style={{ color: colors.textMain }}
      >
        Remember to be gentle with yourself and keep practicing.
      </Text>
      <Pressable
        className="px-10 py-3 rounded-full shadow"
        style={{ backgroundColor: colors.primary }}
        onPress={() => navigation.navigate("CreateCravingForm")}
      >
        <Text className="text-white text-lg font-semibold">Continue</Text>
      </Pressable>
    </View>
  );
}
