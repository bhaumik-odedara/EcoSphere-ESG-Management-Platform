import React from 'react'

interface BadgeProps {
  label: string
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
  icon?: React.ReactNode
}

const variantStyles = {
  default: 'bg-[#30363D] text-[#E8EAED]',
  success: 'bg-[#00D084]/20 text-[#00D084]',
  warning: 'bg-[#FF7F50]/20 text-[#FF7F50]',
  danger: 'bg-[#F85149]/20 text-[#F85149]',
  info: 'bg-[#58A6FF]/20 text-[#58A6FF]',
}

const sizeStyles = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
}

export function Badge({
  label,
  variant = 'default',
  size = 'sm',
  icon,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {label}
    </span>
  )
}
