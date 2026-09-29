import React, { useState } from 'react';
import { BotanicalDye } from '../types/dye';
import { FlaskConical, Beaker, Zap, Info, Sliders, RefreshCw } from 'lucide-react';

interface ModifierLabProps {
  specimens: BotanicalDye[];
}

export const ModifierLab: React.FC<ModifierLabProps> = ({ specimens }) => {
  const [selectedDyeId, setSelectedDyeId] = useState<string>('turmeric-root');
  const [phValue, setPhValue] = useState<number>(7.0);
  const [hasIron, setHasIron] = useState<boolean>(false);

  const selectedSpecimen = specimens.find((s) => s.id === selectedDyeId) || specimens[0];

  // Dynamic color calculation based on pH and Iron
  const getDynamicColor = () => {
    if (hasIron) {
      return selectedSpecimen.colors.iron.hex;
    }

    if (phValue <= 4.5) {
      return selectedSpecimen.colors.acid.hex;
    } else if (phValue >= 8.5) {
      return selectedSpecimen.colors.alkaline.hex;
    } else {
      // Neutral range
      return selectedSpecimen.colors.alum.hex;
    }
  };

  const currentColorHex = getDynamicColor();

  const getPhAuxiliaryName = (ph: number) => {
    if (ph <= 3.5) return 'Citric Acid / Lemon Juice (pH 3)';
    if (ph <= 5.0) return 'Distilled White Vinegar (pH 4.5)';
    if (ph <= 7.5) return 'Neutral Tap / Rain Water (pH 7)';
    if (ph <= 8.5) return 'Baking Soda / Sodium Bicarbonate (pH 8.5)';
    return 'Washing Soda / Sodium Carbonate (pH 10)';
  };

  const getChemicalReactionNote = () => {
    switch (selectedSpecimen.id) {
      case 'turmeric-root':
        return hasIron
          ? 'Ferrous ions form a coordinate covalent complex with curcuminoids, transforming the radioactive neon marigold into an earthy antique bronze.'
          : phValue >= 8.5
          ? 'Dramatic keto-enol tautomerism: at pH 8+, the enolate ion of curcumin forms, shifting its optical absorption into the red-orange spectrum!'
          : phValue <= 4.5
          ? 'Acidic protonation stabilizes the yellow curcumin molecule, enhancing bright fluorescent lemon reflections.'
          : 'At neutral pH, curcumin exhibits warm golden saffron brilliance with direct affinity on fibers.';
      case 'red-cabbage':
        return hasIron
          ? 'Anthocyanin molecules crosslink with iron to form muted stormy sea-green and slate teal.'
          : phValue <= 4.5
          ? 'In strong acid, anthocyanin adopts the flavylium cation state, reflecting bright magenta-fuchsia pink.'
          : phValue >= 8.5
          ? 'In alkaline water, deprotonation transforms the pigment into a quinonoidal blue-green/teal base.'
          : 'At neutral pH 7, anthocyanins reflect an ethereal dusty periwinkle and smoky lavender.';
      case 'avocado-pits':
        return hasIron
          ? 'Dense condensed catechin tannins precipitate with iron to form a dusky lilac-gray charcoal.'
          : phValue >= 8.0
          ? 'A mild alkaline bath (pH 8–8.5) activates the persin sap, unlocking the deepest, most saturated antique blush and dusky rose.'
          : 'Low pH keeps tannins light, producing delicate salmon-peach and shell pink nuances.';
      case 'onion-skins':
        return hasIron
          ? 'Quercetin is a classic polyhydroxyflavonol. Ferrous ions replace hydroxyl hydrogens, creating the legendary olive-moss green coordination complex.'
          : phValue >= 8.5
          ? 'Alkaline conditions darken quercetin into rich caramel ochre and burnt topaz.'
          : 'Acid stabilizes the luminous honey-gold and sunlit brass tones.';
      case 'pomegranate-rinds':
        return hasIron
          ? 'High concentrations of hydrolyzable ellagitannins react immediately with iron to form insoluble ferro-tannate black—the exact chemistry of ancient iron gall manuscript ink!'
          : phValue >= 8.5
          ? 'Alkalinity darkens the natural tannins to rich antique mustard brass.'
          : 'Acidic water preserves the delicate chartreuse and pale olive-khaki cast.';
      default:
        return 'Naturally occurring polyphenols and flavonoids alter their conjugated double-bond absorption spectra depending on hydrogen ion concentration (pH) and metal coordination.';
    }
  };

  return (
    <section id="lab" className="py-16 md:py-24 border-b border-[#E6E0D5] bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C7E6D] mb-2">
            <span>SECTION 04</span>
            <span aria-hidden="true">·</span>
            <span>MOLECULAR REACTION LAB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1F1A15] tracking-tight">
            Interactive Modifier & pH Simulator
          </h2>
          <p className="text-sm sm:text-base text-[#686054] mt-2 leading-relaxed">
            Botanical dyestuffs are living chemical organisms. By simply adjusting your bath’s acidity (vinegar/lemon), alkalinity (baking soda/washing soda), or introducing iron water, a single dye pot can yield an entire chromatic rainbow.
          </p>
        </div>

        {/* Lab Workspace Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Controls (7 columns) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-[#E2DBD0] shadow-xs space-y-7">
            
            {/* 1. Pick Specimen */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#6B6154] mb-2.5">
                Select Botanical Specimen for Testing
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {specimens.map((specimen) => {
                  const isSelected = selectedDyeId === specimen.id;
                  return (
                    <button
                      key={specimen.id}
                      onClick={() => setSelectedDyeId(specimen.id)}
                      className={`p-3 rounded text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#8C5A37] bg-[#FAF7F2] ring-1 ring-[#8C5A37]'
                          : 'border-[#E6E0D5] hover:border-[#B5AA9A]'
                      }`}
                    >
                      <div 
                        className="w-5 h-5 rounded-full mb-1.5 border border-black/10 shadow-xs"
                        style={{ backgroundColor: specimen.colors.alum.hex }}
                      />
                      <span className="text-xs font-semibold text-[#24211D] block truncate">
                        {specimen.commonName}
                      </span>
                      <span className="text-[10px] font-mono text-[#8C7E6D] block truncate">
                        {specimen.scrapCategory}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Interactive pH Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#6B6154] flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-[#8C5A37]" />
                  <span>Dye Bath pH Level</span>
                </label>
                <div className="font-mono text-sm font-bold text-[#1F1A15]">
                  pH {phValue.toFixed(1)}
                </div>
              </div>

              <input
                type="range"
                min="3.0"
                max="10.0"
                step="0.5"
                value={phValue}
                onChange={(e) => setPhValue(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-gradient-to-r from-rose-200 via-amber-100 to-sky-200 rounded-lg appearance-none cursor-pointer accent-[#2B2620]"
              />

              {/* pH Milestones */}
              <div className="flex justify-between text-[10px] font-mono text-[#8C7E6D] mt-2">
                <span>pH 3.0 (Acid / Vinegar)</span>
                <span>pH 7.0 (Neutral Water)</span>
                <span>pH 10.0 (Washing Soda)</span>
              </div>

              <div className="mt-2.5 p-2.5 bg-[#FAF7F2] rounded border border-[#EAE3D6] text-xs text-[#5A5044] flex items-center justify-between">
                <span>Active Auxiliary:</span>
                <span className="font-medium text-[#1F1A15]">{getPhAuxiliaryName(phValue)}</span>
              </div>
            </div>

            {/* 3. Iron Water Modifier Toggle */}
            <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E2DBD0] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#24211D] block flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#5B6236]" />
                  <span>Iron Modifier After-Bath (Ferrous Sulfate / Rusty Water)</span>
                </span>
                <span className="text-[11px] text-[#6B6154] mt-0.5 block">
                  Chelates with polyphenols to sadden the hue into olive green, slate, charcoal, or dark gray
                </span>
              </div>

              <button
                onClick={() => setHasIron(!hasIron)}
                className={`px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer whitespace-nowrap ml-4 ${
                  hasIron
                    ? 'bg-[#5B6236] text-white border-[#5B6236]'
                    : 'bg-white text-[#5A5044] border-[#D6CEBE] hover:bg-[#F2ECE1]'
                }`}
              >
                {hasIron ? 'Iron Applied [ON]' : 'Add Iron [OFF]'}
              </button>
            </div>

            {/* Reset Defaults */}
            <div className="flex justify-end">
              <button
                onClick={() => { setPhValue(7.0); setHasIron(false); }}
                className="text-xs text-[#8C7E6D] hover:text-[#2B2620] flex items-center gap-1.5 cursor-pointer font-mono"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset to Neutral Bath</span>
              </button>
            </div>

          </div>

          {/* Right: Live Visual Textile Simulator (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* The Virtual Swatch Preview Card */}
            <div className="bg-white p-6 sm:p-7 rounded-lg border border-[#E2DBD0] shadow-md space-y-5">
              
              <div className="flex items-center justify-between border-b border-[#E6E0D5] pb-3">
                <span className="font-mono text-[11px] text-[#8C7E6D] uppercase">
                  SIMULATED TEXTILE SWATCH
                </span>
                <span className="font-mono text-xs font-bold text-[#1F1A15]">
                  {currentColorHex}
                </span>
              </div>

              {/* Textile Swatches in Side-by-Side Texture (Silk vs Linen) */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Linen Swatch */}
                <div>
                  <div 
                    className="w-full h-32 rounded-lg border border-black/15 shadow-inner transition-colors duration-500 relative overflow-hidden flex items-end p-2.5"
                    style={{ backgroundColor: currentColorHex }}
                  >
                    {/* Simulated subtle weave texture overlay */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none" />
                    <span className="relative z-10 text-[10px] font-mono text-white/90 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      Unbleached Linen
                    </span>
                  </div>
                  <span className="text-[11px] text-[#786D5E] font-mono block mt-1.5 text-center">
                    Cellulose Fiber
                  </span>
                </div>

                {/* Silk / Wool Swatch */}
                <div>
                  <div 
                    className="w-full h-32 rounded-lg border border-black/15 shadow-inner transition-colors duration-500 relative overflow-hidden flex items-end p-2.5"
                    style={{ backgroundColor: currentColorHex, filter: 'saturate(1.2) brightness(1.05)' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                    <span className="relative z-10 text-[10px] font-mono text-white/90 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      Mulberry Silk
                    </span>
                  </div>
                  <span className="text-[11px] text-[#786D5E] font-mono block mt-1.5 text-center">
                    Protein Fiber (Higher Lustre)
                  </span>
                </div>

              </div>

              {/* Chemical Reaction Explanation */}
              <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#EAE3D6] space-y-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8C5A37] flex items-center gap-1.5">
                  <Beaker className="w-3.5 h-3.5" />
                  <span>Molecular Mechanism</span>
                </span>
                <p className="text-xs text-[#433B32] leading-relaxed">
                  {getChemicalReactionNote()}
                </p>
              </div>

              {/* Active Conditions Summary Pill */}
              <div className="pt-2 text-[11px] font-mono text-[#8C7E6D] flex flex-wrap gap-2">
                <span>Dye: {selectedSpecimen.commonName.split(' ')[0]}</span>
                <span>·</span>
                <span>pH: {phValue.toFixed(1)}</span>
                <span>·</span>
                <span>Iron: {hasIron ? 'Present' : 'None'}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
