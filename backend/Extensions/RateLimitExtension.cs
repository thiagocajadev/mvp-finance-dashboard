using System.Text.Json;
using System.Threading.RateLimiting;
using FinanceDashboard.Api.Models.Responses;

namespace FinanceDashboard.Api.Extensions;

public static class RateLimitExtension
{
  public static IServiceCollection AddRateLimiting(this IServiceCollection services)
  {
    services.AddRateLimiter(options =>
    {
      // 60 requisições por minuto por IP — aplica globalmente a todas as rotas
      options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
      {
        var clientIp = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";

        return RateLimitPartition.GetFixedWindowLimiter(clientIp, _ => new FixedWindowRateLimiterOptions
        {
          Window = TimeSpan.FromMinutes(1),
          PermitLimit = 60,
          QueueLimit = 0,
        });
      });

      options.OnRejected = async (context, cancellationToken) =>
      {
        var response = new ApiResponse<object>
        {
          Status = 429,
          Action = null,
          Message = "Too many requests. Please wait a moment and try again.",
          Data = null,
        };

        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        context.HttpContext.Response.ContentType = "application/json";

        await context.HttpContext.Response.WriteAsync(
          JsonSerializer.Serialize(response),
          cancellationToken);
      };
    });

    return services;
  }

  public static WebApplication UseRateLimiting(this WebApplication app)
  {
    app.UseRateLimiter();
    return app;
  }
}
