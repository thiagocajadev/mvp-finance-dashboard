using FinanceDashboard.Api.Infra;
using FinanceDashboard.Api.Models;
using FinanceDashboard.Api.Models.Responses;

namespace FinanceDashboard.Api.Features.Accounts;

public class GetAccountsSummaryHandler(MockDataService mockData)
{
  public async Task<IResult> HandleAsync()
  {
    return await ProcessGetSummaryAsync();

    async Task<IResult> ProcessGetSummaryAsync()
    {
      var accountsResult = await mockData.GetAccountsAsync();
      if (accountsResult.IsFailure) return ApiResults.MapError(accountsResult);

      var summaryBuilt = BuildSummary(accountsResult.Value!);
      return ApiResults.Ok(BuildResponse(summaryBuilt));
    }

    static AccountSummaryResponse BuildSummary(List<Infra.Account> accounts) => new()
    {
      TotalBalance = accounts.Sum(account => account.Balance),
      AccountCount = accounts.Count,
    };

    static ApiResponse<AccountSummaryResponse> BuildResponse(AccountSummaryResponse summary) => new()
    {
      Status = 200,
      Action = "ACCOUNT_SUMMARY",
      Message = "Account summary retrieved successfully.",
      Data = summary,
    };
  }
}
