using SignalR.Hubs;
using SignalR.MessageWorker;
using SignalR.Classes;
using GameAPI.App_Code;
using Microsoft.AspNetCore.Mvc;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHostedService<messageworker>();
builder.Services.AddRazorPages();
//builder.Services.AddMvc().AddRazorPagesOptions(options =>
//{
//    options.Conventions.AddPageRoute("/login", "");
//});

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
app.MapPost("api/userlogin", (ClUser clUser) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.UserLogin(clUser);

});
app.MapPost("api/userloginbytoken", (ClToken clToken) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.UserLoginbyToken(clToken);

});

app.MapPost("api/logout", (ClToken clToken) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.UserLogout(clToken);

});
app.MapPost("api/createuser", (ClUser clUser) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.CreateUser(clUser);

});
app.MapPost("api/deleteuser", (ClUser clUser) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.DeleteUser(clUser);

});

app.MapPost("api/unlockuser", (ClUser clUser) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.UnlockUser(clUser);

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
app.MapPost("api/getCurrentGame", () =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.getCurrentGame();

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

app.MapPost("api/withdraw", (ClBettingResult clbetting) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.Withdraw(clbetting);

});

app.MapPost("api/WithdrawUrl", (ClUser clUser) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.WithdrawUrl(clUser);

});

app.MapPost("api/CheckToken", (ClToken clToken) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.CheckToken(clToken);

});

app.MapPost("api/CheckTokenDetail", (ClToken clToken) =>
{
    DalGlobal dalGlobal = new DalGlobal();
    return dalGlobal.CheckTokenDetail(clToken);

});

app.MapGet("api/getReport/{startdate}/{enddate}", async (http) =>
{
    object ?startdate;
    if (!http.Request.RouteValues.TryGetValue("startdate", out startdate))
    {
        http.Response.StatusCode = 400;
        return;
    }
    object? enddate;
    if (!http.Request.RouteValues.TryGetValue("enddate", out enddate))
    {
        http.Response.StatusCode = 400;
        return;
    }

    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getReport(startdate, enddate);
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});

app.MapGet("api/getToken/{username}", async (http) =>
{
    object? username;
    if (!http.Request.RouteValues.TryGetValue("username", out username))
    {
        http.Response.StatusCode = 400;
        return;
    }
   

    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getToken(username.ToString());
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});



app.MapGet("api/getuserlist/{username}", async (http) =>
{
    object? username;
    if (!http.Request.RouteValues.TryGetValue("username", out username))
    {
        http.Response.StatusCode = 400;
        return;
    }


    DalGlobal dalGlobal = new DalGlobal();


    var todoItem = await dalGlobal.getUserlist(username.ToString());
    if (todoItem == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todoItem);
});


app.MapGet("api/getauido/{filename}", async (http) =>
{
    object? filename;
    if (!http.Request.RouteValues.TryGetValue("filename", out filename))
    {
        http.Response.StatusCode = 400;
        return;
    }


    //await http.Response.WriteAsync(fs);
    DalGlobal dalGlobal = new DalGlobal();
    //await dalGlobal.GetAudio(filename.ToString());
    await http.Response.WriteAsJsonAsync(dalGlobal.GetAudio(filename.ToString()));
});


app.Run();


