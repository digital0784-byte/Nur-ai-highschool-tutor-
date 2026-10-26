export interface ResearchTopicPreset {
  id: string;
  topic: string;
  grade: 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';
  subject: string;
  layer1Excerpt: string;
  layer2External: string;
  precomputedAnalysis?: string;
}

export const APPROVED_EXTERNAL_SOURCES = [
  {
    level: 'Layer 1: Primary Foundation',
    name: 'FDRE Ministry of Education Official Textbooks (Grades 9-12)',
    publisher: 'Ministry of Education, Federal Democratic Republic of Ethiopia (New Secondary Curriculum)',
    subjects: ['Physics', 'Mathematics', 'Chemistry', 'Biology', 'Economics', 'History', 'Geography'],
  },
  {
    level: 'Layer 2: University Foundations',
    name: 'OpenStax University Physics / College Physics',
    authors: 'Paul Peter Urone, Roger Hinrichs, OpenStax / Rice University',
    scope: 'Kinematics, Thermodynamics, Electromagnetism, Quantum Physics',
  },
  {
    level: 'Layer 3: Advanced STEM Textbooks',
    name: 'Chemistry: The Central Science',
    authors: 'Brown, LeMay, Bursten, Murphy, Woodward (Pearson)',
    scope: 'Chemical Equilibrium, Kinetics, Atomic Orbitals, Thermochemistry',
  },
  {
    level: 'Layer 4: Advanced Biological Sciences',
    name: 'Campbell Biology (12th Edition)',
    authors: 'Urry, Cain, Wasserman, Minorsky, Reece (Pearson)',
    scope: 'Photosynthesis, Cellular Respiration, Genetics, Molecular Biology',
  },
  {
    level: 'Layer 5: Advanced Mathematical Analysis',
    name: 'Calculus: Early Transcendentals',
    authors: 'James Stewart (Cengage Learning)',
    scope: 'Differential Calculus, Integration Techniques, Critical Points',
  },
  {
    level: 'Layer 6: Ethiopian & Development Economics',
    name: 'Economic Development (13th Edition) & Ethiopian Economic Association Reports',
    authors: 'Michael Todaro & Stephen Smith / EEA',
    scope: 'National Income Accounting, Macroeconomic Growth, Agricultural Economics',
  },
];

