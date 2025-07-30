import React, { useEffect, useState } from 'react';
import { API_URL } from "../config";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  LayoutAnimation,
} from 'react-native';
import { format, parseISO, subDays } from 'date-fns';
import { BarChart } from 'react-native-gifted-charts';
import colors from '../utils/colors';
import { useUser } from '@clerk/clerk-expo';

export default function StatsScreen({ navigation }: any) {
  const { user } = useUser();

  const [cravings, setCravings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dailyStats, setDailyStats] = useState<any>({});
  const [averageIntensity, setAverageIntensity] = useState(0);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [view, setView] = useState<'weekly' | 'monthly' | 'all'>('weekly');
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
  const [tooltipType, setTooltipType] = useState<'resist' | 'gaveIn' | 'total' | null>(null);

  // New states for cravings summary
  const [totalCravings, setTotalCravings] = useState(0);
  const [resistCount, setResistCount] = useState(0);
  const [gaveInCount, setGaveInCount] = useState(0);
  const [resistRatio, setResistRatio] = useState('0.0');

  // Calculate current streak
  function calculateStreak(data: any[]) {
    const gaveInDates: { [date: string]: boolean } = {};
    data.forEach((c) => {
      const date = format(parseISO(c.createdAt), 'yyyy-MM-dd');
      if (!c.resolved) gaveInDates[date] = true;
    });

    let streakCount = 0;
    let cursor = new Date();

    while (true) {
      const dayStr = format(cursor, 'yyyy-MM-dd');
      if (gaveInDates[dayStr]) break;
      streakCount++;
      cursor.setDate(cursor.getDate() - 1);
      if (streakCount > 365) break;
    }

    return streakCount;
  }

  // Calculate longest streak
  function calculateLongestStreak(data: any[]) {
    const gaveInDates: { [date: string]: boolean } = {};
    data.forEach((c) => {
      const date = format(parseISO(c.createdAt), 'yyyy-MM-dd');
      if (!c.resolved) gaveInDates[date] = true;
    });

    let longest = 0;
    let current = 0;
    const dates = Array.from(
      new Set(data.map((c) => format(parseISO(c.createdAt), 'yyyy-MM-dd')))
    ).sort();

    for (let i = 0; i < dates.length; i++) {
      if (!gaveInDates[dates[i]]) {
        current++;
      } else {
        if (current > longest) longest = current;
        current = 0;
      }
    }
    if (current > longest) longest = current;
    return longest;
  }

  useEffect(() => {
    const fetchCravings = async () => {
      if (!user?.id) return;
      setLoading(true);

      try {
        const res = await fetch(`${API_URL}/api/craving?userId=${user.id}`);
const data = await res.json();
console.log("✅ Response:", data);
setCravings(data);


        const stats: any = {};
        let totalIntensity = 0;

        data.forEach((c: any) => {
          const date = format(parseISO(c.createdAt), 'yyyy-MM-dd');
          if (!stats[date]) stats[date] = { total: 0, resist: 0, gaveIn: 0 };
          stats[date].total += 1;
          stats[date][c.resolved ? 'resist' : 'gaveIn'] += 1;
          totalIntensity += c.intensity;
        });

        setDailyStats(stats);
        setAverageIntensity(Number((totalIntensity / data.length).toFixed(1)));

        const total = data.length;
        const resist = data.filter((c) => c.resolved).length;
        const gaveIn = total - resist;
        const ratio = total > 0 ? ((resist / total) * 100).toFixed(1) : '0.0';

        setTotalCravings(total);
        setResistCount(resist);
        setGaveInCount(gaveIn);
        setResistRatio(ratio);

        setStreak(calculateStreak(data));
        setLongestStreak(calculateLongestStreak(data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchCravings);
    return unsubscribe;
  }, [navigation, user?.id]);

  // === Aggregation helpers ===

  function getWeeklyLabels() {
    const days = 7;
    const result: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
      result.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
    }
    return result;
  }

  function getWeeklyChartData(dailyStats: any, selectedDates: string[]) {
    return selectedDates.map((date) => {
      const d = dailyStats[date] || { resist: 0, gaveIn: 0, total: 0 };
      return { label: date, resist: d.resist, gaveIn: d.gaveIn, total: d.total };
    });
  }

  function aggregateWeeklyCounts(cravings: any[], year: number, month: number) {
    const weeksCount: number[] = [0, 0, 0, 0, 0, 0];
    cravings.forEach((c) => {
      const date = parseISO(c.createdAt);
      if (date.getFullYear() === year && date.getMonth() === month) {
        const day = date.getDate();
        const week = Math.ceil(day / 7);
        weeksCount[week - 1]++;
      }
    });
    while (weeksCount.length && weeksCount[weeksCount.length - 1] === 0) {
      weeksCount.pop();
    }
    return weeksCount;
  }

  function aggregateMonthlyCounts(cravings: any[], year: number) {
    const monthsCount = new Array(12).fill(0);
    cravings.forEach((c) => {
      const date = parseISO(c.createdAt);
      if (date.getFullYear() === year) {
        monthsCount[date.getMonth()]++;
      }
    });
    return monthsCount;
  }

  function getMonthlyLabelsAndData(cravings: any[]) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const weeklyCounts = aggregateWeeklyCounts(cravings, year, month);
    const labels = weeklyCounts.map((_, i) => `Week ${i + 1}`);

    const data = weeklyCounts.map((count) => ({
      label: '',
      resist: 0,
      gaveIn: 0,
      total: count,
    }));

    return { labels, data };
  }

  function getYearlyLabelsAndData(cravings: any[]) {
    const year = new Date().getFullYear();
    const monthlyCounts = aggregateMonthlyCounts(cravings, year);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const labels = monthNames;

    const data = monthlyCounts.map((count) => ({
      label: '',
      resist: 0,
      gaveIn: 0,
      total: count,
    }));

    return { labels, data };
  }

  let formattedLabels: string[] = [];
  let chartData: any[] = [];

  if (view === 'weekly') {
  const selectedDates = getWeeklyLabels(); // returns dates like '2025-07-19'
  chartData = getWeeklyChartData(dailyStats, selectedDates);
  formattedLabels = selectedDates.map((date) => {
    // convert to day abbreviation e.g. 'Mon'
    return format(parseISO(date), 'EEE');
  });
}
else if (view === 'monthly') {
    const { labels, data } = getMonthlyLabelsAndData(cravings);
    formattedLabels = labels;
    chartData = data;
  } else {
    const { labels, data } = getYearlyLabelsAndData(cravings);
    formattedLabels = labels;
    chartData = data;
  }

  const baseBarWidth = 18;
  const baseSpacing = 12;
  const daysCount = chartData.length;
  const groupWidth = 2 * baseBarWidth + baseSpacing;
  const viewportWidth = 320;

  let totalWidth;
  if (view === 'weekly') {
    totalWidth = daysCount * groupWidth + baseSpacing;
  } else {
    totalWidth = Math.max(daysCount * (baseBarWidth + baseSpacing) + baseSpacing, 320);
  }

  const initialSpacing = Math.max(
    totalWidth - viewportWidth / 2 - (view === 'weekly' ? groupWidth / 2 : baseBarWidth / 2),
    0
  );

  let chartBarData;

 if (view === 'weekly') {
  chartBarData = chartData.flatMap((item, i) => [
    {
      label: formattedLabels[i],  // e.g. 'Mon', 'Tue', etc. — use formattedLabels here
      value: item.resist,
      frontColor: '#16a34a',
    },
    {
      label: '',  // no label on gaveIn bars
      value: item.gaveIn,
      frontColor: '#ef4444',
    },
  ]);
}
 else {
    chartBarData = chartData.map((item, index) => ({
      label: formattedLabels[index],
      value: item.total,
      frontColor: '#3b82f6',
    }));
  }

  const getTooltipValue = (index: number, type: 'resist' | 'gaveIn' | 'total') => {
    if (view === 'weekly') {
      const dateIndex = Math.floor(index / 2);
      if (dateIndex >= chartData.length) return null;
      if (type === 'resist') return chartData[dateIndex].resist;
      if (type === 'gaveIn') return chartData[dateIndex].gaveIn;
    } else {
      if (type === 'total') return chartData[index]?.total ?? null;
    }
    return null;
  };

  if (loading) {
    return (
      <SafeAreaView
        className="flex-1 justify-center items-center bg-white"
        style={{ backgroundColor: colors.background }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Title */}
      <View style={{ paddingTop: 48, paddingBottom: 12 }} className="items-center">
        <Text className="text-3xl font-extrabold text-center" style={{ color: colors.primary }}>
          🧠 Craving Stats
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* View toggles */}
        <View className="flex-row justify-center gap-4 mb-6">
          {['weekly', 'monthly', 'all'].map((v) => (
            <Pressable
              key={v}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setView(v as typeof view);
                setTooltipIndex(null);
                setTooltipType(null);
              }}
              className={`px-5 py-2 rounded-full ${view === v ? 'bg-blue-600' : 'bg-gray-200'}`}
            >
              <Text className={`font-semibold ${view === v ? 'text-white' : 'text-gray-800'}`}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Cravings summary card */}
        <View className="bg-white p-6 rounded-xl shadow mb-8 flex-row justify-around">
          <View className="items-center">
            <Text className="text-xl font-semibold" style={{ color: colors.primary }}>
              {totalCravings}
            </Text>
            <Text className="text-gray-600">Total Cravings</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-semibold" style={{ color: '#16a34a' }}>
              {resistCount}
            </Text>
            <Text className="text-gray-600">Resisted</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-semibold" style={{ color: '#ef4444' }}>
              {gaveInCount}
            </Text>
            <Text className="text-gray-600">Gave In</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-semibold" style={{ color: colors.primary }}>
              {resistRatio}%
            </Text>
            <Text className="text-gray-600">Resist Ratio</Text>
          </View>
        </View>

        {/* Streak and average intensity display */}
        <View className="bg-white p-6 rounded-xl shadow flex-row justify-around mb-8">
          <View className="items-center">
            <Text className="text-xl font-semibold" style={{ color: colors.primary }}>
              {streak}
            </Text>
            <Text className="text-gray-600">Current Streak</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-semibold" style={{ color: colors.primary }}>
              {longestStreak}
            </Text>
            <Text className="text-gray-600">Longest Streak</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-semibold" style={{ color: colors.primary }}>
              {averageIntensity}
            </Text>
            <Text className="text-gray-600">Avg Intensity</Text>
          </View>
        </View>

        {/* Button to navigate to Streak Details screen */}
        <View className="mb-6 items-center">
        <Pressable
  onPress={() => navigation.navigate('StreakDetails', { cravings })}
  className="bg-blue-600 px-6 py-3 rounded-full shadow"
>
  <Text className="text-white font-semibold text-lg">View Streak Details</Text>
</Pressable>

        </View>

        {/* Chart container */}
        <View
          className="bg-white p-5 rounded-xl shadow"
          style={{ minWidth: viewportWidth }}
        >
          <Text className="text-lg font-semibold text-center mb-4 text-gray-800">
            {view === 'weekly' ? 'Resist (green) vs Gave In (red)' : 'Total Cravings'}
          </Text>

          <BarChart
            data={chartBarData}
            barWidth={baseBarWidth}
            spacing={view === 'monthly' ? baseSpacing * 2 : baseSpacing}

            noOfSections={4}
            maxValue={Math.max(...chartBarData.map((d) => d.value), 1)}
            yAxisTextStyle={{ color: '#666', fontSize: 12 }}
            xAxisLabelTextStyle={{ color: '#444', fontSize: 11 }}
            xAxisLabelTextRotate={view === 'weekly' ? -45 : 0}
            isAnimated
            initialSpacing={initialSpacing}
            showVerticalLines={false}
            hideDataPoints
            onPress={(index) => {
              setTooltipIndex(index);
              if (view === 'weekly') {
                setTooltipType(index % 2 === 0 ? 'resist' : 'gaveIn');
              } else {
                setTooltipType('total');
              }
            }}
            renderTooltip={(index) => {
              if (tooltipIndex !== index) return null;
              if (view === 'weekly') {
                if (!tooltipType) return null;
                const val = getTooltipValue(index, tooltipType);
                return (
                  <View
                    style={{
                      padding: 6,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      borderRadius: 6,
                      position: 'absolute',
                      top: -40,
                      left: -10,
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      {tooltipType === 'resist' ? 'Resist' : 'Gave In'}: {val}
                    </Text>
                  </View>
                );
              } else {
                const val = getTooltipValue(index, 'total');
                return (
                  <View
                    style={{
                      padding: 6,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      borderRadius: 6,
                      position: 'absolute',
                      top: -40,
                      left: -10,
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Total: {val}</Text>
                  </View>
                );
              }
            }}
           xAxisLabelTextFormatter={(label: string, index: number) => {
  if (view === 'weekly') {
    return formattedLabels[index] || '';
  }
  return label;
}}


          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
