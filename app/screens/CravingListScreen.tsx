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
import colors from "../utils/colors"; // adjust the path as needed

type CravingEvent = {
  id: number;
  createdAt: string;
  intensity?: number;
  notes?: string;
  resolved: boolean;
  type: string;
};

type FilterType = "all" | "week" | "month" | "year";

const filterLabels: Record<FilterType, string> = {
  all: "All",
  week: "This Week",
  month: "This Month",
  year: "This Year",
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

  // Date boundaries for filtering
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

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-4" style={{ backgroundColor: colors.background }}>
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
                style={{ color: isActive ? colors.textMain: colors.textSecondary }}
              >
                {filterLabels[f]}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Fixed Title */}
      <Text
        className="text-3xl font-bold text-center mb-6"
        style={{ color: colors.primary }}
      >
        Craving History
      </Text>

      {/* Scrollable List */}
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        {filteredCravings.length === 0 ? (
          <Text className="text-center" style={{ color: colors.textSecondary}}>
            No cravings found.
          </Text>
        ) : (
          filteredCravings.map((craving) => (
            <Pressable
              key={craving.id}
              onPress={() => navigation.navigate("CravingDetail", { id: craving.id })}
              className="rounded-xl p-4 mb-4 shadow-md border"
              style={{ backgroundColor: "white", borderColor: colors.primary }}
            >
              <Text className="text-lg font-bold capitalize" style={{ color: "#0d6e67" }}>
                {craving.type}
              </Text>
              <Text className="text-sm" style={{ color: colors.textSecondary }}>
                Intensity: {craving.intensity ?? "N/A"}
              </Text>
              <Text className="text-sm" style={{ color: colors.textSecondary }}>
                Notes: {craving.notes || "None"}
              </Text>
              <Text className="text-sm" style={{ color: colors.textSecondary }}>
                Resolved: {craving.resolved ? "Yes" : "No"}
              </Text>
              <Text className="text-xs mt-1" style={{ color: "#94a3b8" }}>
                {new Date(craving.createdAt).toLocaleString()}
              </Text>
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
