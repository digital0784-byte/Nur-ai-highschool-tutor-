/**
 * Client API Caller for Gemini AI Endpoints via Server Proxy
 * Ensures zero secret exposure in browser bundles
 */

export interface ChatRequestPayload {
  message: string;
  grade?: string;
  subject?: string;
  mode?: string;
  language?: string;
  contextExcerpts?: string;
  conversationHistory?: { role: string; content: string }[];
}

export interface SolveRequestPayload {
  problemText: string;
  grade?: string;
  subject?: string;
  language?: string;
  contextExcerpts?: string;
}

export interface SolveImagePayload {
  imageBase64: string;
  mimeType?: string;
  prompt?: string;
  grade?: string;
  subject?: string;
  language?: string;
}

export interface PdfAssistantPayload {
  pageText: string;
  fileName?: string;
  pageNumber?: number;
  action?: 'summarize' | 'explain' | 'quiz' | 'definitions';
  grade?: string;
  subject?: string;
  language?: string;
}

export interface ResearchAnalysisPayload {
  topic: string;
  grade?: string;
  subject?: string;
  language?: string;
  curriculumExcerpts?: string;
  externalContext?: string;
}

export const geminiService = {
  async chatWithTutor(payload: ChatRequestPayload): Promise<string> {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to fetch response (${res.status})`);
    }
    const data = await res.json();
    return data.reply;
  },

  async solveStepByStep(payload: SolveRequestPayload): Promise<string> {
    const res = await fetch('/api/solve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to solve problem (${res.status})`);
    }
    const data = await res.json();
    return data.solution;
  },

  async solveImageQuestion(payload: SolveImagePayload): Promise<string> {
    const res = await fetch('/api/solve-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to analyze image (${res.status})`);
    }
    const data = await res.json();
    return data.solution;
  },

  async processPdfSection(payload: PdfAssistantPayload): Promise<string> {
    const res = await fetch('/api/pdf-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to process PDF (${res.status})`);
    }
    const data = await res.json();
    return data.result;
  },

  async getTwoLayerResearchAnalysis(payload: ResearchAnalysisPayload): Promise<string> {
    const res = await fetch('/api/research-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to generate research analysis (${res.status})`);
    }
    const data = await res.json();
    return data.analysis;
  },

  async generateEsslceQuestion(params: { grade?: string; subject?: string; unit?: string; topic?: string; language?: string }) {
    const res = await fetch('/api/generate-esslce-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to generate question');
    }
    return await res.json();
  },

  async getChapterMasterySuite(payload: {
    grade?: string;
    subject?: string;
    chapterNumber?: number;
    chapterTitle?: string;
    language?: string;
  }): Promise<ChapterSuiteResponse> {
    const res = await fetch('/api/chapter-suite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to generate chapter suite (${res.status})`);
    }
    return await res.json();
  },
};

export interface ChapterSuiteResponse {
  chapterTitle: string;
  grade: string;
  subject: string;
  objectives: string[];
  fullAnalysis: string;
  aiAnalysis: string;
  practiceQuiz: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    citation: string;
  }[];
  entranceExam: {
    id: string;
    year: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    examTrap: string;
  }[];
  homework: {
    title: string;
    dueDate: string;
    instructions: string;
    problems: string[];
    projectTask: string;
    rubric: string;
  };
}
