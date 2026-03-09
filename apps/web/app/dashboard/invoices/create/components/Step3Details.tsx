'use client';

import React from 'react';
import { Plus, Info, List, Search, Upload, Eye, Download, Send, FileText } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/FormElements';
import { CustomSelect } from '@/components/ui/CustomSelect';

export function Step3Details({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6">
        
        {/* Invoice Details Section */}
        <div>
           <h3 className="flex items-center gap-2 text-[15px] font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
             <Info size={18} className="text-slate-400" /> Invoice Details
           </h3>
           <div className="grid grid-cols-12 gap-6">
             <div className="col-span-6 space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Client</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="Search or select client..." className="w-full bg-white border border-slate-200 rounded-sm py-2 pl-9 pr-4 text-[13px] text-slate-800 font-bold focus:ring-1 focus:ring-slate-300 outline-none transition-all" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-bold text-slate-800 hover:text-slate-600">+ New</button>
                </div>
             </div>
             <div className="col-span-3 space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Invoice #</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-slate-200 bg-slate-50 text-[13px] font-bold text-slate-500 rounded-l-sm">INV-</span>
                  <input type="text" defaultValue="2023-0042" className="flex-1 w-full bg-white border border-slate-200 rounded-r-sm p-2 text-[13px] font-bold text-slate-800 focus:ring-1 focus:ring-slate-300 outline-none transition-all" />
                </div>
             </div>
             <div className="col-span-3 space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Currency</label>
                <CustomSelect placeholder="" options={[{label: 'USD ($)', value: 'usd'}]} value="usd" onChange={()=>{}} />
             </div>
             
             <div className="col-span-4 space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Issue Date</label>
                <input type="text" defaultValue="10/25/2023" className="w-full bg-white border border-slate-200 rounded-sm p-2 text-[13px] font-bold text-slate-800 focus:ring-1 focus:ring-slate-300 outline-none" />
             </div>
             <div className="col-span-4 space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Due Date</label>
                <input type="text" defaultValue="11/25/2023" className="w-full bg-white border border-slate-200 rounded-sm p-2 text-[13px] font-bold text-slate-800 focus:ring-1 focus:ring-slate-300 outline-none" />
             </div>
             <div className="col-span-4 space-y-2 lg:col-span-4">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Payment Terms</label>
                <CustomSelect placeholder="" options={[{label: 'Net 30', value: 'net30'}]} value="net30" onChange={()=>{}} />
             </div>
           </div>
        </div>

        {/* Items Section */}
        <div className="pt-4">
           <h3 className="flex items-center gap-2 text-[15px] font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">
             <List size={18} className="text-slate-400" /> Items
           </h3>
           <div className="grid grid-cols-12 gap-4 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wide px-2">
             <div className="col-span-5">Item Details</div>
             <div className="col-span-2 text-center">Qty</div>
             <div className="col-span-2 text-center">Price</div>
             <div className="col-span-2">Tax</div>
             <div className="col-span-1 text-right">Total</div>
           </div>
           
           <div className="space-y-4">
             {/* Row 1 */}
             <div className="grid grid-cols-12 gap-4 items-start">
               <div className="col-span-5 space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input type="text" defaultValue="Web Development Services" className="w-full bg-white border border-slate-200 rounded-sm py-2 pl-9 pr-3 text-[13px] font-bold text-slate-800 focus:ring-1 focus:ring-slate-300 outline-none" />
                  </div>
                  <Textarea className="min-h-[50px] text-[13px]" defaultValue="Frontend implementation of the dashboard module." />
               </div>
               <div className="col-span-2 flex flex-col items-center">
                 <input type="number" defaultValue={40} className="w-full text-center bg-white border border-slate-200 rounded-sm p-2 text-[13px] font-bold text-slate-800 focus:ring-1 focus:ring-slate-300 outline-none" />
                 <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Hours</span>
               </div>
               <div className="col-span-2">
                 <div className="relative">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[13px] font-medium">$</span>
                   <input type="text" defaultValue="150.00" className="w-full bg-white border border-slate-200 rounded-sm py-2 pl-7 pr-2 text-right text-[13px] font-bold text-slate-800 focus:ring-1 focus:ring-slate-300 outline-none" />
                 </div>
               </div>
               <div className="col-span-2">
                 <CustomSelect options={[{label: 'VAT (15%)', value: 'vat'}]} value="vat" onChange={()=>{}} placeholder="" />
               </div>
               <div className="col-span-1 flex items-center justify-end h-[38px]">
                 <span className="text-[13px] font-bold text-slate-800">$6,000.00</span>
               </div>
             </div>

             {/* Row 2 */}
             <div className="grid grid-cols-12 gap-4 items-start pt-2">
               <div className="col-span-5 space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input type="text" defaultValue="Hosting - Standard Plan" className="w-full bg-white border border-slate-200 rounded-sm py-2 pl-9 pr-3 text-[13px] font-bold text-slate-800 focus:ring-1 focus:ring-slate-300 outline-none" />
                  </div>
                  <Textarea className="min-h-[50px] text-[13px]" defaultValue="Annual subscription for cloud hosting." />
               </div>
               <div className="col-span-2 flex flex-col items-center">
                 <input type="number" defaultValue={1} className="w-full text-center bg-white border border-slate-200 rounded-sm p-2 text-[13px] font-bold text-slate-800 focus:ring-1 focus:ring-slate-300 outline-none" />
                 <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Year</span>
               </div>
               <div className="col-span-2">
                 <div className="relative">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[13px] font-medium">$</span>
                   <input type="text" defaultValue="240.00" className="w-full bg-white border border-slate-200 rounded-sm py-2 pl-7 pr-2 text-right text-[13px] font-bold text-slate-800 focus:ring-1 focus:ring-slate-300 outline-none" />
                 </div>
               </div>
               <div className="col-span-2">
                 <CustomSelect options={[{label: 'GST (10%)', value: 'gst'}]} value="gst" onChange={()=>{}} placeholder="" />
               </div>
               <div className="col-span-1 flex items-center justify-end h-[38px]">
                 <span className="text-[13px] font-bold text-slate-800">$240.00</span>
               </div>
             </div>

             <div className="pt-2">
               <button className="flex items-center gap-2 text-[13px] font-bold text-slate-700 hover:text-slate-900 transition-colors">
                 <Plus size={16} /> Add Line Item
               </button>
             </div>
           </div>
        </div>

        {/* Footer info & Totals */}
        <div className="grid grid-cols-12 gap-8 pt-8 border-t border-slate-100 pb-8">
           <div className="col-span-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-800">Notes & Terms</label>
                <Textarea placeholder="Add terms, conditions, or a personal note..." className="min-h-[100px] text-[13px]" />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-800">Attachments</label>
                <div className="flex flex-col items-center justify-center p-6 border border-dashed border-slate-300 rounded-sm bg-[#FCFCFC] cursor-pointer hover:bg-slate-50 transition-colors text-slate-500">
                   <Upload size={20} className="mb-2" />
                   <p className="text-[12px] font-medium"><span className="font-bold text-slate-800">Click to upload</span> or drag and drop</p>
                </div>
              </div>
           </div>
           
           <div className="col-span-6 pt-4">
              <div className="space-y-3 pb-4 border-b border-slate-100">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-slate-500">Subtotal</span>
                  <span className="font-bold text-slate-800">$6,240.00</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-500">Discount</span>
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded">10% OFF</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-medium">- 10%</span>
                    <span className="font-bold text-red-500">-$624.00</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-slate-500">Tax (VAT 15%)</span>
                  <span className="font-bold text-slate-800">$842.40</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-slate-500">Tax (GST 10%)</span>
                  <span className="font-bold text-slate-800">$24.00</span>
                </div>
              </div>
              <div className="flex justify-between items-end pt-4">
                <span className="text-[16px] font-bold text-slate-800">Grand Total</span>
                <div className="text-right">
                   <span className="text-[22px] font-black text-slate-800 block leading-tight">$6,482.40</span>
                   <span className="text-[11px] font-bold text-slate-400 mt-1 block">Balance Due: $6,482.40</span>
                </div>
              </div>
           </div>
        </div>

      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center bg-white sticky bottom-0 z-20 pb-6">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-sm text-[13px] font-bold hover:bg-slate-50 transition-colors">
          <FileText size={16} /> Save Draft
        </button>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-slate-700 hover:text-slate-900 transition-colors">
            <Eye size={16} /> Preview
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-sm text-[13px] font-bold hover:bg-slate-50 transition-colors">
            <Download size={16} /> Download PDF
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#171b2d] text-white rounded-sm text-[13px] font-bold hover:bg-slate-800 transition-colors shadow-none">
            Send Invoice <Send size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
