"use client"

import { SiteHeader } from "@/components/site-header"
import { HeroHeader } from "@/components/hero-header"
import { HeroCards } from "@/components/hero-cards"
import { FeatureBlocks } from "@/components/ui/feature-blocks"
import { ProductDemoSection } from "@/components/product-demo-section"
import { FAQSection2 } from "@/components/ui/faq-section-2"
import { RanklyFooter } from "@/components/rankly-footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "motion/react"

export default function AnswerEngineAnalyticsPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground relative">
      {/* Header Section */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SiteHeader />
      </motion.div>
      
      {/* Container with rulers for entire page */}
      <div className="mx-auto max-w-7xl relative">
        
        {/* Hero Section - Broken into 3 parts */}
        <section className="py-16 bg-background min-h-[1000px]">
          <div className="max-w-6xl mx-auto px-6">
            {/* 1. Hero Header - Title and Description */}
            <HeroHeader />
            
            {/* 2. Hero Video - Answer Engine Analytics Demo */}
            <div className="mt-12 -mx-8 md:-mx-10">
              <div className="relative rounded-xl overflow-hidden bg-muted/20 border border-border/50 w-full">
                <video
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  key="answer-engine-analytics-v2"
                >
                  <source src="/answer-engine-analytics.webm?v=2" type="video/webm" />
                </video>
              </div>
            </div>
          </div>
          
          {/* 3. Hero Cards - 4 Feature Cards with Grid Rulers (breaks out of container to match homepage) */}
          <div className="mx-auto max-w-7xl relative px-6 md:px-8">
            <HeroCards />
          </div>
        </section>
        
        {/* Feature Blocks Section - 6 Analytics Blocks */}
        <div className="relative">
          <FeatureBlocks />
        </div>

        {/* Product Demo Section */}
        <ProductDemoSection />

        {/* FAQ Section */}
        <FAQSection2 />

        {/* Footer Section - Rankly Footer */}
        <RanklyFooter />

        {/* Theme Toggle at bottom */}
        <div className="fixed bottom-6 right-6 z-50">
          <ThemeToggle />
        </div>
      </div>
    </main>
  )
}