import React from "react";
import { View, Text, Pressable } from "react-native";
import colors from "../utils/colors";

export default function SessionCompleteScreen({ navigation }: any) {
  return (
    <View
      className="flex-1 justify-center items-center px-6"
      style={{ backgroundColor: colors.background }}
    >
      <Text
        className="text-2xl font-semibold mb-4 text-center"
        style={{ color: colors.primary }}
      >
        Session Complete 🌿
      </Text>
      <Text
        className="text-lg italic mb-10 text-center"
        style={{ color: colors.textMain }}
      >
        Remember to be gentle with yourself.
      </Text>
      <Pressable
        className="px-10 py-3 rounded-full shadow"
        style={{ backgroundColor: colors.primary }}
        onPress={() => navigation.navigate("CreateCravingForm")}
      >
        <Text className="text-white text-lg font-semibold">Continue</Text>
      </Pressable>
    </View>
  );
}
