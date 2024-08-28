import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MainHeader from '@/components/header/mainHeader.component';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cats',
  description: 'Database about cats',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainHeader></MainHeader>
        {children}
      </body>
    </html>
  );
}
