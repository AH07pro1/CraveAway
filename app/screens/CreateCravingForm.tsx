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
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";

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
  const [intensity, setIntensity] = useState("5");
  const [notes, setNotes] = useState("");
  const [resolved, setResolved] = useState(false);
  const [type, setType] = useState(cravingTypes[0]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#e0f7f6]"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <Text className="text-3xl font-bold text-[#08BAAC] mt-4 mb-6 text-center">
          Create Craving Event
        </Text>

        {/* Intensity */}
        <Text className="text-lg font-semibold text-[#0d6e67] mb-1">
          Intensity: {intensity}
        </Text>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={+intensity}
          onValueChange={(val) => setIntensity(val.toString())}
          minimumTrackTintColor="#08BAAC"
          maximumTrackTintColor="#b3ece8"
          thumbTintColor="#08BAAC"
        />

        {/* Notes */}
        <Text className="text-lg font-semibold text-[#0d6e67] mt-6 mb-1">
          Notes (trigger)
        </Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="What triggered it?"
          placeholderTextColor="#94a3b8"
          multiline
          numberOfLines={4}
          className="border border-[#08BAAC] bg-white rounded-md px-4 py-2 mb-4 text-[#0d6e67]"
          textAlignVertical="top"
        />

        {/* Resolved */}
        <View className="flex-row items-center mb-4 mt-2">
          <Text className="text-lg font-semibold text-[#0d6e67] mr-4">
            Resolved?
          </Text>
          <Pressable
            onPress={() => setResolved((prev) => !prev)}
            className={`w-12 h-6 rounded-full ${
              resolved ? "bg-[#08BAAC]" : "bg-gray-300"
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
        <Text className="text-lg font-semibold text-[#0d6e67] mb-1">Type</Text>
        <View
          className="border border-[#08BAAC] rounded-md bg-white mb-6"
          style={{ overflow: "hidden" }}
        >
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            dropdownIconColor="#08BAAC"
            style={{ color: "#08BAAC" }}
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
          onPress={() => {
            console.log({ intensity, notes, resolved, type });
          }}
          className="bg-[#08BAAC] rounded-md py-3"
        >
          <Text className="text-white text-center font-bold text-lg">
            Submit
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
