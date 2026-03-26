namespace FinanceDashboard.Api.Models;

public enum ResultErrorType
{
  Failure,
  NotFound,
  Conflict,
  Unauthorized,
  Forbidden,
}

public class Result<T>
{
  public bool IsSuccess { get; }
  public bool IsFailure => !IsSuccess;
  public T? Value { get; }
  public string? Error { get; }
  public ResultErrorType ErrorType { get; }

  private Result(T value)
  {
    IsSuccess = true;
    Value = value;
  }

  private Result(string error, ResultErrorType errorType)
  {
    IsSuccess = false;
    Error = error;
    ErrorType = errorType;
  }

  public static Result<T> Ok(T value) => new(value);
  public static Result<T> NotFound(string message = "Not found.") => new(message, ResultErrorType.NotFound);
  public static Result<T> Failure(string message) => new(message, ResultErrorType.Failure);
}
