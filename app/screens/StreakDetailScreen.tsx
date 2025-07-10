import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../utils/colors';

export default function StreakDetailsScreen({ route, navigation }: any) {
  const [streaksByType, setStreaksByType] = useState<{ [type: string]: number }>({});
  const [refreshing, setRefreshing] = useState(false);
  const { cravings } = route.params;

  const calculateStreaks = () => {
    const today = new Date();
    const grouped: { [type: string]: { date: string; resolved: boolean }[] } = {};

    cravings.forEach((craving: any) => {
      const type = craving.type || 'Unknown';
      const date = new Date(craving.createdAt).toISOString().split('T')[0];

      if (!grouped[type]) grouped[type] = [];
      grouped[type].push({ date, resolved: craving.resolved });
    });

    const result: { [type: string]: number } = {};

    Object.entries(grouped).forEach(([type, entries]) => {
      const sorted = entries
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      let streak = 0;
      let dayCursor = new Date(today);
      let breakStreak = false;

      while (!breakStreak) {
        const dateStr = dayCursor.toISOString().split('T')[0];
        const entry = sorted.find(e => e.date === dateStr);

        if (!entry) break;
        if (!entry.resolved) break;

        streak++;
        dayCursor.setDate(dayCursor.getDate() - 1);
      }

      result[type] = streak;
    });

    setStreaksByType(result);
  };

  useFocusEffect(
    useCallback(() => {
      calculateStreaks();
    }, [cravings])
  );

  const onRefresh = () => {
    setRefreshing(true);
    calculateStreaks();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 48,
          paddingHorizontal: 24,
          paddingBottom: 40,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: colors.primary }}
        >
          🔥 Streak by Craving Type
        </Text>

        {Object.entries(streaksByType).map(([type, streak]) => (
          <View
            key={type}
            style={{
              backgroundColor: '#fff',
              padding: 16,
              borderRadius: 12,
              marginBottom: 12,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textMain }}>
              {type}
            </Text>
            <Text style={{ fontSize: 16, color: colors.textSecondary }}>
              {streak} day streak
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
