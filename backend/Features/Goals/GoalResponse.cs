using FinanceDashboard.Api.Infra;

namespace FinanceDashboard.Api.Features.Goals;

public record GoalResponse
{
  public Guid Id { get; init; }
  public string Name { get; init; } = string.Empty;
  public string Description { get; init; } = string.Empty;
  public decimal Target { get; init; }
  public decimal Current { get; init; }
  public string Status { get; init; } = string.Empty;
  public int ProgressPercent { get; init; }

  public static GoalResponse From(Goal goal) => new()
  {
    Id = goal.Id,
    Name = goal.Name,
    Description = goal.Description,
    Target = goal.Target,
    Current = goal.Current,
    Status = goal.Status,
    ProgressPercent = (int)Math.Round(goal.Current / goal.Target * 100),
  };
}
