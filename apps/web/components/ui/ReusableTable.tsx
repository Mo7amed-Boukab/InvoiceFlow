'use client';

import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/components/dashboard/Sidebar';

interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  className?: string;
  headerClassName?: string;
  cell?: (item: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface ReusableTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  showCheckbox?: boolean;
}

export function ReusableTable<T extends { id: string | number }>({ 
  columns, 
  data, 
  onRowClick,
  showCheckbox = true
}: ReusableTableProps<T>) {
  return (
    <div className="bg-white border border-slate-200 rounded-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-white">
              {showCheckbox && (
                <th className="py-4 pl-6 w-12 pt-5">
                  <input type="checkbox" className="w-4 h-4 rounded-sm accent-[#171b2d] cursor-pointer" />
                </th>
              )}
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className={cn(
                    "py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest pt-5",
                    col.align === 'center' && "text-center",
                    col.align === 'right' && "text-right pr-6",
                    col.headerClassName
                  )}
                >
                  {col.header}
                </th>
              ))}
              <th className="py-4 pr-6 w-12 pt-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((item) => (
              <tr 
                key={item.id} 
                className={cn(
                  "group hover:bg-slate-50/50 transition-colors",
                  onRowClick && "cursor-pointer"
                )}
                onClick={() => onRowClick?.(item)}
              >
                {showCheckbox && (
                  <td className="py-5 pl-6" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="w-4 h-4 rounded-sm accent-[#171b2d] cursor-pointer" />
                  </td>
                )}
                {columns.map((col, idx) => (
                  <td 
                    key={idx} 
                    className={cn(
                      "py-5",
                      col.align === 'center' && "text-center",
                      col.align === 'right' && "text-right pr-6",
                      col.className
                    )}
                  >
                    {col.cell ? col.cell(item) : (item[col.accessorKey!] as React.ReactNode)}
                  </td>
                ))}
                <td className="py-5 pr-6 text-right" onClick={(e) => e.stopPropagation()}>
                  <button className="text-slate-300 hover:text-slate-600 transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
