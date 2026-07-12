'use client'

import { useState, useEffect } from 'react'
import { DataTable } from '@/components/common/DataTable'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { Plus } from 'lucide-react'

type Tab = 'factors' | 'products' | 'transactions' | 'goals'

export default function EnvironmentalPage() {
  const [activeTab, setActiveTab] = useState<Tab>('factors')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Sync active tab with URL hash
  useEffect(() => {
    const updateTabFromHash = () => {
      const hash = window.location.hash
      if (hash === '#emissions') setActiveTab('factors')
      else if (hash === '#products') setActiveTab('products')
      else if (hash === '#transactions') setActiveTab('transactions')
      else if (hash === '#goals') setActiveTab('goals')
      else setActiveTab('factors')
    }
    updateTabFromHash()
    window.addEventListener('hashchange', updateTabFromHash)
    return () => window.removeEventListener('hashchange', updateTabFromHash)
  }, [])

  // Update URL hash when tab changes
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    let hash = '#emissions'
    if (tab === 'products') hash = '#products'
    else if (tab === 'transactions') hash = '#transactions'
    else if (tab === 'goals') hash = '#goals'
    window.history.replaceState(null, '', hash)
  }

  // Mock data for Emission Factors
  const emissionFactors = [
    {
      id: 1,
      name: 'Natural Gas',
      department: 'Operations',
      targetCO2: 500,
      currentCO2: 520,
      progress: 96,
      deadline: '2024-12-31',
      status: 'On Track',
    },
    {
      id: 2,
      name: 'Electricity',
      department: 'IT',
      targetCO2: 1200,
      currentCO2: 1050,
      progress: 88,
      deadline: '2024-12-31',
      status: 'On Track',
    },
    {
      id: 3,
      name: 'Vehicle Fuel',
      department: 'Operations',
      targetCO2: 300,
      currentCO2: 350,
      progress: 114,
      deadline: '2024-12-31',
      status: 'At Risk',
    },
    {
      id: 4,
      name: 'Water Usage',
      department: 'Facilities',
      targetCO2: 200,
      currentCO2: 150,
      progress: 75,
      deadline: '2024-12-31',
      status: 'On Track',
    },
  ]

  // Mock data for Products
  const products = [
    {
      id: 1,
      name: 'Product A',
      esgScore: 85,
      carbon: 45.2,
      status: 'Certified',
    },
    {
      id: 2,
      name: 'Product B',
      esgScore: 72,
      carbon: 62.1,
      status: 'In Review',
    },
    {
      id: 3,
      name: 'Product C',
      esgScore: 91,
      carbon: 38.5,
      status: 'Certified',
    },
  ]

  // Mock data for Transactions
  const transactions = [
    {
      id: 1,
      date: '2024-01-15',
      type: 'Emission',
      amount: 250,
      department: 'Operations',
    },
    {
      id: 2,
      date: '2024-01-14',
      type: 'Carbon Credit',
      amount: -100,
      department: 'Finance',
    },
    {
      id: 3,
      date: '2024-01-13',
      type: 'Offset',
      amount: -150,
      department: 'Operations',
    },
  ]

  // Mock data for Goals
  const goals = [
    {
      id: 1,
      goal: 'Reduce Emissions by 20%',
      target: 2025,
      progress: 45,
      owner: 'Operations',
    },
    {
      id: 2,
      goal: '100% Renewable Energy',
      target: 2026,
      progress: 30,
      owner: 'IT',
    },
    {
      id: 3,
      goal: 'Zero Waste Program',
      target: 2025,
      progress: 60,
      owner: 'Facilities',
    },
  ]

  const emissionFactorColumns = [
    { key: 'name', label: 'Factor Name', width: '20%' },
    { key: 'department', label: 'Department', width: '15%' },
    { key: 'targetCO2', label: 'Target CO₂', width: '12%' },
    { key: 'currentCO2', label: 'Current CO₂', width: '12%' },
    {
      key: 'progress',
      label: 'Progress',
      width: '12%',
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <div className="w-12 bg-[#30363D] rounded-full h-1.5">
            <div
              className="h-1.5 bg-[#00D084] rounded-full transition-all"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm">{value}%</span>
        </div>
      ),
    },
    { key: 'deadline', label: 'Deadline', width: '14%' },
    {
      key: 'status',
      label: 'Status',
      width: '15%',
      render: (status: string) => (
        <Badge
          label={status}
          variant={status === 'On Track' ? 'success' : 'warning'}
        />
      ),
    },
  ]

  const productColumns = [
    { key: 'name', label: 'Product Name', width: '25%' },
    {
      key: 'esgScore',
      label: 'ESG Score',
      width: '20%',
      render: (score: number) => (
        <span style={{ color: score >= 85 ? '#00D084' : '#FF7F50' }}>
          {score}
        </span>
      ),
    },
    { key: 'carbon', label: 'Carbon Footprint', width: '20%' },
    {
      key: 'status',
      label: 'Status',
      width: '35%',
      render: (status: string) => (
        <Badge
          label={status}
          variant={
            status === 'Certified'
              ? 'success'
              : status === 'In Review'
                ? 'warning'
                : 'danger'
          }
        />
      ),
    },
  ]

  const transactionColumns = [
    { key: 'date', label: 'Date', width: '20%' },
    { key: 'type', label: 'Transaction Type', width: '25%' },
    {
      key: 'amount',
      label: 'Amount (tonnes)',
      width: '20%',
      render: (amount: number) => (
        <span style={{ color: amount < 0 ? '#00D084' : '#FF7F50' }}>
          {amount > 0 ? '+' : ''}{amount}
        </span>
      ),
    },
    { key: 'department', label: 'Department', width: '35%' },
  ]

  const goalColumns = [
    { key: 'goal', label: 'Goal', width: '30%' },
    { key: 'target', label: 'Target Year', width: '15%' },
    {
      key: 'progress',
      label: 'Progress',
      width: '25%',
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-[#30363D] rounded-full h-1.5">
            <div
              className="h-1.5 bg-[#58A6FF] rounded-full transition-all"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm">{value}%</span>
        </div>
      ),
    },
    { key: 'owner', label: 'Owner', width: '30%' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'factors':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Emission Factors
              </h3>
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus size={18} />}
                onClick={() => setIsModalOpen(true)}
              >
                Add Factor
              </Button>
            </div>
            <DataTable
              columns={emissionFactorColumns}
              data={emissionFactors}
            />
          </div>
        )
      case 'products':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Product ESG Profiles
              </h3>
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus size={18} />}
                onClick={() => setIsModalOpen(true)}
              >
                Add Product
              </Button>
            </div>
            <DataTable columns={productColumns} data={products} />
          </div>
        )
      case 'transactions':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Carbon Transactions
              </h3>
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus size={18} />}
                onClick={() => setIsModalOpen(true)}
              >
                Log Transaction
              </Button>
            </div>
            <DataTable
              columns={transactionColumns}
              data={transactions}
            />
          </div>
        )
      case 'goals':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Environmental Goals
              </h3>
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus size={18} />}
                onClick={() => setIsModalOpen(true)}
              >
                New Goal
              </Button>
            </div>
            <DataTable columns={goalColumns} data={goals} />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Environmental Management
        </h1>
        <p className="text-[#8B949E]">
          Track emissions, manage carbon footprint, and achieve sustainability
          goals
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#30363D]">
        <div className="flex gap-8">
          {(
            [
              { id: 'factors', label: 'Emission Factors', hash: '#emissions' },
              { id: 'products', label: 'Product Profiles', hash: '#products' },
              { id: 'transactions', label: 'Transactions', hash: '#transactions' },
              { id: 'goals', label: 'Goals', hash: '#goals' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-[#00D084] text-[#00D084]'
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
        {renderTabContent()}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Add ${activeTab === 'factors' ? 'Emission Factor' : activeTab === 'products' ? 'Product' : activeTab === 'transactions' ? 'Transaction' : 'Goal'}`}
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
          <Input label="Name" placeholder="Enter name" />
          <Select
            label="Department"
            options={[
              { value: 'operations', label: 'Operations' },
              { value: 'it', label: 'IT' },
              { value: 'finance', label: 'Finance' },
              { value: 'facilities', label: 'Facilities' },
            ]}
            placeholder="Select department"
          />
          <Input label="Value" placeholder="Enter value" type="number" />
        </div>
      </Modal>
    </div>
  )
}
