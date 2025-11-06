"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect } from "react";

export const faqData = [
    {
      category: "General",
      questions: [
        {
          question: "What is Rankly?",
          answer: "Rankly is an Answer Engine Optimization (AEO) platform that helps businesses increase their visibility in AI-powered search engines like ChatGPT, Perplexity, and Claude. We help you build authority through third-party sources that AI engines trust and cite."
        },
        {
          question: "How does AEO differ from traditional SEO?",
          answer: "While SEO focuses on ranking in Google's search results, AEO optimizes for AI-powered answer engines. AEO requires different strategies like building authority through citations, creating comprehensive content that AI can reference, and understanding how AI engines evaluate and trust sources."
        },
        {
          question: "Do I need technical knowledge to use Rankly?",
          answer: "No technical knowledge is required. Rankly provides an intuitive dashboard that guides you through the AEO process. Our platform handles the technical aspects while you focus on creating valuable content and building authority."
        },
        {
          question: "Can I track my progress across multiple AI engines?",
          answer: "Yes! Rankly provides comprehensive analytics that track your visibility, influence, and citations across ChatGPT, Perplexity, Claude, and other major AI search engines. You can see exactly how your content is performing in each platform."
        },
        {
          question: "How quickly will I see results with Rankly?",
          answer: "Results vary depending on your current visibility and the strategies you implement. Some users see improvements in their citation counts within a few weeks, while comprehensive authority building typically shows significant results within 2-3 months. Our analytics dashboard tracks your progress in real-time."
        },
        {
          question: "What data sources does Rankly track?",
          answer: "Rankly tracks citations and mentions across major AI answer engines including ChatGPT, Perplexity, Claude, Gemini, Microsoft Copilot, Grok, and Deepseek. We monitor how these platforms reference your brand, products, or content in their responses."
        },
        {
          question: "Can I integrate Rankly with my existing analytics tools?",
          answer: "Yes, Rankly offers API access for enterprise plans and integrations with popular analytics platforms. You can export your data or set up automated reporting to sync with your existing workflow."
        },
        {
          question: "How does Rankly help me identify content gaps?",
          answer: "Rankly's analytics identify topics and user personas where you have zero citations. This helps you discover untapped opportunities to create content that fills those gaps and increases your visibility in AI engines."
        },
        {
          question: "What types of businesses benefit most from Rankly?",
          answer: "Rankly is ideal for businesses that want to be discovered through AI-powered search, including SaaS companies, content creators, e-commerce brands, professional services, and thought leaders. Any business that wants to establish authority in AI-generated answers will benefit."
        },
        {
          question: "How does Rankly handle data privacy and security?",
          answer: "Rankly takes data privacy seriously. We use industry-standard encryption, comply with GDPR and CCPA regulations, and never share your data with third parties. All data is stored securely and you maintain full control over your information."
        },
        {
          question: "Can I use Rankly for multiple brands or clients?",
          answer: "Yes, depending on your plan. Standard plans support multiple accounts, and enterprise plans offer white-label options for agencies managing multiple clients. Each account can track separate brands or projects independently."
        },
        {
          question: "What kind of support does Rankly provide?",
          answer: "Rankly offers email support for all plans, with priority support for higher-tier subscriptions. We also provide comprehensive documentation, tutorials, and best practices guides. Enterprise plans include dedicated account management and custom onboarding."
        }
      ]
    }
  ];

export function FAQSection2() {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rankly.ai'
    
    const faqPageJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.flatMap(section => 
        section.questions.map(q => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer,
          },
        }))
      ),
    }

    // Remove existing FAQ schema if present
    const existingScript = document.getElementById('faq-schema')
    if (existingScript) {
      existingScript.remove()
    }

    // Add FAQ schema
    const script = document.createElement('script')
    script.id = 'faq-schema'
    script.type = 'application/ld+json'
    script.text = JSON.stringify(faqPageJsonLd)
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById('faq-schema')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [])

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Introduction */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Frequently asked questions
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              We've gathered the most common questions about Rankly — from how it works to how it helps your brand grow. Still curious? <a href="https://cal.com/sj-rankly/30min" target="_blank" rel="noopener noreferrer" className="no-underline text-primary hover:text-primary/80 transition-colors">Contact us</a>.
            </p>
          </div>

          {/* Right Column - FAQ Items */}
          <div>
            {faqData.map((section, sectionIndex) => (
              <div key={section.category} className="mb-8">
                <h3 className="text-lg font-semibold mb-6">
                  {section.category}
                </h3>
                <Accordion type="multiple" className="w-full">
                  {section.questions.map((item, itemIndex) => {
                    const id = `${sectionIndex}-${itemIndex}`;
                    return (
                      <AccordionItem key={id} value={id}>
                        <AccordionTrigger className="text-left font-normal text-muted-foreground hover:text-foreground hover:no-underline">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="font-light text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
