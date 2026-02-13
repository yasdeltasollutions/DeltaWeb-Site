'use client';

import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { useNavigation } from '@/contexts/NavigationContext';

export default function Footer() {
  const { setActiveSection } = useNavigation();
  
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setActiveSection(sectionId as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-section-main">
            <div className="footer-logo-section">
              <img src="/logos/logo-delta.png" alt="Delta Solutions" className="footer-logo" />
              <p className="footer-tagline">Inovação é o que oferecemos.</p>
            </div>
            <div className="footer-contact">
              <a href="https://api.whatsapp.com/send/?phone=5592984810094&text=Ol%C3%A1%21+Vim+do+site+da+Delta+e+gostaria+da+minha+consultoria+gratuita&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                <span className="footer-icon">
                  <FaPhone />
                </span>
                +55 92 98481 0094
              </a>
              <a href="mailto:contato@deltasolutions.com.br?subject=Contato%20Delta%20Solutions&body=Ola%2C%20gostaria%20de%20saber%20mais%20sobre%20seus%20servicos." className="footer-contact-item">
                <span className="footer-icon">
                  <FaEnvelope />
                </span>
                contato@deltasolutions.com.br
              </a>
            </div>
          </div>
          <div className="footer-section">
            <ul>
              <li><a href="#inicio" onClick={(e) => handleNavigation(e, 'inicio')}>Início</a></li>
              <li><a href="#sobre" onClick={(e) => handleNavigation(e, 'sobre')}>Sobre</a></li>
              <li><a href="#servicos" onClick={(e) => handleNavigation(e, 'servicos')}>Áreas de Competência</a></li>
              <li><a href="#nossas-solucoes" onClick={(e) => handleNavigation(e, 'nossas-solucoes')}>Nossas Soluções</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <ul>
              <li><a href="#ferramentaria" onClick={(e) => handleNavigation(e, 'ferramentaria')}>Ferramentaria</a></li>
              <li><a href="#faq" onClick={(e) => handleNavigation(e, 'faq')}>FAQ</a></li>
              <li><a href="#contato" onClick={(e) => handleNavigation(e, 'contato')}>Contato</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Delta Sollutions. <span className="footer-copyright-line">Todos os direitos reservados.</span></p>
        </div>
      </div>

      <style jsx>{`
        .footer-tagline {
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
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
          animation: subtitleShine 3s ease-in-out infinite;
        }

        @keyframes subtitleShine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          transition: color 0.3s, transform 0.3s;
          flex-shrink: 0;
        }

        .footer-icon svg {
          width: 1rem;
          height: 1rem;
        }

        .footer-contact-item:hover {
          color: #10dbff !important;
        }

        .footer-contact-item:hover .footer-icon {
          color: #10dbff;
          transform: scale(1.1);
        }

        .footer-section a:hover {
          color: #10dbff !important;
        }

        .footer-copyright-line {
          display: inline;
        }

        /* Estilos específicos para mobile - só afetam telas menores que 768px */
        @media (max-width: 768px) {
          .footer-copyright-line {
            display: block;
          }
          .footer-contact-item {
            font-size: 0.9rem;
            padding: 8px 0;
          }

          .footer-icon {
            font-size: 0.9rem;
          }

          .footer-icon svg {
            width: 0.9rem;
            height: 0.9rem;
          }
        }

        /* Estilos para telas muito pequenas (menores que 480px) */
        @media (max-width: 480px) {
          .footer-contact-item {
            font-size: 0.85rem;
            gap: 8px;
          }
        }
      `}</style>
    </footer>
  );
}

