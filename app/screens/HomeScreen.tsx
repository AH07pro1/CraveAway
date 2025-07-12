import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../utils/colors';

const quotes = [
  'Every craving you resist is a victory.',
  'Stay strong — one day at a time.',
  'You’re doing better than yesterday.',
  'Small steps lead to big changes.',
  'Keep going, your future self will thank you.',
];

export default function HomeScreen({ navigation }: any) {
  const [quote, setQuote] = useState('');
  const [longestStreakInfo, setLongestStreakInfo] = useState<{
    type: string;
    streak: number;
  }>({ type: '', streak: 0 });

  /** ─────────────────────────────
   *  Helpers
   *  ────────────────────────────*/
  const calculateLongestStreaksByType = (data: any[]) => {
    const grouped: { [type: string]: { date: string; resolved: boolean }[] } =
      {};

    data.forEach((c) => {
      const type = c.type?.name || 'Unknown';
      const date = format(parseISO(c.createdAt), 'yyyy-MM-dd');
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
        entries[0].date,
      );

      let streak = 0;
      let cursor = new Date(today);

      while (true) {
        const dStr = format(cursor, 'yyyy-MM-dd');
        if (dStr < oldestDateStr) break;
        if (gaveInByDate[dStr]) break;

        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
        if (streak > 365) break;
      }

      result[type] = streak;
    });

    return Object.entries(result).reduce(
      (acc, [type, s]) =>
        s > acc.streak ? { type, streak: s } : acc,
      { type: '', streak: 0 },
    );
  };

  /** ─────────────────────────────
   *  Reload data on focus
   *  ────────────────────────────*/
  const reloadHomeData = async () => {
    // new random quote
    const qi = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[qi]);

    try {
      const res = await fetch('http://192.168.2.19:3000/api/craving');
      const data = await res.json();

      const longest = calculateLongestStreaksByType(data);
      setLongestStreakInfo(longest);
    } catch (err) {
      console.error('Failed to fetch cravings', err);
    }
  };

  // run on every focus
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      if (isMounted) reloadHomeData();
      return () => {
        isMounted = false;
      };
    }, []),
  );

  /** ─────────────────────────────
   *  UI
   *  ────────────────────────────*/
  return (
    <View
      className="flex-1 justify-center items-center px-6"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
      <View className="mb-6 items-center">
        <Text
          className="text-4xl font-extrabold text-center mb-1"
          style={{ color: colors.primary }}
        >
          CraveAway
        </Text>
        <Text
          className="text-base text-center"
          style={{ color: colors.textSecondary }}
        >
          Track cravings. Stay in control.
        </Text>
      </View>

      {/* Quote */}
      <View
        className="bg-[#E9EBF8] rounded-2xl p-5 mb-6 shadow-md w-full max-w-xl"
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 5,
        }}
      >
        <Text
          className="italic text-center text-base"
          style={{ color: colors.textSecondary }}
        >
          "{quote}"
        </Text>
      </View>

      {/* Longest Streak */}
      {longestStreakInfo.streak > 0 && (
        <View
          className="bg-[#E9EBF8] rounded-2xl p-6 mb-8 shadow-md w-full max-w-xl"
          style={{
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 5,
          }}
        >
          <Text
            className="text-lg text-center"
            style={{ color: colors.textMain }}
          >
            🔥{' '}
            <Text
              className="font-semibold"
              style={{ color: colors.primary }}
            >
              {longestStreakInfo.streak}
            </Text>{' '}
            day{longestStreakInfo.streak === 1 ? '' : 's'} without{' '}
            <Text
              className="font-semibold"
              style={{ color: colors.primary }}
            >
              {longestStreakInfo.type}
            </Text>
          </Text>
        </View>
      )}

      {/* Button */}
      <TouchableOpacity
        className="bg-[#3A86FF] rounded-3xl py-4 px-10 shadow-lg mb-6 w-full max-w-xl items-center"
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('Calming', { screen: 'CalmingSession' })
        }
      >
        <Text className="text-white text-2xl font-bold tracking-wide">
          I Have a Craving
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text
        className="text-sm italic text-center"
        style={{ color: colors.textSecondary, maxWidth: 320 }}
      >
        Take a deep breath. You’re in control.
      </Text>
    </View>
  );
}
