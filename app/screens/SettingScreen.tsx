import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  FlatList,
} from "react-native";
import colors from "../utils/colors";
import { useUser } from "@clerk/clerk-expo";
import Popup from "./auth/components/Popup";

type CravingType = { name: string; isCustom: boolean };

export default function SettingsScreen() {
  const { user } = useUser();

  const [cravingTypes, setCravingTypes] = useState<CravingType[]>([]);
  const [newType, setNewType] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showList, setShowList] = useState(true);

  // Popup state
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const showPopup = (title: string, message: string) => {
    setPopupTitle(title);
    setPopupMessage(message);
    setPopupVisible(true);
  };

  const addNewType = async () => {
    const trimmed = newType.trim();
    if (!trimmed) {
      showPopup("Validation", "Type name cannot be empty.");
      return;
    }
    if (cravingTypes.some((t) => t.name === trimmed)) {
      showPopup("Validation", "This type already exists.");
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
        showPopup("Error", err.error || "Failed to add type.");
        return;
      }

      const created = await res.json();
      setCravingTypes((prev) => [...prev, created]);
      setNewType("");
      showPopup("Success", "New craving type added!");
    } catch {
      showPopup("Error", "Network error.");
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
        showPopup("Error", "Could not load craving types.");
        console.warn("Fetch craving types error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchCravingTypes();
  }, [user?.id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          {/* Title + Add New Type + List Header */}
          <View>
            {/* Title */}
            <View style={{ paddingTop: 48, paddingBottom: 24, alignItems: "center" }}>
              <Text style={{ fontSize: 32, fontWeight: "800", color: colors.primary }}>
                Settings
              </Text>
            </View>

            {/* Add New Craving Type */}
            <View
              style={{
                marginBottom: 24,
                borderRadius: 24,
                padding: 20,
                backgroundColor: colors.accentLight,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
                elevation: 5,
              }}
            >
              <Text style={{ marginBottom: 12, fontWeight: "600", color: colors.textMain }}>
                Add New Custom Type
              </Text>
              <TextInput
                value={newType}
                onChangeText={setNewType}
                placeholder="Type name (e.g. 'chocolate')"
                placeholderTextColor={colors.textSecondary}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 16,
                  color: colors.textMain,
                  backgroundColor: colors.background,
                }}
              />
              <Pressable
                onPress={addNewType}
                disabled={adding}
                style={{
                  borderRadius: 12,
                  paddingVertical: 14,
                  alignItems: "center",
                  backgroundColor: adding ? `${colors.primary}99` : colors.primary,
                }}
              >
                {adding ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>Add Type</Text>
                )}
              </Pressable>
            </View>

            {/* List Header */}
            <Pressable
              onPress={() => setShowList((v) => !v)}
              style={{ marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600", color: colors.textMain }}>
                Current Craving Types ({cravingTypes.length})
              </Text>
              <Text style={{ fontSize: 24, fontWeight: "800", color: colors.primary }}>
                {showList ? "−" : "+"}
              </Text>
            </Pressable>
          </View>

          {/* Scrollable Craving Types List */}
          {showList && (
            loading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : sortedTypes.length === 0 ? (
              <Text style={{ textAlign: "center", color: colors.textSecondary }}>
                No craving types found.
              </Text>
            ) : (
              <FlatList
                data={sortedTypes}
                keyExtractor={(item) => item.name}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 40 }}
                renderItem={({ item }) => (
                  <View
                    style={{
                      borderRadius: 16,
                      padding: 16,
                      marginBottom: 12,
                      backgroundColor: colors.background,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      shadowColor: "#000",
                      shadowOpacity: 0.05,
                      shadowRadius: 4,
                      elevation: 2,
                    }}
                  >
                    <Text style={{ color: colors.textMain, fontSize: 16, textTransform: "capitalize" }}>
                      {item.name}
                    </Text>
                    {item.isCustom && (
                      <Text
                        style={{
                          marginLeft: 8,
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          fontSize: 12,
                          fontWeight: "600",
                          borderRadius: 8,
                          backgroundColor: "#FEF3C7",
                          color: "#B45309",
                        }}
                      >
                        Custom
                      </Text>
                    )}
                  </View>
                )}
              />
            )
          )}

          {/* Popup */}
          <Popup
            visible={popupVisible}
            title={popupTitle}
            message={popupMessage}
            onConfirm={() => setPopupVisible(false)}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
