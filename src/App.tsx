/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BOTANICAL_DYES } from './data/dyes';
import { BotanicalDye, JournalEntry } from './types/dye';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SpecimenGallery } from './components/SpecimenGallery';
import { SpecimenModal } from './components/SpecimenModal';
import { FastnessMatrix } from './components/FastnessMatrix';
import { RecipeCalculator } from './components/RecipeCalculator';
import { ModifierLab } from './components/ModifierLab';
import { DiyGuides } from './components/DiyGuides';
import { DyeJournal } from './components/DyeJournal';
import { Footer } from './components/Footer';
import { AiChatDrawer } from './components/AiChatDrawer';
import { Sparkles, MessageSquare } from 'lucide-react';

const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'entry-01',
    title: 'Flax Linen Bread Bag',
    date: '2026-09-15',
    botanicalId: 'onion-skins',
    botanicalName: 'Yellow Onion Skins',
    fiberType: 'Linen',
    fabricWeightGrams: 85,
    scrapsWeightGrams: 35,
    mordantUsed: 'Alum 12% WOF + 3-min Iron Water Dip',
    modifierUsed: 'Ferrous Acetate Afterbath',
    resultingHex: '#5B6236',
    swatchLabel: 'Forest Moss & Olive',
    notes: 'Steeped dry skins at 85°C for 60 min. The initial yellow shifted to rich forest moss within 90 seconds in the iron water.',
  },
  {
    id: 'entry-02',
    title: 'Mulberry Silk Scarf',
    date: '2026-09-20',
    botanicalId: 'avocado-pits',
    botanicalName: 'Avocado Pits & Skins',
    fiberType: 'Silk',
    fabricWeightGrams: 42,
    scrapsWeightGrams: 75,
    mordantUsed: 'Self-mordanting tannins',
    modifierUsed: 'Pinch of Washing Soda (pH 8)',
    resultingHex: '#DCA295',
    swatchLabel: 'Antique Blush Rose',
    notes: 'Used 6 chopped pits and outer skins. Kept heat strictly under 75°C to prevent browning. Let soak in cold bath overnight.',
  },
  {
    id: 'entry-03',
    title: 'Organic Cotton Bandana',
    date: '2026-09-24',
    botanicalId: 'pomegranate-rinds',
    botanicalName: 'Pomegranate Rinds',
    fiberType: 'Cotton',
    fabricWeightGrams: 50,
    scrapsWeightGrams: 20,
    mordantUsed: 'Pomegranate natural tannin bath',
    modifierUsed: 'Homemade iron water dip',
    resultingHex: '#373A3E',
    swatchLabel: 'Deep Ink Slate',
    notes: 'Contact botanical printing with wooden clamps (shibori). White resists contrast dramatically against the iron charcoal.',
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('specimens');
  const [selectedSpecimen, setSelectedSpecimen] = useState<BotanicalDye | null>(null);
  const [calculatorDyeId, setCalculatorDyeId] = useState<string>('onion-skins');
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    try {
      const stored = localStorage.getItem('botanical_dye_journal');
      return stored ? JSON.parse(stored) : INITIAL_JOURNAL_ENTRIES;
    } catch {
      return INITIAL_JOURNAL_ENTRIES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('botanical_dye_journal', JSON.stringify(journalEntries));
    } catch {
      // ignore localStorage quota errors
    }
  }, [journalEntries]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCalculatorWithDye = (dyeId: string) => {
    setCalculatorDyeId(dyeId);
    setActiveSection('calculator');
    const elem = document.getElementById('calculator');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddJournalEntry = (newEntry: Omit<JournalEntry, 'id'>) => {
    const entry: JournalEntry = {
      ...newEntry,
      id: `entry-${Date.now()}`,
    };
    setJournalEntries((prev) => [entry, ...prev]);
  };

  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#24211D]">
      {/* Top Bar Navigation */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        journalCount={journalEntries.length}
        onOpenAiChat={() => setIsAiChatOpen(true)}
      />

      <main className="flex-1">
        {/* Curatorial Hero Banner */}
        <Hero
          onExplore={() => handleNavigate('specimens')}
          onOpenCalculator={() => handleNavigate('calculator')}
        />

        {/* Botanical Specimen Explorer */}
        <SpecimenGallery
          specimens={BOTANICAL_DYES}
          onSelectSpecimen={(specimen) => setSelectedSpecimen(specimen)}
          onOpenCalculator={handleOpenCalculatorWithDye}
        />

        {/* Color-Fastness Matrix */}
        <FastnessMatrix
          specimens={BOTANICAL_DYES}
          onSelectSpecimen={(specimen) => setSelectedSpecimen(specimen)}
        />

        {/* Weight of Fabric Recipe Calculator */}
        <RecipeCalculator
          key={calculatorDyeId}
          specimens={BOTANICAL_DYES}
          initialDyeId={calculatorDyeId}
          onSaveToJournal={(batch) => {
            handleAddJournalEntry({
              ...batch,
              date: new Date().toISOString().split('T')[0],
              swatchLabel: 'Atelier Recipe',
              modifierUsed: 'Calibrated bath',
            });
          }}
        />

        {/* Interactive Modifier & pH Lab Simulator */}
        <ModifierLab specimens={BOTANICAL_DYES} />

        {/* In-depth DIY Studio Guides */}
        <DiyGuides />

        {/* Practitioner Dye Batch Journal */}
        <DyeJournal
          entries={journalEntries}
          onAddEntry={handleAddJournalEntry}
          onDeleteEntry={handleDeleteJournalEntry}
        />
      </main>

      {/* Floating Quick Action Button for AI Chat */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsAiChatOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#2B2620] text-[#FAF7F2] rounded-full shadow-lg hover:bg-[#433B32] transition-all hover:scale-105 cursor-pointer border border-[#8C5A37]/30 group"
          title="Open Botanical Dye AI Agent"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-[#C5A337]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <span className="text-xs font-medium font-sans pr-1">Ask AI Dyer</span>
        </button>
      </div>

      {/* Specimen Modal Dossier */}
      <SpecimenModal
        specimen={selectedSpecimen}
        onClose={() => setSelectedSpecimen(null)}
        onOpenCalculatorWithDye={handleOpenCalculatorWithDye}
      />

      {/* Interactive AI Chat Drawer connected to n8n Webhook */}
      <AiChatDrawer
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
      />

      {/* Quiet Archival Footer */}
      <Footer onScrollToTop={() => handleNavigate('top')} />
    </div>
  );
}
