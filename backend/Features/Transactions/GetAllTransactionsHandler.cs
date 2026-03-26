using FinanceDashboard.Api.Infra;
using FinanceDashboard.Api.Models;
using FinanceDashboard.Api.Models.Responses;

namespace FinanceDashboard.Api.Features.Transactions;

public class GetAllTransactionsHandler(MockDataService mockData)
{
  public async Task<IResult> HandleAsync()
  {
    return await ProcessGetAllTransactionsAsync();

    async Task<IResult> ProcessGetAllTransactionsAsync()
    {
      var transactionsResult = await mockData.GetTransactionsAsync();
      if (transactionsResult.IsFailure) return ApiResults.MapError(transactionsResult);

      var transactionsFound = transactionsResult.Value!
        .OrderByDescending(transaction => transaction.Date)
        .Select(TransactionResponse.From)
        .ToList();

      return ApiResults.Ok(BuildResponse(transactionsFound));
    }

    static ApiResponse<IEnumerable<TransactionResponse>> BuildResponse(
      IEnumerable<TransactionResponse> transactions) => new()
    {
      Status = 200,
      Action = "TRANSACTION_LIST",
      Message = "Transactions listed successfully.",
      Data = transactions,
    };
  }
}
