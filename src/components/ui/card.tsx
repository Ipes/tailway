import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

export const CardTitle = ({ children, className = '' }: CardProps) => {
  return (
    <h3 className={`text-xl font-semibold text-gray-800 ${className}`}>
      {children}
    </h3>
  )
}

export const CardContent = ({ children, className = '' }: CardProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}