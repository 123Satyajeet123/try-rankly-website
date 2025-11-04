"use client"

import { SiteHeader } from "@/components/site-header"
import { ThemeToggle } from "@/components/theme-toggle"
import { RanklyFooter } from "@/components/rankly-footer"
import { ProductDemoSection } from "@/components/product-demo-section"
import { FAQSection2 } from "@/components/ui/faq-section-2"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Icon } from "@iconify/react"
import { useEffect, useRef } from "react"
import * as d3 from "d3"

// Add custom animation styles
const styles = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-in-out;
  }
  @keyframes fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  .animate-fade-out {
    animation: fade-out 0.5s ease-in-out;
  }
  @keyframes scan-beam {
    0% { top: 0; }
    25% { top: 50%; }
    50% { top: 100%; }
    75% { top: 50%; }
    100% { top: 0; }
  }
  .animate-scan-beam {
    animation: scan-beam 4s ease-in-out infinite;
  }
  .group:hover .group-hover\:animate-scan-beam {
    animation: scan-beam 4s ease-in-out 2;
  }
  .group:hover .group-hover\:animate-scanning-pulse {
    animation: scanning-pulse 1.5s ease-in-out infinite;
  }
  .group:hover .group-hover\:animate-scanning-dots {
    animation: scanning-dots 2s ease-in-out infinite;
  }
  .group:hover .group-hover\:animate-fade-in {
    animation: fade-in 0.5s ease-in-out;
  }
  .group:hover .group-hover\:animate-fade-out {
    animation: fade-out 0.5s ease-in-out;
  }
  @keyframes scanning-pulse {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  .animate-scanning-pulse {
    animation: scanning-pulse 1.5s ease-in-out infinite;
  }
  @keyframes scanning-glow {
    0%, 100% { text-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
    50% { text-shadow: 0 0 15px rgba(59, 130, 246, 0.8), 0 0 25px rgba(59, 130, 246, 0.4); }
  }
  .animate-scanning-glow {
    animation: scanning-glow 2s ease-in-out infinite;
  }
  @keyframes scanning-dots {
    0%, 20% { opacity: 0; }
    25%, 45% { opacity: 1; }
    50%, 70% { opacity: 0; }
    75%, 95% { opacity: 1; }
    100% { opacity: 0; }
  }
  .animate-scanning-dots {
    animation: scanning-dots 2s ease-in-out infinite;
  }
  @keyframes scanning-disappear {
    0%, 90% { opacity: 1; }
    100% { opacity: 0; }
  }
  .animate-scanning-disappear {
    animation: scanning-disappear 8s ease-in-out forwards;
  }
  @keyframes content-cycle {
    0%, 40% { opacity: 1; }
    50%, 90% { opacity: 0; }
    100% { opacity: 1; }
  }
  .animate-content-cycle {
    animation: content-cycle 10s ease-in-out infinite;
  }
  @keyframes new-content-cycle {
    0%, 50% { opacity: 0; }
    60%, 90% { opacity: 1; }
    100% { opacity: 0; }
  }
  .animate-new-content-cycle {
    animation: new-content-cycle 10s ease-in-out infinite;
  }
  @keyframes pulse-line {
    0% { transform: translateX(-100%); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
  }
  .animate-pulse-line {
    animation: pulse-line 3s ease-in-out infinite;
  }
  @keyframes pulse-arrow {
    0%, 80% { opacity: 0; }
    90%, 100% { opacity: 1; }
  }
  .animate-pulse-arrow {
    animation: pulse-arrow 3s ease-in-out infinite;
  }
  @keyframes spin-slow {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
  @keyframes spin-reverse {
    from { transform: translate(-50%, -50%) rotate(360deg); }
    to { transform: translate(-50%, -50%) rotate(0deg); }
  }
  .animate-spin-reverse {
    animation: spin-reverse 15s linear infinite;
  }
  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
`

// Actionables specific components
function ActionablesHeroHeader() {
  return (
    <div className="text-center mb-12 space-y-3">
      <div className="inline-block px-4 py-1.5 text-sm font-medium text-white bg-muted border border-white/30 rounded-full mb-4" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)' }}>
        Actionables
      </div>
      <h2 className="text-3xl md:text-4xl font-bold">
        Turn insights into actionable strategies
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Get specific recommendations and strategies to improve your performance. Transform data into concrete steps for growth.
      </p>
    </div>
  )
}


function ActionablesHeroCards() {
  const items = [
    { 
      title: "Find Missing Opportunities",
      description: "Detect personas, topics, or keywords where your brand has zero citations and instantly plan content to fill those gaps.",
      icon: "mdi:lightbulb-on-outline"
    },
    { 
      title: "Fix Underperforming Pages",
      description: "Identify pages that get traffic but no citations and strengthen authority signals to surface in LLM answers.",
      icon: "mdi:wrench-outline"
    },
    { 
      title: "Optimize What Works",
      description: "Refresh well-performing content with advanced writing techniques to expand visibility across multiple AI models.",
      icon: "mdi:chart-line"
    },
    { 
      title: "Scale with Precision",
      description: "Use Rankly's nine proven writing frameworks to generate new, high-authority pages at scale.",
      icon: "mdi:arrow-expand-all"
    },
  ]

  return (
    <div className="relative">
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
        {items.map(({ title, description, icon }, i) => (
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

function NetworkGraph() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svg.node()?.clientWidth || 900;
    const height = svg.node()?.clientHeight || 450;

    // Add padding to keep nodes within bounds
    const padding = 15;
    const nodeRadius = 5;
    const minX = padding + nodeRadius;
    const maxX = width - padding - nodeRadius;
    const minY = padding + nodeRadius;
    const maxY = height - padding - nodeRadius;

    // Sample data (you can replace with dynamic data)
    const categories = ["Content Page", "Topic Cluster", "Core Topic", "Related Topic"];
    const colorMap: Record<string, string> = {
      "Content Page": "#6B6B6B", // gray
      "Topic Cluster": "#5B4BFF", // purple
      "Core Topic": "#B2556A", // maroon
      "Related Topic": "#F5A623", // orange
    };

    const nodes: d3.SimulationNodeDatum[] = d3.range(80).map((i) => ({
      id: i,
      group: categories[Math.floor(Math.random() * categories.length)],
      x: minX + Math.random() * (maxX - minX),
      y: minY + Math.random() * (maxY - minY),
    } as any));

    // Create interconnected graph - ensure all nodes are connected
    const links: any[] = [];
    
    // Create a spanning tree to ensure all nodes are connected (using node IDs)
    for (let i = 1; i < nodes.length; i++) {
      const sourceIdx = Math.floor(Math.random() * i);
      links.push({
        source: (nodes[sourceIdx] as any).id,
        target: (nodes[i] as any).id,
      });
    }
    
    // Add many more connections to create a dense interconnected network
    for (let i = 0; i < 150; i++) {
      const sourceIdx = Math.floor(Math.random() * nodes.length);
      let targetIdx = Math.floor(Math.random() * nodes.length);
      // Avoid self-loops
      while (targetIdx === sourceIdx) {
        targetIdx = Math.floor(Math.random() * nodes.length);
      }
      
      const sourceId = (nodes[sourceIdx] as any).id;
      const targetId = (nodes[targetIdx] as any).id;
      
      // Check if link already exists (using IDs)
      const exists = links.some((l: any) => 
        (l.source === sourceId && l.target === targetId) ||
        (l.source === targetId && l.target === sourceId)
      );
      
      if (!exists) {
        links.push({ source: sourceId, target: targetId });
      }
    }

    // Simulation - Keep it running dynamically
    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).distance(70).strength(0.3).id((d: any) => d.id))
      .force("charge", d3.forceManyBody().strength(-40))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(nodeRadius + 2))
      .alphaDecay(0.02) // Slower decay for continuous movement
      .velocityDecay(0.4) // Add velocity decay for smoother movement
      .on("tick", ticked)
      .on("end", () => {
        // Restart simulation when it ends to keep it moving
        setTimeout(() => {
          if (simulation.alpha() < 0.01) {
            simulation.alpha(0.3).restart();
          }
        }, 100);
      });
    
    // Keep simulation running continuously
    const keepMoving = setInterval(() => {
      if (simulation.alpha() < 0.01) {
        simulation.alpha(0.3).restart();
      }
    }, 2000);

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.2)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 0.8)
      .attr("class", "link")
      .style("transition", "all 0.2s ease");

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", nodeRadius)
      .attr("fill", (d: any) => colorMap[d.group])
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .style("cursor", "pointer")
      .style("transition", "all 0.15s ease")
      .on("mouseover", function(event: any, d: any) {
        // Intense highlight - much larger node
        d3.select(this)
          .attr("r", nodeRadius * 3.5)
          .attr("stroke-width", 4)
          .attr("stroke", "#fff")
          .style("filter", "drop-shadow(0 0 12px " + colorMap[d.group] + ")")
          .style("z-index", "1000");
        
        // Intensely highlight connected links - brighter and thicker
        link
          .attr("stroke-opacity", (l: any) => {
            const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
            const targetId = typeof l.target === 'object' ? l.target.id : l.target;
            return sourceId === d.id || targetId === d.id ? 1 : 0.02;
          })
          .attr("stroke-width", (l: any) => {
            const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
            const targetId = typeof l.target === 'object' ? l.target.id : l.target;
            return sourceId === d.id || targetId === d.id ? 3 : 0.5;
          })
          .attr("stroke", (l: any) => {
            const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
            const targetId = typeof l.target === 'object' ? l.target.id : l.target;
            return sourceId === d.id || targetId === d.id ? "#fff" : "#999";
          });
        
        // Intensely highlight connected nodes - scale up connected nodes
        node
          .attr("opacity", (n: any) => {
            const isConnected = links.some((l: any) => {
              const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
              const targetId = typeof l.target === 'object' ? l.target.id : l.target;
              return (sourceId === d.id && targetId === n.id) || 
                     (sourceId === n.id && targetId === d.id);
            });
            return isConnected || n.id === d.id ? 1 : 0.05;
          })
          .attr("r", (n: any) => {
            const isConnected = links.some((l: any) => {
              const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
              const targetId = typeof l.target === 'object' ? l.target.id : l.target;
              return (sourceId === d.id && targetId === n.id) || 
                     (sourceId === n.id && targetId === d.id);
            });
            if (n.id === d.id) return nodeRadius * 3.5;
            return isConnected ? nodeRadius * 1.8 : nodeRadius;
          })
          .attr("stroke-width", (n: any) => {
            const isConnected = links.some((l: any) => {
              const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
              const targetId = typeof l.target === 'object' ? l.target.id : l.target;
              return (sourceId === d.id && targetId === n.id) || 
                     (sourceId === n.id && targetId === d.id);
            });
            return isConnected || n.id === d.id ? 2.5 : 0.5;
          });
      })
      .on("mouseout", function(event: any, d: any) {
        // Reset node
        d3.select(this)
          .attr("r", nodeRadius)
          .attr("stroke-width", 0.5)
          .style("filter", "none")
          .style("z-index", "auto");
        
        // Reset links
        link
          .attr("stroke-opacity", 0.2)
          .attr("stroke-width", 0.8)
          .attr("stroke", "#999");
        
        // Reset nodes
        node
          .attr("opacity", 1)
          .attr("r", nodeRadius)
          .attr("stroke-width", 0.5);
      })
      .on("click", function(event: any, d: any) {
        // Toggle fixed position on click
        d.fx = d.fx ? null : d.x;
        d.fy = d.fy ? null : d.y;
        
        // Restart simulation
        simulation.alpha(0.3).restart();
      })
      .call(drag(simulation) as any);

    function ticked() {
      // Constrain nodes to stay within bounds
      nodes.forEach((d: any) => {
        d.x = Math.max(minX, Math.min(maxX, d.x || width / 2));
        d.y = Math.max(minY, Math.min(maxY, d.y || height / 2));
      });

      link
        .attr("x1", (d: any) => (d.source as any).x)
        .attr("y1", (d: any) => (d.source as any).y)
        .attr("x2", (d: any) => (d.target as any).x)
        .attr("y2", (d: any) => (d.target as any).y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
    }

    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      function dragged(event: any) {
        // Constrain dragged position to bounds
        event.subject.fx = Math.max(minX, Math.min(maxX, event.x));
        event.subject.fy = Math.max(minY, Math.min(maxY, event.y));
      }
      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
    }

    return () => {
      simulation.stop();
      clearInterval(keepMoving);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <svg ref={svgRef} width="100%" height="100%" />
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
        <Legend color="#6B6B6B" label="Content Page" />
        <Legend color="#5B4BFF" label="Topic Cluster" />
        <Legend color="#B2556A" label="Core Topic" />
        <Legend color="#F5A623" label="Related Topic" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span>{label}</span>
    </div>
  );
}

function ActionablesFeatureBlocks() {
  const defaultBlocks = [
    {
      title: "Generate at Scale",
      description: "Create new, citation-ready pages for topics and personas currently invisible to LLMs.",
      content: (
        <div className="w-full h-full flex items-center justify-center group">
        {/* Stacked product pages */}
        <div className="relative group">
          {/* Background page 1 - Phone */}
          <div className="absolute top-2 left-2 w-[600px] h-[400px] bg-black border border-gray-800 shadow-lg rounded-lg overflow-hidden transform rotate-1 transition-all duration-500 ease-out group-hover:translate-y-[-20px] group-hover:translate-x-[-10px] group-hover:rotate-2 group-hover:z-20">
            <div className="h-8 bg-black border-b border-gray-800 flex items-center px-3 space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1 bg-black border border-gray-800 rounded px-3 py-1.5 ml-4 flex items-center">
                <span className="text-[10px] text-gray-500 font-mono">https://</span>
                <span className="text-[10px] text-gray-300 font-mono">shop.techstore.com</span>
                <span className="text-[10px] text-gray-500 font-mono">/products/smartphone-pro</span>
              </div>
            </div>
            <div className="p-3 bg-black h-[372px] overflow-y-auto">
              <div className="bg-black text-white">
                <div className="pb-2">
                  <div className="text-white text-base">SmartPhone Pro 6.1" A15 Chip</div>
                  <div className="text-gray-400 text-xs flex items-center gap-2 mt-1">
                    <span className="text-gray-300">In Stock</span>
                    <span>•</span>
                    <span>Free Shipping</span>
                    <span>•</span>
                    <span className="text-gray-400">★★★★★ 4.7 (156 reviews)</span>
                  </div>
                </div>
                <div className="space-y-1 text-gray-400 text-sm leading-relaxed">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">$899</span>
                    <span className="text-sm text-gray-500 line-through">$1,099</span>
                    <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs border border-gray-700">Save $200</span>
                  </div>
                  <p className="text-xs">Advanced A15 chip with 6-core CPU and 5-core GPU. Perfect for mobile productivity.</p>
                </div>
                <div className="flex justify-center pt-1">
                  <div className="w-32 h-20 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
                    <div className="text-gray-400 text-xs">📱</div>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded text-xs font-medium flex-1 transition-colors">
                    Add to Cart
                  </button>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 px-3 py-2 rounded text-xs font-medium transition-colors">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Background page 5 - Smart Watch */}
          <div className="absolute top-4 left-4 w-[600px] h-[400px] bg-black border border-gray-800 shadow-lg rounded-lg overflow-hidden transform rotate-1 transition-all duration-500 ease-out group-hover:translate-y-[-25px] group-hover:translate-x-[-15px] group-hover:rotate-3 group-hover:z-50">
            <div className="h-8 bg-black border-b border-gray-800 flex items-center px-3 space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1 bg-black border border-gray-800 rounded px-3 py-1.5 ml-4 flex items-center">
                <span className="text-[10px] text-gray-500 font-mono">https://</span>
                <span className="text-[10px] text-gray-300 font-mono">shop.techstore.com</span>
                <span className="text-[10px] text-gray-500 font-mono">/products/smart-watch-pro</span>
              </div>
            </div>
            <div className="p-3 bg-black h-[372px] overflow-y-auto">
              <div className="bg-black text-white">
                <div className="pb-2">
                  <div className="text-white text-base">Smart Watch Pro</div>
                  <div className="text-gray-400 text-xs flex items-center gap-2 mt-1">
                    <span className="text-gray-300">In Stock</span>
                    <span>•</span>
                    <span>Free Shipping</span>
                    <span>•</span>
                    <span className="text-gray-400">★★★★★ 4.8 (156 reviews)</span>
                  </div>
                </div>
                <div className="space-y-1 text-gray-400 text-sm leading-relaxed">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">$199</span>
                    <span className="text-sm text-gray-500 line-through">$249</span>
                    <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs border border-gray-700">Save $50</span>
                  </div>
                  <p className="text-xs">Advanced fitness tracking with heart rate monitoring and GPS.</p>
                </div>
                <div className="flex justify-center pt-1">
                  <img 
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop&crop=center" 
                    alt="Smart Watch Pro"
                    className="w-48 h-32 object-cover rounded-lg border border-gray-700"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded text-xs font-medium flex-1 transition-colors">
                    Add to Cart
                  </button>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 px-3 py-2 rounded text-xs font-medium transition-colors">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Background page 4 - Gaming Mouse */}
          <div className="absolute top-3 left-3 w-[600px] h-[400px] bg-black border border-gray-800 shadow-lg rounded-lg overflow-hidden transform -rotate-0.5 transition-all duration-500 ease-out group-hover:translate-y-[-20px] group-hover:translate-x-[-10px] group-hover:-rotate-1 group-hover:z-40">
            <div className="h-8 bg-black border-b border-gray-800 flex items-center px-3 space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1 bg-black border border-gray-800 rounded px-3 py-1.5 ml-4 flex items-center">
                <span className="text-[10px] text-gray-500 font-mono">https://</span>
                <span className="text-[10px] text-gray-300 font-mono">shop.techstore.com</span>
                <span className="text-[10px] text-gray-500 font-mono">/products/gaming-mouse-pro</span>
              </div>
            </div>
            <div className="p-3 bg-black h-[372px] overflow-y-auto">
              <div className="bg-black text-white">
                <div className="pb-2">
                  <div className="text-white text-base">Gaming Mouse Pro</div>
                  <div className="text-gray-400 text-xs flex items-center gap-2 mt-1">
                    <span className="text-gray-300">In Stock</span>
                    <span>•</span>
                    <span>Free Shipping</span>
                    <span>•</span>
                    <span className="text-gray-400">★★★★☆ 4.6 (89 reviews)</span>
                  </div>
                </div>
                <div className="space-y-1 text-gray-400 text-sm leading-relaxed">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">$79</span>
                    <span className="text-sm text-gray-500 line-through">$99</span>
                    <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs border border-gray-700">Save $20</span>
                  </div>
                  <p className="text-xs">High-precision gaming mouse with RGB lighting and programmable buttons.</p>
                </div>
                <div className="flex justify-center pt-1">
                  <img 
                    src="https://images.unsplash.com/photo-1527864550417-7f91c4c4b2c1?w=300&h=200&fit=crop&crop=center" 
                    alt="Gaming Mouse Pro"
                    className="w-48 h-32 object-cover rounded-lg border border-gray-700"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded text-xs font-medium flex-1 transition-colors">
                    Add to Cart
                  </button>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 px-3 py-2 rounded text-xs font-medium transition-colors">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Background page 3 - Mechanical Keyboard */}
          <div className="absolute top-2 left-2 w-[600px] h-[400px] bg-black border border-gray-800 shadow-lg rounded-lg overflow-hidden transform rotate-0.5 transition-all duration-500 ease-out group-hover:translate-y-[-18px] group-hover:translate-x-[5px] group-hover:rotate-1 group-hover:z-35">
            <div className="h-8 bg-black border-b border-gray-800 flex items-center px-3 space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1 bg-black border border-gray-800 rounded px-3 py-1.5 ml-4 flex items-center">
                <span className="text-[10px] text-gray-500 font-mono">https://</span>
                <span className="text-[10px] text-gray-300 font-mono">shop.techstore.com</span>
                <span className="text-[10px] text-gray-500 font-mono">/products/mechanical-keyboard</span>
              </div>
            </div>
            <div className="p-3 bg-black h-[372px] overflow-y-auto">
              <div className="bg-black text-white">
                <div className="pb-2">
                  <div className="text-white text-base">Mechanical Keyboard Pro</div>
                  <div className="text-gray-400 text-xs flex items-center gap-2 mt-1">
                    <span className="text-gray-300">In Stock</span>
                    <span>•</span>
                    <span>Free Shipping</span>
                    <span>•</span>
                    <span className="text-gray-400">★★★★☆ 4.7 (124 reviews)</span>
                  </div>
                </div>
                <div className="space-y-1 text-gray-400 text-sm leading-relaxed">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">$149</span>
                    <span className="text-sm text-gray-500 line-through">$179</span>
                    <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs border border-gray-700">Save $30</span>
                  </div>
                  <p className="text-xs">Cherry MX switches with RGB backlighting and aluminum frame.</p>
                </div>
                <div className="flex justify-center pt-1">
                  <img 
                    src="https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop&crop=center" 
                    alt="Mechanical Keyboard Pro"
                    className="w-48 h-32 object-cover rounded-lg border border-gray-700"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded text-xs font-medium flex-1 transition-colors">
                    Add to Cart
                  </button>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 px-3 py-2 rounded text-xs font-medium transition-colors">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Background page 2 - Headphones */}
          <div className="absolute top-1 left-1 w-[600px] h-[400px] bg-black border border-gray-800 shadow-lg rounded-lg overflow-hidden transform -rotate-1 transition-all duration-500 ease-out group-hover:translate-y-[-15px] group-hover:translate-x-[10px] group-hover:-rotate-2 group-hover:z-30">
            <div className="h-8 bg-black border-b border-gray-800 flex items-center px-3 space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1 bg-black border border-gray-800 rounded px-3 py-1.5 ml-4 flex items-center">
                <span className="text-[10px] text-gray-500 font-mono">https://</span>
                <span className="text-[10px] text-gray-300 font-mono">shop.techstore.com</span>
                <span className="text-[10px] text-gray-500 font-mono">/products/wireless-headphones</span>
              </div>
            </div>
            <div className="p-3 bg-black h-[372px] overflow-y-auto">
              <div className="bg-black text-white">
                <div className="pb-2">
                  <div className="text-white text-base">Wireless Pro Headphones</div>
                  <div className="text-gray-400 text-xs flex items-center gap-2 mt-1">
                    <span className="text-gray-300">In Stock</span>
                    <span>•</span>
                    <span>Free Shipping</span>
                    <span>•</span>
                    <span className="text-gray-400">★★★★☆ 4.3 (203 reviews)</span>
                  </div>
                </div>
                <div className="space-y-1 text-gray-400 text-sm leading-relaxed">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">$299</span>
                    <span className="text-sm text-gray-500 line-through">$399</span>
                    <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs border border-gray-700">Save $100</span>
                  </div>
                  <p className="text-xs">Premium noise-canceling wireless headphones with 30-hour battery life.</p>
                </div>
                <div className="flex justify-center pt-1">
                  <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop&crop=center" 
                    alt="Wireless Pro Headphones"
                    className="w-48 h-32 object-cover rounded-lg border border-gray-700"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded text-xs font-medium flex-1 transition-colors">
                    Add to Cart
                  </button>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 px-3 py-2 rounded text-xs font-medium transition-colors">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main page - Laptop */}
          <div className="relative w-[600px] h-[400px] bg-black border border-gray-600/20 rounded-lg overflow-hidden z-10 group-hover:border-primary/30 group-active:border-primary/50 group-hover:translate-y-[-20px] group-hover:rotate-2 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-500 ease-out cursor-pointer">
            {/* Browser header */}
            <div className="h-8 bg-black border-b border-gray-800 flex items-center px-3 space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1 bg-black border border-gray-800 rounded px-3 py-1.5 ml-4 flex items-center">
                <span className="text-[10px] text-gray-500 font-mono">https://</span>
                <span className="text-[10px] text-gray-300 font-mono">shop.techstore.com</span>
                <span className="text-[10px] text-gray-500 font-mono">/products/techbook-pro-x1</span>
              </div>
            </div>
            
            {/* Website content */}
            <div className="p-3 bg-black h-[400px] overflow-hidden">
              <Card className="bg-black border-0 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-base">TechBook Pro 14" X1 Processor</CardTitle>
                  <CardDescription className="text-gray-400 text-xs flex items-center gap-2 mt-1">
                    <span className="text-gray-300">In Stock</span>
                    <span>•</span>
                    <span>Free Shipping</span>
                    <span>•</span>
                    <span className="text-gray-400">★★★★☆ 4.2 (89 reviews)</span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {/* Price and Description */}
                  <div className="space-y-1 text-gray-400 text-sm leading-relaxed">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-white">$1,299</span>
                  <span className="text-sm text-gray-500 line-through">$1,599</span>
                  <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs border border-gray-700">Save $300</span>
                </div>
                <p className="text-xs">Advanced X1 processor with 6-core CPU and 8-core GPU. Ideal for productivity and creative work.</p>
              </div>

                  {/* Real Laptop Image */}
                  <div className="flex justify-center pt-1">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=200&fit=crop&crop=center" 
                        alt="TechBook Pro 14 X1 Processor"
                        className="w-48 h-32 object-cover rounded-lg border border-gray-700"
                      />
                    </div>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded text-xs font-medium flex-1 transition-colors">
                      Add to Cart
                    </button>
                    <button className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 px-3 py-2 rounded text-xs font-medium transition-colors">
                      ♡
                    </button>
                  </div>

                  {/* Shipping Card */}
                  <Card className="bg-gray-900 border-gray-800 mt-2">
                    <CardContent className="p-2">
                      <div className="text-white text-xs font-medium mb-1">Shipping Information</div>
                      <div className="text-gray-400 text-xs space-y-0.5">
                        <p>• Free shipping on orders over $100</p>
                        <p>• 2-3 business days delivery</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Info */}
                  <div className="text-gray-500 text-xs space-y-0.5 pt-2">
                    <p>• 30-day return policy</p>
                    <p>• 1-year manufacturer warranty</p>
                  </div>

                  {/* Related Products */}
                  <div className="grid grid-cols-3 gap-1 pt-2">
                    <Card className="bg-gray-900 border-gray-800">
                      <CardContent className="p-1.5">
                        <div className="text-white text-xs mb-0.5">Related</div>
                        <div className="text-gray-400 text-xs">TechBook Air X2</div>
                        <div className="h-0.5 bg-gray-800 rounded w-2/3 mt-0.5 animate-pulse"></div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-900 border-gray-800">
                      <CardContent className="p-1.5">
                        <div className="text-white text-xs mb-0.5">Accessories</div>
                        <div className="text-gray-400 text-xs">Magic Mouse</div>
                        <div className="h-0.5 bg-gray-800 rounded w-1/2 mt-0.5 animate-pulse"></div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-900 border-gray-800">
                      <CardContent className="p-1.5">
                        <div className="text-white text-xs mb-0.5">Support</div>
                        <div className="text-gray-400 text-xs">Contact Us</div>
                        <div className="h-0.5 bg-gray-800 rounded w-3/4 mt-0.5 animate-pulse"></div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        </div>
      ),
      height: "auto",
    },
    {
      title: "Fix Indexation Gaps",
      description: "Find pages that drive user traffic but fail to appear in AI responses.",
      content: (
        <div className="w-full h-full flex items-center justify-center group">
          {/* Browser frame - matching first block size */}
          <div className="w-[600px] h-[400px] border border-gray-600/20 rounded-lg overflow-hidden relative group-hover:border-primary/30 group-active:border-primary/50 group-hover:translate-y-[-20px] group-hover:rotate-2 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-500 ease-out cursor-pointer">
             {/* Browser header - matching first block style */}
             <div className="h-8 bg-black border-b border-gray-800 flex items-center px-3 space-x-2">
               <div className="w-3 h-3 bg-red-500 rounded-full"></div>
               <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
               <div className="flex-1 bg-black border border-gray-800 rounded px-3 py-1.5 ml-4 flex items-center">
                 <span className="text-[10px] text-gray-500 font-mono">https://</span>
                 <span className="text-[10px] text-gray-300 font-mono">yoursite.com</span>
                 <span className="text-[10px] text-gray-500 font-mono">/page</span>
               </div>
             </div>
            
             {/* Content area - split into two exact halves */}
             <div className="relative h-[368px] bg-gray-900/10">
               {/* Original content - cycles continuously */}
               <div className="animate-content-cycle">
                 {/* Top half - ONLY skeleton */}
                 <div className="h-1/2 p-4 space-y-2">
                   <div className="h-3 bg-gray-600/30 rounded w-3/4"></div>
                   <div className="h-2 bg-gray-600/25 rounded w-1/2"></div>
                   <div className="h-2 bg-gray-600/25 rounded w-2/3"></div>
                   <div className="h-3 bg-gray-600/30 rounded w-4/5"></div>
                 </div>
                 
                 {/* Bottom half - ONLY content */}
                 <div className="h-1/2 p-4 space-y-3 text-muted-foreground border-t border-border/30">
                   <h1 className="text-sm font-medium text-foreground">Wireless Headphones Pro</h1>
                   <div className="flex items-center space-x-2 text-xs">
                     <span className="text-primary">In Stock</span>
                     <span className="text-muted-foreground">•</span>
                     <span className="text-muted-foreground">Free Shipping</span>
                     <span className="text-muted-foreground">•</span>
                     <span className="text-muted-foreground">★★★★☆ 4.2</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <span className="text-lg font-bold text-foreground">$299</span>
                     <span className="text-sm text-muted-foreground line-through">$399</span>
                     <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded text-xs">Save $100</span>
                   </div>
                   <div className="bg-muted/30 rounded p-3 border border-border/30">
                     <p className="text-xs text-muted-foreground leading-relaxed">
                       Premium noise-canceling wireless headphones with 30-hour battery life. 
                       Features active noise cancellation, premium sound quality, and comfortable 
                       over-ear design. Perfect for music lovers and professionals.
                     </p>
                   </div>
                   <div className="flex space-x-2">
                     <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded text-xs font-medium transition-colors">
                       Add to Cart
                     </button>
                     <button className="bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1.5 rounded text-xs font-medium transition-colors">
                       ♡ Wishlist
                     </button>
                   </div>
                 </div>
                 
                 {/* Scanning label - will disappear with original content */}
                 <div className="absolute bottom-2 right-2 text-[8px] text-primary/80 font-mono animate-pulse">
                   Scanning<span className="animate-pulse">...</span>
                 </div>
               </div>
              
              {/* Scanning beam - moves up and down continuously */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-scan-beam" style={{ top: '0%' }}></div>
              </div>
              
               {/* Scanning instruction */}
               <div className="absolute top-2 right-2 text-[8px] text-primary/60 font-mono bg-muted/40 px-2 py-1 rounded">
                 Add authoritative content...
               </div>
              
               {/* New content cycles continuously - SWAPPED: content on top, skeleton on bottom */}
               <div className="absolute inset-0 bg-gray-900/10 animate-new-content-cycle">
                 {/* Top half - NOW content (swapped) */}
                 <div className="h-1/2 p-4 space-y-2 text-muted-foreground overflow-hidden">
                   <h1 className="text-sm font-medium text-foreground">SEO FAQ Page</h1>
                   <div className="space-y-2">
                     <div className="bg-muted/20 rounded p-2 border border-border/30">
                       <h3 className="text-xs font-medium text-foreground mb-1">Q: How long does SEO take to work?</h3>
                       <p className="text-xs text-muted-foreground">A: SEO typically takes 3-6 months to show significant results. Factors include competition, content quality, and technical optimization.</p>
                     </div>
                     <div className="bg-muted/20 rounded p-2 border border-border/30">
                       <h3 className="text-xs font-medium text-foreground mb-1">Q: What is the best keyword density?</h3>
                       <p className="text-xs text-muted-foreground">A: Aim for 1-2% keyword density for optimal results. Focus on natural integration rather than keyword stuffing.</p>
                     </div>
                   </div>
                 </div>
                 
                 {/* Bottom half - ONLY skeleton (swapped) */}
                 <div className="h-1/2 p-4 space-y-2 border-t border-border/30">
                   <div className="h-3 bg-gray-600/30 rounded w-3/4"></div>
                   <div className="h-2 bg-gray-600/25 rounded w-1/2"></div>
                   <div className="h-2 bg-gray-600/25 rounded w-2/3"></div>
                   <div className="h-3 bg-gray-600/30 rounded w-4/5"></div>
                 </div>
                 
                 <div className="absolute bottom-2 right-2 text-[8px] text-muted-foreground/60 font-mono">
                   ✓ Indexed
                 </div>
               </div>
            </div>
          </div>
        </div>
      ),
      height: "auto",
    },
    {
      title: "Build Authority Loops",
      description: "Channel authority from high-performing pages to under-indexed ones.",
      content: (
        <div className="w-full h-full flex items-center justify-center group">
          <div className="relative w-[600px] h-[400px] flex items-center justify-center">
            {/* Three real webpages positioned at different sections and heights */}
            <div className="relative w-full h-full">
              {/* Low Authority Page - Left, Top */}
              <div className="absolute top-8 left-8 group/page">
                <div className="w-48 h-48 bg-gradient-to-br from-[#0A0A0A] via-[#0C0C0C] to-[#000000] border border-gray-500/20 rounded-lg overflow-hidden shadow-lg group-hover/page:scale-105 transition-all duration-300">
                  {/* Browser header */}
                  <div className="h-6 bg-black border-b border-gray-800 flex items-center px-3 space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-black border border-gray-800 rounded px-3 py-1 ml-3 flex items-center">
                      <span className="text-[8px] text-gray-500 font-mono">yoursite.com/page1</span>
                    </div>
                  </div>
                  
                  {/* Page content */}
                  <div className="p-3 space-y-2">
                    <div className="h-2 bg-gray-600/40 rounded w-3/4"></div>
                    <div className="h-1 bg-gray-600/30 rounded w-1/2"></div>
                    <div className="h-1 bg-gray-600/30 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-700/40 rounded w-full mt-2"></div>
                    <div className="h-1 bg-gray-600/30 rounded w-4/5"></div>
                    <div className="h-1.5 bg-gray-600/30 rounded w-3/5 mt-1"></div>
                    <div className="h-1 bg-gray-600/30 rounded w-2/3 mt-1"></div>
                    <div className="h-1 bg-gray-600/30 rounded w-1/2 mt-1"></div>
                  </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] text-gray-400 font-mono">
                  Low Authority
                </div>
              </div>

              {/* Medium Authority Page - Center, Middle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group/page">
                <div className="w-48 h-48 bg-gradient-to-br from-[#0A0A0A] via-[#0C0C0C] to-[#000000] border border-gray-500/30 rounded-lg overflow-hidden shadow-lg group-hover/page:scale-105 transition-all duration-300">
                  {/* Browser header */}
                  <div className="h-6 bg-black border-b border-gray-800 flex items-center px-3 space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-black border border-gray-800 rounded px-3 py-1 ml-3 flex items-center">
                      <span className="text-[8px] text-gray-500 font-mono">yoursite.com/page2</span>
                    </div>
                  </div>
                  
                  {/* Page content */}
                  <div className="p-3 space-y-2">
                    <div className="h-2 bg-gray-500/50 rounded w-3/4"></div>
                    <div className="h-1 bg-gray-500/40 rounded w-1/2"></div>
                    <div className="h-1 bg-gray-500/40 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-600/50 rounded w-full mt-2"></div>
                    <div className="h-1 bg-gray-500/40 rounded w-4/5"></div>
                    <div className="h-1.5 bg-gray-500/40 rounded w-3/5 mt-1"></div>
                    <div className="h-1 bg-gray-500/40 rounded w-2/3 mt-1"></div>
                    <div className="h-1 bg-gray-500/40 rounded w-1/2 mt-1"></div>
                  </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] text-gray-300 font-mono">
                  Medium Authority
                </div>
              </div>

              {/* High Authority Page - Right, Bottom */}
              <div className="absolute bottom-8 right-8 group/page">
                <div className="w-48 h-48 bg-gradient-to-br from-[#0A0A0A] via-[#0C0C0C] to-[#000000] border border-gray-500/40 rounded-lg overflow-hidden shadow-lg group-hover/page:scale-105 transition-all duration-300">
                  {/* Browser header */}
                  <div className="h-6 bg-black border-b border-gray-800 flex items-center px-3 space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-black border border-gray-800 rounded px-3 py-1 ml-3 flex items-center">
                      <span className="text-[8px] text-gray-500 font-mono">yoursite.com/page3</span>
                    </div>
                  </div>
                  
                  {/* Page content */}
                  <div className="p-3 space-y-2">
                    <div className="h-2 bg-gray-400/60 rounded w-3/4"></div>
                    <div className="h-1 bg-gray-400/50 rounded w-1/2"></div>
                    <div className="h-1 bg-gray-400/50 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-500/60 rounded w-full mt-2"></div>
                    <div className="h-1 bg-gray-400/50 rounded w-4/5"></div>
                    <div className="h-1.5 bg-gray-400/50 rounded w-3/5 mt-1"></div>
                    <div className="h-1 bg-gray-400/50 rounded w-2/3 mt-1"></div>
                    <div className="h-1 bg-gray-400/50 rounded w-1/2 mt-1"></div>
                  </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] text-white font-mono">
                  High Authority
                </div>
              </div>
            </div>

          </div>
        </div>
      ),
      height: "auto",
    },
    {
      title: "Reinforce Topical Clusters",
      description: "Strengthen your overall semantic footprint across interconnected pages.",
      content: (
        <div className="w-full h-[450px] bg-background rounded-lg border border-border/30 p-4">
          <NetworkGraph />
        </div>
      ),
      height: "auto",
    },
  ];

  return (
    <section className="py-0 px-0 bg-background">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center py-12 px-6">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get specific, actionable recommendations to improve your performance.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="relative px-6 pt-12 pb-12">
          {/* Grid Ruler Overlay (2x2 only) */}
          <div className="absolute inset-0 pointer-events-none z-30">
            {/* Vertical Divider */}
            <div className="absolute inset-y-0 left-1/2 w-[1.5px] bg-border opacity-90 transform -translate-x-1/2"></div>

            {/* Horizontal Dividers */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-border opacity-90 pointer-events-none"></div>
            <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-border opacity-90 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-border opacity-90 pointer-events-none"></div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center relative z-20">
            {defaultBlocks.map((block, index) => (
              <div
                key={index}
                className="px-6 pt-6 pb-4"
              >
                <h3 className="text-lg font-semibold mb-2">{block.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {block.description}
                </p>
                <div style={block.height !== 'auto' ? { height: block.height } : {}}>{block.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ActionablesPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      {/* Header Section */}
      <SiteHeader />
      
      {/* Container with rulers for entire page */}
      <div className="mx-auto max-w-7xl relative">
        
        {/* Hero Section */}
        <section className="py-16 bg-background min-h-[1000px]">
          <div className="max-w-6xl mx-auto px-6">
            {/* Actionables Hero Header */}
            <ActionablesHeroHeader />
            
            {/* Actionables Hero Video */}
            <div className="mt-12 -mx-8 md:-mx-10">
              <div className="relative rounded-xl overflow-hidden bg-muted/20 border border-border/50 w-full">
                <video
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  key="actionables-v2"
                >
                  <source src="/actionables.webm?v=2" type="video/webm" />
                </video>
              </div>
            </div>
            
          </div>
          
          {/* Actionables Hero Cards - 4 Feature Cards with Grid Rulers (breaks out of container to match homepage) */}
          <div className="mx-auto max-w-7xl relative px-6 md:px-8">
            <ActionablesHeroCards />
          </div>
        </section>
        
        {/* Actionables Feature Blocks Section */}
        <div className="relative">
          <div className="relative z-10">
            <ActionablesFeatureBlocks />
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
