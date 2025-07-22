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
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import colors from "../utils/colors";
import { useUser } from "@clerk/clerk-expo";

type CravingType = { name: string; isCustom: boolean };

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
          className="bg-[#E9EBF8] rounded-2xl p-5 mb-6 shadow-md"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 5,
          }}
        >
          <Text
            className="text-base italic mb-1 text-center"
            style={{ color: colors.textSecondary }}
          >
            What kind of craving was it? 🍃
          </Text>
          <Text
            className="text-lg font-semibold mb-2 text-center"
            style={{ color: colors.textMain }}
          >
            Type
          </Text>
          <View
            className="rounded-xl overflow-hidden border"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.background,
            }}
          >
            {cravingTypes.length === 0 ? (
              <Text className="text-center text-gray-400 py-3">
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
                    label={
                      item.name.charAt(0).toUpperCase() +
                      item.name.slice(1) +
                      (item.isCustom ? " (Custom)" : "")
                    }
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
          className="bg-[#E9EBF8] rounded-2xl p-5 mb-6 shadow-md"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 5,
          }}
        >
          <Text
            className="text-base italic mb-1 text-center"
            style={{ color: colors.textSecondary }}
          >
            How strong was the craving? 🔥
          </Text>
          <Text
            className="text-lg font-semibold mb-3 text-center"
            style={{ color: colors.textMain }}
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
          className="bg-[#E9EBF8] rounded-2xl p-5 mb-6 shadow-md"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 5,
          }}
        >
          <Text
            className="text-base italic mb-1 text-center"
            style={{ color: colors.textSecondary }}
          >
            What was going on around you? 🧠
          </Text>
          <Text
            className="text-lg font-semibold mb-2"
            style={{ color: colors.textMain }}
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
            className="rounded-xl px-4 py-3"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.background,
              color: colors.textMain,
              textAlignVertical: "top",
              borderWidth: 1,
            }}
          />
        </View>
      );
    case 4:
      return (
        <View
          className="bg-[#E9EBF8] rounded-2xl p-5 mb-6 shadow-md flex-row items-center justify-between"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 5,
          }}
        >
          <View>
            <Text
              className="text-base italic mb-1"
              style={{ color: colors.textSecondary }}
            >
              Did you give in to the craving?
            </Text>
            <Text
              className="text-lg font-semibold"
              style={{ color: colors.textMain }}
            >
              {resolved ? "No, I stayed strong 💪" : "Yes, I gave in 😞"}
            </Text>
          </View>

          <Pressable
            onPress={() => setResolved((prev) => !prev)}
            className={`w-14 h-8 rounded-full ${
              resolved ? "bg-[#4BB543]" : "bg-[#FF6B6B]"
            }`}
            style={{
              justifyContent: "center",
              padding: 2,
            }}
          >
            <View
              className={`w-7 h-7 bg-white rounded-full shadow-md transform ${
                resolved ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </Pressable>
        </View>
      );
    default:
      return null;
  }
};

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
  const totalSteps = 4;

  const isAllDefault =
    intensity === "5" &&
    notes.trim() === "" &&
    resolved === true &&
    type === (cravingTypes.length > 0 ? cravingTypes[0].name : "");

  useFocusEffect(
    useCallback(() => {
      setStep(1);
    }, [])
  );

  useEffect(() => {
    if (!user?.id) return;

    const fetchCravingTypes = async () => {
      try {
        const res = await fetch(
          `http://192.168.2.19:3000/api/craving-types?userId=${user.id}`
        );
        const data: CravingType[] = await res.json();
        setCravingTypes(data);
        if (data.length > 0) setType(data[0].name);
      } catch (err) {
        console.error("Failed to fetch craving types:", err);
        Alert.alert("Error", "Unable to load craving types.");
      }
    };

    fetchCravingTypes();
  }, [user?.id]);

  const submitData = async () => {
    if (!user?.id) {
      Alert.alert("Error", "User not logged in.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://192.168.2.19:3000/api/craving", {
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
        Alert.alert("Error", "Failed to submit craving.");
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
      Alert.alert("Error", "Network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (isSubmitting) return;

    if (isAllDefault) {
      Alert.alert(
        "Confirm submission",
        "You are submitting default values. If you're sure, please fill in some details.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Submit", onPress: submitData },
        ]
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
          className="absolute top-20 bg-[#FFD700] px-6 py-3 rounded-full shadow-lg"
          style={{
            zIndex: 999,
            elevation: 10,
            borderWidth: 1,
            borderColor: "#FFF3B0",
            alignSelf: "center",
          }}
        >
          <Text className="text-lg font-bold text-center text-white">
            +{xpGained ?? "?"} XP!
          </Text>
        </View>
      )}

      <ScrollView
  keyboardShouldPersistTaps="handled"
  contentContainerStyle={{ flexGrow: 1, paddingVertical: 48 }}
  className="px-6"
>
  <View style={{ flex: 1, justifyContent: "center" }}>
    <View className="mb-8 items-center">
      <Text
        className="text-3xl font-extrabold mb-1 text-center"
        style={{ color: colors.primary }}
      >
        Let's log what just happened 💬
      </Text>
      <Text
        className="text-base text-center"
        style={{ color: colors.textSecondary }}
      >
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

    <View className="flex-row justify-between mt-4">
      {step > 1 ? (
        <Pressable
          onPress={() => setStep(step - 1)}
          className="rounded-3xl py-3 px-8 border border-gray-300"
        >
          <Text style={{ color: colors.primary, fontWeight: "600" }}>
            Back
          </Text>
        </Pressable>
      ) : (
        <View style={{ width: 100 }} />
      )}

      {step < totalSteps ? (
        <Pressable
          onPress={() => setStep(step + 1)}
          className="rounded-3xl py-3 px-8"
          style={{ backgroundColor: colors.primary }}
        >
          <Text className="text-white font-bold">Next</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={handleSubmit}
          disabled={isSubmitting}
          className={`rounded-3xl py-3 px-8 ${
            isSubmitting ? "opacity-50" : ""
          }`}
          style={{ backgroundColor: colors.primary }}
        >
          <Text className="text-white font-bold">
            {isSubmitting ? "Saving..." : "Done! Save this moment"}
          </Text>
        </Pressable>
      )}
    </View>
  </View>
</ScrollView>

    </KeyboardAvoidingView>
  );
}
