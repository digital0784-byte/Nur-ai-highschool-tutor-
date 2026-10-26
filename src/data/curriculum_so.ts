/**
 * Ethiopian Curriculum Dataset - Somali (Af-Soomaali)
 * FDRE Ministry of Education 2019 E.C.
 */

import { CurriculumSubjectDef } from './curriculum_am';

export const CURRICULUM_SO: Record<string, CurriculumSubjectDef[]> = {
  'Grade 9': [
    {
      name: 'Fiisigiska (Physics)',
      code: 'PHY9',
      units: [
        {
          unitNumber: 1,
          title: 'Fiisigiska iyo Bulshada Aadanaha',
          topics: ['Waa Maxay Fiisigis?', 'Halbeegyada Cabirka SI', 'Khaladaadka Cabirka'],
          competencies: ['Aqoonsiga halbeegyada cabirka aasaasiga ah', 'Diiwaangelinta cabirrada saxda ah']
        }
      ]
    }
  ],
  'Grade 10': [
    {
      name: 'Fiisigiska (Physics)',
      code: 'PHY10',
      units: [
        {
          unitNumber: 1,
          title: 'Dhaqdhaqaaqa Laba Jiho (Motion in 2D)',
          topics: ['Fektarrada', 'Tuurista Baalka (Projectile Motion)', 'Dhaqdhaqaaqa Wareegga'],
          competencies: ['Xisaabinta wadarta fektarrada', 'Go\'aaminta masaafada iyo dhererka tuurista']
        }
      ]
    }
  ],
  'Grade 11': [
    {
      name: 'Fiisigiska (Physics)',
      code: 'PHY11',
      units: [
        {
          unitNumber: 1,
          title: 'Cabirka iyo Shaqada Dhabta ah',
          topics: ['Falanqaynta Khaladaadka', 'Fektarrada 3D', 'Falanqaynta Cabbirrada'],
          competencies: ['Xaqiijinta isku ekaanshaha cabbirka', 'Isku xirka fektarrada adag']
        },
        {
          unitNumber: 2,
          title: 'Dhaqdhaqaaqa Laba Jiho (Two-Dimensional Motion)',
          topics: ['Xisaabaadka Dhaqdhaqaaqa Tuurista', 'Iska caabinta Hawada', 'Xawaaraha Isbarbardhigga'],
          competencies: ['Qeexida dhaqdhaqaaqa tuurista ee dhulka Itoobiya', 'Xallinta su\'aalaha imtixaanka ESSLCE']
        }
      ]
    },
    {
      name: 'Kimistariga (Chemistry)',
      code: 'CHEM11',
      units: [
        {
          unitNumber: 1,
          title: 'Qaab-dhismeedka Atamka iyo Miiska Xilliyada',
          topics: ['Qaabka Bohr', 'Tirada Kwantamka', 'Isku dubaridka Elektaroonada'],
          competencies: ['Qorista qaabka elektaroonada', 'Isbarbardhigga sifooyinka xilliyada']
        }
      ]
    }
  ],
  'Grade 12': [
    {
      name: 'Fiisigiska (Physics)',
      code: 'PHY12',
      units: [
        {
          unitNumber: 1,
          title: 'Tarmodinamikada (Thermodynamics)',
          topics: ['Xeerarka Kulaylka', 'Entroobiga', 'Mashiinnada Kulaylka'],
          competencies: ['Xisaabinta waxtarka mashiinka', 'Fahamka wareejinta kulaylka']
        }
      ]
    }
  ]
};
