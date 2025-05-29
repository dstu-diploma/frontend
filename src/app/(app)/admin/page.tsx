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

const AdminPage = () => {
  return (
    <Suspense fallback={<LayoutFallback text='Загрузка админ-панели...' />}>
      <div className={styles.adminPage}>
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
              <TabsTrigger
                className={styles.tabsTrigger}
                value='hackathonTeams'
              >
                Хакатоновские команды
              </TabsTrigger>
            </TabsList>
            <TabsContent className={styles.tabContent} value='users'>
              <AdminTab tab='users' />
            </TabsContent>
            <TabsContent className={styles.tabContent} value='brandTeams'>
              <AdminTab tab='brandTeams' />
            </TabsContent>
            <TabsContent className={styles.tabContent} value='hackathonTeams'>
              <AdminTab tab='hackathonTeams' />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Suspense>
  )
}

export default AdminPage
