/**
 * Ethiopian Curriculum Dataset - Tigrinya (ትግርኛ)
 * FDRE Ministry of Education 2019 E.C.
 */

import { CurriculumSubjectDef } from './curriculum_am';

export const CURRICULUM_TI: Record<string, CurriculumSubjectDef[]> = {
  'Grade 9': [
    {
      name: 'ፊዚክስ (Physics)',
      code: 'PHY9',
      units: [
        {
          unitNumber: 1,
          title: 'ፊዚክስን ማሕበረሰብ ደቂ ሰባትን',
          topics: ['ፊዚክስ እንታይ እዩ?', 'መሰረታውያን ኣሃዱታት SI', 'ስሕተታት መለክዒ'],
          competencies: ['መሰረታዊ ኣሃዱታት መለክዒ ምልላይ', 'መለክዒታት ብትኽክል ምምዝጋብ']
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
          title: 'ምንቅስቓስ ኣብ ክልተ ኣንፈት (Motion in 2D)',
          topics: ['ቬክተራት', 'ምንቅስቓስ ወንጭፍ (Projectile Motion)', 'ክባዊ ምንቅስቓስ'],
          competencies: ['ድምር ቬክተር ምሕሳብ', 'ርሕቐት ወንጭፍ ምውሳን']
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
          title: 'መለክዕን ግብራዊ ስራሓትን',
          topics: ['ትንተና ስሕተት', 'ቬክተራት ኣብ 3D', 'ልከዐታዊ ትንተና'],
          competencies: ['ልከዐታዊ ተመሳሳልነት ምርግጋፅ', 'ተሓላለኽቲ ቬክተራት ምውህሃድ']
        },
        {
          unitNumber: 2,
          title: 'ምንቅስቓስ ኣብ ክልተ ኣንፈት (Two-Dimensional Motion)',
          topics: ['ቀመራት ምንቅስቓስ ወንጭፍ', 'ተጻባእነት ኣየር', 'ተዛማዲ ፍጥነት'],
          competencies: ['ናይ ኳስ ወንጭፍ ሞዴል ምህናፅ', 'ናይ ESSLCE ፈተናታት ብብቕዓት ምፍታሕ']
        }
      ]
    },
    {
      name: 'ኬሚስትሪ (Chemistry)',
      code: 'CHEM11',
      units: [
        {
          unitNumber: 1,
          title: 'ቅርጺ ኣቶምን ፔሪዮዲክ ሰሌዳን',
          topics: ['ሞዴል ቦህር', 'ኳንተም ቁጽርታት', 'ስርዓተ ኤሌክትሮን'],
          competencies: ['ስርዓተ ኤሌክትሮን ምጽሓፍ', 'ባህርያት ፔሪዮዲክ ምውድዳር']
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
          topics: ['ሕግታት ሙቐት', 'ኢንትሮፒ', 'ሞተራት ሙቐት'],
          competencies: ['ብቕዓት ሞተር ምሕሳብ', 'ምስግጋር ሙቐት ምርዳእ']
        }
      ]
    }
  ]
};
