'use client';

import { useState, useEffect } from 'react';
import { useNavigation } from '@/contexts/NavigationContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMegaMenuServicosOpen, setIsMegaMenuServicosOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { activeSection, setActiveSection } = useNavigation();

  useEffect(() => {
    // Detecta o modo escuro/claro do sistema
    const checkDarkMode = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    };

    // Verifica imediatamente
    checkDarkMode();

    // Cria o media query listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Adiciona listener para mudanças
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDarkMode(e.matches);
    };

    // Suporte para navegadores modernos e antigos
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange as EventListener);
    } else {
      // Fallback para navegadores antigos
      (mediaQuery as any).addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange as EventListener);
      } else {
        (mediaQuery as any).removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Previne scroll do body quando o menu estiver aberto usando classe CSS
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setActiveSection(sectionId as any);
    setIsMenuOpen(false);
    // Scroll para o topo suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToInicio = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection('inicio');
    setIsMenuOpen(false);
    setIsMegaMenuOpen(false);
    setIsMegaMenuServicosOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMegaMenuNavigation = (e: React.MouseEvent<HTMLDivElement>, sectionId: string, subsectionId?: string) => {
    e.preventDefault();
    setActiveSection(sectionId as any);
    setIsMegaMenuOpen(false);
    setIsMegaMenuServicosOpen(false);
    
    if (subsectionId) {
      const offset = 100;
      const match = subsectionId.match(/^servico-card-(\d+)$/);
      const isServicoCard = !!match;

      if (isServicoCard) {
        // Áreas de competência: um único scroll até o card e abrir o modal (evita subir/descer)
        window.dispatchEvent(new CustomEvent('openServicoCard', { detail: { id: parseInt(match![1], 10) } }));
        const subsection = document.getElementById(subsectionId);
        if (subsection) {
          const subsectionPosition = subsection.getBoundingClientRect().top;
          const subsectionOffsetPosition = subsectionPosition + window.pageYOffset - offset;
          window.scrollTo({ top: subsectionOffsetPosition, behavior: 'smooth' });
        }
      } else {
        // Outras subseções (ex.: Nossas Soluções): scroll para a seção e depois para o bloco
        const mainSection = document.getElementById(sectionId);
        if (mainSection) {
          const mainSectionPosition = mainSection.getBoundingClientRect().top;
          const mainOffsetPosition = mainSectionPosition + window.pageYOffset - offset;
          window.scrollTo({ top: mainOffsetPosition, behavior: 'smooth' });
          setTimeout(() => {
            const subsection = document.getElementById(subsectionId);
            if (subsection) {
              const subsectionPosition = subsection.getBoundingClientRect().top;
              const subsectionOffsetPosition = subsectionPosition + window.pageYOffset - offset;
              window.scrollTo({ top: subsectionOffsetPosition, behavior: 'smooth' });
            }
          }, 600);
        } else {
          const subsection = document.getElementById(subsectionId);
          if (subsection) {
            const subsectionPosition = subsection.getBoundingClientRect().top;
            const subsectionOffsetPosition = subsectionPosition + window.pageYOffset - offset;
            window.scrollTo({ top: subsectionOffsetPosition, behavior: 'smooth' });
          }
        }
      }
    } else {
      // Scroll para a seção principal se não há subseção
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // Fallback: scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const menuItems = [
    { href: '#inicio', label: 'Início', sectionId: 'inicio' },
    { href: '#servicos', label: 'Áreas de Competência', sectionId: 'servicos' },
    { href: '#nossas-solucoes', label: 'Nossas Soluções', sectionId: 'nossas-solucoes' },
    { href: '#ferramentaria', label: 'Ferramentaria', sectionId: 'ferramentaria' },
    { href: '#faq', label: 'FAQ', sectionId: 'faq' },
    { href: '#contato', label: 'Contato', sectionId: 'contato' },
  ];

  // Todos os 14 cards de Áreas de Competência (icon e color alinhados com Areas-de-Competencia.tsx)
  const areasCompetenciaMenu = [
    { id: 1, icon: 'fas fa-wrench', color: '#0EA5E9', title: 'Projetos Mecânicos Avançados', description: 'Desenvolvimento de soluções mecânicas com precisão micrométrica e robustez estrutural.' },
    { id: 2, icon: 'fas fa-microchip', color: '#EF4444', title: 'Sistemas Embarcados de Alta Performance', description: 'Firmware e hardware para aplicações críticas em tempo real.' },
    { id: 3, icon: 'fas fa-industry', color: '#BF5AF2', title: 'Arquitetura Indústria 4.0', description: 'Transformação digital de processos com tecnologias emergentes.' },
    { id: 4, icon: 'fas fa-chart-line', color: '#F59E0B', title: 'Sistemas de Supervisão e Controle', description: 'Dashboards analíticos e sistemas SCADA personalizados.' },
    { id: 5, icon: 'fas fa-eye', color: '#FF375F', title: 'Visão Computacional e IA Industrial', description: 'Soluções avançadas de inspeção visual e análise inteligente.' },
    { id: 6, icon: 'fas fa-cogs', color: '#32D74B', title: 'Engenharia de Processos e Métodos', description: 'Otimização de fluxos produtivos com metodologias Lean.' },
    { id: 7, icon: 'fas fa-tools', color: '#5AC8FA', title: 'Ferramentaria de Alta Precisão', description: 'Desenvolvimento e fabricação de dispositivos, moldes e ferramentas industriais.' },
    { id: 8, icon: 'fas fa-bolt', color: '#F472B6', title: 'Engenharia de Eletrônica Aplicada', description: 'Desenvolvimento de circuitos e sistemas eletrônicos para aplicações industriais.' },
    { id: 9, icon: 'fas fa-microchip', color: '#30D158', title: 'Prototipagem Eletrônica', description: 'Criação rápida de protótipos eletrônicos funcionais para validação técnica.' },
    { id: 10, icon: 'fas fa-shield-alt', color: '#FF9F0A', title: 'Implantação / Retrofit de Máquinas (NR12)', description: 'Adequação de máquinas industriais às normas NR12 e modernização.' },
    { id: 11, icon: 'fas fa-robot', color: '#AF52DE', title: 'Projeto e Integração Robótica', description: 'Soluções completas em robótica industrial e integração em linhas automatizadas.' },
    { id: 12, icon: 'fas fa-brain', color: '#40C8E0', title: 'Projetos de Processos para Indústria 4.0', description: 'Digitalização e otimização de processos com IoT, Big Data e MES.' },
    { id: 13, icon: 'fas fa-graduation-cap', color: '#FF2D55', title: 'Treinamento Técnico e Capacitação', description: 'Formação especializada para equipes técnicas e atualização tecnológica.' },
    { id: 14, icon: 'fas fa-sliders-h', color: '#F472B6', title: 'Projetos de Sistemas Paramétricos', description: 'Sistemas inteligentes e configuráveis para automação e modelagem digital.' },
  ];

  return (
    <>
      <header 
        className="header"
        style={{
          boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.4)' : '0 2px 20px rgba(0, 0, 0, 0.2)',
          background: scrolled ? 'rgba(10, 25, 47, 0.5)' : 'rgba(10, 25, 47, 0.2)',
        }}
      >
        <nav className="navbar">
          <div className="container">
            <div className="logo" onClick={goToInicio} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToInicio(e as any); } }} aria-label="Voltar ao Início">
              <img 
                src="/logos/logo-delta.png" 
                alt="Delta Sollutions" 
                className="logo-header-img"
              />
            </div>
            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              {menuItems.map((item) => (
                <li 
                  key={item.href}
                  className={item.sectionId === 'nossas-solucoes' || item.sectionId === 'servicos' ? 'has-mega-menu' : ''}
                  onMouseEnter={() => {
                    if (item.sectionId === 'nossas-solucoes') {
                      setIsMegaMenuServicosOpen(false);
                      setIsMegaMenuOpen(true);
                    } else if (item.sectionId === 'servicos') {
                      setIsMegaMenuOpen(false);
                      setIsMegaMenuServicosOpen(true);
                    } else {
                      setIsMegaMenuOpen(false);
                      setIsMegaMenuServicosOpen(false);
                    }
                  }}
                  onMouseLeave={() => {
                    // Não fechar aqui, deixar o megamenu controlar
                  }}
                >
                  <a 
                    href={item.href} 
                    onClick={(e) => handleNavigation(e, item.sectionId)}
                    className={activeSection === item.sectionId ? 'active' : ''}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div 
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </nav>
      </header>

      {/* Mega menus fora do header: descem e sobem atrás do componente header */}
      <div className="mega-menu-layer">
          <div 
            className={`mega-menu ${isMegaMenuOpen ? 'active' : ''} ${
              activeSection === 'inicio' ? 'mega-menu-inicio' : 
              activeSection === 'contato' ? 'mega-menu-contato' : 
              'mega-menu-other'
            }`}
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <div className="mega-menu-content">
              <div className="mega-menu-column">
                <div className="mega-menu-item" onClick={(e) => handleMegaMenuNavigation(e, 'nossas-solucoes', 'painel-eletronico')}>
                  <span>Painel Eletrônico de Controle e Monitoramento</span>
                </div>
                <div className="mega-menu-item" onClick={(e) => handleMegaMenuNavigation(e, 'nossas-solucoes', 'cabine-teste')}>
                  <span>Cabine de teste para Ar-condicionado</span>
                </div>
              </div>
              <div className="mega-menu-column">
                <div className="mega-menu-item" onClick={(e) => handleMegaMenuNavigation(e, 'nossas-solucoes', 'maquina-corte')}>
                  <span>Máquina de corte dobra e buffer</span>
                </div>
                <div className="mega-menu-item" onClick={(e) => handleMegaMenuNavigation(e, 'nossas-solucoes', 'tecnologia-dados')}>
                  <span>Tecnologia e Inteligência de Dados</span>
                </div>
              </div>
              <div className="mega-menu-column">
                <div className="mega-menu-item" onClick={(e) => handleMegaMenuNavigation(e, 'nossas-solucoes', 'sistema-testes')}>
                  <span>Sistema Automatizado para Testes de Placas Eletrônicas</span>
                </div>
                <div className="mega-menu-item" onClick={(e) => handleMegaMenuNavigation(e, 'nossas-solucoes', 'sip-sistema')}>
                  <span>SIP - Sistema Industrial de Pesagem</span>
                </div>
              </div>
            </div>
          </div>
          <div 
            className={`mega-menu ${isMegaMenuServicosOpen ? 'active' : ''} ${
              activeSection === 'inicio' ? 'mega-menu-inicio' : 
              activeSection === 'contato' ? 'mega-menu-contato' : 
              'mega-menu-other'
            }`}
            onMouseEnter={() => setIsMegaMenuServicosOpen(true)}
            onMouseLeave={() => setIsMegaMenuServicosOpen(false)}
          >
            <div className="mega-menu-content mega-menu-content-14 mega-menu-4cols">
              {[areasCompetenciaMenu.slice(0, 4), areasCompetenciaMenu.slice(4, 8), areasCompetenciaMenu.slice(8, 11), areasCompetenciaMenu.slice(11, 14)].map((column, colIndex) => (
                <div key={colIndex} className="mega-menu-column">
                  {column.map((item) => (
                    <div
                      key={item.id}
                      className="mega-menu-item"
                      onClick={(e) => handleMegaMenuNavigation(e, 'servicos', `servico-card-${item.id}`)}
                    >
                      <div className="mega-menu-icon mega-menu-icon-fa">
                        <i className={item.icon} aria-hidden />
                      </div>
                      <div className="mega-menu-text-content">
                        <span>{item.title}</span>
                        <p className="mega-menu-description">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* Overlay escuro */}
      {isMenuOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar mobile */}
      <aside className={`sidebar ${isMenuOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Menu</h2>
          <button 
            className="sidebar-close"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Fechar menu"
          >
            ×
          </button>
        </div>
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item, index) => (
              <li key={item.href}>
                <a 
                  href={item.href} 
                  onClick={(e) => handleNavigation(e, item.sectionId)}
                  className={`sidebar-menu-item ${activeSection === item.sectionId ? 'active' : ''}`}
                >
                  <span className="sidebar-menu-text">{item.label}</span>
                  <span className="sidebar-menu-arrow">›</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <style jsx>{`
        /* Overlay escuro */
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 999;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Sidebar */
        .sidebar {
          position: fixed;
          top: 0;
          right: -100%;
          width: 45%;
          max-width: 280px;
          height: 100vh;
          background: rgba(10, 25, 47, 0.3);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          box-shadow: -4px 0 30px rgba(0, 0, 0, 0.5);
          z-index: 1000;
          transition: right 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          display: flex;
          flex-direction: column;
          /* Evita "scrollbar fantasma" quando a sidebar está fechada */
          overflow: hidden;
        }

        /* Fallback para navegadores que não suportam backdrop-filter */
        @supports not (backdrop-filter: blur(20px)) {
          .sidebar {
            background: rgba(10, 25, 47, 0.6);
          }
        }

        .sidebar.active {
          right: 0;
          overflow-y: auto;
        }

        /* Header da sidebar */
        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(0, 166, 255, 0.15);
        }

        .sidebar-title {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .sidebar-close {
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 2rem;
          line-height: 1;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .sidebar-close:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: rotate(90deg);
        }

        /* Navegação da sidebar */
        .sidebar-nav {
          flex: 1;
          padding: 20px 0;
        }

        .sidebar-menu {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .sidebar-menu li {
          margin: 0;
        }

        .sidebar-menu-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          color: #e6f1ff;
          text-decoration: none;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
          font-size: 1rem;
          font-weight: 500;
        }

        .sidebar-menu-item:hover {
          background: rgba(16, 219, 255, 0.1);
          color: #10dbff;
          border-left-color: #10dbff;
          padding-left: 28px;
        }

        .sidebar-menu-item.active {
          background: rgba(16, 219, 255, 0.15);
          color: #10dbff;
          border-left-color: #10dbff;
          font-weight: 600;
        }

        .sidebar-menu-text {
          flex: 1;
        }

        .sidebar-menu-arrow {
          font-size: 1.5rem;
          color: rgba(230, 241, 255, 0.5);
          transition: all 0.3s ease;
        }

        .sidebar-menu-item:hover .sidebar-menu-arrow {
          color: #10dbff;
          transform: translateX(4px);
        }

        /* Camada dos mega menus atrás do componente header (header tem z-index: 1002 no globals) */
        .mega-menu-layer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1001;
          pointer-events: none;
        }

        .mega-menu-layer .mega-menu.active {
          pointer-events: all;
        }

        /* Mega Menu */
        .has-mega-menu {
          position: relative;
        }

        .mega-menu {
          position: fixed;
          top: 55px;
          left: 0;
          right: 0;
          width: 100%;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          overflow: hidden;
          padding: 12px 0;
          min-height: auto;
          visibility: hidden;
          transform: translateY(-100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.35s ease, background 0.3s ease;
          z-index: 1001;
          pointer-events: none;
          margin: 0;
          box-sizing: border-box;
        }

        /* Estilo padrão (Início) */
        .mega-menu-inicio {
          background: rgb(4, 36, 83);
        }

        /* Estilo para outras seções (azul escuro) */
        .mega-menu-other {
          background: rgb(10, 25, 47);
        }

        /* Estilo para seção Contato (branco) */
        .mega-menu-contato {
          background: rgb(255, 255, 255);
        }

        .mega-menu.active {
          visibility: visible;
          transform: translateY(0);
          pointer-events: all;
        }

        /* Fallback para navegadores que não suportam backdrop-filter */
        @supports not (backdrop-filter: blur(20px)) {
          .mega-menu-inicio {
            background: rgb(4, 36, 83);
          }
          .mega-menu-other {
            background: rgb(10, 25, 47);
          }
          .mega-menu-contato {
            background: rgb(255, 255, 255);
          }
        }

        .mega-menu-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .mega-menu-content.mega-menu-4cols {
          grid-template-columns: repeat(4, 1fr);
          max-width: min(1600px, 96vw);
          padding: 0 16px;
        }

        .mega-menu-column {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mega-menu-item {
          padding: 8px 16px;
          background: transparent;
          border: none;
          transition: all 0.3s ease;
          cursor: pointer;
          text-align: left;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .mega-menu-item:hover {
          background: transparent;
          transform: translateX(4px);
        }

        .mega-menu-icon {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10dbff;
          margin-top: 2px;
        }

        .mega-menu-icon.mega-menu-icon-fa {
          width: 28px;
          height: 28px;
        }

        .mega-menu-icon.mega-menu-icon-fa i {
          font-size: 1.1rem;
          font-style: normal;
        }

        .mega-menu-item:hover .mega-menu-icon {
          color: #10dbff;
          transform: scale(1.1);
        }

        .mega-menu-icon.mega-menu-icon-fa,
        .mega-menu-item:hover .mega-menu-icon.mega-menu-icon-fa {
          color: #10dbff;
        }

        .mega-menu-text-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mega-menu-item span {
          color: #e6f1ff;
          font-size: 0.9rem;
          font-weight: 500;
          display: block;
          line-height: 1.4;
          margin-bottom: 4px;
        }

        .mega-menu-item:hover span {
          color: #10dbff;
        }

        .mega-menu-description {
          color: #b0e0ff;
          font-size: 0.8rem;
          font-weight: 400;
          line-height: 1.5;
          margin: 0;
          opacity: 0.8;
        }

        .mega-menu-item:hover .mega-menu-description {
          color: #ffffff;
          opacity: 1;
        }

        /* Estilos para megamenu na seção Contato (branco) */
        .mega-menu-contato .mega-menu-item span {
          color: #042453;
        }

        .mega-menu-contato .mega-menu-item:hover span {
          color: #10dbff;
        }

        .mega-menu-contato .mega-menu-icon {
          color: #0461b9;
        }

        .mega-menu-contato .mega-menu-item:hover .mega-menu-icon {
          color: #10dbff;
        }

        .mega-menu-contato .mega-menu-description {
          color: #4a5568;
        }

        .mega-menu-contato .mega-menu-item:hover .mega-menu-description {
          color: #042453;
          opacity: 1;
        }

        /* Responsive - apenas mobile */
        @media (min-width: 769px) {
          .sidebar-overlay,
          .sidebar {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .mega-menu {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .sidebar {
            width: 50%;
            max-width: 240px;
          }

          .sidebar-title {
            font-size: 1rem;
          }

          .sidebar-menu-item {
            padding: 14px 20px;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
}

