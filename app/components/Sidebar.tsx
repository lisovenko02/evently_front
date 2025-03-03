import Link from 'next/link'
import {
  Menu,
  X,
  Home,
  Calendar,
  Trophy,
  User,
  Store,
  FileUser,
} from 'lucide-react'
import SidebarLink from '@/components/ui/SidebarLink'
import { useAuthStore } from '@/store/auth/authStore'

interface SidebarProps {
  isExpanded: boolean
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ isExpanded, setIsExpanded }: SidebarProps) => {
  const { user } = useAuthStore()

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full bg-accent-gray text-light shadow-lg transition-all duration-300 z-40 ${
          isExpanded ? 'w-64' : 'w-16'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-[16.5px] bg-accent-dark border-b border-gray-700">
          <Link href={'/'} className="text-xl font-bold text-primary">
            {isExpanded ? 'Evently' : 'E'}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="pt-5 space-y-2 min-h-screen border-r border-gray-700">
          <SidebarLink
            href="/"
            icon={Home}
            label="Home"
            expanded={isExpanded}
          />
          <SidebarLink
            href="/leaderboard"
            icon={Trophy}
            label="Leaders"
            expanded={isExpanded}
          />
          <SidebarLink
            href="/store"
            icon={Store}
            label="Store"
            expanded={isExpanded}
          />
          {user && (
            <>
              <SidebarLink
                href="/profile"
                icon={User}
                label="Profile"
                expanded={isExpanded}
              />
              <SidebarLink
                href="/dashboard"
                icon={FileUser}
                label="Dashboard"
                expanded={isExpanded}
              />
              <SidebarLink
                href="/events"
                icon={Calendar}
                label="My Events"
                expanded={isExpanded}
              />
            </>
          )}
        </nav>
      </aside>

      <button
        className={`fixed top-5 transition-all duration-300 bg-primary text-dark p-2 rounded-full shadow-lg z-50 ${
          isExpanded ? 'left-[260px]' : 'left-[80px]'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile */}
      {isExpanded && (
        <div className="fixed inset-0 bg-accent-gray bg-opacity-50 z-30 md:hidden" />
      )}
    </>
  )
}

export default Sidebar
