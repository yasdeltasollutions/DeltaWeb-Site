import type { Metadata } from 'next';
import './globals.css';
import FaviconHandler from '@/components/FaviconHandler';
import LoadingScreen from '@/components/LoadingScreen';

export const metadata: Metadata = {
  title: 'Delta Sollutions',
  description: 'Unimos engenharia mecânica, design eletrônico e automação inteligente para entregar soluções completas.',
  icons: {
    icon: '/logos/delta-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="icon"
          href="/logos/delta-logo.png"
        />
      </head>
      <body>
        <div id="initial-loading-screen" className="loading-screen">
          <div className="loading-content">
            <div className="loading-spinner">
              <div className="spinner-ring" />
              <div className="spinner-ring" />
              <div className="spinner-ring" />
            </div>
            <p className="loading-text">carregando...</p>
          </div>
        </div>
        <LoadingScreen />
        <FaviconHandler />
        {children}
      </body>
    </html>
  );
}
