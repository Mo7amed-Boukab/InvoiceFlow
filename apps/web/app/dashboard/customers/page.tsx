'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/components/dashboard/Sidebar';
import { ReusableTable } from '@/components/ui/ReusableTable';
import { RightModal } from '@/components/ui/RightModal';
import { Input, Textarea, Switch } from '@/components/ui/FormElements';
import { CustomSelect } from '@/components/ui/CustomSelect';

interface Client {
  id: number;
  company: string;
  industry: string;
  contact: string;
  email: string;
  initials: string;
  payment: string;
  status: 'Active' | 'Overdue' | 'Archived';
  lastActivity: string;
}

const clientData: Client[] = [
  {
    id: 1,
    company: 'Acme Corp',
    industry: 'Tech & Software',
    contact: 'Sarah Connor',
    email: 'sarah@acme.com',
    initials: 'SC',
    payment: '12,450 DH',
    status: 'Active',
    lastActivity: '2 mins ago',
  },
  {
    id: 2,
    company: 'BuildRight LLC',
    industry: 'Construction',
    contact: 'Mike Johnson',
    email: 'mike@buildright.com',
    initials: 'MJ',
    payment: '3,500 DH',
    status: 'Overdue',
    lastActivity: '3 days ago',
  },
  {
    id: 3,
    company: 'BlueWave Inc',
    industry: 'Consulting',
    contact: 'David Chen',
    email: 'david@bluewave.com',
    initials: 'DC',
    payment: '85,000 DH',
    status: 'Active',
    lastActivity: '1 week ago',
  },
  {
    id: 4,
    company: 'MarketSquare',
    industry: 'Retail',
    contact: 'Emma Lewis',
    email: 'emma@marketsquare.com',
    initials: 'EL',
    payment: '0.00 DH',
    status: 'Archived',
    lastActivity: '2 month ago',
  },
  {
    id: 5,
    company: 'GreenLeaf',
    industry: 'Agriculture',
    contact: 'James Wilson',
    email: 'james@greenleaf.com',
    initials: 'JW',
    payment: '12,580 DH',
    status: 'Active',
    lastActivity: '5 hours ago',
  }
];

