'use client'

import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface MermaidProps {
  chart: string
  className?: string
}

export const Mermaid: React.FC<MermaidProps> = ({ chart, className = '' }) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize mermaid with default config
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      htmlLabels: true
    })

    // Only render if we have a chart and the element exists
    if (chart && elementRef.current) {
      mermaid.render('mermaid-svg', chart).then(({ svg }) => {
        if (elementRef.current) {
          elementRef.current.innerHTML = svg
        }
      })
    }
  }, [chart])

  return (
    <div ref={elementRef} className={`mermaid-chart ${className}`}>
      {chart}
    </div>
  )
}

export default Mermaid