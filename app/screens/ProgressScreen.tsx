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

       
      </ScrollView>
    </SafeAreaView>
  );
}
