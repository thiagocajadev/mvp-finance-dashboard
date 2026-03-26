using FinanceDashboard.Api.Infra;

namespace FinanceDashboard.Api.Features.Transactions;

public record TransactionResponse
{
  public Guid Id { get; init; }
  public string Name { get; init; } = string.Empty;
  public decimal Amount { get; init; }
  public DateTimeOffset Date { get; init; }
  public string Category { get; init; } = string.Empty;

  public static TransactionResponse From(Transaction transaction) => new()
  {
    Id = transaction.Id,
    Name = transaction.Name,
    Amount = transaction.Amount,
    Date = transaction.Date,
    Category = transaction.Category,
  };
}
