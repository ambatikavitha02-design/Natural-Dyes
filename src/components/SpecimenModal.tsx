import React, { useState } from 'react';
import { BotanicalDye } from '../types/dye';
import { X, Check, Droplet, Sun, Sparkles, Scale, Info, Flame, Clock } from 'lucide-react';

interface SpecimenModalProps {
  specimen: BotanicalDye | null;
  onClose: () => void;
  onOpenCalculatorWithDye: (dyeId: string) => void;
}

export const SpecimenModal: React.FC<SpecimenModalProps> = ({
  specimen,
  onClose,
  onOpenCalculatorWithDye,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [selectedColorKey, setSelectedColorKey] = useState<keyof BotanicalDye['colors']>('alum');

  if (!specimen) return null;

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const activeColor = specimen.colors[selectedColorKey];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-lg border border-[#D6CEBE] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E0D5] bg-[#F4EFE6]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#786D5E]">
            <span>{specimen.folioNumber}</span>
            <span aria-hidden="true">·</span>
            <span>BOTANICAL MONOGRAPH</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[#EAE2D5] text-[#5A5044] hover:text-[#1F1A15] transition-colors cursor-pointer"
            aria-label="Close dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Header Title Section */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <p className="text-sm font-serif italic text-[#8C5A37] mb-1">{specimen.botanicalName}</p>
              <h2 className="text-3xl font-editorial font-medium text-[#1F1A15]">
                {specimen.commonName}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-[#786D5E] font-mono">
                <span>Part: {specimen.scrapCategory}</span>
                <span aria-hidden="true">·</span>
                <span>Chromophore: {specimen.primaryChromophore}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenCalculatorWithDye(specimen.id);
              }}
              className="px-4 py-2 text-xs font-medium bg-[#2B2620] text-[#FAF7F2] rounded hover:bg-[#433B32] transition-colors flex items-center gap-2 self-start cursor-pointer whitespace-nowrap"
            >
              <Scale className="w-4 h-4 text-[#C5A337]" />
              <span>Formulate Bath in Calculator</span>
            </button>
          </div>

          {/* Color Variant Palette Swatches */}
          <div className="bg-white rounded-lg p-5 border border-[#E6E0D5] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#6B6154]">
                Chromatic Spectrum by Chemical Modifier
              </h3>
              <span className="text-xs text-[#8C7E6D]">Click swatch to inspect</span>
            </div>

            {/* Swatch Selector Row */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {(Object.keys(specimen.colors) as Array<keyof BotanicalDye['colors']>).map((key) => {
                const color = specimen.colors[key];
                const isSelected = selectedColorKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedColorKey(key)}
                    className={`flex flex-col text-left p-2.5 rounded border transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-[#8C5A37] ring-2 ring-[#8C5A37]/20 bg-[#FAF7F2]' 
                        : 'border-[#E6E0D5] hover:border-[#B5AA9A]'
                    }`}
                  >
                    <div 
                      className="w-full h-12 rounded mb-2 shadow-inner border border-black/10 flex items-end justify-end p-1"
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white shadow-xs"></div>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-[#8C7E6D] truncate">{color.label}</span>
                    <span className="text-xs font-medium text-[#2B2620] truncate mt-0.5">{color.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Swatch Detailed Callout */}
            <div className="mt-3 p-4 rounded bg-[#FAF7F2] border border-[#EAE3D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded shadow-xs border border-black/10 shrink-0"
                  style={{ backgroundColor: activeColor.hex }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#1F1A15]">{activeColor.name}</p>
                    <span className="text-xs font-mono text-[#8C7E6D]">({activeColor.label})</span>
                  </div>
                  <p className="text-xs text-[#5A5044] mt-0.5">{activeColor.description}</p>
                </div>
              </div>

              <button
                onClick={() => handleCopyHex(activeColor.hex)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#D6CEBE] rounded text-xs font-mono text-[#2B2620] hover:bg-[#F2ECE1] transition-colors self-start sm:self-auto cursor-pointer"
              >
                {copiedHex === activeColor.hex ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied {activeColor.hex}</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#8C7E6D]">HEX:</span>
                    <span>{activeColor.hex}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Fastness Ratings & Technical Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Ratings */}
            <div className="bg-white rounded-lg p-5 border border-[#E6E0D5] space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#6B6154]">
                Color-Fastness Analysis
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#5A5044] flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-[#C5A337]" />
                      <span>Lightfastness (UV Sunlight)</span>
                    </span>
                    <span className="font-mono font-medium text-[#24211D]">{specimen.fastness.lightfastness} / 5.0</span>
                  </div>
                  <div className="w-full bg-[#EFE9DD] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#C5A337] h-full rounded-full transition-all duration-500"
                      style={{ width: `${(specimen.fastness.lightfastness / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#5A5044] flex items-center gap-1.5">
                      <Droplet className="w-3.5 h-3.5 text-[#4A7A8C]" />
                      <span>Washfastness (Laundering)</span>
                    </span>
                    <span className="font-mono font-medium text-[#24211D]">{specimen.fastness.washfastness} / 5.0</span>
                  </div>
                  <div className="w-full bg-[#EFE9DD] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#4A7A8C] h-full rounded-full transition-all duration-500"
                      style={{ width: `${(specimen.fastness.washfastness / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#5A5044] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#8C5A37]" />
                      <span>Rubbing / Crock Resistance</span>
                    </span>
                    <span className="font-mono font-medium text-[#24211D]">{specimen.fastness.crockfastness} / 5.0</span>
                  </div>
                  <div className="w-full bg-[#EFE9DD] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#8C5A37] h-full rounded-full transition-all duration-500"
                      style={{ width: `${(specimen.fastness.crockfastness / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#EAE3D6] text-xs text-[#5A5044] leading-relaxed">
                <p className="font-medium text-[#2B2620] mb-0.5">Curatorial Longevity Note:</p>
                <p>{specimen.fastness.longevitySummary}</p>
                <p className="mt-1.5 text-[#786D5E] italic">Care: {specimen.fastness.careAdvice}</p>
              </div>
            </div>

            {/* Right: Technical Preparation & Affinities */}
            <div className="bg-white rounded-lg p-5 border border-[#E6E0D5] space-y-3.5 text-xs">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#6B6154]">
                Dye Bath Technical Parameters
              </h3>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-[#FAF7F2] rounded border border-[#EAE3D6]">
                  <span className="text-[#8C7E6D] font-mono text-[11px] block">Recommended % WOF</span>
                  <span className="text-base font-semibold text-[#24211D] mt-0.5 block">{specimen.recommendedWOF}%</span>
                  <span className="text-[11px] text-[#5A5044] block mt-0.5 leading-tight">{specimen.recommendedWOFDescription}</span>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded border border-[#EAE3D6]">
                  <span className="text-[#8C7E6D] font-mono text-[11px] block flex items-center gap-1">
                    <Flame className="w-3 h-3 text-[#A63821]" /> Extraction Temp
                  </span>
                  <span className="text-base font-semibold text-[#24211D] mt-0.5 block">{specimen.extractionTempC}°C</span>
                  <span className="text-[11px] text-[#5A5044] block mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#8C7E6D]" /> {specimen.extractionDurationMinutes} minutes
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between py-1 border-b border-[#F0EAE1]">
                  <span className="text-[#786D5E]">Tannin Density:</span>
                  <span className="font-medium text-[#24211D]">{specimen.tanninLevel}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F0EAE1]">
                  <span className="text-[#786D5E]">Protein Fiber (Wool / Silk):</span>
                  <span className="font-medium text-emerald-800">{specimen.fiberAffinity.protein} Affinity</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F0EAE1]">
                  <span className="text-[#786D5E]">Cellulose (Cotton / Linen):</span>
                  <span className="font-medium text-[#24211D]">{specimen.fiberAffinity.cellulose}</span>
                </div>
                <div className="py-1">
                  <span className="text-[#786D5E] block mb-0.5">Mordant Advice:</span>
                  <span className="text-[#24211D] leading-snug block">{specimen.mordantRecommendation}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Kitchen Preparation Tips & Step-by-Step Recipe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Kitchen Collection */}
            <div className="p-5 rounded-lg bg-[#F7F3EC] border border-[#E4DDD0] space-y-3">
              <h4 className="font-editorial text-lg text-[#24211D] flex items-center gap-2">
                <span>Kitchen Waste Gathering & Storage</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#5A5044] leading-relaxed">
                {specimen.kitchenPrepTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono text-[#8C5A37] font-semibold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brewing Steps */}
            <div className="p-5 rounded-lg bg-[#F7F3EC] border border-[#E4DDD0] space-y-3">
              <h4 className="font-editorial text-lg text-[#24211D] flex items-center gap-2">
                <span>Standard Dye Pot Extraction Protocol</span>
              </h4>
              <ol className="space-y-2 text-xs text-[#5A5044] leading-relaxed">
                {specimen.extractionSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono text-[#8C5A37] font-semibold">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

          </div>

          {/* Historical Essay Excerpt */}
          <div className="p-4 rounded bg-white border border-[#E6E0D5] text-xs text-[#6B6154] leading-relaxed italic">
            <span className="font-mono uppercase not-italic tracking-wider text-[#8C7E6D] text-[10px] block mb-1">
              Historical & Ethnographic Provenance
            </span>
            "{specimen.historicalContext}"
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#E6E0D5] bg-[#F4EFE6] flex items-center justify-between">
          <span className="text-xs text-[#8C7E6D] font-mono">
            PRESS ESC OR CLICK OUTSIDE TO CLOSE
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-white text-[#2B2620] border border-[#D6CEBE] rounded hover:bg-[#EAE2D5] transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
};
