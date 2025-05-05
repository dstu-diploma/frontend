import { FaHome } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { MdEmojiEvents } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { RiAdminLine } from "react-icons/ri";

export type NavItem = {
  label: string
  href: string
  icon: React.ReactNode
}
  
export const navigationItems: NavItem[] = [
  {
    label: 'Главная',
    href: '/',
    icon: <FaHome />,
  },
  {
    label: 'Профиль',
    href: '/profile',
    icon: <IoPersonOutline />,
  },
  {
    label: 'Хакатоны',
    href: '/hackathons',
    icon: <MdEmojiEvents />,
  },
  {
    label: 'Моя команда',
    href: '/team',
    icon: <RiTeamLine />
  },
  {
    label: 'Админ-панель',
    href: '/admin',
    icon: <RiAdminLine />
  }
];