export default function CustomersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const columns = [
    {
      header: 'Company',
      cell: (c: Client) => (
        <div>
          <p className="text-[13px] font-bold text-slate-800 leading-tight">{c.company}</p>
          <p className="text-[11px] font-bold text-slate-400 mt-0.5">{c.industry}</p>
        </div>
      )
    },
    {
      header: 'Contact',
      cell: (c: Client) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-slate-100 flex items-center justify-center text-[12px] font-bold text-slate-500 border border-slate-200/50">
            {c.initials}
          </div>
          <div>
            <p className="text-[13px] font-bold text-slate-800 leading-tight">{c.contact}</p>
            <p className="text-[11px] font-bold text-slate-400 mt-0.5 tracking-tight">{c.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Outcoming Payment',
      align: 'right' as const,
      cell: (c: Client) => (
        <span className={cn(
          "text-[14px] font-bold",
          c.status === 'Overdue' ? 'text-red-500' : 'text-slate-700'
        )}>
          {c.payment}
        </span>
      )
    },
    {
      header: 'Status',
      align: 'center' as const,
      cell: (c: Client) => (
        <div className="flex items-center justify-center gap-2">
          <span className={cn(
            "w-1.5 h-1.5 rounded-full",
            c.status === 'Active' && 'bg-emerald-500',
            c.status === 'Overdue' && 'bg-red-500',
            c.status === 'Archived' && 'bg-slate-400'
          )}></span>
          <span className={cn(
            "text-[12px] font-bold",
            c.status === 'Active' && 'text-emerald-500',
            c.status === 'Overdue' && 'text-red-500',
            c.status === 'Archived' && 'text-slate-400'
          )}>
            {c.status}
          </span>
        </div>
      )
    },
    {
      header: 'Last Activity',
      cell: (c: Client) => (
        <p className="text-[12px] font-bold text-slate-400">{c.lastActivity}</p>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 flex flex-col">
      
      {/* Top Action Bar */}
      <div className="flex justify-end items-center gap-3 shrink-0">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2 bg-[#171b2d] text-white rounded-sm text-[13px] font-bold hover:bg-slate-800 transition-all active:scale-[0.98]"
        >
          <Plus size={16} strokeWidth={2.5}/>
          <span>Add Client</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-4 items-center shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input 
            type="text" 
            placeholder="Search by name, email, or company..." 
            className="w-full bg-white border border-slate-200 rounded-sm py-2.5 pl-11 pr-4 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all font-bold"
          />
        </div>
        
        <CustomSelect 
          options={[
            { label: 'Status: All', value: 'all' },
            { label: 'Status: Active', value: 'active' },
            { label: 'Status: Overdue', value: 'overdue' },
            { label: 'Status: Archived', value: 'archived' },
          ]}
          value={selectedStatus}
          onChange={setSelectedStatus}
          className="w-[180px]"
        />

        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-sm px-4 py-2.5 text-[13px] font-bold text-slate-700 cursor-pointer hover:bg-slate-50">
          <span>Balance: Any</span>
          <ChevronRight size={14} className="rotate-90 text-slate-400" />
        </div>
        
        <button className="bg-white border border-slate-200 p-2.5 rounded-sm hover:bg-slate-50 transition-all text-slate-600 active:scale-95">
          <Filter size={18} />
        </button>
      </div>

      {/* Table Container */}
      <ReusableTable columns={columns} data={clientData} />

      {/* Pagination Footer */}
      <div className="flex justify-between items-center py-2 text-[12px] font-bold text-slate-400 shrink-0">
        <p>Showing <span className="text-slate-800">1 - {clientData.length}</span> of <span className="text-slate-800">1,248</span> items</p>
        <div className="flex items-center gap-3">
          <button className="p-1.5 bg-white border border-slate-200 rounded-sm text-slate-400 hover:text-slate-600 transition-colors shadow-sm active:scale-95">
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-sm bg-[#171b2d] text-white flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-sm text-slate-500 hover:bg-slate-50 flex items-center justify-center transition-colors">2</button>
            <button className="w-8 h-8 rounded-sm text-slate-500 hover:bg-slate-50 flex items-center justify-center transition-colors">3</button>
            <span className="px-1 text-slate-300">...</span>
            <button className="w-8 h-8 rounded-sm text-slate-500 hover:bg-slate-50 flex items-center justify-center transition-colors">42</button>
          </div>
          <button className="p-1.5 bg-white border border-slate-200 rounded-sm text-slate-400 hover:text-slate-600 transition-colors shadow-sm active:scale-95">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Add Client Modal */}
      <RightModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Client"
        footer={
          <div className="flex gap-3">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-3 px-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-sm text-[13px] hover:bg-slate-50 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
            <button 
              className="flex-1 py-3 px-4 bg-[#171b2d] text-white font-bold rounded-sm text-[13px] hover:bg-slate-800 transition-all active:scale-[0.98]"
            >
              Add Client
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input label="Company Name" placeholder="Ex : Acme Corp" className="h-10" />
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="Ex : Mohamed" className="h-10" />
            <Input label="Last Name" placeholder="Ex : Boukab" className="h-10" />
          </div>

          <Input label="Gmail Account" placeholder="Ex: mohamed@gmail.com" className="h-10" />

          <Textarea 
            label="Description (Optional)" 
            placeholder="Brief description of the product or service..." 
            className="min-h-[100px]"
          />

          <div className="pt-1">
            <Switch 
              checked={isActive} 
              onChange={setIsActive} 
              label="Active status" 
            />
          </div>
        </div>
      </RightModal>

    </div>
  );
}
