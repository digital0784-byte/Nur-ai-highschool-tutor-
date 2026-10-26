/**
 * Ethiopian Curriculum Dataset - Amharic (አማርኛ)
 * FDRE Ministry of Education 2019 E.C.
 */

export interface CurriculumSubjectDef {
  name: string;
  code: string;
  units: {
    unitNumber: number;
    title: string;
    topics: string[];
    competencies: string[];
  }[];
}

export const CURRICULUM_AM: Record<string, CurriculumSubjectDef[]> = {
  'Grade 9': [
    {
      name: 'ፊዚክስ (Physics)',
      code: 'PHY9',
      units: [
        {
          unitNumber: 1,
          title: 'የፊዚክስና የሰው ልጅ ማህበረሰብ ግንኙነት',
          topics: ['ፊዚክስ ምንድን ነው?', 'የመለኪያ አሃዶችና SI Units', 'የሙከራ ስህተቶችና ትክክለኛነት'],
          competencies: ['መሰረታዊ የመለኪያ አሃዶችን መለየት', 'ልኬቶችን በትክክል መመዝገብ']
        },
        {
          unitNumber: 2,
          title: 'እንቅስቃሴ በአንድ መስመር (One-Dimensional Motion)',
          topics: ['ፍጥነትና ስክሪት (Speed & Velocity)', 'ፍጥንጥነት (Acceleration)', 'የቀጥታ እንቅስቃሴ ቀመሮች'],
          competencies: ['የእንቅስቃሴ ቀመሮችን በመጠቀም ስሌት መስራት', 'የፍጥነት-ጊዜ ግራፎችን መተንተን']
        }
      ]
    },
    {
      name: 'ሒሳብ (Mathematics)',
      code: 'MATH9',
      units: [
        {
          unitNumber: 1,
          title: 'የቁጥር ስርአት (Number Systems)',
          topics: ['ተጨባጭ ቁጥሮች (Real Numbers)', 'ራዲካሎችና ኤክስፖነንቶች', 'ሳይንሳዊ አፃፃፍ'],
          competencies: ['የተጨባጭ ቁጥሮችን ባህሪያት መረዳት', 'ቀመሮችን ማቃለል']
        }
      ]
    }
  ],
  'Grade 10': [
    {
      name: 'ፊዚክስ (Physics)',
      code: 'PHY10',
      units: [
        {
          unitNumber: 1,
          title: 'እንቅስቃሴ በሁለት አቅጣጫ (Motion in 2D)',
          topics: ['ቬክተሮች', 'የውርወራ እንቅስቃሴ (Projectile Motion)', 'ክብ እንቅስቃሴ'],
          competencies: ['የቬክተር ድምርን ማስላት', 'የውርወራ ርቀትንና ከፍታን መወሰን']
        }
      ]
    }
  ],
  'Grade 11': [
    {
      name: 'ፊዚክስ (Physics)',
      code: 'PHY11',
      units: [
        {
          unitNumber: 1,
          title: 'ልኬትና የተግባራዊ ስራዎች (Measurement & Practical Work)',
          topics: ['የስህተት ትንተና', 'ቬክተሮች በ3D', 'ልኬታዊ ትንታኔ'],
          competencies: ['ልኬታዊ ተመሳሳይነትን ማረጋገጥ', 'ውስብስብ ቬክተሮችን ማቀናጀት']
        },
        {
          unitNumber: 2,
          title: 'እንቅስቃሴ በሁለት አቅጣጫ (Two-Dimensional Motion)',
          topics: ['የውርወራ እንቅስቃሴ ቀመሮች', 'አየር መቋቋም', 'ተዛማጅ ፍጥነት'],
          competencies: ['የገና ኳስ ውርወራ ሞዴል መገንባት', 'የ ESSLE ፈተና ጥያቄዎችን በብቃት መፍታት']
        },
        {
          unitNumber: 3,
          title: 'የኒውተን ህጎችና ጉልበት (Newtonian Mechanics)',
          topics: ['የኒውተን ሶስቱ ህጎች', 'የግጭት ጉልበት (Friction)', 'የክብ እንቅስቃሴ ጉልበት'],
          competencies: ['የነፃ አካል ዲያግራም መስራት', 'የመኪና ፍሬን ርቀትን ማስላት']
        }
      ]
    },
    {
      name: 'ኬሚስትሪ (Chemistry)',
      code: 'CHEM11',
      units: [
        {
          unitNumber: 1,
          title: 'የአተም አወቃቀርና ፔሪዮዲክ ሰንጠረዥ (Atomic Structure)',
          topics: ['የቦህር ሞዴል', 'ኳንተም ቁጥሮች', 'ኤሌክትሮን አቀማመጥ'],
          competencies: ['የኦርቢታል አቀማመጥን መፃፍ', 'የፔሪዮዲክ ባህሪያትን ማወዳደር']
        },
        {
          unitNumber: 2,
          title: 'የኬሚካል ትስስር (Chemical Bonding)',
          topics: ['አዮኒክና ኮቫለንት ትስስር', 'VSEPR ጂኦሜትሪ', 'ሞለኪውላር ፖላሪቲ'],
          competencies: ['የሞለኪውል ቅርፅን መተንበይ', 'የሃይድሮጅን ትስስርን ማብራራት']
        }
      ]
    },
    {
      name: 'ባዮሎጂ (Biology)',
      code: 'BIO11',
      units: [
        {
          unitNumber: 1,
          title: 'ባዮሞለኪውሎችና ሴል (Biomolecules & The Cell)',
          topics: ['ካርቦሃይድሬትና ፕሮቲኖች', 'ኢንዛይሞች', 'የሴል ሽፋን ትራንስፖርት'],
          competencies: ['የኢንዛይም እንቅስቃሴን መተንተን', 'ኦስሞሲስን በላብራቶሪ መመርመር']
        }
      ]
    }
  ],
  'Grade 12': [
    {
      name: 'ፊዚክስ (Physics)',
      code: 'PHY12',
      units: [
        {
          unitNumber: 1,
          title: 'ቴርሞዳይናሚክስ (Thermodynamics)',
          topics: ['የሙቀት ህጎች', 'ኢንትሮፒ', 'የሙቀት ሞተሮችና ካርኖት ዑደት'],
          competencies: ['የሞተር ቅልጥፍናን ማስላት', 'የእንጀራ ምጣድ ሙቀት ሽግግርን መተንተን']
        },
        {
          unitNumber: 2,
          title: 'ኤሌክትሮማግኔቲዝም (Electromagnetism)',
          topics: ['የኤሌክትሪክ መስክ', 'የማግኔቲክ ፍሰት', 'የፋራዴይ ህግና የህዳሴ ግድብ ጄነሬተሮች'],
          competencies: ['የኢንደክሽን ቮልቴጅን ማስላት', 'የኤሌክትሪክ ኃይል ማመንጨትን መረዳት']
        }
      ]
    }
  ]
};
