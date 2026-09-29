import React, { useState } from 'react';
import { DIY_GUIDES, DiyGuide } from '../data/guides';
import { BookOpen, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

export const DiyGuides: React.FC = () => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(DIY_GUIDES[0].id);

  const activeGuide = DIY_GUIDES.find((g) => g.id === selectedGuideId) || DIY_GUIDES[0];

  return (
    <section id="guides" className="py-16 md:py-24 border-b border-[#E6E0D5]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C7E6D] mb-2">
            <span>SECTION 05</span>
            <span aria-hidden="true">·</span>
            <span>DIY ATELIER MASTERCLASSES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1F1A15] tracking-tight">
            Step-by-Step Culinary Dye Protocols
          </h2>
          <p className="text-sm sm:text-base text-[#686054] mt-2 leading-relaxed">
            From proper scouring to avoid splotchy patches, to brewing slow avocado rose baths and fermenting homemade iron water with rusty nails.
          </p>
        </div>

        {/* Masterclass Guide Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {DIY_GUIDES.map((guide) => {
            const isSelected = selectedGuideId === guide.id;
            return (
              <button
                key={guide.id}
                onClick={() => setSelectedGuideId(guide.id)}
                className={`p-5 rounded-lg text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#8C5A37] bg-white ring-1 ring-[#8C5A37] shadow-sm'
                    : 'border-[#E2DBD0] bg-[#FAF7F2] hover:bg-white hover:border-[#B5AA9A]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="font-bold text-[#8C5A37]">{guide.number}</span>
                    <span className="text-[#8C7E6D]">{guide.readTime}</span>
                  </div>
                  <h3 className="font-editorial text-lg font-medium text-[#1F1A15] leading-snug">
                    {guide.title}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#786D5E]">{guide.category}</span>
                  <span className={isSelected ? 'text-[#8C5A37] font-semibold' : 'text-[#8C7E6D]'}>
                    {isSelected ? 'Reading' : 'Read Guide →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Guide Longform Reading Canvas */}
        <div className="bg-white rounded-lg border border-[#E2DBD0] p-6 sm:p-10 shadow-xs max-w-5xl mx-auto">
          
          {/* Guide Header */}
          <div className="border-b border-[#E6E0D5] pb-8 mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8C7E6D] uppercase tracking-wider mb-2">
              <span>MASTERCLASS {activeGuide.number}</span>
              <span aria-hidden="true">·</span>
              <span>{activeGuide.category}</span>
              <span aria-hidden="true">·</span>
              <span>{activeGuide.readTime}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-editorial font-medium text-[#1F1A15] tracking-tight text-balance">
              {activeGuide.title}
            </h3>
            <p className="font-serif italic text-base text-[#8C5A37] mt-1.5">
              {activeGuide.subtitle}
            </p>

            <p className="text-sm sm:text-base text-[#5A5044] leading-relaxed mt-4 max-w-3xl">
              {activeGuide.summary}
            </p>
          </div>

          {/* Two-Column Utility Strip: Required Materials + Safety */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-xs">
            
            {/* Required Materials */}
            <div className="p-5 rounded-lg bg-[#FAF7F2] border border-[#EAE3D6] space-y-3">
              <span className="font-mono font-semibold uppercase tracking-wider text-[#6B6154] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#8C5A37]" />
                <span>Equipment & Materials Checklist</span>
              </span>
              <ul className="space-y-1.5 text-[#433B32]">
                {activeGuide.requiredMaterials.map((mat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5B6236] shrink-0 mt-0.5" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety & Studio Hygiene */}
            <div className="p-5 rounded-lg bg-[#FAF7F2] border border-[#EAE3D6] space-y-3">
              <span className="font-mono font-semibold uppercase tracking-wider text-[#A63821] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#A63821]" />
                <span>Studio Safety & Equipment Hygiene</span>
              </span>
              <ul className="space-y-1.5 text-[#5A5044]">
                {activeGuide.safetyNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#A63821] font-mono">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Detailed Step-by-Step Instructions */}
          <div className="space-y-8">
            <h4 className="text-xl font-editorial font-medium text-[#1F1A15] border-b border-[#F0EAE1] pb-3">
              Protocol Procedure
            </h4>

            <div className="space-y-6">
              {activeGuide.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#D6CEBE] text-[#8C5A37] font-mono font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h5 className="text-base font-semibold text-[#1F1A15]">
                      {step.title}
                    </h5>
                    <p className="text-sm text-[#5A5044] leading-relaxed">
                      {step.description}
                    </p>
                    {step.cautionOrTip && (
                      <div className="p-3 mt-2 rounded bg-[#FAF7F2] border-l-2 border-[#8C5A37] text-xs text-[#686054] italic">
                        {step.cautionOrTip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
