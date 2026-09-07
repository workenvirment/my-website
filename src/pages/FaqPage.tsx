import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_LIST } from '../data/faqData';
import type { FaqItem } from '../types';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedFaqId, setExpandedFaqId] = useState<string>('faq-1');

  const categories = ['All', 'General', 'Carriers', 'Brokers', 'Documents', 'Payments', 'Equipment'];

  const filteredFaqs = FAQ_LIST.filter((faq: FaqItem) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCat && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? '' : id);
  };

  return (
    <div className="space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-brand-orange border border-orange-200 text-xs font-mono font-bold uppercase">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base & Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Clear answers to common questions about freight dispatching, broker communications, carrier onboarding, required documents, and payment models.
        </p>
      </div>

      {/* Search and Category Filter Bar in Light Theme */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 max-w-4xl mx-auto">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FAQ questions (e.g. MC number, NOA, Factoring, BOL, Rate Con)..."
            className="w-full pl-10 pr-4 py-3 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-orange focus:bg-white"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? 'bg-brand-orange text-white border-brand-orange shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* FAQ Accordion List in Light Theme */}
      <div className="max-w-4xl mx-auto space-y-3">
        {filteredFaqs.map((faq: FaqItem) => {
          const isExpanded = expandedFaqId === faq.id;

          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-white border-brand-orange shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-5 text-left flex items-start justify-between gap-4 focus:outline-none"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-brand-orange px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 uppercase font-bold">
                    {faq.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-display font-bold text-slate-900 mt-1">{faq.question}</h3>
                </div>
                <div className="p-1.5 rounded-xl bg-slate-100 text-slate-500 shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-orange" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs text-slate-700 leading-relaxed animate-in fade-in duration-150">
                  <p className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="p-12 text-center text-slate-500 text-xs">
            No questions found matching "{searchTerm}". Try clearing search or selecting "All".
          </div>
        )}
      </div>

      {/* Bottom Help Banner */}
      <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-slate-900 text-white border border-white/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-display font-black text-white">Have a specific dispatch question?</h3>
          <p className="text-xs text-slate-400">Our logistics team is available to explain setup steps and equipment criteria.</p>
        </div>
        <button
          onClick={() => onNavigate('/contact')}
          className="px-6 py-3 text-xs font-bold rounded-full bg-brand-orange text-white hover:bg-brand-orange-hover transition-all shrink-0 shadow-glow-orange uppercase tracking-wider"
        >
          Contact Dispatch Team
        </button>
      </div>

    </div>
  );
};
