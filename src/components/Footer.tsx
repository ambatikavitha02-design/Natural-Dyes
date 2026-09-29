import React from 'react';
import { Leaf, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E6E0D5] py-16 text-xs text-[#686054]">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-5 space-y-3">
            <span className="font-editorial text-2xl font-medium text-[#1F1A15] block">
              Herbarium Tinctura
            </span>
            <p className="text-[#5A5044] leading-relaxed max-w-sm">
              An open botanical compendium dedicated to closed-loop textile color. 
              Converting everyday culinary byproducts into archival natural pigments without synthetic auxiliary toxins.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8C7E6D]">
              <Leaf className="w-3.5 h-3.5 text-[#5B6236]" />
              <span>Zero Municipal Waste · 100% Compostable Exhaust Baths</span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2">
            <span className="font-mono uppercase text-[#8C7E6D] text-[11px] block tracking-wider">
              Practitioner Principles
            </span>
            <ul className="space-y-1.5 text-[#5A5044]">
              <li>• Always reserve separate vessels for mordanting and human food preparation.</li>
              <li>• Rinse all oils completely from avocado stones to prevent oil spots on cloth.</li>
              <li>• Compost exhausted botanical marc back into organic garden soil.</li>
              <li>• Use rainwater or gentle tap water without excessive chlorine.</li>
            </ul>
          </div>

          <div className="md:col-span-3 flex flex-col md:items-end justify-between space-y-4">
            <button
              onClick={onScrollToTop}
              className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#D6CEBE] rounded text-xs font-medium text-[#24211D] hover:bg-[#F2ECE1] transition-colors cursor-pointer self-start md:self-auto"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-[#8C7E6D]">
              CATALOG CODE: MMXXVI-BOT-08
            </span>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-[#E6E0D5] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#8C7E6D]">
          <span>NATURAL DYES & BOTANICAL COLOR GUIDE — KITCHEN WASTE RESEARCH ARCHIVE</span>
          <span>CURATED WITH CORMORANT GARAMOND & PLUS JAKARTA SANS</span>
        </div>

      </div>
    </footer>
  );
};
