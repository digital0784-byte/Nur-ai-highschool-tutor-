export interface MoETextbookExcerpt {
  id: string;
  grade: 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';
  subject: 'Physics' | 'Mathematics' | 'Chemistry' | 'Biology' | 'English' | 'History' | 'Geography' | 'Economics';
  stream: 'Common' | 'Natural Science' | 'Social Science';
  unit: string;
  topic: string;
  page: string;
  summary: string;
  keyFormulasOrTerms: string[];
  ethiopianAnalogy: string;
  sampleProblems?: {
    question: string;
    options?: string[];
    answer: string;
    solution: string;
  }[];
}

export interface EsslceQuestion {
  id: string;
  grade: 'Grade 12' | 'Grade 10';
  subject: string;
  stream: 'Natural Science' | 'Social Science' | 'Common';
  year: string;
  unit: string;
  topic: string;
  citation: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  examTrap: string;
  learningModeHint: string;
}

export const MOE_EXCERPTS: MoETextbookExcerpt[] = [
  // Grade 11 Physics
  {
    id: 'g11-phys-u2-01',
    grade: 'Grade 11',
    subject: 'Physics',
    stream: 'Natural Science',
    unit: 'Unit 2: Two-Dimensional Motion',
    topic: '2.1 Kinematics in Two Dimensions & Projectile Motion',
    page: 'p. 48-56',
    summary: 'A projectile is any object that is given an initial velocity and follows a path determined solely by the gravitational acceleration (g = 9.8 m/s²) and air resistance (assumed negligible). The motion is decomposed into independent horizontal and vertical components: horizontal motion exhibits constant velocity (a_x = 0, x = (v₀ cos θ)t), whereas vertical motion experiences constant downward acceleration (a_y = -g, v_y = v₀ sin θ - gt, y = (v₀ sin θ)t - 1/2 gt²). The maximum height is H = (v₀² sin² θ) / (2g), time of flight is T = (2v₀ sin θ) / g, and horizontal range is R = (v₀² sin 2θ) / g.',
    keyFormulasOrTerms: [
      'x(t) = v₀ cos(θ) · t',
      'y(t) = v₀ sin(θ) · t - ½gt²',
      'H_max = (v₀² sin² θ) / (2g)',
      'Range R = (v₀² sin 2θ) / g',
      'Trajectory parabola: y = x tan θ - (g x²) / (2v₀² cos² θ)'
    ],
    ethiopianAnalogy: 'Think of a traditional Gena (ገና) player striking the ball (Rur) across an open field in Lalibela: the forward push remains unresisted while Ethiopian gravity pulls it gracefully into a parabolic arc until it strikes the ground.',
    sampleProblems: [
      {
        question: 'A ball is kicked from ground level with an initial velocity of 20 m/s at an angle of 30° above the horizontal. Taking g = 9.8 m/s², find the maximum height reached.',
        options: ['A) 5.10 m', 'B) 10.20 m', 'C) 15.30 m', 'D) 20.40 m'],
        answer: 'A) 5.10 m',
        solution: 'H = (v₀ sin θ)² / (2g) = (20 · sin 30°)² / (2 · 9.8) = (20 · 0.5)² / 19.6 = 100 / 19.6 ≈ 5.10 m.'
      }
    ]
  },
  {
    id: 'g11-phys-u3-01',
    grade: 'Grade 11',
    subject: 'Physics',
    stream: 'Natural Science',
    unit: 'Unit 3: Work, Energy and Power',
    topic: '3.3 Conservation of Mechanical Energy & Hydroelectric Applications',
    page: 'p. 92-98',
    summary: 'Work done by a force is W = F · d · cos(θ). The Work-Energy Theorem states that the net work done on a particle equals its change in kinetic energy (W_net = ΔKE). In an isolated system governed by conservative forces (gravitational, elastic), the total mechanical energy E = KE + PE remains constant (E_initial = E_final). Potential energy of an elevated fluid mass is PE = mgh. Hydroelectric power plants convert gravitational potential energy of falling water into rotational mechanical energy of turbines and electrical power: Power P = (Δm/Δt) · g · h · η = ρ · Q · g · h · η, where Q is discharge rate and η is turbine efficiency.',
    keyFormulasOrTerms: [
      'W = F d cos θ',
      'KE = ½mv²',
      'PE_grav = mgh',
      'P = W / t = F · v',
      'P_hydro = η · ρ · Q · g · h'
    ],
    ethiopianAnalogy: 'The Grand Ethiopian Renaissance Dam (GERD / ህዳሴ ግድብ) on the Abay River stores billions of cubic meters of water at high hydraulic head (h). When released through penstocks, the potential energy is converted with high efficiency into electrical energy for Ethiopian cities and neighboring nations.',
    sampleProblems: [
      {
        question: 'Water flows through the penstocks of a dam at 50 m³/s falling through an effective height of 80 m. If the plant operates at 85% efficiency, what electrical power is generated? (ρ = 1000 kg/m³, g = 9.8 m/s²)',
        options: ['A) 33.32 MW', 'B) 39.20 MW', 'C) 46.10 MW', 'D) 50.00 MW'],
        answer: 'A) 33.32 MW',
        solution: 'P = η · ρ · Q · g · h = 0.85 · 1000 · 50 · 9.8 · 80 = 33,320,000 W = 33.32 MW.'
      }
    ]
  },

  // Grade 12 Physics
  {
    id: 'g12-phys-u1-01',
    grade: 'Grade 12',
    subject: 'Physics',
    stream: 'Natural Science',
    unit: 'Unit 1: Thermodynamics',
    topic: '1.2 First Law of Thermodynamics & Heat Engines',
    page: 'p. 18-27',
    summary: 'The First Law of Thermodynamics expresses energy conservation: ΔU = Q - W, where ΔU is internal energy change, Q is heat added to the system, and W is work done by the system (W = ∫ P dV). In isothermal expansion (ΔT = 0), ΔU = 0 so Q = W. In adiabatic processes (Q = 0), ΔU = -W. The efficiency of a heat engine is η = W / Q_H = 1 - (Q_C / Q_H). For an ideal Carnot engine operating between temperatures T_H and T_C (in Kelvin), maximum theoretical efficiency is η_Carnot = 1 - (T_C / T_H).',
    keyFormulasOrTerms: [
      'ΔU = Q - W',
      'W = P ΔV (isobaric)',
      'W = nRT ln(V_f / V_i) (isothermal)',
      'η = 1 - (Q_C / Q_H)',
      'η_Carnot = 1 - (T_C / T_H)'
    ],
    ethiopianAnalogy: 'Making Injera on an electric mitad (የእንጀራ ምጣድ): Heat energy Q enters the clay plate and batter. Some energy is used to evaporate water and expand steam bubbles that form the "Ayni" (eyes of injera), doing expansion work W, while raising the thermal internal energy ΔU.',
    sampleProblems: [
      {
        question: 'A Carnot heat engine operates between reservoirs at 500 K and 300 K. What is its maximum theoretical thermal efficiency?',
        options: ['A) 40%', 'B) 60%', 'C) 66.7%', 'D) 25%'],
        answer: 'A) 40%',
        solution: 'η = 1 - (T_C / T_H) = 1 - (300 / 500) = 1 - 0.60 = 0.40 or 40%.'
      }
    ]
  },
  {
    id: 'g12-phys-u4-01',
    grade: 'Grade 12',
    subject: 'Physics',
    stream: 'Natural Science',
    unit: 'Unit 4: Electromagnetism & Electromagnetic Induction',
    topic: '4.2 Faraday’s Law of Induction and Lenz’s Law',
    page: 'p. 132-140',
    summary: 'Magnetic flux through a surface of area A is Φ_B = B · A = B A cos(θ). Faraday’s Law of Induction states that the magnitude of the induced electromotive force (emf) in a circuit is directly proportional to the time rate of change of magnetic flux through the circuit: ε = -N (dΦ_B / dt). Lenz’s Law dictates that the polarity of the induced emf creates an induced current whose magnetic field opposes the change in magnetic flux that produced it (signified by the negative sign in Faraday’s equation). Applications include transformers, electric generators, and induction cooktops.',
    keyFormulasOrTerms: [
      'Φ_B = B A cos θ',
      'ε = -N (ΔΦ_B / Δt)',
      'V_s / V_p = N_s / N_p = I_p / I_s (ideal transformer)',
      'Lenz’s law opposition'
    ],
    ethiopianAnalogy: 'In the Ethiopian Electric Power (EEP) grid connecting Gibe III to Addis Ababa, step-up transformers raise AC voltage to 400 kV to minimize I²R transmission losses, then step-down transformers near neighborhoods safely reduce it to 220 V.',
    sampleProblems: [
      {
        question: 'A coil of 200 turns is placed in a magnetic field that changes uniformly from 0.2 T to 0.8 T in 0.3 s. If the cross-sectional area of the coil is 0.05 m², find the induced emf.',
        options: ['A) 20 V', 'B) 40 V', 'C) 50 V', 'D) 100 V'],
        answer: 'A) 20 V',
        solution: 'ΔΦ = A · ΔB = 0.05 · (0.8 - 0.2) = 0.05 · 0.6 = 0.03 Wb. |ε| = N (ΔΦ / Δt) = 200 · (0.03 / 0.3) = 200 · 0.1 = 20 V.'
      }
    ]
  },

  // Grade 11 Chemistry
  {
    id: 'g11-chem-u1-01',
    grade: 'Grade 11',
    subject: 'Chemistry',
    stream: 'Natural Science',
    unit: 'Unit 1: Fundamental Concepts of Chemistry & Atomic Structure',
    topic: '1.3 Quantum Mechanical Model of the Atom & Electronic Configuration',
    page: 'p. 24-35',
    summary: 'Electrons occupy atomic orbitals defined by four quantum numbers: Principal (n = 1, 2, 3...) determines main energy level; Azimuthal/Orbital (l = 0 to n-1) defines subshell shape (s, p, d, f); Magnetic (m_l = -l to +l) gives spatial orientation; Spin (m_s = +½, -½) dictates intrinsic spin. Electronic configurations follow: 1) Aufbau Principle (electrons fill lowest available energy levels first: 1s, 2s, 2p, 3s, 3p, 4s, 3d...); 2) Pauli Exclusion Principle (no two electrons in an atom can have the same four quantum numbers); 3) Hund’s Rule of Maximum Multiplicity (degenerate orbitals are filled singly with parallel spins before pairing). Anomalous configurations occur in Chromium (Cr: [Ar] 4s¹ 3d⁵) and Copper (Cu: [Ar] 4s¹ 3d¹⁰) due to extra stability of half-filled and fully-filled d-subshells.',
    keyFormulasOrTerms: [
      'n, l, m_l, m_s',
      'Aufbau principle: (n + l) energy ordering',
      'Pauli Exclusion: max 2 electrons per orbital',
      'Hund’s Rule: maximum parallel spin',
      'Anomalous configurations: Cr (Z=24) and Cu (Z=29)'
    ],
    ethiopianAnalogy: 'Think of seats in a long-distance Public Bus (የህዝብ አውቶቡስ) departing from Merkato: passengers naturally choose to sit alone on empty double seats first (Hund’s rule) before sharing, and passengers fill the front rows nearest to the door first (Aufbau principle).',
    sampleProblems: [
      {
        question: 'Which of the following represents the correct ground-state electronic configuration of a Chromium atom (Z = 24)?',
        options: ['A) [Ar] 4s² 3d⁴', 'B) [Ar] 4s¹ 3d⁵', 'C) [Ar] 4s⁰ 3d⁶', 'D) [Ar] 3d⁶'],
        answer: 'B) [Ar] 4s¹ 3d⁵',
        solution: 'Chromium has an anomalous configuration where one electron is promoted from 4s to 3d to achieve a half-filled 3d⁵ subshell, providing enhanced exchange energy and stability.'
      }
    ]
  },
  {
    id: 'g11-chem-u4-01',
    grade: 'Grade 11',
    subject: 'Chemistry',
    stream: 'Natural Science',
    unit: 'Unit 4: Chemical Equilibrium & Phase Equilibrium',
    topic: '4.2 Le Chatelier’s Principle and Industrial Synthesis',
    page: 'p. 145-156',
    summary: 'Le Chatelier’s Principle states that if an external stress (change in concentration, temperature, pressure, or volume) is applied to a chemical system at dynamic equilibrium, the system shifts its position in a direction that counteracts the applied stress. In the exothermic Haber process for ammonia synthesis (N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH = -92.4 kJ/mol): Increasing pressure shifts equilibrium toward fewer gas moles (forward, 4 mol → 2 mol); Lowering temperature favors exothermic forward reaction, but too low temperature slows kinetics, so an optimum compromise temperature (450°C) with iron catalyst is chosen industrially.',
    keyFormulasOrTerms: [
      'K_c = [C]^c [D]^d / ([A]^a [B]^b)',
      'K_p = K_c (RT)^Δn',
      'ΔH < 0 (exothermic) vs ΔH > 0 (endothermic)',
      'Le Chatelier shift directions'
    ],
    ethiopianAnalogy: 'Ethiopian agricultural fertilizer plants: The production of nitrogen fertilizer (DAP / Urea) relies on ammonia synthesized via the Haber-Bosch process. Understanding Le Chatelier’s shifts ensures maximum ammonia yield to nourish Ethiopian crops across Oromia, Amhara, and Tigray.',
    sampleProblems: [
      {
        question: 'For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + heat, which combination of conditions produces the highest equilibrium yield of NH₃?',
        options: ['A) High pressure and low temperature', 'B) Low pressure and high temperature', 'C) High pressure and high temperature', 'D) Low pressure and low temperature'],
        answer: 'A) High pressure and low temperature',
        solution: 'Since the reaction is exothermic, lower temperature shifts equilibrium forward. Since reactants have 4 moles of gas and products have 2 moles, higher pressure also shifts equilibrium forward.'
      }
    ]
  },

  // Grade 12 Mathematics
  {
    id: 'g12-math-u3-01',
    grade: 'Grade 12',
    subject: 'Mathematics',
    stream: 'Natural Science',
    unit: 'Unit 3: Introduction to Calculus & Derivatives',
    topic: '3.4 Derivative Rules, Product Rule & Chain Rule',
    page: 'p. 110-122',
    summary: 'The derivative represents the instantaneous rate of change and the slope of the tangent line to a curve: f\'(x) = lim_{h→0} [f(x+h) - f(x)] / h. Core rules include: Power Rule d/dx [x^n] = n x^{n-1}; Constant Multiple Rule d/dx [c f(x)] = c f\'(x); Sum/Difference Rule d/dx [f(x) ± g(x)] = f\'(x) ± g\'(x); Product Rule d/dx [u · v] = u\'v + uv\'; Quotient Rule d/dx [u / v] = (u\'v - uv\') / v²; Chain Rule d/dx [f(g(x))] = f\'(g(x)) · g\'(x). Extreme values occur where f\'(x) = 0 (critical points) or where f\'(x) is undefined.',
    keyFormulasOrTerms: [
      'f\'(x) = lim_{h→0} [f(x+h) - f(x)] / h',
      'd/dx [u v] = u\'v + u v\'',
      'd/dx [u/v] = (u\'v - u v\') / v²',
      'd/dx [f(g(x))] = f\'(g(x)) · g\'(x)',
      'Critical points: f\'(c) = 0'
    ],
    ethiopianAnalogy: 'If you graph the altitude of a vehicle traveling from Awash to Semera over time, the derivative at any specific second gives your exact speedometer reading and slope of climb at that instant.',
    sampleProblems: [
      {
        question: 'Find the derivative of f(x) = (3x² - 5)⁴ with respect to x.',
        options: ['A) 24x(3x² - 5)³', 'B) 4(3x² - 5)³', 'C) 12x(3x² - 5)³', 'D) 6x(3x² - 5)³'],
        answer: 'A) 24x(3x² - 5)³',
        solution: 'By the Chain Rule, let u = 3x² - 5. Then f(u) = u⁴. f\'(x) = 4u³ · (du/dx) = 4(3x² - 5)³ · (6x) = 24x(3x² - 5)³.'
      }
    ]
  },
  {
    id: 'g12-math-u4-01',
    grade: 'Grade 12',
    subject: 'Mathematics',
    stream: 'Natural Science',
    unit: 'Unit 4: Integrals and Applications',
    topic: '4.2 Definite Integrals and Area Under Curves',
    page: 'p. 154-168',
    summary: 'The Fundamental Theorem of Calculus connects differentiation and integration: if f is continuous on [a, b] and F is an antiderivative of f, then ∫_a^b f(x) dx = F(b) - F(a). The area between two continuous curves y = f(x) and y = g(x) where f(x) ≥ g(x) on [a, b] is given by A = ∫_a^b [f(x) - g(x)] dx. Key techniques include integration by substitution (u-substitution) and integration by parts (∫ u dv = uv - ∫ v du).',
    keyFormulasOrTerms: [
      '∫ x^n dx = (x^{n+1}) / (n+1) + C (n ≠ -1)',
      '∫_a^b f(x) dx = F(b) - F(a)',
      'Area = ∫_a^b [top(x) - bottom(x)] dx',
      'Integration by parts: ∫ u dv = uv - ∫ v du'
    ],
    ethiopianAnalogy: 'Calculating the total volume of Teff grain in an irregularly sloped traditional granary (ጎተራ) is done by integrating small cross-sectional slices from bottom to top.',
    sampleProblems: [
      {
        question: 'Evaluate the definite integral ∫₀² (3x² + 2x) dx.',
        options: ['A) 12', 'B) 10', 'C) 8', 'D) 14'],
        answer: 'A) 12',
        solution: 'Antiderivative is F(x) = x³ + x². F(2) - F(0) = (2³ + 2²) - (0) = 8 + 4 = 12.'
      }
    ]
  },

  // Grade 11 Biology
  {
    id: 'g11-bio-u2-01',
    grade: 'Grade 11',
    subject: 'Biology',
    stream: 'Natural Science',
    unit: 'Unit 2: Cellular Metabolism & Energy Transformations',
    topic: '2.3 Photosynthesis & Light-Independent Calvin Cycle',
    page: 'p. 78-89',
    summary: 'Photosynthesis transforms light energy into chemical energy: 6CO₂ + 6H₂O + solar energy → C₆H₁₂O₆ + 6O₂. It consists of two stages: 1) Light Reactions in thylakoid membranes, photolysis of water releases O₂, producing ATP and NADPH via electron transport chains; 2) Calvin Cycle (Light-independent) in the stroma, catalyzed by the enzyme RuBisCO, where CO₂ is fixed into 3-PGA, reduced to G3P (glyceraldehyde 3-phosphate), and regenerated into RuBP using ATP and NADPH. C4 and CAM plants evolved specialized adaptations to prevent photorespiration in hot, arid climates.',
    keyFormulasOrTerms: [
      '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
      'Photolysis: 2H₂O → 4H⁺ + 4e⁻ + O₂',
      'RuBisCO enzyme',
      'Calvin cycle phases: Carbon fixation, Reduction, RuBP regeneration',
      'C3 vs C4 vs CAM adaptations'
    ],
    ethiopianAnalogy: 'Indigenous Ethiopian crops like Teff (Eragrostis tef) and Sorghum thrive across hot lowland and midland zones because their efficient photosynthetic machinery optimizes carbon fixation even under intense Ethiopian sunshine.',
    sampleProblems: [
      {
        question: 'What is the primary enzyme responsible for fixing atmospheric CO₂ onto ribulose-1,5-bisphosphate (RuBP) during the Calvin cycle?',
        options: ['A) ATP Synthase', 'B) RuBisCO', 'C) DNA Polymerase', 'D) Amylase'],
        answer: 'B) RuBisCO',
        solution: 'RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase) is the primary enzyme that catalyzes the carboxylation of RuBP in the stroma.'
      }
    ]
  },

  // Grade 10 / 11 History
  {
    id: 'g11-hist-u4-01',
    grade: 'Grade 11',
    subject: 'History',
    stream: 'Social Science',
    unit: 'Unit 4: The Making of Modern Ethiopian State and Resistance to Colonialism',
    topic: '4.3 The Battle of Adwa (1896) and Its Significance',
    page: 'p. 142-155',
    summary: 'The Battle of Adwa on March 1, 1896 (Yekatit 23, 1888 E.C.) represents a historic confrontation in African and world history where Ethiopian forces led by Emperor Menelik II and Empress Taytu Betul decisively defeated the invading Italian colonial army under General Baratieri. The underlying cause was Italy’s deceptive interpretation of Article XVII of the Treaty of Wuchale (1889), where the Italian version falsely claimed Ethiopia was an Italian protectorate, while the Amharic version preserved Ethiopian sovereignty. Adwa secured Ethiopian independence, humiliated European imperial ambitions, compelled Italy to sign the Treaty of Addis Ababa (October 1896) acknowledging unconditional sovereignty, and inspired the Pan-African movement worldwide.',
    keyFormulasOrTerms: [
      'Battle of Adwa (March 1, 1896 / Yekatit 23, 1888 E.C.)',
      'Treaty of Wuchale (Article XVII discrepancy)',
      'Emperor Menelik II & Empress Taytu Betul',
      'Treaty of Addis Ababa (Oct 1896) recognition',
      'Pan-African symbol of freedom'
    ],
    ethiopianAnalogy: 'Adwa is the beacon of sovereignty that made Ethiopia the only African nation never colonized during the "Scramble for Africa", inspiring the colors of the Ethiopian flag across modern African national banners.',
    sampleProblems: [
      {
        question: 'Which article of the Treaty of Wuchale contained the controversial mistranslation regarding Ethiopian sovereignty?',
        options: ['A) Article III', 'B) Article XVII', 'C) Article VII', 'D) Article XII'],
        answer: 'B) Article XVII',
        solution: 'Article XVII had different meanings in Amharic (optional use of Italian diplomacy) and Italian (mandatory Italian protectorate).'
      }
    ]
  },

  // Grade 12 Geography
  {
    id: 'g12-geog-u2-01',
    grade: 'Grade 12',
    subject: 'Geography',
    stream: 'Social Science',
    unit: 'Unit 2: Drainage Systems and Water Resources of Ethiopia',
    topic: '2.2 Major River Basins of Ethiopia & Hydrological Characteristics',
    page: 'p. 65-76',
    summary: 'Ethiopia is often termed "The Water Tower of Eastern Africa" because its high elevation produces abundant runoff feeding three primary drainage systems: 1) Western (Mediterranean) Drainage System: Includes the Abay (Blue Nile), Tekeze (Atbara), Baro-Akobo, and Gibe-Omo. The Abay basin alone contributes roughly 60% of Ethiopia’s total surface water discharge and originates from Lake Tana. 2) Southeastern (Indian Ocean) Drainage System: Includes the Wabi Shebelle and Genale-Dawa basins. 3) Rift Valley (Inland/Endorheic) Drainage System: Includes the Awash River, Lake Ziway, Langano, Abijatta, Shalla, and Lake Turkana. Characteristics include steep gorge descents, high hydroelectric potential, seasonal volume fluctuations tied to monsoon rainfall, and transboundary international dimensions.',
    keyFormulasOrTerms: [
      'Water Tower of Eastern Africa',
      'Western (Abay, Tekeze, Baro) Drainage System',
      'Southeastern (Wabi Shebelle, Genale Dawa) Basin',
      'Rift Valley Endorheic Basin (Awash River)',
      'High seasonal discharge & transboundary flows'
    ],
    ethiopianAnalogy: 'Just like rainwater flowing off the corrugated tin roof of an Ethiopian home into distinct gutters, Ethiopia’s highland plateau divides rainwater into streams flowing west to the Nile, southeast toward the Indian Ocean, and inward to the Rift Valley lakes.',
    sampleProblems: [
      {
        question: 'Which Ethiopian river basin drains into Lake Turkana in Kenya as an endorheic inland drainage system?',
        options: ['A) Abay River', 'B) Omo-Gibe River', 'C) Awash River', 'D) Tekeze River'],
        answer: 'B) Omo-Gibe River',
        solution: 'The Omo-Gibe River drains southward from the Ethiopian highlands directly into Lake Turkana.'
      }
    ]
  },

  // Grade 12 Economics
  {
    id: 'g12-econ-u1-01',
    grade: 'Grade 12',
    subject: 'Economics',
    stream: 'Social Science',
    unit: 'Unit 1: Macroeconomic Indicators & National Income Accounting',
    topic: '1.2 Gross Domestic Product (GDP) Measurement Approaches',
    page: 'p. 22-34',
    summary: 'Gross Domestic Product (GDP) is the total monetary value of all final goods and services produced within the geographic boundaries of a country during a given period (usually one year). There are three equivalent measurement approaches: 1) Expenditure Approach: GDP = C + I + G + (X - M), where C = household consumption, I = gross investment, G = government expenditure, and (X - M) = net exports. 2) Income Approach: Sum of compensation of employees, rent, interest, corporate profits, and depreciation. 3) Value Added (Product) Approach: Sum of value added at each stage of production. Real GDP adjusts nominal GDP for inflation using the GDP Deflator: Real GDP = (Nominal GDP / GDP Deflator) · 100.',
    keyFormulasOrTerms: [
      'GDP = C + I + G + (X - M)',
      'Value Added = Gross Output - Intermediate Consumption',
      'Real GDP = (Nominal GDP / Price Index) · 100',
      'GDP Deflator = (Nominal GDP / Real GDP) · 100',
      'Per Capita GDP = GDP / Population'
    ],
    ethiopianAnalogy: 'If an Ethiopian coffee grower in Yirgacheffe sells raw cherries for 100 Birr to a washing station, which washes and dries them and sells them for 180 Birr to an exporter in Addis Ababa, who exports them for 300 Birr, the GDP contribution is not 100+180+300=580, but rather the total final export value of 300 Birr (avoiding double counting via the Value Added approach: 100 + 80 + 120 = 300 Birr).',
    sampleProblems: [
      {
        question: 'Given: Consumption C = 500 Billion Birr, Investment I = 150 Billion Birr, Government spending G = 120 Billion Birr, Exports X = 40 Billion Birr, Imports M = 90 Billion Birr. What is GDP using the expenditure approach?',
        options: ['A) 720 Billion Birr', 'B) 770 Billion Birr', 'C) 810 Billion Birr', 'D) 680 Billion Birr'],
        answer: 'A) 720 Billion Birr',
        solution: 'GDP = C + I + G + (X - M) = 500 + 150 + 120 + (40 - 90) = 770 - 50 = 720 Billion Birr.'
      }
    ]
  },

  // Grade 10 Mathematics
  {
    id: 'g10-math-u2-01',
    grade: 'Grade 10',
    subject: 'Mathematics',
    stream: 'Common',
    unit: 'Unit 2: Polynomial Functions',
    topic: '2.3 Remainder Theorem and Factor Theorem',
    page: 'p. 62-71',
    summary: 'Let P(x) be a polynomial. The Division Algorithm states P(x) = D(x) · Q(x) + R(x). Remainder Theorem: When a polynomial P(x) is divided by a linear divisor (x - c), the remainder is equal to P(c). Factor Theorem: The linear expression (x - c) is a factor of the polynomial P(x) if and only if P(c) = 0. Rational Root Theorem: If P(x) has integer coefficients, any rational root p/q in lowest terms satisfies: p is a factor of the constant term a₀, and q is a factor of the leading coefficient a_n.',
    keyFormulasOrTerms: [
      'P(x) = (x - c) Q(x) + R, where R = P(c)',
      'Factor Theorem: (x - c) is a factor ⟺ P(c) = 0',
      'Rational Root Theorem: p | a₀ and q | a_n'
    ],
    ethiopianAnalogy: 'Think of dividing 25 loaves of traditional Dabo (ዳቦ) evenly among 6 family members: each receives 4 loaves with 1 loaf remaining (Remainder). If there are 24 loaves, the remainder is 0, meaning 6 divides 24 completely (it is a clean factor).',
    sampleProblems: [
      {
        question: 'What is the remainder when P(x) = 2x³ - 3x² + 4x - 5 is divided by (x - 2)?',
        options: ['A) 7', 'B) 11', 'C) -5', 'D) 15'],
        answer: 'A) 7',
        solution: 'By the Remainder Theorem, R = P(2) = 2(2)³ - 3(2)² + 4(2) - 5 = 2(8) - 3(4) + 8 - 5 = 16 - 12 + 8 - 5 = 7.'
      }
    ]
  },

  // Grade 9 Physics
  {
    id: 'g9-phys-u1-01',
    grade: 'Grade 9',
    subject: 'Physics',
    stream: 'Common',
    unit: 'Unit 1: Physics and the Human Society',
    topic: '1.2 Fundamental and Derived Physical Quantities',
    page: 'p. 8-16',
    summary: 'Physics is the study of matter, energy, and their interactions. Physical quantities are classified into: 1) Fundamental (Base) quantities: length (meter, m), mass (kilogram, kg), time (second, s), electric current (ampere, A), thermodynamic temperature (kelvin, K), amount of substance (mole, mol), and luminous intensity (candela, cd). 2) Derived quantities: defined in terms of combinations of fundamental quantities, such as velocity (m/s), acceleration (m/s²), force (Newton, N = kg·m/s²), work and energy (Joule, J = N·m), and pressure (Pascal, Pa = N/m²). Metric prefixes (kilo 10³, mega 10⁶, micro 10⁻⁶, nano 10⁻⁹) simplify measurement scales.',
    keyFormulasOrTerms: [
      '7 SI Base Units: m, kg, s, A, K, mol, cd',
      'Derived Units: N = kg·m/s², J = N·m, W = J/s',
      'Dimensional analysis: [L], [M], [T]',
      'Metric prefixes'
    ],
    ethiopianAnalogy: 'Just as all varied Ethiopian traditional dishes start from a few elemental staple ingredients (Teff flour, Berbere spices, and water), all complex physical units (Force, Energy, Power) are built up from the basic foundational SI units (meter, kilogram, second).',
    sampleProblems: [
      {
        question: 'Which of the following is an SI fundamental (base) physical quantity?',
        options: ['A) Force', 'B) Electric current', 'C) Speed', 'D) Density'],
        answer: 'B) Electric current',
        solution: 'Electric current is one of the 7 base SI quantities, measured in Amperes (A).'
      }
    ]
  }
];

