import React, { useState } from 'react';
import { ArrowRight, Sparkles, Scale, Compass } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenCalculator }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 border-b border-[#E6E0D5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Curatorial Header Category & Accession Header */}
        <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-mono text-[#8C7E6D] mb-4">
          <span>ARCHIVAL BOTANICAL MONOGRAPH</span>
          <span aria-hidden="true">·</span>
          <span>UPCYCLED TEXTILE CHEMISTRY</span>
          <span aria-hidden="true">·</span>
          <span>EST. MMXXVI</span>
        </div>

        {/* Main Grid: Editorial Title & Text + Large Visual Specimen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial font-normal tracking-tight text-[#1F1A15] leading-[1.08] text-balance">
              Natural Dyes & <br className="hidden sm:inline" />
              <span className="italic font-serif text-[#8C5A37]">Botanical Color</span> Guide
            </h1>

            <p className="text-base sm:text-lg text-[#5A5044] leading-relaxed max-w-xl font-normal">
              An exhaustive field manual exploring the latent chromatics hidden inside daily culinary waste. 
              Extract sunlit ambers from dry onion skins, antique dusty blush from avocado stones, 
              ancient khaki and ink blacks from pomegranate rinds, and electric gold from turmeric roots.
            </p>

            {/* Zero-Pill Unboxed Key Insights */}
            <div className="pt-2 text-xs text-[#786D5E] space-y-1.5 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C5A37]"></span>
                <span>Active chromophores: Quercetin, Persin tannins, Ellagitannins & Curcumin</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5B6236]"></span>
                <span>Affinity on unbleached linen, raw organic cotton, tussah silk & highland wool</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onExplore}
                className="px-5 py-2.5 bg-[#2B2620] text-[#FAF7F2] text-sm font-medium rounded hover:bg-[#433B32] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Browse Specimen Archive</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="px-5 py-2.5 bg-white text-[#24211D] border border-[#D6CEBE] text-sm font-medium rounded hover:bg-[#F5EFE6] hover:border-[#8C5A37] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Scale className="w-4 h-4 text-[#8C5A37]" />
                <span>Calculate Batch Recipe (% WOF)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame with Curatorial Caption */}
          <div className="lg:col-span-6">
            <div className="relative rounded-lg overflow-hidden border border-[#DCD5C8] bg-[#EFE9DD] shadow-sm">
              {!imageError ? (
                <img
                  src="/src/assets/images/botanical_dyes_hero_1790655033216.jpg"
                  alt="Folded hand-dyed organic linen textiles in blush, turmeric ochre, and olive surrounded by botanical jars"
                  className="w-full h-[320px] sm:h-[400px] object-cover hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-[320px] sm:h-[400px] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#F5EFE6] to-[#E3DAC9] text-[#5A5044]">
                  <Compass className="w-12 h-12 text-[#8C5A37] mb-3 stroke-[1.5]" />
                  <p className="font-editorial text-xl text-[#2B2620]">Botanical Extraction Atelier</p>
                  <p className="text-xs text-[#786D5E] mt-1 font-mono">Allium Cepa · Persea Americana · Punica Granatum</p>
                </div>
              )}

              {/* Museum catalog caption badge */}
              <div className="bg-[#FAF7F2]/95 border-t border-[#E6E0D5] p-3 px-4 flex items-center justify-between text-xs text-[#5A5044]">
                <span className="font-mono text-[11px] text-[#8C7E6D]">FIG. 01 — BOTANICAL TEXTILE ARCHIVE</span>
                <span className="italic font-editorial text-[13px] text-[#24211D]">Natural Food Scraps on Pure Flax Linen</span>
              </div>
            </div>
          </div>

        </div>

        {/* Operational Utility Ribbon - 4 stats in clean horizontal strip */}
        <div className="mt-14 pt-8 border-t border-[#E6E0D5] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <p className="text-xs font-mono uppercase text-[#8C7E6D] tracking-wider">Primary Food Scraps</p>
            <p className="text-2xl font-editorial font-medium text-[#1F1A15] mt-1">4 Pillars</p>
            <p className="text-xs text-[#6B6154] mt-0.5">Onion, Avocado, Pomegranate, Turmeric</p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase text-[#8C7E6D] tracking-wider">Documented Specimens</p>
            <p className="text-2xl font-editorial font-medium text-[#1F1A15] mt-1">8 Specimens</p>
            <p className="text-xs text-[#6B6154] mt-0.5">With full chemical and fastness logs</p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase text-[#8C7E6D] tracking-wider">Color Formulations</p>
            <p className="text-2xl font-editorial font-medium text-[#1F1A15] mt-1">32 Swatches</p>
            <p className="text-xs text-[#6B6154] mt-0.5">Alum, Iron, Acid, Base, and Raw states</p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase text-[#8C7E6D] tracking-wider">Ecological Integrity</p>
            <p className="text-2xl font-editorial font-medium text-[#5B6236] mt-1">100% Upcycled</p>
            <p className="text-xs text-[#6B6154] mt-0.5">Non-toxic, culinary byproduct origin</p>
          </div>
        </div>

      </div>
    </section>
  );
};
