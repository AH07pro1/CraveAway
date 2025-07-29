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
import { useVoice } from "../context/VoiceContext"; // Your voice context
import * as Speech from "expo-speech";
import type { Voice } from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CravingType = { name: string; isCustom: boolean };

// Neutral voice mapping for 5 languages (you can add more if needed)
const voicesByLanguage = {
  "en-US": "en-us-x-tpf-local",
  "en-GB": "en-gb-x-gba-network",
  "en-IN": "en-in-x-enc-network",
  "en-AU": "en-au-x-aub-network",
  "en-NG": "en-ng-x-tfn-network",
};

export default function SettingsScreen() {
  const { user } = useUser();
  const { selectedVoice, setSelectedVoice } = useVoice();

  const [cravingTypes, setCravingTypes] = useState<CravingType[]>([]);
  const [newType, setNewType] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showList, setShowList] = useState(true);

  // Voices & loading state
  const [availableVoices, setAvailableVoices] = useState<Voice[]>([]);
  const [voicesLoading, setVoicesLoading] = useState(true);

  // Local selected voice ID to track UI
  const [localVoiceId, setLocalVoiceId] = useState<string>(
    selectedVoice?.identifier || ""
  );

  // State for selected language
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof voicesByLanguage>(
    "en-US"
  );

  // New state to track if speech is playing
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Load voices on mount
  useEffect(() => {
    async function loadVoices() {
      setVoicesLoading(true);
      try {
        const cachedVoicesJson = await AsyncStorage.getItem("cachedVoices");
        if (cachedVoicesJson) {
          const cachedVoices = JSON.parse(cachedVoicesJson);
          setAvailableVoices(cachedVoices);
          if (!selectedVoice && cachedVoices.length > 0) {
            setLocalVoiceId(cachedVoices[0].identifier);
            setSelectedVoice(cachedVoices[0]);
          }
        }

        const voices = await Speech.getAvailableVoicesAsync();

        // Filter voices to only allowed neutral voices for the languages
        const allowedVoiceIds = Object.values(voicesByLanguage);
        const filtered = voices.filter((v) => allowedVoiceIds.includes(v.identifier));

        setAvailableVoices(filtered);
        await AsyncStorage.setItem("cachedVoices", JSON.stringify(filtered));

        if (!selectedVoice && filtered.length > 0) {
          // Set default to en-US voice
          const defaultVoiceId = voicesByLanguage["en-US"];
          const defaultVoice = filtered.find((v) => v.identifier === defaultVoiceId);
          if (defaultVoice) {
            setLocalVoiceId(defaultVoice.identifier);
            setSelectedVoice(defaultVoice);
          }
        }
      } catch (e) {
        console.warn("Failed to load voices", e);
      } finally {
        setVoicesLoading(false);
      }
    }
    loadVoices();
  }, []);

  // When selected language changes, update the selected voice
  useEffect(() => {
    const voiceId = voicesByLanguage[selectedLanguage];
    const voiceObj = availableVoices.find((v) => v.identifier === voiceId);
    if (voiceObj) {
      setSelectedVoice(voiceObj);
      setLocalVoiceId(voiceObj.identifier);
    }
  }, [selectedLanguage, availableVoices]);

  // Add new craving type
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
      const res = await fetch("${API_URL}/api/craving-types", {
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

  // Sort custom types on top
  const sortedTypes = [...cravingTypes].sort((a, b) => {
    if (a.isCustom === b.isCustom) return 0;
    return a.isCustom ? -1 : 1;
  });

  // Speak preview text with voice, disabling button while speaking
  const handleSpeak = () => {
    if (!localVoiceId || isSpeaking) return;
    setIsSpeaking(true);
    Speech.stop();
    Speech.speak("This is a preview of the selected voice.", {
      voice: localVoiceId,
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

useEffect(() => {
  if (!user?.id) return;

  const fetchCravingTypes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/craving-types?userId=${user.id}`);
      if (!res.ok) throw new Error("Failed to fetch craving types");
      setCravingTypes(await res.json());
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
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <View style={{ paddingTop: 48, paddingBottom: 12 }} className="items-center">
        <Text
          className="text-3xl font-extrabold text-center"
          style={{ color: colors.primary }}
        >
          Settings
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Voice Selection */}
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
            <Text
              className="mb-3 font-semibold"
              style={{ color: colors.textMain, fontSize: 18 }}
            >
              Select Language
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 12 }}>
              {Object.keys(voicesByLanguage).map((lang) => (
                <Pressable
                  key={lang}
                  onPress={() => setSelectedLanguage(lang as keyof typeof voicesByLanguage)}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    marginRight: 8,
                    marginBottom: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: selectedLanguage === lang ? colors.primary : colors.border,
                    backgroundColor: selectedLanguage === lang ? colors.primary : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color: selectedLanguage === lang ? "#fff" : colors.textMain,
                      fontWeight: "600",
                    }}
                  >
                    {lang}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text
              style={{
                color: colors.textSecondary,
                fontStyle: "italic",
                marginTop: 10,
              }}
            >
              Selected Voice: {localVoiceId}
            </Text>

            {/* Voice Preview Button */}
            <Pressable
              onPress={handleSpeak}
              disabled={voicesLoading || isSpeaking}
              style={{
                marginTop: 10,
                paddingVertical: 10,
                borderRadius: 20,
                backgroundColor: voicesLoading || isSpeaking ? colors.border : colors.primary,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                {voicesLoading || isSpeaking ? "Loading Voices..." : "Preview Voice"}
              </Text>
            </Pressable>
          </View>

          {/* Add New Craving Type */}
          <View
            className="mb-5 rounded-2xl p-5 shadow-md"
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
              className="border rounded-lg px-3 py-2 mb-4"
              style={{
                borderColor: colors.border,
                color: colors.textMain,
                backgroundColor: colors.background,
              }}
            />
            <Pressable
              onPress={addNewType}
              disabled={adding}
              className="rounded-lg py-3 items-center"
              style={{
                backgroundColor: adding ? `${colors.primary}99` : colors.primary,
              }}
            >
              {adding ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold text-base">Add Type</Text>
              )}
            </Pressable>
          </View>

          {/* Craving Type List */}
          <Pressable
            onPress={() => setShowList((v) => !v)}
            className="mb-3 flex-row justify-between items-center"
          >
            <Text className="text-lg font-semibold" style={{ color: colors.textMain }}>
              Current Craving Types ({cravingTypes.length})
            </Text>
            <Text style={{ color: colors.primary, fontWeight: "700", fontSize: 22 }}>
              {showList ? "−" : "+"}
            </Text>
          </Pressable>

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
                    style={{ color: colors.textMain, fontSize: 16 }}
                    className="capitalize"
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
