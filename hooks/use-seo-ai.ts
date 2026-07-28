// hooks/use-seo-ai.ts
import { useState, useCallback } from 'react';
import { SEOPromptInput, SEOPromptOutput } from '../lib/seo-prompt';


interface UseSEOAIState {
  isGenerating: boolean;
  error: string | null;
}

export function useSEOAI() {
  const [state, setState] = useState<UseSEOAIState>({
    isGenerating: false,
    error: null,
  });

  const generate = useCallback(async (input: SEOPromptInput): Promise<SEOPromptOutput | null> => {
    setState({ isGenerating: true, error: null });

    try {
      const res = await fetch('/api/seo/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');

      return data as SEOPromptOutput;
    } catch (err: any) {
      setState(prev => ({ ...prev, error: err.message }));
      return null;
    } finally {
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  }, []);

  return { generate, ...state };
}