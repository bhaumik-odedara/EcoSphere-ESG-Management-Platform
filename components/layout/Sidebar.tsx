'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  Leaf,
  Users,
  Scale,
  Trophy,
  FileText,
  Settings,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from 'lucide-react'
import { useState, useEffect } from 'react'

interface NavItem {
  label: string
  href?: string
  icon: React.ReactNode
  color: string
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <BarChart3 size={20} />,
    color: '#58A6FF',
  },
  {
    label: 'Environmental',
    href: '/environmental',
    icon: <Leaf size={20} />,
    color: '#00D084',
    children: [
      {
        label: 'Emission Tracking',
        href: '/environmental#emissions',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#00D084',
      },
      {
        label: 'Product Profiles',
        href: '/environmental#products',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#00D084',
      },
      {
        label: 'Custom Transactions',
        href: '/environmental#transactions',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#00D084',
      },
      {
        label: 'Goals',
        href: '/environmental#goals',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#00D084',
      },
    ],
  },
  {
    label: 'Social',
    href: '/social',
    icon: <Users size={20} />,
    color: '#0099FF',
    children: [
      {
        label: 'CSR Activities',
        href: '/social#csr',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#0099FF',
      },
      {
        label: 'Employee Participation',
        href: '/social#participation',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#0099FF',
      },
      {
        label: 'Diversity Dashboard',
        href: '/social#diversity',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#0099FF',
      },
    ],
  },
  {
    label: 'Governance',
    href: '/governance',
    icon: <Scale size={20} />,
    color: '#9D4EDD',
    children: [
      {
        label: 'Policies',
        href: '/governance#policies',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#9D4EDD',
      },
      {
        label: 'Acknowledgements',
        href: '/governance#acknowledgements',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#9D4EDD',
      },
      {
        label: 'Audits',
        href: '/governance#audits',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#9D4EDD',
      },
      {
        label: 'Compliance Issues',
        href: '/governance#compliance',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#9D4EDD',
      },
    ],
  },
  {
    label: 'Gamification',
    href: '/gamification',
    icon: <Trophy size={20} />,
    color: '#FF7F50',
    children: [
      {
        label: 'Challenges',
        href: '/gamification#challenges',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#FF7F50',
      },
      {
        label: 'Badges',
        href: '/gamification#badges',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#FF7F50',
      },
      {
        label: 'Leaderboard',
        href: '/gamification#leaderboard',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#FF7F50',
      },
    ],
  },
  {
    label: 'AI Insights',
    href: '/ai-insights',
    icon: <Sparkles size={20} />,
    color: '#00D084',
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: <FileText size={20} />,
    color: '#58A6FF',
    children: [
      {
        label: 'Analytics Dashboard',
        href: '/reports#analytics',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#58A6FF',
      },
      {
        label: 'Report Templates',
        href: '/reports#templates',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#58A6FF',
      },
      {
        label: 'Custom Report Builder',
        href: '/reports#builder',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#58A6FF',
      },
    ],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings size={20} />,
    color: '#8B949E',
    children: [
      {
        label: 'Configuration',
        href: '/settings#configuration',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#8B949E',
      },
      {
        label: 'Administration',
        href: '/settings#administration',
        icon: <div className="w-1 h-1 bg-current rounded-full" />,
        color: '#8B949E',
      },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [hash, setHash] = useState('')
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Get and update hash
  useEffect(() => {
    const updateHash = () => setHash(window.location.hash)
    updateHash()
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  // Auto-expand parent items based on current path/hash
  useEffect(() => {
    const newExpanded: string[] = []
    navItems.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => {
          if (!child.href) return false
          const [childPath, childHash] = child.href.split('#')
          return pathname?.startsWith(childPath) && (hash === `#${childHash}` || !childHash)
        })
        if (hasActiveChild || (item.href && pathname?.startsWith(item.href.split('#')[0]))) {
          newExpanded.push(item.label)
        }
      }
    })
    setExpandedItems(newExpanded)
  }, [pathname, hash])

  const isActive = (href?: string) => {
    if (!href) return false
    const [hrefPath, hrefHash] = href.split('#')
    const pathMatches = pathname?.startsWith(hrefPath)
    if (!hrefHash) return pathMatches
    return pathMatches && hash === `#${hrefHash}`
  }

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    )
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed md:hidden bottom-4 left-4 z-50 p-2 bg-[#161B22] border border-[#30363D] rounded-lg hover:bg-[#21262D]"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed h-full w-[280px] bg-[#0D1117] border-r border-[#21262D] transition-transform duration-300 z-40 md:translate-x-0 flex flex-col ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-[#21262D]">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00D084] to-[#0099FF] rounded-lg" />
            EcoSphere
          </h1>
          <p className="text-xs text-[#8B949E] mt-1">ESG Management Platform</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between">
                <Link
                  href={item.href || '#'}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.href)
                      ? 'bg-[#161B22] border-l-4'
                      : 'hover:bg-[#161B22]'
                  }`}
                  style={{
                    borderLeftColor: isActive(item.href) ? item.color : 'transparent',
                  }}
                >
                  <span style={{ color: item.color }}>{item.icon}</span>
                  <span
                    className={`text-sm font-medium ${
                      isActive(item.href) ? 'text-white' : 'text-[#8B949E]'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
                {item.children && (
                  <button
                    onClick={() => toggleExpanded(item.label)}
                    className="px-2 py-3 text-[#8B949E] hover:text-white"
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        expandedItems.includes(item.label) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* Sub-items */}
              {item.children && expandedItems.includes(item.label) && (
                <div className="ml-4 space-y-1 border-l-2 border-[#30363D]">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href || '#'}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-all ${
                        isActive(child.href)
                          ? 'bg-[#161B22] text-white'
                          : 'text-[#8B949E] hover:text-white hover:bg-[#161B22]'
                      }`}
                    >
                      <span style={{ color: isActive(child.href) ? child.color : '#8B949E' }}>{child.icon}</span>
                      <span>{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#21262D]">
          <div className="text-xs text-[#8B949E] text-center">
            <p>v1.0.0</p>
            <p className="mt-1">© 2024 EcoSphere</p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
