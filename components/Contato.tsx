'use client';

import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Contato() {
  return (
    <section id="contato" className="contact scroll-reveal">
      <div className="contact-grid">
        <div className="contact-main scroll-reveal scroll-reveal-delay-1">
          <h3>Conecte-se conosco!</h3>
          <p className="contact-subtitle">Entre em contato para descobrir como nossas soluções em automação industrial podem transformar sua operação.</p>
          
          <div className="cta-section">
            <div className="cta-card">
              <div className="cta-icon">
                <FaPhone />
              </div>
              <div className="cta-content">
                <h4>Nosso WhatsApp</h4>
                <p>Fale diretamente com nossos especialistas</p>
                <a 
                  href="https://api.whatsapp.com/send/?phone=5592984810094&text=Ol%C3%A1%21+Vim+do+site+da+Delta+e+gostaria+da+minha+consultoria+gratuita&type=phone_number&app_absent=0" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="cta-button"
                >
                  <i className="fab fa-whatsapp"></i>
                  <span>Consulte Aqui</span>
                </a>
              </div>
            </div>
            
            <div className="cta-card">
              <div className="cta-icon">
                <FaEnvelope />
              </div>
              <div className="cta-content">
                <h4>Nosso Email</h4>
                <p>Envie suas dúvidas para nossa equipe técnica</p>
                <div className="cta-email-buttons">
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=contato@deltasolutions.com.br&su=Contato%20Delta%20Solutions&body=Olá,%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button email-button"
                  >
                    <i className="fas fa-envelope"></i>
                    <span>Gmail</span>
                  </a>
                  <a 
                    href="https://outlook.live.com/mail/0/deeplink/compose?to=contato@deltasolutions.com.br&subject=Contato%20Delta%20Solutions&body=Olá,%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button email-button"
                  >
                    <i className="fas fa-envelope"></i>
                    <span>Outlook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="contact-side scroll-reveal scroll-reveal-delay-2">
          <div className="info-section">
            <h4>Informações de Contato</h4>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-content">
                  <div className="info-label">Endereço</div>
                  <div className="info-value">Av. Gov. Danilo de Matos Areosa, 1199<br />Distrito Industrial I, Manaus - AM<br />69075-351</div>
                  <div className="info-label" style={{ marginTop: '20px' }}>Horário</div>
                  <div className="info-value">Seg - Sex: 8h às 18h</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="social-section">
            <h4>Siga Nossas Soluções</h4>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/delta-sollutions/" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/deltasollutions?igsh=eTNwNXA2cG1ucHJj" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram />
                <span>Instagram</span>
              </a>
              <a href="https://www.facebook.com/share/17foEKEyLk/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebook />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 150px 40px 80px 40px;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          overflow: hidden;
          isolation: isolate;
        }

        /* Padrão geométrico sutil de fundo */
        .contact::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 15% 85%, rgba(16, 219, 255, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 85% 15%, rgba(4, 97, 185, 0.03) 0%, transparent 50%);
          z-index: 0;
        }

        /* Linhas diagonais sutil */
        .contact::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(45deg, rgba(16, 219, 255, 0.02) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(4, 97, 185, 0.02) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(16, 219, 255, 0.02) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(4, 97, 185, 0.02) 75%);
          background-size: 100px 100px;
          z-index: 0;
          opacity: 0.5;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          max-width: 1200px;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .contact-main {
          animation: fadeInUp 0.8s ease-out;
        }

        .contact-side {
          animation: fadeInUp 0.8s ease-out 0.2s both;
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

        .contact-main h3 {
          font-family: 'Quicksand', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: #01071A;
          line-height: 1.2;
        }

        .contact-subtitle {
          font-size: 1.2rem;
          color: #01071A;
          line-height: 1.6;
          margin-bottom: 60px;
          max-width: 500px;
        }

        .cta-section {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .cta-card {
          background: white;
          border-radius: 20px;
          padding: 35px;
          display: flex;
          align-items: center;
          gap: 25px;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .cta-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, #10dbff, #0461b9);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .cta-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(16, 219, 255, 0.1);
          border-color: rgba(16, 219, 255, 0.2);
        }

        .cta-card:hover::before {
          opacity: 1;
        }

        .cta-icon {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0f9ff 0%, #e6f4ff 100%);
          border-radius: 18px;
          flex-shrink: 0;
        }

        .cta-icon svg {
          font-size: 28px;
          color: #0461b9;
        }

        .cta-content {
          flex: 1;
        }

        .cta-content h4 {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #01071A;
          margin: 0 0 8px 0;
        }

        .cta-content p {
          color: #01071A;
          font-size: 0.95rem;
          margin: 0 0 15px 0;
          line-height: 1.5;
          opacity: 0.8;
        }

        .cta-button {
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
            0 10px 30px rgba(0, 166, 255, 0.4),
            0 0 20px rgba(0, 255, 170, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          width: fit-content;
          isolation: isolate;
        }

        .email-button {
          text-decoration: none !important;
        }

        .cta-email-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 4px;
        }

        .cta-button::before {
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

        .cta-button:hover {
          transform: translateY(-8px) scale(1.08);
          box-shadow: 
            0 20px 50px rgba(0, 166, 255, 0.7),
            0 0 40px rgba(0, 255, 170, 0.7),
            0 0 60px rgba(16, 219, 255, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          background: linear-gradient(135deg, #20ebff 0%, #0570d9 100%);
        }

        .cta-button:hover::before {
          opacity: 1;
          animation: buttonShine 1s ease;
        }

        .cta-button:active {
          transform: translateY(-4px) scale(1.04);
        }

        .cta-button::before {
          z-index: 0;
          pointer-events: none;
        }

        .cta-button > * {
          position: relative;
          z-index: 10;
        }

        .cta-button i,
        .cta-button span {
          position: relative;
          z-index: 10;
          display: inline-block;
        }

        @keyframes buttonShine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        @keyframes buttonPulse {
          0%, 100% {
            box-shadow: 
              0 10px 30px rgba(0, 166, 255, 0.4),
              0 0 20px rgba(0, 255, 170, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
          50% {
            box-shadow: 
              0 10px 35px rgba(0, 166, 255, 0.6),
              0 0 25px rgba(0, 255, 170, 0.6),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
        }

        .contact-side h4 {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #01071A;
          margin-bottom: 35px;
          position: relative;
          display: inline-block;
        }

        .contact-side h4::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #10dbff, #0461b9);
          border-radius: 2px;
        }

        .info-section {
          margin-bottom: 60px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .info-item {
          background: white;
          border-radius: 16px;
          padding: 25px;
          display: flex;
          align-items: flex-start;
          gap: 15px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.03);
        }

        .info-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(16, 219, 255, 0.1);
          border-color: rgba(16, 219, 255, 0.1);
        }

        .info-icon {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0f9ff 0%, #e6f4ff 100%);
          border-radius: 12px;
          flex-shrink: 0;
        }

        .info-icon svg {
          font-size: 18px;
          color: #0461b9;
        }

        .info-content {
          flex: 1;
        }

        .info-label {
          color: #01071A;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          opacity: 0.7;
        }

        .info-value {
          color: #01071A;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.4;
        }

        .social-section h4 {
          margin-bottom: 30px;
        }

        .social-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 15px;
          background: white;
          border-radius: 12px;
          padding: 18px 25px;
          text-decoration: none;
          color: #01071A;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
          border: none;
          position: relative;
          overflow: hidden;
        }

        .social-link svg {
          font-size: 20px;
          color: #0461b9;
          transition: transform 0.3s ease;
        }

        .social-link::before {
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

        .social-link span {
          flex: 1;
          position: relative;
          z-index: 10;
        }

        .social-link svg {
          position: relative;
          z-index: 10;
        }

        .social-link::before {
          pointer-events: none;
        }

        .social-link:hover {
          transform: translateY(-8px) scale(1.08);
          color: #ffffff;
          box-shadow: 
            0 20px 50px rgba(0, 166, 255, 0.7),
            0 0 40px rgba(0, 255, 170, 0.7),
            0 0 60px rgba(16, 219, 255, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          background: linear-gradient(135deg, #20ebff 0%, #0570d9 100%);
        }

        .social-link:hover::before {
          opacity: 1;
          animation: buttonShine 1.5s ease;
        }

        .social-link:hover svg {
          color: #ffffff;
        }

        .social-link:active {
          transform: translateY(-4px) scale(1.04);
        }

        @media (max-width: 1024px) {
          .contact {
            padding: 120px 40px 60px 40px;
          }
          
          .contact-grid {
            gap: 60px;
          }
          
          .contact-main h3 {
            font-size: 2.5rem;
          }
          
          .contact-subtitle {
            font-size: 1.1rem;
          }
          
          .cta-card {
            padding: 30px;
          }
          
          .cta-icon {
            width: 60px;
            height: 60px;
          }
          
          .cta-icon svg {
            font-size: 24px;
          }
        }

        @media (max-width: 768px) {
          .contact {
            padding: 120px 15px 50px 15px;
            padding-top: 120px;
          }
          
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .contact-main h3 {
            font-size: 2rem;
            margin-bottom: 10px;
          }
          
          .contact-subtitle {
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 20px;
          }
          
          .cta-section {
            gap: 15px;
          }
          
          .cta-card {
            flex-direction: column;
            text-align: center;
            padding: 18px 15px;
          }
          
          .cta-icon {
            align-self: center;
            width: 55px;
            height: 55px;
          }
          
          .cta-icon svg {
            font-size: 22px;
          }
          
          .cta-content h4 {
            font-size: 1rem;
            margin-bottom: 5px;
          }
          
          .cta-content p {
            font-size: 0.85rem;
            margin-bottom: 12px;
            line-height: 1.4;
          }
          
          .cta-button {
            font-size: 0.85rem;
            padding: 10px 18px;
          }
          
          .contact-side h4 {
            font-size: 1.2rem;
            margin-bottom: 20px;
          }
          
          .info-item {
            padding: 18px 15px;
          }
          
          .info-icon {
            width: 40px;
            height: 40px;
          }
          
          .info-icon svg {
            font-size: 16px;
          }
          
          .info-label {
            font-size: 0.75rem;
            margin-bottom: 6px;
          }
          
          .info-value {
            font-size: 0.85rem;
            line-height: 1.4;
          }
          
          .social-section h4 {
            margin-bottom: 20px;
          }
          
          .social-link {
            padding: 15px 18px;
            font-size: 0.9rem;
          }
          
          .social-link svg {
            font-size: 18px;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .contact {
            padding: 100px 12px 40px 12px;
            padding-top: 100px;
          }
          
          .contact-grid {
            gap: 25px;
          }
          
          .contact-main h3 {
            font-size: 1.7rem;
            margin-bottom: 8px;
          }
          
          .contact-subtitle {
            font-size: 0.85rem;
            margin-bottom: 15px;
            line-height: 1.5;
          }
          
          .cta-section {
            gap: 12px;
          }
          
          .cta-card {
            padding: 15px 12px;
          }
          
          .cta-icon {
            width: 50px;
            height: 50px;
          }
          
          .cta-icon svg {
            font-size: 20px;
          }
          
          .cta-content h4 {
            font-size: 0.9rem;
            margin-bottom: 4px;
          }
          
          .cta-content p {
            font-size: 0.8rem;
            margin-bottom: 10px;
            line-height: 1.3;
          }
          
          .cta-button {
            width: 100%;
            text-align: center;
            padding: 12px;
            font-size: 0.85rem;
          }
          
          .contact-side h4 {
            font-size: 1.1rem;
            margin-bottom: 15px;
          }
          
          .info-item {
            padding: 15px 12px;
          }
          
          .info-icon {
            width: 35px;
            height: 35px;
          }
          
          .info-icon svg {
            font-size: 14px;
          }
          
          .info-label {
            font-size: 0.7rem;
            margin-bottom: 5px;
          }
          
          .info-value {
            font-size: 0.8rem;
            line-height: 1.3;
          }
          
          .social-section h4 {
            margin-bottom: 15px;
          }
          
          .social-link {
            padding: 12px 15px;
            font-size: 0.85rem;
          }
          
          .social-link svg {
            font-size: 16px;
          }
          
          .info-grid {
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}