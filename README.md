<a href="https://portal-emrede-final.vercel.app/">
  <img alt="Emrede Pro - Oráculo" src="app/(chat)/opengraph-image.png">
  <h1 align="center">Emrede Pro: Oráculo</h1>
</a>

<p align="center">
    O Oráculo é a inteligência estratégica da Emrede Pro, desenvolvida para guiar artistas na Jornada da Transmutação através de análises SWOT, planejamento de carreira e inteligência de mercado musical.
</p>

<p align="center">
  <a href="#proposta"><strong>Proposta</strong></a> ·
  <a href="#tecnologias"><strong>Tecnologias</strong></a> ·
  <a href="#pilares"><strong>Pilares Estratégicos</strong></a> ·
  <a href="#infraestrutura"><strong>Infraestrutura</strong></a>
</p>
<br/>

## 🔮 Proposta

Diferente de chatbots genéricos, o Oráculo da Emrede Pro utiliza o motor **Gemini 1.5 Flash** calibrado para o mercado fonográfico. Ele atua como um consultor 24/7 para artistas independentes, ajudando na transmutação de talentos em negócios sustentáveis.

## 🚀 Tecnologias

- [Next.js 15+](https://nextjs.org) - Arquitetura de alta performance com App Router.
- [Google Gemini AI](https://ai.google.dev/) - Inteligência generativa de última geração para análise de dados e criatividade.
- [AI SDK](https://ai-sdk.dev/docs/introduction) - Fluxo de mensagens em tempo real (Streaming).
- [shadcn/ui](https://ui.shadcn.com) - Interface moderna e minimalista com Tailwind CSS.

## 🛠 Pilares Estratégicos

- **Matriz SWOT Musical**: Identificação profunda de Forças, Fraquezas, Oportunidades e Ameaças no cenário atual do artista.
- **Jornada da Transmutação**: Guia passo a passo para evolução de maturidade artística.
- **Análise de Frequências**: Integração do conceito de "Rock Xamânico" e frequências de cura (432Hz) na estratégia de conteúdo.
- **Data Persistence**: Histórico de evolução salvo via **Neon Serverless Postgres**.

## 🏗 Infraestrutura

Este portal opera de forma independente, utilizando conexões diretas com os provedores para garantir máxima velocidade e privacidade dos dados dos artistas:

- **Database**: [Neon Postgres](https://neon.tech) (Histórico de chats e perfis).
- **Cache & Stream**: [Upstash Redis](https://upstash.com) (Gerenciamento de contexto em tempo real).
- **AI Engine**: Conexão direta via Google Generative AI (Sem intermediários).

## 🎸 Execução Local

Para rodar o laboratório da Emrede Pro localmente:

1. Clone o repositório.
2. Configure o `.env` com sua `GOOGLE_GENERATIVE_AI_API_KEY`.
3. Instale as dependências:

```bash
pnpm install
pnpm db:migrate 
pnpm dev
