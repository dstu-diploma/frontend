import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { usePathname, useRouter } from 'next/navigation'
import { navigationItems, NavItem } from '../configs/navItemsConfig'

export const useSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const user = cookiesApi.getUser()

  const handleLogout = () => {
    cookiesApi.removeAuthCookies()
    router.push('/login')
  }

  const processedNavigationItems = navigationItems.filter((item: NavItem) => {
    if (item.href === '/admin' && user.role !== 'admin') {
      return false
    }

    if (item.href === '/team' && user.role !== 'user') {
      return false
    }

    return true
  })

  return {
    pathname,
    handleLogout,
    processedNavigationItems,
  }
}
