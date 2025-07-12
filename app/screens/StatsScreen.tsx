import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { format, parseISO, subDays } from 'date-fns';
import { BarChart } from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../utils/colors';

export default function StatsScreen({ navigation }: any) {
  const [cravings, setCravings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dailyCounts, setDailyCounts] = useState<{ [date: string]: number }>({});
  const [averageIntensity, setAverageIntensity] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [resistCount, setResistCount] = useState(0);
  const [gaveInCount, setGaveInCount] = useState(0);

  function getLast7Dates() {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      dates.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
    }
    return dates;
  }

  // New streak calculation function as you requested
  function calculateStreak(data: any[]) {
    const gaveInByDate: { [date: string]: boolean } = {};

    data.forEach(c => {
      const date = format(parseISO(c.createdAt), 'yyyy-MM-dd');
      if (!c.resolved) {
        gaveInByDate[date] = true;
      }
    });

    let streakCount = 0;
    let dayCursor = new Date();

    while (true) {
      const dayStr = format(dayCursor, 'yyyy-MM-dd');

      if (gaveInByDate[dayStr]) break;

      streakCount++;
      dayCursor.setDate(dayCursor.getDate() - 1);

      if (streakCount > 365) break; // safety limit
    }

    return streakCount;
  }

  useEffect(() => {
    const fetchCravings = async () => {
      try {
        const res = await fetch('http://192.168.2.19:3000/api/craving');
        const data = await res.json();
        console.log('Fetched cravings:', data);
        setCravings(data);

        const counts: { [date: string]: number } = {};
        let totalIntensity = 0;
        let resolved = 0;
        let resist = 0;
        let gaveIn = 0;

        data.forEach((c: any) => {
          const date = format(parseISO(c.createdAt), 'yyyy-MM-dd');
          counts[date] = (counts[date] || 0) + 1;
          totalIntensity += c.intensity;
          if (c.resolved) {
            resolved++;
            resist++;
          } else {
            gaveIn++;
          }
        });

        setDailyCounts(counts);
        setAverageIntensity(Number((totalIntensity / data.length).toFixed(1)));
        setResolvedCount(resolved);
        setResistCount(resist);
        setGaveInCount(gaveIn);

        const currentStreak = calculateStreak(data);
        setStreak(currentStreak);
      } catch (error) {
        console.error('Failed to fetch cravings', error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchCravings);
    return unsubscribe;
  }, [navigation]);

  const last7Dates = getLast7Dates();
  const barData = last7Dates.map(date => ({
    value: dailyCounts[date] || 0,
    label: date.slice(5),
    frontColor: colors.primary,
  }));

  const hasAnyData = barData.some(d => d.value > 0);

  if (loading) {
    return (
      <SafeAreaView
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: colors.background }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (cravings.length === 0) {
    return (
      <SafeAreaView
        className="flex-1 justify-center items-center px-4"
        style={{ backgroundColor: colors.background }}
      >
        <Text className="text-lg" style={{ color: colors.textSecondary }}>
          No craving data available.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 48,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: colors.primary }}
        >
          📊 Your Craving Stats
        </Text>

        {/* Cravings per Day */}
        <Pressable
          onPress={() => navigation.navigate('MonthlyStats', { cravings })}
          className="bg-white rounded-2xl p-4 mb-6 shadow-md border border-transparent"
          style={({ pressed }) => ({
            opacity: pressed ? 0.85 : 1,
            transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
            overflow: 'hidden',
            borderColor: pressed ? colors.primary : 'transparent',
            shadowOpacity: pressed ? 0.3 : 0.1,
          })}
        >
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold" style={{ color: colors.textMain }}>
              Cravings per Day
            </Text>
            <Icon name="chevron-forward" size={20} color={colors.primary} />
          </View>

          {hasAnyData ? (
            <View className="overflow-hidden rounded-2xl">
              <BarChart
                data={barData}
                barWidth={28}
                noOfSections={4}
                spacing={20}
                maxValue={Math.max(...barData.map(d => d.value), 1)}
                yAxisColor={colors.textMain}
                xAxisColor={colors.textMain}
                yAxisTextStyle={{ color: colors.textMain }}
                xAxisLabelTextStyle={{ color: colors.textMain }}
                hideRules={false}
                isAnimated
              />
            </View>
          ) : (
            <Text style={{ color: colors.textSecondary }}>No data for this week.</Text>
          )}
        </Pressable>

        {/* Summary (static card) */}
        <View className="bg-white rounded-2xl p-4 mb-6 shadow-md">
          <Text className="text-lg font-semibold mb-3" style={{ color: colors.textMain }}>
            Summary
          </Text>
          <Text className="text-base mb-2" style={{ color: colors.textMain }}>
            <Text className="font-semibold">Total cravings: </Text>
            {cravings.length}
          </Text>
          <Text className="text-base mb-2" style={{ color: colors.textMain }}>
            <Text className="font-semibold">Resolved cravings: </Text>
            {resolvedCount}
          </Text>
          <Text className="text-base" style={{ color: colors.textMain }}>
            <Text className="font-semibold">Average intensity: </Text>
            {averageIntensity}
          </Text>
        </View>

        {/* Streak & Ratio */}
        <Pressable
          onPress={() => navigation.navigate('StreakDetails', { cravings })}
          className="bg-white rounded-2xl p-4 shadow-md border border-transparent"
          style={({ pressed }) => ({
            opacity: pressed ? 0.85 : 1,
            transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
            overflow: 'hidden',
            borderColor: pressed ? colors.primary : 'transparent',
            shadowOpacity: pressed ? 0.3 : 0.1,
          })}
        >
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-semibold" style={{ color: colors.textMain }}>
              Streak & Ratio
            </Text>
            <Icon name="chevron-forward" size={20} color={colors.primary} />
          </View>
          <Text className="text-base mb-2" style={{ color: colors.textMain }}>
            <Text className="font-semibold">Current streak (days without giving in): </Text>
            {streak}
          </Text>
          <Text className="text-base" style={{ color: colors.textMain }}>
            <Text className="font-semibold">Resist vs Gave In: </Text>
            {resistCount} vs {gaveInCount} (
            {((resistCount / (resistCount + gaveInCount)) * 100).toFixed(1)}%)
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
