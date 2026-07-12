'use client'

import React from 'react'

interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
  width?: string
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  onRowClick?: (row: any) => void
  isLoading?: boolean
  emptyMessage?: string
}

export function DataTable({
  columns,
  data,
  onRowClick,
  isLoading = false,
  emptyMessage = 'No data available',
}: DataTableProps) {
  return (
    <div className="overflow-x-auto border border-[#30363D] rounded-lg">
      <table className="w-full">
        {/* Header */}
        <thead>
          <tr className="bg-[#0D1117] border-b border-[#30363D]">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-sm font-semibold text-[#8B949E]"
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border border-[#30363D] border-t-[#58A6FF]" />
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center">
                <p className="text-[#8B949E]">{emptyMessage}</p>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-[#30363D] hover:bg-[#161B22] transition-colors ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-sm text-[#E8EAED]"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
