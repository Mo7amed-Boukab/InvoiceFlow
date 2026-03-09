'use client';

import React from 'react';
import { Bell, HelpCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  // Helper to get exactly the page name for breadcrumb
  const getPageName = () => {
    if (pathname.includes('/settings')) return 'Settings';
    if (pathname.includes('/documents')) return 'Documents & Templates';
    if (pathname.includes('/products')) return 'Products & Services Directory';
    if (pathname.includes('/customers')) return 'Clients Directory';
    if (pathname.includes('/invoices/create')) return 'Create New Invoice';
    if (pathname.includes('/invoices')) return 'Invoices';
    return 'Financial Overview';
  };

  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10 w-full shrink-0">
      <div className="flex items-center text-[13px] font-medium text-slate-400">
        <span>Workspace</span>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-bold">{getPageName()}</span>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
          <Bell size={18} strokeWidth={2.5} />
          {/* Notification dot */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full translate-x-1/2 -translate-y-1/2"></span>
        </button>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <HelpCircle size={18} strokeWidth={2.5} />
        </button>
      </div>
    </header>
  );
}
