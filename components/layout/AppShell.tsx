import Sidebar from './Sidebar'
import Header from './Header'

export default function AppShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-[#0E1117]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-[280px]">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-auto mt-16 md:mt-16">
          {children}
        </main>
      </div>
    </div>
  )
}
