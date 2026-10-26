/**
 * Semantic Knowledge Search & Smart Topic Suggestions
 * Indexes FDRE MoE Textbook Excerpts, Formulas, and Units
 */

import { MOE_EXCERPTS, MoETextbookExcerpt } from '../data/curriculumData';

export interface SearchResultItem {
  id: string;
  title: string;
  snippet: string;
  grade: string;
  subject: string;
  unit: string;
  page: string;
  type: 'concept' | 'formula' | 'exam_question';
  score: number;
}

export const searchCurriculumKnowledge = (
  query: string,
  targetGrade?: string,
  targetSubject?: string
): SearchResultItem[] => {
  if (!query || query.trim().length === 0) return [];

  const lower = query.toLowerCase().trim();
  const tokens = lower.split(/\s+/).filter(Boolean);

  const results: SearchResultItem[] = [];

  MOE_EXCERPTS.forEach((item) => {
    if (targetGrade && item.grade !== targetGrade) return;
    if (targetSubject && item.subject.toLowerCase() !== targetSubject.toLowerCase()) return;

    let score = 0;
    const searchable = `${item.topic} ${item.unit} ${item.summary} ${item.keyFormulasOrTerms.join(' ')} ${item.ethiopianAnalogy}`.toLowerCase();

    tokens.forEach((t) => {
      if (searchable.includes(t)) {
        score += 10;
        if (item.topic.toLowerCase().includes(t)) score += 20;
        if (item.keyFormulasOrTerms.some((f) => f.toLowerCase().includes(t))) score += 15;
      }
    });

    if (score > 0) {
      results.push({
        id: item.id,
        title: item.topic,
        snippet: item.summary.slice(0, 140) + '...',
        grade: item.grade,
        subject: item.subject,
        unit: item.unit,
        page: item.page,
        type: 'concept',
        score,
      });
    }
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 8);
};
