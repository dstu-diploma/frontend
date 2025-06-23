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

  const filteredNavigationItems = navigationItems.filter((item: NavItem) => {
    if (!user) return false
    if (item.href === '/admin' && user.role !== 'admin') return false
    if (item.href === '/team' && user.role !== 'user') return false
    if (item.href === '/requests' && user.role === 'judge') return false
    return true
  })

  const processedNavigationItems = filteredNavigationItems.map(item => {
    if (item.href === '/requests' && user.role === 'admin') {
      return { ...item, label: 'Все обращения' }
    }
    return item
  })

  return {
    isClient,
    pathname,
    handleLogout,
    processedNavigationItems,
  }
}
