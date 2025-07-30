import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import colors from "../utils/colors";
import { useUser } from "@clerk/clerk-expo";

type CravingType = { name: string; isCustom: boolean };

export default function SettingsScreen() {
  const { user } = useUser();

  const [cravingTypes, setCravingTypes] = useState<CravingType[]>([]);
  const [newType, setNewType] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showList, setShowList] = useState(true);

  const addNewType = async () => {
    const trimmed = newType.trim();
    if (!trimmed) {
      Alert.alert("Validation", "Type name cannot be empty.");
      return;
    }
    if (cravingTypes.some((t) => t.name === trimmed)) {
      Alert.alert("Validation", "This type already exists.");
      return;
    }

    setAdding(true);
    try {
      const res = await fetch(`${API_URL}/api/craving-types`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed, userId: user!.id }),
      });

      if (!res.ok) {
        const err = await res.json();
        Alert.alert("Error", err.error || "Failed to add type.");
        return;
      }

      const created = await res.json();
      setCravingTypes((prev) => [...prev, created]);
      setNewType("");
      Alert.alert("Success", "New craving type added!");
    } catch {
      Alert.alert("Error", "Network error.");
    } finally {
      setAdding(false);
    }
  };

  const sortedTypes = [...cravingTypes].sort((a, b) => {
    if (a.isCustom === b.isCustom) return 0;
    return a.isCustom ? -1 : 1;
  });

  useEffect(() => {
    if (!user?.id) return;

    const fetchCravingTypes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/craving-types?userId=${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch craving types");
        const data = await res.json();
        setCravingTypes(data);
      } catch (e) {
        Alert.alert("Error", "Could not load craving types.");
        console.warn("Fetch craving types error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchCravingTypes();
  }, [user?.id]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title */}
          <View className="pt-12 pb-6 items-center">
            <Text
              className="text-3xl font-extrabold text-center"
              style={{ color: colors.primary }}
            >
              Settings
            </Text>
          </View>

          {/* Add New Craving Type */}
          <View
            className="mb-6 rounded-2xl p-5 shadow-md"
            style={{
              backgroundColor: colors.accentLight,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
              elevation: 5,
            }}
          >
            <Text className="mb-3 font-semibold" style={{ color: colors.textMain }}>
              Add New Custom Type
            </Text>
            <TextInput
              value={newType}
              onChangeText={setNewType}
              placeholder="Type name (e.g. 'chocolate')"
              placeholderTextColor={colors.textSecondary}
              className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
              style={{ color: colors.textMain, backgroundColor: colors.background }}
            />
            <Pressable
              onPress={addNewType}
              disabled={adding}
              className={`rounded-lg py-3 items-center ${
                adding ? "bg-primary/60" : "bg-primary"
              }`}
              style={{ backgroundColor: adding ? `${colors.primary}99` : colors.primary }}
            >
              {adding ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold text-base">Add Type</Text>
              )}
            </Pressable>
          </View>

          {/* Craving Type List Header */}
          <Pressable
            onPress={() => setShowList((v) => !v)}
            className="mb-3 flex-row justify-between items-center"
          >
            <Text className="text-lg font-semibold" style={{ color: colors.textMain }}>
              Current Craving Types ({cravingTypes.length})
            </Text>
            <Text
              className="text-primary font-extrabold text-2xl"
              style={{ color: colors.primary }}
            >
              {showList ? "−" : "+"}
            </Text>
          </Pressable>

          {/* Craving Type List */}
          {showList ? (
            loading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : sortedTypes.length === 0 ? (
              <Text className="text-center" style={{ color: colors.textSecondary }}>
                No craving types found.
              </Text>
            ) : (
              sortedTypes.map((type) => (
                <View
                  key={type.name}
                  className="rounded-xl p-4 mb-3 shadow-sm flex-row items-center justify-between"
                  style={{
                    backgroundColor: colors.background,
                    shadowColor: "#000",
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                >
                  <Text
                    className="capitalize text-base"
                    style={{ color: colors.textMain }}
                  >
                    {type.name}
                  </Text>

                  {type.isCustom && (
                    <Text
                      className="ml-2 px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-800"
                      style={{ overflow: "hidden" }}
                    >
                      Custom
                    </Text>
                  )}
                </View>
              ))
            )
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
