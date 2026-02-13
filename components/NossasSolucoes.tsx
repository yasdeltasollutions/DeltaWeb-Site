'use client';

import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function NossasSolucoes() {
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageRef2 = useRef<HTMLImageElement>(null);
  const imageRef3 = useRef<HTMLImageElement>(null);
  const imageRef4 = useRef<HTMLImageElement>(null);
  const imageRef5 = useRef<HTMLImageElement>(null);
  const imageRef6 = useRef<HTMLImageElement>(null);
  const [activeSection, setActiveSection] = useState<string>('painel-eletronico');
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(true);
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Evita hydration mismatch: menu flutuante só renderiza no cliente após montar
  useEffect(() => {
    setMounted(true);
  }, []);

  // Seções disponíveis para o menu (sem o título geral "Nossas Soluções")
  const sections = [
    { id: 'painel-eletronico', title: 'Painel Eletrônico de Controle e Monitoramento' },
    { id: 'cabine-teste', title: 'Cabine de teste para Ar-condicionado' },
    { id: 'maquina-corte', title: 'Máquina de corte dobra e buffer' },
    { id: 'sistema-testes', title: 'Sistema Automatizado para Testes de Placas Eletrônicas' },
    { id: 'tecnologia-dados', title: 'Tecnologia e Inteligência de Dados' },
    { id: 'sip-sistema', title: 'SIP - Sistema Industrial de Pesagem' }
  ];

  // Ao clicar no menu, rola até a seção e fecha o menu flutuante
  const selectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsFloatingMenuOpen(false);
    if (sectionId !== 'nossas-solucoes') {
      const el = document.getElementById(sectionId);
      if (el) {
        const offset = 100;
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  // Observar a seção principal apenas para mostrar/ocultar o menu flutuante
  useEffect(() => {
    const sectionElement = document.getElementById('nossas-solucoes');
    if (!sectionElement) return;
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsSectionVisible(entry.isIntersecting || entry.intersectionRatio > 0);
        });
      },
      {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '-100px 0px -100px 0px'
      }
    );
    sectionObserver.observe(sectionElement);
    return () => sectionObserver.disconnect();
  }, []);


  useEffect(() => {
    // Criar partículas tecnológicas flutuantes
    function createTechParticles() {
      const container = particlesContainerRef.current;
      if (!container) return;

      container.innerHTML = '';
      const particleCount = 40;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const hue = 180 + Math.random() * 60;
        const delay = Math.random() * 15;
        const duration = 10 + Math.random() * 10;
        
        particle.style.cssText = `
          position: absolute;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          width: 4px;
          height: 4px;
          background: hsl(${hue}, 100%, 60%);
          border-radius: 50%;
          box-shadow: 0 0 8px hsl(${hue}, 100%, 60%);
          pointer-events: none;
          display: block;
          visibility: visible;
          opacity: 0.3;
          z-index: 2;
          animation: techFloat ${duration}s infinite linear;
          animation-delay: ${delay}s;
        `;
        particle.classList.add('tech-particle');

        container.appendChild(particle);
      }
    }

    const timer = setTimeout(() => {
      createTechParticles();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="nossas-solucoes" className="nossas-solucoes-section">
      <div 
        className="tech-particles" 
        ref={particlesContainerRef}
        id="tech-particles"
      ></div>

      {/* Menu flutuante: só após mount no cliente para evitar hydration mismatch */}
      {mounted &&
        isSectionVisible &&
        typeof document !== 'undefined' &&
        document.body &&
        createPortal(
          <div ref={menuRef} className={`floating-nav-menu ${isFloatingMenuOpen ? 'expanded' : ''}`}>
            <button
              type="button"
              className="floating-nav-trigger"
              onClick={() => setIsFloatingMenuOpen((o) => !o)}
              aria-label={isFloatingMenuOpen ? 'Fechar menu de seções' : 'Abrir menu de seções'}
              aria-expanded={isFloatingMenuOpen}
            >
              <span className="floating-nav-line" />
              <span className="floating-nav-line" />
              <span className="floating-nav-line" />
            </button>
            <div className="floating-nav-dropdown-wrapper">
              <p className="floating-nav-panel-title">Painel de Navegação</p>
              <div className="floating-nav-dropdown">
                <div className="floating-nav-dropdown-inner">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    className={`floating-nav-link ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => selectSection(section.id)}
                  >
                    {section.title}
                  </button>
                ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      <div className="container-wrapper scroll-reveal">
        <div className="container">
          <div className="content-wrapper">
            <div className="section-header scroll-reveal scroll-reveal-delay-1">
              <h2>Algumas de Nossas <span style={{ color: '#10dbff' }}>Soluções</span></h2>
              <p className="section-subtitle">
                Soluções completas e integradas para transformar sua operação industrial
              </p>
            </div>

            <div className="solucao-block scroll-reveal scroll-reveal-delay-2">
            <h3 className="solucao-block-title">Painel Eletrônico de Controle e Monitoramento</h3>
            <div className="solucoes-layout" id="painel-eletronico">
          <div className="solucoes-content">
            <div className="text-content">
              <div className="solucoes-description">
                <p>
                  Desenvolvido para aplicações <strong>industriais que exigem coleta de dados</strong>, monitoramento e controle preciso de processos, este equipamento conta com estrutura robusta em aço inox, display digital de alta visibilidade e interface simplificada para operação em ambientes de produção.
                </p>
                
                <p>
                  O projeto foi concebido com foco em <strong>durabilidade</strong>, <strong>facilidade de instalação e manutenção mínima</strong>, garantindo confiabilidade operacional mesmo em condições severas.
                </p>
                
                <p>
                  Além do <strong>design compacto</strong>, o sistema pode <strong>ser customizado conforme a necessidade do cliente</strong>, integrando-se a diferentes tipos de automação e sensores.
                </p>

              </div>
            </div>
          </div>
          
          <div className="solucoes-image">
            <div className="image-wrapper">
              <img 
                ref={imageRef}
                src="/imagens_solucoes/painel-eletronico.png" 
                alt="Painel Eletrônico de Controle e Monitoramento"
                className="painel-image"
              />
            </div>
          </div>
          </div>

          <div className="features-list">
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Estrutura robusta em aço inox</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Display digital de alta visibilidade</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Interface simplificada para operação</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Confiabilidade operacional em condições severas</span>
            </div>
          </div>
            </div>

            <div className="solucao-block scroll-reveal scroll-reveal-delay-3">
            <h3 className="solucao-block-title">Cabine de teste para Ar-condicionado</h3>
            <div className="solucoes-layout" id="cabine-teste">
          <div className="solucoes-image">
            <div className="image-wrapper">
              <img 
                ref={imageRef2}
                src="/imagens_solucoes/cabine-teste.png" 
                alt="Cabine de teste para Ar-condicionado"
                className="painel-image"
              />
            </div>
          </div>
          
          <div className="solucoes-content">
            <div className="text-content">
              <div className="solucoes-description">
                <p>
                  Este projeto consiste no desenvolvimento de um equipamento automatizado de última geração, projetado para realizar <strong>testes funcionais, operacionais e de desempenho em unidades evaporadoras de ar-condicionado</strong> desde modelos residenciais até sistemas industriais.
                </p>
                
                <p>
                  A máquina foi concebida para garantir máxima <strong>confiabilidade, segurança e eficiência</strong> nos processos de validação técnica, antes que os equipamentos sejam entregues ao cliente ou instalados em campo. Com tecnologia embarcada, <strong>sensores inteligentes e controle digital</strong>, ela simula condições reais de operação, detecta falhas, <strong>gera relatórios</strong> e assegura que cada unidade testada esteja em conformidade com os <strong>padrões de qualidade</strong> exigidos pelo mercado.
                </p>
              </div>
            </div>
          </div>
          </div>

          <div className="features-list">
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Testes funcionais e de desempenho</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Confiabilidade, segurança e eficiência</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Sensores inteligentes e controle digital</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Geração automática de relatórios</span>
            </div>
          </div>
            </div>

            <div className="solucao-block scroll-reveal scroll-reveal-delay-4">
            <h3 className="solucao-block-title">Máquina de corte dobra e buffer</h3>
          <div className="solucoes-layout" id="maquina-corte">
          <div className="solucoes-content">
            <div className="text-content">
              <div className="solucoes-description">
                <p>
                  Este projeto consiste em uma <strong>máquina industrial</strong> automatizada desenvolvida para realizar com precisão as etapas de <strong>corte e dobra</strong> de materiais utilizados na produção de tabuleiros de jogos. O equipamento foi projetado para <strong>otimizar</strong> o processo de conformação, garantindo que cada peça seja <strong>cortada e dobrada com exatidão</strong>, pronta para seguir à etapa de embalagem.
                </p>
                
                <p>
                  Com <strong>estrutura robusta</strong>, <strong>controle digital</strong> e <strong>operação segura</strong>, a máquina atende <strong>fabricantes de jogos, gráficas e centros de produção criativa</strong> que buscam <strong>padronização, agilidade e qualidade</strong>.
                </p>
              </div>
            </div>
          </div>
          
          <div className="solucoes-image">
            <div className="image-wrapper">
              <img 
                ref={imageRef3}
                src="/imagens_solucoes/maquina-de-corte.png" 
                alt="Máquina de corte dobra e buffer"
                className="painel-image"
              />
            </div>
          </div>
          </div>

          <div className="features-list">
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Máquina industrial automatizada</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Corte e dobra com precisão</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Estrutura robusta</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Controle digital e operação segura</span>
            </div>
          </div>
            </div>

            <div className="solucao-block scroll-reveal scroll-reveal-delay-5">
            <h3 className="solucao-block-title">Sistema Automatizado para Testes de Placas Eletrônicas</h3>
          <div className="solucoes-layout" id="sistema-testes">
          <div className="solucoes-image" style={{ marginTop: '80px' }}>
            <div className="image-wrapper" style={{ maxWidth: '600px' }}>
              <img 
                ref={imageRef4}
                src="/imagens_solucoes/maquina-placa.png" 
                alt="Sistema Automatizado para Testes de Placas Eletrônicas"
                className="painel-image"
              />
            </div>
          </div>
          
          <div className="solucoes-content">
            <div className="text-content">
              <div className="solucoes-description">
                <p>
                  Nossa empresa é especializada no desenvolvimento e fabricação de <strong>JIGS de teste personalizados</strong>, voltados para validação funcional e elétrica de placas eletrônicas em ambientes industriais, laboratoriais e de assistência técnica.
                </p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', color: '#b0e0ff', fontSize: '1.1rem', lineHeight: '1.8' }}>
                  <li style={{ marginBottom: '15px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#10dbff' }}>•</span>
                    <strong>FCT (Functional Circuit Test):</strong> Testes funcionais completos com simulação de operação real.
                  </li>
                  <li style={{ marginBottom: '15px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#10dbff' }}>•</span>
                    <strong>ICT (In-Circuit Test):</strong> Testes elétricos ponto a ponto para verificação de componentes e trilhas.
                  </li>
                  <li style={{ marginBottom: '15px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#10dbff' }}>•</span>
                    <strong>JIGs de Programação:</strong> Para gravação de firmware diretamente na placa.
                  </li>
                  <li style={{ marginBottom: '15px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#10dbff' }}>•</span>
                    <strong>JIGs de Diagnóstico e Retrabalho:</strong> Para análise de falhas e manutenção técnica.
                  </li>
                  <li style={{ marginBottom: '15px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#10dbff' }}>•</span>
                    <strong>Soluções customizadas:</strong> Adaptadas ao layout, conectores e requisitos específicos de cada cliente.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', textAlign: 'center', marginTop: '40px' }}>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#b0e0ff',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Com <strong>estrutura robusta</strong>, <strong>pinos de contato de alta precisão</strong>, <strong>conectores dedicados</strong> e <strong>interface digital</strong>, nossos JIGs garantem <strong>eficiência, confiabilidade e rastreabilidade</strong> em cada etapa do processo de teste.
          </p>
          </div>

          <div className="features-list">
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>JIGs de teste customizados</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>FCT e ICT para validação completa</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Pinos de contato de alta precisão</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Eficiência, confiabilidade e rastreabilidade</span>
            </div>
          </div>
            </div>

            <div className="solucao-block scroll-reveal scroll-reveal-delay-6">
            <h3 className="solucao-block-title">Tecnologia e Inteligência de Dados</h3>
          <div className="solucoes-layout" id="tecnologia-dados">
          <div className="solucoes-image">
            <div className="image-wrapper">
              <img 
                ref={imageRef5}
                src="/imagens_solucoes/sistemas.png" 
                alt="Tecnologia e Inteligência de Dados"
                className="painel-image"
              />
            </div>
          </div>
          
          <div className="solucoes-content">
            <div className="text-content">
              <div className="solucoes-description">
                <p>
                  A Delta Sollutions amplia seu campo de atuação com o <strong>desenvolvimento de softwares, dashboards</strong> personalizados e soluções baseadas em inteligência artificial, integrando tecnologia e automação para impulsionar resultados.
                </p>
                
                <p>
                  Com foco em conectividade, análise de dados e eficiência operacional, nossas soluções digitais permitem:
                </p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', color: '#b0e0ff', fontSize: '1.1rem', lineHeight: '1.8' }}>
                  <li style={{ marginBottom: '15px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#10dbff' }}>•</span>
                    Monitoramento em tempo real de processos;
                  </li>
                  <li style={{ marginBottom: '15px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#10dbff' }}>•</span>
                    Indicadores de desempenho e produtividade;
                  </li>
                  <li style={{ marginBottom: '15px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#10dbff' }}>•</span>
                    Previsão de falhas e manutenção inteligente;
                  </li>
                  <li style={{ marginBottom: '15px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#10dbff' }}>•</span>
                    Integração com equipamentos e sistemas industriais.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          </div>

          <div className="features-list">
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Softwares e dashboards personalizados</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Monitoramento em tempo real</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Previsão de falhas e manutenção inteligente</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Integração com equipamentos industriais</span>
            </div>
          </div>
            </div>

            <div className="solucao-block scroll-reveal scroll-reveal-delay-6">
            <h3 className="solucao-block-title">SIP - Sistema Industrial de Pesagem</h3>
          <div className="solucoes-layout" id="sip-sistema">
          <div className="solucoes-image">
            <div className="image-wrapper">
              <img 
                ref={imageRef6}
                src="/imagens_solucoes/SIP.png" 
                alt="SIP - Sistema Industrial de Pesagem"
                className="painel-image"
              />
            </div>
          </div>
          
          <div className="solucoes-content">
            <div className="text-content">
              <div className="solucoes-description">
                <p>
                  O SIP – Sistema Industrial de Pesagem é uma solução desenvolvida para o controle e monitoramento de processos de pesagem industrial. O sistema realiza o cálculo de peso, identifica diferenças em relação aos valores esperados e aponta possíveis itens faltantes, contribuindo para a redução de erros e maior controle operacional.
                </p>
                
                <p>
                  O SIP funciona por meio de integração com balanças industriais via comunicação USB Serial, permitindo a coleta automática e precisa dos dados de pesagem. Possui configurações personalizáveis, adequando-se às necessidades de cada processo produtivo, além de identificação dos registros para melhor rastreabilidade.
                </p>
                
                <p>
                  Como complemento, o sistema disponibiliza a geração de relatórios diários, facilitando a conferência das operações, a análise de resultados e o apoio à tomada de decisões.
                </p>
              </div>
            </div>
          </div>
          </div>

          <div className="features-list">
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Pesagem industrial</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Cálculo de peso e diferença</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Identificação de itens faltantes</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Integração USB serial</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Configurações de pesagem</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Relatório diário</span>
          </div>
          <div className="feature-item">
            <div className="feature-dot"></div>
            <span>Identificações</span>
          </div>
        </div>
            </div>
        </div>
      </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-15px) translateX(8px);
            opacity: 0.4;
          }
        }

        @keyframes techFloat {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(100px, -100px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatImage {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-14px);
          }
        }

        .nossas-solucoes-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          padding: 0 20px 20px 20px;
          background: #01071A;
          overflow: visible;
          font-family: 'Quicksand', sans-serif;
          margin-top: 0;
          padding-top: 0;
        }

        /* Menu flutuante: sempre na tela (fixo), abaixo do mega menu do header (mega menu = 1001) */
        .floating-nav-menu {
          position: fixed;
          top: 100px;
          right: 24px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0;
          transition: opacity 0.3s ease;
        }

        .floating-nav-trigger {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: rgba(1, 7, 26, 0.9);
          border: 1px solid rgba(16, 219, 255, 0.35);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .floating-nav-trigger:hover {
          border-color: rgba(16, 219, 255, 0.6);
          box-shadow: 0 0 20px rgba(16, 219, 255, 0.2);
        }

        .floating-nav-line {
          display: block;
          width: 20px;
          height: 2px;
          background: #b0e0ff;
          border-radius: 1px;
          transition: all 0.3s ease;
        }

        .floating-nav-trigger:hover .floating-nav-line,
        .floating-nav-menu.expanded .floating-nav-line {
          background: #10dbff;
        }

        .floating-nav-menu.expanded .floating-nav-line:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .floating-nav-menu.expanded .floating-nav-line:nth-child(2) {
          opacity: 0;
          transform: scaleX(0.4);
        }

        .floating-nav-menu.expanded .floating-nav-line:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .floating-nav-dropdown-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          margin-top: -6px;
          transform: translateY(-10px) scale(0.9) rotateX(-15deg);
          transform-origin: top right;
          transition:
            max-height 0.45s cubic-bezier(0.22, 0.61, 0.36, 1),
            opacity 0.35s ease,
            transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .floating-nav-menu.expanded .floating-nav-dropdown-wrapper {
          max-height: 80vh;
          opacity: 1;
          transform: translateY(0) scale(1) rotateX(0);
          transition:
            max-height 0.45s cubic-bezier(0.22, 0.61, 0.36, 1),
            opacity 0.3s ease,
            transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .floating-nav-panel-title {
          margin: 0 0 6px 0;
          padding: 0;
          font-family: 'Quicksand', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          min-width: 280px;
          max-width: 360px;
          text-align: left;
          align-self: flex-start;
        }

        .floating-nav-dropdown {
          overflow: hidden;
        }

        .floating-nav-dropdown-inner {
          background: rgba(1, 7, 26, 0.95);
          border: 1px solid rgba(16, 219, 255, 0.25);
          border-radius: 12px;
          padding: 12px 0;
          min-width: 280px;
          max-width: 360px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 24px rgba(16, 219, 255, 0.08);
          transform-origin: top right;
        }

        .floating-nav-link {
          display: block;
          width: 100%;
          text-align: left;
          padding: 12px 20px;
          border: none;
          background: transparent;
          color: #b0e0ff;
          font-family: 'Quicksand', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          line-height: 1.35;
          border-left: 3px solid transparent;
        }

        .floating-nav-link:hover {
          color: #10dbff;
          background: rgba(16, 219, 255, 0.08);
          border-left-color: rgba(16, 219, 255, 0.5);
        }

        .floating-nav-link.active {
          color: #10dbff;
          background: rgba(16, 219, 255, 0.1);
          border-left-color: #10dbff;
        }

        @media (max-width: 1024px) {
          .floating-nav-menu {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .floating-nav-menu {
            top: 80px;
            right: 16px;
          }
          .floating-nav-trigger {
            width: 44px;
            height: 44px;
          }
          .floating-nav-dropdown-inner {
            min-width: 260px;
            max-width: calc(100vw - 80px);
          }
        }

        /* Luz do centro */
        .nossas-solucoes-section::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 80%;
          background: radial-gradient(
            ellipse at center,
            rgba(25, 35, 71, 0.75) 0%,
            rgba(25, 35, 71, 0.5) 20%,
            rgba(25, 35, 71, 0.3) 35%,
            rgba(25, 35, 71, 0.15) 50%,
            transparent 65%
          );
          z-index: 1 !important;
          pointer-events: none;
        }

        /* Segunda camada de luz */
        .nossas-solucoes-section::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60%;
          height: 60%;
          background: radial-gradient(
            circle at center,
            rgba(25, 35, 71, 0.65) 0%,
            rgba(25, 35, 71, 0.4) 25%,
            rgba(25, 35, 71, 0.2) 40%,
            rgba(25, 35, 71, 0.08) 55%,
            transparent 70%
          );
          z-index: 1 !important;
          pointer-events: none;
          filter: blur(60px);
          -webkit-filter: blur(60px);
        }

        .container-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
          overflow: visible;
          margin-top: 0;
          padding-top: 120px;
        }

        .container {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          margin-top: 0;
          padding-top: 0;
        }

        .content-wrapper {
          width: 100%;
          margin-top: 0;
          padding-top: 0;
        }

        .solucao-block {
          margin-bottom: 80px;
        }

        .solucao-block:last-of-type {
          margin-bottom: 40px;
        }

        .solucao-block-title {
          font-size: 1.782rem;
          font-weight: 600;
          color: #10dbff;
          margin: 0 0 24px 0;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(16, 219, 255, 0.25);
        }

        .tech-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          min-height: 100vh;
          z-index: 2;
          pointer-events: none;
          overflow: visible;
        }

        /* Estilos das partículas tecnológicas individuais */
        .tech-particles .tech-particle {
          background: #00a6ff !important;
          border-radius: 50% !important;
          box-shadow: 0 0 8px #00a6ff !important;
          animation: techFloat 15s infinite linear !important;
          opacity: 0.3 !important;
          pointer-events: none !important;
          display: block !important;
          visibility: visible !important;
          z-index: 2 !important;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
          padding-top: 0;
          margin-top: 0;
          padding-left: 0;
        }

        .section-header h2,
        .section-header .section-header-solucao-title {
          font-family: 'Quicksand', sans-serif;
          font-size: 3.36rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 10px;
          margin-top: 0;
          padding-top: 0;
          margin-left: auto;
          margin-right: auto;
          letter-spacing: -0.5px;
          position: relative;
          display: block;
          opacity: 0;
          animation: slideUp 0.8s ease 0.2s forwards;
        }


        .section-subtitle {
          font-size: 1.2rem;
          color: #b0e0ff;
          max-width: 500px;
          margin: 10px auto 0;
          line-height: 1.6;
          opacity: 0;
          animation: slideUp 0.8s ease 0.6s forwards;
        }

        .solucoes-layout {
          display: flex;
          align-items: flex-start;
          gap: 60px;
          animation: slideUp 0.8s ease 0.2s forwards;
          opacity: 0;
        }

        .solucoes-content {
          flex: 1;
          animation: fadeIn 1s ease 0.4s forwards;
          opacity: 0;
        }

        .text-content {
          max-width: 600px;
        }

        .solucoes-title {
          font-family: 'Quicksand', sans-serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 40px;
          line-height: 1.3;
        }

        .solucoes-title-right {
          text-align: right;
        }

        .solucoes-description {
          margin-top: 20px;
        }

        .solucoes-description p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #b0e0ff;
          margin-bottom: 25px;
          opacity: 0;
          animation: slideUp 0.6s ease forwards;
          text-align: justify;
          text-justify: inter-word;
        }

        .solucoes-description p:nth-child(1) { animation-delay: 0.5s; }
        .solucoes-description p:nth-child(2) { animation-delay: 0.6s; }
        .solucoes-description p:nth-child(3) { animation-delay: 0.7s; }

        .solucoes-description strong {
          color: #ffffff;
          font-weight: 700;
          background: rgba(16, 219, 255, 0.15);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .features-list {
          display: flex;
          flex-wrap: nowrap;
          gap: 15px;
          margin-top: 50px;
          animation: slideUp 0.8s ease 0.8s forwards;
          opacity: 0;
          justify-content: center;
          width: 100%;
          position: relative;
          z-index: 10;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 6px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .feature-item:hover {
          background: rgba(16, 219, 255, 0.1);
          transform: translateY(-3px);
        }

        .feature-dot {
          width: 6px;
          height: 6px;
          background: #10dbff;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .feature-item span {
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .solucoes-image {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          animation: fadeIn 1s ease 0.6s forwards;
          opacity: 0;
          align-self: flex-start;
          margin-top: 50px;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          max-width: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: floatImage 4s ease-in-out infinite;
        }

        .painel-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
          display: block;
          box-shadow: none;
          transition: transform 0.3s ease;
        }

        /* Efeito hover sutil na imagem */
        .image-wrapper:hover .painel-image {
          transform: scale(1.02);
        }

        /* Responsividade */
        @media (max-width: 1024px) {
          .solucoes-layout {
            flex-direction: column;
            gap: 60px;
            text-align: center;
          }

          .text-content {
            max-width: 100%;
          }

          .solucoes-title-right {
            text-align: center;
          }

          .solucoes-description p {
            text-align: left;
          }

          .feature-item {
            justify-content: flex-start;
          }

          .feature-item:hover {
            transform: translateY(-3px);
          }
        }

        @media (max-width: 768px) {
          .nossas-solucoes-section {
            padding: 120px 20px 80px 20px;
            min-height: auto;
          }

          .container-wrapper {
            margin-top: 0;
            padding-top: 0;
          }

          .section-header h2 {
            font-size: 2.64rem;
          }

          .section-subtitle {
            font-size: 1.1rem;
          }

          .solucoes-title {
            font-size: 1.8rem;
            margin-bottom: 30px;
          }

          .solucoes-description p {
            font-size: 1rem;
            margin-bottom: 20px;
          }

          .feature-item {
            padding: 10px 15px;
          }

          .feature-item span {
            font-size: 0.95rem;
          }

          .image-wrapper {
            max-width: 400px;
          }
        }

        @media (max-width: 480px) {
          .nossas-solucoes-section {
            padding: 100px 15px 60px 15px;
          }

          .container-wrapper {
            margin-top: 0;
            padding-top: 0;
          }

          .section-header h2 {
            font-size: 2.16rem;
          }

          .section-subtitle {
            font-size: 1rem;
          }

          .solucoes-title {
            font-size: 1.5rem;
          }

          .solucoes-description p {
            font-size: 0.95rem;
          }

          .features-list {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .feature-item {
            padding: 8px 12px;
          }

          .feature-item span {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}