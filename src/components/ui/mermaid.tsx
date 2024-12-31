// src/components/ui/mermaid.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidProps {
  chart: string
  className?: string
}

export const Mermaid: React.FC<MermaidProps> = ({ chart, className = '' }) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      htmlLabels: true
    })
  }, [])

  useEffect(() => {
    if (isClient && chart && elementRef.current) {
      mermaid.render('mermaid-svg', chart).then(({ svg }) => {
        if (elementRef.current) {
          elementRef.current.innerHTML = svg
        }
      })
    }
  }, [chart, isClient])

  if (!isClient) {
    return <div className={className}>Loading diagram...</div>
  }

  return (
    <div ref={elementRef} className={`mermaid-chart ${className}`}>
      {chart}
    </div>
  )
}

export default Mermaid