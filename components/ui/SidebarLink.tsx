import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface SidebarLinkProps {
  href: string
  icon: LucideIcon
  label: string
  expanded: boolean
  isLogout?: boolean
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  expanded,
  isLogout,
}: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-md hover:bg-primary-dark transition-colors"
    >
      <Icon size={24} />
      {expanded && <span className="whitespace-nowrap">{label}</span>}
    </Link>
  )
}

export default SidebarLink
