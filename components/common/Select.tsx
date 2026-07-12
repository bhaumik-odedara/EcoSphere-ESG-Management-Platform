import React from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectOption {
  value: string | number
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
  error?: string
  placeholder?: string
}

export function Select({
  label,
  options,
  error,
  placeholder,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#E8EAED] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full bg-[#0D1117] border border-[#30363D] rounded-lg px-4 py-2 pr-10 text-[#E8EAED] focus:outline-none focus:border-[#58A6FF] focus:ring-1 focus:ring-[#58A6FF] transition-colors appearance-none ${
            error ? 'border-[#F85149]' : ''
          } ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B949E] pointer-events-none"
        />
      </div>
      {error && <p className="text-sm text-[#F85149] mt-1">{error}</p>}
    </div>
  )
}
