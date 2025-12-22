'use client';

import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { useCalimeaStore } from '@/store/useCalimeaStore';
import { useEffect } from 'react';

export default function Home() {
  const { isInitialized, hasHydrated } = useCalimeaStore();

  useEffect(() => {
    if (hasHydrated && isInitialized) {
      window.location.href = '/dashboard';
    }
  }, [hasHydrated, isInitialized]);

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent pointer-events-none" />
      <div className="z-10 w-full">
        <OnboardingWizard />
      </div>
    </main>
  );
}
