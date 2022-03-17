namespace GameAPI.App_Code
{
    public class DalConnection
    {

        public static string DBUser = "db_a54acb_camlot_admin";

        public static string DBPassword = "reoun168";

        public static string DBDatabase  = "db_a54acb_camlot";

        public static string DBServer = "SQL5108.site4now.net";

        //public static string EDBConnectionString = "Server=tcp:servergame.database.windows.net,1433;Initial Catalog=gamedb;Persist Security Info=False;User ID=sqlserver;Password=Gamevb$92;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        public static string EDBConnectionString = "Server=tcp:servergame.database.windows.net,1433;Initial Catalog=gamedb;Persist Security Info=False;User ID=sqlserver;Password=Gamevb$92;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;Max Pool Size=200;";

    }
}
