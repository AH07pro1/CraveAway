import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Animated,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../utils/colors';

export default function ProgressScreen() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState<string[]>([]);
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Calculate next level XP based on current level state
  const nextLevelXP = Math.pow(level, 2) * 10;

  function getBadges(level: number): string[] {
    const badges: string[] = [];
    if (level >= 1) badges.push("🧭 Newcomer");
    if (level >= 2) badges.push("🌱 Hopeful");
    if (level >= 5) badges.push("🎯 Focused");
    if (level >= 8) badges.push("🧗 Climber");
    if (level >= 11) badges.push("🥊 Fighter");
    if (level >= 14) badges.push("🔥 Dedicated");
    if (level >= 17) badges.push("🌍 Grounded");
    if (level >= 20) badges.push("🛡️ Guardian");
    if (level >= 23) badges.push("🔁 Streak Master");
    if (level >= 26) badges.push("🧱 Resister");
    if (level >= 29) badges.push("🏆 Champion");
    if (level >= 32) badges.push("🧠 Mind Master");
    if (level >= 35) badges.push("💥 Craving Crusher");
    if (level >= 38) badges.push("🚀 Trailblazer");
    if (level >= 41) badges.push("🧭 Pathfinder");
    if (level >= 44) badges.push("🔆 Light Bearer");
    if (level >= 47) badges.push("⚔️ Addiction Slayer");
    if (level >= 50) badges.push("🐉 Legend");
    return badges;
  }

  const fetchProgress = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const res = await fetch(`http://192.168.2.19:3000/api/session-complete/${user.id}`);
      const data = await res.json();
      console.log('API response:', data); // Debug: check API response

      setXP(data.xp);
      setLevel(data.level);
      setBadges(getBadges(data.level));

      const nextLevelXPForAnimation = Math.pow(data.level, 2) * 10;

      Animated.timing(progressAnim, {
        toValue: (data.xp / nextLevelXPForAnimation) * 100,
        duration: 800,
        useNativeDriver: false,
      }).start();

    } catch (err) {
      console.error('Error fetching progress', err);
    } finally {
      setLoading(false);
    }
  };

  // Fix: fetch progress when screen is focused or user id changes
  useFocusEffect(
    useCallback(() => {
      fetchProgress();
    }, [user?.id])
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10, color: colors.textSecondary }}>
          Loading your progress...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingVertical: 40,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: colors.primary,
            marginBottom: 32,
          }}
        >
          🌟 Your Progress
        </Text>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginBottom: 30,
          }}
        >
          <View
            style={{
              width: '100%',
              height: 20,
              backgroundColor: '#e0e0e0',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <Animated.View
              style={{
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
                height: '100%',
                backgroundColor: colors.primary,
              }}
            />
          </View>

          <Text
            style={{
              marginTop: 12,
              fontSize: 16,
              color: colors.textMain,
            }}
          >
            {xp} / {nextLevelXP} XP
          </Text>

          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: colors.textMain,
              marginTop: 6,
            }}
          >
            Level {level}
          </Text>
        </View>

        {/* Badges */}
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 12,
              color: colors.textMain,
            }}
          >
            Badges Earned
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {badges.length > 0 ? (
              badges.map((badge, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#f0f4ff',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 20,
                    margin: 8,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 2,
                  }}
                >
                  <Text style={{ fontSize: 17, color: colors.primary }}>
                    {badge}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={{ color: colors.textSecondary }}>No badges yet</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
