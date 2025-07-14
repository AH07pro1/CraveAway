import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import { navigationRef } from './navigationRef';
import { DeviceMotion } from 'expo-sensors';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  useEffect(() => {
    let lastShakeTime = 0;
    const threshold = 6; // higher threshold for stronger shake
    const minShakeInterval = 3000; // 3 seconds cooldown
    let lastMagnitude = 0;

    const subscription = DeviceMotion.addListener(({ accelerationIncludingGravity }) => {
      if (!accelerationIncludingGravity) return;

      const { x, y, z } = accelerationIncludingGravity;
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      // Check if phone is roughly upright to avoid false triggers when bending
      const isUpright = z < -7;

      if (
        isUpright &&
        magnitude - lastMagnitude > threshold &&
        Date.now() - lastShakeTime > minShakeInterval
      ) {
        lastShakeTime = Date.now();
        navigationRef.current?.navigate('Calming', {
          screen: 'CalmingSession',
        });
      }

      lastMagnitude = magnitude;
    });

    DeviceMotion.setUpdateInterval(400); // checks every 400ms

    return () => subscription.remove();
  }, []);

  return (
    // <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}
