import { IoPersonOutline } from 'react-icons/io5'
import { MdEmojiEvents } from 'react-icons/md'
import { RiTeamLine } from 'react-icons/ri'
import { RiAdminLine } from 'react-icons/ri'
import { LuMailQuestion } from 'react-icons/lu'

export type NavItem = {
  label: string
  href: string
  icon: React.ReactNode
  isIconFillable?: boolean
}

export const navigationItems: NavItem[] = [
  {
    label: 'Профиль',
    href: '/profile',
    icon: <IoPersonOutline />,
    isIconFillable: true,
  },
  {
    label: 'Хакатоны',
    href: '/hackathons',
    icon: <MdEmojiEvents />,
    isIconFillable: true,
  },
  {
    label: 'Моя команда',
    href: '/team',
    icon: <RiTeamLine />,
    isIconFillable: true,
  },
  {
    label: 'Мои обращения',
    href: '/requests',
    icon: <LuMailQuestion />,
    isIconFillable: false,
  },
  {
    label: 'Админ-панель',
    href: '/admin',
    icon: <RiAdminLine />,
    isIconFillable: true,
  },
]
