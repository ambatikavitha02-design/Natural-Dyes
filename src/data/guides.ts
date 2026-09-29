export interface DiyGuide {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  readTime: string;
  category: 'Foundation' | 'Extraction' | 'Technique' | 'Auxiliary';
  summary: string;
  requiredMaterials: string[];
  safetyNotes: string[];
  steps: {
    title: string;
    description: string;
    cautionOrTip?: string;
  }[];
}

export const DIY_GUIDES: DiyGuide[] = [
  {
    id: 'scour-and-mordant',
    number: '01',
    title: 'The Scour & Mordant Foundation',
    subtitle: 'Preparing Raw Cloth: Why Dirty Fibers Reject Botanical Color',
    readTime: '6 min read',
    category: 'Foundation',
    summary: 'Natural fibers arrive coated with natural waxes, seed oils, spinning sizing, and pectins. Without scouring, botanical dye slides right off. Learn how to prepare protein (silk/wool) and cellulose (linen/cotton) fibers for permanent bonding.',
    requiredMaterials: [
      'Soda ash (sodium carbonate) or Synthrapol / neutral textile detergent',
      'Potassium aluminum sulfate (Alum mordant)',
      'Cream of tartar (tartaric acid, for wool/silk luster)',
      'Digital kitchen scale (accurate to 0.1g or 1g)',
      'Dedicated stainless steel or enamel stockpot (never reused for food)',
      'Tongs or wooden stir paddle',
    ],
    safetyNotes: [
      'Always designate pots and utensils for dyeing only. Never prepare food in mordant vessels.',
      'Wear a dust mask when measuring dry alum or soda ash powders to avoid respiratory irritation.',
    ],
    steps: [
      {
        title: 'Step 1: Weigh Dry Fibers (Dry Weight Basis)',
        description: 'Weigh your dry, untreated yarn or fabric on a digital scale. Record this exact number in grams. All recipe calculations (% WOF - Weight of Fabric) depend on this baseline.',
        cautionOrTip: 'Tip: 1 standard linen tea towel weighs roughly 80g; a silk scarf weighs ~40g; an adult cotton t-shirt is ~150g.',
      },
      {
        title: 'Step 2: Scour the Fabric',
        description: 'For cellulose (cotton, linen, hemp): Fill pot with water, add 2 tsp soda ash + 1 tsp neutral detergent. Simmer at 80°C for 60 minutes. The water will turn amber as manufacturing waxes strip away. For protein (wool, silk): Use lukewarm water (never boil) with gentle castile soap or Synthrapol for 30 minutes to prevent felting.',
      },
      {
        title: 'Step 3: Measure the Alum Mordant',
        description: 'Calculate 12% to 15% WOF of alum. (For example, 100g fabric needs 12g to 15g alum). Dissolve the alum powder in a heatproof jar of boiling water until completely clear and transparent.',
        cautionOrTip: 'For wool, add 5% WOF cream of tartar to maintain yarn softness and brighten yellow/pink hues.',
      },
      {
        title: 'Step 4: The Mordant Bath Immersion',
        description: 'Add dissolved alum into a pot with enough cool water for fabrics to swim freely (liquor ratio 20:1). Submerge clean, damp scoured fabric. Raise heat slowly to 85°C (steaming, not boiling) and maintain for 60 minutes.',
      },
      {
        title: 'Step 5: Cool & Rest Overnight',
        description: 'Turn off the heat and let the fabric rest submerged as it cools naturally overnight. This allows aluminum ions to form covalent ligand bonds with fiber polymer chains.',
        cautionOrTip: 'Mordanted cloth can be dyed immediately or hung to air dry and stored in dark drawers for future dye sessions.',
      },
    ],
  },
  {
    id: 'avocado-pit-blush',
    number: '02',
    title: 'Extracting Peach & Blush from Avocado Pits',
    subtitle: 'Unlocking Hidden Rose Pigments with Slow Heat and Alkalinity',
    readTime: '7 min read',
    category: 'Extraction',
    summary: 'The green oily avocado seed conceals delicate coral, shell pink, antique rose, and dusky lilac pigments. Discover the exact thermal limits and pH adjustments needed to extract pure pinks instead of muddy browns.',
    requiredMaterials: [
      '6 to 10 clean avocado pits and dry avocado skins',
      'Clean chef’s knife or wooden mallet for cracking',
      '1/2 tsp washing soda (or baking soda) to elevate pH',
      'Fine mesh strainer and unbleached cotton cheesecloth',
      'Scoured natural fiber (linen, silk, organic cotton)',
      'Thermometer (candy or digital probe)',
    ],
    safetyNotes: [
      'Be cautious when cutting dried pits—they can be slippery. Use a mallet or let them soak in warm water first.',
    ],
    steps: [
      {
        title: 'Step 1: Thorough Flesh Removal & Curing',
        description: 'Thoroughly wash every trace of oily green pulp from the pits and skins. Any residual oil will coat fibers and leave uneven splotches. You can freeze pits fresh or dry them in a paper bag.',
      },
      {
        title: 'Step 2: Cleaving the Pits',
        description: 'Chop each pit into quarters or smash lightly with a mallet. Breaking them open increases surface area, exposing the milky internal sap to water and oxygen.',
        cautionOrTip: 'Include dry avocado skins as well—their outer layer contains concentrated reddish-purple catechins.',
      },
      {
        title: 'Step 3: The Alkalinity Spark (pH 8)',
        description: 'Submerge chopped pits in 3–4 liters of tap water. Add 1/2 teaspoon of washing soda. The mild alkaline environment dissolves the persin and tannin complexes, turning water pink within minutes.',
      },
      {
        title: 'Step 4: Gentle Sub-Boil Simmer (<80°C)',
        description: 'Heat the bath very slowly to 75°C–80°C (165°F–175°F). NEVER allow the pot to boil! Boiling oxidizes hydrolyzable tannins into murky brown humic compounds, destroying the soft pink tone.',
        cautionOrTip: 'Rule of thumb: "If it is bubbling, it is Browning." Keep it at a gentle steam for 2 to 3 hours.',
      },
      {
        title: 'Step 5: Overnight Oxidation & Immersion',
        description: 'Strain the ruby broth. Submerge damp fibers. Allow to steep for 1 hour with gentle turning, then let sit cool overnight. Rinse thoroughly in cold neutral water and dry in the shade.',
      },
    ],
  },
  {
    id: 'onion-skin-alchemy',
    number: '03',
    title: 'Onion Skin Alchemy: Gold to Forest Moss',
    subtitle: 'Mastering Quercetin Flavonoids and Iron After-Bath Shifting',
    readTime: '5 min read',
    category: 'Technique',
    summary: 'Yellow onion skins are the holy grail of food waste dyeing. They yield radiant luminous gold and, when exposed to a 3-minute iron bath dip, shift dramatically into deep forest moss and olive.',
    requiredMaterials: [
      '30g–50g dry yellow and red onion skins',
      'Prepared / scoured natural textiles',
      'Large cheesecloth pouch or nut-milk bag',
      'Iron water modifier (homemade or 1/4 tsp ferrous sulfate)',
      'Rubber gloves & dye tongs',
    ],
    safetyNotes: [
      'Ferrous sulfate is non-toxic in small doses, but always work in a ventilated space and keep away from children and pets.',
    ],
    steps: [
      {
        title: 'Step 1: Gathering the Dry Scales',
        description: 'Collect paper-thin dry skins from yellow and Spanish onions. Avoid wet or rotting layers. You need only 30 grams of dry skins to produce rich golden saturation on a 100g bandana!',
      },
      {
        title: 'Step 2: Steeping the Liquid Gold',
        description: 'Place skins inside a porous bag (prevents peeling fragments from entangling your cloth). Submerge in water and bring to 85°C. Simmer for 45 minutes until the water resembles dark amber tea.',
      },
      {
        title: 'Step 3: Dyeing the Fiber',
        description: 'Submerge pre-wetted cloth. Gently stir continuously for the first 10 minutes to ensure uniform dye uptake. Simmer at 80°C for 45 minutes until a deep honey-ochre is achieved.',
        cautionOrTip: 'Tip: For Shibori or resist dyeing, fold and clamp with wooden blocks before this step to create geometric white resist patterns.',
      },
      {
        title: 'Step 4: The 3-Minute Iron Shift (Saddening)',
        description: 'To turn gold into olive moss: prepare a secondary container with 2 liters of cool water and 2 tablespoons of iron water (or 1/4 tsp ferrous sulfate). Dip the warm, golden cloth into the iron bath.',
        cautionOrTip: 'Watch in real time as iron ions complex with quercetin molecules—within 60 to 180 seconds, the gold shifts to vibrant olive green!',
      },
      {
        title: 'Step 5: Cold Water Rinse',
        description: 'Remove promptly from the iron bath (too much iron can weaken protein fibers). Rinse in clean running water until the runoff is clear, then hang to dry away from direct UV sunlight.',
      },
    ],
  },
  {
    id: 'pomegranate-and-iron-ink',
    number: '04',
    title: 'Pomegranate Rinds & Making Homemade Iron Water',
    subtitle: 'Harnessing Ancient Mordants & Crafting Ferro-Tannic Black Ink',
    readTime: '8 min read',
    category: 'Auxiliary',
    summary: 'Pomegranate rinds contain up to 30% natural tannins, making them the ultimate zero-chemical natural mordant. Pair them with DIY iron water made from rusty nails and vinegar to produce museum-grade slate grays and deep raven blacks.',
    requiredMaterials: [
      '50g dried pomegranate rinds (crushed)',
      '1 glass jar with lid (for iron water)',
      'Handful of rusty iron nails, steel wool, or rusty iron scrap',
      'White distilled vinegar (5% acidity)',
      'Tap water',
      'Coffee filters',
    ],
    safetyNotes: [
      'Keep the lid on your iron jar loose during initial days: hydrogen gas is generated during the acid-iron reaction.',
    ],
    steps: [
      {
        title: 'Step 1: Brewing Homemade Iron Water (Ferrous Acetate)',
        description: 'In a clean glass mason jar, place 10–15 rusty iron nails or degreased fine steel wool. Fill with 1 part distilled white vinegar and 2 parts tap water. Cap loosely so reaction gases escape.',
        cautionOrTip: 'Let sit on a shelf for 1 to 2 weeks. The liquid will transform into an orange-tinted or smoky grayish ferrous acetate solution.',
      },
      {
        title: 'Step 2: Straining the Iron Solution',
        description: 'Filter the iron liquid through a paper coffee filter into a clean bottle with a secure cap. Label clearly "IRON WATER - DYE AUXILIARY". This homemade modifier will last for years.',
      },
      {
        title: 'Step 3: Pomegranate Extraction',
        description: 'Soak dried pomegranate rinds in water overnight, then simmer for 60 minutes at 90°C. The hydrolyzable ellagitannins release a rich khaki-gold liquor that acts simultaneously as dye and mordant primer.',
      },
      {
        title: 'Step 4: Dyeing the Base Cloth',
        description: 'Immerse damp linen or cotton in the pomegranate bath for 45 minutes at 80°C. The fabric absorbs high levels of vegetal tannins into its cellulose lumen.',
      },
      {
        title: 'Step 5: The Insoluble Ferro-Tannate Transformation',
        description: 'Remove cloth and immerse directly into a cool bath containing 3 tablespoons of your strained iron water. Within seconds, the pale khaki transforms into deep historical charcoal gray or raven black!',
        cautionOrTip: 'This exact chemical reaction is how medieval scribes created iron gall ink for manuscripts that survived 1,000 years.',
      },
    ],
  },
];
