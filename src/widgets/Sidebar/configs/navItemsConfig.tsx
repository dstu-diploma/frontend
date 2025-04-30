import { FaHome } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { MdEmojiEvents } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";

type NavItem = {
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
    label: 'Мои команды',
    href: '/teams',
    icon: <RiTeamLine />
  },
  ];