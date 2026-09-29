import React, { useState } from 'react';
import { BookOpen, Sparkles, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  journalCount: number;
  onOpenAiChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  journalCount,
  onOpenAiChat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'specimens', label: 'Specimens' },
    { id: 'matrix', label: 'Fastness Matrix' },
    { id: 'calculator', label: 'Recipe Calculator' },
    { id: 'lab', label: 'Modifier Lab' },
    { id: 'guides', label: 'Studio Guides' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E6E0D5] transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); handleNavClick('top'); }}
          className="text-xl md:text-2xl font-editorial font-medium tracking-tight text-[#24211D] hover:text-[#5B6236] transition-colors whitespace-nowrap"
        >
          Herbarium Tinctura
        </a>

        {/* Zone 2: 4–6 nav links with single-line labels */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#686054]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`whitespace-nowrap transition-colors py-1 relative ${
                  isActive 
                    ? 'text-[#1C1917] font-semibold' 
                    : 'hover:text-[#1C1917]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C5A37]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAiChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-[#8C5A37]/40 bg-[#F4EFE6] text-[#24211D] hover:bg-[#8C5A37] hover:text-[#FAF7F2] transition-colors whitespace-nowrap cursor-pointer shadow-2xs group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8C5A37] group-hover:text-white" />
            <span>AI Dyer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="n8n webhook connected" />
          </button>

          <button
            onClick={() => handleNavClick('journal')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded border transition-colors whitespace-nowrap ${
              activeSection === 'journal'
                ? 'bg-[#2B2620] text-[#FAF7F2] border-[#2B2620]'
                : 'bg-white text-[#24211D] border-[#D6CEBE] hover:border-[#8C5A37] hover:bg-[#F5EFE6]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#8C5A37]" />
            <span className="hidden sm:inline">Dye Journal</span>
            <span className="font-mono text-[11px] text-[#786D5E] bg-[#EFE9DD] px-1.5 py-0.2 rounded">
              {journalCount}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#5A5044] hover:text-[#1F1A15] focus-visible:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E6E0D5] bg-[#FAF7F2] px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-left py-2 text-sm font-medium transition-colors ${
                activeSection === link.id ? 'text-[#8C5A37] font-semibold' : 'text-[#5A5044]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenAiChat();
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-center gap-2 py-2.5 text-xs font-medium rounded bg-[#8C5A37] text-white mt-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open AI Dyer Assistant</span>
          </button>
        </div>
      )}
    </header>
  );
};
