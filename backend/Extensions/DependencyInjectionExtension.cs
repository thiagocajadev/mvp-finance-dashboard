using FinanceDashboard.Api.Features.Accounts;
using FinanceDashboard.Api.Features.Goals;
using FinanceDashboard.Api.Features.Transactions;
using FinanceDashboard.Api.Infra;

namespace FinanceDashboard.Api.Extensions;

public static class DependencyInjectionExtension
{
  public static IServiceCollection AddApplicationServices(this IServiceCollection services)
  {
    services.AddSingleton<MockDataService>();

    services.AddScoped<GetAllAccountsHandler>();
    services.AddScoped<GetAccountsSummaryHandler>();
    services.AddScoped<GetAllTransactionsHandler>();
    services.AddScoped<GetAllGoalsHandler>();

    return services;
  }
}
