"use client"

import { useState } from "react"
import { LotusLogo } from "./lotus-logo"

export function ManifestoDocument() {
  const [mode, setMode] = useState<"human" | "machine">("human")

  return (
    <div className="relative">
      <div className="relative aged-paper rounded-lg overflow-hidden shadow-2xl">
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between py-8 z-10">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="mx-auto w-7 h-7 rounded-full bg-white border border-gray-300"
              style={{
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
              }}
            />
          ))}
        </div>

        {/* Document content */}
        <div className="pl-16 pr-12 py-12">
          {/* Header section */}
          <div className="flex items-center justify-center mb-16 pb-8 border-b border-gray-700 relative">
            <div className="absolute left-0 text-xs font-typewriter tracking-widest text-gray-950">
              THE NEW FRONTIER OF SEARCH
            </div>

            <div className="relative w-12 h-12 flex items-center justify-center">
              <LotusLogo size={48} strokeWidth={1.5} className="text-gray-950" />
            </div>

            <div className="absolute right-0 text-xs font-typewriter tracking-widest text-gray-950">
              SEPTEMBER 30 2025
            </div>
          </div>

          {/* Manifesto content */}
          <div className="space-y-8 font-typewriter text-sm leading-relaxed text-gray-950 tracking-widest">
            <div>
              <div className="text-gray-800 mb-2">1.</div>
              <p>
                Search has always been about humans asking questions and engines returning links. That model defined the
                last two decades of the web. But today the <span className="text-blue-800 font-semibold">answer engines</span> are
                different. They do not just index, they generate.
              </p>
            </div>

            <div>
              <div className="text-gray-800 mb-2">2.</div>
              <p>
                <span className="text-blue-800 font-semibold">Generative search engines</span> are shifting the center of gravity.
                Brands are no longer competing for ten blue links. They are competing for a{" "}
                <span className="hand-underline">single answer</span>, written by an AI, with{" "}
                <span className="text-blue-800 font-semibold">citations</span> chosen behind the curtain.
              </p>
            </div>

            <div>
              <div className="text-gray-800 mb-2">3.</div>
              <p>
                Traditional SEO was built for human clicks.{" "}
                <span className="text-blue-800 font-semibold">Generative Engine Optimization</span> and{" "}
                <span className="text-blue-800 font-semibold">Answer Engine Optimization</span> are built for AI citations,
                impressions, <span className="hand-underline">visibility</span>, influence, and share of voice across
                the new answer layer.
              </p>
            </div>

            <div>
              <div className="text-gray-800 mb-2">4.</div>
              <p>
                In this new ecosystem the old metrics break. Word count, backlinks, keywords do not explain why one
                brand is cited and another ignored. We need <span className="text-blue-800 font-semibold">impression metrics</span>{" "}
                that capture visibility scores, depth of mention, relevance, diversity, and sentiment. Analytics
                designed not for the browser but for the <span className="hand-underline">model</span>.
              </p>
            </div>

            <div>
              <div className="text-gray-800 mb-2">5.</div>
              <p>
                And it is not just about monitoring. It is a <span className="hand-underline">zero sum game</span>. If
                competitors win the citation, you lose it. If they dominate earned media, you disappear. Brands cannot
                afford to guess. They need clarity,
                <span className="text-blue-800 font-semibold"> benchmarks</span>, and action.
              </p>
            </div>

            <div>
              <div className="text-gray-800 mb-2">6.</div>
              <p>
                That is why we are building <span className="text-blue-800 font-semibold">Rankly</span>. Purpose built to measure how
                brands appear in AI generated answers, compare performance against competitors, and guide actions that
                improve <span className="hand-underline">visibility</span>.
              </p>
            </div>

            <div>
              <div className="text-gray-800 mb-2">7.</div>
              <p>
                We believe answer engines should not remain <span className="text-blue-800 font-semibold">black boxes</span>.
                Visibility must be transparent. Citations must be <span className="hand-underline">measurable</span>.
                Influence must be explainable.
              </p>
            </div>

            <div>
              <div className="text-gray-800 mb-2">8.</div>
              <p>
                Rankly unifies the critical levers. <span className="text-blue-800 font-semibold">Visibility analytics</span>,
                impression metrics, <span className="text-blue-800 font-semibold">competitor benchmarking</span>, sentiment tracking,
                and hybrid <span className="hand-underline">SEO plus AEO</span> strategy.
              </p>
            </div>

            <div>
              <div className="text-gray-800 mb-2">9.</div>
              <p>
                The outcome is simple. Brands understand not only if they are cited but how they are represented, what
                they need to change, and where they can win.
              </p>
            </div>

            <div>
              <div className="text-gray-800 mb-2">10.</div>
              <p>
                This is not about replacing SEO. It is about building the{" "}
                <span className="hand-underline">discipline that comes next</span>. A framework for thriving in the era
                of <span className="text-blue-800 font-semibold">generative search</span>.
              </p>
            </div>

            <div>
              <div className="text-gray-800 mb-2">11.</div>
              <p>
                The choice is clear. Either brands fly blind as AI engines reshape discovery, or they equip themselves
                with visibility, influence, and control. At <span className="text-blue-800 font-semibold">Rankly</span> we are
                building the compass for this new frontier.
              </p>
            </div>
          </div>

          {/* HUMAN/MACHINE toggle */}
        </div>
      </div>
    </div>
  )
}
