import React, { useState, useMemo } from 'react';
import { BotanicalDye } from '../types/dye';
import { Search, SlidersHorizontal, ArrowUpRight, Sun, Droplet } from 'lucide-react';

interface SpecimenGalleryProps {
  specimens: BotanicalDye[];
  onSelectSpecimen: (specimen: BotanicalDye) => void;
  onOpenCalculator: (dyeId: string) => void;
}

type FilterCategory = 'all' | 'high-fastness' | 'self-mordanting' | 'kitchen-staples' | 'ephemeral';

export const SpecimenGallery: React.FC<SpecimenGalleryProps> = ({
  specimens,
  onSelectSpecimen,
  onOpenCalculator,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredSpecimens = useMemo(() => {
    return specimens.filter((item) => {
      // Search matching
      const matchesSearch =
        item.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.scrapCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.primaryChromophore.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category matching
      if (selectedFilter === 'high-fastness') {
        return item.fastness.lightfastness >= 4.0 && item.fastness.washfastness >= 4.0;
      }
      if (selectedFilter === 'self-mordanting') {
        return item.tanninLevel.includes('High');
      }
      if (selectedFilter === 'kitchen-staples') {
        return ['onion-skins', 'avocado-pits', 'pomegranate-rinds', 'turmeric-root'].includes(item.id);
      }
      if (selectedFilter === 'ephemeral') {
        return item.fastness.lightfastness < 3.0;
      }

      return true;
    });
  }, [specimens, searchQuery, selectedFilter]);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="specimens" className="py-16 md:py-24 border-b border-[#E6E0D5]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C7E6D] mb-2">
              <span>SECTION 01</span>
              <span aria-hidden="true">·</span>
              <span>HERBARIUM SPECIMENS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1F1A15] tracking-tight">
              Botanical Specimens & Food Waste Sources
            </h2>
            <p className="text-sm sm:text-base text-[#686054] mt-2 max-w-2xl">
              Explore primary kitchen scraps, their active chromophores, and the spectrum of hues unlocked through alum, iron, and pH shifting.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8C7E6D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search botanical or scrap..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#D6CEBE] rounded text-xs text-[#24211D] placeholder:text-[#9E9485] focus:outline-none focus:border-[#8C5A37] transition-colors"
            />
          </div>
        </div>

        {/* Interactive Filter Tabs (Segmented Controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 text-xs font-medium no-scrollbar">
          {[
            { id: 'all', label: 'All Specimens (8)' },
            { id: 'kitchen-staples', label: 'Four Kitchen Staples' },
            { id: 'high-fastness', label: 'High Fastness (★4-5)' },
            { id: 'self-mordanting', label: 'Self-Mordanting Tannins' },
            { id: 'ephemeral', label: 'Living & Ephemeral Colors' },
          ].map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as FilterCategory)}
                className={`px-3 py-1.5 rounded transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#2B2620] text-[#FAF7F2] shadow-xs'
                    : 'bg-white text-[#5A5044] border border-[#D6CEBE] hover:bg-[#F2ECE1] hover:text-[#1F1A15]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Specimen Cards Grid */}
        {filteredSpecimens.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-[#E6E0D5]">
            <p className="text-sm font-mono text-[#8C7E6D]">NO SPECIMENS MATCHING CURRENT FILTER</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
              className="mt-3 text-xs text-[#8C5A37] underline hover:text-[#2B2620] cursor-pointer"
            >
              Reset filters and view all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpecimens.map((item) => {
              const hasFailedImage = failedImages[item.id];
              return (
                <article
                  key={item.id}
                  className="group bg-white rounded-lg border border-[#E2DBD0] overflow-hidden hover:border-[#8C5A37] transition-all duration-300 flex flex-col shadow-xs"
                >
                  {/* Top Visual Swatch Box */}
                  <div 
                    className="relative h-48 sm:h-52 bg-[#EFE9DD] overflow-hidden cursor-pointer"
                    onClick={() => onSelectSpecimen(item)}
                  >
                    {!hasFailedImage ? (
                      <img
                        src={item.featuredImage}
                        alt={item.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(item.id)}
                      />
                    ) : (
                      <div 
                        className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
                        style={{ backgroundColor: item.colors.alum.hex + '20' }}
                      >
                        <div 
                          className="w-12 h-12 rounded-full mb-2 shadow-xs border border-black/10"
                          style={{ backgroundColor: item.colors.alum.hex }}
                        />
                        <span className="font-editorial text-lg text-[#2B2620]">{item.commonName}</span>
                      </div>
                    )}

                    {/* Quiet Accession code overlay */}
                    <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-mono text-[#5A5044] border border-[#E6E0D5]">
                      {item.folioNumber}
                    </div>

                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#2B2620] text-[#FAF7F2] text-[11px] px-2.5 py-1 rounded flex items-center gap-1 font-mono">
                      <span>View Dossier</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div>
                      {/* Botanical Classification (Zero Pill Discipline - Unboxed text with ·) */}
                      <div className="flex items-center gap-2 text-xs text-[#786D5E] font-mono mb-1.5">
                        <span className="italic font-serif text-[#8C5A37]">{item.botanicalName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.scrapCategory}</span>
                      </div>

                      {/* Main Title */}
                      <h3 
                        onClick={() => onSelectSpecimen(item)}
                        className="text-xl font-editorial font-medium text-[#1F1A15] group-hover:text-[#8C5A37] transition-colors cursor-pointer"
                      >
                        {item.commonName}
                      </h3>

                      <p className="text-xs text-[#5A5044] mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Chromatic Range Swatches Bar */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#8C7E6D] mb-1.5">
                        <span>PALETTE MATRIX</span>
                        <span>Alum / Iron / Acid / Base</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 h-8">
                        <div 
                          className="rounded-xs border border-black/10 relative group/chip"
                          style={{ backgroundColor: item.colors.alum.hex }}
                          title={`Alum: ${item.colors.alum.name} (${item.colors.alum.hex})`}
                        />
                        <div 
                          className="rounded-xs border border-black/10 relative group/chip"
                          style={{ backgroundColor: item.colors.iron.hex }}
                          title={`Iron: ${item.colors.iron.name} (${item.colors.iron.hex})`}
                        />
                        <div 
                          className="rounded-xs border border-black/10 relative group/chip"
                          style={{ backgroundColor: item.colors.acid.hex }}
                          title={`Acid: ${item.colors.acid.name} (${item.colors.acid.hex})`}
                        />
                        <div 
                          className="rounded-xs border border-black/10 relative group/chip"
                          style={{ backgroundColor: item.colors.alkaline.hex }}
                          title={`Alkaline: ${item.colors.alkaline.name} (${item.colors.alkaline.hex})`}
                        />
                      </div>
                    </div>

                    {/* Card Footer: Fastness Star Summary & Actions */}
                    <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3 text-[#5A5044] font-mono">
                        <span className="flex items-center gap-1" title="Lightfastness rating">
                          <Sun className="w-3.5 h-3.5 text-[#C5A337]" />
                          <span>{item.fastness.lightfastness}</span>
                        </span>
                        <span className="flex items-center gap-1" title="Washfastness rating">
                          <Droplet className="w-3.5 h-3.5 text-[#4A7A8C]" />
                          <span>{item.fastness.washfastness}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenCalculator(item.id)}
                          className="px-2.5 py-1 text-[11px] font-medium text-[#24211D] bg-[#F7F3EC] hover:bg-[#EAE2D5] rounded border border-[#D6CEBE] transition-colors cursor-pointer"
                        >
                          Formulate
                        </button>
                        <button
                          onClick={() => onSelectSpecimen(item)}
                          className="text-[11px] font-medium text-[#8C5A37] hover:text-[#2B2620] transition-colors cursor-pointer"
                        >
                          Dossier →
                        </button>
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
