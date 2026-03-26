using Serilog;

namespace FinanceDashboard.Api.Extensions;

public static class WebApplicationBuilderExtension
{
  public static WebApplicationBuilder AddDefaultConfiguration(this WebApplicationBuilder builder)
  {
    builder.Host.UseSerilog((context, configuration) =>
      configuration.ReadFrom.Configuration(context.Configuration));

    builder.Services.AddCorsPolicy(builder.Configuration);
    builder.Services.AddOpenApiDocs(builder.Configuration);
    builder.Services.AddHealthChecks();
    builder.Services.AddRateLimiting();
    builder.Services.AddApplicationServices();

    return builder;
  }
}
