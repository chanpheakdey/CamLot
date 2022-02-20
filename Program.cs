using SignalR.Hubs;
using SignalR.MessageWorker;
using SignalR.Classes;
using GameAPI.App_Code;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHostedService<messageworker>();
builder.Services.AddRazorPages();
builder.Services.AddSignalR(hubOption =>
{
    hubOption.EnableDetailedErrors = true;
});
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.AllowAnyOrigin();
                          builder.AllowAnyMethod();
                          builder.AllowAnyHeader();
                      });
});

builder.Services.AddAntiforgery(o => o.HeaderName = "XSRF-TOKEN");
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();
app.UseCors(MyAllowSpecificOrigins);
app.MapRazorPages();
app.MapHub<ChatHub>("/chatHub");

app.MapPost("api/betting", (ClBetting clbetting) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.Betting(clbetting);

});
app.MapPost("api/login", (ClUser clUser) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.Login(clUser);

});
app.MapPost("api/QRCode", (qrcode clqrcode) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.getQRCode(clqrcode);

});
app.MapPost("api/LatestResult", () =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.getLatestResult();

});

app.MapPost("api/UploadImage", (IFormFile file) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    //return dalGlobal.UploadFile(file);

});

app.MapPost("api/getbettingresult", (ClBettingResult clbetting) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.GetBettingResult(clbetting);

});
app.Run();


