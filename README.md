<div align="center">

# Finance Dashboard

**MVP de painel financeiro pessoal — projeto de portfólio**

[![.NET](https://img.shields.io/badge/.NET_10-512BD4?style=flat-square&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![C#](https://img.shields.io/badge/C%23_14-239120?style=flat-square&logo=csharp&logoColor=white)](https://learn.microsoft.com/dotnet/csharp/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

**[finance.thiagocaja.dev](https://finance.thiagocaja.dev/)**

</div>

---

## Sobre o projeto

Finance Dashboard é um MVP de painel financeiro pessoal desenvolvido como projeto de portfólio. O objetivo é demonstrar domínio de boas práticas de engenharia de software — desde o design de API até a organização de código — em uma stack moderna e profissional.

O sistema consolida contas bancárias, histórico de transações e metas financeiras em uma interface única, com API RESTful e frontend reativo.

> Este projeto é um MVP. O foco está em arquitetura limpa e boas práticas, não em volume de funcionalidades.

| | Link |
|---|---|
| Frontend (produção) | [finance.thiagocaja.dev](https://finance.thiagocaja.dev/) |
| API Backend | [thiagocajadev-mvp-finance-dashboard-api.onrender.com](https://thiagocajadev-mvp-finance-dashboard-api.onrender.com) |

---

## Stack

### Backend

| Tecnologia               | Versão | Papel                           | Obs                                 |
| ------------------------ | ------ | ------------------------------- | ----------------------------------- |
| .NET                     | 10     | Runtime                         | —                                   |
| C#                       | 14     | Linguagem                       | —                                   |
| ASP.NET Core Minimal API | 10     | Framework HTTP                  | —                                   |
| PostgreSQL               | 17     | Banco de dados                  | Planejado — dados em memória (mock) |
| Serilog                  | 10     | Logging estruturado             | —                                   |
| Scalar                   | 2.x    | Documentação OpenAPI interativa | —                                   |

### Frontend

| Tecnologia               | Versão | Papel                 |
| ------------------------ | ------ | --------------------- |
| React                    | 19     | UI framework          |
| TypeScript               | 5      | Tipagem estática      |
| Vite                     | 6      | Build tool            |
| TanStack Query           | 5      | Data fetching & cache |
| Zustand                  | 5      | Estado global mínimo  |
| React Hook Form + Zod    | 7 / 3  | Formulários tipados   |
| shadcn/ui + Tailwind CSS | —      | Componentes e estilos |
| Axios                    | 1.x    | Cliente HTTP          |
| React Router             | 7      | Roteamento            |

---

## Arquitetura

### Conceitos e boas práticas aplicados

| #   | Prática                                                                                  | Onde                                      |
| --- | ---------------------------------------------------------------------------------------- | ----------------------------------------- |
| ✅  | **Vertical Slice** — código organizado por feature, não por camada                       | Backend e frontend                        |
| ✅  | **Handler Pattern** — orquestrador + funções locais nomeadas                             | `Features/*/`                             |
| ✅  | **Step-Down Narrative** — lê-se de cima pra baixo como uma história                      | Todos os handlers                         |
| ✅  | **Direct Return** — sem variáveis intermediárias desnecessárias                          | `HandleAsync()`                           |
| ✅  | **Envelope de resposta unificado** — mesmo shape em sucesso e erro                       | `ApiResponse<T>`                          |
| ✅  | **Static factory DTO** — `From(entity)` em todos os response records                     | `AccountResponse`, etc.                   |
| ✅  | **IOptions pattern** — zero string literal para configuração                             | `CorsOptions`                             |
| ✅  | **Rate Limiting** — 60 req/min por IP, nativo do .NET                                    | `RateLimitExtension`                      |
| ✅  | **CORS configurável por ambiente** — origin via `appsettings.json`                       | `CorsExtension`                           |
| ✅  | **Logging estruturado** — nível configurável por ambiente                                | arquivo de configuração                   |
| ✅  | **UTC centralizado** — `Utc.Now` substitui `DateTime.Now` em todo o código               | `Common/Utc.cs`                           |
| ✅  | **Nomes expressivos** — variáveis descrevem resultado, não tipo                          | Convenção global                          |
| ✅  | **OpenAPI interativo** — documentação viva via Scalar                                    | `/scalar`                                 |
| ✅  | **Health check** — endpoint padrão para orquestração e monitoramento                     | `/health`                                 |
| ✅  | **Result pattern** — erros como valor, sem exceptions de fluxo; early return no handler  | `Models/Result.cs`, `ApiResults.MapError` |
| ✅  | **Layered API client** — único ponto Axios; interceptor extrai `.data` e normaliza erros | `src/lib/api/client.ts`                   |
| ✅  | **Hook orquestrador** — componente só tem JSX; lógica e fetching vivem no hook            | `features/*/hooks/`                       |
| ✅  | **TanStack Query** — cache, loading states e invalidação sem `useEffect` + `fetch`        | `features/*/queries/`                     |
| ✅  | **Zustand com persist** — dark mode persistido no localStorage via middleware             | `app/theme-store.ts`                      |
| ✅  | **Dark mode** — suporte completo com Tailwind `dark:` e toggle via store                 | `Header`, `AppLayout`                     |
| ✅  | **Typed services** — cada feature expõe seus endpoints tipados, sem Axios nos componentes | `features/*/services/`                    |
| ✅  | **index.ts por feature** — imports cruzados pelo barrel, nunca por caminho interno        | `features/*/index.ts`                     |
| 🔜  | **JWT via cookie HttpOnly** — token sem exposição ao JavaScript                          | Planejado                                 |
| 🔜  | **RBAC** — controle de acesso por papel de usuário                                       | Planejado                                 |
| 🔜  | **FluentValidation** — validação de request sem DataAnnotations                          | Planejado                                 |

---

### Vertical Slice (backend)

O código é organizado por **feature**, não por camada técnica. Cada domínio é autossuficiente — handler, DTOs e endpoints vivem no mesmo lugar:

```
❌  controllers/  services/  repositories/  models/   ← horizontal, fragmentado
✓   features/Accounts/                                ← vertical, coeso
✓   features/Transactions/
✓   features/Goals/
```

Isso facilita encontrar, entender e modificar qualquer parte do sistema sem navegar por múltiplas pastas.

### Handler Pattern (backend)

Cada endpoint tem um handler dedicado com responsabilidade única. O método público é um **orquestrador**: lê como uma narrativa de cima pra baixo, delegando cada passo a funções locais nomeadas.

Exemplo real — `GetAccountsSummaryHandler` ([ver arquivo](backend/Features/Accounts/GetAccountsSummaryHandler.cs)):

```csharp
public class GetAccountsSummaryHandler(MockDataService mockData)
{
  public async Task<IResult> HandleAsync()
  {
    return await ProcessGetSummaryAsync();

    // Nível 1: orquestrador — o que acontece, sem detalhes
    async Task<IResult> ProcessGetSummaryAsync()
    {
      var accountsResult = await mockData.GetAccountsAsync();
      if (accountsResult.IsFailure) return ApiResults.MapError(accountsResult); // early return

      var summaryBuilt = BuildSummary(accountsResult.Value!);
      return ApiResults.Ok(BuildResponse(summaryBuilt));
    }

    // Nível 2: detalhes isolados — estáticos, sem acesso ao escopo externo
    static AccountSummaryResponse BuildSummary(List<Account> accounts) => new()
    {
      TotalBalance = accounts.Sum(account => account.Balance),
      AccountCount = accounts.Count,
    };

    static ApiResponse<AccountSummaryResponse> BuildResponse(AccountSummaryResponse summary) => new()
    {
      Status = 200,
      Action = "ACCOUNT_SUMMARY",
      Message = "Account summary retrieved successfully.",
      Data = summary,
    };
  }
}
```

`HandleAsync` tem uma linha. `ProcessGetSummaryAsync` orquestra com early return no `IsFailure`. `BuildSummary` e `BuildResponse` são `static` — provam que não dependem de estado externo e são testáveis isoladamente.

### Entry point (Program.cs)

O `Program.cs` tem três linhas úteis — toda configuração vive nas extensions:

```csharp
DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);
builder.AddDefaultConfiguration();

var app = builder.Build();
await app.UseDefaultConfiguration();

app.Run();
```

`AddDefaultConfiguration` registra serviços (DI, CORS, Rate Limiting, OpenAPI, Serilog). `UseDefaultConfiguration` monta o pipeline (middlewares, endpoints, health check). Nenhuma linha de config vaza para o entry point.

### Camadas do frontend

```
Componente (JSX puro)
  └─ Hook orquestrador (lógica + estado)
       ├─ Query / Mutation (TanStack Query)
       │    └─ Service (endpoints tipados)
       │         └─ client.ts (único ponto de configuração HTTP)
       └─ Store (Zustand) — apenas estado que sobrevive à navegação
```

Cada camada conhece apenas a imediatamente abaixo — sem saltos de abstração.

Exemplo real — `useAccounts` ([ver arquivo](frontend/src/features/accounts/hooks/use-accounts.ts)):

```ts
export function useAccounts() {
  const { data: accountsResponse, isLoading: isLoadingAccounts } = useAccountsQuery()
  const { data: summaryResponse, isLoading: isLoadingSummary } = useAccountSummaryQuery()

  return {
    accounts: accountsResponse?.data ?? [],
    summary: summaryResponse?.data ?? null,
    isLoading: isLoadingAccounts || isLoadingSummary,
  }
}
```

O hook compõe duas queries independentes e entrega ao componente exatamente o que ele precisa — sem `useEffect`, sem `fetch`, sem estado local desnecessário. O componente `AccountsCard` só desestrutura e renderiza.

### Dark mode com Zustand + persist

```ts
// app/theme-store.ts
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        set({ theme: next })
        document.documentElement.classList.toggle('dark', next === 'dark')
      },
    }),
    { name: 'finance-theme' },
  ),
)
```

A preferência de tema persiste entre sessões via `localStorage`. A classe `dark` é aplicada no `documentElement` — Tailwind `dark:` funciona em toda a árvore sem Context Provider.

---

## Estrutura de pastas

```
mvp-finance-dashboard/
│
├── backend/
│   ├── Common/
│   │   └── Utc.cs                      # Helper UTC — substitui DateTime.Now
│   │
│   ├── Extensions/                     # Configuração do pipeline
│   │   ├── WebApplicationBuilderExtension.cs
│   │   ├── ApplicationBuilderExtension.cs
│   │   ├── DependencyInjectionExtension.cs
│   │   ├── EndpointExtension.cs
│   │   ├── CorsExtension.cs
│   │   ├── OpenApiExtension.cs
│   │   └── RateLimitExtension.cs
│   │
│   ├── Features/                       # Domínios da aplicação (vertical slice)
│   │   ├── Accounts/
│   │   │   ├── AccountsEndpoints.cs    # Mapeamento de rotas
│   │   │   ├── GetAllAccountsHandler.cs
│   │   │   ├── GetAccountsSummaryHandler.cs
│   │   │   └── AccountResponse.cs
│   │   ├── Transactions/
│   │   │   ├── TransactionsEndpoints.cs
│   │   │   ├── GetAllTransactionsHandler.cs
│   │   │   └── TransactionResponse.cs
│   │   └── Goals/
│   │       ├── GoalsEndpoints.cs
│   │       ├── GetAllGoalsHandler.cs
│   │       └── GoalResponse.cs
│   │
│   ├── Infra/
│   │   ├── MockDataService.cs          # Dados em memória (MVP)
│   │   ├── Account.cs
│   │   ├── Transaction.cs
│   │   └── Goal.cs
│   │
│   ├── Models/
│   │   ├── ApiResults.cs               # Resultados HTTP padronizados
│   │   ├── Options/
│   │   │   └── CorsOptions.cs
│   │   └── Responses/
│   │       └── ApiResponse.cs          # Envelope de resposta unificado
│   │
│   ├── Program.cs                      # Entry point (3 linhas)
│   ├── GlobalUsings.cs
│   └── appsettings.json
│
└── frontend/
    └── src/
        ├── app/
        │   ├── App.tsx                 # Raiz — aplica providers e router
        │   ├── providers.tsx           # QueryClientProvider
        │   ├── router.tsx              # React Router — rotas da aplicação
        │   └── theme-store.ts          # Zustand + persist — dark mode
        │
        ├── lib/
        │   ├── api/
        │   │   ├── client.ts           # Única instância Axios configurada
        │   │   └── types.ts            # ApiError, toApiError
        │   ├── env.ts                  # Variáveis de ambiente tipadas
        │   └── query-client.ts         # TanStack Query config global
        │
        ├── features/                   # Vertical slice no frontend
        │   ├── accounts/
        │   │   ├── components/         # AccountsCard.tsx
        │   │   ├── hooks/              # use-accounts.ts
        │   │   ├── queries/            # account-queries.ts
        │   │   ├── services/           # account-service.ts
        │   │   ├── types/              # account.types.ts
        │   │   └── index.ts            # barrel — única porta de entrada
        │   ├── transactions/           # RecentTransactions — mesma estrutura
        │   ├── goals/                  # GoalsCard — mesma estrutura
        │   └── dashboard/
        │       └── pages/
        │           └── DashboardPage.tsx
        │
        └── shared/
            ├── components/
            │   └── layout/             # AppLayout, Header, Sidebar
            └── lib/
                └── utils.ts            # cn() helper (clsx + tailwind-merge)
```

---

## Boas práticas

### Contrato de API uniforme

Todas as respostas — sucesso ou erro — seguem o mesmo envelope. O cliente sempre sabe onde encontrar o que precisa:

```json
{
  "status": 200,
  "action": "ACCOUNT_LIST",
  "message": "Contas listadas com sucesso.",
  "data": [ ... ]
}
```

```json
{
  "status": 404,
  "action": null,
  "message": "Conta não encontrada.",
  "data": null
}
```

### Autenticação via cookie HttpOnly

O token JWT trafega exclusivamente em cookie `HttpOnly` — nunca exposto ao JavaScript. Isso elimina a superfície de ataque de XSS sobre o token de sessão.

```
Cookie HttpOnly → backend valida → sem localStorage, sem Authorization header manual
```

### Configuração via IOptions, nunca string bruta

```csharp
// ❌
var origin = _configuration["Cors:Origin"];

// ✓
public class CorsExtension(IOptions<CorsOptions> corsOptions)
{
  private readonly CorsOptions _cors = corsOptions.Value;
}
```

### Rate limiting nativo

60 requisições por minuto por IP via `System.Threading.RateLimiting` — sem dependência externa.

### Logging estruturado com Serilog

Logs em JSON com nível configurável por ambiente — prontos para ingestão em Datadog, Seq ou CloudWatch.

### Datas sempre em UTC

`Utc.Now` centralizado em `Common/Utc.cs` — garante que nenhum `DateTime.Now` ou `DateTimeOffset.Now` escape para o código.

### Nomes que revelam intenção + convenção async/await

Variáveis descrevem o **resultado** da operação, não o tipo. Métodos assíncronos sempre carregam o sufixo `Async` — a assinatura revela o contrato antes mesmo de ler o corpo.

```csharp
// ❌ genérico, sem contexto — variáveis opacas, sem sufixo Async
var result = await repo.FindAsync(id);
var data = ProcessOrder(result);

// ✓ cada variável descreve o que contém; métodos assíncronos têm sufixo Async
var userFound    = await FindActiveUserAsync(request.UserId, cancellationToken);
var orderCreated = await CreateAndPersistOrderAsync(request, userFound, cancellationToken);
var emailSent    = await NotifyUserAsync(userFound, orderCreated, cancellationToken);
```

O sufixo `Async` sinaliza ao leitor que a chamada é assíncrona sem precisar inspecionar a assinatura — e o `await` garante que nenhum resultado é descartado silenciosamente.

---

## Endpoints

| Método | Rota                       | Descrição               |
| ------ | -------------------------- | ----------------------- |
| `GET`  | `/health`                  | Status da aplicação     |
| `GET`  | `/api/v1/accounts`         | Lista todas as contas   |
| `GET`  | `/api/v1/accounts/summary` | Saldo consolidado       |
| `GET`  | `/api/v1/transactions`     | Histórico de transações |
| `GET`  | `/api/v1/goals`            | Metas financeiras       |

A documentação interativa está disponível em `/scalar` após rodar a aplicação. Para inspecionar o JSON bruto do contrato OpenAPI, acesse `/openapi/v1.json`.

---

## Como executar

### Backend

```bash
cd backend
cp .env.example .env   # configurar variáveis de ambiente
dotnet run
```

A API sobe em `http://localhost:5001`. Acesse `/scalar` para a documentação interativa ou `/openapi/v1.json` para o JSON bruto do contrato OpenAPI.

### Frontend

```bash
cd frontend
cp .env.example .env   # configurar variáveis de ambiente
npm install
npm run dev
```

O frontend sobe em `http://localhost:3000`.

---

## Status do projeto

| Área                                       | Status                           |
| ------------------------------------------ | -------------------------------- |
| Backend — endpoints de leitura             | Funcional (dados em memória)     |
| Backend — banco de dados                   | Planejado (PostgreSQL + EF Core) |
| Backend — autenticação JWT                 | Planejado                        |
| Frontend — dashboard (contas, transações, metas) | Funcional                  |
| Frontend — dark mode                       | Funcional                        |
| Deploy — API (Render) + Frontend (Vercel)  | Funcional                        |
