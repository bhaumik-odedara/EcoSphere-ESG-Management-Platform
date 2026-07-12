'use client'

import React from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface ChartCardProps {
  title: string
  type: 'line' | 'bar'
  data: any[]
  dataKey: string
  color: string
  xAxisKey?: string
  height?: number
}

export function ChartCard({
  title,
  type,
  data,
  dataKey,
  color,
  xAxisKey = 'name',
  height = 300,
}: ChartCardProps) {
  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        {type === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#30363D"
              vertical={false}
            />
            <XAxis dataKey={xAxisKey} stroke="#8B949E" style={{ fontSize: 12 }} />
            <YAxis stroke="#8B949E" style={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0D1117',
                border: '1px solid #30363D',
                borderRadius: '8px',
                color: '#E8EAED',
              }}
              cursor={{ stroke: color, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#30363D"
              vertical={false}
            />
            <XAxis dataKey={xAxisKey} stroke="#8B949E" style={{ fontSize: 12 }} />
            <YAxis stroke="#8B949E" style={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0D1117',
                border: '1px solid #30363D',
                borderRadius: '8px',
                color: '#E8EAED',
              }}
              cursor={{ fill: `${color}20` }}
            />
            <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
