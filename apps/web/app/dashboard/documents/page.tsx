'use client';

import React from 'react';
import { 
  FileText, 
  RefreshCw, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus,
  Upload
} from 'lucide-react';
import { cn } from '@/components/dashboard/Sidebar';

export default function DocumentsTemplatesPage() {
  const templates = [
    {
      id: 1,
      title: 'Standard Sales Invoice',
      category: 'Sales Invoice',
      categoryColor: 'text-blue-600',
      categoryBg: 'bg-blue-50',
      modified: 'Modified 2h ago',
    },
    {
      id: 2,
      title: 'Q3 Purchase Order',
      category: 'Purchase Order',
      categoryColor: 'text-purple-600',
      categoryBg: 'bg-purple-50',
      modified: 'Modified 1d ago',
    },
    {
      id: 3,
      title: 'Delivery Note Template',
      category: 'Delivery Note',
      categoryColor: 'text-orange-600',
      categoryBg: 'bg-orange-50',
      modified: 'Modified 3d ago',
    },
    {
      id: 4,
      title: 'Enterprise Invoice v2',
      category: 'Sales Invoice',
      categoryColor: 'text-blue-600',
      categoryBg: 'bg-blue-50',
      modified: 'Modified 1w ago',
    },
    {
      id: 5,
      title: 'Proforma Invoice',
      category: 'Draft',
      categoryColor: 'text-slate-500',
      categoryBg: 'bg-slate-100',
      modified: 'Modified 2w ago',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 flex flex-col pt-2 w-full">
      {/* Top Banner Actions */}
      <div className="flex justify-end gap-3 shrink-0">
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-sm text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors">
          <RefreshCw size={16} /> Connect Google Account
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#171b2d] text-white rounded-sm text-[13px] font-bold hover:bg-slate-800 transition-colors">
          <Upload size={16} /> Import Template
        </button>
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-sm text-[13px] font-bold hover:bg-blue-700 transition-colors">
          <Plus size={16} strikeWidth={3}/> Create Template
        </button>
      </div>

      {/* Google Integration Block */}
      <div className="bg-white border border-slate-200 rounded-sm p-6 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-sm flex items-center justify-center text-blue-600">
            <FileText size={24} fill="currentColor" className="text-blue-100" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-[15px] font-bold text-slate-800">Google Docs Integration</h2>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Connected
              </span>
            </div>
            <p className="text-[13px] font-medium text-slate-500">Connected as <span className="font-bold text-slate-700">contact@invoiceflow.io</span></p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[13px] font-bold text-slate-500 hover:text-slate-800">Manage Connection</button>
          <button className="flex items-center gap-2 px-4 py-1.5 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-700 hover:bg-slate-50">
            <RefreshCw size={14} /> Sync
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-4 items-center shrink-0">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input 
            type="text" 
            placeholder="Search templates by name..." 
            className="w-full bg-white border border-slate-200 rounded-sm py-2.5 pl-11 pr-4 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all font-bold"
          />
        </div>
        
        <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-sm px-4 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-all ml-auto">
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-4 gap-6 pt-2 pb-10 flex-1 content-start">
        {templates.map(t => (
          <div key={t.id} className="bg-white border border-slate-200 rounded-sm flex flex-col group cursor-pointer hover:border-slate-300 transition-colors">
            {/* Thumbnail */}
            <div className="h-[200px] bg-slate-50 border-b border-slate-100 flex flex-col p-6 items-center justify-center relative overflow-hidden">
               {/* Skeleton blocks representing invoice template */}
               <div className="w-full space-y-3">
                 <div className="w-1/3 h-2 bg-slate-200 rounded"></div>
                 <div className="w-full h-8 bg-white border border-slate-200 rounded"></div>
                 <div className="w-2/3 h-2 bg-slate-200 rounded"></div>
                 <div className="w-3/4 h-2 bg-slate-200 rounded"></div>
               </div>
            </div>
            
            {/* Info */}
            <div className="p-4 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-[14px] font-bold text-slate-800 pr-2 leading-tight">{t.title}</h3>
                <button className="text-slate-400 hover:text-slate-600 p-0.5">
                  <MoreVertical size={16} />
                </button>
              </div>
              <p className={cn("text-[11px] font-bold", t.categoryColor)}>{t.category}</p>
              <div className="mt-auto pt-4 flex justify-between items-end">
                <p className="text-[11px] font-medium text-slate-400">{t.modified}</p>
                <FileText size={14} className="text-slate-300" />
              </div>
            </div>
          </div>
        ))}

        {/* Create New Block */}
        <div className="border border-slate-300 border-dashed rounded-sm bg-[#f8fafc] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-blue-400 transition-colors min-h-[320px] text-center p-6 group">
          <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
            <Plus size={24} strokeWidth={2.5} />
          </div>
          <h3 className="text-[14px] font-bold text-slate-800 mb-2">Create New Template</h3>
          <p className="text-[12px] font-medium text-slate-500">Start from scratch or pick a predefined layout</p>
        </div>
      </div>
    </div>
  );
}
