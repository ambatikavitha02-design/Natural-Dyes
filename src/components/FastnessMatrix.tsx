import React, { useState, useMemo } from 'react';
import { BotanicalDye } from '../types/dye';
import { Sun, Droplet, ArrowUpDown, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

interface FastnessMatrixProps {
  specimens: BotanicalDye[];
  onSelectSpecimen: (specimen: BotanicalDye) => void;
}

type SortField = 'lightfastness' | 'washfastness' | 'name' | 'category';

export const FastnessMatrix: React.FC<FastnessMatrixProps> = ({ specimens, onSelectSpecimen }) => {
  const [sortField, setSortField] = useState<SortField>('lightfastness');
  const [sortAsc, setSortAsc] = useState(false);

  const sortedSpecimens = useMemo(() => {
    return [...specimens].sort((a, b) => {
      let comparison = 0;
      if (sortField === 'lightfastness') {
        comparison = a.fastness.lightfastness - b.fastness.lightfastness;
      } else if (sortField === 'washfastness') {
        comparison = a.fastness.washfastness - b.fastness.washfastness;
      } else if (sortField === 'name') {
        comparison = a.commonName.localeCompare(b.commonName);
      } else if (sortField === 'category') {
        comparison = a.scrapCategory.localeCompare(b.scrapCategory);
      }
      return sortAsc ? comparison : -comparison;
    });
  }, [specimens, sortField, sortAsc]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false); // default descending for ratings
    }
  };

  const getLongevityBadge = (score: number) => {
    if (score >= 4.5) {
      return {
        text: 'Archival Permanent',
        color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
        desc: 'Centuries of resistance',
      };
    } else if (score >= 3.5) {
      return {
        text: 'Durable Daily Wear',
        color: 'text-amber-800 bg-amber-50 border-amber-200',
        desc: 'Years of wash stability',
      };
    } else {
      return {
        text: 'Living / Fugitive',
        color: 'text-rose-800 bg-rose-50 border-rose-200',
        desc: 'Seasonal & UV sensitive',
      };
    }
  };

  return (
    <section id="matrix" className="py-16 md:py-24 border-b border-[#E6E0D5] bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C7E6D] mb-2">
            <span>SECTION 02</span>
            <span aria-hidden="true">·</span>
            <span>COLOR-FASTNESS ARCHIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1F1A15] tracking-tight">
            Color-Fastness Ratings & Stability Matrix
          </h2>
          <p className="text-sm sm:text-base text-[#686054] mt-2 leading-relaxed">
            Botanical dyestuffs are often misunderstood: some food waste dyes (like pomegranate and onion skins) rival modern commercial pigments in permanence, while others (like cabbage and turmeric) are dynamic, fugitive colors that live and shift with sunlight and pH.
          </p>
        </div>

        {/* Informational Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-xs">
          <div className="bg-white p-4 rounded-lg border border-[#E6E0D5] space-y-1.5">
            <span className="font-mono text-emerald-800 font-semibold block flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              ARCHIVAL TIER (★ 4.5 – 5.0)
            </span>
            <p className="text-[#5A5044] leading-relaxed">
              <strong>Pomegranate, Onion Skins, Black Walnut</strong>: Bound by dense polyphenols and metal chelate bridges. Immune to normal laundering and direct room daylight.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#E6E0D5] space-y-1.5">
            <span className="font-mono text-amber-800 font-semibold block flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              DURABLE MODERATE (★ 3.5 – 4.0)
            </span>
            <p className="text-[#5A5044] leading-relaxed">
              <strong>Avocado Pits, Spent Coffee</strong>: High condensed catechin tannins. With gentle pH-neutral laundering, retains rich antique hues indefinitely.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-[#E6E0D5] space-y-1.5">
            <span className="font-mono text-rose-800 font-semibold block flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-700" />
              FUGITIVE / LIVING (★ 2.0 – 2.5)
            </span>
            <p className="text-[#5A5044] leading-relaxed">
              <strong>Turmeric, Red Cabbage, Beet Tops</strong>: Anthocyanins and direct curcuminoids. Fugitive in direct UV; wonderful for seasonal bandanas and meditative craft.
            </p>
          </div>
        </div>

        {/* Interactive Matrix Table */}
        <div className="bg-white rounded-lg border border-[#E2DBD0] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E6E0D5] bg-[#FAF7F2] text-[11px] font-mono text-[#786D5E] uppercase tracking-wider">
                  <th className="py-3.5 px-5 font-medium">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-1.5 hover:text-[#1F1A15] cursor-pointer"
                    >
                      <span>Botanical Specimen</span>
                      <ArrowUpDown className="w-3 h-3 text-[#8C7E6D]" />
                    </button>
                  </th>
                  <th className="py-3.5 px-4 font-medium">Scrap Origin</th>
                  <th className="py-3.5 px-4 font-medium">
                    <button
                      onClick={() => handleSort('lightfastness')}
                      className="flex items-center gap-1.5 hover:text-[#1F1A15] cursor-pointer"
                    >
                      <span>Lightfastness</span>
                      <ArrowUpDown className="w-3 h-3 text-[#8C7E6D]" />
                    </button>
                  </th>
                  <th className="py-3.5 px-4 font-medium">
                    <button
                      onClick={() => handleSort('washfastness')}
                      className="flex items-center gap-1.5 hover:text-[#1F1A15] cursor-pointer"
                    >
                      <span>Washfastness</span>
                      <ArrowUpDown className="w-3 h-3 text-[#8C7E6D]" />
                    </button>
                  </th>
                  <th className="py-3.5 px-4 font-medium">Mordant Need</th>
                  <th className="py-3.5 px-4 font-medium">Longevity Class</th>
                  <th className="py-3.5 px-4 font-medium text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EAE1] text-xs">
                {sortedSpecimens.map((specimen) => {
                  const longevity = getLongevityBadge(specimen.fastness.lightfastness);
                  return (
                    <tr 
                      key={specimen.id}
                      className="hover:bg-[#FAF7F2] transition-colors"
                    >
                      {/* Name & Chromophore */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-7 h-7 rounded shrink-0 shadow-inner border border-black/10"
                            style={{ backgroundColor: specimen.colors.alum.hex }}
                            title={`Natural hue: ${specimen.colors.alum.hex}`}
                          />
                          <div>
                            <span className="font-editorial text-base font-medium text-[#1F1A15] block">
                              {specimen.commonName}
                            </span>
                            <span className="italic font-serif text-[11px] text-[#8C5A37]">
                              {specimen.botanicalName}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Scrap category */}
                      <td className="py-4 px-4 font-mono text-[#5A5044]">
                        {specimen.scrapCategory}
                      </td>

                      {/* Lightfastness */}
                      <td className="py-4 px-4 font-mono">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 font-medium text-[#24211D]">
                            <Sun className="w-3.5 h-3.5 text-[#C5A337]" />
                            <span>{specimen.fastness.lightfastness.toFixed(1)} / 5.0</span>
                          </div>
                          <div className="w-24 bg-[#EFE9DD] h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#C5A337] h-full rounded-full"
                              style={{ width: `${(specimen.fastness.lightfastness / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Washfastness */}
                      <td className="py-4 px-4 font-mono">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 font-medium text-[#24211D]">
                            <Droplet className="w-3.5 h-3.5 text-[#4A7A8C]" />
                            <span>{specimen.fastness.washfastness.toFixed(1)} / 5.0</span>
                          </div>
                          <div className="w-24 bg-[#EFE9DD] h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#4A7A8C] h-full rounded-full"
                              style={{ width: `${(specimen.fastness.washfastness / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Mordant requirement */}
                      <td className="py-4 px-4 text-[#5A5044]">
                        <span className="font-medium text-[#24211D] block">
                          {specimen.tanninLevel.includes('High') ? 'Self-Mordanting' : 'Alum Recommended'}
                        </span>
                        <span className="text-[11px] text-[#786D5E] font-mono">
                          {specimen.tanninLevel}
                        </span>
                      </td>

                      {/* Longevity Category */}
                      <td className="py-4 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-mono border ${longevity.color}`}>
                          {longevity.text}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => onSelectSpecimen(specimen)}
                          className="px-2.5 py-1 text-[11px] font-medium text-[#8C5A37] hover:text-[#1F1A15] hover:bg-[#F2ECE1] rounded border border-transparent hover:border-[#D6CEBE] transition-colors cursor-pointer"
                        >
                          View Dossier →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer with care note */}
          <div className="p-4 bg-[#FAF7F2] border-t border-[#E6E0D5] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B6154] gap-2 font-mono">
            <span>METHODOLOGY: ASSESSED VIA ISO 105-B02 (LIGHT) & ISO 105-C06 (DOMESTIC WASHING)</span>
            <span>RATINGS CALIBRATED ON PRE-MORDANTED UNBLEACHED FLAX LINEN</span>
          </div>
        </div>

      </div>
    </section>
  );
};
