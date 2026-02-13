'use client';

import { NavigationProvider, useNavigation } from '@/contexts/NavigationContext';
import Header from '@/components/Header';
import Inicio from '@/components/Inicio';
import AreasDeCompetencia from '@/components/Areas-de-Competencia';
import NossasSolucoes from '@/components/NossasSolucoes';
import Ferramentaria from '@/components/Ferramentaria';
import FAQ from '@/components/FAQ';
import Contato from '@/components/Contato';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import LoadingScreen from '@/components/LoadingScreen';

function HomeContent() {
  const { activeSection } = useNavigation();

  return (
    <main>
      <ScrollAnimations activeSection={activeSection} />
      <Header />
      
      <div className="section-container" data-section="inicio" style={{ display: activeSection === 'inicio' || activeSection === 'sobre' ? 'block' : 'none' }}>
        <Inicio />
      </div>
      
      <div className="section-container" data-section="servicos" style={{ display: activeSection === 'servicos' ? 'block' : 'none' }}>
        <AreasDeCompetencia />
      </div>
      
      <div className="section-container" data-section="nossas-solucoes" style={{ display: activeSection === 'nossas-solucoes' ? 'block' : 'none' }}>
        <NossasSolucoes />
      </div>
      
      <div className="section-container" data-section="ferramentaria" style={{ display: activeSection === 'ferramentaria' ? 'block' : 'none' }}>
        <Ferramentaria />
      </div>
      
      <div className="section-container" data-section="faq" style={{ display: activeSection === 'faq' ? 'block' : 'none' }}>
        <FAQ />
      </div>
      
      <div className="section-container" data-section="contato" style={{ display: activeSection === 'contato' ? 'block' : 'none' }}>
        <Contato />
      </div>
      
      <Footer />
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .section-container {
          min-height: calc(100vh - 200px);
          animation: fadeIn 0.4s ease-in-out;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .section-container {
            width: 100%;
            max-width: 100vw;
            overflow: visible !important;
            box-sizing: border-box;
          }
        }
      `}</style>
    </main>
  );
}

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <NavigationProvider>
        <HomeContent />
      </NavigationProvider>
    </>
  );
}

