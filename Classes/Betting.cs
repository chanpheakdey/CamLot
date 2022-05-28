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

    public class ClBettingResult
    {
        public int BettingID { get; set; }

        public string? BetNumber { get; set; }
        public string? SlotNumber { get; set; }

        public int BetAmount { get; set; }
        public int TotalBet { get; set; }

        public string? CreatedDate { get; set; }
        public string? CreatedBy { get; set; }

        public int GameID { get; set; }
        public int PlaceID { get; set; }
        public int ResultID { get; set; }

        public int WinAmountA { get; set; }
        public int WinAmountB { get; set; }
        public int WinAmountC { get; set; }
        public int WinAmountD { get; set; }
        public int WinAmountE { get; set; }

        public int ResultSlotA { get; set; }
        public int ResultSlotB { get; set; }
        public int ResultSlotC { get; set; }
        public int ResultSlotD { get; set; }
        public int ResultSlotE { get; set; }

        public string ResultStatus { get; set; }

        public Boolean Win { get; set; }
        public Boolean Withdrawal { get; set; }
        public string? WithdrawalDate { get; set; }
        public string? WithdrawalBy { get; set; }

        public int WithdrawalAmount { get; set; }


    }



}
