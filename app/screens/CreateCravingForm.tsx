import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import colors from "../utils/colors"; // adjust the path as needed

const cravingTypes = [
  "food",
  "smoke",
  "drink",
  "cigarette",
  "vape",
  "weed",
  "cocaine",
  "heroin",
  "other",
];

export default function CreateCravingForm({ navigation }: any) {
  const [intensity, setIntensity] = useState("5");
  const [notes, setNotes] = useState("");
  const [resolved, setResolved] = useState(false);
  const [type, setType] = useState(cravingTypes[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAllDefault =
    intensity === "5" &&
    notes.trim() === "" &&
    resolved === false &&
    type === cravingTypes[0];

  const submitData = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://192.168.2.19:3000/api/craving", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intensity: Number(intensity),
          notes,
          resolved,
          type,
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
      setResolved(false);
      setType(cravingTypes[0]);

      navigation.navigate("CravingList");
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
        "You are submitting the default values. Do you want to continue?",
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <Text
          className="text-3xl font-bold mt-4 mb-6 text-center"
          style={{ color: colors.primary }}
        >
          Create Craving Event
        </Text>

        {/* Intensity */}
        <Text
          className="text-lg font-semibold mb-1"
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

        {/* Notes */}
        <Text
          className="text-lg font-semibold mt-6 mb-1"
          style={{ color: colors.textMain }}
        >
          Notes (trigger)
        </Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="What triggered it?"
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={4}
          className="border rounded-md px-4 py-2 mb-4"
          style={{
            borderColor: colors.border,
            backgroundColor: colors.background,
            color: colors.textMain,
            textAlignVertical: "top",
          }}
        />

        {/* Resolved */}
        <View className="flex-row items-center mb-4 mt-2">
          <Text
            className="text-lg font-semibold mr-4"
            style={{ color: colors.textMain }}
          >
            Resolved?
          </Text>
          <Pressable
            onPress={() => setResolved((prev) => !prev)}
            className={`w-12 h-6 rounded-full ${
              resolved ? "bg-[#3A86FF]" : "bg-gray-300"
            }`}
          >
            <View
              className={`w-5 h-5 bg-white rounded-full shadow-md transform ${
                resolved ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </Pressable>
        </View>

        {/* Type Dropdown */}
        <Text
          className="text-lg font-semibold mb-1"
          style={{ color: colors.textMain }}
        >
          Type
        </Text>
        <View
          className="border rounded-md mb-6"
          style={{ overflow: "hidden", borderColor: colors.border, backgroundColor: colors.background }}
        >
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            dropdownIconColor={colors.primary}
            style={{ color: colors.primary }}
          >
            {cravingTypes.map((item) => (
              <Picker.Item
                label={item.charAt(0).toUpperCase() + item.slice(1)}
                value={item}
                key={item}
              />
            ))}
          </Picker>
        </View>

        {/* Submit button */}
        <Pressable
          onPress={handleSubmit}
          disabled={isSubmitting}
          className={`rounded-md py-3 ${
            isSubmitting ? "opacity-50" : ""
          }`}
          style={{ backgroundColor: colors.primary }}
        >
          <Text className="text-white text-center font-bold text-lg">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
