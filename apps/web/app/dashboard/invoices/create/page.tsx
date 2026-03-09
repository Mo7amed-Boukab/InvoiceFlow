'use client';

import React, { useState } from 'react';
import { Stepper } from './components/Stepper';
import { Step1Type } from './components/Step1Type';
import { Step2Template } from './components/Step2Template';
import { Step3Details } from './components/Step3Details';

export default function CreateInvoicePage() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-[950px] mx-auto pb-20 pt-2 px-8 w-full">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-slate-800">Create New Invoice</h1>
      </div>

      <Stepper currentStep={step} />

      <div className="mt-10">
        {step === 1 && <Step1Type onNext={() => setStep(2)} />}
        {step === 2 && <Step2Template onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <Step3Details onBack={() => setStep(2)} />}
      </div>
    </div>
  );
}
