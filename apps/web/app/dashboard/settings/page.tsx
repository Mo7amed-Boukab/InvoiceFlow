'use client';

import React, { useState } from 'react';
import { Building2, Scale, CreditCard, Mail, ShieldAlert, Upload, Pencil } from 'lucide-react';
import { cn } from '@/components/dashboard/Sidebar';
import { Input, Textarea } from '@/components/ui/FormElements';
import { CustomSelect } from '@/components/ui/CustomSelect';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('company');

  const tabs = [
    { id: 'company', label: 'Company Profile', icon: Building2 },
    { id: 'tax', label: 'Tax Rules', icon: Scale },
    { id: 'payments', label: 'Payment Integrations', icon: CreditCard },
    { id: 'emails', label: 'Email Templates', icon: Mail },
    { id: 'security', label: 'Security & Permissions', icon: ShieldAlert },
  ];

  return (
    <div className="max-w-[1100px] w-full pt-4 space-y-8 flex flex-col">
      {/* Page Header */}
      <div>
        <h1 className="text-[22px] font-bold text-slate-800">Settings</h1>
        <p className="text-[14px] text-slate-500 mt-1 font-medium">Manage your company details and application preferences.</p>
      </div>

      <div className="flex items-start gap-12 flex-1 pb-10">
        {/* Left Side Navigation */}
        <div className="w-64 shrink-0 flex flex-col space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 text-[13px] font-bold transition-colors text-left",
                activeTab === tab.id 
                  ? "bg-white border-l-2 border-slate-800 text-slate-800"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-l-2 border-transparent"
              )}
            >
              <tab.icon size={18} strokeWidth={2.5} className={activeTab === tab.id ? "text-slate-800" : "text-slate-400"} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white border border-slate-200 rounded-sm">
            {/* Form Header */}
            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-[15px] font-bold text-slate-800">Company Profile</h2>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-sm border border-emerald-100 uppercase tracking-wider">Active</span>
            </div>

            {/* Form Body */}
            <div className="p-8 space-y-8">
              
              {/* Logo Upload */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 relative shrink-0">
                  <Upload size={24} className="text-slate-400" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#171b2d] rounded-full flex items-center justify-center border-2 border-white cursor-pointer hover:bg-slate-800">
                    <Pencil size={10} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-slate-800 mb-1">Company Logo</h3>
                  <p className="text-[12px] font-medium text-slate-500 mb-3">This logo will appear on your invoices.<br/>Recommended size: 300x300px. JPG or PNG.</p>
                  <div className="flex gap-3">
                    <button className="px-4 py-1.5 bg-white border border-slate-200 rounded-sm text-[12px] font-bold text-slate-700 hover:bg-slate-50">Upload New</button>
                    <button className="px-4 py-1.5 text-[12px] font-bold text-red-600 hover:text-red-700">Remove</button>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-5">
                <Input label="Company Name" defaultValue="Acme Corp" className="h-11 font-bold text-slate-800" />
                <div className="grid grid-cols-2 gap-6">
                  <Input label="Contact Email" defaultValue="billing@acmecorp.com" className="h-11 font-bold text-slate-800" />
                  <Input label="Phone Number" defaultValue="+1 (555) 012-3456" className="h-11 font-bold text-slate-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-slate-800">Address</label>
                  <Textarea defaultValue="123 Innovation Drive, Tech Valley, CA 94043" className="min-h-[80px] font-bold text-slate-800" />
                </div>
              </div>

              {/* Legal Info */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-4">Legal Identification</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Input label="ICE / TAX ID" defaultValue="0000000000000" className="h-11 font-bold text-slate-800" />
                  <Input label="RC / REG. NO" defaultValue="123456" className="h-11 font-bold text-slate-800" />
                  <Input label="IF / FISCAL ID" defaultValue="98765432" className="h-11 font-bold text-slate-800" />
                </div>
              </div>

              {/* Regional */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-4">Regional Settings</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <CustomSelect label="Default Currency" options={[{label: 'USD - US Dollar ($)', value: 'usd'}]} value="usd" onChange={()=>{}} placeholder="" />
                  </div>
                  <div className="space-y-2">
                     <CustomSelect label="Interface Language" options={[{label: 'English (US)', value: 'en'}]} value="en" onChange={()=>{}} placeholder="" />
                  </div>
                </div>
              </div>

            </div>

            {/* Form Footer */}
            <div className="px-8 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center rounded-b-sm">
              <span className="text-[12px] font-medium text-slate-400">Last saved 2 minutes ago</span>
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-white border border-slate-200 rounded-sm text-[13px] font-bold text-slate-700 hover:bg-slate-50">Cancel</button>
                <button className="px-6 py-2 bg-[#171b2d] text-white rounded-sm text-[13px] font-bold hover:bg-slate-800">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
