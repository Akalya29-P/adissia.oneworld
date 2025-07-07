import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Script from 'next/script';
import AOSInit from './aosinit';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: 'Land for Sale in Kalapatti | DTCP Approved Plots in Kalapatti – One World',
  description:
    'Explore DTCP approved plots in Kalapatti at One World by Adissia. Premium land for sale near Airport, TIDEL Park & major IT hubs. Ideal for investment & living.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-T865DFSRED"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-T865DFSRED', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Fonts & Styles */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT"
          crossOrigin="anonymous"
        />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />

        {/* Favicon */}
        <link rel="icon" href="./favicon.svg" sizes="any" />

        {/* Social Meta Tags */}
        <meta property="og:title" content="Land for Sale in Kalapatti – One World by Adissia" />
        <meta
          property="og:description"
          content="Premium DTCP approved plots near Airport, TIDEL Park & IT hubs."
        />
        <meta property="og:image" content="https://oneworld.adissia.com/image/ow-logo.png" />
        <meta property="og:url" content="https://oneworld.adissia.com" />
        <meta property="og:type" content="website" />
      </head>
      <body>
        <AOSInit />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}