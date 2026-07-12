import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variantStyles = {
  primary:
    'bg-[#1F6FEB] hover:bg-[#1f6feb]/80 text-white active:bg-[#1f6feb]/60',
  secondary:
    'bg-[#30363D] hover:bg-[#30363D]/80 text-[#E8EAED] active:bg-[#30363D]/60',
  success:
    'bg-[#00D084] hover:bg-[#00D084]/80 text-[#0E1117] active:bg-[#00D084]/60 font-medium',
  danger:
    'bg-[#F85149] hover:bg-[#F85149]/80 text-white active:bg-[#F85149]/60 font-medium',
  ghost:
    'bg-transparent hover:bg-[#161B22] text-[#E8EAED] border border-[#30363D] active:bg-[#0D1117]',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {isLoading && (
        <div className="animate-spin rounded-full h-4 w-4 border border-current border-t-transparent" />
      )}
      {!isLoading && leftIcon && <span>{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </button>
  )
}
