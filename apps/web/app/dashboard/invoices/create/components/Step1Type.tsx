'use client';

import React, { useState } from 'react';
import { FileText, ShoppingCart, Truck, ClipboardList, Check } from 'lucide-react';
import { cn } from '@/components/dashboard/Sidebar';

export function Step1Type({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState('sales');

  const types = [
    { id: 'sales', title: 'Sales Invoice', desc: 'Standard bill for products or services sold to a customer.', icon: FileText },
    { id: 'purchase', title: 'Purchase Invoice', desc: 'Record a bill received from a supplier for goods or services.', icon: ShoppingCart },
    { id: 'delivery', title: 'Delivery Note', desc: 'Proof of delivery for physical goods sent to a customer.', icon: Truck },
    { id: 'order', title: 'Purchase Order', desc: 'Formal request to buy goods or services from a vendor.', icon: ClipboardList },
  ];

  return (
    <div className="flex flex-col h-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold text-slate-800">What type of document do you want to create?</h2>
        <p className="text-[14px] text-slate-500 mt-1 font-medium pb-4">Select the document type to configure the correct fields and tax rules.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {types.map((type) => (
          <div 
            key={type.id}
            onClick={() => setSelected(type.id)}
            className={cn(
               "relative p-6 border rounded-sm cursor-pointer transition-all",
               selected === type.id ? "border-slate-800 bg-white ring-1 ring-slate-800" : "border-slate-200 bg-white hover:border-slate-300"
            )}
          >
            <div className="w-10 h-10 rounded text-slate-700 bg-slate-50 flex items-center justify-center mb-4">
               <type.icon size={20} strokeWidth={2.5} />
            </div>
            <h3 className="text-[14px] font-bold text-slate-800 mb-1">{type.title}</h3>
            <p className="text-[12px] text-slate-500 font-medium">{type.desc}</p>
            {selected === type.id && (
              <div className="absolute top-4 right-4 bg-[#171b2d] text-white rounded-full w-5 h-5 flex items-center justify-center">
                <Check size={12} strokeWidth={3} className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
        <button onClick={onNext} className="px-6 py-2.5 bg-[#171b2d] text-white rounded-sm text-[13px] font-bold hover:bg-slate-800 transition-colors">
          Next Step →
        </button>
      </div>
    </div>
  );
}
