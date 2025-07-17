import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Animated,
  FlatList,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../utils/colors';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const nextLevelXP = Math.pow(level, 2) * 10;

  const fetchProgress = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const res = await fetch(`http://192.168.2.19:3000/api/session-complete/${user.id}`);
      const data = await res.json();
      setXP(data.xp);
      setLevel(data.level);

      Animated.timing(progressAnim, {
        toValue: (data.xp / nextLevelXP) * 100,
        duration: 800,
        useNativeDriver: false,
      }).start();

      const achRes = await fetch(`http://192.168.2.19:3000/api/achievements/${user.id}`);
      const achData = await achRes.json();
      setAchievements(achData);
    } catch (err) {
      console.error('Error fetching progress or achievements', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProgress();
    }, [user?.id])
  );

  const formatProgress = (ach) => {
    const { currentValue, value, type } = ach;
    if (type === 'XP') return `${currentValue} / ${value} XP`;
    if (type === 'CRAVING') return `${currentValue} / ${value} cravings`;
    if (type === 'RESOLVED_CRAVING') return `${currentValue} / ${value} resolved cravings`;
    return '';
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10, color: colors.textSecondary }}>Loading your progress...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 48,
          paddingHorizontal: 24,
          paddingBottom: 40,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 24 }}>
          🌟 Your Progress
        </Text>

        <View style={{ width: '100%', marginBottom: 16 }}>
          <View style={{
            height: 20,
            backgroundColor: '#e0e0e0',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
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
          <Text style={{ marginTop: 8, fontSize: 16, color: colors.textMain }}>
            {xp} / {nextLevelXP} XP
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.textMain, marginTop: 4 }}>
            Level {level}
          </Text>
        </View>

        <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.primary, marginVertical: 16 }}>
          🏆 Achievements
        </Text>

        {achievements.length === 0 ? (
          <Text style={{ color: colors.textSecondary }}>No achievements yet.</Text>
        ) : (
          <FlatList
            data={achievements}
            keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            scrollEnabled={false}
            style={{ width: '100%' }}
            renderItem={({ item }) => (
              <View
                style={{
                  padding: 16,
                  marginBottom: 12,
                  backgroundColor: item.unlocked ? '#D1FAE5' : '#F5F5F5',
                  borderRadius: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Text style={{ fontWeight: '700', fontSize: 16, color: colors.primary }}>
                  {item.title}
                </Text>
                <Text style={{ color: colors.textSecondary, marginTop: 4 }}>{item.description}</Text>
                <Text style={{
                  marginTop: 6,
                  fontWeight: '600',
                  color: item.unlocked ? 'green' : '#666',
                }}>
                  {item.unlocked
                    ? `✅ Unlocked (+${item.xpReward} XP)`
                    : `🔒 Locked — Progress: ${formatProgress(item)}`}
                </Text>
              </View>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
