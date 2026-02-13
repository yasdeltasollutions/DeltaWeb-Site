'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      question: 'O que exatamente a Delta Solutions oferece?',
      answer: 'Nós desenvolvemos soluções completas de automação industrial e tecnologia, atuando em projetos mecânicos, elétricos, P&D e Indústria 4.0 para aumentar produtividade, reduzir custos e elevar qualidade.'
    },
    {
      question: 'Qual é o diferencial da Delta Solutions em relação a outras empresas de automação?',
      answer: 'O diferencial está em entregar não só um sistema ou máquina, mas um "parceiro de tecnologia" que busca melhorias contínuas, segurança (NR10/NR12), eliminação de processos manuais e foco em confiabilidade do produto final.'
    },
    {
      question: 'Em quais etapas de um projeto a Delta Solutions participa?',
      answer: 'A empresa atua desde o estágio de concepção/consultoria, passando por desenvolvimento, integração, testes em linha de produção, até a entrega "chave na mão" (turn-key) de linhas automáticas ou sistemas robóticos.'
    },
    {
      question: 'Para que tipo de indústrias ou aplicações a Delta Solutions se dirige?',
      answer: 'O foco é em indústrias que demandam alta performance, automação e tecnologia — por exemplo: linhas de manufatura automáticas, testes em produção, robótica para propósito específico, adaptação a normas de segurança industrial.'
    },
    {
      question: 'Como funciona o suporte pós-implantação / manutenção dos sistemas implementados?',
      answer: 'Após a entrega, há acompanhamento para assegurar que a solução opere conforme o esperado, com garantia de qualidade, suporte a melhorias e adaptações conforme evolução produtiva.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq scroll-reveal">
      <div className="container">
        <div className="faq-content">
          <div className="faq-intro scroll-reveal scroll-reveal-delay-1">
            <div className="faq-header">
              <span className="faq-dot"></span>
              <h2>FAQ</h2>
            </div>
            <h3>Perguntas Frequentes</h3>
            <p>Tem alguma dúvida sobre nossos serviços ou sobre como a Delta Sollutions pode ajudar sua empresa? Confira abaixo as respostas para as perguntas mais frequentes sobre nossos processos, soluções e suporte técnico.</p>
            <div className="faq-divider"></div>
          </div>
          <div className="faq-container scroll-reveal scroll-reveal-delay-2">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              >
                <div 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3>{item.question}</h3>
                  <span className="faq-icon">+</span>
                </div>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 150px 20px 60px 20px;
          background-color: #01071A;
          overflow: hidden;
          /* Fix para iOS - estabiliza seção durante scroll */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .faq::before {
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

        .faq::after {
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
        }

        .container {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          width: 100%;
        }

        .faq-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .faq-intro {
          position: sticky;
          top: 0px;
          z-index: 1;
          text-align: left;
          /* Fix para iOS - estabiliza sticky durante scroll */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .faq-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 15px;
        }

        .faq-dot {
          width: 10px;
          height: 10px;
          background: linear-gradient(135deg, #10dbff 0%, #0461b9 100%);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        .faq-header h2 {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #00a6ff;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          opacity: 0;
          animation: fadeInUp 1s ease 0.2s forwards;
        }

        .faq-intro h3 {
          font-family: 'Quicksand', sans-serif;
          font-size: 2.8rem;
          font-weight: 800;
          margin-bottom: 18px;
          color: #ffffff;
          opacity: 0;
          animation: fadeInUp 1s ease 0.4s forwards;
        }

        .faq-intro p {
          font-size: 1.155rem;
          color: #b0e0ff;
          line-height: 1.6;
          max-width: 100%;
          margin: 0 0 25px 0;
          opacity: 0;
          animation: fadeInUp 1s ease 0.6s forwards;
        }

        .faq-divider {
          height: 2px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(0, 166, 255, 0.5), 
            transparent
          );
          max-width: 400px;
          margin: 0;
          opacity: 0;
          animation: fadeInUp 1s ease 0.8s forwards;
        }

        .faq-container {
          position: relative;
          z-index: 1;
          max-width: 100%;
        }

        .faq-item {
          background: rgba(17, 34, 64, 0.3);
          border-radius: 12px;
          border: 1px solid rgba(0, 166, 255, 0.15);
          margin-bottom: 14px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 1s ease forwards;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .faq-item:nth-child(1) { 
          animation-delay: 1s; 
        }
        
        .faq-item:nth-child(2) { 
          animation-delay: 1.2s; 
        }
        
        .faq-item:nth-child(3) { 
          animation-delay: 1.4s; 
        }
        
        .faq-item:nth-child(4) { 
          animation-delay: 1.6s; 
        }
        
        .faq-item:nth-child(5) { 
          animation-delay: 1.8s; 
        }

        .faq-item.active {
          background: rgba(17, 34, 64, 0.4);
          border-color: rgba(0, 166, 255, 0.3);
          box-shadow: 
            0 20px 40px rgba(0, 166, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .faq-question {
          padding: 18px 22px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          background: rgba(0, 166, 255, 0.05);
        }

        .faq-question h3 {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
          padding-right: 20px;
          transition: all 0.3s ease;
        }

        .faq-item.active .faq-question h3 {
          color: #00a6ff;
        }

        .faq-icon {
          font-size: 1.5rem;
          font-weight: 300;
          color: #00a6ff;
          min-width: 20px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          transform-origin: center;
        }

        .faq-item.active .faq-icon {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .faq-item.active .faq-answer {
          max-height: 500px;
        }

        .faq-answer p {
          padding: 0 22px 20px;
          margin: 0;
          font-size: 1.155rem;
          line-height: 1.6;
          color: #b0e0ff;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .faq-item.active .faq-answer p {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
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

        @media (max-width: 1024px) {
          .faq {
            padding: 120px 20px 60px 20px;
          }
          
          .faq-intro h3 {
            font-size: 2.24rem;
          }
          
          .faq-question h3 {
            font-size: 1.3rem;
          }
          
          .faq-answer p {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 768px) {
          .faq {
            padding: 120px 15px 50px 15px !important;
            margin-top: 0 !important;
            padding-top: 120px !important;
          }

          .faq-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .faq-intro {
            position: static;
            text-align: left;
            margin-bottom: 20px;
          }

          .faq-header {
            justify-content: flex-start;
            margin-bottom: 10px;
          }

          .faq-intro h3 {
            font-size: 1.6rem;
            margin-bottom: 10px;
          }
          
          .faq-intro p {
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 15px;
          }
          
          .faq-question {
            padding: 15px 18px;
          }
          
          .faq-question h3 {
            font-size: 1rem;
            line-height: 1.3;
          }
          
          .faq-answer p {
            padding: 0 18px 15px;
            font-size: 0.85rem;
            line-height: 1.5;
          }
          
          .faq-icon {
            font-size: 1.4rem;
          }

          .faq-item {
            margin-bottom: 12px;
          }
        }

        @media (max-width: 480px) {
          .faq {
            padding: 100px 12px 40px 12px !important;
            margin-top: 0 !important;
            padding-top: 100px !important;
          }
          
          .faq-intro {
            margin-bottom: 15px;
            text-align: left;
          }

          .faq-header {
            justify-content: flex-start;
            margin-bottom: 8px;
          }
          
          .faq-intro h3 {
            font-size: 1.36rem;
            margin-bottom: 8px;
          }
          
          .faq-header h2 {
            font-size: 1rem;
          }

          .faq-intro p {
            font-size: 0.85rem;
            margin-bottom: 12px;
          }
          
          .faq-question {
            padding: 12px 15px;
          }
          
          .faq-question h3 {
            font-size: 0.9rem;
            padding-right: 15px;
            line-height: 1.3;
          }
          
          .faq-answer p {
            padding: 0 15px 12px;
            font-size: 0.8rem;
            line-height: 1.4;
          }

          .faq-icon {
            font-size: 1.2rem;
          }

          .faq-item {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </section>
  );
}
