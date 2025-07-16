import React, { useState, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import colors from '../utils/colors';
import { useFocusEffect } from '@react-navigation/native';

export default function ProgressScreen() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);

  const nextLevelXP = Math.pow(level, 2) * 10;
  const percent = Math.min((xp / nextLevelXP) * 100, 100);

  const fetchProgress = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const res = await fetch(`http://192.168.2.19:3000/api/session-complete/${user.id}`);
      const data = await res.json();
      setXP(data.xp);
      setLevel(data.level);
    } catch (err) {
      console.error('Error fetching progress', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProgress();
    }, [user?.id])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center px-6" style={{ backgroundColor: colors.background }}>
      <Text className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
        🌟 Your Progress
      </Text>
      <View style={{ width: '80%', height: 20, backgroundColor: '#ccc', borderRadius: 10, marginVertical: 10 }}>
        <View style={{ width: `${percent}%`, backgroundColor: colors.primary, height: '100%', borderRadius: 10 }} />
      </View>
      <Text style={{ color: colors.textMain }}>{xp} / {nextLevelXP} XP</Text>

      <Text style={{ fontSize: 18, color: colors.textMain, marginBottom: 10 }}>
        Level: {level}
      </Text>

      <Text style={{ fontSize: 18, color: colors.textMain }}>
        Total XP: {xp}
      </Text>
    </View>
  );
}
