import React, { useState } from 'react';
import { BotanicalDye } from '../types/dye';
import { Scale, Printer, BookmarkPlus, Flame, Droplet, Clock, Check, Sparkles } from 'lucide-react';

interface RecipeCalculatorProps {
  specimens: BotanicalDye[];
  initialDyeId?: string;
  onSaveToJournal: (entry: {
    title: string;
    botanicalId: string;
    botanicalName: string;
    fiberType: any;
    fabricWeightGrams: number;
    scrapsWeightGrams: number;
    mordantUsed: string;
    resultingHex: string;
    notes: string;
  }) => void;
}

export const RecipeCalculator: React.FC<RecipeCalculatorProps> = ({
  specimens,
  initialDyeId,
  onSaveToJournal,
}) => {
  const [selectedDyeId, setSelectedDyeId] = useState<string>(initialDyeId || 'onion-skins');
  const [fabricWeight, setFabricWeight] = useState<number>(100); // 100 grams
  const [fiberType, setFiberType] = useState<'Linen' | 'Cotton' | 'Silk' | 'Wool' | 'Hemp'>('Linen');
  const [shadeDepth, setShadeDepth] = useState<'subtle' | 'medium' | 'saturated'>('medium');
  const [includeIronModifier, setIncludeIronModifier] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const selectedSpecimen = specimens.find((s) => s.id === selectedDyeId) || specimens[0];

  // Multiplier based on depth of shade
  const depthMultiplier = shadeDepth === 'subtle' ? 0.6 : shadeDepth === 'medium' ? 1.0 : 1.8;

  // Scrap calculation: (Fabric Weight * Base WOF % * depthMultiplier) / 100
  const baseWof = selectedSpecimen.recommendedWOF;
  const effectiveWof = Math.round(baseWof * depthMultiplier);
  const scrapsWeightNeeded = Math.round((fabricWeight * effectiveWof) / 100);

  // Liquor ratio (water volume): 20:1 for standard textiles, 30:1 for voluminous yarn
  const waterRatio = fiberType === 'Wool' ? 25 : 20;
  const waterLiters = ((fabricWeight * waterRatio) / 1000).toFixed(1);

  // Mordant: Alum at 12% for cellulose, 15% for protein
  const isProtein = fiberType === 'Silk' || fiberType === 'Wool';
  const alumPercentage = isProtein ? 15 : 12;
  const alumGrams = ((fabricWeight * alumPercentage) / 100).toFixed(1);
  const creamOfTartarGrams = isProtein ? ((fabricWeight * 5) / 100).toFixed(1) : null;

  // Approximate kitchen scrap counts
  const getScrapCountEstimate = (dyeId: string, grams: number) => {
    switch (dyeId) {
      case 'onion-skins':
        return `≈ ${Math.ceil(grams / 4)} dry onions' outer peelings`;
      case 'avocado-pits':
        return `≈ ${Math.ceil(grams / 35)} whole avocado pits + skins`;
      case 'pomegranate-rinds':
        return `≈ ${Math.ceil(grams / 25)} dried pomegranate shells`;
      case 'turmeric-root':
        return `≈ ${Math.ceil(grams / 15)} fresh finger rhizomes or tbsp`;
      case 'spent-coffee':
        return `≈ ${Math.ceil(grams / 18)} espresso shots / brewed cups`;
      case 'red-cabbage':
        return `≈ ${Math.ceil(grams / 30)} thick outer leaves`;
      default:
        return `${grams}g measured dry scraps`;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveJournal = () => {
    onSaveToJournal({
      title: `${selectedSpecimen.commonName} on ${fiberType}`,
      botanicalId: selectedSpecimen.id,
      botanicalName: selectedSpecimen.commonName,
      fiberType: fiberType,
      fabricWeightGrams: fabricWeight,
      scrapsWeightGrams: scrapsWeightNeeded,
      mordantUsed: selectedSpecimen.tanninLevel.includes('High') 
        ? 'Self-mordanting tannins' 
        : `${alumGrams}g Alum (${alumPercentage}% WOF)`,
      resultingHex: includeIronModifier 
        ? selectedSpecimen.colors.iron.hex 
        : selectedSpecimen.colors.alum.hex,
      notes: `Batch calibrated for ${shadeDepth} saturation (${effectiveWof}% WOF). Water liquor: ${waterLiters}L. Extraction: ${selectedSpecimen.extractionTempC}°C for ${selectedSpecimen.extractionDurationMinutes}m.`,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <section id="calculator" className="py-16 md:py-24 border-b border-[#E6E0D5]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C7E6D] mb-2">
            <span>SECTION 03</span>
            <span aria-hidden="true">·</span>
            <span>ATELIER RECIPE CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1F1A15] tracking-tight">
            Weight-of-Fabric (% WOF) Recipe Engine
          </h2>
          <p className="text-sm sm:text-base text-[#686054] mt-2 leading-relaxed">
            In botanical dyeing, precision prevents waste. Natural dye recipes scale directly to the bone-dry weight of your textile (Weight of Fabric / WOF). Input your fiber type and weight to generate an exact laboratory batch slip.
          </p>
        </div>

        {/* Two Column Layout: Calculator Controls vs Live Recipe Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Controls (7 columns) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-[#E2DBD0] shadow-xs space-y-6">
            
            {/* Step 1: Select Botanical Scrap */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#6B6154] mb-2">
                1. Select Botanical Food Scrap
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {specimens.slice(0, 6).map((specimen) => {
                  const isSelected = selectedDyeId === specimen.id;
                  return (
                    <button
                      key={specimen.id}
                      onClick={() => setSelectedDyeId(specimen.id)}
                      className={`p-2.5 rounded text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#8C5A37] bg-[#FAF7F2] ring-1 ring-[#8C5A37]'
                          : 'border-[#E6E0D5] hover:border-[#B5AA9A]'
                      }`}
                    >
                      <div 
                        className="w-4 h-4 rounded-full mb-1.5 border border-black/10"
                        style={{ backgroundColor: specimen.colors.alum.hex }}
                      />
                      <span className="text-xs font-medium text-[#24211D] block truncate">
                        {specimen.commonName.split(' ')[0]}
                      </span>
                      <span className="text-[10px] font-mono text-[#8C7E6D] block">
                        {specimen.recommendedWOF}% WOF
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Fiber Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#6B6154] mb-2">
                2. Select Textile Fiber Classification
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(['Linen', 'Cotton', 'Silk', 'Wool', 'Hemp'] as const).map((fiber) => {
                  const isSelected = fiberType === fiber;
                  const isProt = fiber === 'Silk' || fiber === 'Wool';
                  return (
                    <button
                      key={fiber}
                      onClick={() => setFiberType(fiber)}
                      className={`py-2 px-3 rounded text-center border text-xs font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#2B2620] text-[#FAF7F2] border-[#2B2620]'
                          : 'bg-white text-[#5A5044] border-[#D6CEBE] hover:bg-[#F7F3EC]'
                      }`}
                    >
                      <span>{fiber}</span>
                      <span className="block text-[10px] font-mono opacity-70 mt-0.5">
                        {isProt ? 'Protein' : 'Cellulose'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Fabric Weight Slider & Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#6B6154]">
                  3. Dry Fabric Weight (Grams)
                </label>
                <div className="flex items-center gap-1.5 font-mono text-sm font-semibold text-[#1F1A15]">
                  <span>{fabricWeight} g</span>
                  <span className="text-xs text-[#8C7E6D]">({(fabricWeight * 0.035274).toFixed(1)} oz)</span>
                </div>
              </div>

              <input
                type="range"
                min="20"
                max="500"
                step="5"
                value={fabricWeight}
                onChange={(e) => setFabricWeight(Number(e.target.value))}
                className="w-full h-2 bg-[#EFE9DD] rounded-lg appearance-none cursor-pointer accent-[#8C5A37]"
              />

              {/* Quick weight shortcuts */}
              <div className="flex items-center gap-2 mt-2.5">
                <span className="text-[11px] text-[#8C7E6D] font-mono">Quick load:</span>
                {[
                  { label: 'Bandana (45g)', val: 45 },
                  { label: 'Tea Towel (80g)', val: 80 },
                  { label: 'T-Shirt (150g)', val: 150 },
                  { label: 'Yarn Skein (100g)', val: 100 },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setFabricWeight(item.val)}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#E2DBD0] hover:bg-[#EAE2D5] text-[#5A5044] cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Desired Depth of Shade */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#6B6154] mb-2">
                4. Desired Depth of Chromatic Shade
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'subtle', title: 'Subtle Tint / Pastel', desc: '0.6× Scrap Ratio' },
                  { id: 'medium', title: 'Classic Medium', desc: '1.0× Baseline WOF' },
                  { id: 'saturated', title: 'Deep & Saturated', desc: '1.8× Rich Extraction' },
                ].map((shade) => {
                  const isSelected = shadeDepth === shade.id;
                  return (
                    <button
                      key={shade.id}
                      onClick={() => setShadeDepth(shade.id as any)}
                      className={`p-2.5 rounded border text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-[#8C5A37] bg-[#FAF7F2] ring-1 ring-[#8C5A37]'
                          : 'border-[#E6E0D5] hover:border-[#B5AA9A]'
                      }`}
                    >
                      <span className="text-xs font-semibold text-[#24211D] block">{shade.title}</span>
                      <span className="text-[10px] font-mono text-[#8C7E6D] block mt-0.5">{shade.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Optional Iron Shift Toggle */}
            <div className="pt-2 border-t border-[#F0EAE1] flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-[#24211D] block">Include Iron Modifier After-Bath</span>
                <span className="text-[11px] text-[#786D5E] block">Saddens color to olive green, slate, charcoal, or antique bronze</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeIronModifier}
                  onChange={(e) => setIncludeIronModifier(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#E6E0D5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5B6236]"></div>
              </label>
            </div>

          </div>

          {/* Right: Live Laboratory Recipe Card Slip (5 columns) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* The Physical Recipe Card (Designed to look like an archival printed lab card) */}
            <div className="bg-[#FAF7F2] border-2 border-[#D6CEBE] rounded-lg p-6 sm:p-7 shadow-md relative print:shadow-none print:border-black">
              
              {/* Card Header */}
              <div className="border-b border-[#D6CEBE] pb-4 mb-5 flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C7E6D] block">
                    FORMULATION SLIP // BATCH CALIBRATION
                  </span>
                  <h3 className="text-2xl font-editorial font-medium text-[#1F1A15] mt-1">
                    {selectedSpecimen.commonName}
                  </h3>
                  <p className="font-serif italic text-xs text-[#8C5A37] mt-0.5">
                    Target Fiber: {fabricWeight}g Dry {fiberType} ({isProtein ? 'Protein' : 'Cellulose'})
                  </p>
                </div>

                {/* Target Color Swatch Chip */}
                <div className="text-right">
                  <div 
                    className="w-12 h-12 rounded border border-black/15 shadow-inner ml-auto"
                    style={{ 
                      backgroundColor: includeIronModifier 
                        ? selectedSpecimen.colors.iron.hex 
                        : selectedSpecimen.colors.alum.hex 
                    }}
                  />
                  <span className="font-mono text-[10px] text-[#786D5E] block mt-1">
                    {includeIronModifier ? 'Iron Shift' : 'Alum Base'}
                  </span>
                </div>
              </div>

              {/* Exact Quantities List */}
              <div className="space-y-4 text-xs font-mono">
                
                {/* Kitchen Scraps Needed */}
                <div className="p-3 bg-white rounded border border-[#E2DBD0] flex items-center justify-between">
                  <div>
                    <span className="text-[#8C7E6D] text-[10px] block">KITCHEN SCRAPS REQUIRED ({effectiveWof}% WOF)</span>
                    <span className="text-lg font-bold text-[#1F1A15]">{scrapsWeightNeeded} grams</span>
                    <span className="text-[11px] text-[#5B6236] block mt-0.5">
                      {getScrapCountEstimate(selectedSpecimen.id, scrapsWeightNeeded)}
                    </span>
                  </div>
                  <Scale className="w-5 h-5 text-[#8C5A37]" />
                </div>

                {/* Water Volume */}
                <div className="p-3 bg-white rounded border border-[#E2DBD0] flex items-center justify-between">
                  <div>
                    <span className="text-[#8C7E6D] text-[10px] block">WATER LIQUOR VOLUME ({waterRatio}:1 RATIO)</span>
                    <span className="text-base font-bold text-[#1F1A15]">{waterLiters} Liters</span>
                    <span className="text-[11px] text-[#786D5E] block mt-0.5">Soft or filtered rain water preferred</span>
                  </div>
                  <Droplet className="w-5 h-5 text-[#4A7A8C]" />
                </div>

                {/* Mordant & Auxiliaries */}
                <div className="p-3 bg-white rounded border border-[#E2DBD0] space-y-1.5">
                  <span className="text-[#8C7E6D] text-[10px] block">MORDANT PREPARATION</span>
                  
                  {selectedSpecimen.tanninLevel.includes('High') ? (
                    <div className="text-[#5B6236] font-sans text-xs">
                      <strong>Self-Mordanting:</strong> High natural tannin content; alum optional for cellulose.
                    </div>
                  ) : (
                    <div className="flex justify-between items-center text-xs">
                      <span>Alum (Potassium Aluminum Sulfate):</span>
                      <strong className="text-[#1F1A15]">{alumGrams}g ({alumPercentage}% WOF)</strong>
                    </div>
                  )}

                  {creamOfTartarGrams && (
                    <div className="flex justify-between items-center text-xs text-[#786D5E]">
                      <span>Cream of Tartar (Luster & Softness):</span>
                      <strong>{creamOfTartarGrams}g (5% WOF)</strong>
                    </div>
                  )}

                  {includeIronModifier && (
                    <div className="flex justify-between items-center text-xs text-[#5B6236] pt-1 border-t border-[#F0EAE1]">
                      <span>Iron Modifier Afterbath:</span>
                      <strong>2 tbsp homemade iron water or 1.5g FeSO4</strong>
                    </div>
                  )}
                </div>

                {/* Thermal & Timing Schedule */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-white rounded border border-[#E2DBD0]">
                    <Flame className="w-3.5 h-3.5 text-[#A63821] mx-auto mb-1" />
                    <span className="text-[10px] text-[#8C7E6D] block">EXTRACTION TEMP</span>
                    <strong className="text-[#1F1A15]">{selectedSpecimen.extractionTempC}°C (Sub-boil)</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-[#E2DBD0]">
                    <Clock className="w-3.5 h-3.5 text-[#8C7E6D] mx-auto mb-1" />
                    <span className="text-[10px] text-[#8C7E6D] block">DYE IMMERSION</span>
                    <strong className="text-[#1F1A15]">{selectedSpecimen.extractionDurationMinutes} Minutes</strong>
                  </div>
                </div>

              </div>

              {/* Card Actions */}
              <div className="mt-6 pt-4 border-t border-[#D6CEBE] flex items-center gap-3">
                <button
                  onClick={handleSaveJournal}
                  className="flex-1 py-2 px-3 bg-[#2B2620] text-[#FAF7F2] text-xs font-medium rounded hover:bg-[#433B32] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Logged in Journal!</span>
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="w-3.5 h-3.5 text-[#C5A337]" />
                      <span>Log to Dye Journal</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePrint}
                  className="py-2 px-3 bg-white text-[#24211D] border border-[#D6CEBE] text-xs font-medium rounded hover:bg-[#F2ECE1] transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Print Recipe Card"
                >
                  <Printer className="w-3.5 h-3.5 text-[#8C7E6D]" />
                  <span>Print Slip</span>
                </button>
              </div>

            </div>

            {/* Quick Kitchen Collection Pro-Tip */}
            <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E4DDD0] text-xs text-[#5A5044] leading-relaxed">
              <span className="font-semibold text-[#1F1A15] block mb-1">
                Zero-Waste Kitchen Tip:
              </span>
              Collect your scraps over 2–3 weeks in your freezer or a brown paper grocery bag. Weighing before freezing ensures you have exact quantities ready before lighting the stove.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
