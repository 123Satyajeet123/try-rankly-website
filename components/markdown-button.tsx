"use client"

import { useState } from "react"
import { FileText, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface MarkdownButtonProps {
  path?: string
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function MarkdownButton({ 
  path, 
  className,
  variant = "outline",
  size = "default"
}: MarkdownButtonProps) {
  const [markdown, setMarkdown] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const currentPath = path || (typeof window !== 'undefined' ? window.location.pathname : '/')

  const fetchMarkdown = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/markdown?path=${encodeURIComponent(currentPath)}`)
      if (response.ok) {
        const text = await response.text()
        setMarkdown(text)
      } else {
        setMarkdown("Markdown version not available for this page.")
      }
    } catch (error) {
      setMarkdown("Error loading markdown content.")
    } finally {
      setLoading(false)
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen && !markdown) {
      fetchMarkdown()
    }
  }

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentPath.replace(/\//g, '_') || 'page'}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn("gap-2", className)}
          aria-label="View markdown format"
        >
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Markdown</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Markdown Format</DialogTitle>
          <DialogDescription>
            View and download this page's content in Markdown format. This format is optimized for LLMs and AI crawlers.
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground">Loading markdown...</div>
            </div>
          ) : (
            <>
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[60vh] text-sm font-mono whitespace-pre-wrap break-words">
                {markdown || "No markdown content available."}
              </pre>
              {markdown && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

