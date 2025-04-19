'use client';

import { Roboto } from 'next/font/google';
import { Header } from '@/widgets/Header/ui/Header';
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar';
import { userApi } from '@/features/user/api/profileApi';
import styles from './layout.module.css';
import '../globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
});

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const currentUser = await userApi.getProfile()

  return (
    <html>
      <body>
        <div className={`${styles.layout} ${roboto.className}`}>
          <Header user={currentUser} />
            <div className={styles.container}>
              <Sidebar />
              <main className={styles.main}>{children}</main>
            </div>
        </div>
      </body>
    </html>
  );
} 