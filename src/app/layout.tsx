import type { ReactNode, ReactElement, CSSProperties } from 'react';
import { Inter } from 'next/font/google';
import { university } from '@/config';
import { Providers } from './providers';
import './globals.css';
const inter=Inter({subsets:['latin'],variable:'--font-inter',display:'swap'});
export const metadata={title:'Campus Events | Example University',description:'Find your people. Make your campus yours.'};
export const viewport={width:'device-width',initialScale:1,viewportFit:'cover'};
export default function RootLayout({children}:{children:ReactNode}):ReactElement {return <html lang="en"><body className={inter.variable} style={{'--primary':university.primaryColor} as CSSProperties}><a className="skip-link" href="#main">Skip to content</a><Providers>{children}</Providers></body></html>;}