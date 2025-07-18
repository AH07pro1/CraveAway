import React, { useEffect, useState } from 'react';
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
import { BarChart, LineChart } from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/Ionicons';
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
  const [graphType, setGraphType] = useState<'bar' | 'line'>('bar');
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
  const [tooltipType, setTooltipType] = useState<'resist' | 'gaveIn' | null>(null);

  const viewDaysMap = {
    weekly: 7,
    monthly: 30,
    all: 90, // Limit all to 90 days for readability
  };

  // Get dates for current view, always ending today
  function getDateRange() {
    const days = viewDaysMap[view];
    const result: string[] = [];
    for (let i = days - 1; i >= 0; i--) {
      result.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
    }
    return result;
  }

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
        const res = await fetch(`http://192.168.2.19:3000/api/craving?userId=${user.id}`);
        const data = await res.json();
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

  // Prepare data for chart
  const selectedDates = getDateRange();

  // Format label as "Mon 07/14"
  const formattedLabels = selectedDates.map((date) => {
    const dayName = format(parseISO(date), 'EEE'); // Mon, Tue, ...
    const mmdd = format(parseISO(date), 'MM/dd');
    return `${dayName} ${mmdd}`;
  });

  // Build chart data arrays for resist and gaveIn
  const chartData = selectedDates.map((date) => {
    const d = dailyStats[date] || { resist: 0, gaveIn: 0 };
    return {
      label: date,
      resist: d.resist,
      gaveIn: d.gaveIn,
    };
  });

  // For Bar chart, create grouped bars (resist + gaveIn side by side)
  const chartBarData = chartData.flatMap((item) => [
    {
      label: item.label,
      value: item.resist,
      frontColor: '#16a34a', // green for resist
    },
    {
      label: '', // no label for second bar in group
      value: item.gaveIn,
      frontColor: '#ef4444', // red for gave in
    },
  ]);

  // For Line chart, prepare two data lines
  const chartLineData = [
    {
      data: chartData.map((d) => ({ value: d.resist, label: d.label })),
      color: '#16a34a',
    },
    {
      data: chartData.map((d) => ({ value: d.gaveIn, label: d.label })),
      color: '#ef4444',
    },
  ];

  // Calculate initialSpacing to center today on screen for weekly and monthly (graph width depends on spacing and bars)
  // Assuming approx 40 spacing + 22 bar width * number of groups for bar chart
  // For line chart, spacing is ~40 between points
  const daysCount = selectedDates.length;
  const spacing = graphType === 'bar' ? 16 : 40;
  const barWidth = 22;

  // For bar chart: group of 2 bars per date
  // totalWidth = daysCount * (2 * barWidth + spacing)
  // To center last group (today) in viewport of width ~ screen width (say 320)
  // initialSpacing = totalWidth - viewportWidth / 2 - half group width
  // We can hardcode viewport width or use Dimensions API (simplified here)

  const viewportWidth = 320; // adjust if needed
  const groupWidth = 2 * barWidth + spacing;
  const totalWidth = daysCount * groupWidth + spacing; // spacing at start too
  // center last group (today)
  const initialSpacing = Math.max(totalWidth - viewportWidth / 2 - groupWidth / 2, 0);

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

  // Helper for tooltip content
  const getTooltipValue = (index: number, type: 'resist' | 'gaveIn') => {
    if (graphType === 'bar') {
      // Each date has 2 bars => index/2 is date index, index%2 is resist or gaveIn
      const dateIndex = Math.floor(index / 2);
      if (dateIndex >= chartData.length) return null;
      if (type === 'resist') return chartData[dateIndex].resist;
      if (type === 'gaveIn') return chartData[dateIndex].gaveIn;
    } else {
      // line chart tooltip shows value directly
      if (type === 'resist') return chartLineData[0].data[index]?.value ?? null;
      if (type === 'gaveIn') return chartLineData[1].data[index]?.value ?? null;
    }
    return null;
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      {/* Title with paddingTop and paddingBottom like your SettingsScreen */}
      <View style={{ paddingTop: 48, paddingBottom: 12 }} className="items-center">
        <Text
          className="text-3xl font-extrabold text-center"
          style={{ color: colors.primary }}
        >
          🧠 Craving Stats
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* View toggles */}
        <View className="flex-row justify-center gap-2 mb-4">
          {['weekly', 'monthly', 'all'].map((v) => (
            <Pressable
              key={v}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setView(v as typeof view);
                setTooltipIndex(null);
                setTooltipType(null);
              }}
              className={`px-4 py-1.5 rounded-full ${
                view === v ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <Text
                className={`font-semibold ${
                  view === v ? 'text-white' : 'text-gray-800'
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Graph type toggles */}
        <View className="flex-row justify-center mb-6">
          {['bar', 'line'].map((g) => (
            <Pressable
              key={g}
              onPress={() => {
                setGraphType(g as 'bar' | 'line');
                setTooltipIndex(null);
                setTooltipType(null);
              }}
              className={`px-4 py-1.5 mx-1 rounded-full ${
                graphType === g ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <Text
                className={`${
                  graphType === g ? 'text-white' : 'text-gray-800'
                } font-semibold`}
              >
                {g === 'bar' ? 'Bar' : 'Line'}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Chart container */}
        <View className="bg-white p-5 rounded-xl shadow mb-8">
          <Text className="text-lg font-semibold text-center mb-4 text-gray-800">
            Resist (green) vs Gave In (red)
          </Text>

          {graphType === 'bar' ? (
            <BarChart
              data={chartBarData}
              barWidth={barWidth}
              spacing={spacing}
              noOfSections={4}
              maxValue={Math.max(...chartBarData.map((d) => d.value), 1)}
              yAxisTextStyle={{ color: '#666', fontSize: 12 }}
              xAxisLabelTextStyle={{ color: '#444', fontSize: 11 }}
              xAxisLabelTextRotate={-45}
              isAnimated
              initialSpacing={initialSpacing}
              showVerticalLines={false}
              hideDataPoints
              onPress={(index) => {
                setTooltipIndex(index);
                setTooltipType(index % 2 === 0 ? 'resist' : 'gaveIn');
              }}
              renderTooltip={(index) => {
                if (tooltipIndex !== index) return null;
                const val = getTooltipValue(index, tooltipType!);
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
              }}
              xAxisLabelTextFormatter={(label, index) => {
                // Show day of week + mm/dd
                return formattedLabels[Math.floor(index / 2)] || '';
              }}
            />
          ) : (
            <>
              <LineChart
                data={chartLineData[0].data}
                color={chartLineData[0].color}
                curved
                thickness={4}
                yAxisTextStyle={{ color: '#666', fontSize: 12 }}
                xAxisLabelTextStyle={{ color: '#444', fontSize: 11 }}
                spacing={spacing}
                hideDataPoints={false}
                showVerticalLines={false}
                initialSpacing={initialSpacing}
                onPress={(index) => {
                  setTooltipIndex(index);
                  setTooltipType('resist');
                }}
                renderTooltip={(index) => {
                  if (tooltipIndex !== index || tooltipType !== 'resist') return null;
                  const val = getTooltipValue(index, 'resist');
                  return (
                    <View
                      style={{
                        padding: 6,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        borderRadius: 6,
                        position: 'absolute',
                        top: -40,
                        left: -20,
                      }}
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        Resist: {val}
                      </Text>
                    </View>
                  );
                }}
              />
              <LineChart
                data={chartLineData[1].data}
                color={chartLineData[1].color}
                curved
                thickness={4}
                yAxisTextStyle={{ color: 'transparent' }}
                xAxisLabelTextStyle={{ color: 'transparent' }}
                spacing={spacing}
                hideDataPoints={false}
                showVerticalLines={false}
                initialSpacing={initialSpacing}
                onPress={(index) => {
                  setTooltipIndex(index);
                  setTooltipType('gaveIn');
                }}
                renderTooltip={(index) => {
                  if (tooltipIndex !== index || tooltipType !== 'gaveIn') return null;
                  const val = getTooltipValue(index, 'gaveIn');
                  return (
                    <View
                      style={{
                        padding: 6,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        borderRadius: 6,
                        position: 'absolute',
                        top: -40,
                        left: -20,
                      }}
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        Gave In: {val}
                      </Text>
                    </View>
                  );
                }}
                containerStyle={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              />
            </>
          )}
        </View>

        {/* Summary */}
        <View className="bg-white rounded-2xl p-5 shadow mb-8">
          <Text className="text-base text-gray-800 mb-2">
            <Text className="font-semibold">Total Cravings:</Text> {cravings.length}
          </Text>
          <Text className="text-base text-gray-800 mb-2">
            <Text className="font-semibold">Resolved:</Text>{' '}
            {cravings.filter((c) => c.resolved).length}
          </Text>
          <Text className="text-base text-gray-800">
            <Text className="font-semibold">Average Intensity:</Text> {averageIntensity}
          </Text>
        </View>

        {/* Streak card */}
        <Pressable
          onPress={() => navigation.navigate('StreakDetails', { cravings })}
          className="bg-orange-100 rounded-xl p-5 flex-row justify-between items-center shadow"
          style={{ elevation: 2 }}
        >
          <View>
            <Text className="text-orange-800 font-bold text-xl mb-1">
              🔥 {streak}-Day Current Streak
            </Text>
            <Text className="text-orange-700 text-sm mb-1">
              Longest Streak: {longestStreak} days
            </Text>
            <Text className="text-orange-700 text-sm">
              Tap to see detailed streak info
            </Text>
          </View>
          <Icon name="chevron-forward" size={26} color="#fb923c" />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
