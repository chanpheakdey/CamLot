namespace SignalR.Classes
{
    public class ClReport
    {
        public string? StartDate { get; set; } = string.Empty;
        public string ?EndDate { get; set; } = string.Empty;

        public int TotalGames { get; set; }
        public int BetAmount { get; set; }
        public int WinAmount { get; set; }
        public int Profit { get; set; }

        public int Comission { get; set; }
       public int AgentBalance { get; set; }

        public string Username { get; set; }

    }
}
