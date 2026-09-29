export interface ColorVariant {
  label: string;
  name: string;
  hex: string;
  description: string;
}

export interface FastnessRating {
  lightfastness: number; // 1 - 5
  washfastness: number; // 1 - 5
  waterfastness: number; // 1 - 5
  crockfastness: number; // 1 - 5
  longevitySummary: string;
  careAdvice: string;
}

export interface BotanicalDye {
  id: string;
  folioNumber: string;
  commonName: string;
  botanicalName: string;
  scrapCategory: 'Peels & Skins' | 'Pits & Seeds' | 'Rinds & Husks' | 'Roots & Rhizomes' | 'Spent Grounds';
  primaryChromophore: string;
  tanninLevel: 'High (Self-mordanting)' | 'Medium' | 'Low / None';
  mordantRecommendation: string;
  fiberAffinity: {
    protein: 'Excellent' | 'Good' | 'Moderate';
    cellulose: 'Excellent' | 'Good' | 'Moderate' | 'Requires Tannin Pre-treat' | 'Low';
  };
  recommendedWOF: number; // Percentage Weight of Fabric (e.g., 30 for 30%, 150 for 150%)
  recommendedWOFDescription: string;
  extractionTempC: number;
  extractionDurationMinutes: number;
  featuredImage: string;
  imageAlt: string;
  description: string;
  historicalContext: string;
  colors: {
    alum: ColorVariant;
    iron: ColorVariant;
    acid: ColorVariant;
    alkaline: ColorVariant;
    raw: ColorVariant;
  };
  fastness: FastnessRating;
  kitchenPrepTips: string[];
  extractionSteps: string[];
}

export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  botanicalId: string;
  botanicalName: string;
  fiberType: 'Cotton' | 'Linen' | 'Silk' | 'Wool' | 'Hemp' | 'Bamboo';
  fabricWeightGrams: number;
  scrapsWeightGrams: number;
  mordantUsed: string;
  modifierUsed: string;
  resultingHex: string;
  swatchLabel: string;
  notes: string;
}
