using FinanceDashboard.Api.Infra;

namespace FinanceDashboard.Api.Features.Accounts;

public record AccountResponse
{
  public Guid Id { get; init; }
  public string Name { get; init; } = string.Empty;
  public string Type { get; init; } = string.Empty;
  public decimal Balance { get; init; }

  public static AccountResponse From(Account account) => new()
  {
    Id = account.Id,
    Name = account.Name,
    Type = account.Type,
    Balance = account.Balance,
  };
}

public record AccountSummaryResponse
{
  public decimal TotalBalance { get; init; }
  public int AccountCount { get; init; }
}
