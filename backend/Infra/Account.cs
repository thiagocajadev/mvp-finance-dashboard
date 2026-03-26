namespace FinanceDashboard.Api.Infra;

public class Account
{
  public Guid Id { get; init; }
  public string Name { get; init; } = string.Empty;
  public string Type { get; init; } = string.Empty;
  public decimal Balance { get; init; }
}
