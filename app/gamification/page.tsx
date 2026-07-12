'use client'

import { useState, useEffect } from 'react'
import { DataTable } from '@/components/common/DataTable'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { Input } from '@/components/common/Input'
import { Select } from '@/components/common/Select'
import { Plus, Trophy, Award, Zap, X } from 'lucide-react'

type Tab = 'challenges' | 'badges' | 'leaderboard'

export default function GamificationPage() {
  const [activeTab, setActiveTab] = useState<Tab>('challenges')
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([1])
  const [isCreateChallengeModalOpen, setIsCreateChallengeModalOpen] = useState(false)
  const [newChallengeTitle, setNewChallengeTitle] = useState('')
  const [newChallengeXp, setNewChallengeXp] = useState('')
  const [newChallengeDifficulty, setNewChallengeDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium')

  // Sync active tab with URL hash
  useEffect(() => {
    const updateTabFromHash = () => {
      const hash = window.location.hash
      if (hash === '#challenges') setActiveTab('challenges')
      else if (hash === '#badges') setActiveTab('badges')
      else if (hash === '#leaderboard') setActiveTab('leaderboard')
      else setActiveTab('challenges')
    }
    updateTabFromHash()
    window.addEventListener('hashchange', updateTabFromHash)
    return () => window.removeEventListener('hashchange', updateTabFromHash)
  }, [])

  // Update URL hash when tab changes
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    let hash = '#challenges'
    if (tab === 'badges') hash = '#badges'
    else if (tab === 'leaderboard') hash = '#leaderboard'
    window.history.replaceState(null, '', hash)
  }

  // Handle joining a challenge
  const handleJoinChallenge = (challengeId: number) => {
    if (!joinedChallenges.includes(challengeId)) {
      setJoinedChallenges([...joinedChallenges, challengeId])
    }
  }

  // Handle creating a challenge
  const handleCreateChallenge = () => {
    setIsCreateChallengeModalOpen(true)
  }

  // Handle submitting new challenge
  const handleSubmitNewChallenge = (e: React.FormEvent) => {
    e.preventDefault()
    if (newChallengeTitle && newChallengeXp) {
      const newChallenge = {
        id: challenges.length + 1,
        title: newChallengeTitle,
        xp: parseInt(newChallengeXp),
        difficulty: newChallengeDifficulty,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        participants: 0,
        icon: '🎯',
      }
      setChallenges([...challenges, newChallenge])
      setIsCreateChallengeModalOpen(false)
      setNewChallengeTitle('')
      setNewChallengeXp('')
      setNewChallengeDifficulty('Medium')
    }
  }

  // Mock Challenges Data
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: 'Carbon Reduction Challenge',
      xp: 500,
      difficulty: 'Medium' as const,
      deadline: '2024-02-28',
      participants: 34,
      icon: '♻️',
    },
    {
      id: 2,
      title: 'Paperless Week',
      xp: 300,
      difficulty: 'Easy' as const,
      deadline: '2024-02-14',
      participants: 67,
      icon: '📄',
    },
    {
      id: 3,
      title: 'Renewable Energy Pledge',
      xp: 750,
      difficulty: 'Hard' as const,
      deadline: '2024-03-31',
      participants: 12,
      icon: '⚡',
    },
    {
      id: 4,
      title: 'Community Service Hours',
      xp: 400,
      difficulty: 'Medium' as const,
      deadline: '2024-03-15',
      participants: 28,
      icon: '🤝',
    },
  ])

  // Mock Badges
  const badges = [
    {
      id: 1,
      name: 'Eco Warrior',
      description: 'Complete 5 environmental challenges',
      unlocked: 156,
      icon: '🌱',
    },
    {
      id: 2,
      name: 'Social Champion',
      description: 'Participate in 10 CSR activities',
      unlocked: 89,
      icon: '👥',
    },
    {
      id: 3,
      name: 'Governance Guardian',
      description: 'Acknowledge all policies',
      unlocked: 234,
      icon: '⚖️',
    },
    {
      id: 4,
      name: 'XP Master',
      description: 'Earn 5000 XP in a month',
      unlocked: 12,
      icon: '⭐',
    },
  ]

  // Mock Leaderboard Data
  const leaderboardData = [
    {
      rank: 1,
      department: 'IT',
      xp: 12450,
      challenges: 24,
      badges: 8,
    },
    {
      rank: 2,
      department: 'Operations',
      xp: 11230,
      challenges: 22,
      badges: 7,
    },
    {
      rank: 3,
      department: 'Finance',
      xp: 9876,
      challenges: 19,
      badges: 6,
    },
    {
      rank: 4,
      department: 'HR',
      xp: 8945,
      challenges: 17,
      badges: 5,
    },
    {
      rank: 5,
      department: 'Marketing',
      xp: 7654,
      challenges: 15,
      badges: 5,
    },
  ]

  const leaderboardColumns = [
    {
      key: 'rank',
      label: 'Rank',
      width: '10%',
      render: (rank: number) => (
        <div className="flex items-center gap-2">
          {rank <= 3 ? (
            <Trophy
              size={20}
              style={{
                color:
                  rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : '#CD7F32',
              }}
            />
          ) : (
            <span className="text-xl font-bold text-[#8B949E]">{rank}</span>
          )}
        </div>
      ),
    },
    { key: 'department', label: 'Department', width: '25%' },
    {
      key: 'xp',
      label: 'Total XP',
      width: '20%',
      render: (xp: number) => (
        <span className="text-lg font-semibold text-[#58A6FF]">{xp}</span>
      ),
    },
    { key: 'challenges', label: 'Challenges', width: '20%' },
    { key: 'badges', label: 'Badges', width: '25%' },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Gamification</h1>
        <p className="text-[#8B949E]">
          Engage employees through challenges, badges, and leaderboards
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#30363D]">
        <div className="flex gap-8">
          {(
            [
              { id: 'challenges', label: 'Challenges', hash: '#challenges' },
              { id: 'badges', label: 'Badges', hash: '#badges' },
              { id: 'leaderboard', label: 'Leaderboard', hash: '#leaderboard' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-[#FF7F50] text-[#FF7F50]'
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
        {activeTab === 'challenges' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Active Challenges
              </h3>
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus size={18} />}
                onClick={handleCreateChallenge}
              >
                Create Challenge
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="bg-[#161B22] border border-[#30363D] rounded-lg p-6 hover:border-[#FF7F50] transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{challenge.icon}</span>
                    <Badge
                      label={challenge.difficulty}
                      variant={
                        challenge.difficulty === 'Easy'
                          ? 'success'
                          : challenge.difficulty === 'Medium'
                            ? 'warning'
                            : 'danger'
                      }
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {challenge.title}
                  </h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Zap size={18} className="text-[#FF7F50]" />
                      <span className="text-sm font-semibold text-[#FF7F50]">
                        {challenge.xp} XP
                      </span>
                    </div>
                    <span className="text-sm text-[#8B949E]">
                      {challenge.participants} joined
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs text-[#8B949E] mb-2">Deadline</p>
                    <p className="text-sm font-medium text-white">
                      {challenge.deadline}
                    </p>
                  </div>
                  <Button
                    variant={joinedChallenges.includes(challenge.id) ? 'success' : 'primary'}
                    size="md"
                    className="w-full"
                    leftIcon={joinedChallenges.includes(challenge.id) ? <Trophy size={18} /> : <Plus size={18} />}
                    onClick={() => handleJoinChallenge(challenge.id)}
                    disabled={joinedChallenges.includes(challenge.id)}
                  >
                    {joinedChallenges.includes(challenge.id) ? 'Joined!' : 'Join Challenge'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Available Badges
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-[#161B22] border border-[#30363D] rounded-lg p-6 text-center hover:border-[#FF7F50] transition-colors"
                >
                  <div className="text-5xl mb-4 flex justify-center">
                    {badge.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {badge.name}
                  </h4>
                  <p className="text-sm text-[#8B949E] mb-4">
                    {badge.description}
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <Award size={16} className="text-[#FF7F50]" />
                    <span className="text-sm font-semibold text-[#8B949E]">
                      {badge.unlocked} unlocked
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Department Leaderboard
            </h3>
            <DataTable
              columns={leaderboardColumns}
              data={leaderboardData}
            />
          </div>
        )}
      </div>

      {/* Create Challenge Modal */}
      <Modal
        isOpen={isCreateChallengeModalOpen}
        onClose={() => setIsCreateChallengeModalOpen(false)}
        title="Create New Challenge"
      >
        <form onSubmit={handleSubmitNewChallenge} className="space-y-4">
          <Input
            label="Challenge Title"
            placeholder="Enter challenge title"
            value={newChallengeTitle}
            onChange={(e) => setNewChallengeTitle(e.target.value)}
            required
          />
          <Input
            label="XP Amount"
            type="number"
            placeholder="Enter XP amount"
            value={newChallengeXp}
            onChange={(e) => setNewChallengeXp(e.target.value)}
            required
          />
          <div>
            <label className="block text-sm font-medium text-[#8B949E] mb-2">
              Difficulty
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setNewChallengeDifficulty('Easy')}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                  newChallengeDifficulty === 'Easy'
                    ? 'border-[#00D084] bg-[#00D084]/20 text-[#00D084]'
                    : 'border-[#30363D] text-[#8B949E] hover:text-white'
                }`}
              >
                Easy
              </button>
              <button
                type="button"
                onClick={() => setNewChallengeDifficulty('Medium')}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                  newChallengeDifficulty === 'Medium'
                    ? 'border-[#FF7F50] bg-[#FF7F50]/20 text-[#FF7F50]'
                    : 'border-[#30363D] text-[#8B949E] hover:text-white'
                }`}
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => setNewChallengeDifficulty('Hard')}
                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                  newChallengeDifficulty === 'Hard'
                    ? 'border-[#F85149] bg-[#F85149]/20 text-[#F85149]'
                    : 'border-[#30363D] text-[#8B949E] hover:text-white'
                }`}
              >
                Hard
              </button>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="danger"
              size="md"
              onClick={() => setIsCreateChallengeModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="success"
              size="md"
              leftIcon={<Plus size={18} />}
              className="flex-1"
            >
              Create Challenge
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
