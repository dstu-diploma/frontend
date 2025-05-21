'use client'

import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { usePathname, useRouter } from 'next/navigation'
import { navigationItems, NavItem } from '../configs/navItemsConfig'
import { useEffect, useState } from 'react'

export const useSidebar = () => {
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const user = cookiesApi.getUser()

  const handleLogout = () => {
    cookiesApi.removeAuthCookies()
    router.push('/login')
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  const processedNavigationItems = navigationItems.filter((item: NavItem) => {
    if (!user) return false

    if (item.href === '/admin' && user.role !== 'admin') {
      return false
    }

    if (item.href === '/team' && user.role !== 'user') {
      return false
    }

    return true
  })

  return {
    isClient,
    pathname,
    handleLogout,
    processedNavigationItems,
  }
}
