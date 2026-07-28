// app/api/seo/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { SEOPromptInput } from '../../../../../lib/seo-prompt';
import { generateSEO } from '../../../../../lib/ai-service';


export async function POST(request: NextRequest) {
  try {
    const body: SEOPromptInput = await request.json();

    if (!body.pageName?.trim() || !body.pageContent?.trim()) {
      return NextResponse.json(
        { error: 'pageName and pageContent are required' },
        { status: 400 } 
      );
    }

    const seoData = await generateSEO({
      pageName: body.pageName,
      canonicalUrl: body.canonicalUrl || 'https://creatikai.com',
      pageContent: body.pageContent,
    });

    return NextResponse.json(seoData);
  } catch (error: any) {
    console.error('SEO Generate Error:', error);
    return NextResponse.json(
      { error: error.message || 'Generation failed' },
      { status: 500 }
    );
  }
}