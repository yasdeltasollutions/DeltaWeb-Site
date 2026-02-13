'use client';

import { useEffect, useRef } from 'react';

const WHATSAPP_CONSULTORIA_URL =
  'https://api.whatsapp.com/send/?phone=5592984810094&text=Ol%C3%A1%21+Vim+do+site+da+Delta+e+gostaria+da+minha+consultoria+gratuita&type=phone_number&app_absent=0';

export default function Inicio() {
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  const heroParticlesContainerRef = useRef<HTMLDivElement>(null);
  const statCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLElement>(null);

  // Partículas no hero – flutuação rápida + interação com o cursor
  const mousePosRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const container = heroParticlesContainerRef.current;
    if (!container) return;

    container.innerHTML = '';
    const particleCount = 40;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const baseLeft = Math.random() * 100;
      const baseTop = Math.random() * 100;
      const hue = 180 + Math.random() * 60;
      particle.dataset.baseLeft = String(baseLeft);
      particle.dataset.baseTop = String(baseTop);
      particle.style.cssText = `
        position: absolute;
        left: ${baseLeft}%;
        top: ${baseTop}%;
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
        transition: transform 0.1s ease-out;
      `;
      particle.classList.add('tech-particle');
      container.appendChild(particle);
      particles.push(particle);
    }

    const REPEL_RADIUS = 140;
    const REPEL_STRENGTH = 50;
    const FLOAT_SPEED = 0.21;
    const FLOAT_AMOUNT = 40;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    let rafId: number;
    const animate = () => {
      const rect = container.getBoundingClientRect();
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;
      const time = Date.now() * 0.001;

      particles.forEach((p, i) => {
        const baseX = (parseFloat(p.dataset.baseLeft || '0') / 100) * rect.width;
        const baseY = (parseFloat(p.dataset.baseTop || '0') / 100) * rect.height;
        const floatX = Math.sin(time * FLOAT_SPEED + i * 0.7) * FLOAT_AMOUNT;
        const floatY = Math.cos(time * FLOAT_SPEED * 0.9 + i * 0.5) * FLOAT_AMOUNT;
        let px = baseX + floatX;
        let py = baseY + floatY;

        const dx = mx - px;
        const dy = my - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let repelX = 0, repelY = 0;
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          repelX = (dx / dist) * -force;
          repelY = (dy / dist) * -force;
        }
        p.style.transform = `translate(${floatX + repelX}px, ${floatY + repelY}px)`;
      });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Partículas tecnológicas na seção de conteúdo (igual Áreas de Competência)
  useEffect(() => {
    function createTechParticles(container: HTMLDivElement) {
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
          animation: techFloatInicio ${duration}s infinite linear;
          animation-delay: ${delay}s;
        `;
        particle.classList.add('tech-particle');
        container.appendChild(particle);
      }
    }
    let attempts = 0;
    function tryInit() {
      attempts++;
      if (particlesContainerRef.current) {
        createTechParticles(particlesContainerRef.current);
        return true;
      }
      if (attempts < 5) setTimeout(tryInit, 200);
      return false;
    }
    const t1 = setTimeout(tryInit, 100);
    const t2 = setTimeout(tryInit, 500);
    const t3 = setTimeout(tryInit, 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Efeito sutil de entrada do hero
  useEffect(() => {
    const elements = [
      { ref: titleLine1Ref, delay: 300 },
      { ref: titleLine2Ref, delay: 600 },
      { ref: ctaRef, delay: 900 }
    ];
    elements.forEach(({ ref, delay }) => {
      if (ref.current) {
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.opacity = '1';
            ref.current.style.transform = 'translateY(0)';
          }
        }, delay);
      }
    });
    const interval = setInterval(() => {
      const deltaText = document.querySelector('.text-delta');
      if (deltaText) {
        deltaText.classList.add('delta-glow-active');
        setTimeout(() => deltaText.classList.remove('delta-glow-active'), 800);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Refs dos cards da seção Sobre
  useEffect(() => {
    statCardRefs.current = statCardRefs.current.slice(0, 3);
  }, []);

  function apply3DEffectToCard(element: HTMLElement, mouseX: number, mouseY: number) {
    const rotateY = -mouseX * 8;
    const rotateX = mouseY * 6;
    const scale = 1.02;
    element.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`;
    element.style.transition = 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)';
    element.style.boxShadow = '0 20px 40px rgba(0, 166, 255, 0.15)';
    const numberElement = element.querySelector('h3');
    const textElement = element.querySelector('p');
    if (numberElement) {
      (numberElement as HTMLElement).style.transform = 'translateZ(20px) scale(1.05)';
      (numberElement as HTMLElement).style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
      (numberElement as HTMLElement).style.textShadow = '0 2px 10px rgba(0, 166, 255, 0.3)';
    }
    if (textElement) {
      (textElement as HTMLElement).style.transform = 'translateZ(15px)';
      (textElement as HTMLElement).style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
      (textElement as HTMLElement).style.opacity = '1';
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      statCardRefs.current.forEach((cardInner) => {
        if (!cardInner) return;
        const cardElement = cardInner.parentElement;
        if (!cardElement) return;
        const rect = cardElement.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          apply3DEffectToCard(cardInner, x, y);
        }
      });
    };
    const handleMouseLeave = () => {
      statCardRefs.current.forEach((cardInner) => {
        if (cardInner) {
          cardInner.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
          cardInner.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
          cardInner.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
          const numberElement = cardInner.querySelector('h3');
          const textElement = cardInner.querySelector('p');
          if (numberElement) {
            (numberElement as HTMLElement).style.transform = 'translateZ(0px) scale(1)';
            (numberElement as HTMLElement).style.textShadow = 'none';
          }
          if (textElement) {
            (textElement as HTMLElement).style.transform = 'translateZ(0px)';
            (textElement as HTMLElement).style.opacity = '0.8';
          }
        }
      });
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Scroll reveal: fade-in + blur ao entrar na viewport
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const elements = container.querySelectorAll<HTMLElement>('.scroll-reveal');
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible');
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <section className="hero-clean" id="inicio">
        <div className="hero-background">
          <div className="bg-image-container">
            <img src="/images/robo-1.jpg" alt="Robô industrial Delta Solutions" className="bg-image" />
          </div>
          <div className="bg-overlay-light"></div>
          <div className="bg-vignette"></div>
        </div>
        <div className="tech-particles-hero" ref={heroParticlesContainerRef} aria-hidden="true"></div>
        <div className="side-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        <div className="hero-content">
          <div className="content-wrapper">
            <div className="text-content">
              <p className="lead-text">Inovação é o que oferecemos</p>
              <h1 className="hero-title">
                <span className="title-line-1" ref={titleLine1Ref}>
                  <span className="na-text">Na</span>{' '}
                  <span className="delta-solutions-bold text-delta">Delta Sollutions</span>
                  <span className="comma-white">,</span>{' '}
                </span>
                <span className="title-line-2" ref={titleLine2Ref}>
                  transformamos processos em <span className="highlight-word">automação inteligente</span>
                  <span className="comma-white">.</span>
                </span>
              </h1>
              <div className="description">
                <div className="description-icon">
                  <i className="fas fa-arrow-trend-up"></i>
                </div>
                <p>
                  Implementamos automação avançada para integrar sistemas, otimizar fluxos operacionais e maximizar eficiência.
                </p>
              </div>
              <div className="action-section">
                <a
                  href={WHATSAPP_CONSULTORIA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-button"
                  ref={ctaRef}
                >
                  <span className="button-content">
                    <span className="button-icon"><i className="fas fa-bolt"></i></span>
                    <span className="button-text">
                      <span className="button-main">Consultoria Gratuita</span>
                      <span className="button-sub">Inicie sua transformação</span>
                    </span>
                  </span>
                </a>
                <div className="benefits">
                  <div className="benefit-item">
                    <div className="benefit-marker"><div className="marker-circle"></div></div>
                    <span>Projetos Sob Medida</span>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-marker"><div className="marker-circle"></div></div>
                    <span>Resultados Garantidos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="navigation-hint">
          <div className="hint-line"></div>
          <a href="#sobre" className="hint-link">
            <span>Conheça nossos serviços</span>
            <i className="fas fa-chevron-down"></i>
          </a>
        </div>
        <style jsx>{`
          .hero-clean { position: relative; width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 80px 0 60px; }
          .hero-background { position: fixed; inset: 0; z-index: 0; }
          .bg-image-container { position: absolute; inset: 0; }
          .bg-image { width: 100%; height: 100%; object-fit: cover; object-position: center; filter: brightness(0.85) contrast(1.1); animation: subtleZoom 40s ease-in-out infinite alternate; }
          .bg-overlay-light { position: absolute; inset: 0; background: rgba(1, 7, 26, 0.65); }
          .bg-vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 30%, rgba(1, 7, 26, 0.4) 70%, rgba(1, 7, 26, 0.8) 100%); }
          @keyframes subtleZoom { 0% { transform: scale(1); } 100% { transform: scale(1.03); } }
          .tech-particles-hero { position: fixed; inset: 0; width: 100%; height: 100%; min-height: 100vh; z-index: 2; pointer-events: none; overflow: visible; }
          .tech-particles-hero :global(.tech-particle) { position: absolute !important; width: 4px !important; height: 4px !important; background: #00a6ff !important; border-radius: 50% !important; box-shadow: 0 0 8px #00a6ff !important; opacity: 0.3 !important; pointer-events: none !important; display: block !important; visibility: visible !important; z-index: 2 !important; }
          .side-decoration { position: absolute; left: 40px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; align-items: center; gap: 20px; z-index: 5; opacity: 0; animation: fadeIn 1s ease 0.5s forwards; }
          .decoration-line { width: 1px; height: 120px; background: linear-gradient(to bottom, transparent, #10dbff, transparent); }
          .decoration-dots { display: flex; flex-direction: column; gap: 8px; }
          .dot { width: 6px; height: 6px; background: #10dbff; border-radius: 50%; opacity: 0.5; }
          .dot:nth-child(1) { animation: dotPulse 2s ease-in-out infinite; }
          .dot:nth-child(2) { animation: dotPulse 2s ease-in-out infinite 0.4s; }
          .dot:nth-child(3) { animation: dotPulse 2s ease-in-out infinite 0.8s; }
          .hero-content { position: relative; z-index: 10; width: 100%; max-width: 1000px; padding: 0 40px 0 100px; }
          .content-wrapper { display: flex; flex-direction: column; gap: 40px; }
          .section-indicator { display: flex; align-items: center; gap: 15px; opacity: 0; animation: slideInLeft 0.8s ease 0.3s forwards; }
          .indicator-dash { width: 30px; height: 2px; background: #10dbff; }
          .indicator-text { font-size: 0.9rem; color: #10dbff; text-transform: uppercase; letter-spacing: 2px; font-weight: 500; }
          .text-content { display: flex; flex-direction: column; gap: 25px; }
          .hero-clean .hero-title { color: #ffffff; opacity: 0; transform: translateY(30px); animation: fadeInUp 1s ease 0.4s forwards; }
          .hero-clean .hero-title .title-line-1,
          .hero-clean .hero-title .title-line-2 { color: #ffffff !important; }
          .hero-clean .hero-title .delta-solutions-bold { color: #10dbff !important; -webkit-text-fill-color: #10dbff !important; }
          .lead-text { font-size: 1.47rem; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 10px; opacity: 0; transform: translateY(30px); background: linear-gradient(90deg, #10dbff 0%, #10dbff 40%, #ffffff 50%, #10dbff 60%, #10dbff 100%); background-size: 200% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: fadeInUp 1s ease 0.2s forwards, subtitleShine 3s ease-in-out infinite 0s; filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.5)) drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3)); }
          @keyframes subtitleShine { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
          .description { display: flex; align-items: flex-start; gap: 15px; max-width: 600px; margin-top: 5px; opacity: 0; animation: fadeInUp 0.8s ease 0.7s forwards; }
          .description-icon { color: #10dbff; font-size: 1.2rem; margin-top: 5px; animation: iconFloat 3s ease-in-out infinite; }
          .description p { font-size: 1.1rem; line-height: 1.6; color: #e0f0ff; margin: 0; }
          .highlight { color: #ffffff; font-weight: 600; position: relative; }
          .highlight::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 1px; background: rgba(255, 255, 255, 0.3); }
          .action-section { display: flex; flex-direction: column; gap: 30px; margin-top: 20px; }
          .primary-button { display: inline-flex; align-items: center; text-decoration: none; background: linear-gradient(90deg,rgb(5, 52, 99) 0%,rgb(13, 175, 204) 60%, #20ebff 100%); color: #ffffff; border-radius: 12px; padding: 18px 30px; font-weight: 700; font-size: 1.1rem; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); opacity: 0; transform: translateY(30px); max-width: 350px; position: relative; overflow: hidden; box-shadow: 0 8px 25px rgba(16, 219, 255, 0.4); border: none; animation: fadeInUp 1s ease 0.5s forwards; }
          .primary-button::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%); transform: translateX(-100%) translateY(-100%) rotate(45deg); z-index: 0; opacity: 0; pointer-events: none; }
          .primary-button:hover { transform: translateY(-10px) scale(1.1); color: #ffffff; box-shadow: 0 20px 50px rgba(0, 166, 255, 0.7), 0 0 40px rgba(0, 255, 170, 0.7), 0 0 60px rgba(16, 219, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4); background: linear-gradient(135deg, #0570d9 0%, #20ebff 100%); }
          .primary-button:hover::before { opacity: 1; animation: buttonShine 1.5s ease; }
          .primary-button .button-icon { color: #ffffff; position: relative; z-index: 10; transition: color 0.3s ease; }
          .primary-button:hover .button-icon { color: #ffffff; }
          .button-content { display: flex; align-items: center; gap: 15px; position: relative; z-index: 10; }
          .button-icon { font-size: 1.3rem; animation: iconPulse 2s ease-in-out infinite; }
          .button-text { display: flex; flex-direction: column; gap: 3px; }
          .button-main { font-size: 1.1rem; font-weight: 700; }
          .button-sub { font-size: 0.85rem; font-weight: 400; opacity: 0.8; }
          .benefits { display: flex; gap: 30px; opacity: 0; animation: fadeIn 1s ease 1s forwards; }
          .benefit-item { display: flex; align-items: center; gap: 10px; }
          .benefit-marker { position: relative; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; }
          .marker-circle { width: 6px; height: 6px; background: #00ffaa; border-radius: 50%; animation: markerPulse 2s ease-in-out infinite; }
          .benefit-item span { font-size: 0.9rem; color: #b0e0ff; font-weight: 500; }
          .navigation-hint { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 15px; opacity: 0; animation: fadeIn 1s ease 1.2s forwards; z-index: 10; }
          .hint-line { width: 1px; height: 50px; background: linear-gradient(to bottom, #10dbff, transparent); }
          .hint-link { display: flex; align-items: center; gap: 8px; color: #b0e0ff; text-decoration: none; font-size: 0.9rem; transition: all 0.3s ease; }
          .hint-link:hover { color: #10dbff; gap: 12px; }
          @keyframes fadeIn { to { opacity: 1; } }
          @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
          @keyframes slideInLeft { to { opacity: 1; transform: translateX(0); } from { opacity: 0; transform: translateX(-20px); } }
          @keyframes dotPulse { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
          @keyframes iconFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
          @keyframes iconPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.1); } }
          @keyframes markerPulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }
          @media (max-width: 1024px) { .hero-content { padding: 0 30px 0 80px; } .side-decoration { left: 25px; } }
          @media (max-width: 768px) { .hero-clean { padding: 60px 0 40px; } .hero-content { padding: 0 20px; } .side-decoration { display: none; } .lead-text { font-size: clamp(0.92rem, 3.22vw, 1.24rem); } .description p { font-size: 1rem; } .primary-button { max-width: 100%; padding: 16px 25px; } .benefits { flex-direction: column; gap: 15px; } }
          @media (max-width: 480px) { .content-wrapper { gap: 30px; } .text-content { gap: 20px; } .action-section { gap: 20px; } .navigation-hint { display: none; } .bg-image { filter: brightness(0.8) contrast(1.05); } .lead-text { font-size: 0.78rem; } .description p { font-size: 0.8rem; } .button-main { font-size: 0.88rem; } .button-sub { font-size: 0.68rem; } .benefit-item span { font-size: 0.72rem; } }
          @media (max-width: 360px) { .primary-button { padding: 14px 20px; } .button-content { gap: 12px; } }
        `}</style>
      </section>

      <section ref={scrollContainerRef} className="inicio-content-section">
        <div className="tech-particles-inicio" ref={particlesContainerRef} aria-hidden="true"></div>
        <div className="tecnologia-section scroll-reveal">
          <div className="tecnologia-container">
            <h2 className="tecnologia-title">
              <span className="title-line-1">Tecnologia que move negócios.</span>
              <span className="title-line-2"><span className="tecnologias-cyan">Automação</span> que gera resultados.</span>
            </h2>
            <div className="tecnologia-content">
              <div className="tecnologia-text-wrapper">
                <p className="tecnologia-text">
                
                A tecnologia deixou de ser suporte para ser um motor de transformação.
                  É nesse cenário que nos posicionamos: como parceiros estratégicos na criação de soluções que aceleram negócios, otimizam processos e elevam experiências.
                  Somos movidos por desafios e guiados por resultados.
                  Será uma honra ter a oportunidade de ser parte da sua jornada de inovação e revolução tecnológica.
                </p>
              </div>
              <div className="tecnologia-image-wrapper">
                <img src="/images/Robo-colab2.jpg" alt="Robô colaborativo" className="tecnologia-image" />
              </div>
            </div>
          </div>

        <div id="sobre" className="about-section scroll-reveal">
          <div className="about-container">
            <div className="content-wrapper">
              <div className="section-header">
                <h2>Sobre a <br className="mobile-break" /><span>Delta Solutions</span></h2>
                <p className="section-subtitle">Somos uma empresa amazonense especializada em criar soluções tecnológicas baseadas em automação. Desenvolvemos sistemas que reduzem operações manuais, aumentam eficiência e geram valor real. Aliamos inovação, inteligência operacional e engenharia de processos para escalar negócios e transformar operações.</p>
              </div>
              <div className="features-container">
                <div className="feature-item">
                  <div className="feature-content">
                    <div className="feature-icon"><i className="fas fa-rocket"></i></div>
                    <h3>Soluções Completas</h3>
                    <p>Do desenho do processo à automação em produção, cuidamos de todo o ciclo da solução para garantir previsibilidade, eficiência e estabilidade operacional. Nossa abordagem integrada conecta engenharia, tecnologia e automação para entregar sistemas prontos para escalar.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-content">
                    <div className="feature-icon"><i className="fas fa-bullseye"></i></div>
                    <h3>Foco em Resultados</h3>
                    <p>Automatizamos para eliminar desperdícios, reduzir falhas operacionais e gerar resultados mensuráveis. Cada solução é projetada com métricas claras, monitoramento contínuo e foco em retorno sobre investimento desde o primeiro dia.</p>
                  </div>
                </div>
              </div>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-card-inner" ref={el => { statCardRefs.current[0] = el; }}>
                    <h3>+14</h3>
                    <p>áreas de atuação</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-inner" ref={el => { statCardRefs.current[1] = el; }}>
                    <h3>+150</h3>
                    <p>Soluções Implantadas</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-inner" ref={el => { statCardRefs.current[2] = el; }}>
                    <h3>10+</h3>
                    <p>Anos de Atuação Técnica</p>
                  </div>
                </div>
              </div>
              <div className="about-description">
                <i className="fas fa-play-circle"></i>
                <p>Na <span className="delta-cyan">Delta Solutions</span>, implementamos processos mais inteligentes com foco em retorno concreto sobre o investimento, combinando inovação, precisão e conectividade industrial.</p>
              </div>
            </div>
          </div>
        </div>
          
          {/* SEÇÃO DE SERVIÇOS */}
          <div className="servicos-section scroll-reveal">
            <div className="servicos-grid">
              <div className="servico-card">
                <div className="servico-icon">
                  <i className="fas fa-robot"></i>
                </div>
                <h3 className="servico-title">Automação Industrial</h3>
                <p className="servico-desc">
                  Soluções robóticas e sistemas automatizados que aumentam a produtividade e reduzem custos operacionais.
                </p>
                <a href={WHATSAPP_CONSULTORIA_URL} target="_blank" rel="noopener noreferrer" className="servico-link">
                  Saiba mais <i className="fas fa-arrow-right"></i>
                </a>
              </div>
              
              <div className="servico-card">
                <div className="servico-icon">
                  <i className="fas fa-brain"></i>
                </div>
                <h3 className="servico-title">IA & Machine Learning</h3>
                <p className="servico-desc">
                  Implementação de inteligência artificial para análise preditiva, otimização de processos e tomada de decisões.
                </p>
                <a href={WHATSAPP_CONSULTORIA_URL} target="_blank" rel="noopener noreferrer" className="servico-link">
                  Saiba mais <i className="fas fa-arrow-right"></i>
                </a>
              </div>
              
              <div className="servico-card">
                <div className="servico-icon">
                  <i className="fas fa-cogs"></i>
                </div>
                <h3 className="servico-title">Engenharia de Processos</h3>
                <p className="servico-desc">
                  Análise e redesenho de processos com foco em automação, eficiência operacional e redução de tarefas manuais em toda a cadeia produtiva.
                </p>
                <a href={WHATSAPP_CONSULTORIA_URL} target="_blank" rel="noopener noreferrer" className="servico-link">
                  Saiba mais <i className="fas fa-arrow-right"></i>
                </a>
              </div>
              
              <div className="servico-card">
                <div className="servico-icon">
                  <i className="fas fa-link"></i>
                </div>
                <h3 className="servico-title">Integração de Plataformas</h3>
                <p className="servico-desc">
                  Integração automatizada entre sistemas, aplicações e serviços para sincronizar dados, acionar processos e eliminar dependência de operações manuais.
                </p>
                <a href={WHATSAPP_CONSULTORIA_URL} target="_blank" rel="noopener noreferrer" className="servico-link">
                  Saiba mais <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
          
          {/* SESSÃO DE TECNOLOGIAS */}
          <div className="tecnologias-section scroll-reveal">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-line-1">Tecnologias que</span>
                <span className="title-line-2">Sustentam Nossas <span className="tecnologias-cyan">Soluções</span></span>
              </h2>
            </div>
            
            <div className="tecnologias-grid">
              <div className="tech-item">
                <div className="tech-icon">
                  <i className="fas fa-server"></i>
                </div>
                <div className="tech-info">
                  <h4>Infraestrutura para Sistemas Automatizados</h4>
                  <p>Ambientes robustos e escaláveis para executar, integrar e monitorar sistemas automatizados com alta disponibilidade, segurança e controle operacional.</p>
                </div>
              </div>
              
              <div className="tech-item">
                <div className="tech-icon">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="tech-info">
                  <h4>FCT e ICT</h4>
                  <p>Teste funcional em circuito verificando integridade de cada componente</p>
                </div>
              </div>
              
              <div className="tech-item">
                <div className="tech-icon">
                  <i className="fas fa-brain"></i>
                </div>
                <div className="tech-info">
                  <h4>Inteligência Operacional</h4>
                  <p>Uso estratégico de dados e lógica computacional para automatizar análises, acionar processos e otimizar operações em tempo real.</p>
                </div>
              </div>
              
              <div className="tech-item">
                <div className="tech-icon">
                  <i className="fas fa-microchip"></i>
                </div>
                <div className="tech-info">
                  <h4>IoT Edge Computing</h4>
                  <p>Processamento em borda para baixa latência</p>
                </div>
              </div>
              
              <div className="tech-item">
                <div className="tech-icon">
                  <i className="fas fa-code"></i>
                </div>
                <div className="tech-info">
                  <h4>React & Node.js</h4>
                  <p>Desenvolvimento full-stack de alta performance</p>
                </div>
              </div>
              
              <div className="tech-item">
                <div className="tech-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <div className="tech-info">
                  <h4>Visão Computacional e Agentes de AI</h4>
                  <p>Soluções com visão computacional e agentes propulsores de IA.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA SIMPLES E ELEGANTE */}
          <div className="cta-simple-section scroll-reveal">
            <div className="cta-simple-content">
              <div className="simple-text">
                <h3 className="simple-title">
                  Conectamos tecnologia a <span className="highlight">soluções</span> que funcionam!
                </h3>
                
                <p className="simple-description">
                  Desenvolvemos soluções sob medida para otimizar processos, 
                  escalar negócios e gerar resultados reais.
                </p>
              </div>
              
              <div className="simple-action">
                <a href={WHATSAPP_CONSULTORIA_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-action">
                  <i className="fas fa-bolt"></i>
                  <span>Consultoria Gratuita</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          /* =========================================================
             SCROLL REVEAL – fade-in + blur ao rolar
          ========================================================= */
          .scroll-reveal {
            opacity: 0;
            filter: blur(12px);
            transform: translateY(20px);
            transition: opacity 0.7s ease-out, filter 0.7s ease-out, transform 0.7s ease-out;
          }
          .scroll-reveal.scroll-reveal-visible {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }

          /* =========================================================
             SEÇÃO DE CONTEÚDO – background igual Áreas de Competência
          ========================================================= */
          .inicio-content-section {
            position: relative;
            background: #01071A;
            overflow: hidden;
            padding: 0;
          }
          .inicio-content-section::before {
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
            z-index: 1;
            pointer-events: none;
          }
          .inicio-content-section::after {
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
            z-index: 1;
            pointer-events: none;
            filter: blur(60px);
            -webkit-filter: blur(60px);
          }
          .tech-particles-inicio {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            min-height: 100%;
            z-index: 2;
            pointer-events: none;
            overflow: visible;
          }
          .tech-particles-inicio :global(.tech-particle) {
            position: absolute !important;
            width: 4px !important;
            height: 4px !important;
            background: #00a6ff !important;
            border-radius: 50% !important;
            box-shadow: 0 0 8px #00a6ff !important;
            opacity: 0.3 !important;
            pointer-events: none !important;
            display: block !important;
            visibility: visible !important;
            z-index: 2 !important;
          }
          @keyframes techFloatInicio {
            0% { transform: translate(0, 0); }
            100% { transform: translate(100px, -100px); }
          }

          /* =========================================================
             HERO / INÍCIO
             Ordem: container -> camadas -> conteúdo -> textos -> CTA -> animações -> responsivo
          ========================================================= */

          /* Background escuro (cor do footer) + overlay azul escuro */
          .page-background {
            position: fixed;
            inset: 0;
            z-index: 0;
            pointer-events: none;
            background-color: #01071A;
          }

          /* Overlay na cor do footer (#01071A) - fica atrás da imagem do robô */
          .page-background::after {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(1, 7, 26, 0.75);
          }

          /* Container da imagem do robô em largura total da página */
          .hero-bg-image {
            position: fixed;
            inset: 0;
            z-index: 1;
            pointer-events: none;
            width: 100%;
          }

          /* Wrap em largura total para sem espaços laterais */
          .hero-bg-image-wrap {
            position: relative;
            width: 100%;
            height: 100vh;
            min-height: 100vh;
          }

          /* Imagem ocupa largura total: cover para preencher sem margens laterais */
          .hero-bg-image-img {
            display: block;
            width: 100%;
            height: 100%;
            min-height: 100vh;
            object-fit: cover;
            object-position: center top;
          }

          /* Gradiente APENAS em cima da foto: overlay do mesmo tamanho que a imagem */
          .hero-bg-image-gradient {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to bottom,
              rgba(1, 7, 26, 0.85) 0%,
              rgba(1, 7, 26, 0.72) 40%,
              rgba(1, 7, 26, 0.72) 70%,
              rgba(16, 219, 255, 0.45) 100%
            );
            pointer-events: none;
          }

          /* Partículas no background da página inteira (atrás de todo o conteúdo) */
          .tech-particles {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            min-height: 100vh;
            z-index: 2;
            pointer-events: none;
            overflow: visible;
          }
          .tech-particles .tech-particle {
            position: absolute !important;
            width: 4px !important;
            height: 4px !important;
            border-radius: 50% !important;
            pointer-events: none !important;
            display: block !important;
            visibility: visible !important;
            z-index: 2 !important;
            opacity: 0.3 !important;
          }
          @keyframes techFloat {
            0% { transform: translate(0, 0); }
            100% { transform: translate(100px, -100px); }
          }

          /* Container principal do Hero (contexto para z-index das camadas) */
          .hero-container {
            position: relative;
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            z-index: 1; /* acima do .page-background */
            padding: 100px 0 40px; /* espaço para o header + respiro inferior */
            box-sizing: border-box;
          }

          /* Conteúdo do Hero: apenas textos e botão Consultoria acima da imagem */
          .hero-content {
            position: relative;
            z-index: 10;
            width: 100%;
            display: flex;
            align-items: flex-start;
            /* Faz o Hero ocupar 1 viewport inteiro, empurrando o "Sobre" para baixo */
            min-height: 100vh;
            padding: 27vh 100px 0; /* topo (posicionamento) + laterais */
            box-sizing: border-box;
          }

          /* Coluna de texto (esquerda) */
          .text-column {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 30px;
            text-align: left;
          }

          /* Coluna do CTA (direita, posicionada) */
          .visual-column {
            position: absolute;
            right: 100px;
            top: 20vh;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: flex-start;
            gap: 15px;
            max-width: 320px;
            box-sizing: border-box;
          }

          /* Subtítulo com gradiente e brilho animado */
          .hero-subtitle {
            position: relative;
            font-size: 1.47rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin: 0 0 10px;
            opacity: 0; /* entra via fadeInUp */
            transform: translateY(30px);
            background: linear-gradient(
              90deg,
              #10dbff 0%,
              #10dbff 40%,
              #ffffff 50%,
              #10dbff 60%,
              #10dbff 100%
            );
            background-size: 200% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: fadeInUp 1s ease 0.2s forwards,
              subtitleShine 3s ease-in-out infinite 0s;
            filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.5))
              drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3));
          }

          /* Movimento do brilho do gradiente do subtítulo */
          @keyframes subtitleShine {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          /* Título principal (H1) */
          .hero-title {
            font-family: 'Quicksand', sans-serif;
            font-size: 2.78rem;
            font-weight: 800;
            line-height: 1.05;
            margin: 0 0 10px;
            padding: 0;
            color: #ffffff;
            white-space: normal;
            display: block;
            opacity: 0; /* entra via fadeInUp */
            animation: fadeInUp 1s ease 0.4s forwards;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5),
              0 4px 20px rgba(0, 0, 0, 0.3);
          }

          /* Controla as 2 linhas do H1 (desktop: block; mobile muda para inline) */
          .hero-title .title-line-1,
          .hero-title .title-line-2 {
            display: block;
            line-height: 1.05;
            margin: 0 !important;
            padding: 0 !important;
            height: auto;
            vertical-align: top;
          }

          .hero-title .title-line-1 {
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
            margin-top: 0 !important;
          }

          .hero-title .title-line-2 {
            margin-top: 0 !important;
            padding-top: 0 !important;
            margin-bottom: 0 !important;
          }

          .hero-title .title-line-1 + .title-line-2 {
            margin-top: 0 !important;
            padding-top: 0 !important;
          }

          /* Garante que spans internos do H1 não adicionem espaçamentos inesperados */
          .hero-title span:not(.title-line-1):not(.title-line-2) {
            display: inline;
            margin: 0;
            padding: 0;
          }

          /* Quebra de linha "controlada" (aparece só no mobile) */
          .mobile-br {
            display: none;
          }

          /* Força esses trechos do título a ficarem brancos (sem gradiente) */
          .hero-title .comma-white {
            color: #ffffff !important;
            background: none !important;
            -webkit-background-clip: unset !important;
            -webkit-text-fill-color: #ffffff !important;
            background-clip: unset !important;
          }

          /* "Na" com cor fixa (evita herdar estilos de destaque) */
          .hero-title .na-text {
            color: #ffffff !important;
            background: none !important;
            -webkit-background-clip: unset !important;
            -webkit-text-fill-color: #ffffff !important;
            background-clip: unset !important;
          }

          /* Nome da empresa em ciano (destaque principal) */
          .hero-title .delta-solutions-bold {
            font-weight: 900 !important;
            font-family: inherit !important;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            display: inline-block;
            color: #10dbff !important;
            background: none !important;
            -webkit-background-clip: unset !important;
            -webkit-text-fill-color: #10dbff !important;
            background-clip: unset !important;
          }

          /* Palavra destacada com sublinhado em gradiente */
          .hero-title .highlight-word {
            position: relative;
            display: inline-block;
            color: #ffffff !important;
            background: none !important;
            -webkit-background-clip: unset !important;
            -webkit-text-fill-color: #ffffff !important;
            background-clip: unset !important;
          }

          /* Sublinhado decorativo (gradiente) do destaque */
          .hero-title .highlight-word::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, #10dbff 0%, #0461b9 100%);
            border-radius: 2px;
          }

          /* Botão/CTA principal */
          .btn-action {
            display: inline-flex;
            align-items: center;
            gap: 9.45px;
            padding: 10.5px 21px;
            border-radius: 15px;
            opacity: 0;
            transform: translateY(30px);
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9135rem;
            background: #10dbff;
            color: #0a0a14;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            width: fit-content;
            margin-top: 0;
            position: relative;
            overflow: hidden;
            animation: fadeInUp 1s ease 1s forwards, floatButton 3s ease-in-out infinite 2.5s;
          }

          /* Faixa de brilho passando por cima do botão */
          .btn-action::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              45deg,
              transparent 30%,
              rgba(255, 255, 255, 0.3) 50%,
              transparent 70%
            );
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
            z-index: 0;
            opacity: 1;
            animation: buttonShine 1.5s ease infinite;
            pointer-events: none;
          }

          /* Mantém ícones/texto acima do brilho do ::before */
          .btn-action > * {
            position: relative;
            z-index: 10;
          }

          /* Garante que ícone e texto participem do layout inline */
          .btn-action i,
          .btn-action span {
            position: relative;
            z-index: 10;
            display: inline-block;
          }

          .btn-action:hover {
            background: #0eb5d9;
          }

          /* Feedback de clique (mantém simples; em mobile não atrapalha a animação) */
          .btn-action:active {
            transform: translateY(-4px);
          }

          /* Brilho animado do CTA */
          @keyframes buttonShine {
            0% {
              transform: translateX(-100%) translateY(-100%) rotate(45deg);
            }
            100% {
              transform: translateX(100%) translateY(100%) rotate(45deg);
            }
          }

          @keyframes floatButton {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-8px) translateX(0);
            }
          }

          /* Flutuação (usado em cards/elementos em outras seções) */
          @keyframes floatCard {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-8px) translateX(0);
            }
          }

          /* Entrada padrão dos elementos do Hero (sobe + aparece) */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* =========================
             Responsivo do Hero
          ========================= */

          /* Ajustes leves em telas grandes/intermediárias */
          @media (max-width: 1400px) {
            .visual-column {
              right: 80px;
            }
          }

          @media (max-width: 1100px) {
            .hero-content {
              gap: 30px;
              padding-left: 60px;
              padding-right: 60px;
            }
            
            .hero-title {
              font-size: 2.38rem;
            }

            .visual-column {
              max-width: 100%;
              align-items: flex-start;
              right: 60px;
            }

            .tecnologia-title {
              margin-left: 0;
              margin-right: 0;
            }

            .tecnologia-content {
              margin-left: 0;
              margin-right: 0;
            }
          }

          @media (max-width: 768px) {
            .hero-title {
              font-size: 1.75rem;
              line-height: 1.0815;
            }

            .hero-title .title-line-1,
            .hero-title .title-line-2 {
              line-height: 1.0815;
            }
        
            /* Texto sem quebra no mobile */
            .hero-subtitle {
              white-space: nowrap;
              font-size: clamp(0.92rem, 3.22vw, 1.24rem);
            }

            .hero-container {
              padding: 100px 0 0;
              align-items: center;
              width: 100%;
              max-width: 100vw;
              overflow: hidden;
              box-sizing: border-box;
              /* Fix para Android - previne overflow horizontal */
              overscroll-behavior-x: none;
              -webkit-overscroll-behavior-x: none;
              position: relative;
            }

            .hero-content {
              padding-left: 20px;
              padding-right: 20px;
              min-height: 100vh; /* garante que o "Sobre" não suba por cima do fundo */
              padding-top: 10vh;
              max-width: 100%;
              width: 100%;
              box-sizing: border-box;
              margin-left: 0;
              margin-right: 0;
              flex-direction: column;
              align-items: center;
              overflow-x: hidden;
              /* Fix para Android - previne overflow horizontal */
              overscroll-behavior-x: none;
              -webkit-overscroll-behavior-x: none;
            }

            .text-column {
              width: 100%;
              text-align: center;
              padding-left: 0;
              padding-right: 0;
              margin-left: 0;
              margin-right: 0;
            }

            .hero-subtitle {
              text-align: center;
            }

            .hero-title {
              text-align: center;
            }

            .visual-column {
              max-width: 100%;
              align-items: center;
              justify-content: center;
              position: static;
              right: auto;
              top: auto;
              margin-top: 10px;
              width: 100%;
              order: 2;
            }

            .btn-action {
              font-size: 0.85rem;
              padding: 9px 18px;
              width: auto;
              margin: 0 auto;
            }

            /* Quebras de linha no mobile */
            .mobile-br {
              display: block;
              width: 100%;
              height: 0;
              line-height: 0;
              margin: 0;
              padding: 0;
            }

            .hero-title .title-line-1,
            .hero-title .title-line-2 {
              display: inline;
              text-align: center;
            }
          }

          @media (max-width: 480px) {
            .hero-container {
              padding-top: 90px;
            }

            .hero-title {
              font-size: 1.12rem;
              line-height: 1.0815;
            }

            .hero-title .title-line-1,
            .hero-title .title-line-2 {
              line-height: 1.0815;
            }
        
            .hero-subtitle {
              font-size: clamp(0.88rem, 3.22vw, 1.11rem);
              white-space: nowrap;
            }

            .hero-content {
              padding-left: 15px;
              padding-right: 15px;
              min-height: 100vh;
              padding-top: 8vh;
              align-items: flex-start;
            }

            .text-column {
              width: 100%;
              text-align: center;
            }

            .hero-subtitle {
              text-align: center;
            }

            .hero-title {
              text-align: center;
            }

            .visual-column {
              position: static;
              right: auto;
              top: auto;
              margin-top: 10px;
              width: 100%;
              align-items: center;
              justify-content: center;
              order: 2;
            }

            .btn-action {
              font-size: 0.8rem;
              padding: 8px 16px;
              width: auto;
              margin: 0 auto;
            }
          }

          /* Seção Sobre (conteúdo integrado) */
          .about-section {
            position: relative;
            width: 100%;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
            background-color: transparent; /* deixa o background único aparecer */
            overflow: hidden;
          }
          .about-section::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 80%;
            background: radial-gradient(ellipse at center, rgba(25, 35, 71, 0.75) 0%, rgba(25, 35, 71, 0.5) 20%, rgba(25, 35, 71, 0.3) 35%, rgba(25, 35, 71, 0.15) 50%, transparent 65%);
            z-index: 1;
            pointer-events: none;
          }
          .about-section::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60%;
            height: 60%;
            background: radial-gradient(circle at center, rgba(25, 35, 71, 0.65) 0%, rgba(25, 35, 71, 0.4) 25%, rgba(25, 35, 71, 0.2) 40%, rgba(25, 35, 71, 0.08) 55%, transparent 70%);
            z-index: 1;
            pointer-events: none;
            filter: blur(60px);
            -webkit-filter: blur(60px);
          }
          .about-section .about-container {
            position: relative;
            z-index: 10;
            max-width: 1200px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .about-section .content-wrapper {
            width: 100%;
            background: #01071A;
            border-radius: 20px;
            padding: 60px 40px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 166, 255, 0.15);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 166, 255, 0.08);
            display: flex;
            flex-direction: column;
            gap: 80px;
            position: relative;
            overflow: hidden;
          }
          .about-section .content-wrapper::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 80%;
            background: radial-gradient(ellipse at center, rgba(25, 35, 71, 0.75) 0%, rgba(25, 35, 71, 0.5) 20%, rgba(25, 35, 71, 0.3) 35%, rgba(25, 35, 71, 0.15) 50%, transparent 65%);
            z-index: 0;
            pointer-events: none;
          }
          .about-section .content-wrapper::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60%;
            height: 60%;
            background: radial-gradient(circle at center, rgba(25, 35, 71, 0.65) 0%, rgba(25, 35, 71, 0.4) 25%, rgba(25, 35, 71, 0.2) 40%, rgba(25, 35, 71, 0.08) 55%, transparent 70%);
            z-index: 0;
            pointer-events: none;
            filter: blur(60px);
            -webkit-filter: blur(60px);
          }
          .about-section .section-header {
            text-align: center;
            position: relative;
            margin-bottom: 20px;
            z-index: 1;
          }
          .about-section .section-header h2 {
            font-family: 'Quicksand', sans-serif;
            font-size: 2.8rem;
            font-weight: 800;
            margin-bottom: 20px;
            color: #ffffff;
            opacity: 0;
            animation: fadeInUp 1s ease 0.2s forwards;
          }
          .about-section .section-header h2 span {
            background: linear-gradient(90deg, #10dbff 0%, #10dbff 40%, #ffffff 50%, #10dbff 60%, #10dbff 100%);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: subtitleShine 3s ease-in-out infinite;
          }
          .about-section .section-subtitle {
            font-size: 1.365rem;
            color: #b0e0ff;
            line-height: 1.7;
            max-width: 800px;
            margin: 0 auto;
            opacity: 0;
            animation: fadeInUp 1s ease 0.4s forwards;
          }
          .about-section .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(196px, 1fr));
            gap: 21px;
            margin: 40px 0;
            position: relative;
            z-index: 1;
          }
          .about-section .stat-card {
            text-align: center;
            padding: 0;
            background: transparent;
            border-radius: 16px;
            position: relative;
            overflow: hidden;
            perspective: 1000px;
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 1s ease forwards;
          }
          .about-section .stat-card:nth-child(1) { animation-delay: 1.2s; }
          .about-section .stat-card:nth-child(2) { animation-delay: 1.4s; }
          .about-section .stat-card:nth-child(3) { animation-delay: 1.6s; }
          .about-section .stat-card-inner {
            width: 100%;
            height: 100%;
            padding: 35px 21px;
            background: rgba(17, 34, 64, 0.3);
            border-radius: 16px;
            border: 1px solid rgba(0, 166, 255, 0.15);
            transform-style: preserve-3d;
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            will-change: transform;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          }
          .about-section .stat-card:hover .stat-card-inner {
            border-color: rgba(0, 166, 255, 0.3);
            background: rgba(17, 34, 64, 0.4);
          }
          .about-section .stat-card h3 {
            font-family: 'Quicksand', sans-serif;
            font-size: 2.8rem;
            font-weight: 800;
            margin-bottom: 10px;
            color: #ffffff;
            position: relative;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            transform-style: preserve-3d;
            text-shadow: none;
          }
          .about-section .stat-card p {
            font-size: 0.77rem;
            color: #b0e0ff;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            transform-style: preserve-3d;
            opacity: 0.8;
          }
          .about-section .features-container {
            display: flex;
            justify-content: space-between;
            gap: 60px;
            margin-top: 0;
            position: relative;
            z-index: 1;
          }
          .about-section .feature-item {
            flex: 1;
            position: relative;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 1s ease forwards;
          }
          .about-section .feature-item:nth-child(1) { animation-delay: 0.6s; }
          .about-section .feature-item:nth-child(2) { animation-delay: 0.8s; }
          .about-section .feature-content {
            position: relative;
            padding-left: 80px;
            z-index: 1;
          }
          .about-section .feature-content h3 {
            font-family: 'Quicksand', sans-serif;
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 25px;
            color: #ffffff;
          }
          .about-section .feature-content p {
            color: #b0e0ff;
            font-size: 1.155rem;
            line-height: 1.8;
            font-weight: 300;
          }
          .about-section .feature-icon {
            position: absolute;
            left: 0;
            top: 0;
            width: 60px;
            height: 60px;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #10dbff;
            font-size: 1.5rem;
            background: transparent;
            box-shadow: none;
            transition: all 0.4s ease;
            z-index: 1;
            overflow: visible;
            transform-origin: center center;
          }
          .about-section .feature-icon .fa-bullseye {
            animation: targetPulse 2s ease-in-out infinite;
          }
          @keyframes targetPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.15); opacity: 0.9; }
          }
          .about-section .feature-item:hover .feature-icon {
            background: transparent;
            color: #10dbff;
            transform: scale(1.3);
            transform-origin: center center;
            box-shadow: none;
          }
          .about-section .about-description {
            display: flex;
            align-items: flex-start;
            gap: 40px;
            margin-top: 10px;
            opacity: 0;
            animation: fadeInUp 1s ease 1s forwards;
          }
          .about-section .about-description i {
            font-size: 2rem;
            color: #10dbff;
            margin-top: 5px;
            margin-left: 40px;
            flex-shrink: 0;
          }
          .about-section .about-description p {
            font-size: 1.155rem;
            line-height: 1.8;
            color: #b0e0ff;
            margin: 0;
          }
          .about-section .about-description .delta-cyan {
            color: #10dbff;
            font-weight: 600;
          }
          @media (max-width: 1024px) {
            .about-section { padding: 100px 20px; }
            .about-section .section-header h2 { font-size: 2.24rem; }
            .about-section .features-container { gap: 40px; }
            .about-section .feature-content h3 { font-size: 2rem; }
            .about-section .stat-card h3 { font-size: 2.5rem; }
          }
          @media (max-width: 768px) {
            .about-section {
              padding: 0 0 40px 0;
              align-items: flex-start;
              padding-top: 100px;
            }
            .about-section .content-wrapper {
              padding: 30px 20px 40px 20px;
              border-radius: 24px;
              margin: 0;
              gap: 30px;
            }
            .about-section .section-header { text-align: center; padding: 0 10px; margin-bottom: 10px; }
            .about-section .section-header h2 { font-size: 1.6rem; text-align: center; line-height: 1.2; margin-bottom: 10px; }
            .about-section .section-header .mobile-break { display: block; }
            .about-section .section-subtitle { font-size: 0.95rem; text-align: center; padding: 0 5px; line-height: 1.6; }
            .about-section .stats-grid {
              display: flex;
              flex-direction: column;
              gap: 15px;
              margin: 20px 0;
              align-items: stretch;
            }
            .about-section .stat-card { perspective: 500px; min-height: 140px; width: 100%; }
            .about-section .stat-card:nth-child(1) { align-self: flex-start; max-width: 72.25%; }
            .about-section .stat-card:nth-child(2) { align-self: center; max-width: 76.5%; }
            .about-section .stat-card:nth-child(3) { align-self: flex-end; max-width: 72.25%; }
            .about-section .stat-card-inner { padding: 21px 17px; border: none; }
            .about-section .stat-card h3 { font-size: 1.7rem; }
            .about-section .stat-card p { font-size: 0.66rem; }
            .about-section .stat-card-inner { transform: none !important; border: none !important; }
            .about-section .stat-card:hover .stat-card-inner { border: none !important; }
            .about-section .stat-card:hover h3 { transform: scale(1.03) !important; }
            .about-section .features-container { flex-direction: column; gap: 30px; margin-top: 20px; }
            .about-section .feature-content { padding-left: 70px; text-align: left; }
            .about-section .feature-content h3 { font-size: 1.6rem; }
            .about-section .feature-content p { font-size: 0.95rem; line-height: 1.6; }
          }
          @media (max-width: 480px) {
            .about-section {
              padding: 0 0 30px 0;
              align-items: flex-start;
              padding-top: 90px;
            }
            .about-section .content-wrapper {
              padding: 25px 15px 30px 15px;
              gap: 25px;
              border-radius: 20px;
            }
            .about-section .section-header { padding: 0 5px; margin-bottom: 8px; }
            .about-section .section-header h2 { font-size: 1.36rem; text-align: center; line-height: 1.2; margin-bottom: 8px; }
            .about-section .section-subtitle { font-size: 0.85rem; text-align: center; padding: 0; line-height: 1.5; }
            .about-section .stats-grid { display: flex; flex-direction: column; gap: 12px; margin: 15px 0; align-items: stretch; }
            .about-section .stat-card { min-height: 130px; width: 100%; }
            .about-section .stat-card:nth-child(1) { align-self: flex-start; max-width: 68%; }
            .about-section .stat-card:nth-child(2) { align-self: center; max-width: 72.25%; }
            .about-section .stat-card:nth-child(3) { align-self: flex-end; max-width: 68%; }
            .about-section .stat-card-inner { padding: 17px 13px; border: none !important; }
            .about-section .stat-card h3 { font-size: 1.53rem; }
            .about-section .stat-card p { font-size: 0.595rem; }
            .about-section .feature-content { padding-left: 60px; text-align: left; }
            .about-section .feature-content h3 { font-size: 1.4rem; }
            .about-section .feature-content p { font-size: 0.85rem; line-height: 1.5; }
            .about-section .feature-icon { width: 50px; height: 50px; font-size: 1.3rem; }
          }

          .inicio-content-section .tecnologia-section,
          .inicio-content-section .about-section,
          .inicio-content-section .servicos-section,
          .inicio-content-section .tecnologias-section,
          .inicio-content-section .cta-simple-section {
            position: relative;
            z-index: 10;
          }
          .tecnologia-section {
            background-color: transparent; /* deixa o background único aparecer */
            padding: 80px 20px;
            width: 100%;
            max-width: 100%;
            position: relative;
            z-index: 10;
            min-height: auto;
            margin-left: 0;
            margin-right: 0;
            margin-top: 10vh;
            box-sizing: border-box;
            overflow-x: hidden;
          }

          @media (max-width: 768px) {
            .tecnologia-section {
              width: 100%;
              max-width: 100%;
              margin-left: 0;
              margin-right: 0;
              padding-left: 20px;
              padding-right: 20px;
              overflow-x: hidden;
              box-sizing: border-box;
            }

            .tecnologia-container {
              margin-left: 0;
              margin-right: 0;
              padding-left: 0;
              padding-right: 0;
            }
          }

          .tecnologia-container {
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
            padding: 0;
            box-sizing: border-box;
          }

          .tecnologia-title {
            font-family: 'Quicksand', sans-serif;
            font-size: 2.4rem;
            font-weight: 800;
            color: #ffffff;
            text-align: center;
            margin-bottom: 40px;
            line-height: 1.2;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 0;
            margin-right: 0;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 1s ease 0.2s forwards;
            box-sizing: border-box;
          }

          .tecnologia-title .title-line-1 {
            display: block;
            text-align: center;
            transform: translateX(-12.5%);
          }

          .tecnologia-title .title-line-2 {
            display: block;
            text-align: center;
            transform: translateX(12.5%);
          }

          @media (max-width: 768px) {
            .tecnologia-title .title-line-1,
            .tecnologia-title .title-line-2 {
              text-align: center;
              margin-left: 0;
              margin-right: 0;
              transform: none;
            }
          }

          .tecnologia-content {
            max-width: 1200px;
            margin: 0 auto;
            margin-left: 0;
            margin-right: 0;
            display: flex;
            align-items: flex-start;
            gap: 40px;
            box-sizing: border-box;
          }

          @media (max-width: 768px) {
            .tecnologia-content {
              margin-left: 0;
              align-items: center;
            }
          }

          .tecnologia-text-wrapper {
            flex: 1;
            padding-left: 0;
            width: 100%;
          }

          @media (max-width: 768px) {
            .tecnologia-text-wrapper {
              width: 100%;
              padding-left: 0;
              padding-right: 0;
            }
          }

          .tecnologia-text {
            font-size: 1.155rem;
            line-height: 1.8;
            color: #ffffff;
            text-align: justify;
            text-justify: inter-word;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 1s ease 0.4s forwards;
          }

          .tecnologia-image-wrapper {
            flex: 0 0 400px;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 1s ease 0.6s forwards;
          }

          @media (max-width: 768px) {
            .tecnologia-image-wrapper {
              flex: 1;
              width: 100%;
              max-width: 100%;
            }
          }

          .tecnologia-image {
            width: 100%;
            height: auto;
            border-radius: 16px;
            object-fit: cover;
          }

          /* NOVOS ESTILOS PARA A SEÇÃO DE SERVIÇOS */
          .servicos-section {
            margin-top: 120px;
            padding: 0 20px;
          }

          .servicos-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .servico-card {
            background: linear-gradient(135deg, rgba(16, 219, 255, 0.05) 0%, rgba(4, 97, 185, 0.05) 100%);
            border: none;
            border-radius: 16px;
            padding: 40px 30px;
            position: relative;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 1s ease 0.8s forwards, floatCard 3s ease-in-out infinite 2.3s;
          }

          .servico-card:nth-child(1) {
            animation: fadeInUp 1s ease 0.8s forwards, floatCard 3s ease-in-out infinite 2.3s;
          }

          .servico-card:nth-child(2) {
            animation: fadeInUp 1s ease 1s forwards, floatCard 3s ease-in-out infinite 2.5s;
          }

          .servico-card:nth-child(3) {
            animation: fadeInUp 1s ease 1.2s forwards, floatCard 3s ease-in-out infinite 2.7s;
          }

          .servico-card:nth-child(4) {
            animation: fadeInUp 1s ease 1.4s forwards, floatCard 3s ease-in-out infinite 2.9s;
          }

          .servico-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%);
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: 1;
          }

          .servico-card:hover {
            transform: translateY(-18px);
            box-shadow: 
              0 20px 40px rgba(0, 0, 0, 0.2),
              0 0 30px rgba(0, 0, 0, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
            animation-play-state: paused;
          }

          .servico-card:hover::before {
            opacity: 1;
          }

          .servico-icon {
            font-size: 3rem;
            color: #10dbff;
            margin-bottom: 25px;
            position: relative;
            z-index: 2;
            transition: all 0.4s ease;
          }

          .servico-card:hover .servico-icon {
            color: #00ffaa;
            transform: scale(1.1);
          }

          .servico-title {
            font-family: 'Quicksand', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 20px;
            position: relative;
            z-index: 2;
          }

          .servico-desc {
            font-size: 1rem;
            line-height: 1.6;
            color: #b0e0ff;
            margin-bottom: 25px;
            position: relative;
            z-index: 2;
          }

          .servico-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #10dbff;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            position: relative;
            z-index: 2;
            transition: all 0.3s ease;
          }

          .servico-link:hover {
            color: #00ffaa;
            gap: 12px;
          }

          .servico-link i {
            font-size: 0.8rem;
            transition: transform 0.3s ease;
          }

          .servico-link:hover i {
            transform: translateX(4px);
          }

          /* Responsividade para a seção de serviços */
          @media (max-width: 1024px) {
            .servicos-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 25px;
            }
          }

          @media (max-width: 768px) {
            .servicos-section {
              margin-top: 80px;
              padding: 0 15px;
              width: 100%;
              max-width: 100%;
              box-sizing: border-box;
            }

            .servicos-grid {
              grid-template-columns: 1fr;
              gap: 20px;
              width: 100%;
              max-width: 100%;
              margin-left: 0;
              margin-right: 0;
              padding-left: 0;
              padding-right: 0;
            }

            .servico-card {
              padding: 30px 25px;
              width: 100%;
              max-width: 100%;
              box-sizing: border-box;
            }

            .servico-title {
              font-size: 1.3rem;
            }

            .servico-desc {
              font-size: 0.95rem;
            }
          }

          @media (max-width: 480px) {
            .servicos-section {
              margin-top: 60px;
              padding: 0 10px;
            }

            .servico-card {
              padding: 25px 20px;
            }

            .servico-icon {
              font-size: 2.5rem;
              margin-bottom: 20px;
            }

            .servico-title {
              font-size: 1.2rem;
              margin-bottom: 15px;
            }

            .servico-desc {
              font-size: 0.9rem;
              margin-bottom: 20px;
            }
          }

          @media (max-width: 768px) {
            .tecnologia-section {
              padding: 60px 15px;
            }

            /* No mobile, alinhar o conteúdo (título/texto/imagem) com o "miolo" dos cards abaixo */
            .tecnologia-container {
              /* cards (<=768): section 15px + card padding 25px => 40px de recuo total */
              padding-left: 25px;
              padding-right: 25px;
              box-sizing: border-box;
            }

            .tecnologia-title {
              font-size: 1.9rem;
              margin-bottom: 30px;
              margin-left: 0;
              margin-right: 0;
              align-items: center;
              text-align: center;
            }

            .tecnologia-content {
              flex-direction: column;
              gap: 30px;
              align-items: center;
              margin-left: 0;
              margin-right: 0;
              padding-left: 0;
              padding-right: 0;
            }

            .tecnologia-text-wrapper {
              padding-left: 0;
              padding-right: 0;
              width: 100%;
              text-align: center;
              margin-left: 0;
              margin-right: 0;
            }

            .tecnologia-image-wrapper {
              flex: 1;
              width: 100%;
            }

            .tecnologia-text {
              font-size: 1rem;
              line-height: 1.7;
            }
          }

          @media (max-width: 480px) {
            .tecnologia-section {
              padding: 40px 15px;
            }

            /* Em telas bem pequenas, seguir o padrão visual dos cards (recuo total menor) */
            .tecnologia-container {
              /* cards (<=480): section 10px + card padding 20px => 30px de recuo total
                 aqui a section é 15px, então completamos com +15px */
              padding-left: 15px;
              padding-right: 15px;
              box-sizing: border-box;
            }

            .tecnologia-title {
              font-size: 1.4rem;
              margin-bottom: 25px;
              margin-left: 0;
              margin-right: 0;
              align-items: center;
              text-align: center;
            }

            .tecnologia-content {
              flex-direction: column;
              gap: 25px;
              align-items: center;
              margin-left: 0;
              margin-right: 0;
              padding-left: 0;
              padding-right: 0;
            }

            .tecnologia-text-wrapper {
              padding-left: 0;
              text-align: center;
            }

            .tecnologia-image-wrapper {
              flex: 1;
              width: 100%;
            }

            .tecnologia-text {
              font-size: 0.95rem;
              line-height: 1.6;
            }
          }

          /* ESTILOS PARA SECTION HEADER (compartilhado) */
          .section-header {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto 80px;
            padding: 0 20px;
            text-align: center;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 1s ease 0.3s forwards;
            box-sizing: border-box;
          }

          @media (max-width: 768px) {
            .section-header {
              padding: 0 15px;
              margin-left: 0;
              margin-right: 0;
              width: 100%;
              max-width: 100%;
            }
          }

          .section-title {
            font-family: 'Quicksand', sans-serif;
            font-size: 2.8rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 20px;
            line-height: 1.2;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .section-title .title-line-1,
          .section-title .title-line-2 {
            display: block;
            text-align: center;
          }

          .section-subtitle {
            font-size: 1.2rem;
            line-height: 1.6;
            color: #b0e0ff;
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
          }

          .tecnologias-cyan {
            color: #10dbff !important;
          }

          .section-title .highlight-word {
            position: relative;
            display: inline-block;
            color: #ffffff !important;
            background: none !important;
            -webkit-background-clip: unset !important;
            -webkit-text-fill-color: #ffffff !important;
            background-clip: unset !important;
          }

          .section-title .highlight-word::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, #10dbff 0%, #0461b9 100%);
            border-radius: 2px;
          }

          /* SESSÃO DE TECNOLOGIAS */
          .tecnologias-section {
            margin-top: 120px;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            box-sizing: border-box;
            overflow-x: hidden;
          }

          .tecnologias-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            max-width: 1000px;
            width: 100%;
            margin: 0 auto;
            padding: 0;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 1s ease 0.5s forwards;
            place-items: center;
            box-sizing: border-box;
          }

          .tech-item {
            background: rgba(5, 25, 70, 0.15);
            border: 1px solid rgba(16, 219, 255, 0.1);
            border-radius: 12px;
            padding: 18px 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.3s ease;
            text-align: center;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
          }

          .tech-item:hover {
            border-color: rgba(16, 219, 255, 0.3);
            transform: translateY(-5px);
          }

          .tech-icon {
            font-size: 1.8rem;
            color: #10dbff;
          }

          .tech-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
          }

          .tech-info h4 {
            font-family: 'Quicksand', sans-serif;
            font-size: 0.95rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 6px;
            text-align: center;
            line-height: 1.3;
          }

          .tech-info p {
            color: #b0e0ff;
            font-size: 0.75rem;
            line-height: 1.3;
            text-align: center;
            margin: 0;
          }

          /* Padronização dos cards (apenas web/desktop) */
          @media (min-width: 769px) {
            .tecnologias-grid {
              /* Evita alturas diferentes por item e mantém grid uniforme */
              place-items: stretch;
            }

            .tech-item {
              height: 100%;
              min-height: 170px;
              padding: 22px 18px;
            }

            .tech-info h4 {
              /* Reserva espaço para títulos de 1–2 linhas sem “pular” alturas */
              min-height: 2.6em;
            }
          }

          /* Responsividade para seção de tecnologias */
          @media (max-width: 1200px) {
            .tecnologias-grid {
              grid-template-columns: repeat(2, 1fr);
              justify-items: center;
              width: 100%;
              max-width: 100%;
              box-sizing: border-box;
            }
          }

          @media (max-width: 992px) {
            .section-title {
              font-size: 2.33rem;
            }
          }

          @media (max-width: 768px) {
            .tecnologias-section {
              margin-top: 80px;
              padding: 0 15px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 100%;
              max-width: 100%;
              box-sizing: border-box;
              overflow-x: hidden;
            }
            
            .tecnologias-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 15px;
              justify-items: stretch;
              align-items: stretch;
              width: 100%;
              max-width: 100%;
              box-sizing: border-box;
              padding: 0;
              margin-left: 0;
              margin-right: 0;
            }
            
            .tech-item {
              padding: 15px 12px;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
              gap: 8px;
              width: 100%;
              max-width: 100%;
              height: auto;
              min-height: 0;
              box-sizing: border-box;
              display: flex;
            }
            
            .tech-icon {
              font-size: 1.5rem;
              margin-bottom: 0;
            }
            
            .tech-info h4 {
              font-size: 0.85rem;
              margin-bottom: 4px;
              line-height: 1.2;
            }
            
            .tech-info p {
              font-size: 0.7rem;
              line-height: 1.2;
            }
            
            .section-title {
              font-size: 2.24rem;
            }
            
            .section-subtitle {
              font-size: 1.1rem;
            }
          }

          @media (max-width: 480px) {
            .tecnologias-section {
              margin-top: 60px;
              padding: 0 15px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 100%;
              box-sizing: border-box;
              overflow-x: hidden;
            }
            
            .tecnologias-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 12px;
              justify-items: stretch;
              align-items: stretch;
              width: 100%;
              max-width: 100%;
              box-sizing: border-box;
              padding: 0;
            }
            
            .tech-item {
              padding: 12px 10px;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
              gap: 6px;
              width: 100%;
              max-width: 100%;
              height: auto;
              min-height: 0;
              box-sizing: border-box;
              display: flex;
            }
            
            .tech-icon {
              font-size: 1.3rem;
              margin-bottom: 0;
            }
            
            .tech-info h4 {
              font-size: 0.75rem;
              margin-bottom: 3px;
              line-height: 1.2;
            }
            
            .tech-info p {
              font-size: 0.65rem;
              line-height: 1.2;
            }
            
            .section-title {
              font-size: 1.6rem;
            }
          }

          /* CTA SIMPLES E ELEGANTE */
          .cta-simple-section {
            margin: 40px 0 0 0;
            padding: 40px 20px;
            position: relative;
          }

          .cta-simple-content {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
            animation: floatContent 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            will-change: transform;
          }

          @keyframes floatContent {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-12px);
            }
          }

          /* Texto principal */
          .simple-text {
            margin-top: 120px;
            margin-bottom: 40px;
          }

          .simple-title {
            font-family: 'Quicksand', sans-serif;
            font-size: 2.8rem;
            font-weight: 700;
            color: #ffffff;
            line-height: 1.3;
            margin-bottom: 20px;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.6s ease forwards;
            white-space: nowrap;
          }

          .simple-title .highlight {
            color: #10dbff;
            position: relative;
            font-weight: 800;
          }

          .simple-title .highlight:nth-of-type(2) {
            color: #00ffaa;
          }

          .simple-title .highlight:nth-of-type(3) {
            background: linear-gradient(135deg, #10dbff, #00ffaa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .simple-description {
            font-size: 1.1rem;
            color: #b0e0ff;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.6s ease 0.2s forwards;
          }

          /* Botão */
          .simple-action {
            /* Animação removida - o botão btn-action já tem sua própria animação */
          }

          .simple-button {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 14px 32px;
            background: transparent;
            color: #10dbff;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            border-radius: 8px;
            border: 2px solid #10dbff;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .simple-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(16, 219, 255, 0.1),
              transparent
            );
            transition: left 0.6s ease;
            z-index: 1;
          }

          .simple-button span,
          .simple-button i {
            position: relative;
            z-index: 2;
          }

          .simple-button i {
            font-size: 0.9rem;
            transition: transform 0.3s ease;
          }

          /* Hover effects */
          .simple-button:hover {
            background: rgba(16, 219, 255, 0.1);
            border-color: #00ffaa;
            color: #00ffaa;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0, 166, 255, 0.1);
          }

          .simple-button:hover::before {
            left: 100%;
          }

          .simple-button:hover i {
            transform: translateX(5px);
          }

          /* Animações */
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Responsividade */
          @media (max-width: 768px) {
            .cta-simple-section {
              padding: 30px 15px;
              margin: 30px 0;
              width: 100%;
              max-width: 100%;
              box-sizing: border-box;
            }

            .cta-simple-content {
              width: 100%;
              max-width: 100%;
              padding-left: 0;
              padding-right: 0;
            }
            
            .simple-title {
              font-size: 2.24rem;
              white-space: normal;
            }
            
            .simple-description {
              font-size: 1rem;
            }
            
            .simple-button {
              padding: 12px 28px;
              font-size: 0.95rem;
            }
          }

          @media (max-width: 480px) {
            .simple-title {
              font-size: 1.6rem;
              white-space: normal;
            }
            
            .simple-description {
              font-size: 0.95rem;
              padding: 0 10px;
            }
            
            .simple-button {
              padding: 10px 24px;
              font-size: 0.9rem;
              width: 100%;
              justify-content: center;
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Animações de entrada */
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>
    </>
  );
}  