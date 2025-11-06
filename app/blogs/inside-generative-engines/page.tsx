"use client"

import { SiteHeader } from "@/components/site-header"
import { RanklyFooter } from "@/components/rankly-footer"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { ProductDemoSection } from "@/components/product-demo-section"
import { FAQSection2 } from "@/components/ui/faq-section-2"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import { Link as LinkIcon } from "lucide-react"

export default function BlogPostPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <div className="mx-auto max-w-7xl relative px-6 md:px-8">
        <div className="pt-8 pb-12 md:pt-10 md:pb-16">
          <article className="max-w-[680px] mx-auto">
              {/* Header Section */}
              <header className="mb-4">
                <h1 className="text-[40px] md:text-[44px] font-semibold leading-tight tracking-[-0.02em] mb-4 text-foreground">
                  Inside Generative Engines: <br className="hidden md:block" />A Mathematical and System-Level Breakdown
                </h1>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mt-4 mb-4 text-muted-foreground">
                  Generative engines like <a href="https://en.wikipedia.org/wiki/ChatGPT" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">ChatGPT</a>, <a href="https://en.wikipedia.org/wiki/Perplexity.ai" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Perplexity</a>, and <a href="https://en.wikipedia.org/wiki/Gemini_(language_model)" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Gemini</a> are rapidly replacing <a href="https://en.wikipedia.org/wiki/Search_engine" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">search engines</a>, yet few understand how they actually compute an answer.
                </p>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mt-4 text-muted-foreground">
                  This post breaks down the <a href="https://en.wikipedia.org/wiki/Generative_artificial_intelligence" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">generative engine</a> (GE) pipeline as a formal system, from query reformulation to synthesis, and derives the math behind its visibility and optimization behavior.
                </p>
                
                <div className="flex items-center gap-4 mt-6">
                  <span className="px-3 py-1.5 bg-muted dark:bg-muted/90 rounded-full text-xs font-medium uppercase tracking-wider text-foreground dark:text-foreground border border-border/80 dark:border-white/30">Technical</span>
                  <span className="px-3 py-1.5 bg-muted dark:bg-muted/90 rounded-full text-xs font-medium uppercase tracking-wider text-foreground dark:text-foreground border border-border/80 dark:border-white/30">12 min</span>
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
                    The Mathematical Foundations of Generative AI
                  </h3>
                </div>
              </div>

              {/* Content Section */}
              <div className="prose-article mt-20">
                <h2 id="section-1" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>1. The Generative Engine as a Function</span>
                  <a 
                    href="#section-1" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#section-1')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  At its core, a generative engine is a mapping from a user query to a response:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    f<sub>GE</sub>: (q<sub>u</sub>, P<sub>U</sub>) → r
                  </code>
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  where <strong>q<sub>u</sub></strong> is the user's query, <strong>P<sub>U</sub></strong> is the personalization context (such as location or intent history), and <strong>r</strong> is the generated response (structured text with inline citations).
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Unlike a classical <a href="https://en.wikipedia.org/wiki/Search_engine" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">search engine</a> that ranks documents, a GE synthesizes an answer by reading, reasoning, and rewriting through multiple <a href="https://en.wikipedia.org/wiki/Artificial_neural_network" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">neural modules</a>.
                </p>

                <h2 id="section-2" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>2. The Multi-Model Pipeline</span>
                  <a 
                    href="#section-2" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#section-2')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  A modern GE is a composition of specialized subsystems:
                </p>

                <div className="my-10 flex justify-center">
                  <Image
                    src="/images/generative-engine-diagram.png"
                    alt="Generative Engine Multi-Model Pipeline Diagram"
                    width={800}
                    height={400}
                    className="rounded-lg"
                  />
                </div>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    f<sub>GE</sub> = G<sub>resp</sub> ∘ G<sub>sum</sub> ∘ SE ∘ G<sub>qr</sub>
                  </code>
                </p>

                <h3 className="text-[18px] md:text-[20px] font-medium mt-8 mb-2 text-foreground/90">2.1 Query Reformulation (G<sub>qr</sub>)</h3>
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Expands <strong>q<sub>u</sub></strong> into semantically diverse sub-queries:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    Q<sub>1</sub> = {'{'}q<sub>1</sub>, q<sub>2</sub>, …, q<sub>n</sub>{'}'} ∼ p(Q<sub>1</sub> | q<sub>u</sub>; θ<sub>qr</sub>)
                  </code>
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Each <strong>q<sub>i</sub></strong> represents a decomposed intent of the original query.
                </p>

                <h3 className="text-[18px] md:text-[20px] font-medium mt-8 mb-2 text-foreground/90">2.2 Retrieval Engine (SE)</h3>
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Fetches a ranked set of sources using <a href="https://en.wikipedia.org/wiki/Information_retrieval" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">information retrieval</a>:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    S = {'{'}s<sub>1</sub>, s<sub>2</sub>, …, s<sub>m</sub>{'}'} ∼ p(S | Q<sub>1</sub>; θ<sub>ret</sub>)
                  </code>
                </p>

                <h3 className="text-[18px] md:text-[20px] font-medium mt-8 mb-2 text-foreground/90">2.3 Summarization Model (G<sub>sum</sub>)</h3>
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Compresses each document into a short, citation-ready summary using <a href="https://en.wikipedia.org/wiki/Automatic_summarization" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">automatic summarization</a>:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    Sum<sub>j</sub> = G<sub>sum</sub>(s<sub>j</sub>), α<sub>j</sub> = |Sum<sub>j</sub>| / |s<sub>j</sub>|
                  </code>
                </p>

                <h3 className="text-[18px] md:text-[20px] font-medium mt-8 mb-2 text-foreground/90">2.4 Response Synthesizer (G<sub>resp</sub>)</h3>
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Constructs the final response:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    r = G<sub>resp</sub>(q<sub>u</sub>, Sum)
                  </code>
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Each factual unit in <strong>r</strong> is grounded in the retrieved sources through inline citations.
                </p>

                <h2 id="section-3" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>3. Sentence-Level Structure and Citations</span>
                  <a 
                    href="#section-3" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#section-3')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Let the response be a sequence of <strong>o</strong> sentences:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    r = ⟨ℓ<sub>1</sub>, ℓ<sub>2</sub>, …, ℓ<sub>o</sub>⟩
                  </code>
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Each sentence <strong>ℓ<sub>t</sub></strong> is annotated with a citation set <strong>C<sub>t</sub> ⊆ S</strong>.
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">For attribution integrity:</p>

                <ul className="list-disc pl-8 mb-5 space-y-2 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">
                  <li><strong className="font-medium text-foreground">Citation precision</strong> is the fraction of citations that truly support <strong>ℓ<sub>t</sub></strong>.</li>
                  <li><strong className="font-medium text-foreground">Citation recall</strong> is the fraction of factual claims in <strong>ℓ<sub>t</sub></strong> that are cited.</li>
                </ul>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  An ideal generative engine maximizes both.
                </p>

                <h2 id="section-4" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>4. Quantifying Visibility Inside a Generative Response</span>
                  <a 
                    href="#section-4" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#section-4')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Visibility in a generative engine is embedded within the synthesized text. It is not defined by rank but by where and how much a source contributes to the generated answer.
                </p>

                <h3 className="text-[18px] md:text-[20px] font-medium mt-8 mb-2 text-foreground/90">4.1 Word-Share Impression</h3>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    Imp<sub>wc</sub>(c<sub>i</sub>, r) = (Σ<sub>s∈S_ci</sub> |s|) / (Σ<sub>s∈S_r</sub> |s|)
                  </code>
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  where <strong>S<sub>ci</sub></strong> is the set of sentences citing <strong>c<sub>i</sub></strong> and <strong>|s|</strong> is the number of words in <strong>s</strong>.
                </p>

                <h3 className="text-[18px] md:text-[20px] font-medium mt-8 mb-2 text-foreground/90">4.2 Position-Weighted Impression</h3>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  To model attention decay across sentences:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    Imp<sub>pwc</sub>(c<sub>i</sub>, r) = (Σ<sub>s∈S_ci</sub> |s| · e<sup>-pos(s)/|S|</sup>) / (Σ<sub>s∈S_r</sub> |s|)
                  </code>
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  This approximates reading probability as a function of position in the generated text.
                </p>

                <h3 className="text-[18px] md:text-[20px] font-medium mt-8 mb-2 text-foreground/90">4.3 Subjective Impression</h3>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  <a href="https://en.wikipedia.org/wiki/Large_language_model" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">LLM</a>-based evaluators score each citation across six dimensions:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    Subj(c<sub>i</sub>) = [Rel, Inf, Uniq, Pos, Click, Div]<br />
                    Imp<sub>subj</sub>(c<sub>i</sub>) = Σ<sub>k</sub> w<sub>k</sub> · Subj<sub>k</sub>(c<sub>i</sub>)
                  </code>
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  where each weight <strong>w<sub>k</sub></strong> is normalized such that <strong>Σ<sub>i</sub> Imp(c<sub>i</sub>, r) = 1</strong>.
                </p>

                <h2 id="section-5" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>5. Optimization Objectives</span>
                  <a 
                    href="#section-5" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#section-5')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  The generative engine optimizes for expected answer quality:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    max<sub>r</sub> E[f(Imp(c<sub>i</sub>, r), Rel(c<sub>i</sub>, q, r))]
                  </code>
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Content creators, on the other hand, optimize visibility:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    max<sub>ci</sub> Imp(c<sub>i</sub>, r)
                  </code>
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  This dual optimization forms the basis of <a href="https://en.wikipedia.org/wiki/Search_engine_optimization" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">Generative Engine Optimization (GEO)</a>.
                </p>

                <h2 id="section-6" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>6. Measuring Visibility Change</span>
                  <a 
                    href="#section-6" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#section-6')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  After a content update, visibility improvement is defined as:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    Improve<sub>si</sub> = (Imp<sub>si</sub>(r') - Imp<sub>si</sub>(r)) / Imp<sub>si</sub>(r) × 100
                  </code>
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Empirically, factual enrichment and structural clarity yield the highest lifts, confirming that GEs reward grounded and information-dense content rather than keyword repetition.
                </p>

                <h2 id="section-7" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>7. Probabilistic Model of Answer Generation</span>
                  <a 
                    href="#section-7" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#section-7')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Each GE stage is a <a href="https://en.wikipedia.org/wiki/Stochastic_process" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">stochastic</a> mapping:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic whitespace-pre text-muted-foreground/90">
                    Q<sub>1</sub> ∼ p(Q<sub>1</sub> | q<sub>u</sub>; θ<sub>qr</sub>)
                    S ∼ p(S | Q<sub>1</sub>; θ<sub>ret</sub>)
                    Sum ∼ p(Sum | S; θ<sub>sum</sub>)
                    r ∼ p(r | q<sub>u</sub>, Sum; θ<sub>resp</sub>)
                  </code>
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  The overall likelihood of producing <strong>r</strong> given <strong>q<sub>u</sub></strong> is:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    p(r | q<sub>u</sub>) = Σ<sub>Q1,S,Sum</sub> p(Q<sub>1</sub> | q<sub>u</sub>) p(S | Q<sub>1</sub>) p(Sum | S) p(r | q<sub>u</sub>, Sum)
                  </code>
                </p>

                <h2 id="section-8" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>8. DAG Representation</span>
                  <a 
                    href="#section-8" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#section-8')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    q<sub>u</sub> → Q<sub>1</sub> → S → Sum → r
                  </code>
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Each node performs a transformation, and each edge defines a conditional probability distribution.
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Critical hyperparameters include fan-out size <strong>n</strong>, retrieval depth <strong>k</strong>, summarization ratio <strong>α</strong>, answer length <strong>L</strong>, and citation density <strong>d<sub>c</sub></strong>.
                </p>

                <h2 id="section-9" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>9. Why GEO Works</span>
                  <a 
                    href="#section-9" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#section-9')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Optimized content affects two conditional probabilities:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    Imp(s<sub>i</sub>, r) ∝ P(s<sub>i</sub> ∈ S | q<sub>u</sub>) × P(s<sub>i</sub> ∈ C<sub>t</sub> | s<sub>i</sub> ∈ S)
                  </code>
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  By improving both retrieval likelihood and synthesis attribution, GEO enables even lower-ranked sources to capture higher visibility in final <a href="https://en.wikipedia.org/wiki/Large_language_model" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">LLM</a> answers.
                </p>

                <h2 id="section-10" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>10. Multi-Turn Extension</span>
                  <a 
                    href="#section-10" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#section-10')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  For <a href="https://en.wikipedia.org/wiki/Chatbot" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">conversational engines</a>, context history <strong>H = ⟨(q<sub>t</sub>, r<sub>t</sub>)⟩<sub>t=1</sub><sup>T</sup></strong> conditions the next response:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    r<sub>T+1</sub> ∼ p(r<sub>T+1</sub> | H; θ)
                  </code>
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  This defines a temporal generative process that continuously updates latent context distributions.
                </p>

                <h2 id="section-11" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>11. Computational Characteristics</span>
                  <a 
                    href="#section-11" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#section-11')
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>
                </h2>
                
                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  If <strong>k</strong> is the number of retrieved sources and <strong>L</strong> is the total token length, then inference cost is approximately:
                </p>

                <p className="my-6">
                  <code className="text-[15px] font-mono bg-transparent p-0 italic text-muted-foreground/90">
                    O(k · L<sub>sum</sub> + L<sup>2</sup>)
                  </code>
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Summarization is linear in document size, while synthesis scales quadratically with <a href="https://en.wikipedia.org/wiki/Attention_(machine_learning)" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-2 hover:decoration-2">attention</a>, explaining why most engines restrict <strong>k ≤ 5</strong> and compress summaries aggressively.
                </p>

                <h2 id="section-12" className="group text-[28px] md:text-[30px] font-medium mt-10 mb-4 text-foreground scroll-mt-20 flex items-center gap-2">
                  <span>12. Summary</span>
                  <a 
                    href="#section-12" 
                    onClick={(e) => {
                      e.preventDefault()
                      window.history.pushState(null, '', '#section-12')
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
                        <th className="border border-border px-4 py-3 text-left font-medium text-sm text-foreground">Component</th>
                        <th className="border border-border px-4 py-3 text-left font-medium text-sm text-foreground">Role</th>
                        <th className="border border-border px-4 py-3 text-left font-medium text-sm text-foreground">Mathematical Form</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Query Reformulation</td>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Expand queries</td>
                        <td className="border border-border px-4 py-3 text-[15px] font-mono italic text-muted-foreground/90">Q<sub>1</sub> ∼ p(Q<sub>1</sub> | q<sub>u</sub>)</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Retrieval</td>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Fetch sources</td>
                        <td className="border border-border px-4 py-3 text-[15px] font-mono italic text-muted-foreground/90">S ∼ p(S | Q<sub>1</sub>)</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Summarization</td>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Compress documents</td>
                        <td className="border border-border px-4 py-3 text-[15px] font-mono italic text-muted-foreground/90">Sum ∼ p(Sum | S)</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Synthesis</td>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Generate response</td>
                        <td className="border border-border px-4 py-3 text-[15px] font-mono italic text-muted-foreground/90">r ∼ p(r | q<sub>u</sub>, Sum)</td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Impression</td>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Measure visibility</td>
                        <td className="border border-border px-4 py-3 text-[15px] font-mono italic text-muted-foreground/90">Imp<sub>wc</sub>, Imp<sub>pwc</sub>, Imp<sub>subj</sub></td>
                      </tr>
                      <tr>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Optimization</td>
                        <td className="border border-border px-4 py-3 text-[15.5px] md:text-base leading-[1.7] text-muted-foreground">Governs GE utility</td>
                        <td className="border border-border px-4 py-3 text-[15px] font-mono italic text-muted-foreground/90">max<sub>r</sub> E[f(Imp, Rel)]</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Generative engines are probabilistic pipelines that optimize for contextual answer quality under strict latency and memory constraints.
                </p>

                <p className="text-[15.5px] md:text-base leading-[1.7] mb-5 text-muted-foreground">
                  Understanding their mathematical structure is essential to improving your brand's visibility within AI-driven ecosystems.
                </p>

                <div className="mt-16 p-6 rounded-2xl bg-muted/50 border border-border text-center">
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    Want to know more about how Rankly is built to solve your visibility-to-conversion funnel?{" "}
                    <a href="https://cal.com/sj-rankly/30min" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-1 underline-offset-4 hover:decoration-2 ml-1">Schedule a demo today.</a>
                  </p>
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

