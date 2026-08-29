import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiRefreshCw } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

// AI states
const AI_STATE = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  EMPTY: 'empty',
  ERROR: 'error',
  TIMEOUT: 'timeout',
};

const SUGGESTED_QUESTIONS = [
  'What projects are available?',
  'Which projects use React?',
  'What technologies does Harsh know?',
  'Tell me about the SkillSwap project.',
  'What skills does this portfolio demonstrate?',
  'What is Harsh\'s experience?',
  'Which project is best for AI interest?',
  'What certifications does Harsh have?',
];

export default function AskPortfolio() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [aiState, setAiState] = useState(AI_STATE.IDLE);
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const panelRef = useRef(null);
  const triggerBtnRef = useRef(null);
  const inputRef = useRef(null);
  const lastActiveRef = useRef(null);

  // Open / close handlers
  const openPanel = useCallback(() => {
    lastActiveRef.current = document.activeElement;
    setIsOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
    // Return focus to trigger button
    setTimeout(() => {
      triggerBtnRef.current?.focus();
    }, 150);
  }, []);

  // Move focus into panel when it opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Escape key closes panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) closePanel();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closePanel]);

  // Focus trap inside the panel
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusable = panelRef.current.querySelectorAll(focusableSelectors);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trapFocus = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    panelRef.current.addEventListener('keydown', trapFocus);
    return () => panelRef.current?.removeEventListener('keydown', trapFocus);
  }, [isOpen, aiState]);

  const submitQuestion = useCallback(async (q) => {
    const trimmed = (q || question).trim();

    if (!trimmed) {
      setAiState(AI_STATE.EMPTY);
      return;
    }

    setAiState(AI_STATE.LOADING);
    setErrorMessage('');

    // Setup 15s client timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch('/.netlify/functions/ask-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        let errMsg = 'Something went wrong. Please try again.';
        try {
          const errData = await res.json();
          if (errData.error) errMsg = errData.error;
        } catch {
          // ignore json parse error
        }
        setErrorMessage(errMsg);
        setAiState(AI_STATE.ERROR);
        return;
      }

      const data = await res.json();

      // Validate structured response shape
      if (typeof data.answer !== 'string') {
        setErrorMessage('Invalid response format from AI assistant.');
        setAiState(AI_STATE.ERROR);
        return;
      }

      setResponse(data);
      setAiState(AI_STATE.SUCCESS);
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        setAiState(AI_STATE.TIMEOUT);
      } else {
        setErrorMessage('Could not connect to AI assistant. Please check your connection.');
        setAiState(AI_STATE.ERROR);
      }
    }
  }, [question]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitQuestion(question);
  };

  const handleSuggestion = (q) => {
    setQuestion(q);
    submitQuestion(q);
  };

  const handleRetry = () => {
    submitQuestion(question);
  };

  const resetToIdle = () => {
    setQuestion('');
    setResponse(null);
    setErrorMessage('');
    setAiState(AI_STATE.IDLE);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        ref={triggerBtnRef}
        onClick={openPanel}
        aria-label="Open AI Portfolio Assistant"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full
          bg-gradient-to-r from-blue-600 to-sky-400 text-white font-semibold text-sm
          shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50
          hover:from-blue-500 hover:to-sky-300
          transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
      >
        <HiSparkles className="w-4 h-4" aria-hidden="true" />
        <span>Ask My Portfolio</span>
      </button>

      {/* Panel Overlay + Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closePanel}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Ask My Portfolio — AI Assistant"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm
                bg-[#0F172A] rounded-3xl border border-sky-500/25
                shadow-2xl shadow-sky-950/60 flex flex-col overflow-hidden"
              style={{ maxHeight: 'min(560px, calc(100vh - 120px))' }}
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-sky-500/15 flex-shrink-0 bg-[#0B1120]/50">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center shadow-md shadow-sky-500/25" aria-hidden="true">
                    <HiSparkles className="w-4 h-4 text-white" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-[#F8FAFC] leading-none">Ask My Portfolio</p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">AI-powered portfolio guide</p>
                  </div>
                </div>
                <button
                  onClick={closePanel}
                  aria-label="Close AI assistant"
                  className="p-1.5 rounded-lg text-[#CBD5E1] hover:text-[#38BDF8]
                    hover:bg-[#111827] transition-colors
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <FiX className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Panel Body (scrollable) */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0">

                {/* IDLE State */}
                {aiState === AI_STATE.IDLE && (
                  <div className="space-y-4">
                    <p className="text-sm text-[#94A3B8]">
                      Ask me anything about this portfolio — projects, skills, experience, or technologies.
                    </p>
                    <div>
                      <p className="text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider mb-2">Suggested Questions</p>
                      <div className="flex flex-wrap gap-2">
                        {SUGGESTED_QUESTIONS.map((q) => (
                          <button
                            key={q}
                            onClick={() => handleSuggestion(q)}
                            className="text-xs px-3 py-1.5 rounded-full bg-[#111827] border border-sky-500/20
                              text-[#CBD5E1] hover:bg-[#172033] hover:border-sky-400/60
                              hover:text-[#38BDF8] transition-all
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* EMPTY State */}
                {aiState === AI_STATE.EMPTY && (
                  <div className="text-center py-4">
                    <p className="text-sm text-amber-400 font-medium" role="alert">
                      ⚠️ Please enter a question first.
                    </p>
                    <button onClick={resetToIdle} className="mt-3 text-xs text-[#38BDF8] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded">
                      Go back
                    </button>
                  </div>
                )}

                {/* LOADING State */}
                {aiState === AI_STATE.LOADING && (
                  <div className="flex items-center gap-3 py-4" aria-live="polite" aria-label="Loading, please wait">
                    <div className="flex gap-1" aria-hidden="true">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#38BDF8] animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#94A3B8]">🤖 Thinking...</span>
                  </div>
                )}

                {/* SUCCESS State */}
                {aiState === AI_STATE.SUCCESS && response && (
                  <div className="space-y-4" aria-live="polite">
                    {/* Question echo */}
                    <div className="flex justify-end">
                      <span className="text-xs max-w-[80%] bg-sky-500/15 border border-sky-500/30 text-[#38BDF8] px-3.5 py-2 rounded-2xl rounded-br-sm font-medium">
                        {question}
                      </span>
                    </div>

                    {/* Answer */}
                    <div className="bg-[#111827] border border-sky-500/20 rounded-2xl rounded-bl-sm p-4">
                      <p className="text-sm text-[#F8FAFC] leading-relaxed whitespace-pre-wrap">
                        {response.answer}
                      </p>
                    </div>

                    {/* Related Projects */}
                    {response.relatedProjects?.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider mb-2">Related Projects</p>
                        <div className="space-y-2">
                          {response.relatedProjects.map((proj) => (
                            <div key={proj.name} className="glass-card p-3 rounded-xl border-l-2 border-l-[#38BDF8]">
                              <p className="text-xs font-bold text-[#F8FAFC]">{proj.name}</p>
                              <p className="text-xs text-[#94A3B8] mt-0.5">{proj.reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Ask another */}
                    <button
                      onClick={resetToIdle}
                      className="text-xs text-[#38BDF8] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
                    >
                      Ask another question
                    </button>
                  </div>
                )}

                {/* ERROR State */}
                {aiState === AI_STATE.ERROR && (
                  <div className="text-center py-4 space-y-3" aria-live="assertive">
                    <p className="text-sm text-red-400 font-medium" role="alert">
                      ❌ {errorMessage || 'Something went wrong. Please try again.'}
                    </p>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={handleRetry}
                        className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full
                          bg-gradient-to-r from-blue-600 to-sky-400 text-white
                          hover:from-blue-500 hover:to-sky-300 transition-all
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        <FiRefreshCw className="w-3 h-3" aria-hidden="true" /> Retry
                      </button>
                      <button
                        onClick={resetToIdle}
                        className="text-xs text-[#94A3B8] hover:text-[#F8FAFC] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
                      >
                        New question
                      </button>
                    </div>
                  </div>
                )}

                {/* TIMEOUT State */}
                {aiState === AI_STATE.TIMEOUT && (
                  <div className="text-center py-4 space-y-3" aria-live="assertive">
                    <p className="text-sm text-amber-400 font-medium" role="alert">
                      ⏱️ The request took too long. Please try again.
                    </p>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={handleRetry}
                        className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full
                          bg-gradient-to-r from-blue-600 to-sky-400 text-white
                          hover:from-blue-500 hover:to-sky-300 transition-all
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        <FiRefreshCw className="w-3 h-3" aria-hidden="true" /> Retry
                      </button>
                      <button
                        onClick={resetToIdle}
                        className="text-xs text-[#94A3B8] hover:text-[#F8FAFC] underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
                      >
                        New question
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form (always visible) */}
              {(aiState === AI_STATE.IDLE || aiState === AI_STATE.EMPTY) && (
                <form
                  onSubmit={handleSubmit}
                  className="flex-shrink-0 px-4 py-3 border-t border-sky-500/15 bg-[#0B1120]/60"
                  aria-label="Ask a question about this portfolio"
                >
                  <div className="flex items-center gap-2">
                    <label htmlFor="portfolio-question" className="sr-only">
                      Your question about this portfolio
                    </label>
                    <input
                      id="portfolio-question"
                      ref={inputRef}
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Ask about projects, skills…"
                      maxLength={500}
                      autoComplete="off"
                      className="flex-1 bg-[#0B1120] text-[#F8FAFC]
                        text-sm rounded-full px-4 py-2 border border-sky-500/25
                        focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]/40
                        placeholder:text-[#64748B]"
                      aria-describedby={aiState === AI_STATE.EMPTY ? 'ask-empty-hint' : undefined}
                    />
                    {aiState === AI_STATE.EMPTY && (
                      <span id="ask-empty-hint" className="sr-only">Please enter a question before submitting.</span>
                    )}
                    <button
                      type="submit"
                      aria-label="Submit question"
                      className="w-9 h-9 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-sky-400
                        flex items-center justify-center text-white shadow-md shadow-sky-500/25
                        hover:from-blue-500 hover:to-sky-300 transition-all
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      <FiSend className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
