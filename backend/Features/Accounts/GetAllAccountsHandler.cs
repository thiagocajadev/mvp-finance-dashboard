using FinanceDashboard.Api.Infra;
using FinanceDashboard.Api.Models;
using FinanceDashboard.Api.Models.Responses;

namespace FinanceDashboard.Api.Features.Accounts;

public class GetAllAccountsHandler(MockDataService mockData)
{
  public async Task<IResult> HandleAsync()
  {
    return await ProcessGetAllAccountsAsync();

    async Task<IResult> ProcessGetAllAccountsAsync()
    {
      var accountsResult = await mockData.GetAccountsAsync();
      if (accountsResult.IsFailure) return ApiResults.MapError(accountsResult);

      var accountsFound = accountsResult.Value!
        .Select(AccountResponse.From)
        .ToList();

      return ApiResults.Ok(BuildResponse(accountsFound));
    }

    static ApiResponse<IEnumerable<AccountResponse>> BuildResponse(
      IEnumerable<AccountResponse> accounts) => new()
    {
      Status = 200,
      Action = "ACCOUNT_LIST",
      Message = "Accounts listed successfully.",
      Data = accounts,
    };
  }
}
