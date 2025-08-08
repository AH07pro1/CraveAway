import React, { createContext, useState, useContext } from 'react';

interface OnboardingContextType {
  onboardingData: {
    photoUrl: string;
    message: string;
  };
  setOnboardingData: React.Dispatch<React.SetStateAction<{
    photoUrl: string;
    message: string;
  }>>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState({
    photoUrl: '',
    message: '',
  });

  return (
    <OnboardingContext.Provider value={{ onboardingData, setOnboardingData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

// ✅ Safe version of the hook
export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
