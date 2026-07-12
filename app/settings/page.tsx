'use client'

import { useState, useEffect } from 'react'
import { DataTable } from '@/components/common/DataTable'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { Plus, Edit2, Trash2 } from 'lucide-react'

type Tab = 'departments' | 'categories' | 'configuration' | 'notifications'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('departments')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Operations', head: 'John Smith', email: 'john@company.com', members: 45 },
    { id: 2, name: 'IT', head: 'Sarah Johnson', email: 'sarah@company.com', members: 28 },
    { id: 3, name: 'Finance', head: 'Mike Chen', email: 'mike@company.com', members: 32 },
    { id: 4, name: 'HR', head: 'Emma Wilson', email: 'emma@company.com', members: 15 },
  ])
  const [categories, setCategories] = useState([
    { id: 1, name: 'Emissions', module: 'Environmental', description: 'Track carbon emissions' },
    { id: 2, name: 'Energy', module: 'Environmental', description: 'Monitor energy usage' },
    { id: 3, name: 'Diversity', module: 'Social', description: 'Track workforce diversity' },
    { id: 4, name: 'Community', module: 'Social', description: 'CSR and community programs' },
    { id: 5, name: 'Compliance', module: 'Governance', description: 'Regulatory compliance' },
    { id: 6, name: 'Ethics', module: 'Governance', description: 'Ethical governance practices' },
  ])
  const [newName, setNewName] = useState('')
  const [newHead, setNewHead] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newModule, setNewModule] = useState('environmental')
  const [newDescription, setNewDescription] = useState('')

  // Sync active tab with URL hash
  useEffect(() => {
    const updateTabFromHash = () => {
      const hash = window.location.hash
      if (hash === '#configuration') setActiveTab('configuration')
      else if (hash === '#administration') setActiveTab('departments')
      else if (hash === '#departments') setActiveTab('departments')
      else if (hash === '#categories') setActiveTab('categories')
      else if (hash === '#notifications') setActiveTab('notifications')
      else setActiveTab('departments')
    }
    updateTabFromHash()
    window.addEventListener('hashchange', updateTabFromHash)
    return () => window.removeEventListener('hashchange', updateTabFromHash)
  }, [])

  // Update URL hash when tab changes
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    let hash = ''
    if (tab === 'departments') hash = '#departments'
    else if (tab === 'categories') hash = '#categories'
    else if (tab === 'configuration') hash = '#configuration'
    else if (tab === 'notifications') hash = '#notifications'
    window.history.replaceState(null, '', hash)
  }

  // Handle saving new item (department or category)
  const handleSaveNewItem = () => {
    if (activeTab === 'departments' && newName && newHead && newEmail) {
      setDepartments([...departments, { id: departments.length + 1, name: newName, head: newHead, email: newEmail, members: 0 }])
      setIsModalOpen(false)
      setNewName('')
      setNewHead('')
      setNewEmail('')
    } else if (activeTab === 'categories' && newName && newDescription) {
      const moduleLabel = newModule === 'environmental' ? 'Environmental' : newModule === 'social' ? 'Social' : 'Governance'
      setCategories([...categories, { id: categories.length + 1, name: newName, module: moduleLabel, description: newDescription }])
      setIsModalOpen(false)
      setNewName('')
      setNewDescription('')
    }
  }

  // Handle delete department
  const handleDeleteDepartment = (id: number) => {
    setDepartments(departments.filter(d => d.id !== id))
  }



  const departmentColumns = [
    { key: 'name', label: 'Department', width: '20%' },
    { key: 'head', label: 'Department Head', width: '20%' },
    { key: 'email', label: 'Email', width: '25%' },
    { key: 'members', label: 'Members', width: '15%' },
    {
      key: 'id',
      label: 'Actions',
      width: '20%',
      render: (id: number) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" leftIcon={<Edit2 size={16} />}></Button>
          <Button variant="ghost" size="sm" leftIcon={<Trash2 size={16} />} onClick={() => handleDeleteDepartment(id)}></Button>
        </div>
      ),
    },
  ]

  const categoryColumns = [
    { key: 'name', label: 'Category Name', width: '20%' },
    { key: 'module', label: 'Module', width: '20%' },
    { key: 'description', label: 'Description', width: '45%' },
    {
      key: 'id',
      label: 'Actions',
      width: '15%',
      render: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" leftIcon={<Edit2 size={16} />}></Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-[#8B949E]">
          Configure departments, categories, and ESG system settings
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#30363D]">
        <div className="flex gap-8">
          {(
            [
              { id: 'departments', label: 'Departments', hash: '#departments' },
              { id: 'categories', label: 'Categories', hash: '#categories' },
              { id: 'configuration', label: 'Configuration', hash: '#configuration' },
              { id: 'notifications', label: 'Notifications', hash: '#notifications' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-[#8B949E] text-[#E8EAED]'
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
        {activeTab === 'departments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Manage Departments
              </h3>
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus size={18} />}
                onClick={() => setIsModalOpen(true)}
              >
                Add Department
              </Button>
            </div>
            <DataTable columns={departmentColumns} data={departments} />
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                ESG Categories
              </h3>
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus size={18} />}
                onClick={() => setIsModalOpen(true)}
              >
                Add Category
              </Button>
            </div>
            <DataTable columns={categoryColumns} data={categories} />
          </div>
        )}

        {activeTab === 'configuration' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-6">
              ESG Configuration
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0D1117] border border-[#30363D] rounded-lg">
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Auto Emission Calculation
                  </h4>
                  <p className="text-xs text-[#8B949E] mt-1">
                    Automatically calculate emissions from utility data
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#30363D] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#58A6FF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D084]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0D1117] border border-[#30363D] rounded-lg">
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    CSR Proof Requirement
                  </h4>
                  <p className="text-xs text-[#8B949E] mt-1">
                    Require proof for all CSR activity participation
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#30363D] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#58A6FF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D084]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0D1117] border border-[#30363D] rounded-lg">
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Policy Auto-Acknowledgement Reminder
                  </h4>
                  <p className="text-xs text-[#8B949E] mt-1">
                    Send reminders for policies requiring acknowledgement
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#30363D] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#58A6FF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D084]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0D1117] border border-[#30363D] rounded-lg">
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Leaderboard Visibility
                  </h4>
                  <p className="text-xs text-[#8B949E] mt-1">
                    Show department rankings on leaderboard
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#30363D] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#58A6FF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D084]"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-6">
              Notification Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0D1117] border border-[#30363D] rounded-lg">
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Email Notifications
                  </h4>
                  <p className="text-xs text-[#8B949E] mt-1">
                    Receive email updates on ESG activities
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#30363D] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#58A6FF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D084]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0D1117] border border-[#30363D] rounded-lg">
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Challenge Alerts
                  </h4>
                  <p className="text-xs text-[#8B949E] mt-1">
                    Get notified about new challenges
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#30363D] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#58A6FF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D084]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0D1117] border border-[#30363D] rounded-lg">
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Compliance Reminders
                  </h4>
                  <p className="text-xs text-[#8B949E] mt-1">
                    Receive compliance deadline reminders
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#30363D] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#58A6FF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D084]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0D1117] border border-[#30363D] rounded-lg">
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Weekly Digest
                  </h4>
                  <p className="text-xs text-[#8B949E] mt-1">
                    Receive a weekly summary of ESG progress
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#30363D] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#58A6FF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D084]"></div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          activeTab === 'departments'
            ? 'Add Department'
            : 'Add Category'
        }
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
            <Button variant="primary" size="md" onClick={handleSaveNewItem}>
              Save
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Name" placeholder="Enter name" value={newName} onChange={(e) => setNewName(e.target.value)} />
          {activeTab === 'departments' && (
            <>
              <Input label="Department Head" placeholder="Enter head name" value={newHead} onChange={(e) => setNewHead(e.target.value)} />
              <Input label="Email" placeholder="Enter email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </>
          )}
          {activeTab === 'categories' && (
            <>
              <Select
                label="Module"
                options={[
                  { value: 'environmental', label: 'Environmental' },
                  { value: 'social', label: 'Social' },
                  { value: 'governance', label: 'Governance' },
                ]}
                placeholder="Select module"
                value={newModule}
                onChange={(e) => setNewModule(e.target.value)}
              />
              <Input label="Description" placeholder="Enter description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}
