using FinanceDashboard.Api.Models.Responses;

namespace FinanceDashboard.Api.Models;

public static class ApiResults
{
  public static IResult Ok<T>(ApiResponse<T> response) =>
    Results.Json(response, statusCode: response.Status);

  public static IResult NotFound(string message) =>
    Results.Json(new ApiResponse<object>
    {
      Status = 404,
      Action = null,
      Message = message,
      Data = null,
    }, statusCode: 404);

  public static IResult InternalError(string message) =>
    Results.Json(new ApiResponse<object>
    {
      Status = 500,
      Action = null,
      Message = message,
      Data = null,
    }, statusCode: 500);

  public static IResult MapError<T>(Result<T> result) => result.ErrorType switch
  {
    ResultErrorType.NotFound => NotFound(result.Error!),
    ResultErrorType.Conflict => Results.Json(new ApiResponse<object>
    {
      Status = 409,
      Action = null,
      Message = result.Error!,
      Data = null,
    }, statusCode: 409),
    _ => InternalError(result.Error!),
  };
}
