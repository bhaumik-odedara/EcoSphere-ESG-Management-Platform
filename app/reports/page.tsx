'use client'

import { useState } from 'react'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { Modal } from '@/components/common/Modal'
import { Plus, Download, Eye } from 'lucide-react'

type ReportType = 'environmental' | 'social' | 'governance' | 'summary'

interface Report {
  id: number
  name: string
  type: ReportType
  created: string
  status: string
  size: string
}

export default function ReportsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reportType, setReportType] = useState<ReportType>('summary')

  const templates = [
    { id: 1, name: 'Environmental Report', type: 'environmental' as ReportType, icon: '🌍', description: 'Emissions, carbon footprint, sustainability goals' },
    { id: 2, name: 'Social Report', type: 'social' as ReportType, icon: '👥', description: 'CSR activities, diversity metrics, participation' },
    { id: 3, name: 'Governance Report', type: 'governance' as ReportType, icon: '⚖️', description: 'Policies, audits, compliance status' },
    { id: 4, name: 'ESG Summary', type: 'summary' as ReportType, icon: '📊', description: 'Complete ESG performance overview' },
  ]

  const generatedReports: Report[] = [
    {
      id: 1,
      name: 'Q1 2024 Environmental Report',
      type: 'environmental',
      created: '2024-01-25',
      status: 'Completed',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Annual ESG Summary',
      type: 'summary',
      created: '2024-01-20',
      status: 'Completed',
      size: '5.1 MB',
    },
    {
      id: 3,
      name: 'Social Impact Report',
      type: 'social',
      created: '2024-01-15',
      status: 'Completed',
      size: '1.8 MB',
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
        <p className="text-[#8B949E]">
          Create, manage, and export ESG reports
        </p>
      </div>

      {/* Report Templates */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Report Templates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-[#161B22] border border-[#30363D] rounded-lg p-6 hover:border-[#58A6FF] transition-colors"
            >
              <div className="text-4xl mb-4">{template.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {template.name}
              </h3>
              <p className="text-sm text-[#8B949E] mb-4">
                {template.description}
              </p>
              <Button
                variant="primary"
                size="md"
                className="w-full"
                leftIcon={<Plus size={18} />}
                onClick={() => {
                  setReportType(template.type)
                  setIsModalOpen(true)
                }}
              >
                Create Report
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Reports */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">
          Generated Reports
        </h2>
        <div className="space-y-3">
          {generatedReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 bg-[#0D1117] border border-[#30363D] rounded-lg hover:border-[#58A6FF] transition-colors"
            >
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white mb-1">
                  {report.name}
                </h4>
                <div className="flex items-center gap-4 text-xs text-[#8B949E]">
                  <span>{report.created}</span>
                  <span>{report.size}</span>
                  <span className="px-2 py-1 bg-[#00D084]/20 text-[#00D084] rounded">
                    {report.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Eye size={16} />}
                >
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Download size={16} />}
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Report Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Custom Report"
        size="lg"
        footer={
          <>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="md">
              Generate Report
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Report Name" placeholder="e.g., Q1 2024 ESG Report" />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" />
            <Input label="End Date" type="date" />
          </div>

          <Select
            label="Department"
            options={[
              { value: 'all', label: 'All Departments' },
              { value: 'operations', label: 'Operations' },
              { value: 'it', label: 'IT' },
              { value: 'finance', label: 'Finance' },
            ]}
            placeholder="Select department"
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="ESG Module"
              options={[
                { value: 'all', label: 'All Modules' },
                { value: 'environmental', label: 'Environmental' },
                { value: 'social', label: 'Social' },
                { value: 'governance', label: 'Governance' },
              ]}
              placeholder="Select module"
            />
            <Select
              label="Export Format"
              options={[
                { value: 'pdf', label: 'PDF' },
                { value: 'xlsx', label: 'Excel' },
                { value: 'csv', label: 'CSV' },
              ]}
              placeholder="Select format"
            />
          </div>

          <div className="bg-[#0D1117] border border-[#30363D] rounded-lg p-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-[#30363D] cursor-pointer"
              />
              <span className="text-sm text-[#E8EAED]">
                Include executive summary
              </span>
            </label>
            <label className="flex items-center gap-3 mt-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-[#30363D] cursor-pointer"
              />
              <span className="text-sm text-[#E8EAED]">Include charts</span>
            </label>
            <label className="flex items-center gap-3 mt-3">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-[#30363D] cursor-pointer"
              />
              <span className="text-sm text-[#E8EAED]">
                Include detailed metrics
              </span>
            </label>
          </div>
        </div>
      </Modal>
    </div>
  )
}
