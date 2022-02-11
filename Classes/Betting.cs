namespace SignalR.Classes
{
    public class ClBetting
    {
        public int BettingID { get; set; }
        public int GameID { get; set; }
        public int PlaceID { get; set; }

        public string ?SlotNumber { get; set; }
        public string ?BetType { get; set; }
        public string? BetNumber { get; set; }
        public int BetAmount { get; set; }
        public int UnitWinAmount { get; set; }
        public int WinAmount { get; set; }
        public int TotalBet { get; set; }
        public string ?CreatedDate { get; set; }
        public string ?CreatedBy { get; set; }


    }
}
