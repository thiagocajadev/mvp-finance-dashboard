using Scalar.AspNetCore;

namespace FinanceDashboard.Api.Extensions;

public static class OpenApiExtension
{
  public static IServiceCollection AddOpenApiDocs(this IServiceCollection services, IConfiguration configuration)
  {
    services.AddOpenApi(options =>
    {
      options.AddDocumentTransformer((document, context, cancellationToken) =>
      {
        document.Info.Title = "Finance Dashboard API";
        document.Info.Version = "v1";
        document.Info.Description = "MVP portfolio — mock finance data.";
        return Task.CompletedTask;
      });
    });

    return services;
  }

  public static WebApplication UseOpenApiDocs(this WebApplication app, IConfiguration configuration)
  {
    app.MapOpenApi();

    var publicUrl = configuration["PUBLIC_URL"];

    app.MapScalarApiReference(options =>
    {
      if (!string.IsNullOrEmpty(publicUrl))
      {
        options.Servers = [new ScalarServer(publicUrl)];
      }
    });

    return app;
  }
}
