using FinanceDashboard.Api.Features.Accounts;
using FinanceDashboard.Api.Features.Goals;
using FinanceDashboard.Api.Features.Transactions;

namespace FinanceDashboard.Api.Extensions;

public static class EndpointExtension
{
  public static WebApplication MapApiEndpoints(this WebApplication app)
  {
    app.MapAccountsEndpoints();
    app.MapTransactionsEndpoints();
    app.MapGoalsEndpoints();
    return app;
  }
}
