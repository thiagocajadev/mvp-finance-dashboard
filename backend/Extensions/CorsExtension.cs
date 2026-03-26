using FinanceDashboard.Api.Models.Options;

namespace FinanceDashboard.Api.Extensions;

public static class CorsExtension
{
  private const string PolicyName = "AllowFrontend";

  public static IServiceCollection AddCorsPolicy(this IServiceCollection services, IConfiguration configuration)
  {
    services.Configure<CorsOptions>(configuration.GetSection("Cors"));

    var origin = configuration["Cors:Origin"] ?? string.Empty;

    services.AddCors(options =>
    {
      options.AddPolicy(PolicyName, policy =>
        policy
          .WithOrigins(origin)
          .AllowAnyMethod()
          .AllowAnyHeader());
    });

    return services;
  }

  public static WebApplication UseCorsPolicy(this WebApplication app)
  {
    app.UseCors(PolicyName);
    return app;
  }
}
