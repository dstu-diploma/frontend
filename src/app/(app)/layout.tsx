'use client';

import { Roboto } from 'next/font/google';
import { Header } from '@/widgets/Header/ui/Header';
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar';
import styles from './layout.module.css';
import '../globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
});

// TODO: Заменить на получение реальных данных пользователя
const mockUser = {
  name: 'Иван Иванов',
  avatar: undefined
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className={`${styles.layout} ${roboto.className}`}>
          <Header user={mockUser} />
            <div className={styles.container}>
              <Sidebar />
              <main className={styles.main}>{children}</main>
            </div>
        </div>
      </body>
    </html>
  );
} 