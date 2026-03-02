import { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type SidebarLinkProps = {
  href: string
  icon?: LucideIcon
  image?: string
  label: string
  expanded: boolean
  isLogout?: boolean
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  expanded,
  image,
}: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-md hover:bg-primary-dark transition-colors"
    >
      {image ? (
        <div className="w-6 h-6 rounded-full overflow-hidden relative flex-shrink-0">
          <Image src={image} alt={label} fill className="object-cover" />
        </div>
      ) : Icon ? (
        <Icon size={24} />
      ) : (
        <div className="w-6 h-6 bg-gray-500 rounded-full" />
      )}
      {expanded && <span className="whitespace-nowrap">{label}</span>}
    </Link>
  )
}

export default SidebarLink
