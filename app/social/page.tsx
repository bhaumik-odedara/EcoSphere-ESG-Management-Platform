'use client'

import { useState, useEffect } from 'react'
import { DataTable } from '@/components/common/DataTable'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Plus, Users, Heart } from 'lucide-react'

type Tab = 'activities' | 'participation' | 'diversity'

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState<Tab>('activities')

  // Sync active tab with URL hash
  useEffect(() => {
    const updateTabFromHash = () => {
      const hash = window.location.hash
      if (hash === '#csr') setActiveTab('activities')
      else if (hash === '#participation') setActiveTab('participation')
      else if (hash === '#diversity') setActiveTab('diversity')
      else setActiveTab('activities')
    }
    updateTabFromHash()
    window.addEventListener('hashchange', updateTabFromHash)
    return () => window.removeEventListener('hashchange', updateTabFromHash)
  }, [])

  // Update URL hash when tab changes
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    let hash = '#csr'
    if (tab === 'participation') hash = '#participation'
    else if (tab === 'diversity') hash = '#diversity'
    window.history.replaceState(null, '', hash)
  }

  // Mock CSR Activities
  const csrActivities = [
    {
      id: 1,
      title: 'Community Cleanup Drive',
      description: 'Clean up local parks and beaches',
      date: '2024-02-15',
      participants: 45,
      category: 'Environment',
      image: '🌍',
    },
    {
      id: 2,
      title: 'Tech Workshop for Youth',
      description: 'Teaching coding to underprivileged youth',
      date: '2024-02-20',
      participants: 32,
      category: 'Education',
      image: '💻',
    },
    {
      id: 3,
      title: 'Food Bank Volunteer',
      description: 'Support local food bank operations',
      date: '2024-02-25',
      participants: 28,
      category: 'Community',
      image: '🤝',
    },
  ]

  // Mock Participation Data
  const participationData = [
    {
      id: 1,
      employee: 'John Smith',
      activity: 'Community Cleanup Drive',
      proof: 'Photo Uploaded',
      points: 100,
      status: 'Approved',
    },
    {
      id: 2,
      employee: 'Sarah Johnson',
      activity: 'Tech Workshop for Youth',
      proof: 'Certificate',
      points: 150,
      status: 'Pending',
    },
    {
      id: 3,
      employee: 'Mike Chen',
      activity: 'Food Bank Volunteer',
      proof: 'Photo Uploaded',
      points: 100,
      status: 'Approved',
    },
    {
      id: 4,
      employee: 'Emma Wilson',
      activity: 'Community Cleanup Drive',
      proof: 'Pending',
      points: 0,
      status: 'Pending',
    },
  ]

  // Mock Diversity Data
  const diversityData = [
    {
      id: 1,
      category: 'Gender Distribution',
      male: 45,
      female: 42,
      other: 3,
      percentage: 47,
    },
    {
      id: 2,
      category: 'Age Groups',
      '18-25': 15,
      '26-40': 52,
      '41-55': 18,
      '56+': 5,
      percentage: 52,
    },
    {
      id: 3,
      category: 'Ethnicity',
      diverse: 68,
      percentage: 68,
    },
    {
      id: 4,
      category: 'People with Disabilities',
      count: 8,
      percentage: 8,
    },
  ]

  const participationColumns = [
    { key: 'employee', label: 'Employee', width: '20%' },
    { key: 'activity', label: 'Activity', width: '25%' },
    { key: 'proof', label: 'Proof', width: '15%' },
    { key: 'points', label: 'Points', width: '15%' },
    {
      key: 'status',
      label: 'Status',
      width: '25%',
      render: (status: string) => (
        <Badge
          label={status}
          variant={status === 'Approved' ? 'success' : 'warning'}
        />
      ),
    },
  ]

  const diversityColumns = [
    { key: 'category', label: 'Category', width: '30%' },
    {
      key: 'percentage',
      label: 'Participation Rate',
      width: '30%',
      render: (percentage: number) => (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-[#30363D] rounded-full h-2">
            <div
              className="h-2 bg-[#0099FF] rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-sm">{percentage}%</span>
        </div>
      ),
    },
    { key: 'count', label: 'Count', width: '40%' },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Social Responsibility
        </h1>
        <p className="text-[#8B949E]">
          Manage CSR activities, track employee participation, and monitor
          diversity metrics
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#30363D]">
        <div className="flex gap-8">
          {(
            [
              { id: 'activities', label: 'CSR Activities', hash: '#csr' },
              { id: 'participation', label: 'Participation', hash: '#participation' },
              { id: 'diversity', label: 'Diversity Dashboard', hash: '#diversity' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-[#0099FF] text-[#0099FF]'
                  : 'border-transparent text-[#8B949E] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'activities' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Active CSR Activities
              </h3>
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus size={18} />}
              >
                Create Activity
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {csrActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-[#161B22] border border-[#30363D] rounded-lg p-6 hover:border-[#0099FF] transition-colors"
                >
                  <div className="text-4xl mb-4">{activity.image}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-[#8B949E] mb-4">
                    {activity.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <Badge label={activity.category} variant="info" />
                    <span className="flex items-center gap-1 text-sm text-[#8B949E]">
                      <Users size={16} />
                      {activity.participants}
                    </span>
                  </div>
                  <div className="text-xs text-[#8B949E] mb-4">
                    {activity.date}
                  </div>
                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full"
                    leftIcon={<Heart size={18} />}
                  >
                    Join Activity
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'participation' && (
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Employee Participation
              </h3>
              <Button variant="primary" size="md" leftIcon={<Plus size={18} />}>
                Add Participation
              </Button>
            </div>
            <DataTable
              columns={participationColumns}
              data={participationData}
            />
          </div>
        )}

        {activeTab === 'diversity' && (
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-6">
              Diversity Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {diversityData.map((item) => (
                <div
                  key={item.id}
                  className="border border-[#30363D] rounded-lg p-4"
                >
                  <h4 className="text-sm font-semibold text-white mb-3">
                    {item.category}
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="w-full bg-[#30363D] rounded-full h-2 mb-2">
                        <div
                          className="h-2 bg-[#0099FF] rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-[#8B949E]">
                        {item.percentage}% representation
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
