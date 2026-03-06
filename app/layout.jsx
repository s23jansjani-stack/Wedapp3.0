import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '600'] });

export const metadata = {
  title: 'Jānis & Anete Kāzas',
  description: 'Viesu reģistrācija / Guest app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="lv">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
