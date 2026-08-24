// lib/ai-service.ts
import { GoogleGenAI } from '@google/genai';
import { getSEOSystemPrompt, buildUserPrompt, SEOPromptInput, SEOPromptOutput } from './seo-prompts';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// ── Cache ───────────────────────────────────────────────────────────────────
const seoCache = new Map<string, SEOPromptOutput>();

function getCacheKey(input: SEOPromptInput): string {
  // Create a unique key from page name + first 300 chars of content
  const contentHash = input.pageContent.slice(0, 300).trim().toLowerCase();
  return `${input.pageName}:${contentHash}`;
}
// ───────────────────────────────────────────────────────────────────────────

// Retry helper with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      if (error.status === 429 || error.message?.includes('RESOURCE_EXHAUSTED')) {
        const retryDelay = error.details?.find(
          (d: any) => d['@type']?.includes('RetryInfo')
        )?.retryDelay;
        
        let delayMs = baseDelay * Math.pow(2, attempt);
        if (retryDelay) {
          const seconds = parseInt(retryDelay.match(/\d+/)?.[0] || '30');
          delayMs = seconds * 1000;
        }
        
        console.log(`Rate limited. Retrying in ${delayMs}ms... (attempt ${attempt + 1}/${maxRetries + 1})`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        continue;
      }
      
      throw error;
    }
  }
  
  throw lastError;
}

export async function generateSEO(input: SEOPromptInput): Promise<SEOPromptOutput> {
  // ── Check cache first ─────────────────────────────────────────────────────
  const cacheKey = getCacheKey(input);
  
  if (seoCache.has(cacheKey)) {
    console.log('📦 Cache hit — returning saved result');
    return seoCache.get(cacheKey)!;
  }
  // ─────────────────────────────────────────────────────────────────────────
const fullPrompt = `${getSEOSystemPrompt()}\n\n${buildUserPrompt(input)}`;
  const result = await retryWithBackoff(async () => {
    return await ai.models.generateContent({
      model: 'models/gemini-2.5-flash-lite',
      contents: fullPrompt,
    });
  });

  const text = result.text || '';
  
  const jsonMatch = text.match(/\{[\s\S]*\}/); 
  if (!jsonMatch) {
    throw new Error('AI returned invalid format');
  }

  const raw = JSON.parse(jsonMatch[0]);

  const seoData = {
    metaTitle: String(raw.metaTitle || '').slice(0, 70),
    metaDescription: String(raw.metaDescription || '').slice(0, 170),
    keywords: Array.isArray(raw.keywords) ? raw.keywords.map(String).slice(0, 10) : [],
    ogTitle: String(raw.ogTitle || raw.metaTitle || '').slice(0, 70),
    ogDescription: String(raw.ogDescription || raw.metaDescription || '').slice(0, 170),
    ogImage: String(raw.ogImage || ''),
    twitterTitle: String(raw.twitterTitle || raw.metaTitle || '').slice(0, 70),
    twitterDescription: String(raw.twitterDescription || raw.metaDescription || '').slice(0, 170),
    twitterImage: String(raw.twitterImage || raw.ogImage || ''),
  };

  // ── Save to cache ───────────────────────────────────────────────────────
  seoCache.set(cacheKey, seoData);
  console.log('💾 Saved to cache');
  // ───────────────────────────────────────────────────────────────────────

  return seoData;
}