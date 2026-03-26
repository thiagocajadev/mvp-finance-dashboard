using FinanceDashboard.Api.Infra;
using FinanceDashboard.Api.Models;
using FinanceDashboard.Api.Models.Responses;

namespace FinanceDashboard.Api.Features.Goals;

public class GetAllGoalsHandler(MockDataService mockData)
{
  public async Task<IResult> HandleAsync()
  {
    return await ProcessGetAllGoalsAsync();

    async Task<IResult> ProcessGetAllGoalsAsync()
    {
      var goalsResult = await mockData.GetGoalsAsync();
      if (goalsResult.IsFailure) return ApiResults.MapError(goalsResult);

      var goalsFound = goalsResult.Value!
        .Select(GoalResponse.From)
        .ToList();

      return ApiResults.Ok(BuildResponse(goalsFound));
    }

    static ApiResponse<IEnumerable<GoalResponse>> BuildResponse(
      IEnumerable<GoalResponse> goals) => new()
    {
      Status = 200,
      Action = "GOAL_LIST",
      Message = "Goals listed successfully.",
      Data = goals,
    };
  }
}
