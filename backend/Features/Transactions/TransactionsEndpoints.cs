namespace FinanceDashboard.Api.Features.Transactions;

public static class TransactionsEndpoints
{
  public static void MapTransactionsEndpoints(this WebApplication app)
  {
    var group = app.MapGroup("/api/v1/transactions").WithTags("Transações");

    group.MapGet("/", (GetAllTransactionsHandler handler) => handler.HandleAsync())
      .WithName("ListarTransações")
      .WithSummary("Lista todas as transações")
      .WithDescription("Retorna todas as transações ordenadas por data (mais recente primeiro). Valores negativos representam saídas e positivos representam entradas, em BRL (R$).");
  }
}
