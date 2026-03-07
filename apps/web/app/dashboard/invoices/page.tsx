'use client';

import React from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Download,
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { cn } from '@/components/dashboard/Sidebar';
import { ReusableTable } from '@/components/ui/ReusableTable';
import { useRouter } from 'next/navigation';

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: { name: string; email: string; initials: string; textColor: string; bgColor: string };
  type: string;
  typeColor: string;
  amount: string;
  status: 'Paid' | 'Overdue' | 'Draft' | 'Partial';
  dueDate: string;
}

const invoiceData: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2023-001',
    client: { name: 'Acme Corp', email: 'tech@acme.com', initials: 'AC', textColor: 'text-blue-600', bgColor: 'bg-blue-100' },
    type: 'Sales',
    typeColor: 'text-indigo-600',
    amount: '$12,450.00',
    status: 'Paid',
    dueDate: 'Oct 24, 2023',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2023-002',
    client: { name: 'BuildRight LLC', email: 'billing@buildright.com', initials: 'BR', textColor: 'text-purple-600', bgColor: 'bg-purple-100' },
    type: 'Purchase',
    typeColor: 'text-orange-600',
    amount: '$3,500.00',
    status: 'Overdue',
    dueDate: 'Oct 10, 2023',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2023-003',
    client: { name: 'BlueWave Inc', email: 'david@bluewave.com', initials: 'BW', textColor: 'text-emerald-600', bgColor: 'bg-emerald-100' },
    type: 'Sales',
    typeColor: 'text-indigo-600',
    amount: '$85,000.00',
    status: 'Draft',
    dueDate: 'Nov 01, 2023',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2023-004',
    client: { name: 'MarketSquare', email: 'emma@marketsquare.com', initials: 'MS', textColor: 'text-pink-600', bgColor: 'bg-pink-100' },
    type: 'Sales',
    typeColor: 'text-indigo-600',
    amount: '$450.00',
    status: 'Partial',
    dueDate: 'Oct 30, 2023',
  },
  {
    id: '5',
    invoiceNumber: 'INV-2023-005',
    client: { name: 'GreenLeaf', email: 'james@greenleaf.com', initials: 'GL', textColor: 'text-green-600', bgColor: 'bg-green-100' },
    type: 'Purchase',
    typeColor: 'text-orange-600',
    amount: '$12,580.00',
    status: 'Paid',
    dueDate: 'Oct 20, 2023',
  }
];

export default function InvoicesPage() {
  const router = useRouter();

  const columns = [
    {
      header: 'INVOICE #',
      cell: (i: Invoice) => (
        <span className="text-[13px] font-bold text-slate-800">{i.invoiceNumber}</span>
      )
    },
    {
      header: 'CLIENT',
      cell: (i: Invoice) => (
        <div className="flex items-center gap-3">
          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold", i.client.bgColor, i.client.textColor)}>
            {i.client.initials}
          </div>
          <div>
            <p className="text-[13px] font-bold text-slate-800 leading-tight">{i.client.name}</p>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">{i.client.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'TYPE',
      cell: (i: Invoice) => (
        <div className="inline-flex px-2.5 py-1 rounded-full border border-slate-200">
           <span className={cn("text-[11px] font-bold", i.typeColor)}>{i.type}</span>
        </div>
      )
    },
    {
      header: 'AMOUNT',
      cell: (i: Invoice) => (
        <p className="text-[14px] font-bold text-slate-800">{i.amount}</p>
      )
    },
    {
      header: 'STATUS',
      cell: (i: Invoice) => (
        <div className="flex items-center gap-2">
          <span className={cn(
            "w-1.5 h-1.5 rounded-full",
            i.status === 'Paid' && 'bg-emerald-500',
            i.status === 'Overdue' && 'bg-red-500',
            i.status === 'Draft' && 'bg-slate-400',
            i.status === 'Partial' && 'bg-amber-400'
          )}></span>
          <span className={cn(
            "text-[12px] font-bold",
            i.status === 'Paid' && 'text-emerald-500',
            i.status === 'Overdue' && 'text-red-500',
            i.status === 'Draft' && 'text-slate-500',
            i.status === 'Partial' && 'text-amber-500'
          )}>
            {i.status}
          </span>
        </div>
      )
    },
    {
      header: 'DUE DATE',
      cell: (i: Invoice) => (
        <p className={cn(
          "text-[13px] font-medium",
          i.status === 'Overdue' ? "text-red-500 font-bold" : "text-slate-500"
        )}>
          {i.dueDate}
        </p>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 flex flex-col">
      
      {/* Metric Cards Summary */}
      <div className="grid grid-cols-4 gap-6 shrink-0">
        {[
          { label: 'Total Invoices', value: '1,450', textColor: 'text-slate-800' },
          { label: 'Paid Amount', value: '125,400 DH', textColor: 'text-slate-800' },
          { label: 'Pending Amount', value: '45,000 DH', textColor: 'text-slate-800' },
          { label: 'Overdue Amount', value: '12,800 DH', textColor: 'text-slate-800' },
        ].map((card, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-6 rounded-sm">
            <p className={cn("text-2xl font-bold mb-1", card.textColor)}>{card.value}</p>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex justify-between items-center shrink-0 pt-2">
        <div className="relative w-[320px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input 
            type="text" 
            placeholder="Search invoices by client, #ID..." 
            className="w-full bg-white border border-slate-200 rounded-sm py-2.5 pl-11 pr-4 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all font-bold"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-sm px-4 py-2 text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-all">
            <Filter size={16} />
            <span>Filters</span>
          </button>

          <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-sm px-4 py-2 text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-all">
            <Download size={16} />
            <span>Export</span>
          </button>
          
          <button 
            onClick={() => router.push('/dashboard/invoices/create')}
            className="flex items-center gap-2 px-6 py-2 bg-[#171b2d] text-white rounded-sm text-[13px] font-bold hover:bg-slate-800 transition-all active:scale-[0.98]"
          >
            <Plus size={16} strokeWidth={2.5}/>
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <ReusableTable columns={columns} data={invoiceData} />

      {/* Pagination Footer */}
      <div className="flex justify-between items-center py-2 text-[12px] font-bold text-slate-400 shrink-0">
        <p>Showing <span className="text-slate-800">1 - {invoiceData.length}</span> of <span className="text-slate-800">1,450</span> items</p>
        <div className="flex items-center gap-3">
          <button className="p-1.5 bg-white border border-slate-200 rounded-sm text-slate-400 hover:text-slate-600 transition-colors active:scale-95">
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-sm bg-[#171b2d] text-white flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-sm text-slate-500 hover:bg-slate-50 flex items-center justify-center transition-colors">2</button>
            <button className="w-8 h-8 rounded-sm text-slate-500 hover:bg-slate-50 flex items-center justify-center transition-colors">3</button>
            <span className="px-1 text-slate-300">...</span>
            <button className="w-8 h-8 rounded-sm text-slate-500 hover:bg-slate-50 flex items-center justify-center transition-colors">42</button>
          </div>
          <button className="p-1.5 bg-white border border-slate-200 rounded-sm text-slate-400 hover:text-slate-600 transition-colors active:scale-95">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
