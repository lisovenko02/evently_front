import Link from 'next/link'
import {
  Home,
  Calendar,
  Trophy,
  User,
  Store,
  FileUser,
  X,
  LogOut,
} from 'lucide-react'
import SidebarLink from '@/components/ui/SidebarLink'
import { useAuthStore } from '@/store/auth/authStore'

export interface ExpandedProps {
  isExpanded: boolean
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ isExpanded, setIsExpanded }: ExpandedProps) => {
  const { user } = useAuthStore()

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 h-full bg-accent-gray text-light shadow-lg transition-all duration-300 z-50
          ${isExpanded ? 'w-64' : 'w-16'}
          lg:block
          ${isExpanded ? 'block' : 'hidden'} 
          lg:relative 
          ${isExpanded ? 'lg:w-64' : 'lg:w-16'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* --- Header --- */}
          <div className="flex items-center justify-between gap-3 p-[16.5px] bg-accent-dark border-b border-gray-700">
            <Link href="/" className="text-xl font-bold text-primary">
              {isExpanded ? 'Evently' : 'E'}
            </Link>
            <button
              className="md:hidden text-light"
              onClick={() => setIsExpanded(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* --- Navigation --- */}
          <nav className="flex-1 pt-5 space-y-2 border-r border-gray-700">
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
                  href="/my-applications"
                  icon={FileUser}
                  label="Applications"
                  expanded={isExpanded}
                />
                <SidebarLink
                  href="/my-events"
                  icon={Calendar}
                  label="My Events"
                  expanded={isExpanded}
                />
              </>
            )}
          </nav>

          {/* --- Logout --- */}
          <div className="border-r border-t border-gray-700">
            <SidebarLink
              href="/exit"
              icon={LogOut}
              label="Logout"
              expanded={isExpanded}
            />
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-accent-gray bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  )
}

export default Sidebar
