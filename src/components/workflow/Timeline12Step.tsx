import React, { useState } from 'react';
import { 
  UserCheck, 
  FileCheck, 
  Sliders, 
  Search, 
  ShieldCheck, 
  PhoneCall, 
  FileSpreadsheet, 
  ThumbsUp, 
  Truck, 
  Navigation, 
  ClipboardCheck, 
  DollarSign, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  User
} from 'lucide-react';
import { DGW_WORKFLOW_STEPS } from '../../data/workflowData';
import type { WorkflowStep } from '../../types';

export const Timeline12Step: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<string>('01');

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck className="w-4 h-4" />;
      case 'FileCheck': return <FileCheck className="w-4 h-4" />;
      case 'Sliders': return <Sliders className="w-4 h-4" />;
      case 'Search': return <Search className="w-4 h-4" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
      case 'PhoneCall': return <PhoneCall className="w-4 h-4" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-4 h-4" />;
      case 'ThumbsUp': return <ThumbsUp className="w-4 h-4" />;
      case 'Truck': return <Truck className="w-4 h-4" />;
      case 'Navigation': return <Navigation className="w-4 h-4" />;
      case 'ClipboardCheck': return <ClipboardCheck className="w-4 h-4" />;
      case 'DollarSign': return <DollarSign className="w-4 h-4" />;
      default: return <Truck className="w-4 h-4" />;
    }
  };

  const toggleStep = (stepNum: string) => {
    setExpandedStep(expandedStep === stepNum ? '' : stepNum);
  };

  return (
    <div className="space-y-6">
      
      {/* Section Sub-heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono text-brand-gold uppercase tracking-wider font-semibold">12-Stage Operational Precision</span>
          <h3 className="text-lg font-display font-extrabold text-white">The Complete DGW Dispatching Timeline</h3>
        </div>
        <p className="text-xs text-slate-400 max-w-sm">
          Click any step to inspect the responsible actor, key paperwork, and operational actions at each milestone.
        </p>
      </div>

      {/* Grid of 12 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DGW_WORKFLOW_STEPS.map((step: WorkflowStep) => {
          const isExpanded = expandedStep === step.stepNumber;

          return (
            <div
              key={step.stepNumber}
              className={`rounded-2xl transition-all duration-200 border overflow-hidden flex flex-col justify-between ${
                isExpanded
                  ? 'bg-logistics-850 border-brand-gold shadow-glow-gold'
                  : 'bg-logistics-900/80 border-slate-800 hover:border-slate-700 hover:bg-logistics-850'
              }`}
            >
              {/* Step Card Header / Clickable */}
              <button
                onClick={() => toggleStep(step.stepNumber)}
                className="w-full p-5 text-left flex items-start justify-between gap-3 focus:outline-none"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl border mt-0.5 shrink-0 ${
                    isExpanded
                      ? 'bg-brand-gold text-slate-950 border-brand-gold'
                      : 'bg-logistics-950 text-brand-cyan border-slate-800'
                  }`}>
                    {getStepIcon(step.iconName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand-gold">STEP {step.stepNumber}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono">
                        {step.actionTag}
                      </span>
                    </div>
                    <h4 className="text-sm font-display font-bold text-white mt-1">{step.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.shortDesc}</p>
                  </div>
                </div>

                <div className="text-slate-400 shrink-0 p-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-gold" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Expandable Step Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-3 text-xs bg-logistics-950/40 animate-in fade-in duration-150">
                  <p className="text-slate-300 leading-relaxed bg-logistics-900/60 p-3 rounded-xl border border-slate-800">
                    {step.fullDesc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-logistics-900 border border-slate-800">
                      <span className="text-slate-400 uppercase font-mono block text-[10px]">Responsible Party</span>
                      <span className="font-semibold text-slate-200 mt-0.5 flex items-center gap-1">
                        <User className="w-3 h-3 text-brand-cyan" />
                        {step.primaryActor}
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-logistics-900 border border-slate-800">
                      <span className="text-slate-400 uppercase font-mono block text-[10px]">Key Document / Artifact</span>
                      <span className="font-semibold text-brand-gold mt-0.5 flex items-center gap-1 truncate">
                        <FileText className="w-3 h-3 text-brand-gold" />
                        {step.keyDocument}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
