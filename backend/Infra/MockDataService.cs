using FinanceDashboard.Api.Common;
using FinanceDashboard.Api.Models;

namespace FinanceDashboard.Api.Infra;

public class MockDataService
{
  public Task<Result<List<Account>>> GetAccountsAsync() => Task.FromResult(Result<List<Account>>.Ok(
  [
    new() { Id = Guid.CreateVersion7(), Name = "Poupança Principal", Type = "pessoal", Balance = 8459.45m },
    new() { Id = Guid.CreateVersion7(), Name = "Conta Corrente", Type = "dia-a-dia", Balance = 2850.00m },
    new() { Id = Guid.CreateVersion7(), Name = "Carteira de Ações", Type = "investimento", Balance = 15230.80m },
    new() { Id = Guid.CreateVersion7(), Name = "Cartão de Crédito", Type = "crédito", Balance = 1200.00m },
    new() { Id = Guid.CreateVersion7(), Name = "Reserva de Emergência", Type = "emergência", Balance = 3000.00m },
  ]));

  public Task<Result<List<Transaction>>> GetTransactionsAsync() => Task.FromResult(Result<List<Transaction>>.Ok(
  [
    new() { Id = Guid.CreateVersion7(), Name = "Compra Apple Store", Amount = -999.00m, Date = Utc.Now, Category = "compras" },
    new() { Id = Guid.CreateVersion7(), Name = "Depósito de Salário", Amount = 4500.00m, Date = Utc.Now, Category = "renda" },
    new() { Id = Guid.CreateVersion7(), Name = "Assinatura Netflix", Amount = -55.90m, Date = Utc.Now.AddDays(-1), Category = "serviços" },
    new() { Id = Guid.CreateVersion7(), Name = "Assinatura Supabase", Amount = -89.90m, Date = Utc.Now.AddDays(-1), Category = "serviços" },
    new() { Id = Guid.CreateVersion7(), Name = "Assinatura Vercel", Amount = -110.00m, Date = Utc.Now.AddDays(-2), Category = "serviços" },
  ]));

  public Task<Result<List<Goal>>> GetGoalsAsync() => Task.FromResult(Result<List<Goal>>.Ok(
  [
    new() { Id = Guid.CreateVersion7(), Name = "Reserva de Emergência", Description = "3 meses de despesas guardados", Target = 15000m, Current = 9750m, Status = "em-andamento" },
    new() { Id = Guid.CreateVersion7(), Name = "Carteira de Ações", Description = "Plano de investimento em tecnologia", Target = 50000m, Current = 15000m, Status = "pendente" },
    new() { Id = Guid.CreateVersion7(), Name = "Quitação de Dívida", Description = "Plano de pagamento de financiamento", Target = 25000m, Current = 11250m, Status = "em-andamento" },
  ]));
}
