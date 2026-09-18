'use client';

import { useEffect } from 'react';

export function HomeMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    const elements = document.querySelectorAll<HTMLElement>('[data-home-reveal]');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

    elements.forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight * 0.96) {
        element.classList.add('reveal-pending');
        observer.observe(element);
      }
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
