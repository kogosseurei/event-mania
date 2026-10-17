import type { ReactNode, ReactElement } from 'react';
import './globals.css';
export const metadata = { title: 'Campus Events | Example University', description: 'Find your people. Make your campus yours.' };
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };
export default function RootLayout({ children }: { children: ReactNode }): ReactElement { return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>; }