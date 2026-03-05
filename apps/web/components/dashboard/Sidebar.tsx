'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  CreditCard,
  BarChart2,
  Settings,
  LogOut,
  ChevronDown,
  Building2,
  Bell,
  ChevronRight,
  FolderOpen,
  Menu
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutThunk } from '@/store/slices/authSlice';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Invoices', href: '/dashboard/invoices', icon: FileText },
  { label: 'Customers', href: '/dashboard/customers', icon: Users },
  { label: 'Products & Services', href: '/dashboard/products', icon: Package },
  { label: 'Documents & Templates', href: '/dashboard/documents', icon: FolderOpen },
];

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0">
      {/* Brand */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3">
        <div className="bg-white border flex items-center justify-center border-slate-200 p-1.5 rounded-sm">
          <FileText size={20} className="text-slate-800" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-heading font-bold text-slate-800 text-[15px] leading-tight tracking-tight">InvoiceFlow</h1>
          <p className="text-[10px] uppercase  text-slate-400 tracking-wider">Admin Dashboard</p>
        </div>
      </div>
      

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-1.5 overflow-y-auto">
        <div className="mb-4">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Navigation Menu</p>
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-sm transition-all text-[13px] font-bold",
                isActive 
                  ? "bg-white text-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-slate-800" : "text-slate-400"} />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
        
        <Link
          href="/dashboard/settings"
          className={cn(
            "w-full flex items-center justify-between px-3 py-2.5 rounded-sm transition-all text-[13px] font-bold",
            pathname === '/dashboard/settings' 
              ? "bg-white text-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100" 
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
          )}
        >
          <div className="flex items-center gap-3">
            <Settings size={18} strokeWidth={pathname === '/dashboard/settings' ? 2.5 : 2} className={pathname === '/dashboard/settings' ? "text-slate-800" : "text-slate-400"} />
            <span>Settings</span>
          </div>
        </Link>
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-slate-200">
        <div className="bg-white border border-slate-200 p-2 rounded-sm mb-2 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
               <Building2 size={16} strokeWidth={2.5}/>
            </div>
            <div className="text-left">
              <p className="text-[13px] font-bold text-slate-800 leading-tight">{user?.companyName || 'Enterprise'}</p>
              <p className="text-[11px] text-slate-400 font-medium">Switch Account</p>
            </div>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </div>

        <button 
          onClick={() => dispatch(logoutThunk())}
          className="w-full flex items-center gap-3 px-3 py-2 text-[13px] font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <LogOut size={16} strokeWidth={2.5} className="text-slate-400" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
