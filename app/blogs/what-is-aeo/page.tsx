import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { RanklyFooter } from "@/components/rankly-footer"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { ProductDemoSection } from "@/components/product-demo-section"
import { FAQSection2 } from "@/components/ui/faq-section-2"
import { MarkdownButton } from "@/components/markdown-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LinkIcon } from "lucide-react"

// Force dynamic rendering to avoid build timeout
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "What is AEO? Why Generative Engine Optimization is the New SEO",
  description: "Understand how Answer Engine Optimization is reshaping digital visibility. From citations to sentiment, discover why ranking in AI Answer Engines matters more than ever.",
  openGraph: {
    title: "What is AEO? Why Generative Engine Optimization is the New SEO",
    description: "Understand how Answer Engine Optimization is reshaping digital visibility. From citations to sentiment, discover why ranking in AI Answer Engines matters more than ever.",
    type: "article",
    publishedTime: "2024-12-15",
    authors: ["Rankly"],
    tags: ["AEO", "Answer Engine Optimization", "SEO", "AI", "Generative AI"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What is AEO? Why Generative Engine Optimization is the New SEO",
    description: "Understand how Answer Engine Optimization is reshaping digital visibility.",
  },
}

export default function BlogPostPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tryrankly.com'
  
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What is AEO? Why Generative Engine Optimization is the New SEO',
    description: 'Understand how Answer Engine Optimization is reshaping digital visibility. From citations to sentiment, discover why ranking in AI Answer Engines matters more than ever.',
    image: `${baseUrl}/images/rankly-dashboard-final.png`,
    datePublished: '2024-12-15',
    dateModified: '2024-12-15',
    author: {
      '@type': 'Organization',
      name: 'Rankly',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rankly',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blogs/what-is-aeo`,
    },
  }

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SiteHeader />

      <div className="mx-auto max-w-7xl relative px-6 md:px-8">
        <div className="pt-8 pb-12 md:pt-10 md:pb-16">
          <article className="max-w-[680px] mx-auto">
              {/* Header Section */}
              <header className="mb-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h1 className="text-[40px] md:text-[44px] font-semibold leading-tight tracking-[-0.02em] text-foreground flex-1">
                    What is AEO? Why Generative Engine Optimization is the New SEO
                  </h1>
                  <MarkdownButton 
                    path="/blogs/what-is-aeo"
                    variant="outline"
                    size="sm"
                    className="shrink-0 mt-2"
                  />
                </div>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mt-4 mb-4 text-muted-foreground">
                  Understand how Answer Engine Optimization is reshaping digital visibility. From citations to
                  sentiment, discover why ranking in AI Answer Engines matters more than ever.
                </p>
                
                <div className="flex items-center gap-4 mt-6">
                  <span className="px-3 py-1.5 bg-muted dark:bg-muted/90 rounded-full text-xs font-medium uppercase tracking-wider text-foreground dark:text-foreground border border-border/80 dark:border-white/30">Insights</span>
                  <span className="px-3 py-1.5 bg-muted dark:bg-muted/90 rounded-full text-xs font-medium uppercase tracking-wider text-foreground dark:text-foreground border border-border/80 dark:border-white/30">6 min</span>
                </div>
              </header>

              {/* Graphic before first heading */}
              <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-cyan-100 via-orange-50 to-cyan-100 dark:from-cyan-900/20 dark:via-orange-900/20 dark:to-cyan-900/20 mt-6 md:mt-8 -mb-12" style={{ aspectRatio: "2/1" }}>
                <FlickeringGrid
                  className="absolute inset-0 z-0"
                  squareSize={2}
                  gridGap={4}
                  color="rgb(100, 100, 100)"
                  maxOpacity={0.15}
                  flickerChance={0}
                />
                {/* Text overlay */}
                <div className="absolute inset-0 flex items-center justify-center px-16 z-10">
                  <h3 className="text-[28px] md:text-[30px] font-medium text-center leading-tight text-foreground">
                    Answer Engine Optimization for the AI-first web
                  </h3>
                </div>
              </div>

              {/* Content Section */}
              <div className="prose-article mt-20">
                <h2 id="introduction" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>Introduction</span>
                  <a 
                    href="#introduction" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#introduction')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Search has always been the gateway to the web. For two decades, <a href="https://en.wikipedia.org/wiki/Search_engine_optimization" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Search Engine Optimization (SEO)</a> was the discipline of winning Google's "ten blue links." But today, search is being radically transformed by Answer Engines such as <a href="https://en.wikipedia.org/wiki/ChatGPT" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">ChatGPT</a>, <a href="https://en.wikipedia.org/wiki/Perplexity.ai" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Perplexity</a>, <a href="https://en.wikipedia.org/wiki/Claude_(language_model)" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Claude</a>, <a href="https://en.wikipedia.org/wiki/Gemini_(language_model)" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Gemini</a>, and Google's AI Overviews.
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Unlike Google's traditional SERPs, these engines do not just rank pages. They generate answers, weaving information from multiple sources into a single authoritative response. This seismic shift means SEO alone is no longer enough. What matters now is whether your brand is cited inside the AI-generated answer.
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  This is the realm of Answer Engine Optimization (AEO), the next frontier of search.
                </p>

                <h2 id="what-is-aeo" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>What is Answer Engine Optimization (AEO)?</span>
                  <a 
                    href="#what-is-aeo" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#what-is-aeo')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Answer Engine Optimization is the practice of optimizing your content for <a href="https://en.wikipedia.org/wiki/Artificial_intelligence" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">AI</a>-driven answer engines, ensuring your brand is cited, visible, and accurately represented in <a href="https://en.wikipedia.org/wiki/Generative_artificial_intelligence" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">generative search</a>.
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">Instead of measuring success in rankings and clicks, AEO focuses on:</p>

                <ul className="list-disc pl-8 mb-5 space-y-2 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">
                  <li><strong className="font-medium text-foreground">Citations:</strong> Does the AI quote your brand or page?</li>
                  <li><strong className="font-medium text-foreground">Visibility:</strong> How often does your brand appear in generated answers?</li>
                  <li><strong className="font-medium text-foreground">Impression Metrics:</strong> How deeply, prominently, and positively are you represented?</li>
                  <li><strong className="font-medium text-foreground">Sentiment and Share of Voice:</strong> Do AIs frame you as authoritative or secondary?</li>
                </ul>

                <blockquote className="border-l-4 border-border/60 pl-8 py-4 my-6 italic text-[15.5px] md:text-base leading-[1.7] bg-muted/30 rounded-r-lg text-muted-foreground">
                  Put simply: SEO optimizes for human clicks, AEO optimizes for AI citations.
                </blockquote>

                <h2 id="why-seo-not-enough" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>Why Traditional SEO is No Longer Enough</span>
                  <a 
                    href="#why-seo-not-enough" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#why-seo-not-enough')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">The data is clear: AI-driven search changes user behavior.</p>

                <ul className="list-disc pl-8 mb-5 space-y-2 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">
                  <li>In Google's Search Generative Experience (SGE), link clicks drop by nearly 50% when an AI summary is present, from 15% without a summary to 8% with one <sup><a href="https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">[1]</a></sup>.</li>
                  <li>Roughly 26% of AI-assisted searches end with zero clicks <sup><a href="https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">[1]</a></sup>. Users get their answer from the AI and move on.</li>
                  <li>Perplexity.ai alone handled 780 million queries in May 2025, proof that AI-first discovery is no longer niche <sup><a href="https://www.perplexity.ai/page/ceo-says-perplexity-hit-780m-qdENgiYOuTfaMEpsLQc2bIQ" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">[2]</a></sup>.</li>
                </ul>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  This means visibility now depends on being inside the answer itself.
                </p>

                <blockquote className="border-l-4 border-border/60 pl-8 py-4 my-6 italic text-[15.5px] md:text-base leading-[1.7] bg-muted/30 rounded-r-lg text-muted-foreground">
                  As SEO veteran <a href="https://en.wikipedia.org/wiki/Rand_Fishkin" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Rand Fishkin</a> noted: "AI results will increasingly favor large brands, making it harder for smaller players to compete unless they establish undeniable niche authority." <sup><a href="#ref-6" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">[6]</a></sup>
                </blockquote>

                <h2 id="rise-of-geo" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>The Rise of Generative Engine Optimization (GEO)</span>
                  <a 
                    href="#rise-of-geo" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#rise-of-geo')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Researchers at <a href="https://en.wikipedia.org/wiki/Stanford_University" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Stanford</a> and <a href="https://en.wikipedia.org/wiki/Georgia_Institute_of_Technology" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Georgia Tech</a> have coined the term Generative Engine Optimization (GEO), the science of optimizing for AI-driven discovery <sup><a href="https://arxiv.org/abs/2311.09735" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">[3]</a></sup>. More recently, comprehensive research from the University of Toronto has provided empirical analysis of how AI search engines systematically favor earned media over brand-owned content <sup><a href="https://www.arxiv.org/pdf/2509.08919" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">[7]</a></sup>.
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">Unlike SEO, which relied on backlinks and keyword density, GEO emphasizes:</p>

                <ul className="list-disc pl-8 mb-5 space-y-2 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">
                  <li>Language signals that <a href="https://en.wikipedia.org/wiki/Large_language_model" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">LLMs</a> recognize as authoritative.</li>
                  <li><a href="https://en.wikipedia.org/wiki/Structured_data" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Structured data</a> and clarity for easy parsing.</li>
                  <li>Citations, statistics, and quotations that AI prefers to incorporate.</li>
                  <li>Impression metrics such as visibility score, depth of mention, and diversity of references.</li>
                </ul>

                <blockquote className="border-l-4 border-border/60 pl-8 py-4 my-6 italic text-[15.5px] md:text-base leading-[1.7] bg-muted/30 rounded-r-lg text-muted-foreground">
                  <a href="https://en.wikipedia.org/wiki/Andreessen_Horowitz" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Andreessen Horowitz</a> summarized it best: "Traditional search was built on links; generative search is built on language." <sup><a href="#ref-4" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">[4]</a></sup>
                </blockquote>

                <h2 id="seo-vs-aeo" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>SEO vs AEO: Key Differences</span>
                  <a 
                    href="#seo-vs-aeo" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#seo-vs-aeo')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="border border-border px-4 py-3 text-left font-semibold text-sm">SEO</th>
                        <th className="border border-border px-4 py-3 text-left font-semibold text-sm">AEO</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Optimizes for human rankings</td>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Optimizes for AI-generated citations</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Focuses on keywords, backlinks, CTR</td>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Focuses on visibility, impression metrics, sentiment</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Competes for top 10 blue links</td>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Competes for inclusion in one synthesized answer</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Success = traffic and clicks</td>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Success = citations, influence, representation</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Tools: Google Analytics, Ahrefs, SEMrush</td>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Tools: Citation tracking, Visibility Scores, AEO dashboards</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 id="why-aeo-matters" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>Why AEO Matters for Brands</span>
                  <a 
                    href="#why-aeo-matters" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#why-aeo-matters')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <ul className="list-disc pl-8 mb-5 space-y-2 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">
                  <li><strong className="font-medium text-foreground">Zero-click future.</strong> If you are not cited, you are invisible.</li>
                  <li><strong className="font-medium text-foreground">Zero-sum competition.</strong> If a competitor earns the citation, you lose it.</li>
                  <li><strong className="font-medium text-foreground">Representation risk.</strong> AI can misframe your brand unless you track sentiment and influence.</li>
                  <li><strong className="font-medium text-foreground">Hybrid reality.</strong> SEO and AEO must co-exist. Google still drives traffic, but AI drives perception.</li>
                </ul>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  According to <a href="https://en.wikipedia.org/wiki/McKinsey_%26_Company" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">McKinsey</a>, brands that adapt early to generative AI in marketing can expect a 15–20% lift in digital visibility compared to late adopters <sup><a href="#ref-5" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">[5]</a></sup>.
                </p>

                <h2 id="get-started" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>How to Get Started with AEO</span>
                  <a 
                    href="#get-started" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#get-started')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <h3 className="text-[22px] md:text-[24px] font-medium mt-8 mb-2 text-foreground/90">1. Audit Your Visibility</h3>
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">Run tests across AI engines. Are you cited? How often? What is the sentiment?</p>

                <h3 className="text-[22px] md:text-[24px] font-medium mt-8 mb-2 text-foreground/90">2. Benchmark Competitors</h3>
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">Who gets mentioned more? Do competitors dominate earned media citations?</p>

                <h3 className="text-[22px] md:text-[24px] font-medium mt-8 mb-2 text-foreground/90">3. Optimize for Clarity and Authority</h3>
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">Use structured headings, tables, and concise facts. AI models prefer scannable, verifiable information.</p>

                <h3 className="text-[22px] md:text-[24px] font-medium mt-8 mb-2 text-foreground/90">4. Add Statistics, Quotes, and Sources</h3>
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">Research shows that adding quotations, statistics, and citations can increase AI visibility by up to 40% <sup><a href="#ref-3" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">[3]</a></sup>.</p>

                <blockquote className="border-l-4 border-border/60 pl-8 py-4 my-6 italic text-[15.5px] md:text-base leading-[1.7] bg-muted/30 rounded-r-lg text-muted-foreground">
                  "Success in AEO will come from creating content worth citing, not chasing tricks to game the system." – Aggarwal et al., Generative Engine Optimization Framework (2024) <sup><a href="#ref-3" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">[3]</a></sup>.
                </blockquote>

                <h3 className="text-[22px] md:text-[24px] font-medium mt-8 mb-2 text-foreground/90">5. Invest in Earned Media</h3>
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">AI engines heavily favor third-party, authoritative sites. Appear in industry press, reviews, and expert outlets to increase trust.</p>

                <h3 className="text-[22px] md:text-[24px] font-medium mt-8 mb-2 text-foreground/90">6. Adopt a Hybrid Strategy</h3>
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">SEO brings traffic. AEO builds authority in generative answers. Winning brands must do both.</p>

                <h2 id="conclusion" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>Conclusion</span>
                  <a 
                    href="#conclusion" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#conclusion')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Search is entering its most profound transformation since <a href="https://en.wikipedia.org/wiki/Google" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Google</a> launched. SEO shaped the last 20 years; AEO will shape the next 20.
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Brands that adapt early will control their narrative inside AI answers, shaping customer perception before the click ever happens. Those that wait will fade into invisibility, not because their site is not indexed, but because their name is never cited.
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  At Rankly, we believe answer engines should not remain black boxes. Answer Engine Optimization makes visibility measurable, influence explainable, and citations actionable.
                </p>

                <p className="text-[18px] leading-[1.7] mb-5 font-medium text-foreground">
                  The future of discovery belongs to AEO. The only question is: will your brand be part of the answer, or left out of it?
                </p>

                {/* References Section */}
                <div className="mt-12 pt-6 border-t border-border">
                  <h2 id="references" className="group text-[28px] md:text-[30px] font-medium mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                    <span>References</span>
                    <a 
                      href="#references" 
                      onClick={(e) => {
                        e.preventDefault()
                        window.history.pushState(null, '', '#references')
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </a>
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <div id="ref-1" className="scroll-mt-20">
                      <span className="font-medium text-foreground">[1]</span> Pew Research Center. (2025). "Google users are less likely to click on links when an AI summary appears in the results." <em>Pew Research Short Reads</em>. <a href="https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Available online</a>.
                    </div>
                    <div id="ref-2" className="scroll-mt-20">
                      <span className="font-medium text-foreground">[2]</span> Perplexity AI. (2025). "CEO says Perplexity hit 780M queries in May 2025." <a href="https://www.perplexity.ai/page/ceo-says-perplexity-hit-780m-qdENgiYOuTfaMEpsLQc2bIQ" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Available online</a>.
                    </div>
                    <div id="ref-3" className="scroll-mt-20">
                      <span className="font-medium text-foreground">[3]</span> Aggarwal, P., Murahari, V., Rajpurohit, T., Kalyan, A., Narasimhan, K., & Deshpande, A. (2024). "GEO: Generative Engine Optimization." <em>arXiv:2311.09735</em>. <a href="https://arxiv.org/abs/2311.09735" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Available online</a>.
                    </div>
                    <div id="ref-4" className="scroll-mt-20">
                      <span className="font-medium text-foreground">[4]</span> Andreessen Horowitz. (2023). "The Future of Search: From Links to Language." <em>A16Z Blog</em>.
                    </div>
                    <div id="ref-5" className="scroll-mt-20">
                      <span className="font-medium text-foreground">[5]</span> McKinsey & Company. (2024). "Generative AI's Impact on Marketing and Digital Visibility." <em>McKinsey Digital</em>.
                    </div>
                    <div id="ref-6" className="scroll-mt-20">
                      <span className="font-medium text-foreground">[6]</span> Fishkin, R. (2024). "Large Brand Bias in AI Search Results." <em>SparkToro Insights</em>.
                    </div>
                    <div id="ref-7" className="scroll-mt-20">
                      <span className="font-medium text-foreground">[7]</span> Chen, M., Wang, X., Chen, K., & Koudas, N. (2025). "Generative Engine Optimization: How to Dominate AI Search." <em>University of Toronto</em>. <a href="https://www.arxiv.org/pdf/2509.08919" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">arXiv:2509.08919</a>.
                    </div>
                  </div>
                </div>
              </div>
            </article>
        </div>
      </div>

      {/* Product Demo Section */}
      <ProductDemoSection />

      {/* FAQ Section */}
      <FAQSection2 />

      <RanklyFooter />

      {/* Theme Toggle at bottom */}
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </main>
  )
}