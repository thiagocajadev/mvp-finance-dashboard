DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);
builder.AddDefaultConfiguration();

var app = builder.Build();
await app.UseDefaultConfiguration();

app.Run();
