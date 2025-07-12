import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import colors from '../utils/colors';

export default function StreakDetailsScreen({ route, navigation }: any) {
  const [streaksByType, setStreaksByType] = useState<{ [type: string]: number }>({});
  const [refreshing, setRefreshing] = useState(false);
  const { cravings } = route.params;

  const calculateStreaks = () => {
    const today = new Date();
    const grouped: { [type: string]: { date: string; resolved: boolean }[] } = {};

    cravings.forEach((craving: any) => {
  const type = craving.type?.name || 'Unknown'; // Access type.name safely
  const date = format(parseISO(craving.createdAt), 'yyyy-MM-dd');

  if (!grouped[type]) grouped[type] = [];
  grouped[type].push({ date, resolved: craving.resolved });
});


    const result: { [type: string]: number } = {};

    Object.entries(grouped).forEach(([type, entries]) => {
  // Map date → true if gave in for this type
  const gaveInByDate: { [date: string]: boolean } = {};
  entries.forEach(e => {
    if (!e.resolved) gaveInByDate[e.date] = true;
  });

  // Find oldest craving date for this type
  const oldestDateStr = entries.reduce((oldest, e) =>
    e.date < oldest ? e.date : oldest,
    entries[0].date
  );

  let streak = 0;
  let dayCursor = new Date();

  while (true) {
    const dayStr = format(dayCursor, 'yyyy-MM-dd');

    // If day before oldest craving date → stop streak
    if (dayStr < oldestDateStr) break;

    if (gaveInByDate[dayStr]) break;

    streak++;
    dayCursor.setDate(dayCursor.getDate() - 1);

    if (streak > 365) break;
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
