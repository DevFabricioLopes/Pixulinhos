# Pixulinhos 🧸   https://pixulinhos.vercel.app/

E-commerce infantil moderno, desenvolvido com **React + TypeScript + Vite**, com arquitetura preparada para operação real e gerenciamento de conteúdo por painel administrativo.

> **Status:** desenvolvimento ativo · produção preparada para Vercel · CI validado no GitHub Actions

---

## Visão geral

O Pixulinhos foi estruturado para separar a experiência da loja pública da camada de administração. O objetivo é permitir que o conteúdo comercial seja gerenciado pelo **CMS administrativo**, persistido no **Supabase** e disponibilizado para o site sem depender de alterações manuais no código para cada banner, produto, categoria ou mídia.

### Principais módulos do CMS

- 📊 Dashboard administrativo
- 🛍️ Produtos
- 🗂️ Categorias
- 🖼️ Banners
- ❤️ Conteúdo "Inspire-se"
- ✨ Looks completos / bundles
- ⭐ Avaliações
- ❓ FAQ
- 🏠 Home Builder
- 📁 Gerenciador de mídias
- 🔎 SEO e configurações para Google
- ⚙️ Configurações gerais da loja

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 19 + TypeScript |
| Build | Vite 6 |
| Estilos | Tailwind CSS |
| Ícones | Lucide React |
| Backend / Database | Supabase |
| Autenticação administrativa | Supabase Auth |
| Storage | Supabase Storage |
| Versionamento | Git + GitHub |
| Deploy | Vercel |
| CI | GitHub Actions |

---

## Arquitetura de dados

O projeto utiliza o Supabase como camada persistente para os dados gerenciáveis pelo CMS.

O `cmsStore` funciona como camada de acesso do frontend e mantém `localStorage` como **cache/fallback**, permitindo que o projeto continue resiliente durante indisponibilidades temporárias do backend.

Fluxo conceitual:

```text
Painel Administrativo
        │
        ▼
     cmsStore
        │
        ├──────────────► Supabase
        │                  ├─ Database
        │                  ├─ Auth
        │                  └─ Storage
        │
        └──────────────► localStorage (cache/fallback)
                              │
                              ▼
                         Loja Pública
```

A intenção é que alterações feitas pelo painel sejam persistidas no banco, enquanto o GitHub permanece como fonte de versionamento do **código e da infraestrutura do projeto**.

---

## Segurança

A autenticação administrativa utiliza **Supabase Auth**. As operações de escrita do CMS devem ser protegidas por políticas de **Row Level Security (RLS)** e permissões administrativas no banco.

### Regra importante

**Nunca coloque credenciais administrativas, service-role keys ou senhas diretamente no código-fonte.**

Variáveis de ambiente devem ser utilizadas para configuração do projeto. O arquivo `.env` local não deve ser versionado.

Exemplo:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
```

> A `anon key` é destinada ao frontend e deve operar sob as políticas RLS configuradas no Supabase. A `service_role key` nunca deve ser exposta no navegador.

---

## Desenvolvimento local

### Pré-requisitos

- Node.js 20+
- npm
- projeto Supabase configurado

### Instalação

```bash
npm install
```

### Configuração

Crie um `.env.local` baseado no `.env.example` e configure as variáveis públicas do Supabase.

### Executar em desenvolvimento

```bash
npm run dev
```

O Vite disponibilizará a aplicação localmente.

---

## Validação antes de produção

O projeto possui CI no GitHub Actions para validar o código antes de ser considerado pronto para publicação.

Comandos principais:

```bash
npm run lint
npm run build
```

O pipeline deve terminar com sucesso antes de uma versão ser promovida para produção.

---

## Deploy na Vercel

O fluxo recomendado é:

```text
GitHub (main)
      │
      ▼
    Vercel
      │
      ▼
  Build Vite
      │
      ▼
Pixulinhos em produção
      │
      └──────► Supabase
```

Na Vercel, configure as mesmas variáveis públicas necessárias ao frontend, especialmente:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Depois do deploy, valide obrigatoriamente:

- acesso à loja pública;
- autenticação do painel administrativo;
- leitura de produtos e categorias;
- criação/edição de conteúdo;
- upload e leitura de mídias;
- banners;
- persistência após sair e entrar novamente;
- comunicação com o Supabase.

---

## Estrutura principal

```text
Pixulinhos/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   └── ...
│   ├── data/
│   ├── lib/
│   ├── services/
│   │   └── cmsStore.ts
│   ├── types/
│   └── ...
├── supabase/
│   └── migrations/
├── assets/
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Princípios do projeto

### 1. CMS-first

O conteúdo comercial deve ser administrável pelo painel sempre que tecnicamente possível, evitando alterações manuais no código para tarefas operacionais.

### 2. Persistência real

Dados administrados pelo CMS devem ser persistidos no Supabase, não depender exclusivamente do `localStorage` do navegador.

### 3. Código versionado

Toda alteração estrutural de código deve permanecer no GitHub para permitir auditoria, rollback e recuperação do projeto.

### 4. Segurança por camadas

Frontend, autenticação, banco, RLS e Storage devem trabalhar juntos. Segurança não deve depender de uma senha hardcoded no JavaScript.

### 5. Deploy reproduzível

A produção deve ser construída a partir da `main`, com validação automática pelo GitHub Actions.

### 6. Alterações cirúrgicas

Mudanças futuras devem preservar funcionalidades existentes e evitar refatorações desnecessárias em áreas que não fazem parte do objetivo da alteração.

---

## Banco de dados

As migrações do Supabase ficam versionadas no repositório em:

```text
supabase/migrations/
```

Isso permite manter o código e a estrutura necessária do banco documentados junto ao projeto.

Antes de aplicar uma migração destrutiva em produção, revise cuidadosamente o SQL e faça backup quando necessário.

---

## Git workflow

Fluxo recomendado:

```text
feature/fix branch
       │
       ▼
GitHub Actions
       │
   lint + build
       │
       ▼
Pull Request
       │
       ▼
main
       │
       ▼
Vercel
```

Evite desenvolver diretamente na `main` quando a alteração tiver impacto relevante. Use branches e Pull Requests para manter histórico, revisão e rollback seguros.

---

## Estado atual

- ✅ Aplicação React/Vite estruturada
- ✅ TypeScript
- ✅ Painel administrativo modular
- ✅ Integração Supabase
- ✅ Supabase Auth para administração
- ✅ Persistência CMS preparada
- ✅ Migrações versionadas
- ✅ GitHub Actions com lint + build
- ✅ `main` validada pelo CI
- ⏳ Deploy final na Vercel
- ⏳ Validação funcional completa em produção

---

## Licença

Projeto privado/comercial de propriedade de **DevFabricioLopes / Pixulinhos**. Uso, redistribuição ou reutilização do código deve ser autorizado pelo proprietário do projeto.

---

## Autor

**DevFabricioLopes**  
Pixulinhos — E-commerce infantil

---


