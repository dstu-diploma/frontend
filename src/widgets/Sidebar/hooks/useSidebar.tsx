'use client'

import { cookiesApi } from '@/shared/lib/helpers/cookies'
import { usePathname, useRouter } from 'next/navigation'
import { navigationItems, NavItem } from '../configs/navItemsConfig'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export const useSidebar = () => {
  const queryClient = useQueryClient()
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const user = cookiesApi.getUser()
  const hackathonInfo = queryClient.getQueryData(['hackathonById'])

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
    if (item.href === '/requests' && !hackathonInfo && user.role === 'user')
      return false
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
