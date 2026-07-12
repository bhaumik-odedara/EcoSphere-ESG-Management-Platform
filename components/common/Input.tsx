import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export function Input({
  label,
  error,
  icon,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#E8EAED] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B949E]">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-4 py-2 ${
            icon ? 'pl-10' : ''
          } text-[#E8EAED] placeholder-[#8B949E] focus:outline-none focus:border-[#58A6FF] focus:ring-1 focus:ring-[#58A6FF] transition-colors ${
            error ? 'border-[#F85149]' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-[#F85149] mt-1">{error}</p>}
    </div>
  )
}
