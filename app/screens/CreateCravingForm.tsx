// screens/CreateCravingForm.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

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

export default function CreateCravingForm() {
  const [intensity, setIntensity] = useState("");
  const [notes, setNotes] = useState("");
  const [resolved, setResolved] = useState(false);
  const [type, setType] = useState(cravingTypes[0]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <Text className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Create Craving Event
        </Text>

        {/* Intensity */}
        <Text className="text-lg font-semibold mb-1">Intensity (1–10)</Text>
        <TextInput
          value={intensity}
          onChangeText={(text) => {
            // Allow only numbers 1-10
            if (/^\d*$/.test(text)) {
              if (+text <= 10) setIntensity(text);
            }
          }}
          keyboardType="numeric"
          placeholder="Enter intensity"
          className="border border-gray-300 rounded-md px-4 py-2 mb-4"
          maxLength={2}
        />

        {/* Notes */}
        <Text className="text-lg font-semibold mb-1">Notes (trigger)</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="What triggered it?"
          multiline
          numberOfLines={4}
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 text-gray-700"
          textAlignVertical="top"
        />

        {/* Resolved */}
        <View className="flex-row items-center mb-4">
          <Text className="text-lg font-semibold mr-4">Resolved?</Text>
          <Pressable
            onPress={() => setResolved((prev) => !prev)}
            className={`w-12 h-6 rounded-full ${
              resolved ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <View
              className={`w-5 h-5 bg-white rounded-full shadow-md transform ${
                resolved ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </Pressable>
        </View>

        {/* Type */}
        <Text className="text-lg font-semibold mb-1">Type</Text>
        <View className="border border-gray-300 rounded-md mb-6">
          {cravingTypes.map((item) => (
            <Pressable
              key={item}
              onPress={() => setType(item)}
              className={`px-4 py-3 ${
                type === item ? "bg-blue-100" : ""
              }`}
            >
              <Text
                className={`text-base ${
                  type === item ? "text-blue-700 font-semibold" : "text-gray-700"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Submit button */}
        <Pressable
          onPress={() => {
            // TODO: submit handler
            console.log({ intensity, notes, resolved, type });
          }}
          className="bg-blue-600 rounded-md py-3"
        >
          <Text className="text-white text-center font-bold text-lg">
            Submit
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
