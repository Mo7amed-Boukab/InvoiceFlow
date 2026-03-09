'use client';

import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  FileWarning,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';

// Mock Data for Charts
const areaData = [
  { name: 'Jan', revenue: 65000, expenses: 40000 },
  { name: 'Feb', revenue: 72000, expenses: 42000 },
  { name: 'Mar', revenue: 80000, expenses: 45000 },
  { name: 'Apr', revenue: 81000, expenses: 43000 },
  { name: 'May', revenue: 95000, expenses: 46000 },
  { name: 'Jun', revenue: 105000, expenses: 48000 },
  { name: 'Jul', revenue: 100000, expenses: 46000 },
  { name: 'Aug', revenue: 115000, expenses: 54000 },
  { name: 'Sep', revenue: 120000, expenses: 51000 },
  { name: 'Oct', revenue: 122000, expenses: 44000 },
  { name: 'Nov', revenue: 125000, expenses: 42000 },
  { name: 'Dec', revenue: 130000, expenses: 45000 },
];

const pieData = [
  { name: 'Paid', value: 65, color: '#3b82f6' },
  { name: 'Overdue', value: 15, color: '#06b6d4' },
  { name: 'Draft / Pending', value: 20, color: '#e2e8f0' }
];

const barData = [
  { name: 'Mon', income: 4500, expense: 2000 },
  { name: 'Tue', income: 5200, expense: 1800 },
  { name: 'Wed', income: 3800, expense: 2500 },
  { name: 'Thu', income: 6100, expense: 2200 },
  { name: 'Fri', income: 5500, expense: 2300 },
  { name: 'Sat', income: 2000, expense: 1000 },
  { name: 'Sun', income: 1500, expense: 1000 },
];

const topClients = [
  { initials: 'AC', name: 'Acme Corp', industry: 'Tech & Software', invoices: 12, amount: '45,200.00', color: 'bg-blue-100 text-blue-600' },
  { initials: 'BR', name: 'BuildRight LLC', industry: 'Construction', invoices: 8, amount: '24,950.00', color: 'bg-purple-100 text-purple-600' },
  { initials: 'GL', name: 'GreenLeaf', industry: 'Agriculture', invoices: 15, amount: '18,300.00', color: 'bg-orange-100 text-orange-600' },
  { initials: 'MS', name: 'MarketSquare', industry: 'Retail', invoices: 22, amount: '12,400.00', color: 'bg-teal-100 text-teal-600' },
];

export default function DashboardOverview() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-[22px] font-heading font-bold text-slate-800 tracking-tight">Financial Overview</h2>
          <p className="text-[13px] font-medium text-slate-400 mt-1">Track your revenue, expenses, and key financial metrics.</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-8 rounded-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Total Revenue</span>
            <TrendingUp size={16} className="text-emerald-500" strokeWidth={3}/>
          </div>
          <p className="text-2xl font-bold text-slate-800 tracking-tight">128,580.00 DH</p>
        </div>

        <div className="bg-white p-8 rounded-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Total Expenses</span>
            <TrendingDown size={16} className="text-red-500" strokeWidth={3}/>
          </div>
          <p className="text-2xl font-bold text-slate-800 tracking-tight">42,300.00 DH</p>
        </div>

        <div className="bg-white p-8 rounded-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Net Profit</span>
            <Wallet size={16} className="text-blue-500" strokeWidth={2.5}/>
          </div>
          <p className="text-2xl font-bold text-slate-800 tracking-tight">86,150.00 DH</p>
        </div>

        <div className="bg-white p-8 rounded-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Outstanding Invoices</span>
            <FileWarning size={16} className="text-orange-500" strokeWidth={2.5}/>
          </div>
          <p className="text-2xl font-bold text-slate-800 tracking-tight">14,200.00 DH</p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        
        {/* Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[15px] font-bold text-slate-800">Revenue Growth vs. Expenses</h3>
            <div className="flex bg-[#f8f9fa] rounded p-0.5 border border-slate-100">
              <button className="px-3 py-1 text-[11px] font-bold text-slate-500">Weekly</button>
              <button className="px-3 py-1 text-[11px] font-bold bg-white text-slate-800 rounded shadow-sm">Monthly</button>
              <button className="px-3 py-1 text-[11px] font-bold text-slate-500">Yearly</button>
            </div>
          </div>
          <div className="flex justify-end gap-4 mb-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
              <span className="w-3 h-3 rounded-full border-2 border-blue-500 bg-white"></span> Revenue
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
              <span className="w-3 h-3 rounded-full border-2 border-red-500 bg-white"></span> Expenses
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-sm border border-slate-200 flex flex-col">
          <h3 className="text-[15px] font-bold text-slate-800 mb-6">Invoice Status Distribution</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full space-y-3 mt-4">
              {pieData.map(item => (
                <div key={item.name} className="flex items-center justify-between text-[12px] font-bold text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    {item.name}
                  </div>
                  <span className="text-slate-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        
        {/* Income vs Expenses Bar Chart */}
        <div className="bg-white p-6 rounded-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[15px] font-bold text-slate-800">Income vs Expenses</h3>
            <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
               <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-800"></span> Income</div>
               <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-200"></span> Expense</div>
            </div>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={12}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip cursor={{fill: '#f8f9fa'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', fontSize: '12px', fontWeight: 'bold' }} />
                <Bar dataKey="income" fill="#1e293b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Clients Table */}
        <div className="bg-white p-6 rounded-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[15px] font-bold text-slate-800">Top Clients by Revenue</h3>
            <button className="text-[11px] font-bold text-slate-800 hover:text-slate-500">View All</button>
          </div>
          
          <div className="w-full">
            <div className="grid grid-cols-12 pb-3 border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              <div className="col-span-6">CLIENT NAME</div>
              <div className="col-span-3 text-center">INVOICES</div>
              <div className="col-span-3 text-right">TOTAL AMOUNT</div>
            </div>
            
            <div className="pt-2">
              {topClients.map((client, idx) => (
                <div key={idx} className="grid grid-cols-12 py-3.5 border-b border-slate-50 last:border-0 items-center">
                  <div className="col-span-6 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-md flex items-center justify-center text-[12px] font-bold ${client.color}`}>
                      {client.initials}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-slate-800 leading-tight">{client.name}</p>
                      <p className="text-[11px] text-slate-400 font-medium">{client.industry}</p>
                    </div>
                  </div>
                  <div className="col-span-3 text-center text-[13px] font-bold text-slate-500">
                    {client.invoices}
                  </div>
                  <div className="col-span-3 text-right text-[13px] font-black text-slate-800 tracking-tight">
                    ${client.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
