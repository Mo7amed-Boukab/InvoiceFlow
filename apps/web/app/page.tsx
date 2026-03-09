'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  PlayCircle,
  Check,
  CreditCard,
  TrendingUp,
  Instagram,
  Twitter,
  Facebook,
  Menu,
  X,
  Receipt
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutThunk } from '@/store/slices/authSlice';
import { Loader2 } from 'lucide-react';

// Logo matching the Figma design from Step 61
const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="bg-white p-2 rounded text-[#171b2d] flex items-center justify-center border border-slate-100">
      <FileText size={18} strokeWidth={2.5} />
    </div>
    <span className="font-heading font-bold text-lg tracking-tight text-[#171b2d]">InvoiceFlow</span>
  </div>
);

export default function LandingPage() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <div className="flex flex-col min-h-screen bg-white/98 font-sans selection:bg-[#171b2d] selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md z-50 border-b border-slate-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-[11px] font-medium text-slate-600 uppercase tracking-widest">
            <a href="#features" className="hover:text-[#171b2d] transition-colors">Features</a>
            <a href="#pricing" className="hover:text-[#171b2d] transition-colors">Pricing</a>
            <a href="#about" className="hover:text-[#171b2d] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#171b2d] transition-colors">contact us</a>
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="text-[13px] font-semibold text-slate-600 hover:text-[#171b2d] transition-colors">
                  Log in
                </Link>
                <Link href="/register" className="text-[13px] font-semibold bg-[#171b2d] hover:bg-slate-800 text-white px-5 py-2 rounded-sm transition-all capitalize tracking-wide">
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-[13px] font-semibold text-slate-600 hover:text-[#171b2d] transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="text-[13px] font-semibold bg-red-50 text-red-600 px-5 py-2 rounded-sm hover:bg-red-100 transition-all flex items-center gap-2"
                >
                  {loading && <Loader2 size={14} className="animate-spin" />}
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-100 overflow-hidden shadow-lg"
            >
              <div className="flex flex-col p-6 space-y-6">
                <nav className="flex flex-col space-y-4 text-[13px] font-bold text-slate-600 uppercase tracking-widest">
                  <a href="#features" onClick={() => setIsMenuOpen(false)} className="hover:text-[#171b2d]">Features</a>
                  <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="hover:text-[#171b2d]">Pricing</a>
                  <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-[#171b2d]">About</a>
                  <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[#171b2d]">contact us</a>
                </nav>
                <div className="flex flex-col space-y-4 pt-4 border-t border-slate-50">
                  <Link href="/login" className="text-center py-3 font-bold text-slate-600">Log in</Link>
                  <Link href="/register" className="text-center py-3 bg-[#171b2d] text-white font-bold rounded-sm">Get Started</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative px-4 pt-16 pb-16 md:pt-28 md:pb-24 overflow-hidden flex flex-col items-center">
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] bg-indigo-50/50 rounded-full blur-[80px] md:blur-[100px] -z-10" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-4xl mx-auto text-center z-10"
          >
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-heading font-bold text-[#171b2d] tracking-tight leading-tight mb-6">
              Master Your Business <br className="hidden md:block" /> Cashflow with InvoiceFlow.
            </h1>
            <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium px-4 md:px-0">
              Automated invoicing, payment tracking, and financial analytics for modern teams. Stop chasing payments and start growing your business.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-6 sm:px-0">
              <Link href="/register" className="w-full sm:w-auto px-10 py-3 bg-[#171b2d] hover:bg-slate-900 hover:shadow-xl hover:scale-102 text-white font-medium rounded-sm shadow-sm transition-all duration-300 text-sm tracking-tight text-center">
                Start for Free
              </Link>
              <button className="w-full sm:w-auto px-8 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-sm transition-all flex items-center justify-center space-x-2 text-sm hover:shadow-lg transition-all duration-300">
                <PlayCircle size={16} className="text-slate-400" />
                <span>Watch Demo</span>
              </button>
            </div>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mt-12 md:mt-16 w-full max-w-4xl mx-auto z-10 px-4"
          >
            <div className="rounded-sm bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="bg-[#fcfcfc] border-b border-slate-50 px-4 py-2 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#ff5f57]"></div>
                <div className="w-2 h-2 rounded-full bg-[#febc2e]"></div>
                <div className="w-2 h-2 rounded-full bg-[#28c840]"></div>
              </div>
              <div className="aspect-[16/9] bg-white"></div>
            </div>
          </motion.div>
        </section>

        {/* Logos Section */}
        <section className="py-12 bg-white border-t border-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">
              Trusted by 500+ businesses worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 text-slate-400 font-bold opacity-60 grayscale scale-90 md:scale-100">
              <div className="flex items-center space-x-2 text-base md:text-lg">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.112-3.386.69-3.386 1.933 0 2.193 3.012 1.83 3.012 2.768 0 .432-.403.626-1.01.626-.814 0-1.745-.33-2.576-.79l-.396 2.316c.866.52 2.148.875 3.39 1.014 2.508.113 4.148-.78 4.148-2.22 0-2.316-3.033-1.89-3.033-2.81 0-.35.342-.6 1.012-.6.71 0 1.57.25 2.155.515l.394-2.304c-.65-.367-1.874-.757-3.13-.757M8.36 9.352c-1.393-.112-2.39.46-2.39 1.39 0 1.343 1.956 1.137 1.956 1.705 0 .221-.24.33-.615.33-.508 0-1.127-.184-1.638-.453l-.224 1.383c.48.243 1.25.46 2 .54 1.577.108 2.6-.473 2.6-1.42 0-1.42-1.996-1.173-1.996-1.744 0-.214.22-.36.653-.36.438 0 .937.14 1.334.332l.245-1.4c-.458-.21-1.2-.42-1.928-.42z" /></svg>
                <span>Stripe</span>
              </div>
              <div className="flex items-center space-x-2 text-base md:text-lg">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11.1c-.8 0-1.5-.7-1.5-1.5 0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5c0 .8-.7 1.5-1.5 1.5zm-8 0c-.8 0-1.5-.7-1.5-1.5 0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5c0 .8-.7 1.5-1.5 1.5zm4 7.4c-2.4 0-4.4-1.7-4.4-4.2s2-4.2 4.4-4.2 4.4 1.7 4.4 4.2-2 4.2-4.4 4.2zm0-10.4c-3.5 0-6.4 2.8-6.4 6.2s2.9 6.2 6.4 6.2 6.4-2.8 6.4-6.2-2.9-6.2-6.4-6.2zm0-6.1c-1.1 0-2.1.9-2.1 2s.9 2.1 2.1 2.1 2.1-1 2.1-2.1-.9-2.1-2.1-2.1z" /></svg>
                <span>Airbnb</span>
              </div>
              <div className="flex items-center space-x-2 text-base md:text-lg">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2l6 4-6 4-6-4 6-4zm0 10l6 4-6 4-6-4 6-4zm12-10l6 4-6 4-6-4 6-4zm0 10l6 4-6 4-6-4 6-4z" /></svg>
                <span>Dropbox</span>
              </div>
              <div className="flex items-center space-x-2 text-base md:text-lg">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.59 17.357c-.223.333-.654.437-.987.214-2.583-1.58-5.83-1.938-9.657-1.064-.383.087-.764-.15-.853-.533-.087-.383.15-.764.533-.853 4.195-.96 7.785-.54 10.65 1.21.332.223.435.654.214.987zm1.493-3.264c-.283.437-.853.574-1.29.29-2.957-1.817-7.465-2.34-10.965-1.28-.487.147-.993-.13-1.14-.62s.13-.993.62-1.14c4.01-1.213 9.013-.62 12.443 1.48.437.283.573.853.29 1.29zm.13-3.4c-3.535-2.098-9.39-2.29-12.793-1.257-.543.163-1.11-.147-1.273-.69-.163-.543.147-1.11.69-1.273 3.92-1.19 10.386-.967 14.47 1.45.485.287.646.91.36 1.393-.287.486-.908.647-1.393.36z" /></svg>
                <span>Spotify</span>
              </div>
              <div className="flex items-center space-x-2 text-base md:text-lg">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523c-1.393 0-2.522-1.13-2.522-2.523s1.129-2.522 2.522-2.522h2.52v2.522zm0-2.522a2.528 2.528 0 0 1 2.523-2.52c1.393 0 2.522 1.13 2.522 2.52v7.568c0 1.392-1.129 2.522-2.522 2.522s-2.523-1.13-2.523-2.522v-7.568zm11.33-10.12a2.528 2.528 0 0 1 2.52 2.522c0 1.393-1.13 2.522-2.522 2.522s-2.522-1.13-2.522-2.522v-2.522h2.523zm-2.523 2.522a2.528 2.528 0 0 1-2.52 2.523c-1.393 0-2.522-1.13-2.522-2.523v-7.568C11.332 1.129 12.461 0 13.854 0s2.523 1.129 2.523 2.522v7.568zm2.523 5.043a2.528 2.528 0 0 1 2.522-2.523c1.393 0 2.523 1.13 2.523 2.523s-1.13 2.522-2.523 2.522h-2.523v-2.522zm2.523 2.522a2.528 2.528 0 0 1-2.523 2.522c-1.392 0-2.522-1.13-2.522-2.522v-7.568c0-1.393 1.13-2.522 2.522-2.522s2.523 1.13 2.523 2.522v7.568zm-10.082-5.043a2.528 2.528 0 0 1-2.523 2.523c-1.393 0-2.522-1.13-2.522-2.523s1.129-2.522 2.522-2.522h2.523v2.522zm-2.523-2.522a2.528 2.528 0 0 1 2.523-2.522c1.393 0 2.522 1.13 2.522 2.522v7.568c0 1.392-1.129 2.522-2.522 2.522s-2.523-1.13-2.523-2.522v-7.568z" /></svg>
                <span>Slack</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#171b2d] leading-tight mb-4">
                Everything you need to run your business
              </h2>
              <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
                Powerful features designed to help you manage clients, invoices, and payments without the headache.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-sm border border-slate-100 transition-all group hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                <div className="w-10 h-10 bg-[#f8f9fa] text-[#171b2d] rounded-sm flex items-center justify-center mb-6 border border-slate-50">
                  <FileText size={18} />
                </div>
                <h3 className="text-lg font-bold text-[#171b2d] mb-3">Automated Invoicing</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Set up recurring invoices and send automated reminders. Never miss a payment due to manual errors again.
                </p>
              </div>

              <div className="bg-white p-8 rounded-sm border border-slate-100 transition-all group hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                <div className="w-10 h-10 bg-[#f8f9fa] text-[#171b2d] rounded-sm flex items-center justify-center mb-6 border border-slate-50">
                  <CreditCard size={18} />
                </div>
                <h3 className="text-lg font-bold text-[#171b2d] mb-3">Smart Payments</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Accept credit cards, bank transfers, and cash. Automatically reconcile transactions with your invoices.
                </p>
              </div>

              <div className="bg-white p-8 rounded-sm border border-slate-100 transition-all group hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                <div className="w-10 h-10 bg-[#f8f9fa] text-[#171b2d] rounded-sm flex items-center justify-center mb-6 border border-slate-50">
                  <TrendingUp size={18} />
                </div>
                <h3 className="text-lg font-bold text-[#171b2d] mb-3">Real-time Analytics</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Visualize your cash flow, track expenses, and forecast revenue with our powerful reporting dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#171b2d] leading-tight mb-4 tracking-tight">
                Simple, transparent pricing
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-medium px-4">
                No hidden fees. Change or cancel anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch px-4 md:px-0">
              <div className="bg-white rounded-sm border border-slate-200 p-8 flex flex-col hover:shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all">
                <h3 className="text-slate-400 font-bold mb-3 text-xs uppercase tracking-wider">Starter</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-[#171b2d]">$0</span>
                  <span className="text-slate-300 font-bold text-xs uppercase tracking-tight">/month</span>
                </div>
                <ul className="space-y-3 mb-10 flex-grow">
                  <li className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                    <Check size={14} className="text-[#34d399]" /> 3 Clients
                  </li>
                  <li className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                    <Check size={14} className="text-[#34d399]" /> Unlimited Invoices
                  </li>
                  <li className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                    <Check size={14} className="text-[#34d399]" /> Basic Reporting
                  </li>
                </ul>
                <button className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-bold rounded-sm text-xs transition-all uppercase tracking-tight">
                  Start Free
                </button>
              </div>

              <div className="bg-white rounded-sm border-2 border-[#171b2d] p-8 relative flex flex-col transform md:-translate-y-1 shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
                <div className="absolute top-4 right-4 text-[#4a72ff] text-[9px] font-black uppercase tracking-widest italic">
                  MOST POPULAR
                </div>
                <h3 className="text-[#171b2d] font-bold mb-3 text-xs uppercase tracking-wider">Pro</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-[#171b2d]">$29</span>
                  <span className="text-slate-300 font-bold text-xs uppercase tracking-tight">/month</span>
                </div>
                <ul className="space-y-3 mb-10 flex-grow">
                  <li className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                    <Check size={14} className="text-[#34d399]" /> Unlimited Clients
                  </li>
                  <li className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                    <Check size={14} className="text-[#34d399]" /> Automated Reminders
                  </li>
                  <li className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                    <Check size={14} className="text-[#34d399]" /> Advanced Analytics
                  </li>
                  <li className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                    <Check size={14} className="text-[#34d399]" /> Priority Support
                  </li>
                </ul>
                <button className="w-full py-2.5 px-4 bg-[#171b2d] hover:bg-slate-800 text-white font-bold rounded-sm text-xs transition-all uppercase tracking-tight">
                  Get Started
                </button>
              </div>

              <div className="bg-white rounded-sm border border-slate-200 p-8 flex flex-col hover:shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all">
                <h3 className="text-slate-400 font-bold mb-3 text-xs uppercase tracking-wider">Enterprise</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-[#171b2d]">$99</span>
                  <span className="text-slate-300 font-bold text-xs uppercase tracking-tight">/month</span>
                </div>
                <ul className="space-y-3 mb-10 flex-grow">
                  <li className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                    <Check size={14} className="text-[#34d399]" /> Everything in Pro
                  </li>
                  <li className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                    <Check size={14} className="text-[#34d399]" /> Custom API Integration
                  </li>
                  <li className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                    <Check size={14} className="text-[#34d399]" /> Dedicated Account Manager
                  </li>
                </ul>
                <button className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-bold rounded-sm text-xs transition-all uppercase tracking-tight">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#0B1120] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-6 tracking-tight">Ready to grow your business?</h2>
            <p className="text-slate-400 mb-10 text-sm md:text-lg font-medium opacity-80 max-w-2xl mx-auto leading-relaxed px-4">
              Join thousands of businesses that trust InvoiceFlow to manage their finances. No credit card required.
            </p>
            <Link href="/register" className="inline-block px-10 py-3 bg-white text-[#0B1120] font-bold rounded-sm hover:shadow-xl hover:shadow-slate-800 hover:scale-102 transition-all duration-300 text-sm tracking-tight text-center">
              Get Started for Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white pt-16 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
              <Logo className="mb-6 md:mb-8" />
              <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-[280px] mb-8 tracking-tight">
                Making financial management simple and efficient for modern businesses everywhere.
              </p>
              <div className="flex space-x-6 text-gray-400">
                <Link href="#" className="hover:text-[#171b2d] transition-colors"><Facebook size={18} fill="currentColor" /></Link>
                <Link href="#" className="hover:text-[#171b2d] transition-colors"><Instagram size={18} /></Link>
                <Link href="#" className="hover:text-[#171b2d] transition-colors"><Twitter size={18} fill="currentColor" /></Link>
              </div>
            </div>

            <div className="lg:col-span-2 text-center sm:text-left">
              <h4 className="font-bold text-[#171b2d] text-sm tracking-tight mb-6">Product</h4>
              <nav className="flex flex-col space-y-3 text-[13px] font-bold text-gray-400">
                <Link href="#" className="hover:text-[#171b2d] transition-colors">Features</Link>
                <Link href="#" className="hover:text-[#171b2d] transition-colors">Pricing</Link>
                <Link href="#" className="hover:text-[#171b2d] transition-colors">Integrations</Link>
                <Link href="#" className="hover:text-[#171b2d] transition-colors">Updates</Link>
              </nav>
            </div>

            <div className="lg:col-span-2 text-center sm:text-left">
              <h4 className="font-bold text-[#171b2d] text-sm tracking-tight mb-6">Resources</h4>
              <nav className="flex flex-col space-y-3 text-[13px] font-bold text-gray-400">
                <Link href="#" className="hover:text-[#171b2d] transition-colors">Blog</Link>
                <Link href="#" className="hover:text-[#171b2d] transition-colors">Help Center</Link>
                <Link href="#" className="hover:text-[#171b2d] transition-colors">Guides</Link>
                <Link href="#" className="hover:text-[#171b2d] transition-colors">API Documentation</Link>
              </nav>
            </div>

            <div className="lg:col-span-3 text-center sm:text-left">
              <h4 className="font-bold text-[#171b2d] text-sm tracking-tight mb-6">Company</h4>
              <nav className="flex flex-col space-y-3 text-[13px] font-bold text-gray-400">
                <Link href="#" className="hover:text-[#171b2d] transition-colors">About Us</Link>
                <Link href="#" className="hover:text-[#171b2d] transition-colors">Careers</Link>
                <Link href="#" className="hover:text-[#171b2d] transition-colors">Legal</Link>
                <Link href="#" className="hover:text-[#171b2d] transition-colors">Contact</Link>
              </nav>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between text-[11px] font-bold text-gray-400 tracking-tight gap-4">
            <p className="text-center md:text-left">© 2024 InvoiceFlow Inc. All rights reserved.</p>
            <div className="flex space-x-6 sm:space-x-8">
              <Link href="#" className="hover:text-[#171b2d] transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-[#171b2d] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
