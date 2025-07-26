import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Alert,
  SafeAreaView,
  Pressable,
} from "react-native";
import colors from "../utils/colors"; // adjust path as needed
import { API_URL } from "../config";

type CravingType = {
  id: number;
  name: string;
  isCustom: boolean;
};

type CravingEvent = {
  id: number;
  createdAt: string;
  intensity?: number;
  notes?: string;
  resolved: boolean;
  type: CravingType | null;
};

export default function CravingDetailScreen({ route, navigation }: any) {
  const { id } = route.params;
  const [craving, setCraving] = useState<CravingEvent | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCraving = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/craving/${id}`);
      if (!res.ok) {
        const err = await res.json();
        Alert.alert("Error", err.error || "Failed to load craving details");
        navigation.goBack();
        return;
      }
      const data = await res.json();
      setCraving(data);
    } catch (error) {
      Alert.alert("Error", "Network error occurred");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCraving();
  }, []);

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

  if (!craving) {
    return (
      <SafeAreaView
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: colors.background }}
      >
        <Text style={{ color: colors.textSecondary, fontSize: 16 }}>
          No craving details available.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 48,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: colors.primary }}
        >
          🧠 Craving Details
        </Text>

        <Text
          className="text-base mb-8 text-center"
          style={{ color: colors.textSecondary, lineHeight: 22 }}
        >
          Here's how you felt during this craving episode.
        </Text>

        <View
          className="rounded-xl p-6 shadow-sm border"
          style={{
            backgroundColor: colors.background,
            borderColor: "#E0E0E0",
            marginBottom: 24,
          }}
        >
          <Text
            className="text-xl font-semibold capitalize mb-3"
            style={{ color: colors.primary }}
          >
            Type: {craving.type?.name ?? "N/A"}
          </Text>

          <Text className="text-lg mb-2" style={{ color: colors.textMain }}>
            Intensity: {craving.intensity ?? "N/A"}
          </Text>

          <Text className="text-lg mb-2" style={{ color: colors.textMain }}>
            Resolved: {craving.resolved ? "Yes" : "No"}
          </Text>

          <Text className="text-lg mb-4" style={{ color: colors.textMain }}>
            Notes: {craving.notes || "None"}
          </Text>

          <Text
            className="text-sm text-right"
            style={{ color: colors.textSecondary }}
          >
            Created At: {new Date(craving.createdAt).toLocaleString()}
          </Text>
        </View>

        <Pressable
          onPress={() => navigation.goBack()}
          className="py-3 px-10 rounded-full self-center"
          style={{ backgroundColor: colors.primary }}
          android_ripple={{ color: "rgba(255, 255, 255, 0.3)" }}
        >
          <Text className="text-white font-semibold text-lg">Back</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
