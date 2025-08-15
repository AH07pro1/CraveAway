import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import colors from "../utils/colors";
import { useUser } from "@clerk/clerk-expo";
import { API_URL } from "../config";
import Popup from "./auth/components/Popup";

type CravingType = { name: string; isCustom: boolean };

// StepCard component
const StepCard = ({
  step,
  cravingTypes,
  type,
  setType,
  intensity,
  setIntensity,
  notes,
  setNotes,
  resolved,
  setResolved,
  colors,
}: any) => {
  switch (step) {
    case 1:
      return (
        <View
          style={{
            backgroundColor: "#E9EBF8",
            borderRadius: 24,
            padding: 20,
            marginBottom: 24,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 5,
          }}
        >
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              fontStyle: "italic",
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            What kind of craving was it? 🍃
          </Text>
          <Text
            style={{
              color: colors.textMain,
              fontSize: 18,
              fontWeight: "600",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Type
          </Text>
          <View
            style={{
              borderRadius: 16,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.background,
            }}
          >
            {cravingTypes.length === 0 ? (
              <Text style={{ textAlign: "center", color: "#aaa", paddingVertical: 12 }}>
                Loading types...
              </Text>
            ) : (
              <Picker
                selectedValue={type}
                onValueChange={(itemValue) => setType(itemValue)}
                dropdownIconColor={colors.primary}
                style={{ color: colors.primary }}
              >
                {cravingTypes.map((item) => (
                  <Picker.Item
                    key={item.name}
                    label={`${item.name.charAt(0).toUpperCase()}${item.name.slice(1)}${
                      item.isCustom ? " (Custom)" : ""
                    }`}
                    value={item.name}
                  />
                ))}
              </Picker>
            )}
          </View>
        </View>
      );
    case 2:
      return (
        <View
          style={{
            backgroundColor: "#E9EBF8",
            borderRadius: 24,
            padding: 20,
            marginBottom: 24,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 5,
          }}
        >
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              fontStyle: "italic",
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            How strong was the craving? 🔥
          </Text>
          <Text
            style={{
              color: colors.textMain,
              fontSize: 18,
              fontWeight: "600",
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Intensity: {intensity}
          </Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={+intensity}
            onValueChange={(val) => setIntensity(val.toString())}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.border}
            thumbTintColor={colors.primary}
          />
        </View>
      );
    case 3:
      return (
        <View
          style={{
            backgroundColor: "#E9EBF8",
            borderRadius: 24,
            padding: 20,
            marginBottom: 24,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 5,
          }}
        >
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              fontStyle: "italic",
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            What was going on around you? 🧠
          </Text>
          <Text
            style={{
              color: colors.textMain,
              fontSize: 18,
              fontWeight: "600",
              marginBottom: 8,
            }}
          >
            Trigger or Thoughts
          </Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="What triggered it?"
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
            style={{
              borderColor: colors.border,
              backgroundColor: colors.background,
              color: colors.textMain,
              textAlignVertical: "top",
              borderWidth: 1,
              borderRadius: 16,
              padding: 12,
            }}
          />
        </View>
      );
    case 4:
      return (
        <View
          style={{
            backgroundColor: "#E9EBF8",
            borderRadius: 24,
            padding: 20,
            marginBottom: 24,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 5,
          }}
        >
          <View>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 14,
                fontStyle: "italic",
                marginBottom: 4,
              }}
            >
              Did you give in to the craving?
            </Text>
            <Text
              style={{
                color: colors.textMain,
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {resolved ? "No, I stayed strong 💪" : "Yes, I gave in 😞"}
            </Text>
          </View>

          <Pressable
            onPress={() => setResolved((prev) => !prev)}
            style={{
              width: 56,
              height: 32,
              borderRadius: 999,
              justifyContent: "center",
              backgroundColor: resolved ? "#4BB543" : "#FF6B6B",
              padding: 2,
            }}
          >
            <View
              style={{
                width: 28,
                height: 28,
                backgroundColor: "white",
                borderRadius: 999,
                shadowColor: "#000",
                shadowOpacity: 0.2,
                transform: [{ translateX: resolved ? 24 : 4 }],
              }}
            />
          </Pressable>
        </View>
      );
    default:
      return null;
  }
};

// CreateCravingForm
export default function CreateCravingForm({ navigation }: any) {
  const { user } = useUser();

  const [step, setStep] = useState(1);
  const [intensity, setIntensity] = useState("5");
  const [notes, setNotes] = useState("");
  const [resolved, setResolved] = useState(true);
  const [type, setType] = useState("");
  const [cravingTypes, setCravingTypes] = useState<CravingType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [xpGained, setXpGained] = useState<number | null>(null);
  const [showXPReward, setShowXPReward] = useState(false);

  // Popup state
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupConfirm, setPopupConfirm] = useState<() => void>(() => () => {});

  const totalSteps = 4;

  const showPopup = (title: string, message: string, onConfirm?: () => void) => {
    setPopupTitle(title);
    setPopupMessage(message);
    setPopupConfirm(() => onConfirm ?? (() => setPopupVisible(false)));
    setPopupVisible(true);
  };

  const isAllDefault =
    intensity === "5" &&
    notes.trim() === "" &&
    resolved === true &&
    type === (cravingTypes.length > 0 ? cravingTypes[0].name : "");

  useFocusEffect(useCallback(() => setStep(1), []));

  useEffect(() => {
    if (!user?.id) return;

    const fetchCravingTypes = async () => {
      try {
        const res = await fetch(`${API_URL}/api/craving-types?userId=${user.id}`);
        const data: CravingType[] = await res.json();
        setCravingTypes(data);
        if (data.length > 0) setType(data[0].name);
      } catch (err) {
        console.error("Failed to fetch craving types:", err);
        showPopup("Error", "Unable to load craving types.");
      }
    };

    fetchCravingTypes();
  }, [user?.id]);

  const submitData = async () => {
    if (!user?.id) {
      showPopup("Error", "User not logged in.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/craving`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intensity: Number(intensity),
          notes,
          resolved,
          type,
          userId: user.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        showPopup("Error", "Failed to submit craving.");
        return;
      }

      const result = await response.json();
      console.log("Craving created:", result);

      setIntensity("5");
      setNotes("");
      setResolved(true);
      setStep(1);
      if (cravingTypes.length > 0) setType(cravingTypes[0].name);

      if (result?.xpGained) {
        setXpGained(result.xpGained);
        setShowXPReward(true);

        setTimeout(() => {
          setShowXPReward(false);
          navigation.navigate("CravingList");
        }, 2000);
      } else {
        navigation.navigate("CravingList");
      }
    } catch (err) {
      console.error("Network error:", err);
      showPopup("Error", "Network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (isSubmitting) return;

    if (isAllDefault) {
      showPopup(
        "Confirm submission",
        "You are submitting default values. If you're sure, please fill in some details.",
        submitData
      );
    } else {
      submitData();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      {showXPReward && (
        <View
          style={{
            position: "absolute",
            top: 80,
            backgroundColor: "#FFD700",
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 999,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            zIndex: 999,
            alignSelf: "center",
            borderWidth: 1,
            borderColor: "#FFF3B0",
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              color: "white",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            +{xpGained ?? "?"} XP!
          </Text>
        </View>
      )}

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 48, paddingHorizontal: 24 }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ marginBottom: 32, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "800",
                marginBottom: 4,
                textAlign: "center",
                color: colors.primary,
              }}
            >
              Let's log what just happened 💬
            </Text>
            <Text style={{ fontSize: 16, textAlign: "center", color: colors.textSecondary }}>
              No pressure. Just a few quick notes to help you understand your cravings better.
            </Text>
          </View>

          <StepCard
            step={step}
            cravingTypes={cravingTypes}
            type={type}
            setType={setType}
            intensity={intensity}
            setIntensity={setIntensity}
            notes={notes}
            setNotes={setNotes}
            resolved={resolved}
            setResolved={setResolved}
            colors={colors}
          />

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
            {step > 1 ? (
              <Pressable
                onPress={() => setStep(step - 1)}
                style={{
                  borderRadius: 999,
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ color: colors.primary, fontWeight: "600" }}>Back</Text>
              </Pressable>
            ) : (
              <View style={{ width: 100 }} />
            )}

            {step < totalSteps ? (
              <Pressable
                onPress={() => setStep(step + 1)}
                style={{
                  borderRadius: 999,
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  backgroundColor: colors.primary,
                }}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>Next</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={{
                  borderRadius: 999,
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  backgroundColor: colors.primary,
                  opacity: isSubmitting ? 0.5 : 1,
                }}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>
                  {isSubmitting ? "Saving..." : "Done! Save this moment"}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Popup */}
      <Popup
        visible={popupVisible}
        title={popupTitle}
        message={popupMessage}
        onConfirm={() => {
          setPopupVisible(false);
          popupConfirm();
        }}
      />
    </KeyboardAvoidingView>
  );
}
