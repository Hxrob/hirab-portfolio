import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Loader2, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { cn } from '../lib/utils';

type ChatRole = 'user' | 'assistant';

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

const starterPrompts = [
  'What roles is Hirab looking for?',
  'Summarize his ML experience.',
  'Tell me about Piglet Prep.',
];

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content:
      "Hi, I'm Hirabot! Ask me about his projects, research, skills, or how to contact him.",
  },
];

function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
  };
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, isLoading, error]);

  const sendMessage = async (content: string) => {
    const trimmedContent = content.trim();

    if (!trimmedContent || isLoading) {
      return;
    }

    const nextMessages = [...messages, createMessage('user', trimmedContent)];

    setMessages(nextMessages);
    setInput('');
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to reach the assistant.');
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage('assistant', data.message || 'Sorry, I could not generate a response.'),
      ]);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : 'Something went wrong while sending your message.';

      setError(message);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handleToggle = () => {
    setIsOpen((currentValue) => !currentValue);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  return (
    <div className="fixed bottom-5 right-4 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            aria-label="Hirab portfolio assistant"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mb-4 flex h-[min(36rem,calc(100vh-7rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/95 shadow-2xl shadow-black/30 backdrop-blur-xl sm:w-96"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Bot size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-text">Ask about Hirab</h2>
                  <p className="text-xs text-text-muted">Recruiter-friendly portfolio assistant</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-text-muted transition-colors hover:bg-white/5 hover:text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Close chat"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed',
                      message.role === 'user'
                        ? 'bg-primary text-white'
                        : 'border border-white/10 bg-white/5 text-text-muted'
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-muted">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Thinking
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-200">
                  {error}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/10 p-4">
              {messages.length === 1 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {starterPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendMessage(prompt)}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-primary/40 hover:text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about projects, skills, or contact..."
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-background/80 px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send size={18} aria-hidden="true" />
                  )}
                </button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleToggle}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="ml-auto flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-medium text-white shadow-xl shadow-primary/20 transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
      >
        {isOpen ? <X size={20} aria-hidden="true" /> : <MessageCircle size={20} aria-hidden="true" />}
        <span className="hidden sm:inline">{isOpen ? 'Close' : 'Ask Me'}</span>
        {!isOpen && <Sparkles className="hidden h-4 w-4 sm:block" aria-hidden="true" />}
      </motion.button>
    </div>
  );
}
