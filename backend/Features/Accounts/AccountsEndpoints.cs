namespace FinanceDashboard.Api.Features.Accounts;

public static class AccountsEndpoints
{
  public static void MapAccountsEndpoints(this WebApplication app)
  {
    var group = app.MapGroup("/api/v1/accounts").WithTags("Contas");

    group.MapGet("/", (GetAllAccountsHandler handler) => handler.HandleAsync())
      .WithName("ListarContas")
      .WithSummary("Lista todas as contas")
      .WithDescription("Retorna todas as contas cadastradas, incluindo nome, tipo e saldo atual em BRL (R$).");

    group.MapGet("/summary", (GetAccountsSummaryHandler handler) => handler.HandleAsync())
      .WithName("ResumoDeContas")
      .WithSummary("Resumo do saldo total")
      .WithDescription("Retorna o saldo consolidado de todas as contas, somando os valores individuais em BRL (R$).");
  }
}
