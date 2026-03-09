import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';

// Shared Auth Logo Component
const AuthLogo = ({ light = false }: { light?: boolean }) => (
    <div className={`flex items-center space-x-2 font-heading font-bold text-xl ${light ? 'text-white' : 'text-[#171b2d]'}`}>
        <div className={`${light ? 'bg-white text-[#171b2d]' : 'bg-[#171b2d] text-white'} p-1.5 rounded flex items-center justify-center border border-slate-100/10`}>
            <FileText size={20} strokeWidth={2} />
        </div>
        <span className="tracking-tight capitalize text-2xl font-heading">Invoice Flow</span>
    </div>
);

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col lg:flex-row h-screen bg-white font-sans selection:bg-[#171b2d] selection:text-white overflow-hidden">

            {/* Left Panel - Image Section */}
            <div className="hidden lg:flex lg:w-1/2 relative h-full">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop")'
                    }}
                />
                {/* Dark Overlay Layer */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

                {/* Content on top of image */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 text-white">
                    <Link href="/">
                        <AuthLogo light />
                    </Link>

                    <div className="max-w-lg mb-12">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight leading-tight mb-6">
                            Bienvenue Chez <br /> InvoiceFlow
                        </h1>
                        <p className="text-slate-300 text-base md:text-lg mb-10 leading-relaxed font-medium opacity-90">
                            Votre destination unique pour la gestion financière de qualité. Connectez-vous pour explorer des outils exclusifs et gérer vos factures.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="h-0.5 w-12 bg-white/30 rounded-full" />
                            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/50">Trusted by 500+ teams</span>
                        </div>
                    </div>

                    <div className="text-slate-500 text-[10px] font-bold tracking-widest uppercase flex items-center justify-between">
                        <p>© {new Date().getFullYear()} InvoiceFlow Inc.</p>
                        <div className="flex space-x-4 opacity-50">
                            <Link href="#" className="hover:text-white transition-colors">Legal</Link>
                            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form Container */}
            <div className="flex w-full lg:w-1/2 h-full flex-col items-center justify-center p-6 sm:p-12 lg:p-20 bg-white overflow-y-auto">
                <div className="w-full max-w-sm">
                    {/* Mobile Logo visibility */}
                    <div className="flex lg:hidden items-center justify-center mb-10">
                        <Link href="/">
                            <AuthLogo />
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
