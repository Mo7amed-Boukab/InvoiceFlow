'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/components/dashboard/Sidebar';

export function Stepper({ currentStep }: { currentStep: number }) {
  const steps = [
    { id: 1, label: 'Type' },
    { id: 2, label: 'Template' },
    { id: 3, label: 'Details' },
    { id: 4, label: 'Review' },
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center w-full max-w-2xl px-4">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step Circle & Label */}
              <div className="flex flex-col items-center relative z-10">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all",
                  isCompleted ? "bg-[#171b2d] text-white" : 
                  isActive ? "bg-[#171b2d] text-white" : "bg-white border-2 border-slate-100 text-slate-400"
                )}>
                  {isCompleted ? <Check size={16} strokeWidth={3} /> : step.id}
                </div>
                <span className={cn(
                  "absolute top-10 text-[11px] font-bold whitespace-nowrap",
                  isActive || isCompleted ? "text-slate-800" : "text-slate-400"
                )}>
                  {step.label}
                </span>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-[2px] -mt-6 mx-2 transition-colors",
                  currentStep > step.id ? "bg-[#171b2d]" : "bg-slate-100"
                )}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
