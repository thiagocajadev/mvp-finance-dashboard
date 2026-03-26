namespace FinanceDashboard.Api.Models.Responses;

public class ApiResponse<T>
{
  public int Status { get; init; }
  public string? Action { get; init; }
  public string Message { get; init; } = string.Empty;
  public T? Data { get; init; }
}
