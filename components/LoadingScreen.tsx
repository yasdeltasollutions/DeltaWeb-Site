'use client';

import { useEffect } from 'react';

export default function LoadingScreen() {
  useEffect(() => {
    const initialLoading = document.getElementById('initial-loading-screen');
    if (!initialLoading) return;

    let isHidden = false;

    const hideLoading = () => {
      if (isHidden) return;
      isHidden = true;
      
      // Aguarda um frame para garantir que tudo está renderizado
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Adiciona classe fade-out para animação suave
          initialLoading.classList.add('fade-out');
          
          // Remove após a animação
          setTimeout(() => {
            initialLoading.remove();
          }, 500);
        });
      });
    };

    // Verifica se já está completo
    if (document.readyState === 'complete') {
      // Aguarda um pouco para garantir que tudo está renderizado
      setTimeout(hideLoading, 800);
    } else {
      // Aguarda o evento load
      const handleLoad = () => {
        // Aguarda um pouco para garantir que tudo está renderizado
        setTimeout(hideLoading, 800);
      };

      window.addEventListener('load', handleLoad);

      // Timeout de segurança (máximo 4 segundos)
      const timeout = setTimeout(() => {
        if (!isHidden) {
          hideLoading();
        }
      }, 4000);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

  // Não renderiza nada, apenas gerencia o elemento inicial do HTML
  return null;
}
