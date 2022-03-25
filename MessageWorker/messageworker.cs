using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SignalR;
using SignalR.Hubs;
using SignalR.Classes;
using GameAPI.App_Code;
using System.Text.Json;

namespace SignalR.MessageWorker
{
    
    public sealed class messageworker: BackgroundService
       
    {
        string game_stage = "start new game";
        ClResult clResult;
        private IHubContext<ChatHub> _messageContext;
        public messageworker(IHubContext<ChatHub> messageContext)
        {
            _messageContext = messageContext;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            DalGlobal dalGlobal = new DalGlobal();
            ClGame clGame = new ClGame();
            var waitingcount = 0;
            var resultcount = -1;
            var runninghelp = 0;
            while (!stoppingToken.IsCancellationRequested)
            {
                await Task.Delay(1000);
                
                if (game_stage == "start new game")
                {
                    clGame = await dalGlobal.getNewGame();
                    string jsonString = JsonSerializer.Serialize(clGame);
                    var eventMessage = new EventMessage("", jsonString, "start new game");
                    await _messageContext.Clients.All.SendAsync("ReceiveMessage", eventMessage, stoppingToken);
                    game_stage = "count down";
                }
                else if(game_stage == "count down")
                {
                    try
                    {
                        clGame.timespent += 1;
                        clGame.timeremaining -= 1;
                        dalGlobal.updateTimespent(clGame);
                        string jsonString = JsonSerializer.Serialize(clGame);
                        var eventMessage = new EventMessage("", jsonString, "count down");
                        await _messageContext.Clients.All.SendAsync("ReceiveMessage", eventMessage, stoppingToken);
                        if (clGame.timeremaining <= 0)
                        {
                            game_stage = "get result";
                        }
                    }
                    catch (Exception ex)
                    {
                        game_stage = "start new game";
                    }

                    
                }
                else if (game_stage=="get result")
                {
                    runninghelp++;
                    if (runninghelp % 4 == 0)
                    {
                        resultcount++;
                        EventMessage eventMessage;
                        if (resultcount == 0)
                        {
                            clResult = dalGlobal.GenerateResult(clGame.gameid);
                            string jsonString = JsonSerializer.Serialize(clResult);
                            eventMessage = new EventMessage("", jsonString, "start result");

                        }
                        else if (resultcount == 1)
                        {
                            eventMessage = new EventMessage("", clResult.Result1.ToString(), "result1");
                        }
                        else if (resultcount == 2)
                        {
                            eventMessage = new EventMessage("", clResult.Result2.ToString(), "result2");
                        }
                        else if (resultcount == 3)
                        {
                            eventMessage = new EventMessage("", clResult.Result3.ToString(), "result3");
                        }
                        else if (resultcount == 4)
                        {
                            eventMessage = new EventMessage("", clResult.Result4.ToString(), "result4");
                        }
                        else if (resultcount == 5)
                        {
                            eventMessage = new EventMessage("", clResult.Result5.ToString(), "result5");
                        }
                        else
                        {
                            string jsonString = JsonSerializer.Serialize(clResult);
                            eventMessage = new EventMessage("", jsonString, "end result");
                            resultcount = -1;
                            game_stage = "end game";
                        }

                        await _messageContext.Clients.All.SendAsync("ReceiveMessage", eventMessage, stoppingToken);
                    }
                    


                   
                }
                else if (game_stage == "end game")
                {
                    dalGlobal.EndGame(clGame.gameid);
                    var eventMessage = new EventMessage("", "", "end game");
                    await _messageContext.Clients.All.SendAsync("ReceiveMessage", eventMessage, stoppingToken);
                    game_stage = "wait for new game";
                }
                else if (game_stage == "wait for new game")
                {
                    waitingcount++;
                    if (waitingcount > 3)
                    {
                        game_stage = "start new game";
                        waitingcount = 0;
                    }
                    
                }


            }
        }

    }
}
