'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui/shadcn/tabs'
import AdminTab from '@/features/admin/ui/AdminTab'
import LayoutFallback from '@/shared/ui/custom/fallback/LayoutFallback/LayoutFallback'
import { Suspense } from 'react'
import styles from './admin.module.scss'
import { useScreenSize } from '@/providers/ScreenSizeProvider'
import clsx from 'clsx'

const AdminPage = () => {
  const { isMobile, isTablet, isDesktop, isMediumDesktop } = useScreenSize()
  const adminPageStyles = clsx(styles.adminPage, {
    [styles.mobile]: isMobile,
    [styles.tablet]: isTablet,
    [styles.desktop]: isDesktop,
    [styles.mediumDesktop]: isMediumDesktop,
  })

  return (
    <Suspense fallback={<LayoutFallback text='Загрузка админ-панели...' />}>
      <div className={adminPageStyles}>
        <h1>Панель администратора</h1>
        <p>
          В данной панели вы можете управлять состоянием системы, выбрав
          соответствующую категорию.
        </p>
        <div className={styles.adminPageContent}>
          <Tabs defaultValue='users' className={styles.tabs}>
            <TabsList className={styles.tabsList}>
              <TabsTrigger className={styles.tabsTrigger} value='users'>
                Пользователи
              </TabsTrigger>
              <TabsTrigger className={styles.tabsTrigger} value='brandTeams'>
                Брендовые команды
              </TabsTrigger>
            </TabsList>
            <TabsContent className={styles.tabContent} value='users'>
              <AdminTab tab='users' />
            </TabsContent>
            <TabsContent className={styles.tabContent} value='brandTeams'>
              <AdminTab tab='brandTeams' />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Suspense>
  )
}

export default AdminPage
