'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Servicos() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);
  const autoRotateRef = useRef<NodeJS.Timeout>();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const swipeOffset = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);
  const isTouchingRef = useRef<boolean>(false);
  const activeSlideRef = useRef<HTMLDivElement | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [notificationCardDismissed, setNotificationCardDismissed] = useState(false);

  // Converte hex para "r,g,b" (para uso em rgba no CSS)
  const hexToRgb = (hex: string): string => {
    const n = hex.replace('#', '');
    const r = parseInt(n.slice(0, 2), 16);
    const g = parseInt(n.slice(2, 4), 16);
    const b = parseInt(n.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  };

  // Dados dos serviços
  const services = [
    {
      id: 1,
      title: "Ferramentaria de Alto Padrão",
      description: "Soluções completas em robótica industrial, desde o projeto até a integração com sistemas produtivos.",
      image: "/imagens_carrossel/IMG_1.jpg",
      category: "Engenharia",
      features: [
        "Projetos de Alta Complexidade",
        "Precisão Mecânica Garantida",
        "Integração Rápida e Eficiente"
      ]
    },
    {
      id: 2,
      title: "Soluções em Robótica",
      description: "Sistemas robóticos avançados para automação industrial e aumento de produtividade.",
      image: "/imagens_carrossel/IMG_2.jpg",
      category: "Automação",
      features: [
        "Automação Escalável",
        "Performance e Velocidade",
        "Redução de Erros Operacionais"
      ]
    },
    {
      id: 3,
      title: "Segurança e Conformidade",
      description: "Implementação de sistemas de segurança e conformidade com normas técnicas internacionais.",
      image: "/imagens_carrossel/IMG_3.jpg",
      category: "Segurança",
      features: [
        "Atende Normas Internacionais",
        "Monitoramento e Redundância",
        "Redução de Riscos Operacionais"
      ]
    },
    {
      id: 4,
      title: "Desenvolvimento Completo",
      description: "Desenvolvimento local de protótipos eletrônicos em PCB's de até 6 camadas.",
      image: "/imagens_carrossel/IMG_4.jpg",
      category: "Eletrônica",
      features: [
        "Prototipagem Ágil",
        "Circuitos Otimizados",
        "Qualidade e Testes Rigorosos"
      ]
    }
  ];

  // DADOS DAS ESPECIALIDADES - TODAS AS 14 ÁREAS
  const especialidadesTecnicas = [
    {
      id: 1,
      icon: "fas fa-wrench",
      title: "Projetos Mecânicos Avançados",
      description: "Desenvolvimento de soluções mecânicas com precisão micrométrica e robustez estrutural.",
      technicalDetails: [
        "Análise por elementos finitos (FEA) com ANSYS/ABAQUS",
        "Tolerâncias dimensionais de ±0.005mm",
        "Seleção otimizada de materiais e tratamentos térmicos",
        "Protótipos funcionais com impressão 3D metálica",
        "Documentação técnica completa (GD&T)"
      ],
      color: "#0EA5E9",
      applications: ["Equipamentos industriais", "Sistemas de automação", "Robótica colaborativa"]
    },
    {
      id: 2,
      icon: "fas fa-microchip",
      title: "Sistemas Embarcados de Alta Performance",
      description: "Firmware e hardware para aplicações críticas em tempo real.",
      technicalDetails: [
        "Programação em C/C++ para microcontroladores ARM Cortex",
        "Sistemas RTOS (FreeRTOS, Zephyr) com determinismo temporal",
        "Protocolos industriais: Modbus TCP, EtherCAT, PROFINET",
        "Desenvolvimento de drivers para hardware customizado",
        "Otimização de consumo energético e gerenciamento térmico"
      ],
      color: "#EF4444",
      applications: ["Controle industrial", "Dispositivos IoT", "Sistemas de aquisição"]
    },
    {
      id: 3,
      icon: "fas fa-industry",
      title: "Arquitetura Indústria 4.0",
      description: "Transformação digital de processos com tecnologias emergentes.",
      technicalDetails: [
        "Implementação de IIoT com sensores inteligentes",
        "Integração de sistemas MES e ERP",
        "Digital Twins para simulação em tempo real",
        "Análise preditiva com machine learning",
        "Sistemas de rastreabilidade e blockchain"
      ],
      color: "#BF5AF2",
      applications: ["Fábricas inteligentes", "Logística 4.0", "Manutenção preditiva"]
    },
    {
      id: 4,
      icon: "fas fa-chart-line",
      title: "Sistemas de Supervisão e Controle",
      description: "Dashboards analíticos e sistemas SCADA personalizados.",
      technicalDetails: [
        "Desenvolvimento de interfaces HMI/SCADA",
        "Dashboards com Power BI e Tableau",
        "Coleta de dados OPC UA/DA",
        "Algoritmos de análise de OEE",
        "Sistemas de alarme com lógica fuzzy"
      ],
      color: "#F59E0B",
      applications: ["Salas de controle", "Monitoramento remoto", "Análise de produção"]
    },
    {
      id: 5,
      icon: "fas fa-eye",
      title: "Visão Computacional e IA Industrial",
      description: "Soluções avançadas de inspeção visual e análise inteligente.",
      technicalDetails: [
        "Algoritmos CNN para inspeção automática",
        "Processamento com OpenCV e CUDA",
        "Sistemas de visão 3D com structured light",
        "Integração TensorFlow/PyTorch em edge devices",
        "Detecção de anomalias em tempo real"
      ],
      color: "#FF375F",
      applications: ["Inspeção de qualidade", "Contagem automática", "Navegação AGV"]
    },
    {
      id: 6,
      icon: "fas fa-cogs",
      title: "Engenharia de Processos e Métodos",
      description: "Otimização de fluxos produtivos com metodologias Lean.",
      technicalDetails: [
        "Mapeamento de valor (Value Stream Mapping)",
        "Metodologias Lean Manufacturing e Six Sigma",
        "Simulação de processos com AnyLogic/FlexSim",
        "Estudos de tempo e movimento (MTM)",
        "Layout otimizado com restrições de espaço"
      ],
      color: "#32D74B",
      applications: ["Otimização de linha", "Balanceamento de produção", "Redução de waste"]
    },
    {
      id: 7,
      icon: "fas fa-tools",
      title: "Ferramentaria de Alta Precisão",
      description: "Desenvolvimento e fabricação de dispositivos, moldes e ferramentas industriais com altíssima precisão e confiabilidade.",
      technicalDetails: [
        "Usinagem CNC de alta precisão (3, 4 e 5 eixos)",
        "Fabricação de moldes, matrizes e dispositivos especiais",
        "Tolerâncias micrométricas e controle dimensional rigoroso",
        "Metrologia industrial e controle de qualidade",
        "Otimização de ciclos produtivos e redução de desperdícios"
      ],
      color: "#5AC8FA",
      applications: ["Usinagem CNC", "Ferramentaria", "Alta precisão"]
    },
    {
      id: 8,
      icon: "fas fa-bolt",
      title: "Engenharia de Eletrônica Aplicada",
      description: "Desenvolvimento de circuitos, sistemas eletrônicos e soluções embarcadas para aplicações industriais críticas.",
      technicalDetails: [
        "Projeto de hardware analógico e digital",
        "Desenvolvimento de PCBs multilayer",
        "Sistemas de controle eletrônico industrial",
        "Prototipagem e validação funcional",
        "Testes elétricos, térmicos e de confiabilidade"
      ],
      color: "#F472B6",
      applications: ["Eletrônica industrial", "Hardware", "PCBs"]
    },
    {
      id: 9,
      icon: "fas fa-microchip",
      title: "Prototipagem Eletrônica",
      description: "Criação rápida de protótipos eletrônicos funcionais para validação técnica e aceleração de desenvolvimento.",
      technicalDetails: [
        "Desenvolvimento de PCBs até 6 camadas",
        "Montagem SMD/THT e testes funcionais",
        "Integração com firmware embarcado",
        "Validação elétrica e térmica",
        "Produção piloto e escalonamento industrial"
      ],
      color: "#30D158",
      applications: ["Prototipagem", "Eletrônica", "Validação técnica"]
    },
    {
      id: 10,
      icon: "fas fa-shield-alt",
      title: "Implantação / Retrofit de Máquinas (NR12)",
      description: "Adequação de máquinas industriais às normas NR12, garantindo segurança, conformidade legal e modernização.",
      technicalDetails: [
        "Análise de risco e laudos técnicos",
        "Retrofit elétrico, mecânico e de automação",
        "Implementação de sistemas de segurança",
        "Documentação técnica e conformidade normativa",
        "Treinamento operacional e validação final"
      ],
      color: "#FF9F0A",
      applications: ["NR12", "Retrofit", "Segurança industrial"]
    },
    {
      id: 11,
      icon: "fas fa-robot",
      title: "Projeto e Integração Robótica",
      description: "Soluções completas em robótica industrial, desde o projeto até a integração em linhas produtivas automatizadas.",
      technicalDetails: [
        "Integração de robôs industriais e colaborativos",
        "Desenvolvimento de células automatizadas",
        "Simulação offline e validação de layout",
        "Visão computacional aplicada à robótica",
        "Comissionamento e otimização produtiva"
      ],
      color: "#AF52DE",
      applications: ["Robótica industrial", "Automação", "Integração"]
    },
    {
      id: 12,
      icon: "fas fa-brain",
      title: "Projetos de Processos para Indústria 4.0",
      description: "Digitalização e otimização de processos industriais com tecnologias avançadas e integração de dados.",
      technicalDetails: [
        "Integração de IoT, Big Data e MES",
        "Monitoramento produtivo em tempo real",
        "Análise de eficiência e produtividade",
        "Automação orientada por dados",
        "Transformação digital de operações industriais"
      ],
      color: "#40C8E0",
      applications: ["Indústria 4.0", "Digitalização", "Processos"]
    },
    {
      id: 13,
      icon: "fas fa-graduation-cap",
      title: "Treinamento Técnico e Capacitação",
      description: "Formação especializada para equipes técnicas, promovendo domínio prático e atualização tecnológica contínua.",
      technicalDetails: [
        "Capacitação em automação e manufatura",
        "Treinamentos técnicos práticos e aplicados",
        "Programas personalizados para empresas",
        "Atualização em tecnologias industriais emergentes",
        "Workshops avançados e certificações técnicas"
      ],
      color: "#FF2D55",
      applications: ["Treinamento técnico", "Capacitação", "Indústria"]
    },
    {
      id: 14,
      icon: "fas fa-sliders-h",
      title: "Projetos de Sistemas Paramétricos",
      description: "Desenvolvimento de sistemas inteligentes e configuráveis para automação, engenharia e modelagem digital avançada.",
      technicalDetails: [
        "Modelagem paramétrica avançada",
        "Geração automática de projetos",
        "Digitalização de fluxos analógicos",
        "Integração com CAD/PLM",
        "Configuradores industriais inteligentes"
      ],
      color: "#F472B6",
      applications: ["Sistemas paramétricos", "Engenharia digital", "Automação"]
    }
  ];

  // Dados para as 3 imagens da seção
  const sectionImages = [
    {
      src: "/imagens_areasdecompetencia/IMG_9705.jpg",
      alt: "Engenharia de Precisão",
      theme: "Precisão Micrométrica",
      description: "Equipamentos de medição com resolução sub-micrométrica"
    },
    {
      src: "/imagens_areasdecompetencia/IMG_9744.jpg",
      alt: "Automação Industrial",
      theme: "Automação Inteligente",
      description: "Células robóticas com sistemas de visão e IA"
    },
    {
      src: "/imagens_areasdecompetencia/Robo-colab2.jpg",
      alt: "Tecnologia Avançada",
      theme: "Robótica Colaborativa",
      description: "Cobots integrados com segurança avançada"
    }
  ];

  // Inicializar refs dos slides internos
  useEffect(() => {
    slideInnerRefs.current = slideInnerRefs.current.slice(0, services.length);
  }, [services.length]);

  // Detectar se é mobile apenas no cliente (evita mismatch SSR)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Auto rotate com intervalo
  useEffect(() => {
    if (isAutoRotating && !isAnimating) {
      autoRotateRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % services.length);
      }, 6000);
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isAutoRotating, isAnimating, services.length]);

  // Efeito de mouse 3D para inclinação
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!carouselRef.current || isAnimating) return;
      
      // Encontrar todos os slides ativos
      slideInnerRefs.current.forEach((slideInner: HTMLDivElement | null, index: number) => {
        if (!slideInner) return;
        
        const slideElement = slideInner.parentElement;
        if (!slideElement) return;
        
        const rect = slideElement.getBoundingClientRect();
        
        // Verificar se o mouse está sobre este slide
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          // Calcular posição relativa do mouse
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          
          // Aplicar efeito 3D - INVERTIDO para parecer que o slide se inclina PARA TRÁS
          apply3DEffect(slideInner, x, y);
        }
      });
    };

    const handleMouseLeave = () => {
      // Resetar efeito 3D em todos os slides
      slideInnerRefs.current.forEach(slideInner => {
        if (slideInner) {
          slideInner.style.transform = 'rotateY(0deg) rotateX(0deg)';
          slideInner.style.transition = 'transform 0.5s ease';
        }
      });
      
      // Resetar escala das imagens
      document.querySelectorAll('.slide-image-3d-lateral').forEach(img => {
        if (img instanceof HTMLElement) {
          img.style.transform = 'scale(1.03)';
        }
      });
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('mousemove', handleMouseMove);
      carousel.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('mousemove', handleMouseMove);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isAnimating]);

  // Função para aplicar efeito 3D similar ao do código HTML
  const apply3DEffect = (element: HTMLElement, mouseX: number, mouseY: number) => {
    // Inverter os valores para que o slide incline PARA TRÁS (como no exemplo)
    const rotateY = -mouseX * 15; // Inclinação lateral invertida
    const rotateX = mouseY * 10;  // Inclinação vertical invertida
    
    // Aplicar transformação 3D similar ao do código HTML
    element.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    element.style.transition = 'transform 0.1s ease-out';
    
    // Efeito na imagem dentro do slide
    const image = element.querySelector('.slide-image-3d-lateral');
    if (image instanceof HTMLElement) {
      image.style.transform = `scale(${1.03 + Math.abs(mouseX * 0.05) + Math.abs(mouseY * 0.03)})`;
    }
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Resetar animação de swipe
    resetSwipeAnimation();
    
    // Resetar efeito 3D em todos os slides
    slideInnerRefs.current.forEach(slideInner => {
      if (slideInner) {
        slideInner.style.transform = 'rotateY(0deg) rotateX(0deg)';
        slideInner.style.transition = 'transform 0.6s ease';
      }
    });
    
    setCurrentIndex(prev => (prev + 1) % services.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Resetar animação de swipe
    resetSwipeAnimation();
    
    // Resetar efeito 3D em todos os slides
    slideInnerRefs.current.forEach(slideInner => {
      if (slideInner) {
        slideInner.style.transform = 'rotateY(0deg) rotateX(0deg)';
        slideInner.style.transition = 'transform 0.6s ease';
      }
    });
    
    setCurrentIndex(prev => (prev - 1 + services.length) % services.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || currentIndex === index) return;
    setIsAnimating(true);
    
    // Resetar efeito 3D em todos os slides
    slideInnerRefs.current.forEach(slideInner => {
      if (slideInner) {
        slideInner.style.transform = 'rotateY(0deg) rotateX(0deg)';
        slideInner.style.transition = 'transform 0.8s ease';
      }
    });
    
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Funções para abrir/fechar card em modal
  const openModalCard = (cardId: number) => setExpandedCardId(cardId);
  const closeModalCard = () => {
    setExpandedCardId(null);
    setNotificationCardDismissed(false); // reexibir o card na próxima abertura
  };
  const closeNotificationOnly = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setNotificationCardDismissed(true);
  };

  // Encontra a especialidade expandida
  const expandedEspecialidade = expandedCardId 
    ? especialidadesTecnicas.find(e => e.id === expandedCardId)
    : null;

  // Efeito para fechar modal com ESC e bloquear scroll
  useEffect(() => {
    if (expandedCardId === null) {
      // Ao fechar: restaurar scroll do body de forma limpa (evita travamento no mobile/iOS)
      const restore = () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.documentElement.style.overflow = '';
      };
      requestAnimationFrame(restore);
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModalCard();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      document.body.style.position = '';
      requestAnimationFrame(() => {
        document.body.style.overflow = '';
      });
    };
  }, [expandedCardId]);

  // Reexibir o card de notificação ao abrir um novo modal
  useEffect(() => {
    if (expandedCardId != null) setNotificationCardDismissed(false);
  }, [expandedCardId]);

  // Ouvir evento do megamenu (Header): abrir o card da área de competência correspondente
  useEffect(() => {
    const handler = (e: Event) => {
      const { id } = (e as CustomEvent<{ id: number }>).detail;
      if (id >= 1 && id <= 14) setExpandedCardId(id);
    };
    window.addEventListener('openServicoCard', handler);
    return () => window.removeEventListener('openServicoCard', handler);
  }, []);

  // Scroll reveal: fade-in + blur ao entrar na viewport (igual à seção Início)
  useEffect(() => {
    const container = sectionRef.current;
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

  // touchmove com passive: false para permitir preventDefault no swipe horizontal
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const handleMove = (e: TouchEvent) => {
      if (typeof window === 'undefined' || window.innerWidth > 768) return;
      if (!isTouchingRef.current) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - touchStartX.current;
      const deltaY = Math.abs(currentY - (touchStartY.current ?? 0));
      const absDeltaX = Math.abs(deltaX);
      const minHorizontal = 30;
      const horizontalRatio = 1.5;
      if (absDeltaX > minHorizontal && absDeltaX > deltaY * horizontalRatio) {
        e.preventDefault();
        isSwiping.current = true;
        swipeOffset.current = deltaX;
        touchEndX.current = currentX;
        if (activeSlideRef.current) {
          const slide = activeSlideRef.current;
          const maxOffset = 300;
          const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
          slide.style.transform = `translateX(${clampedOffset}px)`;
          slide.style.transition = 'none';
          slide.style.opacity = `${1 - Math.abs(clampedOffset) / 400}`;
        }
      } else if (isSwiping.current) {
        e.preventDefault();
        swipeOffset.current = deltaX;
        touchEndX.current = currentX;
        if (activeSlideRef.current) {
          const slide = activeSlideRef.current;
          const maxOffset = 300;
          const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
          slide.style.transform = `translateX(${clampedOffset}px)`;
          slide.style.transition = 'none';
          slide.style.opacity = `${1 - Math.abs(clampedOffset) / 400}`;
        }
      }
    };
    el.addEventListener('touchmove', handleMove, { passive: false });
    return () => el.removeEventListener('touchmove', handleMove);
  }, []);

  // Handlers para swipe no mobile com animação visual
  const handleTouchStart = (e: React.TouchEvent) => {
    // Verificar se é mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    if (!isMobile) return;
    
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    swipeOffset.current = 0;
    isSwiping.current = false;
    isTouchingRef.current = true;
    setIsAutoRotating(false);
    
    // Encontrar o slide ativo
    const slides = carouselRef.current?.querySelectorAll('.carousel-slide-3d-lateral.active');
    if (slides && slides.length > 0) {
      activeSlideRef.current = slides[0] as HTMLDivElement;
    }
  };

  const handleTouchEnd = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    if (!isMobile) {
      isTouchingRef.current = false;
      resetSwipeAnimation();
      return;
    }
    if (!touchStartX.current) {
      isTouchingRef.current = false;
      resetSwipeAnimation();
      return;
    }
    
    isTouchingRef.current = false;
    if (!isSwiping.current) {
      resetSwipeAnimation();
      setIsAutoRotating(true);
      return;
    }
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    resetSwipeAnimation();

    // Resetar valores
    touchStartX.current = 0;
    touchEndX.current = 0;
    swipeOffset.current = 0;
    isSwiping.current = false;
    isTouchingRef.current = false;
    setIsAutoRotating(true);
  };

  // Resetar animação de swipe
  const resetSwipeAnimation = () => {
    if (activeSlideRef.current) {
      activeSlideRef.current.style.transform = '';
      activeSlideRef.current.style.transition = '';
      activeSlideRef.current.style.opacity = '';
    }
    activeSlideRef.current = null;
  };

  // Calcular posição 3D - Layout horizontal mais amplo
  const getSlideTransform = (index: number) => {
    const totalSlides = services.length;
    const angleStep = 360 / totalSlides;
    const angleOffset = (360 / totalSlides) * currentIndex;
    const currentAngle = (index * angleStep - angleOffset);
    
    // Converter para radianos
    const rad = (currentAngle * Math.PI) / 180;
    
    // Ajustar raio baseado no tamanho da tela
    const radius = isMobile ? 400 : 800;
    
    // Posição X e Z para layout circular
    const x = Math.sin(rad) * radius;
    const z = Math.cos(rad) * radius - radius;
    
    // Rotação para manter slides voltados para o centro
    const rotateY = -currentAngle;
    
    // Foco no slide atual - ajustar escala no mobile
    const scale = index === currentIndex ? 1 : (isMobile ? 0.5 : 0.6);
    const opacity = index === currentIndex ? 1 : (isMobile ? 0.2 : 0.3);
    const zIndex = index === currentIndex ? 100 : Math.abs(index - currentIndex);
    
    return {
      transform: `
        translate3d(${x}px, 0, ${z}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `,
      opacity,
      zIndex,
      filter: index === currentIndex ? 'none' : 'brightness(0.7)',
      pointerEvents: (index === currentIndex ? 'auto' : 'none') as 'auto' | 'none',
      background: 'transparent',
    };
  };

  return (
    <section id="servicos" className="servicos-3d-lateral" ref={sectionRef}>
      <div 
        className="tech-particles" 
        ref={particlesContainerRef} 
        id="tech-particles"
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 2 }}
      ></div>
      <div className="container-3d-lateral">
        <div className="section-header-3d-lateral scroll-reveal scroll-reveal-delay-1">
          <h2 className="title-3d-lateral">Áreas de Competência</h2>
          <p className="subtitle-3d-lateral">
            Soluções industriais avançadas com tecnologia de ponta e qualidade superior
          </p>
        </div>

        {/* Carrossel 3D – swipe horizontal no mobile; scroll vertical liberado quando gesto é vertical */}
        <div 
          className="carousel-3d-container-lateral scroll-reveal scroll-reveal-delay-2" 
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="carousel-3d-track-lateral">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`carousel-slide-3d-lateral ${index === currentIndex ? 'active' : ''}`}
                style={getSlideTransform(index)}
                onClick={() => goToSlide(index)}
              >
                {/* Container interno para o efeito 3D - ESTE É O SLIDE REAL */}
                <div 
                  className="slide-inner-3d"
                  ref={el => { slideInnerRefs.current[index] = el; }}
                >
                  {/* Layout horizontal: Imagem à esquerda, conteúdo à direita */}
                  <div className="slide-content-horizontal">
                    {/* Imagem à esquerda */}
                    <div className="slide-image-container-lateral">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="slide-image-3d-lateral"
                        loading="lazy"
                      />
                      
                      {/* Logo Delta */}
                      <div className="logo-delta-lateral">
                        <img src={index < 2 ? "/logos/logo-delta.png" : "/logos/logo-delta2.png"} alt="Delta Sollutions" />
                      </div>
                      
                      {/* Luzes nos cantos */}
                      <div className="corner-lights">
                        <div className="corner-light corner-tl"></div>
                        <div className="corner-light corner-tr"></div>
                        <div className="corner-light corner-bl"></div>
                        <div className="corner-light corner-br"></div>
                      </div>
                      
                      {/* Overlay de gradiente similar ao exemplo HTML */}
                      <div className="image-overlay-visionary"></div>
                      
                      {/* Título na imagem - apenas mobile */}
                      <div className="slide-title-on-image">
                        <h3 className="slide-title-lateral-image">{service.title}</h3>
                        <div className="title-divider"></div>
                      </div>
                    </div>
                    
                    {/* Card de conteúdo à direita */}
                    <div className="slide-card-lateral">
                      <div className="card-header mobile-hidden">
                        <h3 className="slide-title-lateral">{service.title}</h3>
                        <div className="title-divider"></div>
                      </div>
                      
                      <p className="slide-description-lateral">
                        {service.description}
                      </p>
                      
                      <div className="slide-features-lateral">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="feature-item-lateral">
                            <svg className="feature-check-lateral" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.9"/>
                              <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="feature-text-lateral">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="slide-actions">
                        <a href="https://api.whatsapp.com/send/?phone=5592984810094&text=Ol%C3%A1%21+Vim+do+site+da+Delta+e+gostaria+da+minha+consultoria+gratuita&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="cta-button-lateral">
                          <span>Saiba Mais</span>
                          <svg className="cta-arrow-lateral" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Efeito de borda no slide ativo */}
                  <div className="slide-border-lateral"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Linha central visual */}
          <div className="center-line-lateral"></div>
        </div>

        {/* Controles inferiores */}
        <div className="carousel-controls-lateral">
          <div className="controls-left">
            <button 
              onClick={prevSlide}
              className="control-btn-lateral prev-control"
              disabled={isAnimating}
              aria-label="Slide anterior"
            >
              <svg viewBox="0 0 24 24">
                <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>
          </div>

          <div className="controls-right">
            <button 
              onClick={nextSlide}
              className="control-btn-lateral next-control"
              disabled={isAnimating}
              aria-label="Próximo slide"
            >
              <svg viewBox="0 0 24 24">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>
          </div>
        </div>

        {/* NOVA SEÇÃO - ESPECIALIDADES COM 3 IMAGENS JUNTAS NO TOPO */}
        <div className="especialidades-unified-section">
          <div className="especialidades-unified-header scroll-reveal scroll-reveal-delay-1">
            <h2 className="especialidades-unified-title">
              Nossas Especialidades
            </h2>
            <p className="especialidades-unified-subtitle">
              Expertise técnica avançada combinada com infraestrutura de ponta para soluções integradas
            </p>
          </div>
          
          {/* BANNER DE 3 IMAGENS JUNTAS - SEMPRE JUNTAS, NÃO SEPARAM */}
          <div className="unified-images-banner">
            <div className="banner-images-container">
              {sectionImages.map((image, index) => (
                <div 
                  key={index} 
                  className="banner-image-wrapper scroll-reveal"
                  style={{ 
                    '--image-index': index,
                    transitionDelay: `${index * 0.15}s`
                  } as React.CSSProperties}
                >
                  <div className="banner-image-frame">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="banner-image"
                      loading="lazy"
                    />
                    <div className="banner-image-overlay"></div>
                    <div className="banner-image-content">
                      <div className="banner-image-theme">{image.theme}</div>
                      <div className="banner-image-description">{image.description}</div>
                    </div>
                    <div className="banner-image-glow"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="banner-connector-line"></div>
          </div>
          
          {/* CONTEÚDO DAS ESPECIALIDADES ABAIXO DAS IMAGENS */}
          <div className="especialidades-unified-content">
            <div className="unified-intro-text scroll-reveal">
              <p className="unified-intro">
                Combinamos <span className="highlight-text">engenharia de precisão</span>, 
                <span className="highlight-text"> automação inteligente</span> e 
                <span className="highlight-text"> tecnologias digitais</span> para criar 
                soluções industriais completas que otimizam processos, aumentam produtividade 
                e garantem qualidade superior em cada projeto.
              </p>
            </div>
            
            {/* GRID DE ESPECIALIDADES - CLIQUE ABRE MODAL */}
            <div className="unified-especialidades-grid">
              {especialidadesTecnicas.map((especialidade, index) => (
                <div 
                  key={especialidade.id}
                  id={`servico-card-${especialidade.id}`}
                  className="unified-especialidade-card collapsed scroll-reveal"
                  style={{ 
                    '--card-color': especialidade.color,
                    '--card-color-rgb': hexToRgb(especialidade.color),
                    '--card-index': index,
                    transitionDelay: `${index * 0.04}s`
                  } as React.CSSProperties}
                  onClick={() => openModalCard(especialidade.id)}
                >
                  <div className="collapsed-card-content">
                    <div className="collapsed-card-icon">
                      <div className="collapsed-icon-bg" style={{ backgroundColor: especialidade.color }}></div>
                      <i className={`${especialidade.icon} collapsed-icon`}></i>
                    </div>
                    <div className="collapsed-card-text">
                      <h3 className="collapsed-card-title">{especialidade.title}</h3>
                      <p className="collapsed-card-subtitle">
                        {especialidade.description.length > 80 
                          ? `${especialidade.description.substring(0, 80)}...` 
                          : especialidade.description}
                      </p>
                      <div className="collapsed-card-cta">
                        <span className="cta-text">Clique para detalhes</span>
                        <svg className="cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="unified-card-border" style={{ backgroundColor: especialidade.color }}></div>
                </div>
              ))}
            </div>

            {/* MODAL renderizado em document.body */}
            {expandedEspecialidade && typeof document !== 'undefined' && createPortal(
              <div className="especialidade-modal-portal-root">
                <div 
                  className="especialidade-modal-backdrop"
                  onClick={(e) => { if (e.target === e.currentTarget) closeModalCard(); }}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Detalhes da área de competência"
                >
                  {/* Modal centralizado */}
                  <div className="modal-center-container" onClick={(e) => e.stopPropagation()}>
                    <div 
                      className="especialidade-modal-box unified-especialidade-card expanded"
                      style={{ 
                        '--card-color': expandedEspecialidade.color,
                        '--card-color-rgb': hexToRgb(expandedEspecialidade.color)
                      } as React.CSSProperties}
                    >
                      <div className="expanded-card-content">
                        <button 
                          className="close-expanded-card"
                          onClick={(e) => { e.stopPropagation(); closeModalCard(); }}
                          aria-label="Fechar"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <div className="unified-card-content">
                          <div className="unified-card-header">
                            <div className="unified-icon-wrapper">
                              <div className="unified-icon-bg"></div>
                              <i className={`${expandedEspecialidade.icon} unified-icon`}></i>
                              <div className="unified-icon-ring"></div>
                            </div>
                            <div className="unified-title-wrapper">
                              <h3 className="unified-card-title">{expandedEspecialidade.title}</h3>
                              <div className="unified-title-underline"></div>
                            </div>
                          </div>
                          <p className="unified-card-description">{expandedEspecialidade.description}</p>
                          <div className="unified-technical-section">
                            <h4 className="unified-technical-title">
                              <span className="technical-title-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                  <polyline points="14 2 14 8 20 8"/>
                                  <line x1="16" y1="13" x2="8" y2="13"/>
                                  <line x1="16" y1="17" x2="8" y2="17"/>
                                  <polyline points="10 9 9 9 8 9"/>
                                </svg>
                              </span>
                              Especificações Técnicas
                            </h4>
                            <div className="unified-technical-list">
                              {expandedEspecialidade.technicalDetails.map((detail, idx) => (
                                <div key={idx} className="unified-technical-item">
                                  <div className="technical-item-marker">
                                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                                      <circle cx="3" cy="3" r="3" fill="currentColor"/>
                                    </svg>
                                  </div>
                                  <div className="technical-item-text">{detail}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="unified-applications">
                            <div className="applications-tags">
                              {expandedEspecialidade.applications.map((app, idx) => (
                                <span key={idx} className="application-tag">{app}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="unified-card-border" style={{ backgroundColor: expandedEspecialidade.color }}></div>
                    </div>
                  </div>

                  {/* Notificação fixa no canto inferior direito - fecha só a notificação, não o modal */}
                  {!notificationCardDismissed && (
                  <div className="notification-fixed-container" onClick={(e) => e.stopPropagation()}>
                    <div className="notification-card">
                      <div className="notification-header-bar"></div>
                      <div className="notification-content">
                        <div className="notification-icon-wrapper">
                          <div className="notification-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                            </svg>
                          </div>
                        </div>
                        <div className="notification-text">
                          <h4 className="notification-title">Pronto para automatizar com nossas soluções? </h4>
                          <p className="notification-message">
                            <span className="notification-highlight">Converse com a Delta Sollutions!</span>
                          </p>
                        </div>
                        <div className="notification-actions">
                          <a
                            href="https://api.whatsapp.com/send/?phone=5592984810094&text=Ol%C3%A1%21+Vim+do+site+da+Delta+e+gostaria+da+minha+consultoria+gratuita&type=phone_number&app_absent=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="notification-button"
                          >
                            <span className="button-icon">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                              </svg>
                            </span>
                            <span className="button-text">Iniciar Conversa</span>
                          </a>
                          <div className="notification-details">
                            <div className="detail-item">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 6v6l4 2"/>
                              </svg>
                              <span>15 min</span>
                            </div>
                            <div className="detail-item">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                              </svg>
                              <span>Gratuito</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button 
                        className="notification-close"
                        onClick={closeNotificationOnly}
                        aria-label="Fechar notificação"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6L18 18"/>
                        </svg>
                      </button>
                      <div className="notification-time">agora</div>
                    </div>
                  </div>
                  )}
                </div>
              </div>,
              document.body
            )}
            
          </div>
        </div>

      </div>

      <style jsx>{`
        /* Scroll reveal – fade-in + blur ao rolar (igual Início) */
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
        .scroll-reveal-delay-1 { transition-delay: 0.1s; }
        .scroll-reveal-delay-2 { transition-delay: 0.2s; }
        .scroll-reveal-delay-3 { transition-delay: 0.3s; }

        /* Container principal */
        .servicos-3d-lateral {
          padding: 50px 20px;
          background: #01071A;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        /* Luz do centro */
        .servicos-3d-lateral::before {
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
        .servicos-3d-lateral::after {
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

        .container-3d-lateral {
          max-width: 1600px;
          width: 100%;
          margin: 0 auto;
          margin-top: 70px;
          position: relative;
          z-index: 10;
        }

        /* Header */
        .section-header-3d-lateral {
          text-align: center;
          margin-bottom: 20px;
          position: relative;
          z-index: 10;
        }

        .title-3d-lateral {
          font-family: 'Quicksand', sans-serif;
          font-size: 2.8rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 15px;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease 0.2s forwards;
        }

        .subtitle-3d-lateral {
          color: #b0e0ff;
          font-size: 1.3rem;
          max-width: 700px;
          margin: 0 auto;
          opacity: 0;
          line-height: 1.6;
          transform: translateY(30px);
          animation: fadeInUp 1s ease 0.4s forwards;
        }

        /* Container do carrossel 3D */
        .carousel-3d-container-lateral {
          position: relative;
          width: 100%;
          height: 600px;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 2000px;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease 0.6s forwards;
        }

        /* Track do carrossel 3D */
        .carousel-3d-track-lateral {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: inherit;
        }

        /* Slides 3D individuais */
        .carousel-slide-3d-lateral {
          position: absolute;
          width: 900px;
          height: 500px;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          cursor: pointer;
          border-radius: 25px;
          overflow: visible;
          background: transparent;
          box-shadow: none;
        }

        .carousel-slide-3d-lateral.active {
          cursor: default;
          box-shadow: none;
        }

        /* Container interno para efeito 3D - ESTE É O SLIDE REAL */
        .slide-inner-3d {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
          will-change: transform;
          border-radius: 25px;
          overflow: hidden;
          background: transparent;
          position: relative;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.4);
        }

        .carousel-slide-3d-lateral.active .slide-inner-3d {
          box-shadow: 
            0 40px 80px rgba(0, 0, 0, 0.5);
        }

        /* Layout horizontal dentro do slide */
        .slide-content-horizontal {
          display: flex;
          width: 100%;
          height: 100%;
          position: relative;
          background: transparent;
        }

        /* Container da imagem (60% da largura) */
        .slide-image-container-lateral {
          flex: 0 0 60%;
          position: relative;
          overflow: hidden;
          background: #000;
        }

        .slide-image-3d-lateral {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
          transition: transform 0.6s ease;
          will-change: transform;
        }

        .carousel-slide-3d-lateral.active .slide-image-3d-lateral {
          transform: scale(1.03);
        }

        /* Overlay de gradiente similar ao exemplo HTML */
        .image-overlay-visionary {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            45deg,
            rgba(1, 7, 26, 0.8) 0%,
            rgba(0, 166, 255, 0.15) 50%,
            rgba(1, 7, 26, 0.4) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Luzes nos cantos */
        .corner-lights {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 3;
        }

        .corner-light {
          position: absolute;
          width: 50px;
          height: 50px;
          border: 2px solid rgba(0, 166, 255, 0.7);
          border-radius: 10px;
          filter: blur(2px);
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }

        .corner-tl {
          top: 20px;
          left: 20px;
          border-right: none;
          border-bottom: none;
        }

        .corner-tr {
          top: 20px;
          right: 20px;
          border-left: none;
          border-bottom: none;
        }

        .corner-bl {
          bottom: 20px;
          left: 20px;
          border-right: none;
          border-top: none;
        }

        .corner-br {
          bottom: 20px;
          right: 20px;
          border-left: none;
          border-top: none;
        }

        /* Logo Delta */
        .logo-delta-lateral {
          position: absolute;
          top: 10px;
          left: 10px;
          width: 108px;
          height: 108px;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
        }

        /* Título na imagem - escondido no desktop */
        .slide-title-on-image {
          display: none;
        }

        .logo-delta-lateral img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 1;
        }

        /* Card de conteúdo (40% da largura) */
        .slide-card-lateral {
          flex: 0 0 40%;
          padding: 40px;
          background: rgba(17, 34, 64, 0.98);
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .card-header {
          margin-bottom: 25px;
        }

        .slide-title-lateral {
          font-family: 'Quicksand', sans-serif;
          font-size: 2.2rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 15px;
          line-height: 1.2;
        }

        .title-divider {
          width: 120px;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            #00a6ff 20%, 
            #10dbff 50%, 
            #00a6ff 80%, 
            transparent 100%);
          border-radius: 1px;
          margin-top: 10px;
          position: relative;
          box-shadow: 
            0 0 8px rgba(0, 166, 255, 0.6),
            0 0 15px rgba(16, 219, 255, 0.4),
            0 0 25px rgba(0, 166, 255, 0.3);
          animation: lightPulse 2s ease-in-out infinite;
        }

        @keyframes lightPulse {
          0%, 100% {
            box-shadow: 
              0 0 8px rgba(0, 166, 255, 0.6),
              0 0 15px rgba(16, 219, 255, 0.4),
              0 0 25px rgba(0, 166, 255, 0.3);
            opacity: 1;
          }
          50% {
            box-shadow: 
              0 0 12px rgba(0, 166, 255, 0.8),
              0 0 25px rgba(16, 219, 255, 0.6),
              0 0 35px rgba(0, 166, 255, 0.5);
            opacity: 0.9;
          }
        }

        /* Descrição */
        .slide-description-lateral {
          color: #b0e0ff;
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 30px;
          opacity: 0.95;
        }

        /* Features com ticks */
        .slide-features-lateral {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 35px;
        }

        .feature-item-lateral {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .feature-check-lateral {
          width: 22px;
          height: 22px;
          color: #00a6ff;
          flex-shrink: 0;
          filter: drop-shadow(0 0 4px rgba(0, 166, 255, 0.5));
        }

        .feature-text-lateral {
          color: #ffffff;
          font-size: 1.05rem;
          font-weight: 500;
        }

        /* Ações do slide */
        .slide-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .cta-button-lateral {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          background: linear-gradient(135deg, #10dbff 0%, #0461b9 100%);
          color: #ffffff;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          width: fit-content;
          justify-content: center;
          font-family: 'Quicksand', sans-serif;
          isolation: isolate;
        }

        .cta-button-lateral::before {
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
          opacity: 0;
        }

        .cta-button-lateral:hover {
          transform: translateY(-8px) scale(1.08);
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(0, 0, 0, 0.4),
            0 0 60px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          background: linear-gradient(135deg, #20ebff 0%, #0570d9 100%);
        }

        .cta-button-lateral:hover::before {
          opacity: 1;
          animation: buttonShine 1s ease;
        }

        .cta-button-lateral:active {
          transform: translateY(-4px) scale(1.04);
        }

        .cta-button-lateral::before {
          z-index: 0;
          pointer-events: none;
        }

        .cta-button-lateral > * {
          position: relative;
          z-index: 10;
        }

        .cta-button-lateral span,
        .cta-button-lateral svg {
          position: relative;
          z-index: 10;
          display: inline-block;
        }

        .cta-arrow-lateral {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }

        .cta-button-lateral:hover .cta-arrow-lateral {
          transform: translateX(5px);
        }

        @keyframes buttonShine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        /* Borda do slide ativo */
        .slide-border-lateral {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border: none;
          border-radius: 27px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 5;
        }

        .carousel-slide-3d-lateral.active .slide-border-lateral {
          opacity: 0;
        }

        /* Linha central visual */
        .center-line-lateral {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(0, 166, 255, 0.2), transparent);
          z-index: -1;
        }

        /* Controles inferiores */
        .carousel-controls-lateral {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 600px;
          margin-bottom: 40px;
        }

        .controls-left,
        .controls-right {
          flex-shrink: 0;
        }

        .control-btn-lateral {
          width: auto;
          height: auto;
          background: transparent;
          border: none;
          border-radius: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00a6ff;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 10px;
        }

        .control-btn-lateral:hover:not(:disabled) {
          background: transparent;
          transform: scale(1.2);
          color: #10dbff;
        }

        .control-btn-lateral:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .control-btn-lateral svg {
          width: 40px;
          height: 40px;
        }

        /* ====== NOVA SEÇÃO UNIFICADA COM 3 IMAGENS JUNTAS NO TOPO ====== */
        .especialidades-unified-section {
          margin-top: 100px;
          padding: 0 0 80px;
          position: relative;
          z-index: 10;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease 0.8s forwards;
        }

        .especialidades-unified-header {
          text-align: center;
          margin-bottom: 60px;
          padding: 0 20px;
          position: relative;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .especialidades-unified-title {
          font-family: 'Quicksand', sans-serif;
          font-size: 2.8rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 25px;
          position: relative;
          display: inline-block;
        }

        .especialidades-unified-subtitle {
          color: #b0e0ff;
          font-size: 1.3rem;
          max-width: 700px;
          margin: 0 auto;
          opacity: 0;
          line-height: 1.6;
          transform: translateY(30px);
          animation: fadeInUp 1s ease 0.4s forwards;
        }

        /* BANNER DE 3 IMAGENS JUNTAS - NÃO SEPARAM */
        .unified-images-banner {
          max-width: 1400px;
          margin: 0 auto 80px;
          padding: 0 20px;
          position: relative;
        }

        .banner-images-container {
          display: flex;
          gap: 20px;
          position: relative;
          z-index: 2;
        }

        .banner-image-wrapper {
          flex: 1;
          min-width: 0;
          animation: bannerImageAppear 0.8s ease-out calc(var(--image-index) * 0.2s) forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes bannerImageAppear {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .banner-image-frame {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 166, 255, 0.1);
        }

        .banner-image-wrapper:hover .banner-image-frame {
          transform: translateY(-10px);
          border-color: rgba(0, 166, 255, 0.3);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.4),
            0 0 40px rgba(0, 166, 255, 0.15);
        }

        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.6s ease;
        }

        .banner-image-wrapper:hover .banner-image {
          transform: scale(1.05);
        }

        .banner-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(1, 7, 26, 0.7) 0%, rgba(0, 166, 255, 0.2) 100%);
          opacity: 0.6;
          transition: opacity 0.4s ease;
        }

        .banner-image-wrapper:hover .banner-image-overlay {
          opacity: 0.4;
        }

        .banner-image-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 30px;
          z-index: 2;
        }

        .banner-image-theme {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .banner-image-description {
          color: #E0F2FF;
          font-size: 1rem;
          line-height: 1.5;
          opacity: 0.9;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        }

        .banner-image-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(0, 166, 255, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .banner-image-wrapper:hover .banner-image-glow {
          opacity: 0.6;
        }

        .banner-connector-line {
          position: absolute;
          top: 50%;
          left: 20px;
          right: 20px;
          height: 2px;
          background: linear-gradient(90deg, 
            rgba(0, 166, 255, 0.2) 0%, 
            rgba(0, 166, 255, 0.5) 50%, 
            rgba(0, 166, 255, 0.2) 100%);
          z-index: 1;
          margin-top: -1px;
          filter: blur(1px);
        }

        /* CONTEÚDO DAS ESPECIALIDADES */
        .especialidades-unified-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .unified-intro-text {
          text-align: center;
          margin-bottom: 60px;
          padding: 0 20px;
        }

        .unified-intro {
          color: #B0E0FF;
          font-size: 1.3rem;
          line-height: 1.8;
          max-width: 1000px;
          margin: 0 auto;
          opacity: 0.9;
        }

        .highlight-text {
          color: #10dbff;
          font-weight: 700;
        }

        /* GRID DE ESPECIALIDADES EXPANSÍVEIS - AGORA COM 14 CARDS */
        .unified-especialidades-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          margin-bottom: 80px;
        }

        .unified-especialidade-card {
          background: rgba(17, 34, 64, 0.4);
          backdrop-filter: blur(20px);
          border-radius: 18px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.05);
          animation: unifiedCardAppear 0.6s ease-out calc(var(--card-index) * 0.1s) forwards;
          opacity: 0;
          transform: translateY(20px);
          cursor: pointer;
          min-height: 180px;
        }

        .unified-especialidade-card.collapsed {
          height: 180px;
          display: flex;
          align-items: center;
          padding: 25px;
          border-color: rgba(var(--card-color-rgb, 0, 166, 255), 0.4);
        }

        .unified-especialidade-card.expanded {
          min-height: 500px;
          grid-column: 1 / -1;
          z-index: 100;
          position: relative;
          cursor: default;
        }

        /* Modal: fundo escurecido + card expandido - CORRIGIDO */
        .especialidade-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          animation: modalBackdropIn 0.25s ease-out forwards;
        }

        @keyframes modalBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .especialidade-modal-box {
          width: 100%;
          max-width: 720px;
          max-height: calc(100vh - 48px);
          overflow-y: auto;
          border-radius: 20px;
          box-shadow: 
            0 25px 80px rgba(0, 0, 0, 0.8),
            0 0 40px rgba(var(--card-color-rgb, 0, 166, 255), 0.2);
          z-index: 10000;
          /* Sobreescreve opacity:0 e animation herdados de .unified-especialidade-card */
          opacity: 1;
          transform: none;
          animation: modalBoxIn 0.3s ease-out forwards;
        }

        @keyframes modalBoxIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .especialidade-modal-backdrop .especialidade-modal-box.expanded {
          grid-column: unset;
        }

        @media (max-width: 768px) {
          .especialidade-modal-backdrop {
            padding: 16px;
          }
          .especialidade-modal-box {
            max-height: calc(100vh - 32px);
            max-width: 95%;
          }
        }

        @keyframes unifiedCardAppear {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .unified-especialidade-card:hover:not(.expanded) {
          transform: translateY(-8px);
          border-color: var(--card-color);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 30px rgba(var(--card-color-rgb, 0, 166, 255), 0.15);
          background: rgba(17, 34, 64, 0.6);
        }

        /* Conteúdo do card recolhido */
        .collapsed-card-content {
          display: flex;
          align-items: center;
          gap: 20px;
          width: 100%;
        }

        .collapsed-card-icon {
          position: relative;
          width: 60px;
          height: 60px;
          flex-shrink: 0;
        }

        .collapsed-icon-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .collapsed-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.8rem;
          color: #FFFFFF;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .collapsed-card-text {
          flex: 1;
          min-width: 0;
        }

        .collapsed-card-title {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 8px 0;
          line-height: 1.3;
          transition: color 0.3s ease;
        }

        .unified-especialidade-card:hover:not(.expanded) .collapsed-card-title {
          color: var(--card-color);
        }

        .collapsed-card-subtitle {
          color: #B0E0FF;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 12px;
          opacity: 0.9;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .collapsed-card-cta {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--card-color);
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .unified-especialidade-card:hover:not(.expanded) .collapsed-card-cta {
          color: var(--card-color);
          transform: translateX(5px);
        }

        .cta-arrow {
          transition: transform 0.3s ease;
        }

        .unified-especialidade-card:hover:not(.expanded) .cta-arrow {
          transform: translateX(3px);
        }

        /* Conteúdo do card expandido */
        .expanded-card-content {
          position: relative;
          padding: 40px;
          height: 100%;
        }

        .close-expanded-card {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .close-expanded-card:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }

        .close-expanded-card svg {
          width: 20px;
          height: 20px;
        }

        /* Estilos do conteúdo expandido */
        .unified-card-content {
          position: relative;
          z-index: 2;
        }

        .unified-card-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
        }

        .unified-icon-wrapper {
          position: relative;
          width: 60px;
          height: 60px;
          flex-shrink: 0;
        }

        .unified-icon-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(0, 166, 255, 0.1);
          filter: blur(8px);
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .unified-especialidade-card.expanded .unified-icon-bg {
          opacity: 1;
          background: rgba(var(--card-color-rgb, 0, 166, 255), 0.35);
          filter: blur(12px);
        }

        .unified-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.8rem;
          color: #00A6FF;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .unified-especialidade-card.expanded .unified-icon {
          color: var(--card-color);
          transform: translate(-50%, -50%) scale(1.1);
        }

        .unified-icon-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid rgba(0, 166, 255, 0.2);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .unified-especialidade-card.expanded .unified-icon-ring {
          opacity: 1;
          border-color: rgba(var(--card-color-rgb, 0, 166, 255), 0.7);
        }

        .unified-title-wrapper {
          flex: 1;
        }

        .unified-card-title {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }

        .unified-especialidade-card.expanded .unified-card-title {
          color: var(--card-color);
        }

        .unified-title-underline {
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, #00A6FF, transparent);
          border-radius: 1px;
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .unified-especialidade-card.expanded .unified-title-underline {
          width: 120px;
          opacity: 1;
          background: linear-gradient(90deg, var(--card-color), transparent);
        }

        /* Descrição */
        .unified-card-description {
          color: #B0E0FF;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 25px;
          opacity: 0.9;
        }

        /* Seção técnica */
        .unified-technical-section {
          margin-top: 25px;
          padding-top: 25px;
          border-top: 1px solid rgba(0, 166, 255, 0.1);
        }

        .unified-technical-title {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 15px 0;
          opacity: 0.9;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .technical-title-icon {
          font-size: 1.2rem;
        }

        .unified-technical-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .unified-technical-item {
          display: flex;
          gap: 12px;
        }

        .technical-item-marker {
          color: #00A6FF;
          margin-top: 6px;
          flex-shrink: 0;
        }

        .unified-especialidade-card.expanded .technical-item-marker {
          color: var(--card-color);
        }

        .technical-item-text {
          color: #E0F2FF;
          font-size: 0.95rem;
          line-height: 1.5;
          opacity: 0.85;
        }

        /* Aplicações */
        .unified-applications {
          margin-top: 25px;
        }

        .applications-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .application-tag {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #FFFFFF;
          background: rgba(0, 166, 255, 0.15);
          border: 1px solid rgba(0, 166, 255, 0.3);
          transition: all 0.3s ease;
        }

        .unified-especialidade-card.expanded .application-tag {
          background: rgba(var(--card-color-rgb, 0, 166, 255), 0.3);
          border-color: rgba(var(--card-color-rgb, 0, 166, 255), 0.6);
        }

        .application-tag:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        /* Borda do card */
        .unified-card-border {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        .unified-especialidade-card.expanded .unified-card-border {
          opacity: 1;
          height: 5px;
        }


        /* Responsividade para nova seção */
        @media (max-width: 1200px) {
          .banner-image-frame {
            height: 350px;
          }
          
          .unified-especialidades-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
          }
          
          .unified-especialidade-card.expanded {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 992px) {
          .especialidades-unified-section {
            margin-top: 80px;
            padding-bottom: 60px;
          }
          
          .especialidades-unified-title {
            font-size: 2.2rem;
          }
          
          .especialidades-unified-subtitle {
            font-size: 1.1rem;
          }
          
          .banner-images-container {
            flex-direction: column;
            gap: 20px;
          }
          
          .banner-image-frame {
            height: 300px;
          }
          
          .banner-connector-line {
            display: none;
          }
          
          .unified-especialidades-grid {
            grid-template-columns: 1fr;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
        }

        @media (max-width: 768px) {
          .especialidades-unified-section {
            margin-top: 60px;
            padding-bottom: 40px;
          }
          
          .especialidades-unified-header {
            margin-bottom: 50px;
            padding: 0 15px;
          }
          
          .especialidades-unified-title {
            font-size: 1.9rem;
          }
          
          .especialidades-unified-subtitle {
            font-size: 1.05rem;
            line-height: 1.6;
          }
          
          .unified-images-banner {
            padding: 0 15px;
            margin-bottom: 60px;
          }
          
          .banner-image-frame {
            height: 250px;
          }
          
          .banner-image-content {
            padding: 20px;
          }
          
          .banner-image-theme {
            font-size: 1.2rem;
          }
          
          .banner-image-description {
            font-size: 0.9rem;
          }
          
          .unified-intro {
            font-size: 1.1rem;
          }
          
          .especialidades-unified-content {
            padding: 0 15px;
          }
          
          .unified-especialidades-grid {
            gap: 20px;
          }
          
          .unified-especialidade-card.collapsed {
            height: 160px;
            padding: 20px;
          }
          
          .expanded-card-content {
            padding: 30px 20px;
          }
          
          .collapsed-card-icon {
            width: 50px;
            height: 50px;
          }
          
          .collapsed-icon {
            font-size: 1.5rem;
          }
          
          .collapsed-card-title {
            font-size: 1.1rem;
          }
          
          .collapsed-card-subtitle {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 576px) {
          .especialidades-unified-section {
            margin-top: 50px;
            padding-bottom: 30px;
          }
          
          .especialidades-unified-title {
            font-size: 1.7rem;
          }
          
          .especialidades-unified-subtitle {
            font-size: 0.95rem;
          }
          
          .banner-image-frame {
            height: 200px;
          }
          
          .banner-image-theme {
            font-size: 1rem;
            margin-bottom: 5px;
          }
          
          .banner-image-description {
            font-size: 0.8rem;
          }
          
          .unified-intro {
            font-size: 1rem;
            line-height: 1.6;
          }
          
          .unified-especialidade-card.collapsed {
            height: 150px;
            padding: 15px;
          }
          
          .collapsed-card-content {
            gap: 15px;
          }
          
          .collapsed-card-icon {
            width: 45px;
            height: 45px;
          }
          
          .collapsed-icon {
            font-size: 1.3rem;
          }
          
          .collapsed-card-title {
            font-size: 1rem;
          }
          
          .collapsed-card-subtitle {
            font-size: 0.8rem;
            -webkit-line-clamp: 3;
          }
          
          .collapsed-card-cta {
            font-size: 0.8rem;
          }
          
          .expanded-card-content {
            padding: 25px 15px;
          }
          
          .close-expanded-card {
            top: 15px;
            right: 15px;
            width: 35px;
            height: 35px;
          }
          
          .close-expanded-card svg {
            width: 16px;
            height: 16px;
          }
        }

        /* Responsividade para Áreas Flutuantes */
        @media (max-width: 768px) {
          .servicos-3d-lateral {
            padding: 60px 15px 60px 15px !important;
            overflow: visible;
            overflow-y: visible !important;
            min-height: auto !important;
            margin-bottom: 0 !important;
            padding-bottom: 60px !important;
          }
          
          .container-3d-lateral {
            margin-bottom: 24px !important;
          }
          
          .title-3d-lateral {
            font-size: 1.6rem;
            margin-bottom: 8px;
          }
          
          .subtitle-3d-lateral {
            font-size: 1rem;
            margin-bottom: 8px;
          }

          .center-line-lateral {
            display: none;
          }
          
          /* Mobile: browser controla scroll vertical (pan-y); JS controla swipe horizontal */
          .carousel-3d-container-lateral {
            height: 500px;
            min-height: 440px;
            max-height: 85vh;
            padding: 5px 0;
            overflow: visible !important;
            overflow-x: visible !important;
            overflow-y: visible !important;
            touch-action: pan-y;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            perspective: 1200px;
          }
          
          .carousel-3d-track-lateral {
            touch-action: pan-y;
            overflow: visible !important;
            overflow-y: visible !important;
            position: relative;
            width: 100%;
            height: 100%;
          }
          
          .carousel-slide-3d-lateral {
            touch-action: pan-y;
            will-change: auto;
            overflow: visible !important;
            overflow-y: visible !important;
          }
          
          .carousel-slide-3d-lateral.active {
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                        opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .carousel-slide-3d-lateral {
            width: 90%;
            max-width: 450px;
            height: auto;
            min-height: 418px;
            max-height: 85vh;
            position: absolute;
            display: block;
            transform-style: preserve-3d;
          }
          
          .carousel-slide-3d-lateral.active {
            display: block;
          }
          
          .slide-inner-3d {
            width: 100%;
            height: 100%;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
            overflow: visible !important;
            overflow-y: visible !important;
            border-radius: 20px;
            transform-style: preserve-3d;
          }
          
          .slide-content-horizontal {
            flex-direction: column;
            height: 100%;
            min-height: 418px;
            border-radius: 20px;
            overflow: visible !important;
            overflow-y: visible !important;
          }
          
          .slide-image-container-lateral {
            flex: 0 0 50%;
            min-height: 210px;
            max-height: 210px;
          }
          
          .slide-card-lateral {
            flex: 1;
            padding: 12px 10px;
            overflow: visible;
            max-height: none;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .card-header {
            margin-bottom: 8px;
          }

          .card-header.mobile-hidden {
            display: none;
          }
          
          .slide-title-lateral {
            font-size: 1rem;
            margin-bottom: 5px;
            line-height: 1.2;
          }

          .title-divider {
            width: 60px;
            height: 1.5px;
            margin-top: 5px;
            margin-bottom: 0;
          }

          /* Título na imagem - canto inferior esquerdo */
          .slide-title-on-image {
            display: block;
            position: absolute;
            bottom: 10px;
            left: 10px;
            z-index: 5;
            max-width: 85%;
          }

          .slide-title-lateral-image {
            font-family: 'Quicksand', sans-serif;
            font-size: 1rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0 0 5px 0;
            line-height: 1.2;
          }

          .slide-title-on-image .title-divider {
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, 
              transparent 0%, 
              #00a6ff 20%, 
              #10dbff 50%, 
              #00a6ff 80%, 
              transparent 100%);
            border-radius: 1px;
            margin-top: 5px;
            position: relative;
            box-shadow: 
              0 0 8px rgba(0, 166, 255, 0.6),
              0 0 15px rgba(16, 219, 255, 0.4),
              0 0 25px rgba(0, 166, 255, 0.3);
            animation: lightPulse 2s ease-in-out infinite;
          }
          
          .slide-description-lateral {
            font-size: 0.7rem;
            line-height: 1.3;
            margin-bottom: 8px;
          }

          .slide-features-lateral {
            margin-bottom: 8px;
            gap: 6px;
          }

          .feature-item-lateral {
            font-size: 0.7rem;
            margin-bottom: 4px;
            line-height: 1.3;
            gap: 8px;
          }

          .feature-text-lateral {
            font-size: 0.7rem;
            line-height: 1.3;
          }

          .feature-check-lateral {
            width: 12px;
            height: 12px;
            color: #00a6ff;
            flex-shrink: 0;
            filter: drop-shadow(0 0 3px rgba(0, 166, 255, 0.4));
          }

          .slide-actions {
            margin-top: 8px;
          }

          .cta-button-lateral {
            padding: 12px 20px;
            font-size: 0.85rem;
            margin-top: auto;
            width: 100%;
            text-align: center;
            justify-content: center;
          }

          .logo-delta-lateral {
            width: 65px;
            height: 65px;
            top: -5px;
            left: 5px;
          }

          .carousel-controls-lateral {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
        }

        @media (max-width: 576px) {
          .servicos-3d-lateral {
            padding: 50px 10px 50px 10px !important;
            min-height: auto !important;
            margin-bottom: 0 !important;
            padding-bottom: 50px !important;
          }
          
          .container-3d-lateral {
            margin-bottom: 0 !important;
          }
          
          .carousel-3d-container-lateral {
            margin-bottom: 0 !important;
          }

          .title-3d-lateral {
            font-size: 1.36rem;
          }

          .subtitle-3d-lateral {
            font-size: 0.95rem;
            margin-bottom: 8px;
          }
          
          .carousel-3d-container-lateral {
            height: 500px;
            min-height: 450px;
            max-height: 85vh;
            padding: 5px 0;
            overflow: visible !important;
            overflow-y: visible !important;
            touch-action: pan-y;
            margin-top: 5px;
            perspective: 1000px;
          }

          .carousel-3d-track-lateral {
            overflow: visible !important;
            overflow-y: visible !important;
            touch-action: pan-y;
          }

          .carousel-slide-3d-lateral {
            overflow: visible !important;
            overflow-y: visible !important;
            touch-action: pan-y;
          }

          .center-line-lateral {
            display: none;
          }
          
          .carousel-slide-3d-lateral {
            width: 95%;
            max-width: 400px;
            min-height: 385px;
            max-height: 80vh;
          }

          .carousel-slide-3d-lateral.active {
          }

          .slide-inner-3d {
            overflow: visible !important;
            overflow-y: visible !important;
          }

          .slide-content-horizontal {
            min-height: 385px;
            overflow: visible !important;
            overflow-y: visible !important;
          }
          
          .slide-image-container-lateral {
            flex: 0 0 50%;
            min-height: 190px;
            max-height: 190px;
          }

          .slide-inner-3d {
            border-radius: 18px;
          }

          .slide-content-horizontal {
            border-radius: 18px;
          }
          
          .slide-card-lateral {
            flex: 1;
            padding: 10px 8px;
            overflow: visible;
            max-height: none;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .card-header {
            margin-bottom: 6px;
          }

          .card-header.mobile-hidden {
            display: none;
          }

          .slide-title-lateral {
            font-size: 0.9rem;
            margin-bottom: 4px;
            line-height: 1.2;
          }

          .slide-title-on-image {
            bottom: 8px;
            left: 8px;
            max-width: 90%;
          }

          .slide-title-lateral-image {
            font-size: 0.9rem;
            margin-bottom: 4px;
          }

          .slide-title-on-image .title-divider {
            width: 50px;
            height: 1.5px;
            margin-top: 4px;
          }

          .title-divider {
            width: 50px;
            height: 1.5px;
            margin-top: 4px;
            margin-bottom: 0;
          }

          .slide-description-lateral {
            font-size: 0.65rem;
            line-height: 1.3;
            margin-bottom: 6px;
          }

          .slide-features-lateral {
            margin-bottom: 6px;
            gap: 4px;
          }

          .feature-item-lateral {
            font-size: 0.65rem;
            margin-bottom: 3px;
            line-height: 1.3;
            gap: 6px;
          }

          .feature-text-lateral {
            font-size: 0.65rem;
            line-height: 1.3;
          }

          .feature-check-lateral {
            width: 10px;
            height: 10px;
            color: #00a6ff;
            flex-shrink: 0;
            filter: drop-shadow(0 0 2px rgba(0, 166, 255, 0.4));
          }

          .slide-actions {
            margin-top: 6px;
          }

          .control-btn-lateral {
            width: 45px;
            height: 45px;
            font-size: 1.2rem;
          }
          
          .cta-button-lateral {
            width: 100%;
            text-align: center;
            padding: 12px;
            font-size: 0.85rem;
            justify-content: center;
          }

          .logo-delta-lateral {
            width: 65px;
            height: 65px;
            top: -5px;
            left: 5px;
          }
        }
      `}</style>

      {/* Estilos globais do modal (portal em document.body) */}
      <style jsx global>{`
        .especialidade-modal-portal-root .especialidade-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: especialidade-modalBackdropIn 0.3s ease-out forwards;
          overflow: hidden;
        }
        @keyframes especialidade-modalBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .especialidade-modal-portal-root .modal-center-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 720px;
          padding: 20px;
          z-index: 10000;
        }
        .especialidade-modal-portal-root .especialidade-modal-box {
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          border-radius: 20px;
          box-shadow: 
            0 25px 80px rgba(0, 0, 0, 0.8),
            0 0 40px rgba(var(--card-color-rgb, 0, 166, 255), 0.2);
          opacity: 0;
          transform: translateY(20px) scale(0.98);
          animation: especialidade-modalBoxIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s forwards;
          background: rgba(10, 20, 40, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }
        @keyframes especialidade-modalBoxIn {
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        .especialidade-modal-portal-root .notification-fixed-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 320px;
          z-index: 10001;
          opacity: 0;
          transform: translateX(30px);
          animation: notificationSlideIn 0.6s cubic-bezier(0.34, 1.2, 0.64, 1) 0.3s forwards;
        }
        @keyframes notificationSlideIn {
          to { opacity: 1; transform: translateX(0); }
        }
        .especialidade-modal-portal-root .notification-card {
          background: rgba(22, 32, 48, 0.98);
          border-radius: 14px;
          border: 1px solid rgba(0, 166, 255, 0.12);
          box-shadow: 
            0 15px 40px rgba(0, 0, 0, 0.5),
            0 8px 25px rgba(0, 166, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          overflow: hidden;
          position: relative;
        }
        .especialidade-modal-portal-root .notification-header-bar {
          height: 4px;
          background: linear-gradient(90deg, #00a6ff 0%, #10dbff 33%, #00a6ff 66%, #10dbff 100%);
          background-size: 200% auto;
          animation: headerBarShine 3s linear infinite;
        }
        @keyframes headerBarShine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .especialidade-modal-portal-root .notification-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .especialidade-modal-portal-root .notification-icon-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .especialidade-modal-portal-root .notification-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #00a6ff 0%, #0461b9 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 6px 20px rgba(0, 166, 255, 0.3);
          position: relative;
          overflow: hidden;
          animation: iconFloat 3s ease-in-out infinite;
        }
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-3px) rotate(5deg); }
          66% { transform: translateY(3px) rotate(-5deg); }
        }
        .especialidade-modal-portal-root .notification-icon::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%);
          animation: iconShine 3s ease-in-out infinite;
        }
        @keyframes iconShine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        .especialidade-modal-portal-root .notification-icon svg {
          width: 22px;
          height: 22px;
          position: relative;
          z-index: 2;
        }
        .especialidade-modal-portal-root .notification-badge {
          background: linear-gradient(135deg, #FF375F 0%, #BF5AF2 100%);
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 12px rgba(255, 55, 95, 0.3);
          animation: badgePulse 2s ease-in-out infinite;
        }
        @keyframes badgePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        .especialidade-modal-portal-root .notification-text {
          animation: textFadeIn 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }
        @keyframes textFadeIn {
          to { opacity: 1; }
        }
        .especialidade-modal-portal-root .notification-title {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 8px 0;
          line-height: 1.2;
        }
        .especialidade-modal-portal-root .notification-message {
          font-family: 'Quicksand', sans-serif;
          font-size: 0.9rem;
          line-height: 1.5;
          color: #D0E7FF;
          margin: 0;
          opacity: 0.9;
        }
        .especialidade-modal-portal-root .notification-highlight {
          color: #10dbff;
          font-weight: 700;
          position: relative;
          display: inline-block;
        }
        .especialidade-modal-portal-root .notification-highlight::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, #10dbff, transparent);
          animation: highlightWave 2s ease-in-out infinite;
        }
        @keyframes highlightWave {
          0%, 100% { opacity: 0.3; width: 100%; }
          50% { opacity: 1; width: 100%; }
        }
        .especialidade-modal-portal-root .notification-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .especialidade-modal-portal-root .notification-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 20px;
          border-radius: 10px;
          font-family: 'Quicksand', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFFFFF;
          background: linear-gradient(135deg, #10dbff 0%, #0570d9 100%);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(255, 255, 255, 0.15);
          position: relative;
          overflow: hidden;
          animation: buttonGlow 2s ease-in-out infinite;
          box-shadow: 0 6px 20px rgba(0, 166, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        @keyframes buttonGlow {
          0%, 100% { transform: scale(1); box-shadow: 0 6px 20px rgba(0, 166, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2); }
          50% { transform: scale(1.02); box-shadow: 0 10px 30px rgba(0, 166, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3); }
        }
        .especialidade-modal-portal-root .notification-button:hover {
          animation: none;
          transform: translateY(-2px);
          background: linear-gradient(135deg, #20ebff 0%, #0680f0 100%);
          box-shadow: 0 12px 35px rgba(0, 166, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        .especialidade-modal-portal-root .notification-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
          animation: buttonShine 2.5s ease-in-out infinite;
        }
        @keyframes buttonShine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .especialidade-modal-portal-root .button-icon { flex-shrink: 0; }
        .especialidade-modal-portal-root .button-text { flex: 1; text-align: center; position: relative; z-index: 2; }
        .especialidade-modal-portal-root .notification-details {
          display: flex;
          justify-content: center;
          gap: 16px;
        }
        .especialidade-modal-portal-root .detail-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: #A0C8FF;
          opacity: 0.8;
          transition: all 0.3s ease;
        }
        .especialidade-modal-portal-root .detail-item:hover {
          opacity: 1;
          transform: translateY(-1px);
        }
        .especialidade-modal-portal-root .detail-item svg {
          flex-shrink: 0;
          color: #10dbff;
        }
        .especialidade-modal-portal-root .notification-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }
        .especialidade-modal-portal-root .notification-close:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: rotate(90deg);
        }
        .especialidade-modal-portal-root .notification-close svg {
          width: 14px;
          height: 14px;
        }
        .especialidade-modal-portal-root .notification-time {
          position: absolute;
          bottom: 12px;
          right: 12px;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
        }
        .especialidade-modal-portal-root .expanded-card-content {
          position: relative;
          padding: 40px;
          height: 100%;
        }
        .especialidade-modal-portal-root .close-expanded-card {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }
        .especialidade-modal-portal-root .close-expanded-card:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }
        .especialidade-modal-portal-root .close-expanded-card svg {
          width: 20px;
          height: 20px;
        }
        .especialidade-modal-portal-root .unified-card-content {
          position: relative;
          z-index: 2;
        }
        .especialidade-modal-portal-root .unified-card-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
        }
        .especialidade-modal-portal-root .unified-icon-wrapper {
          position: relative;
          width: 60px;
          height: 60px;
          flex-shrink: 0;
        }
        .especialidade-modal-portal-root .unified-icon-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          opacity: 1;
          background: rgba(var(--card-color-rgb, 0, 166, 255), 0.35);
          filter: blur(12px);
        }
        .especialidade-modal-portal-root .unified-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1.1);
          font-size: 1.8rem;
          color: var(--card-color);
          z-index: 2;
        }
        .especialidade-modal-portal-root .unified-icon-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid rgba(var(--card-color-rgb, 0, 166, 255), 0.7);
          opacity: 1;
        }
        .especialidade-modal-portal-root .unified-title-wrapper { flex: 1; }
        .especialidade-modal-portal-root .unified-card-title {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--card-color);
          margin: 0 0 8px 0;
          line-height: 1.3;
        }
        .especialidade-modal-portal-root .unified-title-underline {
          width: 120px;
          height: 2px;
          background: linear-gradient(90deg, var(--card-color), transparent);
          border-radius: 1px;
          opacity: 1;
        }
        .especialidade-modal-portal-root .unified-card-description {
          color: #B0E0FF;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 25px;
          opacity: 0.9;
        }
        .especialidade-modal-portal-root .unified-technical-section {
          margin-top: 25px;
          padding-top: 25px;
          border-top: 1px solid rgba(0, 166, 255, 0.1);
        }
        .especialidade-modal-portal-root .unified-technical-title {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 15px 0;
          opacity: 0.9;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .especialidade-modal-portal-root .technical-title-icon { display: flex; align-items: center; justify-content: center; }
        .especialidade-modal-portal-root .unified-technical-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .especialidade-modal-portal-root .unified-technical-item {
          display: flex;
          gap: 12px;
        }
        .especialidade-modal-portal-root .technical-item-marker {
          color: var(--card-color);
          margin-top: 6px;
          flex-shrink: 0;
        }
        .especialidade-modal-portal-root .technical-item-text {
          color: #E0F2FF;
          font-size: 0.95rem;
          line-height: 1.5;
          opacity: 0.85;
        }
        .especialidade-modal-portal-root .unified-applications { margin-top: 25px; }
        .especialidade-modal-portal-root .applications-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .especialidade-modal-portal-root .application-tag {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #FFFFFF;
          background: rgba(var(--card-color-rgb, 0, 166, 255), 0.3);
          border: 1px solid rgba(var(--card-color-rgb, 0, 166, 255), 0.6);
          transition: all 0.3s ease;
        }
        .especialidade-modal-portal-root .application-tag:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .especialidade-modal-portal-root .unified-card-border {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 5px;
          opacity: 1;
        }
        @media (max-width: 1200px) {
          .especialidade-modal-portal-root .modal-center-container {
            max-width: 650px;
          }
        }
        @media (max-width: 768px) {
          .especialidade-modal-portal-root .modal-center-container {
            padding: 16px;
            max-width: 95%;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            left: 50%;
            right: auto;
            transform: translate(-50%, -50%);
          }
          .especialidade-modal-portal-root .especialidade-modal-box {
            margin: 0 auto;
            width: 100%;
            max-height: 88vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
          /* No mobile: esconder a mensagem "Pronto para automatizar com nossas soluções?" */
          .especialidade-modal-portal-root .notification-fixed-container {
            display: none !important;
          }
          .especialidade-modal-portal-root .expanded-card-content {
            padding: 15px 20px 30px 20px;
          }
          .especialidade-modal-portal-root .close-expanded-card {
            top: 15px;
            right: 15px;
            width: 35px;
            height: 35px;
          }
          .especialidade-modal-portal-root .close-expanded-card svg {
            width: 16px;
            height: 16px;
          }
          /* Alinhar título com o botão fechar no mobile: mesmo topo + espaço à direita */
          .especialidade-modal-portal-root .unified-card-header {
            gap: 14px;
            margin-bottom: 16px;
            align-items: flex-start;
            padding-right: 44px;
            min-height: 35px;
          }
          .especialidade-modal-portal-root .unified-card-header .unified-icon-wrapper {
            align-self: center;
          }
          .especialidade-modal-portal-root .unified-title-wrapper {
            align-self: center;
          }
          .especialidade-modal-portal-root .unified-icon-wrapper {
            width: 48px;
            height: 48px;
          }
          .especialidade-modal-portal-root .unified-icon {
            font-size: 1.35rem;
          }
          .especialidade-modal-portal-root .unified-card-title {
            font-size: 1.2rem;
          }
          .especialidade-modal-portal-root .unified-title-underline {
            width: 80px;
          }
          .especialidade-modal-portal-root .unified-card-description {
            font-size: 0.88rem;
            line-height: 1.5;
            margin-bottom: 16px;
          }
          .especialidade-modal-portal-root .unified-technical-section {
            margin-top: 16px;
            padding-top: 16px;
          }
          .especialidade-modal-portal-root .unified-technical-title {
            font-size: 0.95rem;
            margin-bottom: 10px;
          }
          .especialidade-modal-portal-root .unified-technical-list {
            gap: 8px;
          }
          .especialidade-modal-portal-root .technical-item-text {
            font-size: 0.82rem;
            line-height: 1.45;
          }
          .especialidade-modal-portal-root .unified-applications {
            margin-top: 16px;
          }
          .especialidade-modal-portal-root .application-tag {
            font-size: 0.78rem;
            padding: 5px 12px;
          }
        }
        @media (max-width: 576px) {
          .especialidade-modal-portal-root .modal-center-container {
            padding: 12px;
          }
          .especialidade-modal-portal-root .notification-fixed-container {
            top: 70px;
            bottom: auto;
            right: 12px;
            width: 280px;
          }
          .especialidade-modal-portal-root .expanded-card-content {
            padding: 15px 14px 20px 14px;
          }
          .especialidade-modal-portal-root .unified-card-header {
            padding-right: 44px;
            min-height: 35px;
          }
          .especialidade-modal-portal-root .notification-card {
            border-radius: 12px;
          }
          .especialidade-modal-portal-root .notification-icon {
            width: 40px;
            height: 40px;
          }
          .especialidade-modal-portal-root .notification-button {
            padding: 12px 16px;
            font-size: 0.9rem;
          }
          .especialidade-modal-portal-root .unified-icon-wrapper {
            width: 42px;
            height: 42px;
          }
          .especialidade-modal-portal-root .unified-icon {
            font-size: 1.2rem;
          }
          .especialidade-modal-portal-root .unified-card-title {
            font-size: 1.08rem;
          }
          .especialidade-modal-portal-root .unified-card-description {
            font-size: 0.82rem;
            margin-bottom: 12px;
          }
          .especialidade-modal-portal-root .unified-technical-title {
            font-size: 0.88rem;
          }
          .especialidade-modal-portal-root .technical-item-text {
            font-size: 0.78rem;
          }
          .especialidade-modal-portal-root .application-tag {
            font-size: 0.72rem;
            padding: 4px 10px;
          }
        }
        @media (max-width: 480px) {
          .especialidade-modal-portal-root .notification-fixed-container {
            width: 260px;
          }
          .especialidade-modal-portal-root .modal-center-container {
            padding: 10px;
          }
          .especialidade-modal-portal-root .expanded-card-content {
            padding: 10px 12px 16px 12px;
          }
          .especialidade-modal-portal-root .unified-card-header {
            padding-right: 40px;
            min-height: 32px;
          }
          .especialidade-modal-portal-root .especialidade-modal-box {
            max-height: 92vh;
            border-radius: 14px;
          }
          .especialidade-modal-portal-root .unified-card-title {
            font-size: 1rem;
          }
          .especialidade-modal-portal-root .unified-card-description {
            font-size: 0.78rem;
          }
          .especialidade-modal-portal-root .unified-technical-title {
            font-size: 0.82rem;
          }
          .especialidade-modal-portal-root .technical-item-text {
            font-size: 0.74rem;
          }
          .especialidade-modal-portal-root .application-tag {
            font-size: 0.7rem;
            padding: 4px 8px;
          }
          .especialidade-modal-portal-root .close-expanded-card {
            top: 10px;
            right: 10px;
            width: 32px;
            height: 32px;
          }
          .especialidade-modal-portal-root .close-expanded-card svg {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>
    </section>
  );
}