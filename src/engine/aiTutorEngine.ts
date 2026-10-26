/**
 * Socratic AI Tutor Prompt Engineering & Context Synthesizer
 * Grounded in FDRE Ministry of Education New Secondary Curriculum
 */

import { MoETextbookExcerpt } from '../data/curriculumData';

export interface SocraticTutorRequest {
  message: string;
  grade: string;
  subject: string;
  mode: 'BEGINNER' | 'GUIDED' | 'PRACTICE' | 'MASTERY';
  language: string;
  contextExcerpt?: MoETextbookExcerpt | null;
  conversationHistory?: { role: 'user' | 'assistant'; content: string }[];
}

export const buildSocraticPrompt = (req: SocraticTutorRequest) => {
  const citationContext = req.contextExcerpt
    ? `\n[VERIFIED FDRE MOE TEXTBOOK EXCERPT]
- Grade: ${req.contextExcerpt.grade}
- Subject: ${req.contextExcerpt.subject}
- Unit: ${req.contextExcerpt.unit}
- Topic: ${req.contextExcerpt.topic}
- Page Reference: ${req.contextExcerpt.page}
- Official Summary: ${req.contextExcerpt.summary}
- Governing Formulas: ${req.contextExcerpt.keyFormulasOrTerms.join(', ')}
- Ethiopian Real-World Analogy: ${req.contextExcerpt.ethiopianAnalogy}`
    : '\n[GENERAL FDRE MOE 2019 E.C. SPECIFICATION ACTIVE]';

  return {
    ...req,
    contextExcerpts: citationContext,
  };
};

export const formatMoECitation = (
  grade: string,
  subject: string,
  unit: string,
  topic: string,
  page: string
): string => {
  return `[FDRE MoE Citation: ${grade} ${subject} | ${unit} | ${topic} | ${page}]`;
};
