'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Download,
  Package,
  Wrench,
  ChevronLeft, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/components/dashboard/Sidebar';
import { ReusableTable } from '@/components/ui/ReusableTable';
import { RightModal } from '@/components/ui/RightModal';
import { Input, Textarea, Switch } from '@/components/ui/FormElements';
import { CustomSelect } from '@/components/ui/CustomSelect';

interface ProductItem {
  id: number;
  type: 'product' | 'service';
  name: string;
  sku: string;
  price: string;
  tax: string;
  isActive: boolean;
}

const initialProductData: ProductItem[] = [
  {
    id: 1,
    type: 'product',
    name: 'Professional Workstation X1',
    sku: 'PRD-WS-001',
    price: '$2,499.00',
    tax: 'VAT (15%)',
    isActive: true,
  },
  {
    id: 2,
    type: 'service',
    name: 'Consulting Fee (Hourly)',
    sku: 'SRV-CON-010',
    price: '$150.00',
    tax: 'GST (10%)',
    isActive: true,
  },
  {
    id: 3,
    type: 'product',
    name: 'Enterprise Router v2',
    sku: 'PRD-NET-422',
    price: '$899.00',
    tax: 'No Tax',
    isActive: false,
  }
];

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>(initialProductData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemType, setItemType] = useState<'product' | 'service'>('product');
  const [isActive, setIsActive] = useState(true);

  const toggleProductStatus = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  const columns = [
    {
      header: 'Type',
      cell: (p: ProductItem) => (
        <div className="flex items-center justify-center">
          {p.type === 'product' ? (
            <Package size={18} className="text-slate-700" strokeWidth={2.5}/>
          ) : (
            <Wrench size={18} className="text-slate-700" strokeWidth={2.5}/>
          )}
        </div>
      ),
      align: 'center' as const,
      headerClassName: 'w-16'
    },
    {
      header: 'Item Name',
      cell: (p: ProductItem) => (
        <p className="text-[13px] font-bold text-slate-800">{p.name}</p>
      )
    },
    {
      header: 'SKU/Code',
      cell: (p: ProductItem) => (
        <p className="text-[11px] font-bold text-slate-400 tracking-wide uppercase">{p.sku}</p>
      )
    },
    {
      header: 'Unit Price',
      cell: (p: ProductItem) => (
        <p className="text-[14px] font-bold text-slate-800">{p.price}</p>
      )
    },
    {
      header: 'Tax Rule',
      cell: (p: ProductItem) => (
        <div className="inline-flex px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
           <span className="text-[10px] font-bold text-slate-500 uppercase">{p.tax}</span>
        </div>
      )
    },
    {
      header: 'Status',
      cell: (p: ProductItem) => (
        <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
           <Switch checked={p.isActive} onChange={() => toggleProductStatus(p.id)} />
        </div>
      ),
      align: 'center' as const
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 flex flex-col">
      
      {/* Metric Cards Summary */}
      <div className="grid grid-cols-4 gap-6 shrink-0">
        {[
          { label: 'Total Items', value: '1,248' },
          { label: 'Products', value: '856' },
          { label: 'Services', value: '392' },
          { label: 'Active Items', value: '1,120' },
        ].map((card, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-6 rounded-sm">
            <p className="text-2xl font-bold text-slate-800 mb-1">{card.value}</p>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex gap-4 items-center shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input 
            type="text" 
            placeholder="Search by name, SKU or code..." 
            className="w-full bg-white border border-slate-200 rounded-sm py-2.5 pl-11 pr-4 text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all font-bold"
          />
        </div>
        
        <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-sm px-4 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-all">
          <Filter size={16} />
          <span>Filters</span>
        </button>

        <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-sm px-4 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-all">
          <Download size={16} />
          <span>Export</span>
        </button>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2 bg-[#171b2d] text-white rounded-sm text-[13px] font-bold hover:bg-slate-800 transition-all active:scale-[0.98]"
        >
          <Plus size={16} strokeWidth={2.5}/>
          <span>Add Item</span>
        </button>
      </div>

      {/* Table */}
      <ReusableTable columns={columns} data={products} />

      {/* Pagination Footer */}
      <div className="flex justify-between items-center py-2 text-[12px] font-bold text-slate-400 shrink-0">
        <p>Showing <span className="text-slate-800">1 - {products.length}</span> of <span className="text-slate-800">1,248</span> items</p>
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

      {/* Add Product Modal */}
      <RightModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Item"
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
              Create Item
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          {/* Item Type Selector */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-600 ml-0.5">Item Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setItemType('product')}
                className={cn(
                  "flex items-center justify-center gap-3 p-3 rounded-sm border transition-all relative",
                  itemType === 'product' 
                    ? "border-slate-800 bg-white ring-1 ring-slate-800" 
                    : "border-slate-200 bg-white hover:bg-slate-50"
                )}
              >
                <Package size={18} className={itemType === 'product' ? "text-slate-800" : "text-slate-400"} strokeWidth={2.5}/>
                <span className={cn("text-[13px] font-bold", itemType === 'product' ? "text-slate-800" : "text-slate-500")}>Product</span>
                {itemType === 'product' && (
                  <div className="absolute -top-1.5 -right-1.5 bg-white rounded-full">
                    <CheckCircle2 size={16} className="text-slate-800" fill="white" />
                  </div>
                )}
              </button>
              <button 
                onClick={() => setItemType('service')}
                className={cn(
                  "flex items-center justify-center gap-3 p-3 rounded-sm border transition-all relative",
                  itemType === 'service' 
                    ? "border-slate-800 bg-white ring-1 ring-slate-800" 
                    : "border-slate-200 bg-white hover:bg-slate-50"
                )}
              >
                <Wrench size={18} className={itemType === 'service' ? "text-slate-800" : "text-slate-400"} strokeWidth={2.5}/>
                <span className={cn("text-[13px] font-bold", itemType === 'service' ? "text-slate-800" : "text-slate-500")}>Service</span>
                {itemType === 'service' && (
                  <div className="absolute -top-1.5 -right-1.5 bg-white rounded-full">
                    <CheckCircle2 size={16} className="text-slate-800" fill="white" />
                  </div>
                )}
              </button>
            </div>
          </div>

          <Input label="Item Name" placeholder="e.g. MacBook Pro M3" className="h-10" />
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="SKU / Code" placeholder="SKU-001" className="h-10" />
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-600 ml-0.5">Unit Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[13px] font-medium">$</span>
                <input 
                  type="text" 
                  placeholder="0.00" 
                  className="flex h-10 w-full rounded-sm border border-slate-200 bg-white pl-8 pr-4 py-2 text-[13px] font-medium transition-all placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300"
                />
              </div>
            </div>
          </div>

          <div className="w-full">
            <CustomSelect 
              label="Default Tax Rule"
              placeholder="Select tax rule"
              options={[
                { label: 'VAT (15%)', value: 'vat15' },
                { label: 'GST (10%)', value: 'gst10' },
                { label: 'No Tax', value: 'none' },
              ]}
              value="vat15"
              onChange={() => {}}
            />
          </div>

          <Textarea 
            label="Description (Optional)" 
            placeholder="Brief description of the product or service..." 
            className="min-h-[80px]"
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
