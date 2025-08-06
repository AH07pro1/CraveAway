// AppStateContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';
import { useAuth } from '@clerk/clerk-expo';

const REVENUECAT_API_KEY = 'goog_lTWAjIdmkcFLTnkNzVyEhdLiVZL'; // your key

type AppState = {
  isLoading: boolean;
  hasOnboarded: boolean;
  hasPaid: boolean;
  isSignedIn: boolean;
  setHasPaid: (paid: boolean) => void;
  setHasOnboarded: (onboarded: boolean) => void;
  setIsSignedIn: (signedIn: boolean) => void; // <- ADD THIS
};


const AppStateContext = createContext<AppState | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [hasPaidState, setHasPaidState] = useState(false);
  const [hasOnboardedState, setHasOnboardedState] = useState(false);
const [isSignedInState, setIsSignedInState] = useState(false);

   const setHasPaid = (paid: boolean) => {
    setHasPaidState(paid);
    AsyncStorage.setItem('hasPaid', paid ? 'true' : 'false');
  };

   const setHasOnboarded = (onboarded: boolean) => {
    setHasOnboardedState(onboarded);
    AsyncStorage.setItem('hasOnboarded', onboarded ? 'true' : 'false');
  };

  
useEffect(() => {
  setIsSignedInState(!!isSignedIn); // keep in sync with Clerk
}, [isSignedIn]);

  
  useEffect(() => {
 async function init() {
  try {
    await Purchases.configure({ apiKey: REVENUECAT_API_KEY });

    // Get onboarding status
    const onboarded = (await AsyncStorage.getItem('hasOnboarded')) === 'true';
    setHasOnboardedState(onboarded);

    // Get locally stored paid status
    const storedPaid = (await AsyncStorage.getItem('hasPaid')) === 'true';
    setHasPaidState(storedPaid); // Use local value first

    // Fetch real customer info from RevenueCat
    const customerInfo = await Purchases.getCustomerInfo();
    const rcPaid = !!customerInfo.entitlements.active['Monthly Membership'];

    // If RevenueCat shows a real subscription, override stored value
    if (rcPaid) {
      setHasPaidState(true);
      await AsyncStorage.setItem('hasPaid', 'true');
    }

    // Add listener for live updates (e.g. user buys later)
    Purchases.addCustomerInfoUpdateListener(async (info) => {
      const active = !!info.entitlements.active['Monthly Membership'];
      if (active) {
        setHasPaidState(true);
        await AsyncStorage.setItem('hasPaid', 'true');
      }
    });

  } catch (e) {
    console.warn('Error initializing Purchases or AsyncStorage:', e);
  } finally {
    setIsLoading(false);
  }
}


  if (isLoaded) {
    init();
  }
}, [isLoaded]);


  return (
    <AppStateContext.Provider value={{ 
      isLoading, 
      hasOnboarded: hasOnboardedState, 
      hasPaid: hasPaidState, 
      isSignedIn: !!isSignedIn,
      setHasPaid,
      setHasOnboarded,
      setIsSignedIn: setIsSignedInState,
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
}
