/**
 * Ethiopian Curriculum Tree Navigator & Competency Mapping
 * FDRE Ministry of Education 2019 E.C.
 */

import { getCurriculum } from '../data/curriculumData';
import { EthiopianGrade } from '../types';

export interface CompetencyNode {
  grade: EthiopianGrade;
  subject: string;
  unitNumber: number;
  unitTitle: string;
  topic: string;
  competency: string;
}

export const getCompetencyTree = (grade: EthiopianGrade, language: string = 'am'): CompetencyNode[] => {
  const curriculum = getCurriculum(language);
  const subjects = curriculum[grade] || [];
  const nodes: CompetencyNode[] = [];

  subjects.forEach((subj) => {
    subj.units.forEach((unit) => {
      unit.topics.forEach((topic, idx) => {
        nodes.push({
          grade,
          subject: subj.name,
          unitNumber: unit.unitNumber,
          unitTitle: unit.title,
          topic,
          competency: unit.competencies[idx] || unit.competencies[0] || 'Understand core curriculum concepts',
        });
      });
    });
  });

  return nodes;
};
