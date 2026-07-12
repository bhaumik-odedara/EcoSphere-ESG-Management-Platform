import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  unit?: string
  trend?: number
  trendUp?: boolean
  color: string
  icon?: React.ReactNode
  onClick?: () => void
}

export function StatCard({
  title,
  value,
  unit,
  trend,
  trendUp = true,
  color,
  icon,
  onClick,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-[#161B22] border border-[#30363D] rounded-lg p-6 hover:border-[${color}] transition-colors ${
        onClick ? 'cursor-pointer' : ''
      }`}
      style={{ '--hover-color': color } as React.CSSProperties}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-[#8B949E]">{title}</h3>
        {icon && (
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${color}20` }}
          >
            <div style={{ color }}>{icon}</div>
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-4xl font-bold" style={{ color }}>
          {value}
        </span>
        {unit && <span className="text-sm text-[#8B949E]">{unit}</span>}
      </div>

      {trend !== undefined && (
        <div className="flex items-center gap-2">
          {trendUp ? (
            <TrendingUp size={16} className="text-[#00D084]" />
          ) : (
            <TrendingDown size={16} className="text-[#FF7F50]" />
          )}
          <span
            className="text-sm font-medium"
            style={{
              color: trendUp ? '#00D084' : '#FF7F50',
            }}
          >
            {trend}% vs last month
          </span>
        </div>
      )}
    </div>
  )
}
