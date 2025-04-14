'use client';

import { Roboto } from 'next/font/google';
import '../globals.css';
import styles from './layout.module.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={roboto.className}>
      <body>
        <div className={styles.layout}>
          <main className={styles.main}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
} 