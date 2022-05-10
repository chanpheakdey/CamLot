namespace SignalR.Classes
{
    public class ClToken
    {

        public string? TokenID { get; set; }
        public bool Expired { get; set; }
        public string? Username { get; set; } = null;

        public int? PlaceID { get; set; } = 0;

        public string? Nickname { get; set; } = null;
        public string? UserLevel { get; set; } = null;

    }
}
