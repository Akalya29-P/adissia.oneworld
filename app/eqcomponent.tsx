'use client';

import { useEffect } from 'react';

export default function AOSInitializer() {
  useEffect(() => {
    import('aos').then((AOS) => {
      AOS.init({ once: true });
    });
  }, []);

  return null;
}