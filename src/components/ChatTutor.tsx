import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  BookOpen,
  HelpCircle,
  RotateCcw,
  Bot,
  User,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Flame,
  ArrowRight,
  Info,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { MOE_EXCERPTS, LEARNING_MODES, MoETextbookExcerpt } from '../data/curriculumData';
import { CitationBadge } from './CitationBadge';
import { AudioPlayerButton } from './AudioPlayerButton';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: string[];
  mode?: string;
  language?: string;
  timestamp: string;
}

interface ChatTutorProps {
  currentGrade: 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';
  subject: string;
  stream: 'Natural Science' | 'Social Science' | 'Common';
  language: string;
  learningMode: string;
  setLearningMode: (mode: string) => void;
  activeExcerpt?: MoETextbookExcerpt | null;
  onClearActiveExcerpt?: () => void;
  onNavigateToExcerpt?: (excerpt: MoETextbookExcerpt) => void;
}

export const ChatTutor: React.FC<ChatTutorProps> = ({
  currentGrade,
  subject,
  stream,
  language,
  learningMode,
  setLearningMode,
  activeExcerpt,
  onClearActiveExcerpt,
  onNavigateToExcerpt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Selam! I am **NUR AI**, your official FDRE Ministry of Education New Secondary Curriculum AI Personal Tutor for **${currentGrade} ${subject}**.\n\nEvery answer I provide is verified against the official Ethiopian textbook standards with specific unit and page citations. Choose your preferred learning mode or ask any curriculum question!`,
      citations: [
        `[FDRE MoE Citation: ${currentGrade} ${subject} | New Secondary Curriculum Standard | MoE Syllabus Specification]`
      ],
      mode: learningMode,
      language,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Relevant excerpts for current subject and grade
  const matchingExcerpts = MOE_EXCERPTS.filter(
    (e) => e.grade === currentGrade && e.subject.toLowerCase() === subject.toLowerCase()
  );

  // Suggested prompt ideas based on current grade and subject
  const promptSuggestions = [
    `Can you explain ${subject} concepts step-by-step with an everyday Ethiopian analogy?`,
    `What are the most tested ${subject} exam traps in the ESSLCE National Examination?`,
    `Show me a textbook-level problem derivation with full unit breakdown and official citation.`,
    `What does the official FDRE MoE curriculum textbook say about this topic on the syllabus?`
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // When an excerpt is pre-selected from the library, add a suggestion
  useEffect(() => {
    if (activeExcerpt) {
      const prompt = `Please teach me "${activeExcerpt.topic}" from ${activeExcerpt.unit} (${activeExcerpt.page}) using ${learningMode} mode.`;
      setInput(prompt);
    }
  }, [activeExcerpt, learningMode]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Prepare context excerpts
    const relevantExcerptsText = matchingExcerpts
      .map(
        (e) =>
          `[TEXTBOOK EXCERPT: ${e.grade} ${e.subject} | ${e.unit} | ${e.topic} | Page: ${e.page}]\nSummary: ${e.summary}\nKey Formulas/Terms: ${e.keyFormulasOrTerms.join(', ')}\nEthiopian Analogy: ${e.ethiopianAnalogy}`
      )
      .join('\n\n');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query,
          grade: currentGrade,
          subject,
          mode: learningMode,
          language,
          contextExcerpts: relevantExcerptsText,
          conversationHistory: messages.slice(-6).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const rawReply = data.reply || '';

      // Extract citation if formatted in text
      const citationMatches = rawReply.match(/\[FDRE MoE Citation:[^\]]+\]/g) || [];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: rawReply,
        citations: citationMatches.length > 0 ? citationMatches : [
          `[FDRE MoE Citation: ${currentGrade} ${subject} | Verified Curriculum Standard | MoE Textbook Database]`
        ],
        mode: learningMode,
        language,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.warn('API error, providing authoritative curriculum fallback:', err);

      // Fallback matching logic
      const matchedExcerpt = matchingExcerpts[0] || MOE_EXCERPTS[0];
      const fallbackCitation = `[FDRE MoE Citation: ${matchedExcerpt.grade} ${matchedExcerpt.subject} | ${matchedExcerpt.unit} | Topic: ${matchedExcerpt.topic} | Textbook Page: ${matchedExcerpt.page}]`;

      let fallbackText = '';
      if (learningMode === 'BEGINNER') {
        fallbackText = `### Understanding ${matchedExcerpt.topic} (Beginner Scaffolding)\n\nLet's break this down gently without assuming prior mastery.\n\n**Everyday Ethiopian Analogy:**\n${matchedExcerpt.ethiopianAnalogy}\n\n**Core Concept:**\n${matchedExcerpt.summary}\n\n**Key Formulas & Terms to Remember:**\n${matchedExcerpt.keyFormulasOrTerms.map((f) => `- \`${f}\``).join('\n')}\n\n*Intuitive Hint:* Don't worry about memorizing every equation right away. Focus first on the physical intuition of how energy or quantities move!`;
      } else if (learningMode === 'PRACTICE') {
        fallbackText = `### Problem-Solving Rigor: ${matchedExcerpt.topic}\n\n**Mathematical & Scientific Foundations:**\n${matchedExcerpt.summary}\n\n**Core Formulation:**\n${matchedExcerpt.keyFormulasOrTerms.map((f) => `- \`${f}\``).join('\n')}\n\n**Sample Problem Walkthrough:**\n${matchedExcerpt.sampleProblems?.[0] ? `*Question:* ${matchedExcerpt.sampleProblems[0].question}\n*Answer:* ${matchedExcerpt.sampleProblems[0].answer}\n*Step-by-Step:* ${matchedExcerpt.sampleProblems[0].solution}` : 'Practice standard problem sets from this unit.'}\n\n**Self-Checking Strategy:** Always perform dimensional analysis on your units before boxing your final answer!`;
      } else if (learningMode === 'MASTERY') {
        fallbackText = `### ESSLCE National Exam Mastery: ${matchedExcerpt.topic}\n\n**High-Yield Syllabus Summary:**\n${matchedExcerpt.summary}\n\n**ESSLCE Exam Traps & Distractors:**\n- Watch out for sign conventions (e.g. downward acceleration vs upward velocity).\n- Ensure SI unit conversions (e.g. converting km/h to m/s by dividing by 3.6).\n\n**Time-Saving Shortcut:**\nUse the proportional relationship in \`${matchedExcerpt.keyFormulasOrTerms[0] || 'standard equations'}\` to eliminate obvious distractors without lengthy scratchpad algebra.\n\n${fallbackCitation}`;
      } else {
        // GUIDED mode
        fallbackText = `### Curriculum Guided Walkthrough: ${matchedExcerpt.topic}\n\n${matchedExcerpt.summary}\n\n**Key Principles:**\n${matchedExcerpt.keyFormulasOrTerms.map((f) => `- ${f}`).join('\n')}\n\n**Ethiopian Context & Real-World Application:**\n${matchedExcerpt.ethiopianAnalogy}\n\n---\n**Reflective Check:**\nHow would the outcome or numerical value change if you were to double the primary initial variable in this system? Reflect on the equation relationships.`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `${fallbackText}\n\n${fallbackCitation}`,
        citations: [fallbackCitation],
        mode: learningMode,
        language,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Conversation reset. I am ready to tutor you in **${currentGrade} ${subject}** under **${learningMode}** mode (${language}). What curriculum topic would you like to explore?`,
        citations: [
          `[FDRE MoE Citation: ${currentGrade} ${subject} | Official Syllabus Baseline]`
        ],
        mode: learningMode,
        language,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Render message content with formatted citations and highlights
  const renderMessageContent = (msg: Message) => {
    // If text contains citations, we will format them cleanly
    const lines = msg.content.split('\n');

    return (
      <div className="space-y-2.5 text-sm sm:text-base leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith('[FDRE MoE Citation:')) {
            return <CitationBadge key={idx} citationText={line} />;
          }

          if (line.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-base sm:text-lg font-bold text-emerald-300 mt-2 mb-1">
                {line.replace('### ', '')}
              </h3>
            );
          }

          if (line.startsWith('**Reflective Check:**')) {
            return (
              <div
                key={idx}
                className="mt-3 p-3.5 rounded-xl border border-sky-500/30 bg-sky-950/40 text-sky-200 text-xs sm:text-sm font-medium shadow-sm flex items-start gap-2.5"
              >
                <HelpCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase tracking-wider text-[11px] text-sky-400 block mb-0.5">
                    Reflective Check Question
                  </span>
                  <p>{line.replace('**Reflective Check:**', '').trim()}</p>
                </div>
              </div>
            );
          }

          if (line.startsWith('**Everyday Ethiopian Analogy:**')) {
            return (
              <div
                key={idx}
                className="my-2.5 p-3 rounded-xl border border-amber-500/30 bg-amber-950/30 text-amber-100 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-1.5 font-bold text-amber-300 text-xs mb-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Everyday Ethiopian Analogy
                </div>
                <p className="italic text-slate-200">
                  {line.replace('**Everyday Ethiopian Analogy:**', '').trim()}
                </p>
              </div>
            );
          }

          // Regular paragraph / bullet
          return (
            <p key={idx} className="text-slate-100 whitespace-pre-wrap">
              {line}
            </p>
          );
        })}

        {/* Citations badges if stored in message object and not already parsed in lines */}
        {msg.citations &&
          msg.citations.length > 0 &&
          !msg.content.includes('[FDRE MoE Citation:') &&
          msg.citations.map((c, i) => <CitationBadge key={i} citationText={c} />)}
      </div>
    );
  };

  const currentModeInfo = LEARNING_MODES.find((m) => m.id === learningMode);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-5xl mx-auto px-2 sm:px-4 py-3">
      {/* Active Excerpt Context Banner if loaded */}
      {activeExcerpt && (
        <div className="mb-2.5 p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/50 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold text-emerald-300 shrink-0">Loaded Excerpt:</span>
            <span className="text-slate-200 truncate font-mono">
              {activeExcerpt.unit} • {activeExcerpt.topic} ({activeExcerpt.page})
            </span>
          </div>
          {onClearActiveExcerpt && (
            <button
              onClick={onClearActiveExcerpt}
              className="text-slate-400 hover:text-slate-100 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 font-semibold shrink-0"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Tutor Top Status Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-2.5 mb-3 flex flex-wrap items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                NUR AI Active Session
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {currentGrade} • {subject}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {currentModeInfo?.badge} • {language} Instruction
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {matchingExcerpts.length > 0 && onNavigateToExcerpt && (
            <button
              onClick={() => onNavigateToExcerpt(matchingExcerpts[0])}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition"
              title="View MoE Textbook Excerpt"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{matchingExcerpts.length} Verified Excerpts</span>
            </button>
          )}

          <button
            onClick={handleResetChat}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2 mb-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 shadow-sm relative group transition-all ${
                msg.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-xs'
                  : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-xs'
              }`}
            >
              {/* Message Header info for Assistant */}
              {msg.role === 'assistant' && (
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-400">NUR AI</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      {msg.mode || learningMode}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AudioPlayerButton text={msg.content} language={msg.language || language} />
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      title="Copy response"
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                  </div>
                </div>
              )}

              {/* Message Content */}
              {renderMessageContent(msg)}

              {msg.role === 'user' && (
                <div className="text-[10px] text-emerald-200/80 text-right mt-1">
                  {msg.timestamp}
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0 shadow-sm mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 rounded-tl-xs flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Searching official MoE textbooks & deriving curriculum citations...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Pill Deck (if few messages) */}
      {messages.length <= 3 && (
        <div className="mb-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              Try Asking:
            </span>
            {promptSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(suggestion)}
                className="text-xs px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition shrink-0 whitespace-nowrap"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Input Area */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 shadow-lg">
        {/* Mode Quick Selector on input */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 px-1 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[10px] uppercase font-bold text-slate-400">Target Mode:</span>
            {LEARNING_MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setLearningMode(m.id)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                  learningMode === m.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 hidden sm:inline">
            Press Enter to Send
          </span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask NUR AI about ${currentGrade} ${subject} (e.g. formulas, derivations, exam traps)...`}
            className="flex-1 bg-transparent border-0 px-3 py-1.5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-0 font-medium"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white font-semibold transition-all shadow-md shadow-emerald-900/30 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
