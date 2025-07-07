'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on route change
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', 'G-T865DFSRED', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return <>{children}</>;
}