namespace SignalR.Classes
{
    public class ClHistory
    {
        public int BettingID { get; set; }
        public int GameID { get; set; }
        public string CreatedDate { get; set; }

        public string BetNumber { get; set; }

        public bool Win { get; set; }
        public int BetAmount { get; set; }

        public int WinAmount { get; set; }
        public int TotalBet { get; set; }

        public string SlotNumber { get; set; }
        public string Nickname { get; set; }
        public bool Withdrawal { get; set; }
        public string WithdrawalBy { get; set; }

        public string WithdrawalDate { get; set; }
    }
}
