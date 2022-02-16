namespace GameAPI.App_Code
{
    public class ClGame
    {
        public int gameid { get; set; }
        public int timespent { get; set; }
        public int timeremaining { get; set; }

        public string ?createddate { get; set; }

    }

    public class ClResult
    {
        public int ResultID { get; set; }
        public int GameID { get; set; }
        public int LastGameID { get; set; }
        public String ?GameDate { get; set; }
        public String ?ResultDate { get; set; }

        public int Result1 { get; set; }
        public int Result2 { get; set; }
        public int Result3 { get; set; }
        public int Result4 { get; set; }
        public int Result5 { get; set; }

    }
}
