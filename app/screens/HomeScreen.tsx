import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { format, parseISO } from "date-fns";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../utils/colors";
import { useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Purchases from "react-native-purchases";
import { API_URL } from "../config"; // Import API_URL

const quotes = [
  "Every craving you resist is a victory.",
  "Stay strong — one day at a time.",
  "You’re doing better than yesterday.",
  "Small steps lead to big changes.",
  "Keep going, your future self will thank you.",
];

export default function HomeScreen({ navigation }: any) {
  const { user } = useUser();

  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);

  const [longestStreakInfo, setLongestStreakInfo] = useState<{
    type: string;
    streak: number;
  }>({ type: "", streak: 0 });
  const [xpGained, setXpGained] = useState<number | null>(null);
const [showXPReward, setShowXPReward] = useState(false);

useEffect(() => {
  const checkSubscription = async () => {
    const customerInfo = await Purchases.getCustomerInfo();
    const isPro = typeof customerInfo.entitlements.active['pro'] !== 'undefined';

    if (isPro) {
      await AsyncStorage.setItem('hasPaid', 'true');
      navigation.replace('Tabs'); // Now it works because you're in a screen
    }
  };

  checkSubscription();
}, []);


  /** Helpers */
  const calculateLongestStreaksByType = (data: any[]) => {
    const grouped: { [type: string]: { date: string; resolved: boolean }[] } = {};

    data.forEach((c) => {
      const type = c.type?.name || "Unknown";
      const date = format(parseISO(c.createdAt), "yyyy-MM-dd");
      if (!grouped[type]) grouped[type] = [];
      grouped[type].push({ date, resolved: c.resolved });
    });

    const result: { [type: string]: number } = {};
    const today = new Date();

    Object.entries(grouped).forEach(([type, entries]) => {
      const gaveInByDate: { [d: string]: boolean } = {};
      entries.forEach((e) => {
        if (!e.resolved) gaveInByDate[e.date] = true;
      });

      const oldestDateStr = entries.reduce(
        (oldest, e) => (e.date < oldest ? e.date : oldest),
        entries[0].date
      );

      let streak = 0;
      let cursor = new Date(today);

      while (true) {
        const dStr = format(cursor, "yyyy-MM-dd");
        if (dStr < oldestDateStr) break;
        if (gaveInByDate[dStr]) break;

        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
        if (streak > 365) break;
      }

      result[type] = streak;
    });

    return Object.entries(result).reduce(
      (acc, [type, s]) => (s > acc.streak ? { type, streak: s } : acc),
      { type: "", streak: 0 }
    );
  };

const doDailyCheckin = async () => {
  if (!user?.id) return;

  try {
    const response = await fetch('${API_URL}/api/daily-checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id }),
    });

    const text = await response.text();
    console.log('Raw daily check-in response:', text);

    const data = JSON.parse(text);
    console.log('Daily check-in result:', data);

    // 👇 show XP if provided
    if (data?.xpGained) {
      setXpGained(data.xpGained);
      setShowXPReward(true);
      setTimeout(() => setShowXPReward(false), 2000);
    }
  } catch (err) {
    console.error('Daily check-in failed:', err);
  }
};



  /** Reload data on focus */
 const reloadHomeData = async () => {
  if (!user?.id) {
    console.warn("User not logged in");
    return;
  }

  setLoading(true); // 👈 start loading

  const qi = Math.floor(Math.random() * quotes.length);
  setQuote(quotes[qi]);

  try {
    const res = await fetch(`${API_URL}/api/craving?userId=${user.id}`);
    if (!res.ok) throw new Error("Failed to fetch cravings");

    const data = await res.json();
    const longest = calculateLongestStreaksByType(data);
    setLongestStreakInfo(longest);
  } catch (err) {
    console.error("Failed to fetch cravings", err);
  } finally {
    setLoading(false); // 👈 end loading
  }
};


  // Run on every screen focus
  useFocusEffect(
    useCallback(() => {
      reloadHomeData();
       doDailyCheckin();
    }, [])
  );

  /** UI */
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

      
      {/* Header */}
      <View className="mb-6 items-center">
        <Text
          className="text-4xl font-extrabold text-center mb-1"
          style={{ color: colors.primary }}
        >
          CraveAway
        </Text>
        <Text
          className="text-base text-center"
          style={{ color: colors.textSecondary }}
        >
          Track cravings. Stay in control.
        </Text>
      </View>

      {/* Quote */}
      <View
        className="bg-[#E9EBF8] rounded-2xl p-5 mb-6 shadow-md w-full max-w-xl"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 5,
        }}
      >
        <Text
          className="italic text-center text-base"
          style={{ color: colors.textSecondary }}
        >
          "{quote}"
        </Text>
      </View>

      {/* Longest Streak */}
        {loading ? (
  <View
    className="bg-[#E9EBF8] rounded-2xl p-6 mb-8 shadow-md w-full max-w-xl opacity-40"
    style={{
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 5,
    }}
  >
    <Text
      className="text-lg text-center"
      style={{ color: colors.textMain }}
    >
      Calculating streak...
    </Text>
  </View>
) : (
  <View
    className="bg-[#E9EBF8] rounded-2xl p-6 mb-8 shadow-md w-full max-w-xl"
    style={{
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 5,
    }}
  >
    <Text
      className="text-lg text-center"
      style={{ color: colors.textMain }}
    >
      🔥{" "}
      <Text className="font-semibold" style={{ color: colors.primary }}>
        {longestStreakInfo.streak}
      </Text>{" "}
      day{longestStreakInfo.streak === 1 ? "" : "s"} without{" "}
      <Text className="font-semibold" style={{ color: colors.primary }}>
        {longestStreakInfo.type || "craving"}
      </Text>
    </Text>
  </View>
)}

      {/* Button */}
      <TouchableOpacity
        className="bg-[#3A86FF] rounded-3xl py-4 px-10 shadow-lg mb-6 w-full max-w-xl items-center"
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate("Calming", { screen: "CalmingSession" })
        }
      >
        <Text className="text-white text-2xl font-bold tracking-wide">
          I Have a Craving
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text
        className="text-sm italic text-center"
        style={{ color: colors.textSecondary, maxWidth: 320 }}
      >
        Take a deep breath. You’re in control.
      </Text>
    </View>
  );
}
