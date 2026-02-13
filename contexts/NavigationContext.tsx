'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type SectionId = 'inicio' | 'sobre' | 'servicos' | 'nossas-solucoes' | 'ferramentaria' | 'faq' | 'contato';

interface NavigationContextType {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio');

  // Sincronizar com hash da URL
  useEffect(() => {
    const hash = window.location.hash.slice(1) as SectionId;
    const validSections: SectionId[] = ['inicio', 'sobre', 'servicos', 'nossas-solucoes', 'ferramentaria', 'faq', 'contato'];
    
    if (hash && validSections.includes(hash)) {
      setActiveSection(hash);
    }
  }, []);

  // Atualizar URL quando a seção mudar
  useEffect(() => {
    if (activeSection === 'inicio') {
      window.history.replaceState(null, '', window.location.pathname);
    } else {
      window.history.replaceState(null, '', `#${activeSection}`);
    }
  }, [activeSection]);

  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}


