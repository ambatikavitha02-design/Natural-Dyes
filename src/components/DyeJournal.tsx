import React, { useState } from 'react';
import { JournalEntry } from '../types/dye';
import { Plus, Trash2, Calendar, BookOpen, Tag, Check, Download } from 'lucide-react';

interface DyeJournalProps {
  entries: JournalEntry[];
  onAddEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  onDeleteEntry: (id: string) => void;
}

export const DyeJournal: React.FC<DyeJournalProps> = ({
  entries,
  onAddEntry,
  onDeleteEntry,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [botanicalName, setBotanicalName] = useState('Yellow Onion Skins');
  const [fiberType, setFiberType] = useState<any>('Linen');
  const [fabricWeight, setFabricWeight] = useState(80);
  const [scrapsWeight, setScrapsWeight] = useState(30);
  const [mordant, setMordant] = useState('Alum (12% WOF)');
  const [modifier, setModifier] = useState('None (Neutral bath)');
  const [resultingHex, setResultingHex] = useState('#D99824');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddEntry({
      title,
      date: new Date().toISOString().split('T')[0],
      botanicalId: botanicalName.toLowerCase().replace(/\s+/g, '-'),
      botanicalName,
      fiberType,
      fabricWeightGrams: Number(fabricWeight),
      scrapsWeightGrams: Number(scrapsWeight),
      mordantUsed: mordant,
      modifierUsed: modifier,
      resultingHex,
      swatchLabel: 'Custom Batch',
      notes,
    });

    // Reset form
    setTitle('');
    setNotes('');
    setShowAddForm(false);
  };

  const handleExportJournal = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(entries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `botanical-dye-journal-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="journal" className="py-16 md:py-24 border-b border-[#E6E0D5] bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#8C7E6D] mb-2">
              <span>SECTION 06</span>
              <span aria-hidden="true">·</span>
              <span>PRACTITIONER ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1F1A15] tracking-tight">
              Botanical Dye Batch Journal
            </h2>
            <p className="text-sm sm:text-base text-[#686054] mt-2 max-w-2xl">
              Document your culinary dye pots, record exact fiber weights, mordant calibrations, and resulting textile swatches across your home experiments.
            </p>
          </div>

          {/* Journal Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-[#2B2620] text-[#FAF7F2] text-xs font-medium rounded hover:bg-[#433B32] transition-colors flex items-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Cancel Form' : 'Log New Dye Batch'}</span>
            </button>

            {entries.length > 0 && (
              <button
                onClick={handleExportJournal}
                className="px-3.5 py-2 bg-white text-[#24211D] border border-[#D6CEBE] text-xs font-medium rounded hover:bg-[#F2ECE1] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Export Journal as JSON"
              >
                <Download className="w-3.5 h-3.5 text-[#8C7E6D]" />
                <span>Export</span>
              </button>
            )}
          </div>
        </div>

        {/* Add Entry Collapsible Form */}
        {showAddForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-10 p-6 sm:p-8 bg-white rounded-lg border border-[#8C5A37]/30 shadow-md space-y-6"
          >
            <h3 className="font-editorial text-xl text-[#1F1A15] border-b border-[#E6E0D5] pb-3">
              Record New Kitchen Batch
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
              <div>
                <label className="block font-mono uppercase text-[#6B6154] mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Avocado Pit Bandana #3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 bg-[#FAF7F2] border border-[#D6CEBE] rounded text-xs text-[#24211D] focus:outline-none focus:border-[#8C5A37]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#6B6154] mb-1">
                  Botanical Food Scrap
                </label>
                <select
                  value={botanicalName}
                  onChange={(e) => setBotanicalName(e.target.value)}
                  className="w-full p-2 bg-[#FAF7F2] border border-[#D6CEBE] rounded text-xs text-[#24211D] focus:outline-none focus:border-[#8C5A37]"
                >
                  <option value="Yellow Onion Skins">Yellow Onion Skins</option>
                  <option value="Avocado Pits & Skins">Avocado Pits & Skins</option>
                  <option value="Pomegranate Rinds">Pomegranate Rinds</option>
                  <option value="Turmeric Roots">Turmeric Roots</option>
                  <option value="Spent Coffee Grounds">Spent Coffee Grounds</option>
                  <option value="Red Cabbage Leaves">Red Cabbage Leaves</option>
                  <option value="Black Walnut Husks">Black Walnut Husks</option>
                  <option value="Beet Peels">Beet Peels</option>
                </select>
              </div>

              <div>
                <label className="block font-mono uppercase text-[#6B6154] mb-1">
                  Textile Fiber
                </label>
                <select
                  value={fiberType}
                  onChange={(e) => setFiberType(e.target.value)}
                  className="w-full p-2 bg-[#FAF7F2] border border-[#D6CEBE] rounded text-xs text-[#24211D] focus:outline-none focus:border-[#8C5A37]"
                >
                  <option value="Linen">Flax Linen</option>
                  <option value="Cotton">Organic Cotton</option>
                  <option value="Silk">Mulberry Silk</option>
                  <option value="Wool">Highland Wool</option>
                  <option value="Hemp">Hemp Canvas</option>
                </select>
              </div>

              <div>
                <label className="block font-mono uppercase text-[#6B6154] mb-1">
                  Dry Fabric Weight (g)
                </label>
                <input
                  type="number"
                  min="1"
                  value={fabricWeight}
                  onChange={(e) => setFabricWeight(Number(e.target.value))}
                  className="w-full p-2 bg-[#FAF7F2] border border-[#D6CEBE] rounded text-xs text-[#24211D] focus:outline-none focus:border-[#8C5A37]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#6B6154] mb-1">
                  Kitchen Scrap Weight (g)
                </label>
                <input
                  type="number"
                  min="1"
                  value={scrapsWeight}
                  onChange={(e) => setScrapsWeight(Number(e.target.value))}
                  className="w-full p-2 bg-[#FAF7F2] border border-[#D6CEBE] rounded text-xs text-[#24211D] focus:outline-none focus:border-[#8C5A37]"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-[#6B6154] mb-1">
                  Resulting Color Swatch
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={resultingHex}
                    onChange={(e) => setResultingHex(e.target.value)}
                    className="w-9 h-8 p-0.5 rounded border border-[#D6CEBE] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={resultingHex}
                    onChange={(e) => setResultingHex(e.target.value)}
                    className="w-full p-2 bg-[#FAF7F2] border border-[#D6CEBE] rounded font-mono text-xs text-[#24211D]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-mono uppercase text-[#6B6154] mb-1 text-xs">
                Experimental Notes & Observations
              </label>
              <textarea
                rows={3}
                placeholder="Observed temperature, soaking duration, pH adjustments, water hardness..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#D6CEBE] rounded text-xs text-[#24211D] focus:outline-none focus:border-[#8C5A37]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-white text-[#5A5044] border border-[#D6CEBE] rounded text-xs font-medium hover:bg-[#F2ECE1] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2B2620] text-[#FAF7F2] rounded text-xs font-medium hover:bg-[#433B32] transition-colors cursor-pointer"
              >
                Save Batch to Archive
              </button>
            </div>
          </form>
        )}

        {/* Entries Display */}
        {entries.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-lg border border-[#E2DBD0]">
            <BookOpen className="w-10 h-10 text-[#8C7E6D] mx-auto mb-3 stroke-[1.5]" />
            <p className="font-editorial text-lg text-[#1F1A15]">Your Atelier Journal is Empty</p>
            <p className="text-xs text-[#786D5E] mt-1 max-w-sm mx-auto">
              Use the Recipe Calculator above to formulate your first batch, or click "Log New Dye Batch" to record an existing piece.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-lg border border-[#E2DBD0] p-5 flex flex-col justify-between shadow-xs hover:border-[#8C5A37] transition-colors"
              >
                <div>
                  {/* Top Swatch & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded border border-black/10 shadow-xs"
                        style={{ backgroundColor: entry.resultingHex }}
                      />
                      <span className="font-mono text-xs font-semibold text-[#1F1A15]">
                        {entry.resultingHex}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8C7E6D]">
                      <Calendar className="w-3 h-3" />
                      <span>{entry.date}</span>
                    </div>
                  </div>

                  {/* Title & Scrap */}
                  <h4 className="font-editorial text-lg font-medium text-[#1F1A15] leading-snug">
                    {entry.title}
                  </h4>
                  <div className="text-xs text-[#8C5A37] font-serif italic mt-0.5">
                    {entry.botanicalName} · {entry.fiberType}
                  </div>

                  {/* Quantities */}
                  <div className="mt-3 pt-3 border-t border-[#F0EAE1] grid grid-cols-2 gap-2 text-[11px] font-mono text-[#5A5044]">
                    <div>
                      <span className="text-[#8C7E6D] block text-[10px]">CLOTH:</span>
                      <span>{entry.fabricWeightGrams}g dry</span>
                    </div>
                    <div>
                      <span className="text-[#8C7E6D] block text-[10px]">SCRAPS:</span>
                      <span>{entry.scrapsWeightGrams}g ({Math.round((entry.scrapsWeightGrams / (entry.fabricWeightGrams || 1)) * 100)}% WOF)</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {entry.notes && (
                    <p className="mt-3 text-xs text-[#5A5044] bg-[#FAF7F2] p-2.5 rounded border border-[#EAE3D6] leading-relaxed">
                      {entry.notes}
                    </p>
                  )}
                </div>

                {/* Footer Action */}
                <div className="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8C7E6D] text-[10px]">ATELIER ARCHIVE</span>
                  <button
                    onClick={() => onDeleteEntry(entry.id)}
                    className="p-1 text-[#8C7E6D] hover:text-[#A63821] transition-colors cursor-pointer"
                    title="Delete entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
