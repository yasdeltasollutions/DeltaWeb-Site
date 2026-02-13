# Delta Solutions - Site Next.js

Site corporativo da **Delta Solutions** em Next.js com React e TypeScript. Unimos engenharia mecânica, design eletrônico e automação inteligente para entregar soluções completas.

## 🚀 Como executar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

Para testar em dispositivos na mesma rede (ex.: celular):

```bash
npm run dev:mobile
```

### Build de Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
projeto delta/
├── app/
│   ├── layout.tsx           # Layout principal e metadata
│   ├── page.tsx             # Página principal (seções e navegação)
│   ├── loading.tsx          # Estado de carregamento
│   └── globals.css          # Estilos globais
├── components/
│   ├── Header.tsx           # Cabeçalho e menu de navegação
│   ├── Inicio.tsx           # Hero / seção inicial
│   ├── Sobre.tsx            # Seção sobre a empresa
│   ├── Areas-de-Competencia.tsx  # Áreas de competência
│   ├── NossasSolucoes.tsx   # Nossas soluções
│   ├── Ferramentaria.tsx    # Seção de ferramentaria
│   ├── FAQ.tsx              # FAQ com accordion
│   ├── Contato.tsx          # Formulário de contato
│   ├── Footer.tsx           # Rodapé
│   ├── ScrollAnimations.tsx # Animações de scroll
│   ├── LoadingScreen.tsx    # Tela de carregamento inicial
│   └── FaviconHandler.tsx   # Tratamento do favicon
├── contexts/
│   └── NavigationContext.tsx # Estado da navegação entre seções
├── lib/
│   └── utils.ts             # Utilitários (ex.: cn para composição de classes)
├── public/
│   ├── images/              # Imagens gerais
│   ├── imagens_carrossel/   # Imagens do carrossel
│   ├── imagens_areasdecompetencia/
│   ├── imagens_solucoes/
│   ├── imagens_ferramentaria/
│   └── logos/               # Logotipos
├── components.json          # Configuração (ex.: shadcn/ui)
├── package.json
├── next.config.js
└── tsconfig.json
```

## 🛠️ Tecnologias

- **Next.js 14** – Framework React para produção
- **React 18** – Biblioteca para interfaces
- **TypeScript** – Tipagem estática
- **CSS** – Estilização global em `app/globals.css` e estilos por componente (inline e `<style>`)
- **Lucide React** – Ícones
- **clsx** – Composição de classes (utilitário `cn` em `lib/utils.ts`)

## ✨ Funcionalidades

- ✅ Design responsivo
- ✅ Navegação por seções (Início, Sobre, Serviços, Nossas Soluções, Ferramentaria, FAQ, Contato)
- ✅ Contexto de navegação (`NavigationContext`) para estado global das seções
- ✅ Animações e efeitos visuais (partículas, scroll)
- ✅ Menu mobile responsivo
- ✅ FAQ com accordion
- ✅ Formulário de contato
- ✅ Tela de loading inicial
- ✅ Efeitos de scroll no header

## 📝 Personalização

### Editar uma seção

1. Abra o componente correspondente em `components/`.
2. Faça as alterações e salve (hot reload ativo).

### Estilos

- Globais: `app/globals.css`
- Por componente: estilos inline e blocos `<style>` onde aplicável.

### Adicionar nova seção

1. Crie o componente em `components/`.
2. Importe e use em `app/page.tsx` dentro de `HomeContent`.
3. Adicione o item no menu em `components/Header.tsx` e o estado correspondente em `contexts/NavigationContext.tsx`.

## 🌐 Deploy

### Vercel (recomendado)

1. Envie o código para o GitHub.
2. Conecte o repositório na [Vercel](https://vercel.com).
3. O deploy será feito automaticamente.

### Outras plataformas

Qualquer ambiente com suporte a Node.js: Netlify, AWS Amplify, Railway, etc.

## 📦 Scripts

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run dev:mobile` | Dev acessível na rede local (0.0.0.0) |
| `npm run build` | Build de produção |
| `npm start` | Servidor de produção |
| `npm run lint` | Executa o linter |

## 📄 Licença

© 2026 Delta Solutions. Todos os direitos reservados.
