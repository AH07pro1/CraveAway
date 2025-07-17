import React, { useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Animated } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import colors from '../utils/colors';
import { useFocusEffect } from '@react-navigation/native';

export default function ProgressScreen() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);

  const nextLevelXP = Math.pow(level, 2) * 10;
  const percent = Math.min((xp / nextLevelXP) * 100, 100);

  const progressAnim = React.useRef(new Animated.Value(0)).current;

  const fetchProgress = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const res = await fetch(`http://192.168.2.19:3000/api/session-complete/${user.id}`);
      const data = await res.json();
      setXP(data.xp);
      setLevel(data.level);

      // Animate progress bar fill
      Animated.timing(progressAnim, {
        toValue: (data.xp / (Math.pow(data.level, 2) * 10)) * 100,
        duration: 800,
        useNativeDriver: false,
      }).start();

    } catch (err) {
      console.error('Error fetching progress', err);
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

  return (
    <View className="flex-1 justify-center items-center px-6" style={{ backgroundColor: colors.background }}>
      <Text className="text-3xl font-bold mb-6" style={{ color: colors.primary }}>
        🌟 Your Progress
      </Text>

      <View
        style={{
          width: '80%',
          height: 24,
          backgroundColor: '#ddd',
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 12,
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

      <Text style={{ color: colors.textMain, fontSize: 16, marginBottom: 8 }}>
        {xp} / {nextLevelXP} XP
      </Text>

      <Text style={{ fontSize: 20, fontWeight: '600', color: colors.textMain }}>
        Level: {level}
      </Text>
    </View>
  );
}
