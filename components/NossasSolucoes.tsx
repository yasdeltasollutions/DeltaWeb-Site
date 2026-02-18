'use client';

import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Evita hydration mismatch: menu flutuante só renderiza no cliente após montar
  useEffect(() => {
    setMounted(true);
  }, []);

  // No mobile: menu só abre por clique (hover desabilitado)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
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

  // Exporta a seção como documento PDF (download direto)
  const handleShareAsPdf = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const block = (e.currentTarget as HTMLElement).closest('.solucao-block');
    if (!block || typeof window === 'undefined') return;
    const origin = window.location.origin;

    const titleEl = block.querySelector('.solucao-block-title');
    const title = titleEl?.textContent?.trim() || 'Solução';
    const descriptionEl = block.querySelector('.solucoes-description');
    const descriptionHtml = descriptionEl?.innerHTML?.trim() || '';
    const imgEl = block.querySelector('.solucoes-image img');
    const imgSrc = imgEl?.getAttribute('src');
    const imgAlt = imgEl?.getAttribute('alt') || title;
    const fullImgSrc = imgSrc?.startsWith('/') ? origin + imgSrc : imgSrc || '';
    const featureItems = Array.from(block.querySelectorAll('.features-list .feature-item')).map(
      (item) => (item.querySelector('span')?.textContent?.trim() || '').replace(/^\s*[\u2022•]\s*/, '')
    ).filter(Boolean);

    const logoUrl = origin + '/logos/logo-delta2.png';

    // Estilos modernos e atrativos - design contemporâneo
    const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .pdf-export-root {
      font-family: 'Quicksand', 'Inter', 'Segoe UI', sans-serif;
      width: 800px;
      min-height: 1131px;
      height: auto;
      background: #ffffff;
      color: #1e293b;
      line-height: 1.5;
      position: relative;
      overflow: visible;
      display: flex;
      flex-direction: column;
    }

    /* Header com design moderno - compacto */
    .pdf-header {
      padding: 12px 30px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8fafc;
      border-bottom: 1px solid rgba(16, 219, 255, 0.2);
      position: relative;
      z-index: 10;
    }

    .pdf-header img {
      height: 34px;
      width: auto;
    }

    .pdf-header-badge {
      background: #0c4a6e;
      color: white;
      padding: 6px 14px;
      border-radius: 30px;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    /* Body: flex 1 para empurrar o rodapé para o final da página */
    .pdf-body {
      padding: 14px 30px 18px;
      position: relative;
      z-index: 5;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .pdf-body-inner {
      flex: 1;
    }

    /* Wrapper do título com design moderno */
    .pdf-title-wrapper {
      margin-bottom: 14px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
    }

    .pdf-title-main {
      flex: 1;
    }

    .pdf-title {
      font-size: 1.66rem;
      font-weight: 700;
      color: #0c1a2b;
      margin-bottom: 6px;
      letter-spacing: -0.5px;
      line-height: 1.1;
    }

    .pdf-title-rule {
      width: 120px;
      height: 3px;
      background: #10dbff;
      border-radius: 4px;
    }

    .pdf-title-tag {
      background: #f1f5f9;
      padding: 5px 12px;
      border-radius: 40px;
      font-size: 0.7rem;
      color: #475569;
      font-weight: 500;
      border: 1px solid #e2e8f0;
    }

    /* Área principal: imagem à esquerda com float, texto Visão geral flui ao lado e abaixo */
    .pdf-main-flow {
      margin: 12px 0 10px;
      overflow: auto;
    }

    .pdf-image-wrapper {
      float: left;
      margin: 0 20px 15px 0;
    }

    .pdf-image-container {
      width: 280px;
      height: 280px;
      overflow: hidden;
      background: transparent;
      border: none;
    }

    .pdf-image-container img {
      display: block;
      width: 280px;
      height: 280px;
      object-fit: cover;
      background: transparent;
    }

    /* Visão geral: ocupa o espaço ao lado e abaixo da imagem */
    .pdf-description-col {
      background: transparent;
      padding: 0 0 8px 0;
      border: none;
      box-shadow: none;
    }

    .pdf-description-label {
      font-size: 0.85rem;
      font-weight: 700;
      color: #10dbff;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 8px;
    }

    .pdf-description {
      font-size: 0.85rem;
      line-height: 1.5;
      color: #334155;
    }

    .pdf-description p {
      margin-bottom: 8px;
    }

    .pdf-description p:last-child {
      margin-bottom: 0;
    }

    .pdf-description strong {
      color: #0c1a2b;
      font-weight: 700;
      background: rgba(16, 219, 255, 0.08);
      padding: 0 2px;
    }

    /* Listas na descrição: bullets no fluxo (evitar position absolute sobre a imagem), cor destacada */
    .pdf-description ul {
      list-style: disc;
      padding-left: 1.4em;
      margin: 10px 0;
      list-style-position: outside;
    }
    .pdf-description li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 0;
    }
    .pdf-description li::marker {
      color: #0c4a6e;
    }
    .pdf-description ul,
    .pdf-description li {
      color: #334155;
    }
    /* Esconder o bullet em span que vinha com position absolute (evita atravessar a imagem) */
    .pdf-description span[style*="position: absolute"] {
      display: none !important;
    }

    /* Seção de recursos com cards modernos - compacta (clear para ficar abaixo do texto) */
    .pdf-features-section {
      margin: 14px 0 10px;
      clear: both;
    }

    .pdf-features-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }

    .pdf-features-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: #0c1a2b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .pdf-features-line {
      flex: 1;
      height: 1px;
      background: #e2e8f0;
    }

    .pdf-features-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }

    .pdf-feature-card-modern {
      background: white;
      padding: 10px 10px;
      border-radius: 10px;
      border: 1px solid #eef2f6;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .pdf-feature-card-modern:hover {
      transform: translateY(-2px);
      border-color: rgba(16, 219, 255, 0.3);
      box-shadow: 0 10px 20px -8px rgba(16, 219, 255, 0.2);
    }

    .pdf-feature-icon {
      width: 26px;
      height: 26px;
      background: #e0f2fe;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #10dbff;
      font-weight: 600;
      font-size: 0.75rem;
      margin-bottom: 2px;
    }

    .pdf-feature-text-modern {
      font-size: 0.8rem;
      color: #1e293b;
      font-weight: 600;
      line-height: 1.3;
    }

    .pdf-feature-desc {
      font-size: 0.68rem;
      color: #64748b;
      line-height: 1.3;
    }

    /* CTA moderno - compacto (sem gradiente para evitar createPattern 0x0 no html2canvas) */
    .pdf-cta-modern {
      margin: 12px 0 10px;
      background: #0c1a2b;
      border-radius: 14px;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid rgba(16, 219, 255, 0.2);
      position: relative;
    }

    .pdf-cta-content {
      position: relative;
      z-index: 2;
    }

    .pdf-cta-title {
      color: white;
      font-size: 0.95rem;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .pdf-cta-subtitle {
      color: #94a3b8;
      font-size: 0.72rem;
    }

    .pdf-cta-contact {
      display: flex;
      gap: 20px;
      position: relative;
      z-index: 2;
    }

    .pdf-cta-item {
      display: flex;
      flex-direction: column;
    }

    .pdf-cta-label {
      color: #64748b;
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }

    .pdf-cta-value {
      color: #10dbff;
      font-weight: 700;
      font-size: 1rem;
    }

    /* Rodapé moderno - compacto */
    .pdf-footer-zone {
      margin-top: auto;
    }

    .pdf-footer-modern {
      margin-top: 10px;
      padding: 10px 0 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px dashed #e2e8f0;
    }

    .pdf-footer-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .pdf-footer-logo-small {
      height: 20px;
      opacity: 0.8;
    }

    .pdf-footer-info {
      font-size: 0.72rem;
      color: #64748b;
    }

    .pdf-footer-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .pdf-footer-social {
      width: 28px;
      height: 28px;
      background: #f1f5f9;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      color: #475569;
    }

    .pdf-footer-handle {
      font-size: 0.72rem;
      color: #64748b;
      font-weight: 500;
    }
  `;

    // Processar imagens na descrição
    const descWithOrigin = descriptionHtml.replace(
      /(<img[^>]+src=")(\/[^"]+)(")/gi,
      (match: string, before: string, path: string, after: string) => before + origin + path + after
    );

    // Limitar features para caber na página (4 = 2x2 no grid de 3 colunas)
    const maxFeatures = 4;
    const limitedFeatures = featureItems.slice(0, maxFeatures);

    // Gerar grid de recursos com design moderno
    const featuresHtml = limitedFeatures.length > 0
      ? `
      <div class="pdf-features-section">
        <div class="pdf-features-header">
          <span class="pdf-features-title">Recursos exclusivos</span>
          <span class="pdf-features-line"></span>
        </div>
        <div class="pdf-features-grid">
          ${limitedFeatures.map((f, index) => {
            const icons = ['▣', '◈', '◉', '◆', '▲', '■'];
            const descriptions = ['Diferencial competitivo', 'Alta performance', 'Resultados garantidos', 'Tecnologia avançada', 'Suporte especializado', 'Inovação contínua'];
            return `
              <div class="pdf-feature-card-modern">
                <div class="pdf-feature-icon">${icons[index % icons.length]}</div>
                <div class="pdf-feature-text-modern">${f.replace(/</g, '&lt;')}</div>
                <div class="pdf-feature-desc">${descriptions[index % descriptions.length]}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : '';

    // Container da imagem
    const imageHtml = fullImgSrc
      ? `<div class="pdf-image-container"><img src="${fullImgSrc}" alt="${imgAlt.replace(/"/g, '&quot;')}" width="280" height="280" /></div>`
      : '<div class="pdf-image-container" style="background: transparent; display: flex; align-items: center; justify-content: center;"><span style="color: #94a3b8; font-size: 0.8rem;">Imagem ilustrativa</span></div>';

    // Data atual
    const currentDate = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    // Montagem do HTML completo: body-inner empurra o rodapé para o final da página
    const bodyHtml = `
    <div class="pdf-body">
      <div class="pdf-body-inner">
        <div class="pdf-title-wrapper">
          <div class="pdf-title-main">
            <h1 class="pdf-title">${title.replace(/</g, '&lt;')}</h1>
            <div class="pdf-title-rule"></div>
          </div>
        </div>

        <div class="pdf-main-flow">
          <div class="pdf-image-wrapper">
            ${imageHtml}
          </div>
          <div class="pdf-description-col">
            <div class="pdf-description-label">Visão geral</div>
            <div class="pdf-description">${descWithOrigin}</div>
          </div>
        </div>

        ${featuresHtml}
      </div>

      <div class="pdf-footer-zone">
        <div class="pdf-cta-modern">
          <div class="pdf-cta-content">
            <div class="pdf-cta-title">Transforme seu negócio com esta solução</div>
            <div class="pdf-cta-subtitle">Consultoria especializada e implementação rápida</div>
          </div>
          <div class="pdf-cta-contact">
            <div class="pdf-cta-item">
              <span class="pdf-cta-label">telefone</span>
              <span class="pdf-cta-value">(92) 98481-0094</span>
            </div>
          </div>
        </div>
        <div class="pdf-footer-modern">
          <div class="pdf-footer-left">
            <span class="pdf-footer-info">Delta Sollutions</span>
          </div>
          <div class="pdf-footer-right">
            <span class="pdf-footer-social" aria-hidden="true">in</span>
            <span class="pdf-footer-handle">@deltasollutions</span>
          </div>
        </div>
      </div>
    </div>
  `;

    const headerHtml = `
    <div class="pdf-header">
      <img src="${logoUrl}" alt="Delta Sollutions" width="120" height="34" />
      <span class="pdf-header-badge">Via Delta Web-Site</span>
    </div>
  `;

    // Criar elemento wrapper (fora da tela; o clone será tornado visível no onclone para a captura)
    const wrapper = document.createElement('div');
    wrapper.className = 'pdf-export-root';
    wrapper.setAttribute('style', 'position:absolute;left:-9999px;top:0;width:800px;min-height:1131px;background:#fff;');
    wrapper.innerHTML = `<style>${styles}</style>${headerHtml}${bodyHtml}`;
    document.body.appendChild(wrapper);

    // Carregar imagens
    const loadImages = (): Promise<void> => {
      const allImgs = wrapper.querySelectorAll('img');
      if (allImgs.length === 0) return Promise.resolve();
      return Promise.all(
        Array.from(allImgs).map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) resolve();
              else {
                img.onload = () => resolve();
                img.onerror = () => resolve();
              }
            })
        )
      ).then(() => {});
    };

    try {
      await loadImages();
      await new Promise((r) => setTimeout(r, 500));

      // Gerar canvas: onclone torna o clone visível para o html2canvas desenhar o conteúdo (evita PDF em branco)
      const canvas = await html2canvas(wrapper, {
        scale: 2,
        useCORS: false,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 800,
        scrollX: 0,
        scrollY: 0,
        onclone: (_clonedDoc, clonedElement) => {
          const root = clonedElement as HTMLElement;
          if (root && root.style) {
            root.style.visibility = 'visible';
            root.style.position = 'fixed';
            root.style.left = '0';
            root.style.top = '0';
            root.style.zIndex = '99999';
            root.style.width = '800px';
            root.style.minHeight = '1131px';
          }
        },
      });

      // Criar PDF com múltiplas páginas se necessário (conteúdo ajustado ao tamanho da página)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageW = 210;
      const pageH = 297;
      const imgW = canvas.width;
      const imgH = canvas.height;
      const imgWidthMm = pageW;
      const pageHeightPx = (pageH * imgW) / pageW;
      let drawn = 0;

      while (drawn < imgH) {
        if (drawn > 0) pdf.addPage();
        const sliceH = Math.min(pageHeightPx, imgH - drawn);
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = imgW;
        sliceCanvas.height = sliceH;
        const ctx = sliceCanvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, imgW, sliceH);
          ctx.drawImage(canvas, 0, drawn, imgW, sliceH, 0, 0, imgW, sliceH);
        }
        const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.92);
        const sliceHeightMm = (sliceH * pageW) / imgW;
        pdf.addImage(sliceData, 'JPEG', 0, 0, imgWidthMm, sliceHeightMm, undefined, 'FAST');
        drawn += sliceH;
      }

      // Nome do arquivo
      const safeTitle = title
        .replace(/[^a-z0-9\u00C0-\u024F\s-]/gi, '')
        .trim()
        .slice(0, 40)
        .replace(/\s+/g, '-')
        .toLowerCase() || 'solucao';

      pdf.save(`delta-${safeTitle}-moderno.pdf`);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      const msg = err instanceof Error ? err.message : String(err);
      window.alert(`Não foi possível gerar o PDF. Tente novamente.\n\nDetalhe: ${msg}`);
    } finally {
      if (wrapper.parentNode) wrapper.remove();
    }
  };

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

      {/* Menu flutuante - Modelo Hub Tecnológico */}
      {mounted &&
        isSectionVisible &&
        typeof document !== 'undefined' &&
        document.body &&
        createPortal(
          <div
            ref={menuRef}
            className={`floating-nav-menu ${isFloatingMenuOpen ? 'expanded' : ''} ${isMobile ? 'floating-nav-menu-mobile' : ''}`}
            onMouseEnter={!isMobile ? () => setIsFloatingMenuOpen(true) : undefined}
            onMouseLeave={!isMobile ? () => setIsFloatingMenuOpen(false) : undefined}
          >
            {/* Botão principal com efeito 3D e brilho rotativo */}
            <button
              type="button"
              className="floating-nav-trigger"
              onClick={() => setIsFloatingMenuOpen((o) => !o)}
              aria-label={isFloatingMenuOpen ? 'Fechar menu de seções' : 'Abrir menu de seções'}
              aria-expanded={isFloatingMenuOpen}
            >
              <div className="floating-nav-trigger-glow"></div>
              <div className="floating-nav-trigger-inner">
                <span className="floating-nav-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M4 6h16"/>
                    <path d="M4 12h16"/>
                    <path d="M4 18h16"/>
                  </svg>
                </span>
                <span className="floating-nav-trigger-text">Soluções</span>
              </div>
            </button>

            {/* Painel expandido com design de hub tecnológico */}
            <div className="floating-nav-dropdown-wrapper">
              <div className="floating-nav-dropdown">
                {/* Título com efeito de scanline */}
                <div className="floating-nav-title-section">
                  <h3 className="floating-nav-title">MENU DE NAVEGAÇÃO</h3>
                  <div className="floating-nav-scanline"></div>
                </div>

                {/* Grid de cards tecnológicos */}
                <div className="floating-nav-grid">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      type="button"
                      className={`floating-nav-card ${activeSection === section.id ? 'active' : ''}`}
                      onClick={() => selectSection(section.id)}
                    >
                      <div className="floating-nav-card-glow"></div>
                      <div className="floating-nav-card-number">{(index + 1).toString().padStart(2, '0')}</div>
                      <div className="floating-nav-card-content">
                        <span className="floating-nav-card-title">{section.title}</span>
                        <span className="floating-nav-card-indicator"></span>
                      </div>
                      <div className="floating-nav-card-progress"></div>
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
          <div className="share-solucao-cta">
            <p className="share-solucao-text">Gostou dessa solução? Compartilhe!</p>
            <button type="button" className="share-pdf-btn" onClick={handleShareAsPdf}>
              <span className="btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </span>
              <span className="btn-text">Compartilhe em PDF</span>
            </button>
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
          <div className="share-solucao-cta">
            <p className="share-solucao-text">Gostou dessa solução? Compartilhe!</p>
            <button type="button" className="share-pdf-btn" onClick={handleShareAsPdf}>
              <span className="btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </span>
              <span className="btn-text">Compartilhe em PDF</span>
            </button>
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
          <div className="share-solucao-cta">
            <p className="share-solucao-text">Gostou dessa solução? Compartilhe!</p>
            <button type="button" className="share-pdf-btn" onClick={handleShareAsPdf}>
              <span className="btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </span>
              <span className="btn-text">Compartilhe em PDF</span>
            </button>
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
          <div className="share-solucao-cta">
            <p className="share-solucao-text">Gostou dessa solução? Compartilhe!</p>
            <button type="button" className="share-pdf-btn" onClick={handleShareAsPdf}>
              <span className="btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </span>
              <span className="btn-text">Compartilhe em PDF</span>
            </button>
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
          <div className="share-solucao-cta">
            <p className="share-solucao-text">Gostou dessa solução? Compartilhe!</p>
            <button type="button" className="share-pdf-btn" onClick={handleShareAsPdf}>
              <span className="btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </span>
              <span className="btn-text">Compartilhe em PDF</span>
            </button>
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
          <div className="share-solucao-cta">
            <p className="share-solucao-text">Gostou dessa solução? Compartilhe!</p>
            <button type="button" className="share-pdf-btn" onClick={handleShareAsPdf}>
              <span className="btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </span>
              <span className="btn-text">Compartilhe em PDF</span>
            </button>
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

        /* ===== MENU FLUTUANTE - HUB TECNOLÓGICO ===== */
        .floating-nav-menu {
          position: fixed;
          top: 120px;
          right: 32px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
          font-family: 'Quicksand', sans-serif;
        }

        /* Botão principal com design 3D */
        .floating-nav-trigger {
          width: auto;
          height: 56px;
          padding: 0 24px 0 20px;
          background: linear-gradient(145deg, #0a1428, #01071a);
          border: 1px solid rgba(16, 219, 255, 0.4);
          border-radius: 40px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow:
            0 10px 20px -8px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(16, 219, 255, 0.2) inset,
            0 0 20px rgba(16, 219, 255, 0.2);
          transform-style: preserve-3d;
          transform: perspective(400px) rotateX(2deg) rotateY(-2deg);
        }

        .floating-nav-trigger:hover {
          transform: perspective(400px) rotateX(0deg) rotateY(0deg) translateY(-2px);
          border-color: rgba(16, 219, 255, 0.8);
          box-shadow:
            0 15px 30px -10px rgba(0, 0, 0, 0.7),
            0 0 0 1px rgba(16, 219, 255, 0.4) inset,
            0 0 30px rgba(16, 219, 255, 0.4);
        }

        .floating-nav-trigger-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 30%, rgba(16, 219, 255, 0.2), transparent 70%);
          animation: rotateGlow 8s linear infinite;
          pointer-events: none;
        }

        @keyframes rotateGlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .floating-nav-trigger-inner {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .floating-nav-icon {
          color: #10dbff;
          filter: drop-shadow(0 0 8px #10dbff);
          animation: iconPulse 2s ease-in-out infinite;
        }

        @keyframes iconPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .floating-nav-icon svg {
          display: block;
        }

        .floating-nav-trigger-text {
          position: relative;
          z-index: 2;
          color: #ffffff;
          font-family: 'Quicksand', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-shadow: 0 0 10px #10dbff;
        }

        /* Wrapper do dropdown */
        .floating-nav-dropdown-wrapper {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          margin-top: 16px;
          transform: translateY(-20px) scale(0.95);
          transform-origin: top right;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          width: 380px;
        }

        .floating-nav-menu.expanded .floating-nav-dropdown-wrapper {
          max-height: 700px;
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Dropdown principal */
        .floating-nav-dropdown {
          background: linear-gradient(145deg, rgba(8, 16, 30, 0.95), rgba(1, 7, 26, 0.98));
          backdrop-filter: blur(12px);
          border: 1px solid rgba(16, 219, 255, 0.25);
          border-radius: 24px;
          padding: 20px;
          box-shadow:
            0 25px 50px -12px rgba(0, 0, 0, 0.8),
            0 0 0 1px rgba(16, 219, 255, 0.2) inset,
            0 0 40px rgba(16, 219, 255, 0.15);
          position: relative;
          overflow: hidden;
        }

        /* Efeito de scanline no fundo */
        .floating-nav-dropdown::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #10dbff, transparent);
          animation: scanline 3s linear infinite;
          opacity: 0.3;
        }

        @keyframes scanline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Header do dropdown */
        .floating-nav-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(16, 219, 255, 0.2);
        }

        .floating-nav-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .floating-nav-status-dot {
          width: 8px;
          height: 8px;
          background: #10dbff;
          border-radius: 50%;
          box-shadow: 0 0 10px #10dbff;
          animation: blink 2s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .floating-nav-status-text {
          color: #b0e0ff;
          font-family: 'Quicksand', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .floating-nav-header-right {
          color: #10dbff;
          font-family: 'Quicksand', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          background: rgba(16, 219, 255, 0.1);
          padding: 4px 10px;
          border-radius: 30px;
          border: 1px solid rgba(16, 219, 255, 0.2);
        }

        /* Título com scanline */
        .floating-nav-title-section {
          position: relative;
          margin-bottom: 20px;
          overflow: hidden;
        }

        .floating-nav-title {
          color: #ffffff;
          font-family: 'Quicksand', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0 0 4px 0;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .floating-nav-scanline {
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #10dbff, transparent);
          animation: scanlineMove 2s linear infinite;
        }

        @keyframes scanlineMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Grid de cards */
        .floating-nav-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
          max-height: 400px;
          overflow-y: auto;
          padding-right: 4px;
        }

        /* Scrollbar personalizada */
        .floating-nav-grid::-webkit-scrollbar {
          width: 4px;
        }

        .floating-nav-grid::-webkit-scrollbar-track {
          background: rgba(16, 219, 255, 0.05);
          border-radius: 4px;
        }

        .floating-nav-grid::-webkit-scrollbar-thumb {
          background: rgba(16, 219, 255, 0.3);
          border-radius: 4px;
        }

        .floating-nav-grid::-webkit-scrollbar-thumb:hover {
          background: #10dbff;
        }

        /* Card individual */
        .floating-nav-card {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(16, 219, 255, 0.15);
          border-radius: 14px;
          padding: 12px 16px;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: all 0.2s ease;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .floating-nav-card-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(16, 219, 255, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .floating-nav-card:hover .floating-nav-card-glow {
          left: 100%;
        }

        .floating-nav-card:hover {
          border-color: rgba(16, 219, 255, 0.4);
          transform: translateX(4px);
          background: rgba(16, 219, 255, 0.05);
        }

        .floating-nav-card.active {
          border-color: #10dbff;
          background: rgba(16, 219, 255, 0.1);
          box-shadow: 0 0 20px rgba(16, 219, 255, 0.2);
        }

        .floating-nav-card-number {
          font-family: 'Quicksand', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: rgba(16, 219, 255, 0.7);
          background: none;
          padding: 0;
          border: none;
          min-width: 28px;
          text-align: left;
        }

        .floating-nav-card-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .floating-nav-card-title {
          color: #b0e0ff;
          font-family: 'Quicksand', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          transition: color 0.2s ease;
          line-height: 1.3;
        }

        .floating-nav-card:hover .floating-nav-card-title {
          color: #ffffff;
        }

        .floating-nav-card.active .floating-nav-card-title {
          color: #10dbff;
        }

        .floating-nav-card-indicator {
          width: 6px;
          height: 6px;
          background: #10dbff;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.2s ease;
          box-shadow: 0 0 10px #10dbff;
        }

        .floating-nav-card:hover .floating-nav-card-indicator {
          opacity: 0.5;
        }

        .floating-nav-card.active .floating-nav-card-indicator {
          opacity: 1;
          animation: indicatorPulse 1.5s infinite;
        }

        @keyframes indicatorPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.7; }
        }

        .floating-nav-card-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, #10dbff, #0c4a6e);
          transition: width 0.3s ease;
        }

        .floating-nav-card:hover .floating-nav-card-progress {
          width: 100%;
        }

        /* Footer com métricas */
        .floating-nav-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          margin-top: 8px;
          border-top: 1px solid rgba(16, 219, 255, 0.15);
        }

        .floating-nav-metric {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .floating-nav-metric-label {
          color: rgba(176, 224, 255, 0.6);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .floating-nav-metric-value {
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 700;
          font-family: 'Quicksand', sans-serif;
        }

        .floating-nav-metric-value.online {
          color: #10dbff;
          text-shadow: 0 0 8px #10dbff;
        }

        /* Responsividade */
        @media (max-width: 1024px) {
          .floating-nav-menu {
            right: 24px;
            top: 100px;
          }
        }

        @media (max-width: 768px) {
          .floating-nav-menu {
            top: auto;
            bottom: 24px;
            right: 16px;
            left: auto;
          }

          /* Mobile: dropdown acima do botão, aberto só por clique */
          .floating-nav-menu.floating-nav-menu-mobile {
            flex-direction: column-reverse;
            align-items: flex-end;
          }

          .floating-nav-menu.floating-nav-menu-mobile .floating-nav-dropdown-wrapper {
            margin-top: 0;
            margin-bottom: 12px;
            transform: translateY(20px) scale(0.95);
            transform-origin: bottom right;
          }

          .floating-nav-menu.floating-nav-menu-mobile.expanded .floating-nav-dropdown-wrapper {
            transform: translateY(0) scale(1);
          }

          .floating-nav-dropdown-wrapper {
            width: min(320px, calc(100vw - 32px));
            max-width: 320px;
          }

          .floating-nav-trigger {
            height: 48px;
            padding: 0 20px 0 16px;
          }

          .floating-nav-icon svg {
            width: 20px;
            height: 20px;
          }

          .floating-nav-trigger-text {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .floating-nav-menu {
            bottom: 20px;
            right: 12px;
          }

          .floating-nav-dropdown-wrapper {
            width: min(300px, calc(100vw - 24px));
            max-width: 300px;
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

        .share-solucao-cta {
          border-top: 1px solid rgba(16, 219, 255, 0.2);
          padding-top: 28px;
          margin-top: 48px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          transition: all 0.3s ease;
        }

        .share-solucao-cta:hover {
          transform: translateY(-1px);
        }

        .share-solucao-text {
          font-size: 1.1rem;
          color: #b0e0ff;
          margin: 0;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .share-solucao-cta:hover .share-solucao-text {
          color: #10dbff;
        }

        @keyframes btn-hover-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        @keyframes icon-draw {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes btn-glow-soft {
          0%, 100% {
            box-shadow: 0 4px 12px rgba(16, 219, 255, 0.2);
          }
          50% {
            box-shadow: 0 6px 18px rgba(16, 219, 255, 0.35);
          }
        }

        @keyframes border-glow {
          0%, 100% {
            border-color: rgba(16, 219, 255, 0.5);
          }
          50% {
            border-color: rgba(16, 219, 255, 0.8);
          }
        }

        @keyframes icon-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.9);
          }
        }

        .share-pdf-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 28px;
          background: transparent;
          border: 1.5px solid rgba(16, 219, 255, 0.5);
          border-radius: 40px;
          color: #10dbff;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.25s ease;
          animation: btn-glow-soft 3s ease-in-out infinite, border-glow 3s ease-in-out infinite;
          backdrop-filter: blur(4px);
          overflow: hidden;
        }

        .share-pdf-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(16, 219, 255, 0.1);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.4s ease, height 0.4s ease;
          z-index: -1;
        }

        .share-pdf-btn:hover::before {
          width: 150%;
          height: 150%;
        }

        .share-pdf-btn:hover {
          border-color: #10dbff;
          color: #ffffff;
          transform: translateY(-2px);
          animation: btn-hover-pulse 1.5s ease-in-out infinite;
        }

        .share-pdf-btn:active {
          transform: translateY(1px);
          box-shadow: 0 2px 8px rgba(16, 219, 255, 0.2);
        }

        .btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .share-pdf-btn:hover .btn-icon {
          transform: rotate(-5deg) scale(1.1);
        }

        .btn-text {
          position: relative;
          transition: all 0.3s ease;
        }

        .btn-text::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #10dbff;
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .share-pdf-btn:hover .btn-text::after {
          width: 100%;
        }

        .share-pdf-btn:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(16, 219, 255, 0.3);
        }

        .share-pdf-btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(16, 219, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.3s ease, height 0.3s ease;
          z-index: -1;
          pointer-events: none;
        }

        .share-pdf-btn:active::after {
          width: 100%;
          height: 100%;
          transition: width 0.2s ease, height 0.2s ease;
        }

        .share-pdf-btn:active .btn-icon {
          animation: icon-pulse 0.2s ease;
        }

        @media (max-width: 768px) {
          .share-pdf-btn {
            padding: 10px 24px;
            gap: 6px;
          }

          .btn-icon svg {
            width: 18px;
            height: 18px;
          }

          .btn-text {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .share-pdf-btn {
            padding: 8px 20px;
          }

          .btn-icon svg {
            width: 16px;
            height: 16px;
          }

          .btn-text {
            font-size: 0.9rem;
          }

          .share-solucao-text {
            font-size: 1rem;
          }
        }

        @media (max-width: 360px) {
          .share-pdf-btn {
            padding: 8px 18px;
          }

          .btn-text {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 320px) {
          .btn-text {
            display: none;
          }

          .share-pdf-btn {
            padding: 10px;
            border-radius: 50%;
            aspect-ratio: 1;
          }

          .btn-icon svg {
            width: 20px;
            height: 20px;
          }
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

          .features-list {
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            padding: 0 8px;
            max-width: 100%;
            box-sizing: border-box;
          }

          .feature-item {
            padding: 10px 14px;
            flex: 1 1 auto;
            min-width: 0;
            max-width: 100%;
            white-space: normal;
            box-sizing: border-box;
          }

          .feature-item span {
            font-size: 0.95rem;
            white-space: normal;
            word-wrap: break-word;
            overflow-wrap: break-word;
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
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            padding: 0 4px;
            max-width: 100%;
            box-sizing: border-box;
          }

          .feature-item {
            padding: 10px 12px;
            width: 100%;
            max-width: 100%;
            min-width: 0;
            white-space: normal;
            box-sizing: border-box;
          }

          .feature-item span {
            font-size: 0.9rem;
            white-space: normal;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
        }

        @media (max-width: 360px) {
          .features-list {
            padding: 0 2px;
            gap: 8px;
          }

          .feature-item {
            padding: 8px 10px;
          }

          .feature-item span {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}