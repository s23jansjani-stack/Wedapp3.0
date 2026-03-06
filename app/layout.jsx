import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin', 'latin-ext'], weight: ['300', '400', '600'] });

export const metadata = {
  title: 'Jānis & Anete Kāzas',
  description: 'Kāzu viesu reģistrācija',
}

export default function RootLayout({ children }) {
  return (
    <html lang="lv">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
