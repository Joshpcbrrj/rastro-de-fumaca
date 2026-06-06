---
title: Explicação técnica do projeto — Rastro de Fumaça
created: 2026-06-06
---

# Explicação técnica do projeto — Rastro de Fumaça

Este documento resume a arquitetura, a organização do código, dependências e notas técnicas úteis para desenvolvedores e clientes.

## Objetivo

- Documentar as responsabilidades das pastas e arquivos principais.
- Explicar decisões técnicas (stubs do Supabase, correção de chunks, App Router).
- Fornecer instruções de build, testes e deploy para time de desenvolvimento.

## Funcionalidade da página

- A página principal serve como portal de pesquisa histórica: apresenta uma intro cinemática opcional, um `Hero` com radar animado, navegação lateral (cockpit) e um acervo de pesquisas em `FeaturedResearch` que abre artigos em modal. O objetivo é oferecer um visual imersivo para explorar artigos, aeronaves e arquivos históricos.
- Áreas previstas: home (preview), listagem de artigos/acervo, páginas de detalhe de artigo, seção de aeronaves, e um painel administrativo para CRUD de conteúdo.

## Melhoria futuras (sugestões técnicas)

- Substituir o gate de senha local por autenticação completa (Supabase/Auth + OAuth com Gmail).
- Implementar painel administrativo (CRUD) com permissões por papéis (admin/editor).
- Adicionar um CMS leve ou integração com headless CMS para publicar conteúdo dinâmico.
- Otimizar imagens usando `next/image` e geração de imagens responsivas + Lazy loading.
- Aumentar cobertura de testes (unit + integration + e2e) e integrar com CI (GitHub Actions).
- Acessibilidade (a11y): contraste, navegação por teclado, roles/aria nos modais.
- Performance: avaliar streaming/RSC, dividir chunks, reduzir bundles e usar cache/TTL para dados públicos.
- Internacionalização (i18n) se houver público multilíngue.
- Transformar em PWA se desejar modo offline e installable.
- Monitoramento/telemetria: Sentry/LogRocket e analytics para entender uso do conteúdo.
- Deploy: automatizar com pipeline (GitHub Actions → Vercel/Azure) e manter `npm ci` em CI para reprodutibilidade.


## Visão geral

O projeto é uma aplicação Next.js (App Router) escrita em TypeScript, com Tailwind CSS para estilo e Vitest para testes. O app contém uma interface estilo "cockpit" com um preview visual (radar, scanlines, modal de artigos) e guarda opcional para Supabase durante o desenvolvimento.

## Estrutura de pastas (resumo)

Top-level:

```
app/                      # rotas (App Router), layouts e estilos globais
  globals.css
  layout.tsx
  page.tsx                 # gate de senha local (p-47) + composição da home
components/               # componentes React reutilizáveis (layout, home, articles)
lib/                      # bibliotecas internas (ex.: lib/supabase stubs)
public/                   # imagens e assets públicos
tests/                    # testes Vitest
doc/                      # documentação (este arquivo)
package.json
next.config.mjs           # ajuste webpack para chunks do servidor
.gitignore
README.md
```

## Principais arquivos e responsabilidades

- `app/layout.tsx` — Root layout, importa `app/globals.css` e define metadados.
- `app/page.tsx` — Página inicial; atualmente contém um gate de senha local (`p-47`) usado para prototipação.
- `app/globals.css` — Estilos Tailwind + utilitários e animações (radar, scanline, brilho).
- `components/layout/CockpitSidebar.tsx` — Sidebar responsiva com navegação.
- `components/home/HeroRadar.tsx` — Hero + radar animado.
- `components/home/CinematicIntro.tsx` — Intro cinematográfica com progresso/skip.
- `components/home/FeaturedResearch.tsx` — Grid de pesquisas e abertura de modal.
- `components/articles/ArticleModal.tsx` — Modal do artigo (bloqueio de scroll, escape para fechar).
- `lib/supabase/client.ts` e `lib/supabase/server.ts` — Stubs/no-op que previnem falhas de build quando o Supabase não está configurado.
- `next.config.mjs` — Customização do output do webpack (corrige caminho dos server chunks em produção).
- `middleware.ts` — Proteção de rotas (`/admin`) usando sessão Supabase quando existir.

## Dependências principais

- `next` (App Router) — framework servidor/cliente (Next.js 14+ recomendado).
- `react` / `react-dom` — UI.
- `typescript` — tipagem.
- `tailwindcss` + `postcss` — estilos utilitários.
- `@supabase/supabase-js` + `@supabase/ssr` — cliente para integração com Supabase (atualmente guardado por stubs).
- `vitest` + `@testing-library/react` — testes unitários e de integração leve.
- `framer-motion` — animações (opcional para efeitos mais ricos).
- `lucide-react` — ícones.
- `zod`, `react-hook-form` — validação e formulários.

Consulte o `package.json` para a lista completa e versões travadas.

## Scripts úteis

Use os comandos definidos no `package.json`:

