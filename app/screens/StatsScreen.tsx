import React, { useEffect, useState, useRef } from 'react';
import { API_URL } from "../config";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  LayoutAnimation,
  Dimensions,
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
  const [longestStreakInfo, setLongestStreakInfo] = useState<{ type: string; streak: number }>({ type: '', streak: 0 });
  const [view, setView] = useState<'weekly' | 'monthly' | 'all'>('weekly');
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
  const [tooltipType, setTooltipType] = useState<'resist' | 'gaveIn' | 'total' | null>(null);

  // Cravings summary
  const [totalCravings, setTotalCravings] = useState(0);
  const [resistCount, setResistCount] = useState(0);
  const [gaveInCount, setGaveInCount] = useState(0);
  const [resistRatio, setResistRatio] = useState('0.0');

  // Layout + scrolling
  const scrollRef = useRef<ScrollView>(null);
  const windowWidth = Dimensions.get('window').width;
  const OUTER_PADDING = 20;    // matches contentContainerStyle paddingHorizontal
  const CARD_PADDING = 20;     // p-5 on chart card
  const Y_AXIS_LABEL_WIDTH = 44;
  const CHART_HEIGHT = 220;
  const NO_OF_SECTIONS = 4;

  // Bar sizing (monthly thicker)
  const BASE_BAR_WIDTH = 18;
  const BASE_SPACING = 12;
  const barWidth = view === 'monthly' ? 36 : BASE_BAR_WIDTH;
  const spacing = view === 'monthly' ? 20 : BASE_SPACING;

  // Longest streak calculation (per type)
  function calculateLongestStreaksByType(data: any[]) {
    const grouped: { [type: string]: { date: string; resolved: boolean }[] } = {};

    data.forEach((c) => {
      const type = c.type?.name || "Unknown";
      const date = format(parseISO(c.createdAt), "yyyy-MM-dd");
      if (!grouped[type]) grouped[type] = [];
      grouped[type].push({ date, resolved: c.resolved });
    });

    const result: { [type: string]: number } = {};
    const today = new Date();

    Object.entries(grouped).forEach(([type, entries]) => {
      const gaveInByDate: { [d: string]: boolean } = {};
      entries.forEach((e) => {
        if (!e.resolved) gaveInByDate[e.date] = true;
      });

      const oldestDateStr = entries.reduce(
        (oldest, e) => (e.date < oldest ? e.date : oldest),
        entries[0].date
      );

      let streak = 0;
      let cursor = new Date(today);

      while (true) {
        const dStr = format(cursor, "yyyy-MM-dd");
        if (dStr < oldestDateStr) break;
        if (gaveInByDate[dStr]) break;

        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
        if (streak > 365) break;
      }

      result[type] = streak;
    });

    return Object.entries(result).reduce(
      (acc, [type, s]) => (s > acc.streak ? { type, streak: s } : acc),
      { type: "", streak: 0 }
    );
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

        setLongestStreakInfo(calculateLongestStreaksByType(data));
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
    // NOTE: keep full 6 slots; do NOT trim trailing zeros (we'll pad explicitly in monthly)
    const weeksCount: number[] = [0, 0, 0, 0, 0, 0];
    cravings.forEach((c) => {
      const date = parseISO(c.createdAt);
      if (date.getFullYear() === year && date.getMonth() === month) {
        const day = date.getDate();
        const week = Math.ceil(day / 7);
        weeksCount[week - 1]++;
      }
    });
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

  // Monthly: ALWAYS show all weeks of CURRENT month (pad future weeks with 0)
  function getMonthlyLabelsAndData(cravings: any[]) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const weeklyCountsRaw = aggregateWeeklyCounts(cravings, year, month);

    // How many weeks are in this month? (4 or 5, sometimes 6 when first day late in week + 31 days)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const totalWeeksInMonth = Math.ceil(daysInMonth / 7); // 4–5 (occasionally 5)

    const weeklyCounts = Array.from({ length: totalWeeksInMonth }, (_, i) => weeklyCountsRaw[i] || 0);
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

  // Build labels + chart data per view
  let formattedLabels: string[] = [];
  let chartData: any[] = [];

  if (view === 'weekly') {
    const selectedDates = getWeeklyLabels(); // last 7 days
    chartData = getWeeklyChartData(dailyStats, selectedDates);
    formattedLabels = selectedDates.map((date) => format(parseISO(date), 'EEE'));
  } else if (view === 'monthly') {
    const { labels, data } = getMonthlyLabelsAndData(cravings);
    formattedLabels = labels;
    chartData = data;
  } else {
    const { labels, data } = getYearlyLabelsAndData(cravings);
    formattedLabels = labels;
    chartData = data;
  }

  // Transform to gifted-charts data
  let chartBarData: any[];

  if (view === 'weekly') {
    chartBarData = chartData.flatMap((item, i) => [
      {
        label: formattedLabels[i],
        value: item.resist,
        frontColor: '#16a34a',
      },
      {
        label: '',
        value: item.gaveIn,
        frontColor: '#ef4444',
      },
    ]);
  } else {
    chartBarData = chartData.map((item, index) => ({
      label: formattedLabels[index],
      value: item.total,
      frontColor: '#3b82f6',
    }));
  }

  const chartMaxValue = Math.max(...chartBarData.map((d) => d?.value ?? 0), 1);

  // Tooltip helper
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

  // Determine which bar-group to focus
  function getCurrentIndex() {
    const today = new Date();
    if (view === 'weekly') return today.getDay();                                 // 0..6
    if (view === 'monthly') return Math.max(0, Math.ceil(today.getDate() / 7) - 1); // 0..(weeks-1)
    if (view === 'all') return today.getMonth();                                  // 0..11
    return 0;
  }

  // Auto-center scroll
  useEffect(() => {
    if (!chartData.length) return;

    const indexRaw = getCurrentIndex();
    const groupsCount = view === 'weekly' ? chartData.length : chartData.length; // groups = days/weeks/months
    const index = Math.min(Math.max(indexRaw, 0), Math.max(groupsCount - 1, 0));

    const groupWidth = view === 'weekly' ? 2 * barWidth + spacing : barWidth + spacing;

    // Visible width for the scrollable chart area (screen minus paddings and fixed y-axis)
    const visibleChartWidth =
      windowWidth - (OUTER_PADDING * 2) - (CARD_PADDING * 2) - Y_AXIS_LABEL_WIDTH;

    const scrollX = index * groupWidth - visibleChartWidth / 2 + groupWidth / 2;

    setTimeout(() => {
      scrollRef.current?.scrollTo({ x: Math.max(scrollX, 0), animated: true });
    }, 80);
  }, [view, chartData, windowWidth, barWidth, spacing]);

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

  // Y-axis tick labels to match NO_OF_SECTIONS & chartMaxValue
  const yTicks = Array.from({ length: NO_OF_SECTIONS + 1 }, (_, i) => {
    const v = Math.round((chartMaxValue * (NO_OF_SECTIONS - i)) / NO_OF_SECTIONS);
    return v;
  });

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Title */}
      <View style={{ paddingTop: 48, paddingBottom: 12 }} className="items-center">
        <Text className="text-3xl font-extrabold text-center" style={{ color: colors.primary }}>
          🧠 Craving Stats
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: OUTER_PADDING, paddingBottom: 20, flexGrow: 1 }}
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
        </View>

        {/* Streak and average intensity display */}
        <View className="bg-white p-6 rounded-xl shadow flex-row justify-around mb-8">
          <View className="items-center">
            <Text className="text-xl font-semibold" style={{ color: colors.primary }}>
              {longestStreakInfo.streak}
            </Text>
            <Text className="text-gray-600">Longest Streak</Text>
          </View>
          <View className="items-center">
            <Text className="text-xl font-semibold" style={{ color: colors.primary }}>
              {resistRatio}%
            </Text>
            <Text className="text-gray-600">Resist Ratio</Text>
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
        <View className="bg-white p-5 rounded-xl shadow">
          <Text className="text-lg font-semibold text-center mb-4 text-gray-800">
            {view === 'weekly' ? 'Resist (green) vs Gave In (red)' : 'Total Cravings'}
          </Text>

          {/* Row: Fixed Y-axis labels + Scrollable bars */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            {/* Fixed Y-axis labels */}
            <View
              style={{
                width: Y_AXIS_LABEL_WIDTH,
                height: CHART_HEIGHT,
                justifyContent: 'space-between',
                paddingRight: 6,
              }}
            >
              {yTicks.map((t, i) => (
                <Text key={i} style={{ color: '#666', fontSize: 12, textAlign: 'right' }}>
                  {t}
                </Text>
              ))}
            </View>

            {/* Scrollable bars */}
            <ScrollView
              ref={scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 8 }}
            >
              <BarChart
                data={chartBarData}
                height={CHART_HEIGHT}
                barWidth={barWidth}
                spacing={spacing}
                noOfSections={NO_OF_SECTIONS}
                maxValue={chartMaxValue}
                // Hide built-in Y-axis text (we render our own)
                hideYAxisText
                yAxisLabelWidth={0}
                showVerticalLines={false}
                // Typography
                yAxisTextStyle={{ color: '#666', fontSize: 12 }}
                xAxisLabelTextStyle={{ color: '#444', fontSize: 11 }}
                xAxisLabelTextRotate={view === 'weekly' ? -45 : 0}
                // Edge spacing
                initialSpacing={0}
                endSpacing={0}
                // Animation & interactions
                isAnimated
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
                    // keep your weekly labels behavior
                    return formattedLabels[index] || '';
                  }
                  return label;
                }}
              />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
