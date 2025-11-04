"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import * as d3 from "d3"
import { Chart } from "react-google-charts"
import { SiteHeader } from "@/components/site-header"
import { HeroCards } from "@/components/hero-cards"
import { Icon } from "@iconify/react"
import { FeatureBlocks } from "@/components/ui/feature-blocks"
import { VisibilityAnalyticsBlock } from "@/components/ui/visibility-analytics-block"
import { DepthOfMentionBlock } from "@/components/ui/depth-of-mention-block"
import { PlatformCard } from "@/components/ui/platform-card"
import { SentimentTrackingBlock } from "@/components/ui/sentiment-tracking-block"
import { CitationAnalyticsBlock } from "@/components/ui/citation-analytics-block"
import { TopicsUserPersonasBlock } from "@/components/ui/topics-user-personas-block"
import { ProductDemoSection } from "@/components/product-demo-section"
import { FAQSection2 } from "@/components/ui/faq-section-2"
import { RanklyFooter } from "@/components/rankly-footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

// AI vs Human Traffic Chart Component
function AIVsHumanTrafficChart() {
  const [isHovered, setIsHovered] = useState(false)
  const [activeItem, setActiveItem] = useState<number | null>(null)

  const baseData = [
    { label: "Human", ai: 68, human: 32 },
    { label: "Bot", ai: 38, human: 62 },
    { label: "Crawler", ai: 28, human: 72 }
  ]

  // Add delta effects on hover - similar to Platform block
  const data = baseData.map((item, index) => ({
    ...item,
    ai: isHovered ? item.ai + ((index + 1) * 20) : item.ai,
    human: isHovered ? item.human - ((index + 1) * 20) : item.human
  }))

  return (
    <div className="h-[250px] w-[555px] bg-background rounded-lg border border-border/30 mx-auto">
      <div 
        className="w-full h-full relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        <div className="space-y-4 p-4">
          {data.map((item, index) => (
            <motion.div 
              key={index} 
              className="space-y-2 group cursor-pointer"
              initial={{ scale: 1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              onMouseEnter={() => setActiveItem(index)}
              onMouseLeave={() => setActiveItem(null)}
            >
               {/* Label */}
               <div className="flex justify-start items-center">
                 <motion.span 
                   className="text-foreground text-sm font-medium"
                   animate={{
                     color: activeItem === index ? "hsl(var(--primary))" : "inherit",
                     transition: { duration: 0.2 }
                   }}
                 >
                   {item.label}
                 </motion.span>
               </div>
              
              {/* Horizontal Bar Container */}
              <div className="relative w-full h-8 bg-muted rounded-md overflow-hidden border border-border/30">
                {/* AI Traffic Bar */}
                <motion.div 
                  className="absolute left-0 top-0 h-full rounded-l-md relative"
                  style={{ 
                    width: `${item.ai}%`,
                    background: "linear-gradient(to right, var(--background), var(--muted))",
                    boxShadow: "inset 0 0 10px var(--foreground)",
                    border: "1px solid var(--foreground)"
                  }}
                  animate={{
                    width: `${item.ai}%`,
                    transition: { 
                      duration: 1.5, 
                      ease: "easeInOut"
                    }
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "inset 0 0 15px var(--foreground)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-foreground/5"></div>
                </motion.div>
                
                {/* Human Traffic Bar */}
                <motion.div 
                  className="absolute right-0 top-0 h-full rounded-r-md relative"
                  style={{ 
                    width: `${item.human}%`,
                    background: "linear-gradient(to left, var(--muted), var(--background))",
                    boxShadow: "inset 0 0 8px var(--foreground)",
                    border: "1px solid var(--foreground)"
                  }}
                  animate={{
                    width: `${item.human}%`,
                    transition: { 
                      duration: 1.5, 
                      ease: "easeInOut"
                    }
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "inset 0 0 12px var(--foreground)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-foreground/3"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  )
}

// Page Performance Chart Component
function PagePerformanceChart() {
  const [isHovered, setIsHovered] = useState(false)
  
  const pageData = [
    {
      title: "Project Management Tools",
      url: "https://productivity.com/tools",
      sessions: 67,
      platforms: ["ChatGPT", "Claude", "Gemini"]
    },
    {
      title: "SaaS Development Guide",
      url: "https://startupguide.com/dev",
      sessions: 54,
      platforms: ["ChatGPT", "Perplexity"]
    },
    {
      title: "AI Customer Support",
      url: "https://techsolutions.ai/support",
      sessions: 43,
      platforms: ["Gemini", "Microsoft Copilot"]
    },
    {
      title: "E-commerce Marketing",
      url: "https://marketingpro.com/ecommerce",
      sessions: 38,
      platforms: ["Perplexity"]
    },
    {
      title: "Cloud Security Best Practices",
      url: "https://cloudsecurity.org/practices",
      sessions: 29,
      platforms: ["ChatGPT", "Claude", "Gemini", "Microsoft Copilot"]
    },
    {
      title: "Machine Learning Algorithms",
      url: "https://datascience.edu/ml",
      sessions: 24,
      platforms: ["ChatGPT", "Gemini"]
    }
  ]

  // Random order for default view
  const randomData = [...pageData].sort(() => Math.random() - 0.5)
  
  // Sort data by sessions in descending order for hover
  const sortedData = [...pageData].sort((a, b) => b.sessions - a.sessions)

  return (
    <div 
      className="w-[555px] bg-background rounded-lg border border-border/30 mx-auto overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full pt-0 pb-2.5 px-2.5">
        {/* Data Rows */}
        <div className="space-y-1.5">
          {(isHovered ? sortedData : randomData).map((page, index) => (
            <motion.div 
              key={page.title} 
              className="rounded-sm backdrop-blur-sm shadow-sm" 
              style={{ background: "linear-gradient(to top, var(--background), var(--muted))", border: "1px solid hsl(var(--foreground) / 0.4)", boxShadow: "0 20px 60px hsl(var(--foreground) / 1.0)" }}
              layout
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut",
                delay: index * 0.15 
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="py-1.5 px-2">
                <div className="flex items-center gap-2 overflow-hidden">

                  {/* Column 1 - Page Name and URL */}
                  <div className="flex-1 min-w-0 truncate max-w-[calc(100%-120px)]">
                    <h4 className="text-xs font-semibold text-foreground truncate mb-0 leading-tight">
                      {page.title}
                    </h4>
                    <p className="text-[10px] text-muted-foreground truncate mt-0 leading-tight">
                      {page.url}
                    </p>
                  </div>

                  {/* Column 2 - Number (Closer to text) */}
                  <div className="flex-shrink-0 text-right w-[22px]">
                    <span className="text-xs font-medium text-foreground">
                      {page.sessions}
                    </span>
                  </div>

                  {/* Column 3 - Favicons (snug + visible) */}
                  <div className="flex items-center gap-[3px] flex-shrink-0 overflow-visible">
                    {page.platforms.map((platform, i) => {
                      const getDomain = (p: string) => {
                        switch (p) {
                          case "ChatGPT": return "openai.com"
                          case "Claude": return "claude.ai"
                          case "Gemini": return "gemini.google.com"
                          case "Perplexity": return "perplexity.ai"
                          case "Microsoft Copilot": return "copilot.microsoft.com"
                          default: return "openai.com"
                        }
                      }
                      return (
                        <img
                          key={i}
                          src={`https://www.google.com/s2/favicons?domain=${getDomain(platform)}&sz=32`}
                          alt={platform}
                          className="w-4 h-4 rounded-md object-contain flex-shrink-0"
                          title={platform}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Journey Mapping Chart Component - Google Charts Sankey Diagram
function JourneyMappingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  // Prepare data for Google Charts Sankey format
  // Format: [['From', 'To', 'Weight'], ...]
  const sankeyData = [
    ['From', 'To', 'Weight'],
    ['ChatGPT', 'Home', 20],
    ['ChatGPT', 'Tools', 15],
    ['ChatGPT', 'Pricing', 10],
    ['Gemini', 'Home', 12],
    ['Gemini', 'Tools', 10],
    ['Gemini', 'About', 8],
    ['Gemini', 'Contact', 2],
    ['Claude', 'Tools', 8],
    ['Claude', 'Pricing', 12],
    ['Claude', 'About', 6],
    ['Claude', 'Contact', 2]
  ]

  const platforms = ['ChatGPT', 'Gemini', 'Claude']
  const pages = [
    { name: 'Home', slug: '/home' },
    { name: 'Tools', slug: '/tools' },
    { name: 'Pricing', slug: '/pricing' },
    { name: 'About', slug: '/about' },
    { name: 'Contact', slug: '/contact' }
  ]

  // Add CSS to make chart visible, assign colors per platform, and disable tooltips
  useEffect(() => {
    // 1️⃣ Inject a global style to hide tooltips anywhere in the document
    const style = document.createElement('style')
    style.textContent = `
      /* Hide Google Charts tooltip globally */
      div[role="tooltip"],
      .google-visualization-tooltip {
        display: none !important;
        pointer-events: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
    `
    document.head.appendChild(style)

    // Set colors for each platform's links
    const colorMap: { [key: string]: string } = {
      'ChatGPT': 'rgba(25, 195, 125, 0.8)',    // Green for ChatGPT
      'Gemini': 'rgba(219, 39, 119, 0.8)',     // Pink for Gemini
      'Claude': 'rgba(79, 70, 229, 0.8)'       // Indigo for Claude
    }

    // Helper function to blend colors based on weights
    const blendColors = (colors: string[], weights: number[]): string => {
      if (colors.length === 0) return 'rgba(255, 255, 255, 0.6)'
      if (colors.length === 1) return colors[0]

      const totalWeight = weights.reduce((sum, w) => sum + w, 0)
      let r = 0, g = 0, b = 0, a = 0

      colors.forEach((color, i) => {
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
        if (match) {
          const weight = weights[i] / totalWeight
          r += parseFloat(match[1]) * weight
          g += parseFloat(match[2]) * weight
          b += parseFloat(match[3]) * weight
          a += (parseFloat(match[4] || '1')) * weight
        }
      })

      return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(2)})`
    }

    // 2️⃣ Watch for chart render and forcibly remove tooltip elements
    const interval = setInterval(() => {
      const globalTooltips = document.querySelectorAll('div[role="tooltip"], .google-visualization-tooltip')
      if (globalTooltips.length > 0) {
        globalTooltips.forEach(el => el.remove())
      }

      // Also apply colors while we're here
      const container = document.querySelector('.sankey-container')
      if (container) {
        // Color the links
        const links = Array.from(container.querySelectorAll('svg g path'))
        links.forEach((link, index) => {
          const platform = index < 3 ? 'ChatGPT' : index < 6 ? 'Gemini' : 'Claude'
          const color = colorMap[platform]
          if (color && link instanceof SVGElement) {
            link.setAttribute('fill', color)
            link.setAttribute('stroke', color)
          }
        })

        // Color the nodes
        const rects = Array.from(container.querySelectorAll('svg g rect'))
        rects.forEach((rect, index) => {
          if (index < 3) {
            // Color the starting nodes (first 3)
            const platforms = ['ChatGPT', 'Gemini', 'Claude']
            const color = colorMap[platforms[index]]
            if (color && rect instanceof SVGElement) {
              rect.setAttribute('fill', color)
              rect.setAttribute('stroke', color)
            }
          } else {
            // Color the end nodes based on incoming flows
            const pageIndex = index - 3
            const page = pages[pageIndex]
            if (page) {
              const incomingFlows = sankeyData
                .slice(1) // Skip header
                .filter((row: any) => row[1] === page.name)
                .map((row: any) => ({
                  platform: row[0],
                  weight: row[2]
                }))

              if (incomingFlows.length > 0) {
                const colors = incomingFlows.map(f => colorMap[f.platform] || 'rgba(255,255,255,0.6)')
                const weights = incomingFlows.map(f => f.weight)
                const blendedColor = blendColors(colors, weights)
                
                if (rect instanceof SVGElement) {
                  rect.setAttribute('fill', blendedColor)
                  rect.setAttribute('stroke', blendedColor)
                }
              }
            }
          }
        })
      }
    }, 500)

    // 3️⃣ Also disable interactivity to prevent re-creation
    const timer = setTimeout(() => {
      const container = document.querySelector('.sankey-container')
      if (container) {
        const svg = container.querySelector('svg')
        if (svg) svg.style.pointerEvents = 'none'
      }
    }, 1000)

    return () => {
      document.head.removeChild(style)
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [sankeyData, pages])

  const options = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'none' },
    enableInteractivity: false,
    legend: { position: 'none' },
    sankey: {
      node: {
        label: {
          fontSize: 0,
          color: 'transparent'
        },
        nodePadding: 25,
        width: 20,
        interactivity: false
      },
      link: {
        colorMode: 'gradient'
      }
    }
  }

  return (
    <div className="h-[450px] w-[555px] bg-background rounded-lg border border-border/30 mx-auto mt-4">
      <div className="w-full h-full pt-0 pb-6 px-0">
        <div className="relative h-[400px] w-full mt-4">
          {/* Left side - Platform labels aligned to node centers */}
          <div className="absolute left-0 top-0 w-16 z-10 h-[400px]">
            {platforms.map((platform, index) => {
              // auto-centered positions for 3 nodes, based on total height
              const totalHeight = 400
              const nodeHeight = totalHeight / platforms.length
              const centerY = nodeHeight * index + nodeHeight / 2

              return (
                <div
                  key={platform}
                  className="absolute text-xs font-medium text-foreground"
                  style={{
                    top: `${centerY}px`,
                    transform: "translateY(-50%)",
                  }}
                >
                  {platform}
                </div>
              )
            })}
          </div>
          
          {/* Chart in the middle */}
          <div ref={chartContainerRef} className="absolute left-16 right-32 top-0 bottom-0 z-0 sankey-container" style={{ minHeight: '400px' }}>
            <Chart
              chartType="Sankey"
              width="100%"
              height="400px"
              data={sankeyData}
              options={options}
              loader={<div className="text-foreground">Loading chart...</div>}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>
          
          {/* Right side - Page labels aligned to node centers */}
          <div className="absolute right-0 top-0 w-32 z-10 h-[400px]">
            {pages.map((page, index) => {
              const totalHeight = 400
              const nodeHeight = totalHeight / pages.length
              const centerY = nodeHeight * index + nodeHeight / 2

              // Use different vertical alignment for Pricing and About only
              const translateY = (index === 2 || index === 3) ? "100%" : "0%"

              return (
                <div
                  key={page.name}
                  className="absolute text-left"
                  style={{
                    top: `${centerY}px`,
                    transform: `translateY(${translateY})`,
                    left: '4px',
                    whiteSpace: "nowrap",
                  }}
                >
                  <div className="text-xs font-medium text-foreground mb-0.5">{page.name}</div>
                  <div className="text-[10px] text-muted-foreground leading-tight">{page.slug}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// Professional Choropleth Map Component using D3.js
function GeoDeviceBreakdownChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; country: string; value: number } | null>(null)
  
  // Traffic data for countries
  const trafficData = [
    { name: "United States", code: "USA", traffic: 35 },
    { name: "United Kingdom", code: "GBR", traffic: 18 },
    { name: "Canada", code: "CAN", traffic: 12 },
    { name: "Germany", code: "DEU", traffic: 10 },
    { name: "Australia", code: "AUS", traffic: 8 },
    { name: "France", code: "FRA", traffic: 7 },
    { name: "Japan", code: "JPN", traffic: 6 },
    { name: "India", code: "IND", traffic: 4 }
  ]

  // Simplified world map geoJSON data
  const worldMapData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "United States", code: "USA" },
        geometry: {
          type: "Polygon",
          coordinates: [[[-125, 25], [-66, 25], [-66, 49], [-125, 49], [-125, 25]]]
        }
      },
      {
        type: "Feature", 
        properties: { name: "United Kingdom", code: "GBR" },
        geometry: {
          type: "Polygon",
          coordinates: [[[-8, 50], [2, 50], [2, 61], [-8, 61], [-8, 50]]]
        }
      },
      {
        type: "Feature",
        properties: { name: "Canada", code: "CAN" },
        geometry: {
          type: "Polygon", 
          coordinates: [[[-140, 42], [-52, 42], [-52, 84], [-140, 84], [-140, 42]]]
        }
      },
      {
        type: "Feature",
        properties: { name: "Germany", code: "DEU" },
        geometry: {
          type: "Polygon",
          coordinates: [[[6, 47], [15, 47], [15, 55], [6, 55], [6, 47]]]
        }
      },
      {
        type: "Feature",
        properties: { name: "Australia", code: "AUS" },
        geometry: {
          type: "Polygon",
          coordinates: [[[113, -44], [154, -44], [154, -10], [113, -10], [113, -44]]]
        }
      },
      {
        type: "Feature",
        properties: { name: "France", code: "FRA" },
        geometry: {
          type: "Polygon",
          coordinates: [[[-5, 42], [8, 42], [8, 51], [-5, 51], [-5, 42]]]
        }
      },
      {
        type: "Feature",
        properties: { name: "Japan", code: "JPN" },
        geometry: {
          type: "Polygon",
          coordinates: [[[129, 31], [146, 31], [146, 46], [129, 46], [129, 31]]]
        }
      },
      {
        type: "Feature",
        properties: { name: "India", code: "IND" },
        geometry: {
          type: "Polygon",
          coordinates: [[[68, 6], [97, 6], [97, 37], [68, 37], [68, 6]]]
        }
      }
    ]
  }

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove() // Clear previous renders

    const width = 500
    const height = 300

    // Create projection
    const projection = d3.geoMercator()
      .scale(width / 2 / Math.PI)
      .center([0, 20])
      .translate([width / 2, height / 2])

    // Create path generator
    const path = d3.geoPath().projection(projection)

    // Create color scale
    const maxTraffic = Math.max(...trafficData.map(d => d.traffic))
    const colorScale = d3.scaleLinear<string>()
      .domain([0, maxTraffic])
      .range(["rgba(255,255,255,0.1)", "rgba(255,255,255,0.9)"])

    // Add glow filter
    const defs = svg.append("defs")
    const filter = defs.append("filter")
      .attr("id", "glow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%")

    filter.append("feGaussianBlur")
      .attr("stdDeviation", "3")
      .attr("result", "coloredBlur")

    const feMerge = filter.append("feMerge")
    feMerge.append("feMergeNode").attr("in", "coloredBlur")
    feMerge.append("feMergeNode").attr("in", "SourceGraphic")

    // Draw countries
    svg.selectAll(".country")
      .data(worldMapData.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", path)
      .attr("fill", (d: any) => {
        const countryData = trafficData.find(c => c.code === d.properties.code)
        return countryData ? colorScale(countryData.traffic) : "rgba(255,255,255,0.05)"
      })
      .attr("stroke", "rgba(255,255,255,0.3)")
      .attr("stroke-width", 1)
      .attr("opacity", (d: any) => {
        const countryData = trafficData.find(c => c.code === d.properties.code)
        return countryData ? 0.8 : 0.3
      })
      .style("cursor", "pointer")
      .on("mouseenter", function(event, d: any) {
        const countryData = trafficData.find(c => c.code === d.properties.code)
        if (countryData) {
          setHoveredCountry(d.properties.code)
          
          // Get mouse position for tooltip
          const [x, y] = d3.pointer(event, svgRef.current)
          setTooltip({
            x: x + 10,
            y: y - 10,
            country: countryData.name,
            value: countryData.traffic
          })
        }
        
        // Add glow effect
        d3.select(this)
          .attr("filter", "url(#glow)")
          .transition()
          .duration(200)
          .attr("opacity", 1)
      })
      .on("mouseleave", function(event, d: any) {
        setHoveredCountry(null)
        setTooltip(null)
        
        // Remove glow effect
        d3.select(this)
          .attr("filter", null)
          .transition()
          .duration(200)
          .attr("opacity", (d: any) => {
            const countryData = trafficData.find(c => c.code === d.properties.code)
            return countryData ? 0.8 : 0.3
          })
      })

    // Add country labels
    svg.selectAll(".country-label")
      .data(worldMapData.features)
      .enter()
      .append("text")
      .attr("class", "country-label")
      .attr("x", (d: any) => {
        const centroid = path.centroid(d)
        return centroid[0]
      })
      .attr("y", (d: any) => {
        const centroid = path.centroid(d)
        return centroid[1]
      })
      .attr("text-anchor", "middle")
      .attr("fill", "rgba(0,0,0,0.8)")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .text((d: any) => d.properties.code)
      .style("pointer-events", "none")

  }, [])

  return (
    <div className="h-[450px] w-[555px] bg-background rounded-lg border border-border/30 mx-auto">
      <div className="w-full h-full p-6">
        <div className="h-full">
          
          {/* Professional Choropleth Map */}
          <div className="w-full">
            <h4 className="text-sm font-semibold text-foreground mb-4">Geographic Distribution</h4>
            <div className="relative h-[350px] w-full">
              <svg 
                ref={svgRef}
                className="w-full h-full" 
                viewBox="0 0 500 300"
                style={{ background: "rgba(255,255,255,0.02)" }}
              />
              
              {/* Tooltip */}
              {tooltip && (
                <motion.div
                  className="absolute bg-background border border-foreground/20 rounded-lg px-3 py-2 shadow-lg z-10"
                  style={{ left: tooltip.x, top: tooltip.y }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="text-xs font-semibold text-foreground">
                    {tooltip.country}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {tooltip.value}% AI Traffic
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Platform Insights Chart Component
function PlatformInsightsChart() {
  const [isHovered, setIsHovered] = useState(false)
  const [activePoint, setActivePoint] = useState<number | null>(null)

  const platforms = [
    { name: "Meta", value: 92, icon: "https://www.google.com/s2/favicons?domain=meta.com&sz=32" },
    { name: "OpenAI", value: 92, icon: "https://www.google.com/s2/favicons?domain=openai.com&sz=32" },
    { name: "Apple", value: 92, icon: "https://www.google.com/s2/favicons?domain=apple.com&sz=32" },
    { name: "Google", value: 85, icon: "https://www.google.com/s2/favicons?domain=google.com&sz=32" },
    { name: "Microsoft", value: 78, icon: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=32" },
    { name: "Amazon", value: 65, icon: "https://www.google.com/s2/favicons?domain=amazon.com&sz=32" }
  ]

  // Generate sine wave points
  const generateSineWave = () => {
    const points = []
    for (let i = 0; i < 100; i++) {
      const x = (i / 99) * 400 // Width of 400px
      const y = 150 + Math.sin(i * 0.1) * 60 + Math.sin(i * 0.05) * 30 // Increased amplitude for larger curve
      points.push({ x, y })
    }
    return points
  }

  const wavePoints = generateSineWave()
  const pathData = wavePoints.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ')

  return (
    <div className="h-[250px] w-[555px] bg-background rounded-lg border border-border/30 mx-auto">
      <div 
        className="w-full h-full relative p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between items-center text-xs text-muted-foreground">
          <span className="text-xs font-medium">Sessions</span>
          <motion.span 
            animate={isHovered ? { y: [0, -40] } : { y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            210
          </motion.span>
          <motion.span 
            animate={isHovered ? { y: [0, -40] } : { y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
          >
            175
          </motion.span>
          <motion.span 
            animate={isHovered ? { y: [0, -40] } : { y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          >
            140
          </motion.span>
          <motion.span 
            animate={isHovered ? { y: [0, -40] } : { y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          >
            105
          </motion.span>
          <motion.span 
            animate={isHovered ? { y: [0, -40] } : { y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
          >
            70
          </motion.span>
        </div>

        {/* Right Y-axis labels - Platforms */}
        <div className="absolute right-0 top-0 h-full flex flex-col justify-between items-center text-xs text-muted-foreground">
          <span className="text-xs font-medium">Platforms</span>
          <motion.div 
            className="flex items-center justify-center"
            animate={isHovered ? { y: [0, -40] } : { y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <img src="https://www.google.com/s2/favicons?domain=openai.com&sz=64" alt="OpenAI" className="w-8 h-8 rounded-lg" />
          </motion.div>
          <motion.div 
            className="flex items-center justify-center"
            animate={isHovered ? { y: [0, -40] } : { y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
          >
            <img src="https://www.google.com/s2/favicons?domain=perplexity.ai&sz=64" alt="Perplexity" className="w-8 h-8 rounded-lg" />
          </motion.div>
          <motion.div 
            className="flex items-center justify-center"
            animate={isHovered ? { y: [0, -40] } : { y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          >
            <img src="https://www.google.com/s2/favicons?domain=gemini.google.com&sz=64" alt="Gemini" className="w-8 h-8 rounded-lg" />
          </motion.div>
          <motion.div 
            className="flex items-center justify-center"
            animate={isHovered ? { y: [0, -40] } : { y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          >
            <img src="https://www.google.com/s2/favicons?domain=copilot.microsoft.com&sz=64" alt="Microsoft Copilot" className="w-8 h-8 rounded-lg" />
          </motion.div>
          <motion.div 
            className="flex items-center justify-center"
            animate={isHovered ? { y: [0, -40] } : { y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
          >
            <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=64" alt="Claude" className="w-8 h-8 rounded-lg" />
          </motion.div>
        </div>

        {/* Sine Wave */}
        <div className="relative w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            {/* Glow effect definitions */}
            <defs>
              <linearGradient id="whiteGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="50%" stopColor="white" stopOpacity="0.3" />
                <stop offset="100%" stopColor="white" stopOpacity="0.8" />
              </linearGradient>
              <filter id="whiteGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Main path */}
            <path
              d={pathData}
              stroke="var(--foreground)"
              strokeWidth="2"
              fill="none"
              className={`opacity-80 transition-all duration-1000 ${isHovered ? 'opacity-100' : ''}`}
            />
            
            {/* White glow overlay */}
            <path
              d={pathData}
              stroke="url(#whiteGlowGradient)"
              strokeWidth="6"
              fill="none"
              filter="url(#whiteGlow)"
              className={`opacity-0 transition-all duration-1000 ${isHovered ? 'opacity-100' : ''}`}
            />
            
          </svg>
        </div>
      </div>
    </div>
  )
}

// Traffic Analytics specific HeroHeader component
function TrafficHeroHeader({ className }: { className?: string }) {
  return (
    <div className={cn("text-center mb-12 space-y-3", className)}>
      <div className="inline-block px-4 py-1.5 text-sm font-medium text-white bg-muted border border-white/30 rounded-full mb-4" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)' }}>
        Traffic Analytics
      </div>
      <h2 className="text-3xl md:text-4xl font-bold">
        See How AI Mentions Turn into Conversions
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Rankly connects your LLM visibility with web analytics, revealing which AI Platforms and queries drive real users, clicks, and revenue to your site
      </p>
    </div>
  )
}

// Traffic Analytics specific HeroCards component
function TrafficHeroCards({ className }: { className?: string }) {
  const items = [
    { 
      icon: "mdi:web", 
      title: "Track Traffic Sources",
      description: "See how AI-generated visibility translates into real website sessions from different channels."
    },
    { 
      icon: "mdi:account-group", 
      title: "Compare AI vs Human Visitors",
      description: "Understand how much of your traffic comes from humans versus AI crawlers - in real time."
    },
    { 
      icon: "mdi:chart-bar", 
      title: "Measure Engagement Quality",
      description: "Analyze bounce rate, session duration, and conversions to gauge LLM-sourced user performance."
    },
    { 
      icon: "mdi:star-outline", 
      title: "Discover Top Performing Pages",
      description: "Identify which pages receive the most AI-driven visitors and convert best across devices."
    },
  ]

  return (
    <div className={cn("relative", className)}>
      {/* Horizontal rulers - positioned at container edges (extend beyond padding to touch vertical rulers) */}
      <div className="absolute top-0 left-[-1.5rem] right-[-1.5rem] md:left-[-2rem] md:right-[-2rem] h-[1.5px] bg-border opacity-90 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-[-1.5rem] right-[-1.5rem] md:left-[-2rem] md:right-[-2rem] h-[1.5px] bg-border opacity-90 pointer-events-none z-0"></div>
      
      <div className="grid gap-0 md:grid-cols-4 relative py-12 -mx-8 md:-mx-10">
        {/* Grid Ruler Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Vertical dividers */}
          <div className="absolute inset-y-0 left-1/4 w-[1.5px] bg-border opacity-90"></div>
          <div className="absolute inset-y-0 left-2/4 w-[1.5px] bg-border opacity-90"></div>
          <div className="absolute inset-y-0 left-3/4 w-[1.5px] bg-border opacity-90"></div>
        </div>

        {/* Feature Cards */}
        {items.map(({ icon, title, description }, i) => (
          <div
            key={i}
            className="px-8 py-6 relative z-10"
          >
            <div className="mb-4">
              <Icon icon={icon} className="w-6 h-6 text-brand/60" />
            </div>
            <h3 className="text-sm font-semibold mb-3">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Traffic Analytics specific FeatureBlocks component
function TrafficFeatureBlocks() {
  const defaultBlocks = [
    {
      title: "AI vs Human Traffic",
      description: "See how much of your site traffic comes from real users versus AI crawlers and bots.",
      content: <AIVsHumanTrafficChart />,
      height: "auto",
    },
    {
      title: "Platform Insights",
      description: "Compare how different AI engines drive measurable website traffic.",
      content: <PlatformInsightsChart />,
      height: "auto",
    },
    {
      title: "Page Performance",
      description: "Identify which pages attract the most AI-driven sessions and how visitors engage.",
      content: <PagePerformanceChart />,
      height: "auto",
    },
    {
      title: "Journey Mapping",
      description: "Visualize the full path from AI answers to on-site actions across entry points.",
      content: <JourneyMappingChart />,
      height: "auto",
    },
  ];

  return (
    <section className="py-0 px-0 bg-background">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center py-12 px-6">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect AI visibility to real website performance and user behavior.
          </p>
        </div>

        {/* 2x2 Grid — with horizontal rulers above each block title */}
        <div className="relative px-6 overflow-visible">
          {/* Vertical Divider between columns */}
          <div className="absolute inset-y-0 left-1/2 w-[1.5px] bg-border opacity-90 transform -translate-x-1/2 z-20"></div>
          
          {/* Top Row */}
          <div className="relative">
            {/* Horizontal rulers positioned relative to parent container, aligned with titles - extend beyond padding to touch edges */}
            <div className="absolute top-0 left-[-1.5rem] h-[1.5px] bg-border opacity-90 z-10" style={{ right: 'calc(50% - 0.75px)' }}></div>
            <div className="absolute top-0 right-[-1.5rem] h-[1.5px] bg-border opacity-90 z-10" style={{ left: 'calc(50% + 0.75px)' }}></div>
            {/* Bottom horizontal rulers */}
            <div className="absolute bottom-0 left-[-1.5rem] h-[1.5px] bg-border opacity-90 z-10" style={{ right: 'calc(50% - 0.75px)' }}></div>
            <div className="absolute bottom-0 right-[-1.5rem] h-[1.5px] bg-border opacity-90 z-10" style={{ left: 'calc(50% + 0.75px)' }}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center">
              {defaultBlocks.slice(0, 2).map((block, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="px-6 py-12 relative"
                >
                  <h3 className="text-lg font-semibold mb-1">{block.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {block.description}
                  </p>
                  <div className="overflow-visible">
                    {block.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Bottom Row */}
          <div className="relative">
            {/* Horizontal rulers positioned relative to parent container, aligned with titles - extend beyond padding to touch edges */}
            <div className="absolute top-0 left-[-1.5rem] h-[1.5px] bg-border opacity-90 z-10" style={{ right: 'calc(50% - 0.75px)' }}></div>
            <div className="absolute top-0 right-[-1.5rem] h-[1.5px] bg-border opacity-90 z-10" style={{ left: 'calc(50% + 0.75px)' }}></div>
            {/* Bottom horizontal rulers */}
            <div className="absolute bottom-0 left-[-1.5rem] h-[1.5px] bg-border opacity-90 z-10" style={{ right: 'calc(50% - 0.75px)' }}></div>
            <div className="absolute bottom-0 right-[-1.5rem] h-[1.5px] bg-border opacity-90 z-10" style={{ left: 'calc(50% + 0.75px)' }}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center">
              {defaultBlocks.slice(2).map((block, index) => (
                <motion.div
                  key={index + 2}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="px-6 py-12 relative"
                >
                  <h3 className="text-lg font-semibold mb-1">{block.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {block.description}
                  </p>
                  <div className="overflow-visible">
                    {block.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TrafficAnalyticsPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Header Section */}
      <SiteHeader />
      
      {/* Container with rulers for entire page */}
      <div className="mx-auto max-w-7xl relative">
        
        {/* Hero Section - Broken into 3 parts */}
        <section className="py-16 bg-background min-h-[1000px]">
          <div className="max-w-6xl mx-auto px-6">
            {/* 1. Hero Header - Title and Description */}
            <TrafficHeroHeader />
            
            {/* 2. Hero Video - Traffic Analytics Demo */}
            <div className="mt-12 -mx-8 md:-mx-10">
              <div className="relative rounded-xl overflow-hidden bg-muted/20 border border-border/50 w-full">
                <video
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  key="traffic-analytics-v2"
                >
                  <source src="/traffic-analytics.webm?v=2" type="video/webm" />
                </video>
              </div>
            </div>
            
          </div>
          
          {/* 3. Hero Cards - 4 Feature Cards with Grid Rulers (breaks out of container to match homepage) */}
          <div className="mx-auto max-w-7xl relative px-6 md:px-8">
            <TrafficHeroCards />
          </div>
        </section>
        
        {/* Feature Blocks Section - 6 Analytics Blocks */}
        <div className="relative">
          <div className="relative z-10">
            <TrafficFeatureBlocks />
          </div>
        </div>

        {/* Product Demo Section */}
        <ProductDemoSection />

        {/* FAQ Section */}
        <FAQSection2 />

        {/* Footer Section 1 - Rankly Footer */}
        <RanklyFooter />


        {/* Theme Toggle at bottom */}
        <div className="fixed bottom-6 right-6 z-50">
          <ThemeToggle />
        </div>
      </div>
    </main>
  )
}
 