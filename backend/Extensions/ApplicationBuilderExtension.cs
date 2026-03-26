using Microsoft.AspNetCore.HttpOverrides;

namespace FinanceDashboard.Api.Extensions;

public static class ApplicationBuilderExtension
{
  public static Task UseDefaultConfiguration(this WebApplication app)
  {
    app.UseForwardedHeaders(new ForwardedHeadersOptions
    {
      ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
    });

    app.UseCorsPolicy();
    app.UseRateLimiting();
    app.UseOpenApiDocs(app.Configuration);
    app.MapHealthChecks("/health");
    app.MapGet("/", () => Results.Redirect("/scalar")).ExcludeFromDescription();
    app.MapApiEndpoints();

    return Task.CompletedTask;
  }
}
