/**
 * Ethiopian Curriculum Dataset - Afaan Oromoo
 * FDRE Ministry of Education 2019 E.C.
 */

import { CurriculumSubjectDef } from './curriculum_am';

export const CURRICULUM_OM: Record<string, CurriculumSubjectDef[]> = {
  'Grade 9': [
    {
      name: 'Fiiziksii (Physics)',
      code: 'PHY9',
      units: [
        {
          unitNumber: 1,
          title: 'Fiiziksii fi Hawaasa Namaa',
          topics: ['Fiiziksiin Maali?', 'Safartuuwwan Bu\'uuraa SI', 'Dogoggora Safartuu'],
          competencies: ['Safartuuwwan bu\'uuraa adda baasuu', 'Qajeelfama safartuu hordofuu']
        }
      ]
    }
  ],
  'Grade 10': [
    {
      name: 'Fiiziksii (Physics)',
      code: 'PHY10',
      units: [
        {
          unitNumber: 1,
          title: 'Sochii Kallattii Lamaa (Motion in 2D)',
          topics: ['Veektaroota', 'Darbiinsa (Projectile Motion)', 'Sochii Geengoo'],
          competencies: ['Ida\'ama veektaraa herreguu', 'Fageenya darbiinsaa murteessuu']
        }
      ]
    }
  ],
  'Grade 11': [
    {
      name: 'Fiiziksii (Physics)',
      code: 'PHY11',
      units: [
        {
          unitNumber: 1,
          title: 'Safartuu fi Hojii Qabatamaa',
          topics: ['Xiinxala Dogoggoraa', 'Veektaroota 3D', 'Xiinxala Hanga Qabiyyee'],
          competencies: ['Walsimannaa hanga qabiyyee mirkaneessuu', 'Veektaroota walxaxaa qindeessuu']
        },
        {
          unitNumber: 2,
          title: 'Sochii Kallattii Lamaa (Two-Dimensional Motion)',
          topics: ['Hojii Darbiinsaa', 'Dhiibbaa Qilleensaa', 'Saffisa Walbiraa'],
          competencies: ['Dhiibbaa darbiinsaa adda baasuu', 'Gaaffilee qormaata biyyoolessaa ESSLCE deebisuu']
        }
      ]
    },
    {
      name: 'Keemistirii (Chemistry)',
      code: 'CHEM11',
      units: [
        {
          unitNumber: 1,
          title: 'Caasaa Atoomii fi Gabatee Piriyeodiki',
          topics: ['Moodeelii Boor', 'Lakkoofsota Kawaantamii', 'Qindaa\'ina Elektiroonii'],
          competencies: ['Qindaa\'ina elektiroonii barreessuu', 'Amaloota piriyeodikii walbira qabuu']
        }
      ]
    }
  ],
  'Grade 12': [
    {
      name: 'Fiiziksii (Physics)',
      code: 'PHY12',
      units: [
        {
          unitNumber: 1,
          title: 'Teermodaayinaamiksii (Thermodynamics)',
          topics: ['Seerota Hoo\'aa', 'Entirooppii', 'Mootora Hoo\'aa'],
          competencies: ['Gahumsa mootoraa herreguu', 'Daddarbiinsa hoo\'aa hubachuu']
        }
      ]
    }
  ]
};
