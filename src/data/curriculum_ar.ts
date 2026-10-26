/**
 * Ethiopian Curriculum Dataset - Arabic (العربية)
 * FDRE Ministry of Education 2019 E.C.
 */

import { CurriculumSubjectDef } from './curriculum_am';

export const CURRICULUM_AR: Record<string, CurriculumSubjectDef[]> = {
  'Grade 9': [
    {
      name: 'الفيزياء (Physics)',
      code: 'PHY9',
      units: [
        {
          unitNumber: 1,
          title: 'الفيزياء والمجتمع البشري',
          topics: ['ما هي الفيزياء؟', 'الوحدات الأساسية SI', 'أخطاء القياس والدقة'],
          competencies: ['تحديد وحدات القياس الأساسية', 'تسجيل القياسات بدقة علمية']
        }
      ]
    }
  ],
  'Grade 10': [
    {
      name: 'الفيزياء (Physics)',
      code: 'PHY10',
      units: [
        {
          unitNumber: 1,
          title: 'الحركة في بعدين (Motion in 2D)',
          topics: ['المتجهات', 'حركة المقذوفات', 'الحركة الدائرية المنتظمة'],
          competencies: ['حساب محصلة المتجهات', 'تحديد زمن التحليق والمدى الأفقي']
        }
      ]
    }
  ],
  'Grade 11': [
    {
      name: 'الفيزياء (Physics)',
      code: 'PHY11',
      units: [
        {
          unitNumber: 1,
          title: 'القياس والعمل العملي',
          topics: ['تحليل الأخطاء', 'المتجهات ثلاثية الأبعاد', 'التحليل البعدي'],
          competencies: ['التحقق من التجانس البعدي للمعدلات', 'تركيب المتجهات المعقدة']
        },
        {
          unitNumber: 2,
          title: 'الحركة في بعدين (Two-Dimensional Motion)',
          topics: ['معادلات حركة المقذوفات', 'مقاومة الهواء', 'السرعة النسبية'],
          competencies: ['نمذجة حركة المقذوفات في التضاريس الإثيوبية', 'حل أسئلة امتحان القبول الجامعي ESSLCE']
        }
      ]
    },
    {
      name: 'الكيمياء (Chemistry)',
      code: 'CHEM11',
      units: [
        {
          unitNumber: 1,
          title: 'التركيب الذري والجدول الدوري',
          topics: ['نموذج بور', 'أعداد الكم', 'التوزيع الإلكتروني'],
          competencies: ['كتابة التوزيع الإلكتروني للعناصر الانتقالية', 'مقارنة الخصائص الدورية']
        }
      ]
    }
  ],
  'Grade 12': [
    {
      name: 'الفيزياء (Physics)',
      code: 'PHY12',
      units: [
        {
          unitNumber: 1,
          title: 'الديناميكا الحرارية (Thermodynamics)',
          topics: ['قوانين الديناميكا الحرارية', 'الإنتروبيا', 'المحركات الحرارية ودورة كارنو'],
          competencies: ['حساب الكفاءة الحرارية للمحركات', 'فهم انتقال الحرارة في التطبيقات المحلية']
        }
      ]
    }
  ]
};
