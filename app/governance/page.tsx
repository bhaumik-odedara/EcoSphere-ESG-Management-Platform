'use client'

import { useState, useEffect } from 'react'
import { DataTable } from '@/components/common/DataTable'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { Plus, FileText, AlertTriangle } from 'lucide-react'

type Tab = 'policies' | 'acknowledgements' | 'audits' | 'compliance'

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState<Tab>('policies')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Sync active tab with URL hash
  useEffect(() => {
    const updateTabFromHash = () => {
      const hash = window.location.hash
      if (hash === '#policies') setActiveTab('policies')
      else if (hash === '#acknowledgements') setActiveTab('acknowledgements')
      else if (hash === '#audits') setActiveTab('audits')
      else if (hash === '#compliance') setActiveTab('compliance')
      else setActiveTab('policies')
    }
    updateTabFromHash()
    window.addEventListener('hashchange', updateTabFromHash)
    return () => window.removeEventListener('hashchange', updateTabFromHash)
  }, [])

  // Update URL hash when tab changes
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    let hash = '#policies'
    if (tab === 'acknowledgements') hash = '#acknowledgements'
    else if (tab === 'audits') hash = '#audits'
    else if (tab === 'compliance') hash = '#compliance'
    window.history.replaceState(null, '', hash)
  }

  // Mock Policies Data
  const policies = [
    {
      id: 1,
      title: 'Environmental Policy',
      version: '2.0',
      lastUpdated: '2024-01-15',
      owner: 'Operations',
      status: 'Active',
    },
    {
      id: 2,
      title: 'Code of Conduct',
      version: '3.1',
      lastUpdated: '2023-12-01',
      owner: 'HR',
      status: 'Active',
    },
    {
      id: 3,
      title: 'Supply Chain Ethics',
      version: '1.5',
      lastUpdated: '2024-01-10',
      owner: 'Procurement',
      status: 'Active',
    },
  ]

  // Mock Policy Acknowledgements Data
  const acknowledgements = [
    {
      id: 1,
      employee: 'John Smith',
      policy: 'Environmental Policy',
      acknowledgedDate: '2024-01-16',
      status: 'Acknowledged',
    },
    {
      id: 2,
      employee: 'Sarah Johnson',
      policy: 'Code of Conduct',
      acknowledgedDate: '2024-01-15',
      status: 'Acknowledged',
    },
    {
      id: 3,
      employee: 'Mike Chen',
      policy: 'Supply Chain Ethics',
      acknowledgedDate: 'Pending',
      status: 'Pending',
    },
    {
      id: 4,
      employee: 'Emma Wilson',
      policy: 'Environmental Policy',
      acknowledgedDate: '2024-01-14',
      status: 'Acknowledged',
    },
  ]

  // Mock Audits Data
  const audits = [
    {
      id: 1,
      title: 'Annual Compliance Audit',
      department: 'Finance',
      auditor: 'External Firm A',
      date: '2024-01-20',
      findings: 'Minor discrepancies',
      status: 'Completed',
    },
    {
      id: 2,
      title: 'Internal Controls Review',
      department: 'Operations',
      auditor: 'Internal Audit Team',
      date: '2024-02-05',
      findings: 'Pending',
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'ESG Audit',
      department: 'Corporate',
      auditor: 'ESG Auditors Inc',
      date: '2024-02-15',
      findings: 'Excellent',
      status: 'Pending',
    },
  ]

  // Mock Compliance Issues Data
  const complianceIssues = [
    {
      id: 1,
      issue: 'Missing training documentation',
      severity: 'High',
      department: 'HR',
      status: 'Open',
    },
    {
      id: 2,
      issue: 'Outdated environmental procedures',
      severity: 'Medium',
      department: 'Operations',
      status: 'In Progress',
    },
    {
      id: 3,
      issue: 'Incomplete audit trail',
      severity: 'Low',
      department: 'Finance',
      status: 'Resolved',
    },
    {
      id: 4,
      issue: 'Policy update not disseminated',
      severity: 'High',
      department: 'Corporate',
      status: 'Open',
    },
  ]

  const policyColumns = [
    { key: 'title', label: 'Policy Title', width: '30%' },
    { key: 'version', label: 'Version', width: '10%' },
    { key: 'lastUpdated', label: 'Last Updated', width: '20%' },
    { key: 'owner', label: 'Owner', width: '20%' },
    {
      key: 'status',
      label: 'Status',
      width: '20%',
      render: (status: string) => (
        <Badge label={status} variant="success" />
      ),
    },
  ]

  const acknowledgementColumns = [
    { key: 'employee', label: 'Employee', width: '25%' },
    { key: 'policy', label: 'Policy', width: '30%' },
    { key: 'acknowledgedDate', label: 'Acknowledged Date', width: '25%' },
    {
      key: 'status',
      label: 'Status',
      width: '20%',
      render: (status: string) => (
        <Badge
          label={status}
          variant={status === 'Acknowledged' ? 'success' : 'warning'}
        />
      ),
    },
  ]

  const auditColumns = [
    { key: 'title', label: 'Audit Title', width: '25%' },
    { key: 'department', label: 'Department', width: '15%' },
    { key: 'auditor', label: 'Auditor', width: '20%' },
    { key: 'date', label: 'Date', width: '15%' },
    { key: 'findings', label: 'Findings', width: '15%' },
    {
      key: 'status',
      label: 'Status',
      width: '10%',
      render: (status: string) => (
        <Badge
          label={status}
          variant={
            status === 'Completed'
              ? 'success'
              : status === 'In Progress'
                ? 'warning'
                : 'info'
          }
        />
      ),
    },
  ]

  const complianceColumns = [
    { key: 'issue', label: 'Issue', width: '35%' },
    {
      key: 'severity',
      label: 'Severity',
      width: '15%',
      render: (severity: string) => (
        <Badge
          label={severity}
          variant={
            severity === 'High'
              ? 'danger'
              : severity === 'Medium'
                ? 'warning'
                : 'info'
          }
          icon={<AlertTriangle size={14} />}
        />
      ),
    },
    { key: 'department', label: 'Department', width: '20%' },
    {
      key: 'status',
      label: 'Status',
      width: '30%',
      render: (status: string) => (
        <Badge
          label={status}
          variant={
            status === 'Resolved'
              ? 'success'
              : status === 'In Progress'
                ? 'warning'
                : 'danger'
          }
        />
      ),
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Governance</h1>
        <p className="text-[#8B949E]">
          Manage policies, track compliance, and conduct audits
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#30363D]">
        <div className="flex gap-8">
          {(
            [
              { id: 'policies', label: 'Policies', hash: '#policies' },
              { id: 'acknowledgements', label: 'Acknowledgements', hash: '#acknowledgements' },
              { id: 'audits', label: 'Audits', hash: '#audits' },
              { id: 'compliance', label: 'Compliance Issues', hash: '#compliance' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-[#9D4EDD] text-[#9D4EDD]'
                  : 'border-transparent text-[#8B949E] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
        {activeTab === 'policies' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Governance Policies
              </h3>
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus size={18} />}
                onClick={() => setIsModalOpen(true)}
              >
                Add Policy
              </Button>
            </div>
            <DataTable columns={policyColumns} data={policies} />
          </div>
        )}

        {activeTab === 'acknowledgements' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Policy Acknowledgements
              </h3>
            </div>
            <DataTable
              columns={acknowledgementColumns}
              data={acknowledgements}
            />
          </div>
        )}

        {activeTab === 'audits' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Audits</h3>
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus size={18} />}
                onClick={() => setIsModalOpen(true)}
              >
                Schedule Audit
              </Button>
            </div>
            <DataTable columns={auditColumns} data={audits} />
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Compliance Issues
              </h3>
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus size={18} />}
                onClick={() => setIsModalOpen(true)}
              >
                Report Issue
              </Button>
            </div>
            <DataTable
              columns={complianceColumns}
              data={complianceIssues}
            />
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Add ${
          activeTab === 'policies'
            ? 'Policy'
            : activeTab === 'audits'
              ? 'Audit'
              : 'Issue'
        }`}
        size="md"
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
              Save
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Title" placeholder="Enter title" />
          <Select
            label="Department"
            options={[
              { value: 'finance', label: 'Finance' },
              { value: 'operations', label: 'Operations' },
              { value: 'hr', label: 'HR' },
              { value: 'corporate', label: 'Corporate' },
            ]}
            placeholder="Select department"
          />
          <Input label="Details" placeholder="Enter details" />
        </div>
      </Modal>
    </div>
  )
}
