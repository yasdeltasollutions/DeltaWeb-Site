'use client';

import { useEffect, useState } from 'react';

// Função para identificar se o navegador está no modo escuro ou claro
function isDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (e) {
    return false;
  }
}

export default function FaviconHandler() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Garantir que só executa após o mount no client
    setMounted(true);
  }, []);

  useEffect(() => {
    // Só executar após o mount
    if (!mounted || typeof window === 'undefined') return;

    const updateFavicon = (isDark: boolean) => {
      // Encontra ou cria o link do favicon
      let favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
      
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/png';
        document.head.appendChild(favicon);
      }

      // Modo escuro: delta-logo2.PNG | Modo claro: delta-logo.png
      const faviconPath = isDark ? '/logos/delta-logo2.PNG' : '/logos/delta-logo.png';
      favicon.href = faviconPath;
    };

    // Atualiza o favicon inicial
    const initialIsDark = isDarkMode();
    updateFavicon(initialIsDark);

    // Listener para mudanças no modo escuro/claro
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
        const isDark = e.matches !== undefined ? e.matches : (e as MediaQueryList).matches;
        updateFavicon(isDark);
      };

      // Adiciona listener (versão moderna)
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        
        return () => {
          mediaQuery.removeEventListener('change', handleChange);
        };
      } else {
        // Fallback para navegadores antigos
        mediaQuery.addListener(handleChange);
        
        return () => {
          mediaQuery.removeListener(handleChange);
        };
      }
    }
  }, [mounted]);

  // Retorna null para não renderizar nada no DOM
  return null;
}