export const ESSLCE_QUESTION_BANK: EsslceQuestion[] = [
  {
    id: 'esslce-p1',
    grade: 'Grade 12',
    subject: 'Physics',
    stream: 'Natural Science',
    year: 'ESSLCE National Exam Standard',
    unit: 'Unit 2: Two-Dimensional Motion',
    topic: 'Projectile Motion',
    citation: '[FDRE MoE Citation: Grade 11 Physics | Unit 2: Two-Dimensional Motion | Topic: Projectile Motion | Textbook Page: 52-54]',
    question: 'A projectile is launched from ground level with initial speed v₀ at an angle θ with the horizontal. At what launch angle θ is the maximum horizontal range achieved (ignoring air resistance)?',
    options: ['A) 30°', 'B) 45°', 'C) 60°', 'D) 90°'],
    correctIndex: 1,
    explanation: 'The horizontal range formula is R = (v₀² sin 2θ) / g. The sine function achieves its maximum value of 1 when its argument equals 90°. Setting 2θ = 90° yields θ = 45°.',
    examTrap: 'Students frequently confuse maximum range (45°) with maximum height, which occurs at launch angle 90° straight upward.',
    learningModeHint: 'When throwing a stone as far across a river as possible, throwing neither too flat nor too high (right in the middle at 45°) carries it the furthest.'
  },
  {
    id: 'esslce-p2',
    grade: 'Grade 12',
    subject: 'Physics',
    stream: 'Natural Science',
    year: 'ESSLCE National Exam Standard',
    unit: 'Unit 1: Thermodynamics',
    topic: 'Carnot Heat Engine Efficiency',
    citation: '[FDRE MoE Citation: Grade 12 Physics | Unit 1: Thermodynamics | Topic: Carnot Cycle | Textbook Page: 24-26]',
    question: 'A heat engine absorbs 2000 J of thermal energy from a high-temperature reservoir and exhausts 1200 J to a cold-temperature reservoir during each cycle. What is the thermal efficiency of this engine?',
    options: ['A) 60%', 'B) 40%', 'C) 30%', 'D) 25%'],
    correctIndex: 1,
    explanation: 'Thermal efficiency η = W / Q_H = (Q_H - Q_C) / Q_H = (2000 - 1200) / 2000 = 800 / 2000 = 0.40 = 40%.',
    examTrap: 'A trap is calculating Q_C / Q_H = 1200 / 2000 = 60%, which is the heat wasted fraction, not the efficiency (which is 1 - 0.60 = 40%).',
    learningModeHint: 'Efficiency is simply: what useful work you get out divided by what total fuel/energy you put in.'
  },
  {
    id: 'esslce-c1',
    grade: 'Grade 12',
    subject: 'Chemistry',
    stream: 'Natural Science',
    year: 'ESSLCE National Exam Standard',
    unit: 'Unit 1: Atomic Structure',
    topic: 'Electronic Configurations',
    citation: '[FDRE MoE Citation: Grade 11 Chemistry | Unit 1: Atomic Structure | Topic: Electronic Configuration | Textbook Page: 31-33]',
    question: 'Which of the following elements has an exceptional ground-state electronic configuration with a half-filled d-subshell?',
    options: ['A) Iron (Z = 26)', 'B) Chromium (Z = 24)', 'C) Nickel (Z = 28)', 'D) Zinc (Z = 30)'],
    correctIndex: 1,
    explanation: 'Chromium (Z = 24) has the ground-state electron configuration [Ar] 4s¹ 3d⁵ rather than [Ar] 4s² 3d⁴, because half-filled d subshells (3d⁵) provide symmetrical charge distribution and increased stability.',
    examTrap: 'Do not follow Aufbau blindly to write 4s² 3d⁴; Chromium and Copper are classic exceptions repeatedly tested in ESSLCE.',
    learningModeHint: 'Remember "Cr and Cu" - the two famous rebels of the 3d transition metals in your textbook!'
  },
  {
    id: 'esslce-m1',
    grade: 'Grade 12',
    subject: 'Mathematics',
    stream: 'Natural Science',
    year: 'ESSLCE National Exam Standard',
    unit: 'Unit 3: Calculus',
    topic: 'Critical Points and Derivatives',
    citation: '[FDRE MoE Citation: Grade 12 Mathematics | Unit 3: Derivatives | Topic: Applications of Derivatives | Textbook Page: 118-120]',
    question: 'What are the critical numbers of the function f(x) = 2x³ - 9x² + 12x - 5?',
    options: ['A) x = 1 and x = 2', 'B) x = -1 and x = -2', 'C) x = 0 and x = 3', 'D) x = 2 and x = 3'],
    correctIndex: 0,
    explanation: 'Take the first derivative: f\'(x) = 6x² - 18x + 12. Set f\'(x) = 0: 6(x² - 3x + 2) = 0 ⟹ 6(x - 1)(x - 2) = 0. Thus, x = 1 and x = 2.',
    examTrap: 'Forgetting to factor out the common constant 6 can cause arithmetic errors in the quadratic formula.',
    learningModeHint: 'To find critical points, always take the derivative, set it equal to 0, and factor.'
  },
  {
    id: 'esslce-h1',
    grade: 'Grade 12',
    subject: 'History',
    stream: 'Social Science',
    year: 'ESSLCE National Exam Standard',
    unit: 'Unit 4: Modern Ethiopian State',
    topic: 'Battle of Adwa',
    citation: '[FDRE MoE Citation: Grade 11 History | Unit 4: Modern Ethiopian State | Topic: Battle of Adwa | Textbook Page: 148-150]',
    question: 'Following the decisive victory of Ethiopia at the Battle of Adwa in 1896, which treaty officially recognized the unconditional independence of Ethiopia?',
    options: ['A) Treaty of Wuchale', 'B) Treaty of Addis Ababa (October 1896)', 'C) Treaty of Versailles', 'D) Tripartite Agreement'],
    correctIndex: 1,
    explanation: 'The Treaty of Addis Ababa, signed in October 1896, annulled the deceitful Treaty of Wuchale and compelled Italy to formally recognize Ethiopia as an independent sovereign empire.',
    examTrap: 'Do not confuse the cause (Treaty of Wuchale 1889) with the post-victory resolution (Treaty of Addis Ababa 1896).',
    learningModeHint: 'Wuchale started the conflict; Addis Ababa sealed the triumphant peace.'
  },
  {
    id: 'esslce-g1',
    grade: 'Grade 12',
    subject: 'Geography',
    stream: 'Social Science',
    year: 'ESSLCE National Exam Standard',
    unit: 'Unit 2: Drainage Systems',
    topic: 'Hydrological Characteristics',
    citation: '[FDRE MoE Citation: Grade 12 Geography | Unit 2: Drainage Systems | Topic: River Basins | Textbook Page: 68-71]',
    question: 'Which of the following Ethiopian rivers flows into an inland drainage basin (does not reach any ocean)?',
    options: ['A) Abay (Blue Nile)', 'B) Awash River', 'C) Baro River', 'D) Genale River'],
    correctIndex: 1,
    explanation: 'The Awash River flows through the Ethiopian Rift Valley and terminates in Lake Abbe in the Afar Depression, making it part of the endorheic (inland) drainage system.',
    examTrap: 'Students often forget that Awash never drains into the Red Sea or Indian Ocean—it evaporates in desert salt lakes.',
    learningModeHint: 'Awash stays home inside Ethiopia\'s Rift Valley until it sinks into Lake Abbe.'
  }
];

