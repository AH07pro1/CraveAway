import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import colors from "../utils/colors";
import { useUser } from '@clerk/clerk-expo';
import { API_URL } from "../config";
export default function SessionCompleteScreen({ route, navigation }: any) {
  const { user } = useUser(); // Clerk user
  const { timeSpent = 0 } = route.params || {};
  const seconds = Number(timeSpent) || 0;
const [showXPReward, setShowXPReward] = useState(false);
const [xpGained, setXpGained] = useState<number | null>(null);



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

   useEffect(() => {
    const sendXP = async () => {
  try {
    const response = await fetch(`${API_URL}/api/session-complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?.id,
        timeSpent: seconds,
      }),
    });

    const data = await response.json();
console.log("XP updated:", data);

setXpGained(data.xpGained); // ✅ update state
setShowXPReward(true);

setTimeout(() => {
  setShowXPReward(false);
}, 2000);


  } catch (err) {
    console.error("XP update failed:", err);
  }
};


    if (user?.id && seconds > 0) {
      sendXP();
    }
  }, [user, seconds]);

  return (
    <View
      className="flex-1 justify-center items-center px-6"
      style={{ backgroundColor: colors.background }}
    >
      {showXPReward && (
  <View
    className="absolute top-20 bg-[#FFD700] px-6 py-3 rounded-full shadow-lg"
    style={{
      zIndex: 999,
      elevation: 10,
      borderWidth: 1,
      borderColor: "#FFF3B0",
    }}
  >
   <Text className="text-lg font-bold text-center text-white">
  +{xpGained ?? "?"} XP!
</Text>

  </View>
)}

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


