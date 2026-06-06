# Rastro de Fumaça — Guia Prático de Desenvolvimento

![License](https://img.shields.io/badge/License-MIT-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Release](https://img.shields.io/github/v/release/Joshpcbrrj/rastro-de-fumaca?label=Release&color=blue)

[📘 Explicação técnica do projeto](doc/Explicacao-tecnica-do-projeto.md)

## 📦 Release

- Versão inicial: [v0.1.0](https://github.com/Joshpcbrrj/rastro-de-fumaca/releases/tag/v0.1.0) — arquivo anexado: `rastro-de-fumaca-v0.1.0.zip` (baixar na página de Releases).

### Como usar o ZIP da release

- Baixe `rastro-de-fumaca-v0.1.0.zip` na página de Releases.
- Extraia em uma pasta local:

```bash
unzip rastro-de-fumaca-v0.1.0.zip -d rastro-de-fumaca-v0.1.0
cd rastro-de-fumaca-v0.1.0
```

- Instale dependências e rode em modo de desenvolvimento:

```bash
npm install
npm run dev
```

- Para gerar o build de produção:

```bash
npm run build
npm start
```

Observação: no Windows você pode usar o Explorador para extrair o ZIP ou `tar -xf` em terminais que suportem tar.

## Sumário

- [🖥️ Demonstração](#demonstração)
- [Uso rápido](#uso-rápido)
- [Acesso restrito](#acesso-restrito)
- [Scripts principais](#scripts-principais)
- [Modificações feitas](#modificações-feitas)
- [Change log](#change-log)
- [Roadmap](#roadmap)
- [Agradecimentos](#agradecimentos)

## 🖥️ Demonstração

<div align="center">

| Desktop (web) | Mobile |
|:-------------:|:------:|
| ![Web preview](./doc/img_projeto_web.png) | ![Mobile preview](./doc/img_projeto_mobile.png) |

*Capturas de tela: preview web (esquerda) e versão mobile (direita).* 

---

</div>

## Uso rápido

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Rode o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Abra no navegador:
   ```
   http://localhost:3001
   ```
4. Para rodar o build de produção:
   ```bash
   npm run build
   ```
5. Para testar:
   ```bash
   npm test
   ```
6. Para limpar artefatos antigos:
   ```bash
   npm run clean
   ```

## Acesso restrito

- A senha inicial usada na tela de entrada é: `p-47`
- Esse acesso está implementado no arquivo `app/page.tsx` como proteção local para a página inicial.

## Scripts principais

- `npm run dev` — inicia o servidor Next.js em desenvolvimento na porta `3001`
- `npm run build` — limpa e gera o build de produção
- `npm run clean` — remove a pasta `.next`
- `npm test` — executa o Vitest e valida os testes smoke do projeto

## Modificações feitas

- Projetado com **Next.js 14 App Router** + **TypeScript** + **Tailwind CSS**
- Adicionada proteção de build com guard `Supabase` para evitar falha em Edge/runtime
- Implementado login local de senha e intro cinemática em `app/page.tsx`
- Inseridos componentes de layout e preview: sidebar, radar, hero, artigos e modal
- Adicionado `next.config.mjs` para corrigir nome de chunks de servidor em produção
- Criado `.gitignore` com regras padrão para Next.js/Node
- Incluído `Vitest` e testes iniciais em `tests/`
- Convertido o guia original para `README.md` com documentação compartilhável

Observações das modificações recentes:
- Adicionados guards (noop stubs) para clientes Supabase durante build/prerender.
- Tailwind + estilos globais organizados em `app/globals.css`.
- Testes iniciais adicionados em `tests/` (Vitest + checks node).
- Documento original movido para este `README.md` para facilitar compartilhamento.

> Se o build ou o dev travar por causa de artefatos antigos, remova a pasta `.next` e reinicie o comando.
>
> Exemplo:
> ```bash
> rm -rf .next
> npm run build
> ```


# Guia Prático de Desenvolvimento — Rastro de Fumaça
* Projeto: Rastro de Fumaça — Plataforma Histórica da Aviação Brasileira
* Cliente: Joaquim Vivas
* Abordagem: Desenvolvimento manual passo a passo no VS Code
* Tecnologias: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Supabase
* Base de partida: Preview HTML funcional (você já tem o arquivo)

## **Índice de Etapas**

| **Etapa** | **Descrição** | **Tempo estimado** |
| --- | --- | --- |
| 0 | Setup do ambiente e criação do projeto | 20 min |
| 1 | Configuração do Tailwind e tema visual | 30 min |
| 2 | Migração do layout base (CockpitSidebar + estrutura) | 1h |
| 3 | Migração das animações e estilos especiais | 1h |
| 4 | Componentes da Home (Hero, Radar, P-47) | 1h30 |
| 5 | Componentes de conteúdo (Cards, Modal, Artigos) | 1h30 |
| 6 | Dados mockados e páginas dinâmicas | 1h |
| 7 | Autenticação com Supabase | 1h30 |
| 8 | Painel administrativo (CRUD) | 2h |
| 9 | Deploy e ajustes finais | 1h |

**Total estimado:** 10-12 horas (pode variar conforme sua familiaridade)
  
## **Contribuição e instalação**

### ✅ Requisitos

- Node.js `>= 18.17.0`
- npm `>= 10`
- Alternativas compatíveis: `yarn`, `pnpm`

### 🚀 Como clonar

```bash

cd "Projeto site do bruno"
```

## **Etapa 1: Configuração do Tailwind e tema visual**

- Certifique-se de que `tailwind.config.ts` aponta para os diretórios `app/` e `components/`.
- Verifique se `app/globals.css` inclui as diretivas `@tailwind base;`, `@tailwind components;` e `@tailwind utilities;`.
- Use este passo para revisar o tema visual do projeto antes de prosseguir.

## **Etapa 2: Estrutura do layout e navegação**

- O arquivo `app/layout.tsx` define o layout raiz e importa `app/globals.css`.
- O `body` deve incluir classes de cor, tipografia e estilo base como `bg-navy-950 text-paper-100`.
- Adicione a sidebar responsiva em `components/layout/CockpitSidebar.tsx`.
- Inclua suporte a menu mobile e navegação por seções.
- A página principal `app/page.tsx` carrega o gate local e a composição da home.

## **Etapa 3: Componentes de interface e animações**

- `components/home/HeroRadar.tsx` exibe o hero principal com radar animado.
- `components/home/FeaturedResearch.tsx` mostra cards de pesquisa e abre artigos em modal.
- `components/home/CinematicIntro.tsx` implementa a intro cinematográfica com progresso e skip.
- `components/articles/ArticleModal.tsx` gerencia o modal, bloqueio de scroll e escape para fechar.

## **Etapa 4: Autenticação e fluxo de acesso**

- O app tem um gate de senha local em `app/page.tsx` com a senha `p-47`.
- Esse mecanismo permite testar o acesso sem Supabase enquanto a integração real é desenvolvida.
- O fluxo é:
  1. O usuário abre a página.
  2. Digita a senha.
  3. Se correta, o conteúdo é exibido.

## **Etapa 5: Suporte Supabase para build e fallback**

- A pasta `lib/supabase` inclui stubs que evitam falhas de build quando o Supabase não está configurado.
- `lib/supabase/client.ts` e `lib/supabase/server.ts` expõem funções mínimas como `auth.signInWithPassword`, `auth.getUser` e `from().select()`.
- Essa estrutura permite compilar e rodar localmente enquanto a autenticação real é preparada.

## **Etapa 6: Testes e validação**

- O projeto usa Vitest para testes iniciais de smoke e de configuração.
- Execute `npm test` para validar que o ambiente está consistente.
- Adicione testes adicionais para componentes, fluxo e modais.

## **Etapa 7: Build e produção**

- Use `npm run build` para gerar o build de produção.
- Antes de rodar o build, execute `npm run clean` para remover artefatos antigos.
- O `next.config.mjs` inclui ajuste de chunks de servidor para evitar erros em produção.

## **Etapa 8: Colaboração e instalação**

- Clone o repositório para o seu computador.
- Instale as dependências com `npm install`, `yarn install` ou `pnpm install`.
- Use `npm run dev` para desenvolvimento, `npm run build` para produção e `npm test` para validar.

### 🔧 Instalação de dependências

```bash
npm install
```

Se preferir outro gerenciador de pacotes:

```bash
yarn install
```

ou

```bash
pnpm install
```

> Use `npm ci` em ambientes de CI para instalar exatamente as versões bloqueadas em `package-lock.json`.

### ▶️ Executando localmente

```bash
npm run dev
```

Abra no navegador:

```text
http://localhost:3001
```

### 🧪 Executando testes

```bash
npm test
```

### 📦 Build de produção

```bash
npm run build
npm start
```

### 🧹 Limpeza de artefatos

```bash
npm run clean
```

### 📝 Variáveis de ambiente

- Se o projeto precisar de variáveis no futuro, copie:
  ```bash
  cp .env.example .env
  ```
- Preencha as chaves necessárias.
- Atualmente o app funciona localmente sem Supabase configurado porque existem guards de build.

## **Change log**

- ✅ Projeto inicial configurado com **Next.js + TypeScript + Tailwind**
- ✅ Acesso protegido por senha local implementado (`p-47`)
- ✅ `next.config.mjs` adicionado para correção de chunks em produção
- ✅ `.gitignore` criado para Next.js / Node
- ✅ `Vitest` integrado com testes smoke iniciais
- ✅ Documentação consolidada em `README.md` para onboarding e colaboração

## **Roadmap**

- Finalizar páginas de admin e login
- Substituir o acesso local de senha por autenticação real via Supabase
- Adicionar conteúdo real ao acervo, imagens e artigos
- Refatorar estilos do preview para maior fidelidade visual
- Implementar testes adicionais para componentes, fluxo e navegação

## **Agradecimentos**

- Projeto desenvolvido com **Vive Code**.
- Ajuda de IA utilizada:
  - **GitHub Copilot** (Raptor mini Preview) para sugestões de código e revisão
- Obrigado por colaborar! Use este README como guia principal para clonar, configurar e rodar o projeto com consistência.
