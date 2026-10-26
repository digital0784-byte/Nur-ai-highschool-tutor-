/**
 * Official Ministry of Education (MoE) Ethiopian Secondary Textbook Registry
 * Complete Table of Contents (የመፅሃፍት ማውጫ) for Grades 9, 10, 11, and 12
 * FDRE MoE New Curriculum (2019 E.C. / 2026)
 */

export interface TextbookSubsection {
  sectionNumber: string;
  title: string;
  titleAmharic?: string;
  page: number;
}

export interface TextbookChapter {
  chapterNumber: number;
  title: string;
  titleAmharic: string;
  startPage: number;
  endPage: number;
  summary: string;
  keyCompetencies: string[];
  subsections: TextbookSubsection[];
}

export interface MoETextbookItem {
  id: string;
  grade: 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';
  subject: string;
  subjectAmharic: string;
  stream: 'Common' | 'Natural Science' | 'Social Science';
  edition: string;
  totalChapters: number;
  totalPages: number;
  coverColor: string;
  pdfPath: string;
  drmProtected: boolean;
  chapters: {
    chapterNumber: number;
    title: string;
    startPage: number;
    endPage: number;
  }[];
  tableOfContents: TextbookChapter[];
}

export const OFFICIAL_TEXTBOOKS_REGISTRY: MoETextbookItem[] = [
  // ==========================================
  // GRADE 11 TEXTBOOKS
  // ==========================================
  {
    id: 'moe-g11-phy-2019',
    grade: 'Grade 11',
    subject: 'Physics',
    subjectAmharic: 'ፊዚክስ',
    stream: 'Natural Science',
    edition: 'FDRE Ministry of Education 2019 E.C. Edition',
    totalChapters: 6,
    totalPages: 312,
    coverColor: 'from-blue-600 to-indigo-800',
    pdfPath: '/assets/textbooks/moe_grade_11_physics_2019.pdf',
    drmProtected: true,
    chapters: [
      { chapterNumber: 1, title: 'Measurement and Practical Work', startPage: 1, endPage: 44 },
      { chapterNumber: 2, title: 'Two-Dimensional Motion', startPage: 45, endPage: 92 },
      { chapterNumber: 3, title: 'Law of Conservation of Momentum', startPage: 93, endPage: 140 },
      { chapterNumber: 4, title: 'Rotational Motion and Gravitation', startPage: 141, endPage: 198 },
      { chapterNumber: 5, title: 'Oscillations and Waves', startPage: 199, endPage: 254 },
      { chapterNumber: 6, title: 'Electromagnetism & Circuit Dynamics', startPage: 255, endPage: 312 },
    ],
    tableOfContents: [
      {
        chapterNumber: 1,
        title: 'Measurement and Practical Work',
        titleAmharic: 'መለኪያና የተግባራዊ ስራዎች',
        startPage: 1,
        endPage: 44,
        summary: 'Focuses on experimental errors, uncertainty propagation, 3D vector algebra, and dimensional analysis of physical formulas.',
        keyCompetencies: [
          'Verify dimensional homogeneity of complex equations',
          'Calculate uncertainty in derived experimental quantities',
          'Perform 3D vector cross and dot products'
        ],
        subsections: [
          { sectionNumber: '1.1', title: 'Science of Measurement & SI Units', titleAmharic: 'የመለኪያ ሳይንስና የ SI አሃዶች', page: 2 },
          { sectionNumber: '1.2', title: 'Errors and Uncertainty Analysis', titleAmharic: 'የስህተትና እርግጠኝነት ማጣት ትንታኔ', page: 12 },
          { sectionNumber: '1.3', title: 'Vectors in 3-Dimensional Space', titleAmharic: 'ቬክተሮች በ3-ልኬት ጠፈር', page: 24 },
          { sectionNumber: '1.4', title: 'Dimensional Analysis & Homogeneity', titleAmharic: 'ልኬታዊ ትንታኔና ተመሳሳይነት', page: 36 },
        ]
      },
      {
        chapterNumber: 2,
        title: 'Two-Dimensional Motion',
        titleAmharic: 'እንቅስቃሴ በሁለት አቅጣጫ (2D)',
        startPage: 45,
        endPage: 92,
        summary: 'Covers projectile kinematics, parabolic trajectories, maximum range, time of flight, and relative velocity.',
        keyCompetencies: [
          'Derive horizontal range R = (v₀² sin 2θ)/g',
          'Calculate apex height and time of flight',
          'Solve relative velocity problems for aerial and river navigation'
        ],
        subsections: [
          { sectionNumber: '2.1', title: 'Kinematics in Two Dimensions', titleAmharic: 'የሁለት አቅጣጫ እንቅስቃሴ ኪነማቲክስ', page: 46 },
          { sectionNumber: '2.2', title: 'Projectile Motion & Parabolic Path', titleAmharic: 'የውርወራ እንቅስቃሴና ፓራቦሊክ መንገድ', page: 54 },
          { sectionNumber: '2.3', title: 'Maximum Height and Horizontal Range', titleAmharic: 'ከፍተኛ ከፍታና አግድም ርቀት', page: 68 },
          { sectionNumber: '2.4', title: 'Relative Velocity & Frame of Reference', titleAmharic: 'ተዛማጅ ፍጥነትና የመመልከቻ ማዕቀፍ', page: 80 },
        ]
      },
      {
        chapterNumber: 3,
        title: 'Law of Conservation of Momentum',
        titleAmharic: 'የሞመንተም ህልውና ህግ',
        startPage: 93,
        endPage: 140,
        summary: 'Linear and angular momentum conservation in elastic and inelastic collisions with rocket propulsion principles.',
        keyCompetencies: [
          'Apply conservation of linear momentum to isolated collision systems',
          'Distinguish between elastic and inelastic kinetic energy loss',
          'Derive rocket thrust and variable mass equations'
        ],
        subsections: [
          { sectionNumber: '3.1', title: 'Impulse and Linear Momentum', titleAmharic: 'ኢምፐልስ እና ቀጥተኛ ሞመንተም', page: 94 },
          { sectionNumber: '3.2', title: 'Conservation of Linear Momentum', titleAmharic: 'የቀጥተኛ ሞመንተም ህልውና', page: 106 },
          { sectionNumber: '3.3', title: 'Elastic & Inelastic Collisions in 2D', titleAmharic: 'ተለጣጭና ኢ-ተለጣጭ ግጭቶች', page: 118 },
          { sectionNumber: '3.4', title: 'Rocket Propulsion Dynamics', titleAmharic: 'የሮኬት መንደርደር ኃይል', page: 130 },
        ]
      },
      {
        chapterNumber: 4,
        title: 'Rotational Motion and Gravitation',
        titleAmharic: 'የዙረት እንቅስቃሴና ስበት',
        startPage: 141,
        endPage: 198,
        summary: 'Angular kinematics, moment of inertia, torque, Newton’s law of universal gravitation, and planetary orbits.',
        keyCompetencies: [
          'Calculate moment of inertia for standard geometric shapes',
          'Formulate rotational dynamic equilibrium (Στ = 0)',
          'Apply Kepler’s laws to satellite orbits around Earth'
        ],
        subsections: [
          { sectionNumber: '4.1', title: 'Angular Kinematics & Variables', titleAmharic: 'የማዕዘናዊ እንቅስቃሴ ኪነማቲክስ', page: 142 },
          { sectionNumber: '4.2', title: 'Torque and Moment of Inertia', titleAmharic: 'ቶርክና የማዞሪያ ድንዛዜ', page: 156 },
          { sectionNumber: '4.3', title: 'Rotational Kinetic Energy & Work', titleAmharic: 'የዙረት እንቅስቃሴ ጉልበት', page: 172 },
          { sectionNumber: '4.4', title: 'Newton’s Law of Universal Gravitation', titleAmharic: 'የኒውተን አጠቃላይ የስበት ህግ', page: 184 },
        ]
      },
      {
        chapterNumber: 5,
        title: 'Oscillations and Waves',
        titleAmharic: 'ርግብግቢትና ሞገዶች',
        startPage: 199,
        endPage: 254,
        summary: 'Simple harmonic motion (SHM), pendulums, mechanical wave propagation, sound intensity, and Doppler effect.',
        keyCompetencies: [
          'Formulate the differential equation of simple harmonic motion',
          'Compute period of simple pendulum and mass-spring oscillator',
          'Calculate observed frequency shifts using Doppler formula'
        ],
        subsections: [
          { sectionNumber: '5.1', title: 'Simple Harmonic Motion (SHM)', titleAmharic: 'ቀላል ሀርሞኒክ እንቅስቃሴ', page: 200 },
          { sectionNumber: '5.2', title: 'Energy in Oscillating Systems', titleAmharic: 'የተወዛዋዥ ስርአቶች ጉልበት', page: 214 },
          { sectionNumber: '5.3', title: 'Mechanical Waves & Wave Equation', titleAmharic: 'ሜካኒካል ሞገዶችና የሞገድ ቀመር', page: 226 },
          { sectionNumber: '5.4', title: 'Sound Waves & Doppler Shift', titleAmharic: 'የድምፅ ሞገድና የዶፕለር ሽግግር', page: 240 },
        ]
      },
      {
        chapterNumber: 6,
        title: 'Electromagnetism & Circuit Dynamics',
        titleAmharic: 'ኤሌክትሮማግኔቲዝም እና የሰርኪውት ዳይናሚክስ',
        startPage: 255,
        endPage: 312,
        summary: 'Coulomb’s law, Gauss’s law, magnetic fields due to currents, Ampere’s law, Faraday induction, and AC circuits.',
        keyCompetencies: [
          'Calculate electric flux and fields using Gauss’s Law',
          'Apply Biot-Savart law to calculate magnetic fields of solenoids',
          'Analyze RLC circuits in AC resonance'
        ],
        subsections: [
          { sectionNumber: '6.1', title: 'Electric Field & Gauss’s Law', titleAmharic: 'የኤሌክትሪክ መስክና የጋውስ ህግ', page: 256 },
          { sectionNumber: '6.2', title: 'Magnetic Fields & Ampere’s Law', titleAmharic: 'የማግኔቲክ መስክና የአምፔር ህግ', page: 272 },
          { sectionNumber: '6.3', title: 'Faraday’s Law of Electromagnetic Induction', titleAmharic: 'የፋራዴይ የኢንደክሽን ህግ', page: 288 },
          { sectionNumber: '6.4', title: 'Alternating Current (AC) & RLC Resonance', titleAmharic: 'ተለዋዋጭ ጅረትና የሬዞናንስ ሰርኪውት', page: 300 },
        ]
      },
    ]
  },

  {
    id: 'moe-g11-chem-2019',
    grade: 'Grade 11',
    subject: 'Chemistry',
    subjectAmharic: 'ኬሚስትሪ',
    stream: 'Natural Science',
    edition: 'FDRE Ministry of Education 2019 E.C. Edition',
    totalChapters: 6,
    totalPages: 280,
    coverColor: 'from-teal-600 to-emerald-800',
    pdfPath: '/assets/textbooks/moe_grade_11_chemistry_2019.pdf',
    drmProtected: true,
    chapters: [
      { chapterNumber: 1, title: 'Atomic Structure and the Periodic Table', startPage: 1, endPage: 50 },
      { chapterNumber: 2, title: 'Chemical Bonding and Molecular Structure', startPage: 51, endPage: 104 },
      { chapterNumber: 3, title: 'Physical States of Matter', startPage: 105, endPage: 156 },
      { chapterNumber: 4, title: 'Chemical Kinetics and Reaction Dynamics', startPage: 157, endPage: 210 },
      { chapterNumber: 5, title: 'Chemical Equilibrium and Le Chatelier', startPage: 211, endPage: 250 },
      { chapterNumber: 6, title: 'Electrochemistry and Industrial Batteries', startPage: 251, endPage: 280 },
    ],
    tableOfContents: [
      {
        chapterNumber: 1,
        title: 'Atomic Structure and the Periodic Table',
        titleAmharic: 'የአተም አወቃቀርና ፔሪዮዲክ ሰንጠረዥ',
        startPage: 1,
        endPage: 50,
        summary: 'Historical development of atomic models, Bohr model, quantum numbers (n, l, m_l, m_s), electronic configuration, and periodic trends.',
        keyCompetencies: [
          'Differentiate quantum numbers and orbital shapes',
          'Write electron configurations for transition elements with anomalous states',
          'Predict periodic trends in ionization energy, electronegativity, and atomic radii'
        ],
        subsections: [
          { sectionNumber: '1.1', title: 'Historical Development of Atomic Structure', titleAmharic: 'የአተም አወቃቀር ታሪካዊ እድገት', page: 2 },
          { sectionNumber: '1.2', title: 'Bohr Model & Quantum Mechanical Framework', titleAmharic: 'የቦህር ሞዴልና የኳንተም ሜካኒክስ', page: 14 },
          { sectionNumber: '1.3', title: 'Quantum Numbers & Electronic Configuration', titleAmharic: 'የኳንተም ቁጥሮችና የኤሌክትሮን አቀማመጥ', page: 26 },
          { sectionNumber: '1.4', title: 'Periodic Properties & Trends across Periods', titleAmharic: 'የፔሪዮዲክ ባህሪያትና አዝማሚያዎች', page: 38 },
        ]
      },
      {
        chapterNumber: 2,
        title: 'Chemical Bonding and Molecular Structure',
        titleAmharic: 'የኬሚካል ትስስርና የሞለኪውል ቅርፅ',
        startPage: 51,
        endPage: 104,
        summary: 'Ionic and covalent bonding, Lewis structures, octet exceptions, VSEPR theory, hybridization (sp, sp2, sp3), and intermolecular dipole forces.',
        keyCompetencies: [
          'Draw resonance Lewis structures and calculate formal charges',
          'Predict 3D molecular shapes using VSEPR theory',
          'Explain hydrogen bonding in water and biological macromolecules'
        ],
        subsections: [
          { sectionNumber: '2.1', title: 'Ionic Bonding & Lattice Enthalpy', titleAmharic: 'አዮኒክ ትስስርና የላቲስ ኢነርጂ', page: 52 },
          { sectionNumber: '2.2', title: 'Covalent Bonds & Lewis Dot Representations', titleAmharic: 'ኮቫለንት ትስስርና የሉዊስ ውክልና', page: 64 },
          { sectionNumber: '2.3', title: 'VSEPR Theory & Molecular Geometry', titleAmharic: 'የ VSEPR ፅንሰ ሀሳብና የሞለኪውል ቅርፅ', page: 78 },
          { sectionNumber: '2.4', title: 'Orbital Hybridization & Intermolecular Forces', titleAmharic: 'የኦርቢታል ቅይጥና ሞለኪውላዊ ኃይሎች', page: 92 },
        ]
      },
      {
        chapterNumber: 3,
        title: 'Physical States of Matter',
        titleAmharic: 'የቁስ አካላት ነባራዊ ሁኔታዎች',
        startPage: 105,
        endPage: 156,
        summary: 'Ideal gas laws, real gas deviations (van der Waals equation), liquid properties (surface tension, viscosity), and crystalline solids.',
        keyCompetencies: [
          'Perform gas stoichiometry under non-STP conditions',
          'Calculate pressure using van der Waals equation',
          'Classify crystalline solids (metallic, ionic, molecular, covalent network)'
        ],
        subsections: [
          { sectionNumber: '3.1', title: 'The Gaseous State & Kinetic Molecular Theory', titleAmharic: 'የጋዝ ሁኔታና የኪነቲክ ንድፈ-ሀሳብ', page: 106 },
          { sectionNumber: '3.2', title: 'Real Gases & van der Waals Equation', titleAmharic: 'እውነተኛ ጋዞችና የቫን ደር ዋልስ ቀመር', page: 120 },
          { sectionNumber: '3.3', title: 'Properties of Liquids & Phase Transitions', titleAmharic: 'የፈሳሾች ባህሪያትና የሁኔታ ሽግግር', page: 132 },
          { sectionNumber: '3.4', title: 'Solid State Structures & Unit Cells', titleAmharic: 'የጠጣር ቁሶች ቅርፅና ዩኒት ሴል', page: 144 },
        ]
      },
      {
        chapterNumber: 4,
        title: 'Chemical Kinetics and Reaction Dynamics',
        titleAmharic: 'የኬሚካል እንቅስቃሴና የፍጥነት ህጎች',
        startPage: 157,
        endPage: 210,
        summary: 'Reaction rates, rate laws, orders of reaction, collision theory, activation energy, Arrhenius equation, and catalysis.',
        keyCompetencies: [
          'Determine rate law and rate constant from initial rate experimental data',
          'Calculate activation energy using Arrhenius plot (ln k vs 1/T)',
          'Explain industrial homogeneous and heterogeneous catalysis'
        ],
        subsections: [
          { sectionNumber: '4.1', title: 'Rate of Chemical Reactions', titleAmharic: 'የኬሚካል ግብረ-መልስ ፍጥነት', page: 158 },
          { sectionNumber: '4.2', title: 'Rate Laws & Method of Initial Rates', titleAmharic: 'የፍጥነት ህግና የመጀመሪያ ፍጥነቶች ስሌት', page: 172 },
          { sectionNumber: '4.3', title: 'Collision Theory & Activation Energy', titleAmharic: 'የግጭት ንድፈ-ሀሳብና አነሳሽ ጉልበት', page: 186 },
          { sectionNumber: '4.4', title: 'Catalysis in Chemical Industries', titleAmharic: 'ካታላይሲስ በኢንዱስትሪ ውስጥ', page: 198 },
        ]
      },
      {
        chapterNumber: 5,
        title: 'Chemical Equilibrium and Le Chatelier',
        titleAmharic: 'ኬሚካላዊ ሚዛን እና የለ ሻትሊየር ህግ',
        startPage: 211,
        endPage: 250,
        summary: 'Dynamic equilibrium, equilibrium constants (Kc and Kp), reaction quotient (Q), Le Chatelier’s principle, and industrial Haber-Bosch optimization.',
        keyCompetencies: [
          'Formulate Kc and Kp for homogeneous and heterogeneous systems',
          'Predict shifts in equilibrium when subjected to pressure, temp, or concentration changes',
          'Calculate equilibrium concentrations using ICE tables'
        ],
        subsections: [
          { sectionNumber: '5.1', title: 'The Concept of Dynamic Equilibrium', titleAmharic: 'ተለዋዋጭ ሚዛን ፅንሰ-ሀሳብ', page: 212 },
          { sectionNumber: '5.2', title: 'Equilibrium Constants: Kc and Kp', titleAmharic: 'የሚዛን ቋሚዎች: Kc እና Kp', page: 222 },
          { sectionNumber: '5.3', title: 'Le Chatelier’s Principle & Disturbances', titleAmharic: 'የለ ሻትሊየር መርህና መዛባቶች', page: 234 },
          { sectionNumber: '5.4', title: 'Industrial Equilibrium in Ethiopian Plants', titleAmharic: 'ኢንዱስትሪያዊ ሚዛን በኢትዮጵያ ፋብሪካዎች', page: 244 },
        ]
      },
      {
        chapterNumber: 6,
        title: 'Electrochemistry and Industrial Batteries',
        titleAmharic: 'ኤሌክትሮኬሚስትሪና ኢንዱስትሪያዊ ባትሪዎች',
        startPage: 251,
        endPage: 280,
        summary: 'Redox reactions, galvanic and electrolytic cells, standard electrode potentials, Nernst equation, commercial batteries, and corrosion prevention.',
        keyCompetencies: [
          'Balance redox reactions using half-reaction method in acidic and basic media',
          'Calculate cell electromotive force (E°cell) from reduction potentials',
          'Apply Faraday’s laws of electrolysis to electroplating'
        ],
        subsections: [
          { sectionNumber: '6.1', title: 'Redox Reactions & Half-Cell Balancing', titleAmharic: 'ሬዶክስ ግብረ-መልስና ሚዛናዊነት', page: 252 },
          { sectionNumber: '6.2', title: 'Galvanic Cells & Standard Potentials', titleAmharic: 'ጋልቫኒክ ሴሎችና መደበኛ ቮልቴጅ', page: 260 },
          { sectionNumber: '6.3', title: 'Electrolytic Cells & Faraday’s Laws', titleAmharic: 'ኤሌክትሮላይቲክ ሴሎችና የፋራዴይ ህጎች', page: 270 },
          { sectionNumber: '6.4', title: 'Commercial Batteries & Metal Corrosion', titleAmharic: 'የንግድ ባትሪዎችና የብረት ዝገት መከላከል', page: 276 },
        ]
      },
    ]
  },

  {
    id: 'moe-g11-math-2019',
    grade: 'Grade 11',
    subject: 'Mathematics',
    subjectAmharic: 'ሒሳብ',
    stream: 'Natural Science',
    edition: 'FDRE Ministry of Education 2019 E.C. Edition',
    totalChapters: 6,
    totalPages: 340,
    coverColor: 'from-amber-600 to-orange-800',
    pdfPath: '/assets/textbooks/moe_grade_11_mathematics_2019.pdf',
    drmProtected: true,
    chapters: [
      { chapterNumber: 1, title: 'Further on Relations and Functions', startPage: 1, endPage: 54 },
      { chapterNumber: 2, title: 'Rational Expressions & Rational Functions', startPage: 55, endPage: 110 },
      { chapterNumber: 3, title: 'Matrices and Determinants', startPage: 111, endPage: 170 },
      { chapterNumber: 4, title: 'Vectors in Two and Three Dimensions', startPage: 171, endPage: 228 },
      { chapterNumber: 5, title: 'Transformations of the Plane', startPage: 229, endPage: 280 },
      { chapterNumber: 6, title: 'Statistics and Probability', startPage: 281, endPage: 340 },
    ],
    tableOfContents: [
      {
        chapterNumber: 1,
        title: 'Further on Relations and Functions',
        titleAmharic: 'ዝምድናዎችና ፈንክሽኖች',
        startPage: 1,
        endPage: 54,
        summary: 'Injective, surjective, and bijective mappings, composite functions, inverse functions, and polynomial algebra.',
        keyCompetencies: [
          'Prove injectivity, surjectivity, and bijectivity of functions',
          'Compute composite function expressions and their domain restrictions',
          'Determine algebraic and graphical inverses'
        ],
        subsections: [
          { sectionNumber: '1.1', title: 'Types of Functions: Injective & Surjective', titleAmharic: 'የፈንክሽን አይነቶች', page: 2 },
          { sectionNumber: '1.2', title: 'Composition of Functions (f ∘ g)', titleAmharic: 'የፈንክሽኖች ቅንብር', page: 18 },
          { sectionNumber: '1.3', title: 'Inverse Functions and Domain Restrictions', titleAmharic: 'የተገላቢጦሽ ፈንክሽኖች', page: 32 },
          { sectionNumber: '1.4', title: 'Graphs of Power and Piecewise Functions', titleAmharic: 'የፈንክሽን ግራፎች', page: 44 },
        ]
      },
      {
        chapterNumber: 2,
        title: 'Rational Expressions & Rational Functions',
        titleAmharic: 'ሬሽናል አገላለጾችና ፈንክሽኖች',
        startPage: 55,
        endPage: 110,
        summary: 'Simplification, partial fractions decomposition, vertical and horizontal asymptotes, and graphing rational curves.',
        keyCompetencies: [
          'Decompose complex rational expressions into partial fractions',
          'Identify vertical, horizontal, and oblique asymptotes',
          'Solve rational equations and inequalities with sign charts'
        ],
        subsections: [
          { sectionNumber: '2.1', title: 'Simplification of Rational Expressions', titleAmharic: 'ሬሽናል አገላለጾችን ማቃለል', page: 56 },
          { sectionNumber: '2.2', title: 'Partial Fractions Decomposition', titleAmharic: 'ክፋይ ክፍልፋዮች', page: 70 },
          { sectionNumber: '2.3', title: 'Asymptotes and Intercepts', titleAmharic: 'አሲምፕቶቶችና የመገናኛ ነጥቦች', page: 84 },
          { sectionNumber: '2.4', title: 'Graphing Rational Functions', titleAmharic: 'ሬሽናል ፈንክሽኖችን መሳል', page: 98 },
        ]
      },
      {
        chapterNumber: 3,
        title: 'Matrices and Determinants',
        titleAmharic: 'ማትሪክስ እና ዲተርሚናንት',
        startPage: 111,
        endPage: 170,
        summary: 'Matrix algebra, row reduction (Gaussian elimination), determinant evaluation, and Cramer’s rule for linear systems.',
        keyCompetencies: [
          'Perform matrix multiplication and inversion using adjoints',
          'Calculate 3x3 determinants using cofactor expansion',
          'Solve systems of 3 linear equations using Cramer’s rule and Gauss-Jordan elimination'
        ],
        subsections: [
          { sectionNumber: '3.1', title: 'Definition & Operations on Matrices', titleAmharic: 'የማትሪክስ መሰረታዊ ስሌቶች', page: 112 },
          { sectionNumber: '3.2', title: 'Determinants of 2x2 and 3x3 Matrices', titleAmharic: 'የዲተርሚናንት ስሌቶች', page: 128 },
          { sectionNumber: '3.3', title: 'Matrix Inverses and Adjoints', titleAmharic: 'ኢንቨርስ ማትሪክስ', page: 142 },
          { sectionNumber: '3.4', title: 'Cramer’s Rule & Systems of Linear Equations', titleAmharic: 'የክሬመር ህግና መስመራዊ ስርአቶች', page: 156 },
        ]
      },
      {
        chapterNumber: 4,
        title: 'Vectors in Two and Three Dimensions',
        titleAmharic: 'ቬክተሮች በ2 እና 3 ልኬት',
        startPage: 171,
        endPage: 228,
        summary: 'Cartesian coordinates in 3D, scalar dot product, vector cross product, line equations, and plane equations in space.',
        keyCompetencies: [
          'Calculate angles between vectors using dot product',
          'Find normal vectors to planes using cross product',
          'Determine the parametric equation of a line in 3D'
        ],
        subsections: [
          { sectionNumber: '4.1', title: '3D Cartesian Coordinate System', titleAmharic: 'የ3-ልኬት ኮኦርዲኔት ስርአት', page: 172 },
          { sectionNumber: '4.2', title: 'Scalar (Dot) Product and Orthogonality', titleAmharic: 'ስካላር ብዜትና ቀጤ-ነክነት', page: 186 },
          { sectionNumber: '4.3', title: 'Vector (Cross) Product and Areas', titleAmharic: 'ቬክተር ብዜትና ስፋት', page: 200 },
          { sectionNumber: '4.4', title: 'Equations of Lines & Planes in Space', titleAmharic: 'የመስመሮችና ጠለሎች ቀመሮች', page: 214 },
        ]
      },
      {
        chapterNumber: 5,
        title: 'Transformations of the Plane',
        titleAmharic: 'የጠለል ትራንስፎርሜሽን',
        startPage: 229,
        endPage: 280,
        summary: 'Translations, reflections, rotations, shears, stretches, and matrix representations of geometric transformations.',
        keyCompetencies: [
          'Represent geometric transformations as 2x2 transformation matrices',
          'Determine the fixed points and invariants under reflection and rotation',
          'Calculate composite transformation matrices'
        ],
        subsections: [
          { sectionNumber: '5.1', title: 'Translations and Reflections', titleAmharic: 'ሽግግርና አንፀባራቂነት', page: 230 },
          { sectionNumber: '5.2', title: 'Rotations about the Origin', titleAmharic: 'ዙረት በማዕከል ዙሪያ', page: 244 },
          { sectionNumber: '5.3', title: 'Dilations, Stretches & Shears', titleAmharic: 'ማስፋፋትና ማጣመም', page: 256 },
          { sectionNumber: '5.4', title: 'Matrix Representation of Transformations', titleAmharic: 'ትራንስፎርሜሽን በማትሪክስ', page: 268 },
        ]
      },
      {
        chapterNumber: 6,
        title: 'Statistics and Probability',
        titleAmharic: 'ስታቲስቲክስ እና ፕሮባብሊቲ',
        startPage: 281,
        endPage: 340,
        summary: 'Measures of dispersion (variance, standard deviation), probability rules, conditional probability, Bayes’ theorem, and binomial distribution.',
        keyCompetencies: [
          'Calculate variance and standard deviation for grouped data',
          'Apply Bayes’ theorem to medical diagnostic and industrial probability problems',
          'Evaluate binomial probability P(X = k) = nCk · p^k · (1-p)^(n-k)'
        ],
        subsections: [
          { sectionNumber: '6.1', title: 'Measures of Dispersion: Variance & SD', titleAmharic: 'የስርጭት መለኪያዎች: ቫሪያንስ', page: 282 },
          { sectionNumber: '6.2', title: 'Probability Axioms & Counting Principles', titleAmharic: 'የፕሮባብሊቲ ህጎች', page: 298 },
          { sectionNumber: '6.3', title: 'Conditional Probability & Bayes’ Theorem', titleAmharic: 'ሁኔታዊ ፕሮባብሊቲና የባይስ ቴረም', page: 314 },
          { sectionNumber: '6.4', title: 'Binomial Probability Distribution', titleAmharic: 'ባይኖሚያል ስርጭት', page: 328 },
        ]
      },
    ]
  },

  {
    id: 'moe-g11-bio-2019',
    grade: 'Grade 11',
    subject: 'Biology',
    subjectAmharic: 'ባዮሎጂ',
    stream: 'Natural Science',
    edition: 'FDRE Ministry of Education 2019 E.C. Edition',
    totalChapters: 5,
    totalPages: 275,
    coverColor: 'from-emerald-600 to-green-800',
    pdfPath: '/assets/textbooks/moe_grade_11_biology_2019.pdf',
    drmProtected: true,
    chapters: [
      { chapterNumber: 1, title: 'Biomolecules and Cellular Chemistry', startPage: 1, endPage: 55 },
      { chapterNumber: 2, title: 'Cell Structure and Membrane Transport', startPage: 56, endPage: 110 },
      { chapterNumber: 3, title: 'Enzymes and Metabolic Pathways', startPage: 111, endPage: 165 },
      { chapterNumber: 4, title: 'Genetics and Molecular Biology', startPage: 166, endPage: 220 },
      { chapterNumber: 5, title: 'Ecology and Biodiversity Conservation', startPage: 221, endPage: 275 },
    ],
    tableOfContents: [
      {
        chapterNumber: 1,
        title: 'Biomolecules and Cellular Chemistry',
        titleAmharic: 'ባዮሞለኪውሎችና ሴሉላር ኬሚስትሪ',
        startPage: 1,
        endPage: 55,
        summary: 'Carbohydrates, lipids, proteins (primary to quaternary structures), nucleic acids (DNA and RNA), and high-energy ATP.',
        keyCompetencies: [
          'Identify peptide bonds and alpha-helix / beta-sheet structures',
          'Describe DNA double helix nucleotide base-pairing rules',
          'Perform food nutrient chemical tests in high school biology labs'
        ],
        subsections: [
          { sectionNumber: '1.1', title: 'Carbohydrates & Polysaccharides', titleAmharic: 'ካርቦሃይድሬቶች', page: 2 },
          { sectionNumber: '1.2', title: 'Lipids & Phospholipid Bilayers', titleAmharic: 'ቅባቶች', page: 16 },
          { sectionNumber: '1.3', title: 'Proteins & Amino Acid Sequencing', titleAmharic: 'ፕሮቲኖች', page: 28 },
          { sectionNumber: '1.4', title: 'Nucleic Acids: DNA, RNA & ATP', titleAmharic: 'ኒውክሊክ አሲዶች', page: 42 },
        ]
      },
      {
        chapterNumber: 2,
        title: 'Cell Structure and Membrane Transport',
        titleAmharic: 'የሴል አወቃቀርና የሜምብሬን ዝውውር',
        startPage: 56,
        endPage: 110,
        summary: 'Prokaryotic vs eukaryotic organelles, fluid mosaic model, diffusion, facilitated transport, active transport, and endocytosis.',
        keyCompetencies: [
          'Compare ultrastructure under transmission electron microscopes',
          'Explain sodium-potassium ATPase pump mechanisms',
          'Calculate water potential and predict plant plasmolysis'
        ],
        subsections: [
          { sectionNumber: '2.1', title: 'Organelle Ultrastructure & Functions', titleAmharic: 'የኦርጋኔሎች አወቃቀር', page: 58 },
          { sectionNumber: '2.2', title: 'The Fluid Mosaic Membrane Model', titleAmharic: 'የሴል ሽፋን ሞዴል', page: 72 },
          { sectionNumber: '2.3', title: 'Passive Transport: Diffusion & Osmosis', titleAmharic: 'ቀጥተኛ ዝውውርና ኦስሞሲስ', page: 86 },
          { sectionNumber: '2.4', title: 'Active Transport & Vesicular Trafficking', titleAmharic: 'ንቁ ዝውውር በሴል ሽፋን', page: 98 },
        ]
      },
      {
        chapterNumber: 3,
        title: 'Enzymes and Metabolic Pathways',
        titleAmharic: 'ኢንዛይሞችና ሜታቦሊዝም',
        startPage: 111,
        endPage: 165,
        summary: 'Enzyme-substrate specificity, lock-and-key vs induced fit, factors affecting rate (pH, temp, inhibitors), cellular respiration, and photosynthesis.',
        keyCompetencies: [
          'Interpret Michaelis-Menten kinetic curves and competitive vs non-competitive inhibition',
          'Trace ATP generation across Glycolysis, Krebs cycle, and Electron Transport Chain',
          'Compare C3, C4, and CAM photosynthetic pathways in Ethiopian flora'
        ],
        subsections: [
          { sectionNumber: '3.1', title: 'Enzyme Mechanisms & Induced Fit', titleAmharic: 'የኢንዛይም አሰራር መርሆዎች', page: 112 },
          { sectionNumber: '3.2', title: 'Factors Affecting Enzyme Kinetics', titleAmharic: 'የኢንዛይም ፍጥነት ተፅዕኖ ፈጣሪዎች', page: 126 },
          { sectionNumber: '3.3', title: 'Aerobic & Anaerobic Cellular Respiration', titleAmharic: 'የሴል አተነፋፈስ', page: 138 },
          { sectionNumber: '3.4', title: 'Photosynthesis & Carbon Fixation', titleAmharic: 'ፎቶሲንተሲስና ካርቦን ማስተካከል', page: 152 },
        ]
      },
      {
        chapterNumber: 4,
        title: 'Genetics and Molecular Biology',
        titleAmharic: 'ጄኔቲክስና ሞለኪውላር ባዮሎጂ',
        startPage: 166,
        endPage: 220,
        summary: 'Mendelian inheritance, dihybrid crosses, sex-linked traits, DNA replication, transcription, translation, and genetic engineering.',
        keyCompetencies: [
          'Solve monohybrid and dihybrid Punnett square ratios',
          'Translate mRNA codon tables into polypeptide sequences',
          'Discuss recombinant DNA technology and GMO agricultural applications'
        ],
        subsections: [
          { sectionNumber: '4.1', title: 'Mendel’s Laws of Inheritance', titleAmharic: 'የሜንዴል የዘር ውርስ ህጎች', page: 168 },
          { sectionNumber: '4.2', title: 'Sex Linkage & Pedigree Analysis', titleAmharic: 'የፆታ ተዛማጅ ውርስ', page: 182 },
          { sectionNumber: '4.3', title: 'DNA Replication & Central Dogma', titleAmharic: 'የዲኤንኤ መባዛትና ፕሮቲን ማምረት', page: 194 },
          { sectionNumber: '4.4', title: 'Biotechnology & Genetic Engineering', titleAmharic: 'ባዮቴክኖሎጂና ጄኔቲክ ምህንድስና', page: 208 },
        ]
      },
      {
        chapterNumber: 5,
        title: 'Ecology and Biodiversity Conservation',
        titleAmharic: 'ኢኮሎጂና የብዝሀ-ህይወት ጥበቃ',
        startPage: 221,
        endPage: 275,
        summary: 'Ecosystem trophic levels, nutrient cycles (carbon, nitrogen), population dynamics, endemic Ethiopian species, and conservation parks.',
        keyCompetencies: [
          'Construct food webs and calculate 10% ecological energy transfer efficiency',
          'Analyze nitrogen-fixing bacteria in Ethiopian legume agriculture',
          'Evaluate conservation of endemic wildlife (Walia Ibex, Ethiopian Wolf, Gelada)'
        ],
        subsections: [
          { sectionNumber: '5.1', title: 'Ecosystem Energetics & Trophic Pyramids', titleAmharic: 'የኢኮሲስተም ጉልበት ዝውውር', page: 222 },
          { sectionNumber: '5.2', title: 'Biogeochemical Cycles in Ethiopia', titleAmharic: 'ባዮጂኦኬሚካላዊ ዑደቶች', page: 236 },
          { sectionNumber: '5.3', title: 'Population Ecology & Growth Curves', titleAmharic: 'የህዝብ ብዛት እድገት ኩርባዎች', page: 248 },
          { sectionNumber: '5.4', title: 'Conservation of Ethiopian Endemic Biodiversity', titleAmharic: 'የኢትዮጵያ ዝርያዎች ጥበቃ', page: 262 },
        ]
      },
    ]
  },

  // ==========================================
  // GRADE 12 TEXTBOOKS
  // ==========================================
  {
    id: 'moe-g12-phy-2019',
    grade: 'Grade 12',
    subject: 'Physics',
    subjectAmharic: 'ፊዚክስ',
    stream: 'Natural Science',
    edition: 'FDRE Ministry of Education 2019 E.C. Edition',
    totalChapters: 5,
    totalPages: 296,
    coverColor: 'from-purple-700 to-indigo-900',
    pdfPath: '/assets/textbooks/moe_grade_12_physics_2019.pdf',
    drmProtected: true,
    chapters: [
      { chapterNumber: 1, title: 'Thermodynamics and Heat Engines', startPage: 1, endPage: 60 },
      { chapterNumber: 2, title: 'Electromagnetism & Hydroelectric Induction', startPage: 61, endPage: 122 },
      { chapterNumber: 3, title: 'Wave Optics & Interference', startPage: 123, endPage: 180 },
      { chapterNumber: 4, title: 'Quantum Physics and Photoelectric Effect', startPage: 181, endPage: 238 },
      { chapterNumber: 5, title: 'Nuclear Physics and Environmental Radiation', startPage: 239, endPage: 296 },
    ],
    tableOfContents: [
      {
        chapterNumber: 1,
        title: 'Thermodynamics and Heat Engines',
        titleAmharic: 'ቴርሞዳይናሚክስና የሙቀት ሞተሮች',
        startPage: 1,
        endPage: 60,
        summary: 'Laws of thermodynamics, PV diagrams, isobaric/isochoric/isothermal/adiabatic processes, Carnot cycle efficiency, and refrigerator heat pumps.',
        keyCompetencies: [
          'Apply the First Law (ΔU = Q - W) to thermodynamic closed cycles',
          'Calculate Carnot engine maximum theoretical efficiency η = 1 - (Tc / Th)',
          'Analyze heat dissipation in electrical injera mitad ovens'
        ],
        subsections: [
          { sectionNumber: '1.1', title: 'The First Law of Thermodynamics', titleAmharic: 'የቴርሞዳይናሚክስ የመጀመሪያ ህግ', page: 2 },
          { sectionNumber: '1.2', title: 'Thermodynamic Processes & PV Diagrams', titleAmharic: 'ቴርሞዳይናሚክ ሂደቶችና የ PV ግራፍ', page: 16 },
          { sectionNumber: '1.3', title: 'The Second Law and Carnot Heat Engines', titleAmharic: 'ሁለተኛው ህግና የካርኖት ሞተር', page: 32 },
          { sectionNumber: '1.4', title: 'Entropy & Reversible/Irreversible States', titleAmharic: 'ኢንትሮፒና የተፈጥሮ ሂደቶች', page: 46 },
        ]
      },
      {
        chapterNumber: 2,
        title: 'Electromagnetism & Hydroelectric Induction',
        titleAmharic: 'ኤሌክትሮማግኔቲዝም እና የውሃ ኃይል ማመንጨት',
        startPage: 61,
        endPage: 122,
        summary: 'Faraday’s law of induction, Lenz’s law, mutual and self-inductance, transformers, and turbine generators at GERD.',
        keyCompetencies: [
          'Calculate induced EMF using Faraday equation ε = -N(dΦ/dt)',
          'Explain Lenz’s direction of induced eddy currents',
          'Model step-up transformer voltage conversions for national grid lines'
        ],
        subsections: [
          { sectionNumber: '2.1', title: 'Magnetic Flux & Faraday Induction', titleAmharic: 'የማግኔቲክ ፍሰትና የፋራዴይ ኢንደክሽን', page: 62 },
          { sectionNumber: '2.2', title: 'Lenz’s Law & Direction of Induced Current', titleAmharic: 'የሌንዝ ህግና የጅረት አቅጣጫ', page: 78 },
          { sectionNumber: '2.3', title: 'Inductance & Magnetic Energy Storage', titleAmharic: 'ኢንደክታንስና የተከማቸ ማግኔቲክ ጉልበት', page: 94 },
          { sectionNumber: '2.4', title: 'AC Generators & National Power Transmission', titleAmharic: 'ጄነሬተሮችና የኤሌክትሪክ ስርጭት', page: 108 },
        ]
      },
      {
        chapterNumber: 3,
        title: 'Wave Optics & Interference',
        titleAmharic: 'የሞገድ ኦፕቲክስ እና ጣልቃ-ገብነት',
        startPage: 123,
        endPage: 180,
        summary: 'Huygens’ principle, Young’s double-slit interference, thin-film interference, diffraction gratings, and polarization of light.',
        keyCompetencies: [
          'Calculate fringe separation in Young’s double slit setup',
          'Determine wavelength using diffraction grating spectrometer',
          'Explain polarization and Brewster’s angle'
        ],
        subsections: [
          { sectionNumber: '3.1', title: 'Wave Nature of Light & Huygens’ Principle', titleAmharic: 'የብርሃን ሞገዳዊ ባህሪ', page: 124 },
          { sectionNumber: '3.2', title: 'Young’s Double-Slit Experiment', titleAmharic: 'የያንግ ድርብ-ክፍተት ሙከራ', page: 138 },
          { sectionNumber: '3.3', title: 'Diffraction Gratings & Resolving Power', titleAmharic: 'የዲፍራክሽን ግሪቲንግ', page: 154 },
          { sectionNumber: '3.4', title: 'Polarization & Malus’s Law', titleAmharic: 'ፖላራይዜሽንና የማሉስ ህግ', page: 168 },
        ]
      },
      {
        chapterNumber: 4,
        title: 'Quantum Physics and Photoelectric Effect',
        titleAmharic: 'ኳንተም ፊዚክስና ፎቶኤሌክትሪክ ውጤት',
        startPage: 181,
        endPage: 238,
        summary: 'Blackbody radiation, Planck’s quantum hypothesis, Einstein’s photoelectric equation, de Broglie matter waves, and Heisenberg uncertainty.',
        keyCompetencies: [
          'Calculate cutoff frequency and work function using E = hf - Φ',
          'Compute de Broglie wavelength for electrons and macroscopic bodies',
          'State Heisenberg uncertainty relation Δx · Δp ≥ h / (4π)'
        ],
        subsections: [
          { sectionNumber: '4.1', title: 'Blackbody Radiation & Planck’s Constant', titleAmharic: 'የጥቁር አካል ጨረርና የፕላንክ ቋሚ', page: 182 },
          { sectionNumber: '4.2', title: 'Einstein’s Photoelectric Effect', titleAmharic: 'የአንስታይን የፎቶኤሌክትሪክ ውጤት', page: 196 },
          { sectionNumber: '4.3', title: 'de Broglie Wavelength & Matter Waves', titleAmharic: 'የዴ ብሮይሊ የቁስ ሞገድ', page: 212 },
          { sectionNumber: '4.4', title: 'Heisenberg Uncertainty Principle', titleAmharic: 'የሃይዘንበርግ እርግጠኝነት ማጣት መርህ', page: 226 },
        ]
      },
      {
        chapterNumber: 5,
        title: 'Nuclear Physics and Environmental Radiation',
        titleAmharic: 'ኒውክሌር ፊዚክስና አካባቢያዊ ጨረር',
        startPage: 239,
        endPage: 296,
        summary: 'Nuclear constituents, binding energy per nucleon, radioactive decay laws, half-life, nuclear fission and fusion, and radiation safety.',
        keyCompetencies: [
          'Calculate nuclear mass defect and binding energy using E = mc²',
          'Solve half-life decay problems N(t) = N₀ · e^(-λt)',
          'Distinguish alpha, beta, and gamma radiation shielding'
        ],
        subsections: [
          { sectionNumber: '5.1', title: 'Nuclear Composition & Binding Energy', titleAmharic: 'የኒውክሊየስ ውህደትና አጣባቂ ጉልበት', page: 240 },
          { sectionNumber: '5.2', title: 'Radioactive Decay Laws & Half-Life', titleAmharic: 'የጨረራ መበስበስ ህጎች', page: 254 },
          { sectionNumber: '5.3', title: 'Nuclear Fission & Fusion Reactions', titleAmharic: 'የኒውክሌር መከፋፈልና ውህደት', page: 270 },
          { sectionNumber: '5.4', title: 'Medical Radiation & Environmental Safety', titleAmharic: 'የህክምና ጨረርና የአካባቢ ደህንነት', page: 284 },
        ]
      },
    ]
  },

  // ==========================================
  // GRADE 10 TEXTBOOKS
  // ==========================================
  {
    id: 'moe-g10-phy-2019',
    grade: 'Grade 10',
    subject: 'Physics',
    subjectAmharic: 'ፊዚክስ',
    stream: 'Common',
    edition: 'FDRE Ministry of Education 2019 E.C. Edition',
    totalChapters: 5,
    totalPages: 240,
    coverColor: 'from-sky-600 to-blue-800',
    pdfPath: '/assets/textbooks/moe_grade_10_physics_2019.pdf',
    drmProtected: true,
    chapters: [
      { chapterNumber: 1, title: 'Motion in Two Dimensions', startPage: 1, endPage: 48 },
      { chapterNumber: 2, title: 'Work, Energy, and Power', startPage: 49, endPage: 96 },
      { chapterNumber: 3, title: 'Simple Machines in Ethiopian Agriculture', startPage: 97, endPage: 144 },
      { chapterNumber: 4, title: 'Properties of Bulk Matter and Fluids', startPage: 145, endPage: 192 },
      { chapterNumber: 5, title: 'Heat and Temperature Measurement', startPage: 193, endPage: 240 },
    ],
    tableOfContents: [
      {
        chapterNumber: 1,
        title: 'Motion in Two Dimensions',
        titleAmharic: 'እንቅስቃሴ በሁለት አቅጣጫ',
        startPage: 1,
        endPage: 48,
        summary: 'Vectors in 2D, adding vectors graphically and analytically, projectile motion introduction, and uniform circular motion.',
        keyCompetencies: ['Resolve vectors into horizontal and vertical components', 'Calculate centripetal acceleration ac = v²/r'],
        subsections: [
          { sectionNumber: '1.1', title: 'Vectors and Scalars in 2D', titleAmharic: 'ቬክተሮችና ስካላሮች', page: 2 },
          { sectionNumber: '1.2', title: 'Horizontal Projectiles', titleAmharic: 'አግድም የውርወራ እንቅስቃሴ', page: 18 },
          { sectionNumber: '1.3', title: 'Uniform Circular Motion', titleAmharic: 'ወጥ ክብ እንቅስቃሴ', page: 34 },
        ]
      },
      {
        chapterNumber: 2,
        title: 'Work, Energy, and Power',
        titleAmharic: 'ስራ ፣ ጉልበት እና ኃይል',
        startPage: 49,
        endPage: 96,
        summary: 'Work done by constant force, kinetic and gravitational potential energy, conservation of mechanical energy, and power metrics.',
        keyCompetencies: ['Compute work W = F · d cos θ', 'Apply mechanical energy conservation to roller-coasters and pendulums'],
        subsections: [
          { sectionNumber: '2.1', title: 'Work Done by a Constant Force', titleAmharic: 'በቋሚ ኃይል የሚሰራ ስራ', page: 50 },
          { sectionNumber: '2.2', title: 'Kinetic & Potential Energy', titleAmharic: 'የእንቅስቃሴና የቁመት ጉልበት', page: 66 },
          { sectionNumber: '2.3', title: 'Conservation of Mechanical Energy', titleAmharic: 'የሜካኒካል ጉልበት ህልውና', page: 80 },
        ]
      },
      {
        chapterNumber: 3,
        title: 'Simple Machines in Ethiopian Agriculture',
        titleAmharic: 'ቀላል ማሽኖች በኢትዮጵያ ግብርና',
        startPage: 97,
        endPage: 144,
        summary: 'Levers, pulleys, inclined planes, traditional maresha plow mechanical advantage, velocity ratio, and machine efficiency.',
        keyCompetencies: ['Calculate Mechanical Advantage (MA) and Velocity Ratio (VR)', 'Evaluate efficiency of traditional Ethiopian farming implements'],
        subsections: [
          { sectionNumber: '3.1', title: 'Types of Simple Machines & Levers', titleAmharic: 'የቀላል ማሽኖች አይነቶችና ዘንጎች', page: 98 },
          { sectionNumber: '3.2', title: 'Pulley Systems & Inclined Planes', titleAmharic: 'የመንኮራኩር ስርአቶችና ዘንበል ያሉ ጠለሎች', page: 114 },
          { sectionNumber: '3.3', title: 'Efficiency of Traditional Ethiopian Maresha', titleAmharic: 'የባህላዊ ማረሻ ማሽን ቅልጥፍና', page: 130 },
        ]
      },
      {
        chapterNumber: 4,
        title: 'Properties of Bulk Matter and Fluids',
        titleAmharic: 'የፈሳሾችና የጠጣር ቁሶች ባህሪያት',
        startPage: 145,
        endPage: 192,
        summary: 'Density, hydrostatic pressure, Pascal’s principle, Archimedes’ buoyancy principle, and Bernoulli’s equation overview.',
        keyCompetencies: ['Calculate hydrostatic pressure P = ρgh', 'Determine buoyant force and floating conditions for ships and balloons'],
        subsections: [
          { sectionNumber: '4.1', title: 'Density and Fluid Pressure', titleAmharic: 'ጥግግትና የፈሳሽ ግፊት', page: 146 },
          { sectionNumber: '4.2', title: 'Pascal’s Principle & Hydraulic Lifts', titleAmharic: 'የፓስካል መርህና ሃይድሮሊክ ማሽኖች', page: 162 },
          { sectionNumber: '4.3', title: 'Archimedes’ Principle & Buoyancy', titleAmharic: 'የአርኪሜድስ መርህና ተንሳፋፊነት', page: 176 },
        ]
      },
      {
        chapterNumber: 5,
        title: 'Heat and Temperature Measurement',
        titleAmharic: 'ሙቀትና የሙቀት መጠን መለኪያ',
        startPage: 193,
        endPage: 240,
        summary: 'Temperature scales (Celsius, Kelvin, Fahrenheit), linear and volumetric thermal expansion, specific heat capacity, and calorimeters.',
        keyCompetencies: ['Convert between Celsius, Kelvin, and Fahrenheit', 'Solve calorimetry heat exchange equations Q = mcΔT'],
        subsections: [
          { sectionNumber: '5.1', title: 'Temperature Scales & Thermometers', titleAmharic: 'የሙቀት ሚዛኖችና ቴርሞሜትሮች', page: 194 },
          { sectionNumber: '5.2', title: 'Thermal Expansion of Solids & Liquids', titleAmharic: 'የሙቀት መስፋፋት', page: 208 },
          { sectionNumber: '5.3', title: 'Specific Heat Capacity & Calorimetry', titleAmharic: 'የሙቀት ቅበላ አቅምና ካሎሪሜትሪ', page: 224 },
        ]
      },
    ]
  },

  // ==========================================
  // GRADE 9 TEXTBOOKS
  // ==========================================
  {
    id: 'moe-g9-phy-2019',
    grade: 'Grade 9',
    subject: 'Physics',
    subjectAmharic: 'ፊዚክስ',
    stream: 'Common',
    edition: 'FDRE Ministry of Education 2019 E.C. Edition',
    totalChapters: 5,
    totalPages: 220,
    coverColor: 'from-emerald-700 to-teal-900',
    pdfPath: '/assets/textbooks/moe_grade_9_physics_2019.pdf',
    drmProtected: true,
    chapters: [
      { chapterNumber: 1, title: 'Physics and Human Society', startPage: 1, endPage: 38 },
      { chapterNumber: 2, title: 'Physical Quantities and SI Units', startPage: 39, endPage: 80 },
      { chapterNumber: 3, title: 'Motion in a Straight Line', startPage: 81, endPage: 126 },
      { chapterNumber: 4, title: 'Force and Newton’s Laws', startPage: 127, endPage: 174 },
      { chapterNumber: 5, title: 'Energy, Work and Power', startPage: 175, endPage: 220 },
    ],
    tableOfContents: [
      {
        chapterNumber: 1,
        title: 'Physics and Human Society',
        titleAmharic: 'ፊዚክስና የሰው ልጅ ማህበረሰብ',
        startPage: 1,
        endPage: 38,
        summary: 'The scope of physics, relationship with technology, historical contributions, and scientific methodologies.',
        keyCompetencies: ['Explain how physics underpins modern Ethiopian communication, energy, and medical technologies'],
        subsections: [
          { sectionNumber: '1.1', title: 'What is Physics?', titleAmharic: 'ፊዚክስ ምንድን ነው?', page: 2 },
          { sectionNumber: '1.2', title: 'Physics in Technology and Society', titleAmharic: 'ፊዚክስ በቴክኖሎጂና ማህበረሰብ', page: 14 },
          { sectionNumber: '1.3', title: 'The Scientific Method & Laboratory Safety', titleAmharic: 'ሳይንሳዊ ዘዴና የላብራቶሪ ደህንነት', page: 26 },
        ]
      },
      {
        chapterNumber: 2,
        title: 'Physical Quantities and SI Units',
        titleAmharic: 'የፊዚክስ ልኬቶችና የ SI አሃዶች',
        startPage: 39,
        endPage: 80,
        summary: 'Base and derived physical quantities, SI metric prefixes, standard measurement tools, and scientific notation.',
        keyCompetencies: ['Identify the 7 base SI quantities and their units', 'Convert between metric prefixes (micro, milli, kilo, mega)'],
        subsections: [
          { sectionNumber: '2.1', title: 'Base and Derived Physical Quantities', titleAmharic: 'መሰረታዊና ተወላጅ ልኬቶች', page: 40 },
          { sectionNumber: '2.2', title: 'Measurement Tools: Vernier Caliper & Micrometer', titleAmharic: 'የመለኪያ መሣሪያዎች', page: 56 },
          { sectionNumber: '2.3', title: 'Scientific Notation & Significant Figures', titleAmharic: 'ሳይንሳዊ አፃፃፍና ጉልህ አሃዞች', page: 68 },
        ]
      },
      {
        chapterNumber: 3,
        title: 'Motion in a Straight Line',
        titleAmharic: 'ቀጥተኛ እንቅስቃሴ',
        startPage: 81,
        endPage: 126,
        summary: 'Distance, displacement, speed, velocity, uniform acceleration, kinematic equations, and velocity-time graphs.',
        keyCompetencies: ['Differentiate scalar distance from vector displacement', 'Solve motion problems with v = u + at, s = ut + 1/2at²'],
        subsections: [
          { sectionNumber: '3.1', title: 'Position, Distance and Displacement', titleAmharic: 'ቦታ ፣ ርቀት እና ቅያሬ', page: 82 },
          { sectionNumber: '3.2', title: 'Speed and Velocity in Uniform Motion', titleAmharic: 'ስክሪትና ፍጥነት', page: 96 },
          { sectionNumber: '3.3', title: 'Uniform Acceleration & Kinematics Equations', titleAmharic: 'ወጥ ፍጥንጥነትና ቀመሮች', page: 110 },
        ]
      },
      {
        chapterNumber: 4,
        title: 'Force and Newton’s Laws',
        titleAmharic: 'ጉልበትና የኒውተን ህጎች',
        startPage: 127,
        endPage: 174,
        summary: 'Types of forces (contact and non-contact), Newton’s 1st, 2nd, and 3rd laws, mass vs weight, and friction forces.',
        keyCompetencies: ['State and apply Newton’s second law F_net = ma', 'Distinguish between static and kinetic friction'],
        subsections: [
          { sectionNumber: '4.1', title: 'The Concept of Force', titleAmharic: 'የጉልበት ፅንሰ-ሀሳብ', page: 128 },
          { sectionNumber: '4.2', title: 'Newton’s First & Second Laws of Motion', titleAmharic: 'የኒውተን 1ኛ እና 2ኛ ህጎች', page: 142 },
          { sectionNumber: '4.3', title: 'Newton’s Third Law & Friction Forces', titleAmharic: 'የኒውተን 3ኛ ህግና ፍትጊያ', page: 158 },
        ]
      },
      {
        chapterNumber: 5,
        title: 'Energy, Work and Power',
        titleAmharic: 'ጉልበት ፣ ስራ እና ኃይል',
        startPage: 175,
        endPage: 220,
        summary: 'Forms of energy (kinetic, potential, thermal), energy conservation, renewable energy sources in Ethiopia, and power calculation.',
        keyCompetencies: ['Identify renewable energy sources in Ethiopia (hydro, wind, solar, geothermal)', 'Calculate power P = W / t in Watts'],
        subsections: [
          { sectionNumber: '5.1', title: 'Forms and Transformations of Energy', titleAmharic: 'የጉልበት አይነቶችና ሽግግር', page: 176 },
          { sectionNumber: '5.2', title: 'Work and Power Calculations', titleAmharic: 'የስራና ኃይል ስሌቶች', page: 192 },
          { sectionNumber: '5.3', title: 'Renewable Energy Resources in Ethiopia', titleAmharic: 'ታዳሽ የኃይል ምንጮች በኢትዮጵያ', page: 206 },
        ]
      },
    ]
  },
];

/**
 * Helper to get a textbook by grade and subject
 */
export const getTextbook = (grade: string, subject: string): MoETextbookItem | undefined => {
  return OFFICIAL_TEXTBOOKS_REGISTRY.find(
    (b) => b.grade === grade && b.subject.toLowerCase() === subject.toLowerCase()
  );
};

/**
 * Helper to get all textbooks available for a grade
 */
export const getTextbooksForGrade = (grade: string): MoETextbookItem[] => {
  return OFFICIAL_TEXTBOOKS_REGISTRY.filter((b) => b.grade === grade);
};
