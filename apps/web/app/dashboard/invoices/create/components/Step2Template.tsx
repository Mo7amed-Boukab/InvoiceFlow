'use client';

import React, { useState } from 'react';
import { cn } from '@/components/dashboard/Sidebar';
import { FileDown, Plus } from 'lucide-react';

export function Step2Template({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  const [selected, setSelected] = useState('modern');

  const templates = [
    { id: 'modern', name: 'Modern Professional', desc: 'Clean layout ideal for B2B services.', isPopular: true },
    { id: 'minimalist', name: 'Minimalist', desc: 'Simple and direct. Ink-saving.', isPopular: false },
    { id: 'enterprise', name: 'Enterprise Bold', desc: 'Strong branding column.', isPopular: false },
    { id: 'header', name: 'Header Accent', desc: 'Colorful header for branding.', isPopular: false },
    { id: 'classic', name: 'Classic Serif', desc: 'Traditional and elegant.', isPopular: false },
  ];

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end pb-2">
        <div>
           <h2 className="text-xl font-bold text-slate-800">Choose a Template</h2>
           <p className="text-[14px] text-slate-500 mt-1 font-medium">Select a layout for your invoice or create a custom one.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-sm text-[13px] font-bold text-slate-700 bg-white hover:bg-slate-50">
             <FileDown size={16} /> Import from Google Docs
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-[#171b2d] text-white rounded-sm text-[13px] font-bold hover:bg-slate-800">
             <Plus size={16} /> Create New Template
           </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {templates.map(t => (
          <div key={t.id} className={cn(
             "border rounded-sm p-4 flex flex-col items-center cursor-pointer transition-all",
             selected === t.id ? "border-slate-800 ring-1 ring-slate-800 bg-white" : "border-slate-200 bg-white hover:border-slate-300"
          )} onClick={() => setSelected(t.id)}>
             {/* Thumbnail placeholder */}
             <div className="w-full aspect-[3/4] bg-[#f8fafc] border border-slate-200 mb-4 p-4 flex flex-col rounded-sm relative">
                {t.isPopular && <span className="absolute top-0 right-0 px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-bl-sm">Most Popular</span>}
                <div className="w-8 h-8 rounded bg-slate-800 mb-4"></div>
                <div className="w-2/3 h-2 bg-slate-200 mb-2 rounded"></div>
                <div className="w-1/2 h-2 bg-slate-200 mb-6 rounded"></div>
                <div className="w-full h-8 bg-slate-100 mb-2 rounded"></div>
                <div className="w-full h-8 bg-slate-100 rounded"></div>
             </div>
             <div className="w-full">
               <h3 className="text-[13px] font-bold text-slate-800">{t.name}</h3>
               <p className="text-[11px] text-slate-500 font-medium mt-1 min-h-[32px]">{t.desc}</p>
               <button className={cn(
                 "w-full py-2 mt-4 text-[12px] font-bold rounded-sm border transition-colors",
                 selected === t.id ? "bg-[#171b2d] text-white border-transparent" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
               )}>
                 {selected === t.id ? "Use Template" : "Preview"}
               </button>
             </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-2">
        <button className="text-[13px] font-bold text-slate-400 hover:text-slate-600">Show more templates</button>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
        <button onClick={onBack} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-sm text-[13px] font-bold hover:bg-slate-50">
          Back
        </button>
        <div className="flex items-center gap-4">
          <span className="text-[13px] font-medium text-slate-500">Template: <span className="text-slate-800 font-bold">Modern Professional</span></span>
          <button onClick={onNext} className="px-6 py-2.5 bg-[#171b2d] text-white rounded-sm text-[13px] font-bold hover:bg-slate-800 transition-colors">
            Next: Details
          </button>
        </div>
      </div>
    </div>
  );
}
