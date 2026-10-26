/**
 * University Entrance Exam Timer, Marking & Diagnostic Grading Engine
 * Aligned with Educational Assessment and Examinations Service (EAES / ESSLCE)
 */

export interface ExamAnswerRecord {
  questionId: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface ExamDiagnosticReport {
  totalQuestions: number;
  correctCount: number;
  scorePercent: number;
  gradeTier: 'Excellent (ብቁ)' | 'Proficient (አርኪ)' | 'Developing (ማሻሻያ የሚሻ)' | 'At Risk (ልዩ ክትትል)';
  projectedNationalPercentile: number;
  weakTopics: string[];
  strongTopics: string[];
  recommendations: string[];
}

export const evaluateExamSubmission = (
  answers: { questionId: string; selectedIndex: number; correctIndex: number; topic?: string }[]
): ExamDiagnosticReport => {
  const total = answers.length || 1;
  const correct = answers.filter((a) => a.selectedIndex === a.correctIndex).length;
  const scorePercent = Math.round((correct / total) * 100);

  const weakTopics: string[] = [];
  const strongTopics: string[] = [];

  answers.forEach((ans) => {
    if (ans.topic) {
      if (ans.selectedIndex === ans.correctIndex) {
        if (!strongTopics.includes(ans.topic)) strongTopics.push(ans.topic);
      } else {
        if (!weakTopics.includes(ans.topic)) weakTopics.push(ans.topic);
      }
    }
  });

  let gradeTier: ExamDiagnosticReport['gradeTier'] = 'At Risk (ልዩ ክትትል)';
  let projectedNationalPercentile = 45;

  if (scorePercent >= 85) {
    gradeTier = 'Excellent (ብቁ)';
    projectedNationalPercentile = 96;
  } else if (scorePercent >= 70) {
    gradeTier = 'Proficient (አርኪ)';
    projectedNationalPercentile = 82;
  } else if (scorePercent >= 50) {
    gradeTier = 'Developing (ማሻሻያ የሚሻ)';
    projectedNationalPercentile = 63;
  }

  const recommendations: string[] = [];
  if (weakTopics.length > 0) {
    recommendations.push(`Revise foundational formulas for: ${weakTopics.slice(0, 3).join(', ')}`);
    recommendations.push('Review the Mistake Book (ደካማ ጎን ማረሚያ) to practice similar distractor traps.');
  } else {
    recommendations.push('Maintain consistent study streaks and challenge yourself with advanced university-level derivations.');
  }

  return {
    totalQuestions: total,
    correctCount: correct,
    scorePercent,
    gradeTier,
    projectedNationalPercentile,
    weakTopics,
    strongTopics,
    recommendations,
  };
};