export const SUBJECTS_BY_STREAM = {
  'General Secondary (Grades 9-10)': [
    'Physics',
    'Mathematics',
    'Chemistry',
    'Biology',
    'English',
    'Geography',
    'History',
    'Economics'
  ],
  'Natural Science (Grades 11-12)': [
    'Physics',
    'Mathematics',
    'Chemistry',
    'Biology',
    'English'
  ],
  'Social Science (Grades 11-12)': [
    'Economics',
    'Geography',
    'History',
    'Mathematics',
    'English'
  ]
};

export const ETHIOPIAN_LANGUAGES = [
  { id: 'English', label: 'English', nativeName: 'English', flag: '🇬🇧' },
  { id: 'Amharic', label: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
  { id: 'Afaan Oromoo', label: 'Afaan Oromoo', nativeName: 'Afaan Oromoo', flag: '🌳' },
  { id: 'Tigrinya', label: 'Tigrinya', nativeName: 'ትግርኛ', flag: '🇪🇹' }
];

export const LEARNING_MODES = [
  {
    id: 'BEGINNER',
    name: 'Beginner',
    amharicName: 'ጀማሪ (Beginner)',
    color: 'emerald',
    badge: '🟢 Beginner Mode',
    description: 'High scaffolding, everyday Ethiopian analogies, broken-down steps, no assumed mastery, intuitive hints.'
  },
  {
    id: 'GUIDED',
    name: 'Guided',
    amharicName: 'መሪ (Guided)',
    color: 'sky',
    badge: '🔵 Guided Mode',
    description: 'Step-by-step curriculum walk, conceptual checkpoints, and a Reflective Check question at the end.'
  },
  {
    id: 'PRACTICE',
    name: 'Practice',
    amharicName: 'ልምምድ (Practice)',
    color: 'amber',
    badge: '🟡 Practice Mode',
    description: 'Rigorous problem solving, textbook problem variations, mathematical derivations, self-checking strategies.'
  },
  {
    id: 'MASTERY',
    name: 'Mastery (ESSLCE)',
    amharicName: 'ብቃት (Mastery)',
    color: 'purple',
    badge: '🟣 ESSLCE Mastery',
    description: 'Exam-level rigor, national exam traps, tricky distractors, time-saving tricks, textbook justifications.'
  }
];

import { CURRICULUM_AM } from './curriculum_am';
import { CURRICULUM_OM } from './curriculum_om';
import { CURRICULUM_TI } from './curriculum_ti';
import { CURRICULUM_AR } from './curriculum_ar';
import { CURRICULUM_SO } from './curriculum_so';
import { CURRICULUM_EN } from './curriculum_en';

export const getCurriculum = (lang: string = 'am') => {
  switch (lang) {
    case 'om':
      return CURRICULUM_OM;
    case 'ti':
      return CURRICULUM_TI;
    case 'ar':
      return CURRICULUM_AR;
    case 'so':
      return CURRICULUM_SO;
    case 'en':
      return CURRICULUM_EN;
    case 'am':
    default:
      return CURRICULUM_AM;
  }
};

