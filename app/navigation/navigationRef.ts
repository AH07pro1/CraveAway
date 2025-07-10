// navigation/navigationRef.ts
import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './RootNavigationTypes';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
