'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/components/dashboard/Sidebar';

interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function CustomSelect({ 
  options, 
  value, 
  onChange, 
  label, 
  placeholder = "Select option",
  className 
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("space-y-2 w-full relative", className)} ref={containerRef}>
      {label && (
        <label className="text-[13px] font-bold text-slate-600 ml-0.5">
          {label}
        </label>
      )}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-sm border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold transition-all cursor-pointer hover:bg-slate-50",
          isOpen && "ring-1 ring-slate-300 border-slate-300"
        )}
      >
        <span className={cn(selectedOption ? "text-slate-800" : "text-slate-400 font-medium")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={14} className={cn("text-slate-400 transition-transform", isOpen && "rotate-180")} />
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+5px)] left-0 w-full bg-white border border-slate-200 rounded-md shadow-lg z-[100] py-1 animate-in fade-in zoom-in-95 duration-100">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "px-4 py-2.5 text-[13px] font-bold cursor-pointer transition-colors flex items-center justify-between",
                value === option.value ? "bg-slate-50 text-slate-800" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              )}
            >
              <span>{option.label}</span>
              {value === option.value && <Check size={14} className="text-slate-800" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
