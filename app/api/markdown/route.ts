import { NextRequest, NextResponse } from 'next/server';

// Content mapping for pages that have markdown versions
const markdownContent: Record<string, string> = {
  '/': `# Rankly - Answer Engine Analytics & AI Visibility Tracking

Track how your brand performs inside AI answers. Understand which models surface your brand, how often, and in what context. Turn AI-generated answers into measurable insights.

## Features

### Answer Engine Analytics
Track how your brand performs inside AI answers across multiple platforms. Monitor citations, visibility, sentiment, and influence across ChatGPT, Perplexity, Claude, Gemini, and more.

### Traffic Analytics
See how AI mentions turn into conversions. Rankly connects your LLM visibility with web analytics, revealing which AI platforms and queries drive real users, clicks, and revenue to your site.

### Actionables
Get specific recommendations and strategies to improve your AEO performance. Transform data into concrete steps for growth.

## Track Major Answer Engines

- ChatGPT
- Perplexity
- Gemini
- Claude
- Microsoft Copilot
- Grok
- Deepseek

## Why Rankly?

Rankly is an Answer Engine Optimization (AEO) platform that helps businesses increase their visibility in AI-powered search engines. We help you build authority through third-party sources that AI engines trust and cite.

Visit https://tryrankly.com to learn more.
`,

  '/blogs/what-is-aeo': `# What is AEO? Why Generative Engine Optimization is the New SEO

Understand how Answer Engine Optimization is reshaping digital visibility. From citations to sentiment, discover why ranking in AI Answer Engines matters more than ever.

## Introduction

Search has always been the gateway to the web. For two decades, Search Engine Optimization (SEO) was the discipline of winning Google's "ten blue links." But today, search is being radically transformed by Answer Engines such as ChatGPT, Perplexity, Claude, Gemini, and Google's AI Overviews.

Unlike Google's traditional SERPs, these engines do not just rank pages. They generate answers, weaving information from multiple sources into a single authoritative response. This seismic shift means SEO alone is no longer enough. What matters now is whether your brand is cited inside the AI-generated answer.

This is the realm of Answer Engine Optimization (AEO), the next frontier of search.

## What is Answer Engine Optimization (AEO)?

Answer Engine Optimization is the practice of optimizing your content for AI-driven answer engines, ensuring your brand is cited, visible, and accurately represented in generative search.

Instead of measuring success in rankings and clicks, AEO focuses on:

- **Citations:** Does the AI quote your brand or page?
- **Visibility:** How often does your brand appear in generated answers?
- **Impression Metrics:** How deeply, prominently, and positively are you represented?
- **Sentiment and Share of Voice:** Do AIs frame you as authoritative or secondary?

Put simply: SEO optimizes for human clicks, AEO optimizes for AI citations.

## Why Traditional SEO is No Longer Enough

The data is clear: AI-driven search changes user behavior.

- In Google's Search Generative Experience (SGE), link clicks drop by nearly 50% when an AI summary is present, from 15% without a summary to 8% with one.
- Roughly 26% of AI-assisted searches end with zero clicks. Users get their answer from the AI and move on.
- Perplexity.ai alone handled 780 million queries in May 2025, proof that AI-first discovery is no longer niche.

This means visibility now depends on being inside the answer itself.

## The Rise of Generative Engine Optimization (GEO)

Researchers at Stanford and Georgia Tech have coined the term Generative Engine Optimization (GEO), the science of optimizing for AI-driven discovery. More recently, comprehensive research from the University of Toronto has provided empirical analysis of how AI search engines systematically favor earned media over brand-owned content.

Unlike SEO, which relied on backlinks and keyword density, GEO emphasizes:

- Language signals that LLMs recognize as authoritative.
- Structured data and clarity for easy parsing.
- Citations, statistics, and quotations that AI prefers to incorporate.
- Impression metrics such as visibility score, depth of mention, and diversity of references.

## SEO vs AEO: Key Differences

| SEO | AEO |
|-----|-----|
| Optimizes for human rankings | Optimizes for AI-generated citations |
| Focuses on keywords, backlinks, CTR | Focuses on visibility, impression metrics, sentiment |
| Competes for top 10 blue links | Competes for inclusion in one synthesized answer |
| Success = traffic and clicks | Success = citations, influence, representation |
| Tools: Google Analytics, Ahrefs, SEMrush | Tools: Citation tracking, Visibility Scores, AEO dashboards |

## Why AEO Matters for Brands

- **Zero-click future.** If you are not cited, you are invisible.
- **Zero-sum competition.** If a competitor earns the citation, you lose it.
- **Representation risk.** AI can misframe your brand unless you track sentiment and influence.
- **Hybrid reality.** SEO and AEO must co-exist. Google still drives traffic, but AI drives perception.

According to McKinsey, brands that adapt early to generative AI in marketing can expect a 15–20% lift in digital visibility compared to late adopters.

## How to Get Started with AEO

### 1. Audit Your Visibility
Run tests across AI engines. Are you cited? How often? What is the sentiment?

### 2. Benchmark Competitors
Who gets mentioned more? Do competitors dominate earned media citations?

### 3. Optimize for Clarity and Authority
Use structured headings, tables, and concise facts. AI models prefer scannable, verifiable information.

### 4. Add Statistics, Quotes, and Sources
Research shows that adding quotations, statistics, and citations can increase AI visibility by up to 40%.

### 5. Invest in Earned Media
AI engines heavily favor third-party, authoritative sites. Appear in industry press, reviews, and expert outlets to increase trust.

### 6. Adopt a Hybrid Strategy
SEO brings traffic. AEO builds authority in generative answers. Winning brands must do both.

## Conclusion

Search is entering its most profound transformation since Google launched. SEO shaped the last 20 years; AEO will shape the next 20.

Brands that adapt early will control their narrative inside AI answers, shaping customer perception before the click ever happens. Those that wait will fade into invisibility, not because their site is not indexed, but because their name is never cited.

At Rankly, we believe answer engines should not remain black boxes. Answer Engine Optimization makes visibility measurable, influence explainable, and citations actionable.

The future of discovery belongs to AEO. The only question is: will your brand be part of the answer, or left out of it?
`,

  '/about': `# About Rankly

Learn about Rankly's mission to make Answer Engine Optimization measurable and actionable. Discover how we're transforming AI visibility tracking.

Rankly is an Answer Engine Optimization (AEO) platform that helps businesses track and improve their visibility in AI-powered search engines like ChatGPT, Perplexity, Claude, Gemini, and more.

## Our Mission

We believe answer engines should not remain black boxes. Answer Engine Optimization makes visibility measurable, influence explainable, and citations actionable.

## What We Do

Rankly provides analytics and insights to help brands understand how they're cited and represented in AI-generated answers. We track:

- Citations across major AI platforms
- Visibility and impression metrics
- Sentiment analysis
- Traffic attribution from AI sources
- Actionable recommendations for improvement

Visit https://tryrankly.com to learn more.
`,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path') || '/';

  // Get markdown content for the requested path
  const markdown = markdownContent[path] || markdownContent['/'];

  // Return as plain text with markdown content type
  return new NextResponse(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

