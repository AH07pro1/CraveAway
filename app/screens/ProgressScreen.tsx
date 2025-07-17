import React, { useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Animated, FlatList } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import colors from '../utils/colors';
import { useFocusEffect } from '@react-navigation/native';

export default function ProgressScreen() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);

  const nextLevelXP = Math.pow(level, 2) * 10;
  const progressAnim = React.useRef(new Animated.Value(0)).current;

  const fetchProgress = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      // Fetch XP and level
      const res = await fetch(`http://192.168.2.19:3000/api/session-complete/${user.id}`);
      const data = await res.json();
      setXP(data.xp);
      setLevel(data.level);

      Animated.timing(progressAnim, {
        toValue: (data.xp / (Math.pow(data.level, 2) * 10)) * 100,
        duration: 800,
        useNativeDriver: false,
      }).start();

      // Fetch achievements with progress
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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Helper to format progress text based on type
  const formatProgress = (ach) => {
    const { currentValue, value, type } = ach;
    if (type === 'XP') return `${currentValue} / ${value} XP`;
    if (type === 'CRAVING') return `${currentValue} / ${value} cravings`;
    if (type === 'RESOLVED_CRAVING') return `${currentValue} / ${value} resolved cravings`;
    return '';
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 24, color: colors.primary }}>
        🌟 Your Progress
      </Text>

      <View
        style={{
          width: '100%',
          height: 24,
          backgroundColor: '#ddd',
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        <Animated.View
          style={{
            width: progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            backgroundColor: colors.primary,
            height: '100%',
          }}
        />
      </View>

      <Text style={{ color: colors.textMain, fontSize: 16, marginBottom: 12 }}>
        {xp} / {nextLevelXP} XP
      </Text>

      <Text style={{ fontSize: 22, fontWeight: '600', color: colors.textMain, marginBottom: 24 }}>
        Level: {level}
      </Text>

      <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.primary, marginBottom: 12 }}>
        Achievements
      </Text>

      {achievements.length === 0 ? (
        <Text style={{ color: colors.textSecondary }}>No achievements yet.</Text>
      ) : (
        <FlatList
          data={achievements}
          keyExtractor={(item) => item.id.toString()}
          style={{ width: '100%' }}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 12,
                marginVertical: 6,
                backgroundColor: item.unlocked ? '#C8E6C9' : '#E0E0E0',
                borderRadius: 10,
              }}
            >
              <Text style={{ fontWeight: '600', color: colors.primary, fontSize: 16 }}>{item.title}</Text>
              <Text style={{ color: colors.textSecondary, marginBottom: 4 }}>{item.description}</Text>
              <Text style={{ color: item.unlocked ? 'green' : '#555', fontWeight: '600' }}>
                {item.unlocked ? `Unlocked (+${item.xpReward} XP)` : `Locked — Progress: ${formatProgress(item)}`}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
