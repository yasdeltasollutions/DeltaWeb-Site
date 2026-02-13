'use client';

import { useState, useEffect, useRef } from 'react';

export default function FerramentariaGaleria() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [clickAnimation, setClickAnimation] = useState(false);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  const slideCardRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      id: 1,
      title: 'Precisão Milimétrica',
      description: 'Tecnologia de última geração para operações que exigem máxima exatidão.',
      icon: 'fas fa-microscope',
      image: '/imagens_ferramentaria/IMG-1.jpg'
    },
    {
      id: 2,
      title: 'Automação CNC 5 Eixos',
      description: 'Sistemas de controle numérico computadorizado com integração IoT.',
      icon: 'fas fa-robot',
      image: '/imagens_ferramentaria/IMG-2.jpg'
    },
    {
      id: 3,
      title: 'Soluções Sob Medida',
      description: 'Desenvolvimento completo de ferramentas e equipamentos personalizados.',
      icon: 'fas fa-tools',
      image: '/imagens_ferramentaria/IMG-3.jpg'
    },
    {
      id: 4,
      title: 'Tecnologia Avançada',
      description: 'Inovação constante com equipamentos de ponta e processos otimizados.',
      icon: 'fas fa-cogs',
      image: '/imagens_ferramentaria/IMG-4.jpg'
    }
  ];

  const thumbnails = [
    {
      id: 1,
      title: 'Precisão',
      image: '/imagens_ferramentaria/IMG-1.jpg'
    },
    {
      id: 2,
      title: 'Automação',
      image: '/imagens_ferramentaria/IMG-2.jpg'
    },
    {
      id: 3,
      title: 'Soluções',
      image: '/imagens_ferramentaria/IMG-3.jpg'
    },
    {
      id: 4,
      title: 'Tecnologia',
      image: '/imagens_ferramentaria/IMG-4.jpg'
    }
  ];

  // Imagens para os textos complementares
  const complementaryImages = [
    {
      id: 1,
      title: 'Engenharia Mecânica',
      image: '/imagens_ferramentaria/IMG_9656.jpg',
      alt: 'Projeto de engenharia mecânica'
    },
    {
      id: 2,
      title: 'Conectividade Industrial',
      image: '/imagens_ferramentaria/IMG_9686.jpg',
      alt: 'Sistema de conectividade industrial IoT'
    }
  ];

  const goToSlide = (index: number) => {
    // Animação de clique no slide
    setClickAnimation(true);
    
    // Reset da animação
    setTimeout(() => {
      setClickAnimation(false);
    }, 600);
    
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(prev);
  };

  const startAutoPlay = () => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }
    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
  };

  // Efeito de movimento 3D no card ao mover mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = slideCardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 3; // ±3 graus
    const rotateX = ((centerY - y) / centerY) * 3; // ±3 graus
    
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
    
    // Efeito de brilho que segue o mouse
    const glow = document.querySelector('.mouse-glow') as HTMLElement;
    if (glow) {
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = '0.6';
    }
  };

  const handleMouseLeave = () => {
    const card = slideCardRef.current;
    if (!card) return;
    
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    
    const glow = document.querySelector('.mouse-glow') as HTMLElement;
    if (glow) {
      glow.style.opacity = '0';
    }
  };

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        goToSlide(prev);
      }
      if (e.key === 'ArrowRight') {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide, slides.length]);

  // Criar partículas tecnológicas flutuantes
  useEffect(() => {
    function createTechParticles() {
      const container = particlesContainerRef.current;
      if (!container) {
        return;
      }

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

    // Tentar múltiplas vezes para garantir que o DOM está pronto
    let attempts = 0;
    const maxAttempts = 5;
    
    function tryInit() {
      attempts++;
      const container = particlesContainerRef.current;
      
      if (container) {
        createTechParticles();
        return true;
      }
      
      if (attempts < maxAttempts) {
        setTimeout(tryInit, 200);
      }
      return false;
    }
    
    const timer1 = setTimeout(tryInit, 100);
    const timer2 = setTimeout(tryInit, 500);
    const timer3 = setTimeout(tryInit, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Efeito de partículas interativas que seguem o mouse
  useEffect(() => {
    const slidePanel = document.querySelector('.slide-panel') as HTMLElement;
    if (!slidePanel) return;

    let mouseX = 0;
    let mouseY = 0;
    let particles: HTMLDivElement[] = [];
    let animationId: number | undefined;

    // Criar partículas interativas
    function createInteractiveParticles() {
      if (!slidePanel) return;
      
      // Limpar partículas existentes
      particles.forEach(particle => particle.remove());
      particles = [];

      // Criar 8 partículas
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'interactive-particle';
        
        // Configuração inicial
        particle.style.position = 'absolute';
        particle.style.width = '12px';
        particle.style.height = '12px';
        particle.style.background = 'rgba(0, 184, 255, 0)';
        particle.style.borderRadius = '50%';
        particle.style.border = '1px solid rgba(0, 184, 255, 0.3)';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '5';
        particle.style.transition = 'all 0.3s ease';
        particle.style.opacity = '0';
        
        slidePanel.appendChild(particle);
        particles.push(particle);
      }
    }

    // Atualizar posição das partículas
    function updateParticles() {
      if (!particles.length || !slidePanel) return;

      particles.forEach((particle, index) => {
        const angle = (index / particles.length) * Math.PI * 2;
        const distance = 60;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;
        
        const targetX = mouseX + offsetX;
        const targetY = mouseY + offsetY;
        
        const rect = slidePanel.getBoundingClientRect();
        const x = targetX - rect.left;
        const y = targetY - rect.top;

        // Suavizar movimento
        const currentX = parseFloat(particle.style.left || '0');
        const currentY = parseFloat(particle.style.top || '0');
        
        const newX = currentX + (x - currentX) * 0.1;
        const newY = currentY + (y - currentY) * 0.1;

        particle.style.left = `${newX}px`;
        particle.style.top = `${newY}px`;
        
        // Efeito de pulso baseado na distância do centro
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const distFromCenter = Math.sqrt(
          Math.pow(newX - centerX, 2) + Math.pow(newY - centerY, 2)
        );
        const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
        const pulseScale = 0.5 + (distFromCenter / maxDist) * 0.5;
        
        particle.style.transform = `scale(${pulseScale})`;
        particle.style.opacity = Math.min(0.6, distFromCenter / maxDist * 0.8).toString();
      });

      animationId = requestAnimationFrame(updateParticles);
    }

    // Event listeners para o mouse
    function handleMouseMove(e: Event) {
      if (!slidePanel) return;
      const mouseEvent = e as MouseEvent;
      const rect = slidePanel.getBoundingClientRect();
      mouseX = mouseEvent.clientX;
      mouseY = mouseEvent.clientY;
      
      // Mostrar partículas quando o mouse entra
      particles.forEach(particle => {
        particle.style.opacity = '0.6';
      });
    }

    function handleMouseEnter() {
      // Iniciar animação
      updateParticles();
    }

    function handleMouseLeave() {
      // Esconder partículas suavemente
      particles.forEach(particle => {
        particle.style.opacity = '0';
      });
      
      // Parar animação
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    }

    // Configurar eventos
    slidePanel.addEventListener('mousemove', handleMouseMove);
    slidePanel.addEventListener('mouseenter', handleMouseEnter);
    slidePanel.addEventListener('mouseleave', handleMouseLeave);

    // Criar partículas
    setTimeout(createInteractiveParticles, 100);

    // Limpar
    return () => {
      try {
        if (slidePanel) {
          slidePanel.removeEventListener('mousemove', handleMouseMove);
          slidePanel.removeEventListener('mouseenter', handleMouseEnter);
          slidePanel.removeEventListener('mouseleave', handleMouseLeave);
        }
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        particles.forEach(particle => {
          try {
            if (particle && particle.parentNode) {
              particle.remove();
            }
          } catch (error) {
            // Ignorar erro se o elemento já foi removido
          }
        });
      } catch (error) {
        // Ignorar erro se o elemento já foi removido
      }
    };
  }, []);

  // Efeito de brilho que segue o mouse
  useEffect(() => {
    const slideCard = slideCardRef.current;
    if (!slideCard) return;

    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    glow.style.cssText = `
      position: absolute;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(0,184,255,0.3) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 2;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    slideCard.appendChild(glow);

    return () => {
      try {
        if (glow && glow.parentNode) {
          glow.remove();
        }
      } catch (error) {
        // Ignorar erro se o elemento já foi removido
      }
    };
  }, []);

  return (
    <section id="ferramentaria" className="ferramentaria-section scroll-reveal">
      <div 
        className="tech-particles" 
        ref={particlesContainerRef} 
        id="tech-particles"
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 2 }}
      ></div>
      <div className="container">
        <div className="section-header scroll-reveal scroll-reveal-delay-1">
          <h2>Nossa Ferramentaria</h2>
          <p className="section-subtitle">Estrutura completa para soluções em ferramentaria com foco em inovação, eficiência e confiabilidade.</p>
        </div>

        <div className="gallery-wrapper scroll-reveal scroll-reveal-delay-2">
          {/* Miniaturas minimalistas - Mantidas do primeiro código */}
          <div className="thumbnails-panel">
            {thumbnails.map((thumbnail, index) => (
              <button
                key={thumbnail.id}
                className={`thumbnail-btn ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <div className="thumbnail-simple">
                  <img src={thumbnail.image} alt={thumbnail.title} />
                  <div className="thumbnail-hover"></div>
                </div>
                <span className="thumbnail-label">{thumbnail.title}</span>
                <div className="thumbnail-line"></div>
              </button>
            ))}
          </div>

          {/* Slide principal com todas as animações */}
          <div className="slide-panel">
            <div className="slide-container">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`slide ${currentSlide === index ? 'active' : ''} ${clickAnimation ? 'click-animation' : ''}`}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <div 
                    className="slide-card"
                    ref={slideCardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Imagem em grande destaque */}
                    <div className="image-focus">
                      <img src={slide.image} alt={slide.title} className="focus-image" />
                      
                      {/* Efeito de brilho sutil */}
                      <div className="image-light"></div>
                      
                      {/* Overlay minimalista */}
                      <div className="image-fade"></div>
                      
                      {/* Ícone flutuante */}
                      <div className="floating-badge">
                        <div className="badge-icon">
                          <i className={slide.icon}></i>
                        </div>
                      </div>

                      {/* Efeito de ondas no clique */}
                      <div className="click-ripple"></div>
                    </div>

                    {/* Conteúdo sobreposto minimalista - Mantendo a linha azul do primeiro código */}
                    <div className="content-minimal">
                      <div className="minimal-header">
                        <h3 className="slide-title">
                          {slide.title}
                        </h3>
                        <div className="title-accent"></div>
                      </div>
                      
                      <p className="slide-description">
                        {slide.description}
                      </p>
                    </div>

                    {/* Navegação ultra discreta */}
                    <div className="minimal-nav">
                      <div className="nav-line-top"></div>
                      <div className="nav-dots-minimal">
                        {slides.map((_, idx) => (
                          <button
                            key={idx}
                            className={`minimal-dot ${currentSlide === idx ? 'active' : ''}`}
                            onClick={() => goToSlide(idx)}
                          >
                            <span className="minimal-dot-inner"></span>
                          </button>
                        ))}
                      </div>
                      <div className="nav-line-bottom"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NOVA SEÇÃO COM IMAGENS E TEXTO - CENTRALIZADA NA PÁGINA */}
        <div className="image-text-section scroll-reveal scroll-reveal-delay-3">
          {/* Primeiro item - Imagem à esquerda, texto à direita */}
          <div className="image-text-item left-image">
            <div className="image-container">
              <div className="image-wrapper">
                <img 
                  src={complementaryImages[0].image} 
                  alt={complementaryImages[0].alt}
                  className="content-image"
                />
                <div className="image-overlay"></div>
                <div className="image-badge">
                  <i className="fas fa-cogs"></i>
                </div>
              </div>
            </div>
            
            <div className="text-container">
              <div className="text-header">
                <h3 className="content-title">
                  Engenharia Mecânica Aplicada
                </h3>
                <div className="content-subtitle">
                  <span className="subtitle-line"></span>
                  <span className="subtitle-text">Precisão e Inovação</span>
                </div>
              </div>
              
              <p className="content-text">
                Desenvolvimento de projetos mecânicos sob medida, fundamentados em critérios técnicos 
                rigorosos, normas industriais e boas práticas de engenharia. As soluções são projetadas 
                para maximizar eficiência operacional, resistência estrutural e confiabilidade, 
                garantindo integração precisa com sistemas existentes e desempenho consistente mesmo 
                em ambientes industriais exigentes.
              </p>
              
              <div className="text-features">
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Projetos customizados</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Normas industriais</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Alta resistência</span>
                </div>
              </div>
            </div>
          </div>

          {/* Segundo item - Texto à esquerda, imagem à direita */}
          <div className="image-text-item right-image">
            <div className="text-container">
              <div className="text-header">
                <h3 className="content-title">
                  Sistemas Inteligentes de Conectividade Industrial
                </h3>
                <div className="content-subtitle">
                  <span className="subtitle-line"></span>
                  <span className="subtitle-text">IoT e Automação</span>
                </div>
              </div>
              
              <p className="content-text">
                Implementação de soluções IoT voltadas à integração entre ativos físicos e 
                plataformas digitais, possibilitando comunicação máquina-a-máquina (M2M), coleta e 
                análise de dados em tempo real e integração com sistemas locais ou em nuvem. As 
                aplicações são orientadas à automação, rastreabilidade e tomada de decisão estratégica, 
                elevando o nível de controle, produtividade e competitividade dos processos industriais.
              </p>
              
              <div className="text-features">
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>IoT Industrial</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Dados em tempo real</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Automação avançada</span>
                </div>
              </div>
            </div>
            
            <div className="image-container">
              <div className="image-wrapper">
                <img 
                  src={complementaryImages[1].image} 
                  alt={complementaryImages[1].alt}
                  className="content-image"
                />
                <div className="image-overlay"></div>
                <div className="image-badge">
                  <i className="fas fa-network-wired"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Container principal - Fundo neutro */
        .ferramentaria-section {
          padding: 120px 20px 50px 20px;
          background: #01071A;
          min-height: 90vh;
          display: flex;
          align-items: flex-start;
          position: relative;
          overflow: hidden;
        }

        /* Luz do centro */
        .ferramentaria-section::before {
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

        /* Segunda camada da luz do centro com blur */
        .ferramentaria-section::after {
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

        /* Container das partículas tecnológicas */
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
        .tech-particle {
          position: absolute !important;
          width: 4px !important;
          height: 4px !important;
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

        /* Animação de flutuação das partículas */
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

        @keyframes techFloat {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(100px, -100px);
          }
        }

        /* Partículas interativas que seguem o mouse */
        .interactive-particle {
          position: absolute;
          width: 12px;
          height: 12px;
          background: rgba(0, 184, 255, 0) !important;
          border: 1px solid rgba(0, 184, 255, 0.3);
          border-radius: 50%;
          pointer-events: none;
          z-index: 5;
          transition: all 0.3s ease;
          opacity: 0;
        }

        /* Efeito de brilho nas partículas */
        .interactive-particle::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(0, 184, 255, 0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .slide-panel:hover .interactive-particle::before {
          animation: particlePulse 2s infinite;
        }

        @keyframes particlePulse {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        /* Efeito de conexão entre partículas */
        .slide-panel:hover::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(0, 184, 255, 0.05) 0%,
            transparent 50%
          );
          pointer-events: none;
          z-index: 4;
          transition: all 0.3s ease;
        }

        /* Efeito sutil no slide quando mouse está sobre */
        .slide-panel:hover .slide-card {
          box-shadow: 
            0 0 0 1px rgba(0, 184, 255, 0.1),
            0 20px 40px rgba(0, 184, 255, 0.05);
        }

        /* Transição suave para as partículas */
        .slide-panel {
          position: relative;
          overflow: hidden;
        }

        /* Efeito de rastro nas partículas */
        @keyframes particleTrail {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .interactive-particle::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border: 1px solid rgba(0, 184, 255, 0.2);
          border-radius: 50%;
          animation: particleTrail 1.5s infinite;
        }

        /* Animação de clique no slide */
        .click-animation .slide-card {
          animation: clickBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes clickBounce {
          0% {
            transform: perspective(1000px) scale(1);
          }
          30% {
            transform: perspective(1000px) scale(0.95);
          }
          70% {
            transform: perspective(1000px) scale(1.05);
          }
          100% {
            transform: perspective(1000px) scale(1);
          }
        }

        /* Efeito de ondas no clique */
        .click-ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,184,255,0.2) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 3;
          opacity: 0;
        }

        .click-animation .click-ripple {
          animation: rippleEffect 0.8s ease-out;
        }

        @keyframes rippleEffect {
          0% {
            width: 0;
            height: 0;
            opacity: 0.5;
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }

        /* Animação de entrada dos slides */
        .slide {
          display: none;
          opacity: 0;
          transform: translateX(20px) scale(0.98);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slide.active {
          display: block;
          opacity: 1;
          transform: translateX(0) scale(1);
          animation: slideEnter 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideEnter {
          0% {
            opacity: 0;
            transform: translateX(40px) scale(0.95);
          }
          60% {
            transform: translateX(0) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        /* Card minimalista com animações */
        .slide-card {
          position: relative;
          width: 100%;
          height: 480px;
          border-radius: 20px;
          overflow: hidden;
          background: #000;
          transform-style: preserve-3d;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          backface-visibility: hidden;
        }

        /* Efeito de brilho que segue o mouse */
        .mouse-glow {
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(0,184,255,0.3) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 2;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.3s ease;
          filter: blur(40px);
        }

        /* Efeito de profundidade nos elementos do card */
        .slide-card > * {
          transform-style: preserve-3d;
        }

        /* Efeito de flutuação no badge */
        .floating-badge {
          position: absolute;
          top: 30px;
          right: 30px;
          z-index: 3;
          animation: floatBadge 3s ease-in-out infinite;
        }

        @keyframes floatBadge {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        /* Animação do badge ao passar mouse */
        .floating-badge:hover .badge-icon {
          animation: badgeSpin 0.6s ease;
          transform: scale(1.1);
        }

        @keyframes badgeSpin {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          100% {
            transform: rotate(360deg) scale(1.1);
          }
        }

        /* Imagem em foco com efeito de zoom suave */
        .image-focus {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          overflow: hidden;
        }

        .focus-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.9) contrast(1.1);
          transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1), filter 0.6s ease;
          will-change: transform;
        }

        .slide-card:hover .focus-image {
          transform: scale(1.03);
          filter: brightness(1) contrast(1.2);
        }

        /* Efeito de brilho que varre a imagem */
        .image-light {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 40%,
            rgba(255, 255, 255, 0.02) 50%,
            transparent 60%
          );
          animation: lightSweep 6s infinite linear;
          pointer-events: none;
          z-index: 2;
        }

        @keyframes lightSweep {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }

        /* Overlay com animação de entrada */
        .image-fade {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.4) 0%,
            transparent 30%,
            transparent 70%,
            rgba(0, 0, 0, 0.6) 100%
          );
          z-index: 2;
          animation: fadeIn 1s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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

        /* Container principal */
        .container {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 2;
        }

        /* Header minimalista - DO PRIMEIRO CÓDIGO */
        .section-header {
          text-align: center;
          margin-bottom: 70px;
          position: relative;
        }

        .section-header h2 {
          font-family: 'Quicksand', sans-serif;
          font-size: 2.8rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 20px;
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease 0.2s forwards;
        }

        .section-subtitle {
          font-size: 1.365rem;
          color: #b0e0ff;
          line-height: 1.7;
          max-width: 800px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease 0.4s forwards;
        }

        /* Layout da galeria - DO PRIMEIRO CÓDIGO */
        .gallery-wrapper {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 40px;
          align-items: start;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease 0.6s forwards;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Miniaturas minimalistas - DO PRIMEIRO CÓDIGO */
        .thumbnails-panel {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .thumbnail-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          text-align: left;
          position: relative;
          opacity: 0.4;
          transition: all 0.3s ease;
        }

        .thumbnail-btn:hover {
          opacity: 0.7;
        }

        .thumbnail-btn.active {
          opacity: 1;
        }

        .thumbnail-simple {
          width: 100%;
          height: 85px;
          position: relative;
          margin-bottom: 8px;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
        }

        .thumbnail-simple img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.6s ease;
          filter: grayscale(0.8) contrast(1.1);
        }

        .thumbnail-btn:hover .thumbnail-simple img {
          transform: scale(1.05);
          filter: grayscale(0.5) contrast(1.2);
        }

        .thumbnail-btn.active .thumbnail-simple img {
          filter: grayscale(0) contrast(1.3);
        }

        .thumbnail-hover {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(0, 184, 255, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .thumbnail-btn.active .thumbnail-hover {
          opacity: 0.3;
        }

        .thumbnail-label {
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
          font-size: 0.85rem;
          display: block;
          margin-bottom: 6px;
          padding-left: 8px;
          letter-spacing: 1px;
        }

        .thumbnail-line {
          height: 1px;
          width: 0;
          background: #00B8FF;
          transition: width 0.4s ease;
          margin-left: 8px;
        }

        .thumbnail-btn.active .thumbnail-line {
          width: 30px;
        }

        /* Slide principal */
        .slide-panel {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .slide-container {
          position: relative;
          width: 100%;
        }

        /* Conteúdo com animação de entrada */
        .content-minimal {
          position: absolute;
          bottom: 35px;
          left: 35px;
          z-index: 3;
          max-width: 450px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transform: translateY(20px);
          opacity: 0;
          animation: contentSlideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
        }
        
        @media (max-width: 768px) {
          .minimal-nav {
            display: none !important;
          }
          
          .slide.active .content-minimal {
            opacity: 1 !important;
            transform: translateY(0) !important;
            animation: none !important;
            transition: opacity 0.2s ease !important;
          }
          
          .slide:not(.active) .content-minimal {
            opacity: 0 !important;
            display: none !important;
          }
        }

        @keyframes contentSlideUp {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Cabeçalho minimalista - DO PRIMEIRO CÓDIGO */
        .minimal-header {
          margin-bottom: 20px;
        }

        .slide-title {
          font-family: 'Inter', sans-serif;
          font-size: 2.4rem;
          font-weight: 700;
          color: white;
          margin: 0 0 10px 0;
          line-height: 1.1;
          letter-spacing: -1px;
          position: relative;
          overflow: hidden;
        }

        .slide.active .slide-title::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #00B8FF;
          animation: typeWriter 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
          transform-origin: left;
        }

        @keyframes typeWriter {
          to {
            transform: scaleX(0);
          }
        }

        /* Linha azul - DO PRIMEIRO CÓDIGO */
        .title-accent {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #00B8FF, transparent);
          border-radius: 2px;
        }

        /* Descrição com efeito de fade in */
        .slide-description {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.155rem;
          line-height: 1.5;
          margin: 0;
          font-weight: 300;
          opacity: 0;
          transform: translateY(10px);
          animation: fadeUp 0.6s ease 0.8s forwards;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Navegação com efeito de entrada */
        .minimal-nav {
          position: absolute;
          bottom: 30px;
          right: 30px;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0;
          animation: fadeIn 0.6s ease 1s forwards;
        }
        
        @media (max-width: 768px) {
          .minimal-nav {
            display: none !important;
          }
        }

        .nav-line-top,
        .nav-line-bottom {
          width: 1px;
          height: 20px;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2), transparent);
        }

        .nav-dots-minimal {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Botões de navegação com efeito hover */
        .minimal-dot {
          width: 10px;
          height: 10px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .minimal-dot:hover:not(.active) {
          transform: scale(1.5);
        }

        .minimal-dot:hover .minimal-dot-inner {
          background: rgba(255, 255, 255, 0.6);
        }

        .minimal-dot.active {
          animation: dotPulse 2s infinite;
        }

        @keyframes dotPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }

        .minimal-dot-inner {
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .minimal-dot.active .minimal-dot-inner {
          background: #00B8FF;
          box-shadow: 0 0 10px rgba(0, 184, 255, 0.5);
          animation: innerPulse 2s infinite;
        }

        @keyframes innerPulse {
          0%, 100% {
            box-shadow: 0 0 10px rgba(0, 184, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 184, 255, 0.8);
          }
        }

        /* Badge - Mantendo do segundo código mas com ícone do primeiro */
        .badge-icon {
          width: 50px;
          height: 50px;
          background: rgba(0, 184, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 184, 255, 0.3);
          position: relative;
          overflow: hidden;
        }

        .badge-icon::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(0, 184, 255, 0.1), transparent);
          transform: translateX(-100%);
          animation: badgeShine 3s infinite;
        }

        @keyframes badgeShine {
          100% { transform: translateX(100%); }
        }

        .badge-icon i {
          font-size: 1.5rem;
          color: #00B8FF;
        }

        /* Efeitos de borda no card - Combinado */
        .slide-card::before {
          content: '';
          position: absolute;
          top: 1px;
          left: 1px;
          right: 1px;
          bottom: 1px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 19px;
          pointer-events: none;
          z-index: 1;
          animation: borderGlow 3s infinite;
        }

        @keyframes borderGlow {
          0%, 100% {
            border-color: rgba(255, 255, 255, 0.05);
            box-shadow: 0 0 0 rgba(0, 184, 255, 0);
          }
          50% {
            border-color: rgba(0, 184, 255, 0.2);
            box-shadow: 0 0 20px rgba(0, 184, 255, 0.1);
          }
        }

        /* NOVA SEÇÃO COMPLEMENTAR */
        /* NOVA SEÇÃO COM IMAGENS E TEXTO - CENTRALIZADA NA PÁGINA */
        .image-text-section {
          margin-top: 80px;
          padding-top: 40px;
          padding-left: 20px;
          padding-right: 20px;
          position: relative;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease 1.2s forwards;
          width: 100%;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
        }

        /* Separador decorativo */
        .section-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 60px;
          margin-left: 0;
          margin-right: 0;
          position: relative;
          width: 100%;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(0, 184, 255, 0.3), 
            rgba(0, 184, 255, 0.6), 
            rgba(0, 184, 255, 0.3), 
            transparent
          );
        }

        .divider-icon {
          width: 50px;
          height: 50px;
          margin: 0 30px;
          background: rgba(0, 184, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(0, 184, 255, 0.2);
          animation: rotateIcon 4s linear infinite;
          position: relative;
          overflow: hidden;
        }

        .divider-icon::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, 
            transparent, 
            rgba(0, 184, 255, 0.2), 
            transparent
          );
          animation: shineEffect 3s ease-in-out infinite;
        }

        .divider-icon i {
          color: #00B8FF;
          font-size: 1.2rem;
          position: relative;
          z-index: 1;
        }

        @keyframes rotateIcon {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes shineEffect {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }

        /* Itens de imagem e texto */
        .image-text-item {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
          margin-bottom: 80px;
          margin-left: 0;
          margin-right: 0;
          position: relative;
          opacity: 0;
          transform: translateY(30px);
          animation: slideInUp 0.8s ease forwards;
          width: 100%;
        }

        .image-text-item.left-image {
          animation-delay: 1.4s;
        }

        .image-text-item.right-image {
          animation-delay: 1.6s;
        }

        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Container de imagem */
        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          height: 400px;
          width: 100%;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 20px;
        }

        .content-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
          filter: brightness(0.9) contrast(1.1);
        }

        .image-wrapper:hover .content-image {
          transform: scale(1.05);
          filter: brightness(1) contrast(1.2);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 184, 255, 0.1) 100%
          );
          mix-blend-mode: overlay;
          opacity: 0.6;
          transition: opacity 0.4s ease;
        }

        .image-wrapper:hover .image-overlay {
          opacity: 0.8;
        }

        .image-badge {
          position: absolute;
          top: 25px;
          right: 25px;
          width: 60px;
          height: 60px;
          background: rgba(0, 184, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(0, 184, 255, 0.3);
          z-index: 2;
          animation: pulseBadge 2s infinite;
        }

        .image-badge i {
          font-size: 1.8rem;
          color: #00B8FF;
        }

        @keyframes pulseBadge {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(0, 184, 255, 0);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 30px rgba(0, 184, 255, 0.3);
          }
        }

        /* Container de texto */
        .text-container {
          padding: 30px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .text-header {
          margin-bottom: 25px;
        }

        .content-title {
          font-family: 'Quicksand', sans-serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 15px;
          line-height: 1.2;
          position: relative;
          display: block;
          text-align: left;
        }

        .content-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #00B8FF, transparent);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image-text-item:hover .content-title::after {
          transform: scaleX(1);
        }

        .content-subtitle {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .subtitle-line {
          width: 30px;
          height: 2px;
          background: rgba(0, 184, 255, 0.5);
          border-radius: 1px;
        }

        .subtitle-text {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #00B8FF;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .content-text {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 30px;
          font-weight: 300;
          text-align: left;
        }

        /* Lista de características */
        .text-features {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 25px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          transition: transform 0.3s ease;
        }

        .feature-item:hover {
          transform: translateX(5px);
        }

        .feature-item i {
          color: #00B8FF;
          font-size: 1rem;
          animation: checkPulse 2s infinite;
        }

        @keyframes checkPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        .feature-item span {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 400;
        }

        /* Efeitos decorativos nos containers */
        .text-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 184, 255, 0.05),
            transparent
          );
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }

        .text-container:hover::before {
          opacity: 1;
        }

        /* Responsividade */
        @media (max-width: 1200px) {
          .gallery-wrapper {
            grid-template-columns: 140px 1fr;
            gap: 40px;
          }
          
          .slide-card {
            height: 430px;
          }
          
          .content-minimal {
            bottom: 30px;
            left: 30px;
            padding: 22px;
            max-width: 400px;
          }
          
          .slide-title {
            font-size: 2rem;
          }
          
          .image-text-item {
            gap: 40px;
            margin-bottom: 60px;
          }
          
          .image-container {
            height: 350px;
          }
          
          .content-title {
            font-size: 2rem;
          }
          
          .content-text {
            font-size: 1.05rem;
          }
        }

        @media (max-width: 1024px) {
          .section-header h2 {
            font-size: 2.24rem;
          }
          
          .slide-card {
            height: 400px;
          }
          
          .content-minimal {
            max-width: 400px;
          }
          
          .slide-title {
            font-size: 2.2rem;
          }
          
          .slide-description {
            font-size: 1rem;
          }
          
          .badge-icon {
            width: 45px;
            height: 45px;
          }
          
          .badge-icon i {
            font-size: 1.3rem;
          }
          
          .image-text-section {
            margin-top: 60px;
          }
          
          .image-text-item {
            gap: 30px;
          }
          
          .image-container {
            height: 320px;
          }
          
          .content-title {
            font-size: 1.8rem;
          }
          
          .content-text {
            font-size: 1rem;
          }
          
          .image-badge {
            width: 50px;
            height: 50px;
          }
          
          .image-badge i {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .ferramentaria-section {
            padding: 120px 15px 40px 15px !important;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            padding-top: 120px !important;
          }
          
          .gallery-wrapper {
            grid-template-columns: 1fr;
            gap: 20px;
            display: flex;
            flex-direction: column;
          }
          
          .thumbnails-panel {
            position: relative;
            top: 0;
            flex-direction: row;
            overflow-x: hidden;
            padding-bottom: 10px;
            gap: 8px;
            order: 1;
            width: 100%;
            justify-content: center;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            margin-top: 15px !important;
          }
          
          .thumbnails-panel::-webkit-scrollbar {
            height: 4px;
          }
          
          .thumbnails-panel::-webkit-scrollbar-thumb {
            background: rgba(0, 184, 255, 0.3);
            border-radius: 2px;
          }
          
          .thumbnail-btn {
            min-width: calc((100% - 24px) / 4);
            max-width: calc((100% - 24px) / 4);
            flex-shrink: 0;
            padding: 0;
            flex: 1;
          }
          
          .thumbnail-simple {
            height: 50px;
            margin-bottom: 4px;
          }
          
          .thumbnail-label {
            font-size: 0.6rem;
            margin-bottom: 2px;
            padding-left: 4px;
          }
          
          .thumbnail-line {
            margin-left: 4px;
          }
          
          .section-header {
            text-align: center;
            padding: 0 10px;
            margin-bottom: 20px !important;
          }
          
          .section-header h2 {
            font-size: 1.6rem;
            text-align: center;
            line-height: 1.2;
            margin-bottom: 5px !important;
          }
          
          .section-subtitle {
            font-size: 0.95rem;
            text-align: center;
            padding: 0 5px;
            line-height: 1.6;
            margin-bottom: 0 !important;
          }
          
          .slide-panel {
            order: 2;
            width: 100%;
          }
          
          .slide-card {
            height: auto;
            min-height: 350px;
            max-height: 450px;
            aspect-ratio: 16/9;
            width: 100%;
            position: relative;
            overflow: hidden;
          }
          
          .image-focus {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          
          .focus-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }
          
          .slide-container {
            width: 100%;
            position: relative;
          }
          
          .slide {
            width: 100%;
            position: relative;
          }
          
          .content-minimal {
            bottom: 20px;
            left: 20px;
            right: 20px;
            max-width: none;
            padding: 15px;
            position: absolute;
            animation: none !important;
            transition: opacity 0.2s ease !important;
          }
          
          .slide.active .content-minimal {
            opacity: 1 !important;
            transform: translateY(0) !important;
            animation: none !important;
            display: block !important;
          }
          
          .slide:not(.active) .content-minimal {
            opacity: 0 !important;
            display: none !important;
          }
          
          .minimal-nav {
            display: none !important;
          }
          
          .floating-badge {
            top: 15px;
            right: 15px;
            width: 35px;
            height: 35px;
          }
          
          .badge-icon {
            width: 35px;
            height: 35px;
          }
          
          .badge-icon i {
            font-size: 1rem;
          }
          
          .slide-title {
            font-size: 1rem;
            margin-bottom: 5px;
            line-height: 1.2;
          }
          
          .slide-description {
            font-size: 0.7rem;
            line-height: 1.3;
          }
          
          /* Responsividade para seção de imagem e texto em mobile */
          .image-text-section {
            margin-top: 40px;
            padding-top: 30px;
            opacity: 1 !important;
            transform: translateY(0) !important;
            animation: none !important;
          }
          
          .section-divider {
            margin-bottom: 40px;
          }
          
          .divider-icon {
            width: 40px;
            height: 40px;
            margin: 0 20px;
          }
          
          .divider-icon i {
            font-size: 1rem;
          }
          
          .image-text-item {
            grid-template-columns: 1fr;
            gap: 30px;
            margin-bottom: 50px;
            opacity: 1 !important;
            transform: translateY(0) !important;
            animation: none !important;
          }
          
          .right-image {
            flex-direction: column-reverse;
          }
          
          .image-container {
            height: 250px;
            order: 1;
          }
          
          .text-container {
            padding: 20px;
            order: 2;
          }
          
          .content-title {
            font-size: 1.5rem;
            margin-bottom: 12px;
          }
          
          .content-title::after {
            display: none;
          }
          
          .content-subtitle {
            margin-bottom: 15px;
          }
          
          .subtitle-text {
            font-size: 0.9rem;
          }
          
          .content-text {
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 20px;
            text-align: left;
          }
          
          .image-badge {
            width: 45px;
            height: 45px;
            top: 15px;
            right: 15px;
          }
          
          .image-badge i {
            font-size: 1.3rem;
          }
          
          .text-features {
            margin-top: 20px;
            gap: 12px;
          }
          
          .feature-item span {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .ferramentaria-section {
            padding: 100px 12px 30px 12px !important;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            padding-top: 100px !important;
          }
          
          .section-header {
            padding: 0 5px;
            margin-bottom: 15px !important;
          }
          
          .section-header h2 {
            font-size: 1.36rem;
            text-align: center;
            line-height: 1.2;
            margin-bottom: 5px !important;
          }
          
          .section-subtitle {
            font-size: 0.85rem;
            text-align: center;
            padding: 0;
            line-height: 1.6;
            margin-bottom: 0 !important;
          }
          
          .thumbnails-panel {
            gap: 6px;
            padding-bottom: 8px;
            overflow-x: hidden;
            justify-content: center;
            margin-top: 12px !important;
          }
          
          .thumbnail-btn {
            min-width: calc((100% - 18px) / 4);
            max-width: calc((100% - 18px) / 4);
            flex: 1;
          }
          
          .thumbnail-simple {
            height: 45px;
            margin-bottom: 3px;
          }
          
          .thumbnail-label {
            font-size: 0.55rem;
            margin-bottom: 2px;
            padding-left: 3px;
          }
          
          .thumbnail-line {
            margin-left: 3px;
          }
          
          .slide-card {
            height: auto;
            min-height: 300px;
            max-height: 400px;
            aspect-ratio: 16/9;
            width: 100%;
            position: relative;
            overflow: hidden;
          }
          
          .image-focus {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          
          .focus-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }
          
          .content-minimal {
            bottom: 15px;
            left: 15px;
            right: 15px;
            padding: 12px;
            opacity: 1 !important;
            transform: translateY(0) !important;
            animation: none !important;
          }
          
          .slide.active .content-minimal {
            opacity: 1 !important;
            transform: translateY(0) !important;
            animation: none !important;
            display: block !important;
          }
          
          .slide:not(.active) .content-minimal {
            opacity: 0 !important;
            display: none !important;
          }
          
          .minimal-nav {
            display: none !important;
          }
          
          .badge-icon {
            width: 40px;
            height: 40px;
          }
          
          .badge-icon i {
            font-size: 1.2rem;
          }
          
          .slide-title {
            font-size: 0.9rem;
            margin-bottom: 4px;
            line-height: 1.2;
          }
          
          .slide-description {
            font-size: 0.65rem;
            line-height: 1.3;
          }
          
          .minimal-nav {
            bottom: 20px;
            right: 20px;
          }
          
          /* Responsividade para seção de imagem e texto em mobile pequeno */
          .image-text-section {
            margin-top: 30px;
            padding-top: 25px;
          }
          
          .divider-icon {
            width: 35px;
            height: 35px;
            margin: 0 15px;
          }
          
          .divider-icon i {
            font-size: 0.9rem;
          }
          
          .image-text-item {
            margin-bottom: 40px;
            gap: 25px;
          }
          
          .image-container {
            height: 200px;
          }
          
          .text-container {
            padding: 15px;
          }
          
          .content-title {
            font-size: 1.3rem;
            margin-bottom: 10px;
          }
          
          .subtitle-text {
            font-size: 0.8rem;
          }
          
          .content-text {
            font-size: 0.85rem;
            line-height: 1.5;
            margin-bottom: 15px;
          }
          
          .image-badge {
            width: 40px;
            height: 40px;
          }
          
          .image-badge i {
            font-size: 1.2rem;
          }
          
          .text-features {
            gap: 10px;
          }
          
          .feature-item span {
            font-size: 0.85rem;
          }
        }

        /* Palavras-chave da ferramentaria */
      `}</style>
    </section>
  );
}