'use client'

import { StatCard } from '@/components/common'
import { BarChart3, Users, Scale, Leaf } from 'lucide-react'

const metrics = [
  {
    title: 'Environmental Score',
    value: '78',
    unit: '%',
    trend: 5.2,
    trendUp: true,
    color: '#00D084',
    icon: <Leaf size={24} />,
  },
  {
    title: 'Social Score',
    value: '72',
    unit: '%',
    trend: 2.8,
    trendUp: true,
    color: '#0099FF',
    icon: <Users size={24} />,
  },
  {
    title: 'Governance Score',
    value: '85',
    unit: '%',
    trend: 1.5,
    trendUp: false,
    color: '#9D4EDD',
    icon: <Scale size={24} />,
  },
  {
    title: 'Overall ESG Score',
    value: '78',
    unit: '%',
    trend: 3.2,
    trendUp: true,
    color: '#58A6FF',
    icon: <BarChart3 size={24} />,
  },
]

export function MetricsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <StatCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          unit={metric.unit}
          trend={metric.trend}
          trendUp={metric.trendUp}
          color={metric.color}
          icon={metric.icon}
        />
      ))}
    </div>
  )
}
