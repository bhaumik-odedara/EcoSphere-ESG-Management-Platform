'use client'

import { useState } from 'react'
import { MetricsOverview } from '@/components/dashboard/MetricsOverview'
import { ChartCard } from '@/components/dashboard/ChartCard'
import { Button } from '@/components/common'
import { Modal } from '@/components/common/Modal'
import { Input } from '@/components/common/Input'
import { Plus, TrendingUp } from 'lucide-react'

type ModalType = 'emission' | 'csr' | 'policy' | 'challenge' | null

export default function DashboardPage() {
  const [openModal, setOpenModal] = useState<ModalType>(null)
  // Mock data for charts
  const emissionsData = [
    { month: 'Jan', emissions: 4000, target: 3500 },
    { month: 'Feb', emissions: 3800, target: 3500 },
    { month: 'Mar', emissions: 3600, target: 3500 },
    { month: 'Apr', emissions: 3400, target: 3500 },
    { month: 'May', emissions: 3200, target: 3500 },
    { month: 'Jun', emissions: 3100, target: 3500 },
    { month: 'Jul', emissions: 3000, target: 3500 },
    { month: 'Aug', emissions: 2900, target: 3500 },
    { month: 'Sep', emissions: 2800, target: 3500 },
    { month: 'Oct', emissions: 2700, target: 3500 },
    { month: 'Nov', emissions: 2600, target: 3500 },
    { month: 'Dec', emissions: 2500, target: 3500 },
  ]

  const departmentData = [
    { department: 'Operations', score: 85 },
    { department: 'IT', score: 78 },
    { department: 'HR', score: 92 },
    { department: 'Finance', score: 88 },
    { department: 'Marketing', score: 76 },
    { department: 'Sales', score: 81 },
  ]

  const recentActivity = [
    {
      title: 'Carbon Target Updated',
      time: '2 hours ago',
      module: 'Environmental',
      color: '#00D084',
      bgColor: '#00D084/20',
    },
    {
      title: 'New CSR Activity Posted',
      time: '5 hours ago',
      module: 'Social',
      color: '#0099FF',
      bgColor: '#0099FF/20',
    },
    {
      title: 'Policy Audit Completed',
      time: '1 day ago',
      module: 'Governance',
      color: '#9D4EDD',
      bgColor: '#9D4EDD/20',
    },
    {
      title: 'Badge Unlocked',
      time: '2 days ago',
      module: 'Gamification',
      color: '#FF7F50',
      bgColor: '#FF7F50/20',
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Metrics Overview */}
      <MetricsOverview />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Emissions Trend (12 Months)"
          type="line"
          data={emissionsData}
          dataKey="emissions"
          color="#00D084"
          xAxisKey="month"
        />
        <ChartCard
          title="Department ESG Ranking"
          type="bar"
          data={departmentData}
          dataKey="score"
          color="#58A6FF"
          xAxisKey="department"
          height={300}
        />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[#161B22] border border-[#30363D] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <TrendingUp size={20} className="text-[#8B949E]" />
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-[#0D1117] rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activity.color }}
                  />
                  <div>
                    <p className="text-sm font-medium text-white">
                      {activity.title}
                    </p>
                    <p className="text-xs text-[#8B949E]">{activity.time}</p>
                  </div>
                </div>
                <span
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    backgroundColor: activity.bgColor,
                    color: activity.color,
                  }}
                >
                  {activity.module}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button
              variant="success"
              size="md"
              className="w-full"
              leftIcon={<Plus size={18} />}
              onClick={() => setOpenModal('emission')}
            >
              Log Emission
            </Button>
            <Button
              variant="primary"
              size="md"
              className="w-full"
              leftIcon={<Plus size={18} />}
              onClick={() => setOpenModal('csr')}
            >
              Add CSR Activity
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="w-full"
              leftIcon={<Plus size={18} />}
              onClick={() => setOpenModal('policy')}
            >
              Submit Policy
            </Button>
            <Button
              variant="ghost"
              size="md"
              className="w-full"
              leftIcon={<Plus size={18} />}
              onClick={() => setOpenModal('challenge')}
            >
              Create Challenge
            </Button>
          </div>
        </div>
      </div>

      {/* Emission Modal */}
      <Modal
        isOpen={openModal === 'emission'}
        onClose={() => setOpenModal(null)}
        title="Log Emission"
        size="md"
        footer={
          <>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setOpenModal(null)}
            >
              Cancel
            </Button>
            <Button variant="success" size="md">
              Log Emission
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Source" placeholder="e.g., Company Vehicle" />
          <Input label="Emission Type" placeholder="e.g., CO2" />
          <Input label="Quantity (kg)" type="number" placeholder="e.g., 500" />
          <Input label="Date" type="date" />
          <Input label="Notes" placeholder="Add any relevant notes" />
        </div>
      </Modal>

      {/* CSR Activity Modal */}
      <Modal
        isOpen={openModal === 'csr'}
        onClose={() => setOpenModal(null)}
        title="Add CSR Activity"
        size="md"
        footer={
          <>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setOpenModal(null)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="md">
              Add Activity
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Activity Name" placeholder="e.g., Community Cleanup" />
          <Input label="Department" placeholder="Select department" />
          <Input label="Participants" type="number" placeholder="e.g., 25" />
          <Input label="Hours Contributed" type="number" placeholder="e.g., 50" />
          <Input label="Date" type="date" />
        </div>
      </Modal>

      {/* Policy Modal */}
      <Modal
        isOpen={openModal === 'policy'}
        onClose={() => setOpenModal(null)}
        title="Submit Policy"
        size="md"
        footer={
          <>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setOpenModal(null)}
            >
              Cancel
            </Button>
            <Button variant="secondary" size="md">
              Submit Policy
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Policy Title" placeholder="e.g., Carbon Neutrality Policy" />
          <Input label="Department" placeholder="Select department" />
          <Input label="Effective Date" type="date" />
          <Input label="Description" placeholder="Describe the policy" />
        </div>
      </Modal>

      {/* Challenge Modal */}
      <Modal
        isOpen={openModal === 'challenge'}
        onClose={() => setOpenModal(null)}
        title="Create Challenge"
        size="md"
        footer={
          <>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setOpenModal(null)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="md">
              Create Challenge
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Challenge Title" placeholder="e.g., Carbon Reduction Challenge" />
          <Input label="Description" placeholder="Describe the challenge" />
          <Input label="Reward Points" type="number" placeholder="e.g., 500" />
          <Input label="End Date" type="date" />
          <Input label="Difficulty Level" placeholder="Easy / Medium / Hard" />
        </div>
      </Modal>
    </div>
  )
}
