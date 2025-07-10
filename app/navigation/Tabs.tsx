import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import CalmingStack from './CalmingStack'; // 👈 use the stack here
import { Ionicons } from '@expo/vector-icons';
import CravingListScreen from '../screens/CravingListScreen';
import CravingDetailScreen from '../screens/CravingDetailScreen';
import StreakDetailScreen from  '../screens/StreakDetailScreen';
import MonthlyStatsScreen from '../screens/MonthlyStatsScreen';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'home';

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Stats') iconName = 'stats-chart';
          else if (route.name === 'Calming') iconName = 'leaf-outline';
          else if (route.name === 'CravingList') iconName = 'list-outline'; // changed here

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Calming" component={CalmingStack} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="CravingList" component={CravingListScreen} />
      <Tab.Screen
        name="CravingDetail"
        component={CravingDetailScreen}
        options={{ tabBarButton: () => null }}
      />
       <Tab.Screen
        name="StreakDetails"
        component={StreakDetailScreen}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen name="MonthlyStats" component={MonthlyStatsScreen} options={{ tabBarButton: () => null }}/>
    </Tab.Navigator>
  );
}
