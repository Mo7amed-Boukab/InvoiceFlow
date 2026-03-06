'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/components/dashboard/Sidebar';

interface RightModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function RightModal({ isOpen, onClose, title, children, footer }: RightModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[60]"
          />
          
          {/* Modal Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-[18px] font-bold text-slate-800">{title}</h2>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="p-6 border-t border-slate-100 bg-white">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
