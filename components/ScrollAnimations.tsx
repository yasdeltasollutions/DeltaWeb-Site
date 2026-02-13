'use client';

import { useEffect, useRef } from 'react';

type ScrollAnimationsProps = { activeSection?: string };

export default function ScrollAnimations({ activeSection }: ScrollAnimationsProps) {
  const revealObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Animate on Scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Scroll Reveal – conteúdo aparece ao entrar na viewport (enquanto você rola)
    const revealOptions = { rootMargin: '0px 0px -10% 0px', threshold: 0 };
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-reveal-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, revealOptions);
    revealObserverRef.current = revealObserver;

    const observeScrollReveal = () => {
      document.querySelectorAll('.scroll-reveal:not(.scroll-reveal-visible)').forEach(el => {
        revealObserver.observe(el);
      });
    };

    // Função para observar elementos após um delay (para garantir que o DOM esteja pronto)
    const initAnimations = () => {
      const serviceCards = document.querySelectorAll('.service-card:not(.animate-in)');
      serviceCards.forEach(el => {
        if (!el.classList.contains('animate-on-scroll')) {
          el.classList.add('animate-on-scroll');
          observer.observe(el);
        }
      });

      const statItems = document.querySelectorAll('.stat-item:not(.stat-card):not(.animate-in)');
      statItems.forEach(el => {
        if (!el.classList.contains('animate-on-scroll')) {
          el.classList.add('animate-on-scroll');
          observer.observe(el);
        }
      });

      observeScrollReveal();
    };

    initAnimations();
    setTimeout(initAnimations, 100);
    setTimeout(initAnimations, 500);

    const mutationObserver = new MutationObserver(() => {
      initAnimations();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      revealObserver.disconnect();
      mutationObserver.disconnect();
      revealObserverRef.current = null;
    };
  }, []);

  // Quando a seção visível muda, re-observar .scroll-reveal para que o conteúdo apareça ao rolar (não tudo de uma vez)
  useEffect(() => {
    if (!activeSection) return;
    const t = setTimeout(() => {
      const obs = revealObserverRef.current;
      if (!obs) return;
      document.querySelectorAll('.scroll-reveal:not(.scroll-reveal-visible)').forEach(el => {
        obs.observe(el);
      });
    }, 150);
    return () => clearTimeout(t);
  }, [activeSection]);

  return null;
}

