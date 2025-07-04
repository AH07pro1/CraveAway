import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './navigation/Navigation';
import '../global.css'; // Import global styles
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
}