export const RESEARCH_PRESETS: ResearchTopicPreset[] = [
  {
    id: 'res-phys-proj',
    topic: 'Two-Dimensional Projectile Motion and Optimum Range',
    grade: 'Grade 11',
    subject: 'Physics',
    layer1Excerpt: '[FDRE MoE Grade 11 Physics, Unit 2, p. 48-56]: Projectile motion decomposed into horizontal uniform velocity v_x = v₀ cos θ (a_x = 0) and vertical uniformly accelerated motion under gravity a_y = -g (g = 9.8 m/s²). Range R = (v₀² sin 2θ)/g, Max Height H = (v₀² sin² θ)/(2g). Optimum angle for level range is 45° neglecting air resistance.',
    layer2External: '[OpenStax College Physics, Chapter 3.4 & Halliday-Resnick-Walker 10th Ed p. 65]: In real fluid atmospheres, aerodynamic drag F_drag = ½ ρ C_d A v² produces an asymmetric trajectory where peak height occurs past the midpoint and optimal launch angle decreases from 45° to 38°-42° depending on ball density and high Ethiopian altitude air density (ρ ≈ 0.98 kg/m³ in Addis Ababa at 2,355 m altitude vs 1.225 kg/m³ at sea level).'
  },
  {
    id: 'res-chem-haber',
    topic: 'Le Chatelier’s Principle and Industrial Ammonia Synthesis (Haber Process)',
    grade: 'Grade 11',
    subject: 'Chemistry',
    layer1Excerpt: '[FDRE MoE Grade 11 Chemistry, Unit 4, p. 145-156]: Reversible reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH = -92.4 kJ/mol. Exothermic reaction; increasing pressure shifts equilibrium forward (4 mol gas → 2 mol gas). Decreasing temperature favors forward yield. Industrial compromise temperature in Ethiopian fertilizer plants is 450°C with Fe/K₂O catalyst and 200 atm.',
    layer2External: '[Brown & LeMay, Chemistry: The Central Science 14th Ed p. 650-658]: Dynamic thermodynamic equilibrium vs chemical kinetics trade-off. At 298 K, equilibrium constant K_p is favorable (K_p ≈ 6 × 10⁵), but activation energy barrier (E_a = 435 kJ/mol to break the N≡N triple bond) makes uncatalyzed rate immeasurably sluggish. Haber-Bosch dual-promoted fused iron catalyst (wüstite Fe₁₋ₓO reduced to α-Fe) activates dissociative nitrogen chemisorption. Modern green ammonia syntheses utilize ruthenium on carbon or water electrolysis powered by renewable hydropower.'
  },
  {
    id: 'res-phys-gerd',
    topic: 'Conservation of Mechanical Energy & Hydroelectric Power at GERD',
    grade: 'Grade 11',
    subject: 'Physics',
    layer1Excerpt: '[FDRE MoE Grade 11 Physics, Unit 3, p. 92-98]: Work-Energy theorem W_net = ΔKE. Gravitational potential energy PE = mgh. Total mechanical energy E = KE + PE is conserved in isolated conservative systems. Hydroelectric generation: Power P = η · ρ · Q · g · h, where Q is volumetric flow rate (m³/s), h is effective head (m), and η is turbine-generator efficiency.',
    layer2External: '[Tipler & Mosca, Physics for Scientists and Engineers 6th Ed p. 240 & Ethiopian Electric Power Technical Specifications]: Grand Ethiopian Renaissance Dam (GERD / ህዳሴ ግድብ) on the Abay River utilizes Francis reaction turbines operating under maximum hydraulic head of ~133 m with a reservoir capacity of 74 billion m³. Fluid mechanics Bernoulli equation P₁/ρg + v₁²/2g + z₁ = P₂/ρg + v₂²/2g + z₂ + h_loss governs penstock head loss. Overall system efficiency reaches η ≈ 90-92%.'
  },
  {
    id: 'res-math-calc',
    topic: 'Derivatives, Chain Rule, and Critical Point Optimization',
    grade: 'Grade 12',
    subject: 'Mathematics',
    layer1Excerpt: '[FDRE MoE Grade 12 Mathematics, Unit 3, p. 110-122]: Derivative as instantaneous rate of change and tangent slope f\'(x) = lim_{h→0} [f(x+h) - f(x)]/h. Chain Rule d/dx[f(g(x))] = f\'(g(x)) · g\'(x). Extreme values occur at critical numbers where f\'(c) = 0 or f\'(c) is undefined. First Derivative Test and Second Derivative Test (f\'\'(c) < 0 ⟹ local maximum, f\'\'(c) > 0 ⟹ local minimum).',
    layer2External: '[Stewart Calculus: Early Transcendentals 8th Ed p. 195-210]: Rigorous differentiability implies continuity (converse is false, e.g., Weierstrass continuous nowhere differentiable functions or f(x) = |x| at x=0). Optimization on closed bounded intervals guaranteed by Extreme Value Theorem (Weierstrass). Application to economic marginal cost / marginal revenue equimarginal condition and projectile envelope curves.'
  },
  {
    id: 'res-bio-calvin',
    topic: 'Photosynthesis, Calvin Cycle, and C3/C4 Adaptations in Ethiopian Crops',
    grade: 'Grade 11',
    subject: 'Biology',
    layer1Excerpt: '[FDRE MoE Grade 11 Biology, Unit 2, p. 78-89]: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. Light reactions generate ATP and NADPH in thylakoids; Calvin cycle fixes atmospheric CO₂ into 3-PGA via RuBisCO in the stroma. Reduction to G3P and RuBP regeneration consume 9 ATP and 6 NADPH per 3-carbon sugar.',
    layer2External: '[Campbell Biology 12th Ed p. 200-215]: RuBisCO carboxylase vs oxygenase competitive kinetics. Under high heat and arid conditions typical of Ethiopian lowlands, photorespiration can consume up to 25-50% of fixed carbon in C3 plants. C4 plants (e.g., Sorghum, Maize, Teff / Eragrostis tef) decouple CO₂ capture spatially into mesophyll (PEP carboxylase, no oxygenase activity) and bundle-sheath cells, maintaining high intracellular [CO₂] around RuBisCO.'
  },
  {
    id: 'res-econ-gdp',
    topic: 'Macroeconomic Gross Domestic Product (GDP) Measurement and Inflation Adjustments',
    grade: 'Grade 12',
    subject: 'Economics',
    layer1Excerpt: '[FDRE MoE Grade 12 Economics, Unit 1, p. 22-34]: GDP is the total monetary market value of all final goods and services produced within national boundaries in a year. Expenditure approach: GDP = C + I + G + (X - M). Real GDP = (Nominal GDP / Price Index) · 100. Value Added approach prevents double counting.',
    layer2External: '[Todaro & Smith, Economic Development 13th Ed & National Bank of Ethiopia Annual Report]: Gross National Income (GNI = GDP + Net Factor Income from Abroad) accounts for remittance flows and foreign debt servicing. Informal sector economics (smallholder agriculture, informal Merkato trading) represents an estimated 30-40% of economic activity in developing economies, requiring satellite national accounting methodologies.'
  }
];
