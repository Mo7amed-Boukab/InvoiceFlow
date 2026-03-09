'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Only redirect if we know authentication failed and it's not loading
    if (!isAuthenticated && !loading) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Optionally show a loading state while checking the token
  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-[#FCFCFC] font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-64 transition-all">
        <Header />
        <main className="flex-1 overflow-x-hidden p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
