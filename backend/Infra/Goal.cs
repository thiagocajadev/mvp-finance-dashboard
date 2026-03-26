namespace FinanceDashboard.Api.Infra;

public class Goal
{
  public Guid Id { get; init; }
  public string Name { get; init; } = string.Empty;
  public string Description { get; init; } = string.Empty;
  public decimal Target { get; init; }
  public decimal Current { get; init; }
  public string Status { get; init; } = string.Empty;
}
