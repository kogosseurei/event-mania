import { Analytics } from '@vercel/analytics/next';
import { publicEnvironmentSchema } from '@/lib';
import type { ReactNode, ReactElement, CSSProperties } from 'react';
import { Inter } from 'next/font/google';
import { university } from '@/config';
import { Providers } from './providers';
import './globals.css';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const environment = publicEnvironmentSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
});
export const metadata = {
  metadataBase: new URL(environment.NEXT_PUBLIC_APP_URL),
  title: `Campus Events | ${university.name}`,
  description: 'Find your people. Make your campus yours.',
};
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };
export default function RootLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <html lang="en" style={{ '--brand-primary': university.primaryColor } as CSSProperties}>
      <body className={inter.variable}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
