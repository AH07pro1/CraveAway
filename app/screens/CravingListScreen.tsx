import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../utils/colors";

type CravingEvent = {
  id: number;
  createdAt: string;
  intensity?: number;
  notes?: string;
  resolved: boolean;
  type?: {
    name: string;
  } | null;
};


type FilterType = "all" | "week" | "month" | "year";

const filterLabels: Record<FilterType, string> = {
  all: "All",
  week: "This Week",
  month: "This Month",
  year: "This Year",
};

const cravingIcons: Record<string, string> = {
  food: "🍔",
  smoke: "🚬",
  drink: "🍷",
  cigarette: "🚭",
  vape: "💨",
  weed: "🌿",
  cocaine: "❄️",
  heroin: "💉",
  other: "❓",
};

export default function CravingListScreen({ navigation }: any) {
  const [cravings, setCravings] = useState<CravingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");

  const fetchCravings = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://192.168.2.19:3000/api/craving");
      const data = await res.json();
      setCravings(data);
    } catch (error) {
      console.error("Failed to fetch cravings:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCravings();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchCravings();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCravings();
    }, [])
  );

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const filteredCravings = cravings.filter((c) => {
    const created = new Date(c.createdAt);
    if (filter === "week") return created >= startOfWeek;
    if (filter === "month") return created >= startOfMonth;
    if (filter === "year") return created >= startOfYear;
    return true;
  });

  const sortedCravings = [...filteredCravings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 px-4 pb-4" style={{ backgroundColor: colors.background }}>
      {/* Filter Buttons */}
      <View className="flex-row justify-around mb-4">
        {(["all", "week", "month", "year"] as FilterType[]).map((f) => {
          const isActive = filter === f;
          return (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              className="px-4 py-2 rounded-full border"
              style={{
                borderColor: isActive ? colors.primary : "#9CA3AF",
                backgroundColor: isActive ? colors.primary : colors.background,
              }}
            >
              <Text
                className="font-semibold"
                style={{ color: isActive ? colors.textMain : colors.textSecondary }}
              >
                {filterLabels[f]}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Title */}
      <Text className="text-3xl font-bold text-center mb-6" style={{ color: colors.primary }}>
        Craving History
      </Text>

      {/* List */}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {sortedCravings.length === 0 ? (
          <Text className="text-center mt-12 text-base italic" style={{ color: colors.textSecondary }}>
            No cravings found. That’s a win! 🎉
          </Text>
        ) : (
          sortedCravings.map((craving) => (
            <Pressable
              key={craving.id}
              onPress={() => navigation.navigate("CravingDetail", { id: craving.id })}
              className="rounded-2xl p-4 mb-4 border shadow-md active:opacity-80"
              style={{
                backgroundColor: colors.accentLight|| "#F1F5F9",
                borderColor: colors.primary,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
                elevation: 3,
              }}
            >
             <Text className="text-lg font-bold capitalize mb-1" style={{ color: "#0d6e67" }}>
  {cravingIcons[craving.type?.name ?? "other"] || "🌀"} {craving.type?.name ?? "Unknown"}
</Text>


              <Text className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                Notes: {craving.notes || "None"}
              </Text>

              <Text
                className="text-sm font-semibold mb-1"
                style={{ color: craving.resolved ? "#22c55e" : "#ef4444" }}
              >
                {craving.resolved ? "You stayed strong 💪" : "You gave in 😞"}
              </Text>

              <View className="flex-row mb-2">
                <Text className="text-sm mr-2" style={{ color: colors.textSecondary }}>
                  Intensity:
                </Text>
                <View className="flex-row items-center">
                  {Array.from({ length: craving.intensity || 0 }).map((_, i) => (
                    <View
                      key={i}
                      className="w-2 h-2 rounded-full mr-1"
                      style={{ backgroundColor: "#f97316" }}
                    />
                  ))}
                </View>
              </View>

              <Text className="text-xs" style={{ color: "#94a3b8" }}>
                {new Date(craving.createdAt).toLocaleString()}
              </Text>
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
