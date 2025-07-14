import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Pressable,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../utils/colors";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";

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

  // Filters default values
  const defaultFilter: FilterType = "all";
  const defaultTypeFilter = "all";
  const defaultResolvedFilter: "all" | "resolved" | "unresolved" = "all";
  const defaultMinIntensity = 0;

  // Filters states
  const [filter, setFilter] = useState<FilterType>(defaultFilter);
  const [typeFilter, setTypeFilter] = useState<string>(defaultTypeFilter);
  const [minIntensity, setMinIntensity] = useState<number>(defaultMinIntensity);
  const [resolvedFilter, setResolvedFilter] = useState<
    "all" | "resolved" | "unresolved"
  >(defaultResolvedFilter);

  const [filtersVisible, setFiltersVisible] = useState(false);

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

  // Reset all filters to defaults
  const resetFilters = () => {
    setFilter(defaultFilter);
    setTypeFilter(defaultTypeFilter);
    setResolvedFilter(defaultResolvedFilter);
    setMinIntensity(defaultMinIntensity);
  };

  // Reset filters on screen focus
  useFocusEffect(
    useCallback(() => {
      resetFilters();
      fetchCravings();
    }, [])
  );

  useEffect(() => {
    fetchCravings();
  }, []);

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  // Unique types dynamically from cravings for dropdown
  const uniqueTypes = Array.from(
    new Set(cravings.map((c) => c.type?.name).filter(Boolean))
  ) as string[];
  uniqueTypes.sort();

  const filteredCravings = cravings.filter((c) => {
    const created = new Date(c.createdAt);

    if (filter === "week" && created < startOfWeek) return false;
    if (filter === "month" && created < startOfMonth) return false;
    if (filter === "year" && created < startOfYear) return false;

    if (typeFilter !== "all" && c.type?.name !== typeFilter) return false;

    if ((c.intensity ?? 0) < minIntensity) return false;

    if (resolvedFilter === "resolved" && !c.resolved) return false;
    if (resolvedFilter === "unresolved" && c.resolved) return false;

    return true;
  });

  const sortedCravings = [...filteredCravings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (loading) {
    return (
      <SafeAreaView
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: colors.background }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 px-4 pb-4"
      style={{ backgroundColor: colors.background }}
    >
      {/* Toggle Filters Button */}
      <Pressable
        onPress={() => setFiltersVisible((v) => !v)}
        className="mb-2 px-4 py-2 rounded-full border self-center"
        style={{
          borderColor: colors.primary,
          backgroundColor: colors.background,
        }}
      >
        <Text
          className="font-semibold"
          style={{ color: colors.primary, fontSize: 16 }}
        >
          {filtersVisible ? "Hide Filters ▲" : "Show Filters ▼"}
        </Text>
      </Pressable>

      {/* Reset Filters Button (show only when filters visible) */}
      {filtersVisible && (
        <Pressable
          onPress={resetFilters}
          className="mb-4 px-4 py-2 rounded-full border self-center"
          style={{
            borderColor: colors.primary,
            backgroundColor: colors.background,
          }}
        >
          <Text
            className="font-semibold"
            style={{ color: colors.primary, fontSize: 14 }}
          >
            Reset Filters
          </Text>
        </Pressable>
      )}

      {/* Filters Section */}
      {filtersVisible && (
        <>
          {/* Filters row: Type + Resolved */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            {/* Type Filter */}
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text
                style={{
                  color: colors.textMain,
                  fontWeight: "600",
                  marginBottom: 4,
                  fontSize: 14,
                }}
              >
                Type
              </Text>
              <View
                style={{
                  borderColor: colors.primary,
                  borderWidth: 1,
                  borderRadius: 6,
                  overflow: "hidden",
                  backgroundColor: colors.background,
                  height: 36,
                  justifyContent: "center",
                }}
              >
                <Picker
                  key="typePicker"
                  selectedValue={typeFilter}
                  onValueChange={(itemValue) => setTypeFilter(itemValue)}
                  dropdownIconColor={colors.primary}
                  style={{
                    color: colors.textMain,
                    height: Platform.OS === "ios" ? 120 : 36,
                  }}
                >
                  <Picker.Item label="All Types" value="all" />
                  {uniqueTypes.map((type) => (
                    <Picker.Item
                      key={type}
                      label={type.charAt(0).toUpperCase() + type.slice(1)}
                      value={type}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Resolved Filter */}
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text
                style={{
                  color: colors.textMain,
                  fontWeight: "600",
                  marginBottom: 4,
                  fontSize: 14,
                }}
              >
                Status
              </Text>
              <View
                style={{
                  borderColor: colors.primary,
                  borderWidth: 1,
                  borderRadius: 6,
                  overflow: "hidden",
                  backgroundColor: colors.background,
                  height: 36,
                  justifyContent: "center",
                }}
              >
                <Picker
                  key="resolvedPicker"
                  selectedValue={resolvedFilter}
                  onValueChange={(itemValue) => setResolvedFilter(itemValue)}
                  dropdownIconColor={colors.primary}
                  style={{
                    color: colors.textMain,
                    height: Platform.OS === "ios" ? 120 : 36,
                  }}
                >
                  <Picker.Item label="All" value="all" />
                  <Picker.Item label="Resolved" value="resolved" />
                  <Picker.Item label="Unresolved" value="unresolved" />
                </Picker>
              </View>
            </View>
          </View>

          {/* Intensity slider */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                color: colors.textMain,
                fontWeight: "600",
                marginBottom: 4,
                fontSize: 14,
              }}
            >
              Min Intensity: {minIntensity}
            </Text>
            <Slider
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={minIntensity}
              onValueChange={setMinIntensity}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.textSecondary}
              thumbTintColor={colors.primary}
              style={{ width: "100%", height: 30 }}
            />
          </View>
        </>
      )}

      {/* Time filter buttons */}
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
                style={{
                  color: isActive ? colors.textMain : colors.textSecondary,
                  fontSize: 14,
                }}
              >
                {filterLabels[f]}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Title */}
      <Text
        className="text-3xl font-bold text-center mb-6"
        style={{ color: colors.primary }}
      >
        Craving History
      </Text>

      {/* Craving List */}
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
          <Text
            className="text-center mt-12 text-base italic"
            style={{ color: colors.textSecondary }}
          >
            No cravings found. That’s a win! 🎉
          </Text>
        ) : (
          sortedCravings.map((craving) => (
            <Pressable
              key={craving.id}
              onPress={() =>
                navigation.navigate("CravingDetail", { id: craving.id })
              }
              className="rounded-2xl p-4 mb-4 border shadow-md active:opacity-80"
              style={{
                backgroundColor: colors.accentLight || "#F1F5F9",
                borderColor: colors.primary,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
                elevation: 3,
              }}
            >
              <Text
                className="text-lg font-bold capitalize mb-1"
                style={{ color: "#0d6e67" }}
              >
                {cravingIcons[craving.type?.name ?? "other"] || "🌀"}{" "}
                {craving.type?.name ?? "Unknown"}
              </Text>

              <Text
                className="text-sm mb-1"
                style={{ color: colors.textSecondary }}
              >
                Notes: {craving.notes || "None"}
              </Text>

              <Text
                className="text-sm font-semibold mb-1"
                style={{ color: craving.resolved ? "#22c55e" : "#ef4444" }}
              >
                {craving.resolved ? "You stayed strong 💪" : "You gave in 😞"}
              </Text>

              <View className="flex-row mb-2">
                <Text
                  className="text-sm mr-2"
                  style={{ color: colors.textSecondary }}
                >
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
