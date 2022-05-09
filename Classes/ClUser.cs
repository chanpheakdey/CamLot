namespace SignalR.Classes
{
    public class ClUser
    {
        public int UserID { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string NewUserName { get; set; } = string.Empty;

        public string NickName { get; set; } = string.Empty;
        public string Password { get; set; } = String.Empty;
        public string NewPassword { get; set; } = String.Empty;

        public int PlaceID { get; set; }
        public bool Locked { get; set; }
        public int Attempts { get; set; }
        public string CreatedDate { get; set; }= string.Empty;
        public string CreatedBy { get; set; } = string.Empty;  

        public bool Betting { get; set; }
        public bool Withdrawal { get; set; }
        public bool Report {get; set;}
        public bool Display { get; set; }
        public bool Admin { get; set; }
        public string? Token { get; set; } = string.Empty;

        public string UserLevel { get; set; } = string.Empty;
        public string CreatedByOriginal { get; set; } = string.Empty;

    }
}
