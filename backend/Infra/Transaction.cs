namespace FinanceDashboard.Api.Infra;

public class Transaction
{
  public Guid Id { get; init; }
  public string Name { get; init; } = string.Empty;
  public decimal Amount { get; init; }
  public DateTimeOffset Date { get; init; }
  public string Category { get; init; } = string.Empty;
}
