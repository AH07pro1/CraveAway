// screens/MonthlyStatsScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {
  format,
  parseISO,
  startOfMonth,
  differenceInWeeks,
  parse,
} from 'date-fns';
import { BarChart } from 'react-native-gifted-charts';
import colors from '../utils/colors';

export default function MonthlyStatsScreen({ route }: any) {
  const { cravings } = route.params;
  const [monthlyWeeklyCounts, setMonthlyWeeklyCounts] = useState<{
    [month: string]: number[];
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Group cravings by month and week number within that month
    const counts: { [month: string]: number[] } = {};

    cravings.forEach((c: any) => {
      const createdDate = parseISO(c.createdAt);
      const monthKey = format(createdDate, 'yyyy-MM');
      const monthStart = startOfMonth(createdDate);
      const weekIndex = differenceInWeeks(createdDate, monthStart);

      if (!counts[monthKey]) {
        counts[monthKey] = [];
      }

      // Initialize weeks up to current week index
      while (counts[monthKey].length <= weekIndex) {
        counts[monthKey].push(0);
      }

      counts[monthKey][weekIndex] += 1;
    });

    setMonthlyWeeklyCounts(counts);
    setLoading(false);
  }, [cravings]);

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  const monthsSorted = Object.keys(monthlyWeeklyCounts).sort();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
     <ScrollView
  contentContainerStyle={{
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 40,
  }}
>

        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.primary,
            marginBottom: 24,
            textAlign: 'center',
          }}
        >
          📅 Cravings Per Month (Weekly Breakdown)
        </Text>

        {monthsSorted.length === 0 && (
          <Text style={{ color: colors.textSecondary, textAlign: 'center' }}>
            No data available.
          </Text>
        )}

        {monthsSorted.map((month) => {
          const monthDate = parseISO(month + '-01');
          const monthLabel = format(monthDate, 'MMMM yyyy');

          const weeklyCounts = monthlyWeeklyCounts[month];
          const barData = weeklyCounts.map((count, index) => ({
            value: count,
            label: `W${index + 1}`,
            frontColor: colors.primary,
          }));

          const maxVal = Math.max(...weeklyCounts, 1);

          return (
            <View
              key={month}
              style={{
                backgroundColor: '#fff',
                padding: 16,
                borderRadius: 16,
                marginBottom: 24,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 1 },
                elevation: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: colors.textMain,
                  marginBottom: 12,
                }}
              >
                {monthLabel}
              </Text>
              <BarChart
                data={barData}
                barWidth={30}
                noOfSections={4}
                spacing={15}
                maxValue={maxVal}
                yAxisColor={colors.textMain}
                xAxisColor={colors.textMain}
                yAxisTextStyle={{ color: colors.textMain }}
                xAxisLabelTextStyle={{ color: colors.textMain }}
                hideRules={false}
                isAnimated
              />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