```bash
npm run dev     # desenvolvimento (porta 3001 por padrão neste projeto)
npm test        # executa Vitest
npm run build   # gera build de produção
npm start       # inicia servidor de produção (após build)
npm run clean   # remove .next/ (artefatos de build)
```

## Notas técnicas importantes

- Supabase stubs: para permitir build/SSG/SSR sem chaves, `lib/supabase` expõe funções mínimas usadas pela app (ex.: `auth.signInWithPassword`, `auth.getUser`, `from().select()`). Para ativar Supabase real, remova/ajuste os stubs e configure as variáveis de ambiente (ver seção abaixo).

- Correção de server chunks: em algumas máquinas/ambientes, a runtime do servidor procurava chunks no caminho errado e provocava erro "missing module / __webpack_modules__ not a function". O ajuste em `next.config.mjs` força os server chunk filenames para `.next/server/chunks/...` e resolve o problema. Se ocorrer o erro, rodar `npm run clean` e rebuild normalmente resolve em dev.

- App Router e componentes cliente/servidor: use `"use client"` em componentes que dependem de hooks, estado ou efeitos (ex.: `CockpitSidebar` é client). Prefira server components quando possível para performance.

- Bloqueio de scroll em modal: `ArticleModal` aplica lock de scroll ao abrir — cuidado ao testar através de snapshots, simule a abertura corretamente.

- Gate local: `app/page.tsx` contém um mecanismo simples com senha `p-47` para permitir acesso rápido ao preview sem Supabase. Troque por fluxo real de auth quando integrar Supabase.

## Como ativar Supabase real

1. Remova os stubs em `lib/supabase` ou substitua a inicialização pelo cliente real:

```ts
// exemplo básico (server/client conforme necessidade)
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
export default supabase
```

2. Adicione as variáveis de ambiente em `.env` (crie a partir de `.env.example`):

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=public-anon-key-or-service-role-key
```

3. Ajuste chamadas server/client conforme `@supabase/ssr` quando fizer renderização no servidor.

## Executando testes

```bash
npm test
```

O repositório inclui um teste smoke inicial com Vitest. Adicione testes unitários para componentes interativos e testes de integração para fluxos como abrir o modal, navegação e autenticação.

## Build e deploy

- Antes de gerar build de produção, execute `npm run clean` para garantir que não existam artefatos antigos.
- Se houver o erro de chunk em produção, verifique `next.config.mjs` e confirme que o servidor está iniciando o build direto do diretório do projeto (sem reescrever paths).
- Para deploy: plataformas suportadas (Vercel, Netlify com adapter, ou Docker). Para Docker, gere o build e exponha a porta configurada.

## Troubleshooting rápido

- Erro "__webpack_modules__[moduleId] is not a function" — limpar `.next` e rebuild; confirmar `next.config.mjs` presente.
- Erros de import do Supabase durante build — verifique se está usando apenas funções disponíveis no ambiente (Edge vs Node) e considere mover inicialização para runtime/server-side.

## Como contribuir

- Siga o estilo de arquivos existentes: componentes em `components/`, estilos em `app/globals.css`.
- Adicione testes para todo comportamento novo.
- Abra PRs pequenos e descritivos; use mensagens claras e inclua `CHANGELOG` entry quando fizer alterações visíveis.

## Contato e agradecimentos

- Autor / contato no repositório.
- Este documento foi gerado como complemento técnico ao `README.md` para facilitar entendimento do código por desenvolvedores e clientes.

## Login com Gmail (futuro)

Planejar suporte a login via Gmail (Google OAuth) é uma prioridade natural para melhorar onboarding e permitir login social. Opções e passos recomendados:

- Abordagem com Supabase OAuth:
  1. Registre a aplicação no [Google Cloud Console] e configure a OAuth Consent Screen.
 2. Crie credenciais OAuth (Client ID / Client Secret) e adicione os redirect URIs necessários (ex.: `https://<seu-dominio>/.auth/callback` ou conforme Supabase).
 3. No painel do Supabase, habilite o provedor Google e cole as credenciais.
 4. No frontend, inicie o fluxo: `supabase.auth.signInWithOAuth({ provider: 'google' })`.
 5. Trate o callback no backend e implemente account-linking para usuários que já tenham contas locais.

- Alternativa com NextAuth (`next-auth`):
  - Use o Provider Google oficial; gerencia sessions, callbacks e possibilidade de adaptar tokens.

Considerações de segurança e UX:

- Use scopes mínimos (`email`, `profile`) e verifique o consent screen para produção.
- Em produção, armazene secrets em variáveis de ambiente (GitHub Actions secrets / Vercel env) e nunca exponha `service_role` keys no cliente.
- Planeje account linking e reconciliamento de perfis para evitar duplicidade de contas.
- Teste fluxo em múltiplos ambientes (localhost, staging, produção) e ajuste os redirect URIs conforme necessário.

---

Se quiser, eu adapto o título (ex.: `Explicação técnica do projeto.md`) ou acrescento um índice com links para cada seção.
