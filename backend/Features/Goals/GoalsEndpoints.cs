namespace FinanceDashboard.Api.Features.Goals;

public static class GoalsEndpoints
{
  public static void MapGoalsEndpoints(this WebApplication app)
  {
    var group = app.MapGroup("/api/v1/goals").WithTags("Metas");

    group.MapGet("/", (GetAllGoalsHandler handler) => handler.HandleAsync())
      .WithName("ListarMetas")
      .WithSummary("Lista todas as metas financeiras")
      .WithDescription("Retorna todas as metas financeiras com nome, descrição, valor alvo, valor atual e status (pendente, em-andamento, concluída). Valores em BRL (R$).");
  }
}
