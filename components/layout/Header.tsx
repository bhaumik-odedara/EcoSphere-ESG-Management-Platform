'use client'

import { Bell, User, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'

const pageNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/environmental': 'Environmental Management',
  '/social': 'Social Responsibility',
  '/governance': 'Governance',
  '/gamification': 'Gamification',
  '/reports': 'Reports',
  '/settings': 'Settings',
}

export default function Header() {
  const pathname = usePathname()

  const getPageTitle = () => {
    for (const [path, title] of Object.entries(pageNames)) {
      if (pathname?.startsWith(path)) {
        return title
      }
    }
    return 'Dashboard'
  }

  return (
    <header className="fixed top-0 right-0 left-0 md:left-[280px] h-16 bg-[#111827] border-b border-[#21262D] flex items-center justify-between px-6 z-30">
      {/* Page Title */}
      <h2 className="text-lg font-semibold text-white">{getPageTitle()}</h2>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 hover:bg-[#161B22] rounded-lg transition-colors relative">
          <Bell size={20} className="text-[#8B949E]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF7F50] rounded-full" />
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-2 pl-4 border-l border-[#21262D]">
          <button className="p-2 hover:bg-[#161B22] rounded-lg transition-colors">
            <User size={20} className="text-[#8B949E]" />
          </button>
          <button className="p-2 hover:bg-[#161B22] rounded-lg transition-colors">
            <LogOut size={20} className="text-[#8B949E]" />
          </button>
        </div>
      </div>
    </header>
  )
}
