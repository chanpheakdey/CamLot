﻿namespace SignalR.Classes
{
    public class ClUser
    {
        public int UserID { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = String.Empty;
        public int PlaceID { get; set; }
        public bool Locked { get; set; }
        public int Attempts { get; set; }
        public string CreatedDate { get; set; }= string.Empty;
        public string CreatedBy { get; set; } = string.Empty;  

    }
}