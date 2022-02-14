using SignalR.Classes;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Drawing;
using QRCoder;
using System.IO;
namespace GameAPI.App_Code
{
    public sealed class DalGlobal
    {


        public DataSet getDataFromTable(string TableName, string DisplayFields, string SortField, string Condition, string SortOrder)
        {
            DataSet ds = new DataSet();
            SqlCommand cmd = new SqlCommand();
            SqlDataAdapter adapter = new SqlDataAdapter();
            using (SqlConnection cn = new SqlConnection())
            {
                cn.ConnectionString = DalConnection.EDBConnectionString;
                cn.Open();
                cmd.CommandText = "SELECT " + DisplayFields + " FROM " + TableName + " " + Condition + " ORDER BY " + SortField + " " + SortOrder;

                cmd.CommandType = CommandType.Text;
                cmd.Connection = cn;
                adapter.SelectCommand = cmd;
                // fill the dataset
                adapter.Fill(ds);
                // return the dataset
                cn.Close();
            }

            return ds;
        }

        public async Task<ClGame> getNewGame()
        {

            try
            {
                ClGame clGame = new ClGame();
                DataSet ds = new DataSet();
                await using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_CreateNewGame", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                             da.Fill(ds);
                        }

                        clGame.gameid = (int)ds.Tables[0].Rows[0]["GameID"];
                        clGame.timespent = (int)ds.Tables[0].Rows[0]["TimeSpent"];
                        clGame.timeremaining = (int)ds.Tables[0].Rows[0]["TimeRemaining"];
                        clGame.createddate = (string)ds.Tables[0].Rows[0]["CreatedDate"];
                    }
                }

                //string jsonString = JsonSerializer.Serialize(clGame);

                return clGame;

            }
            catch (SqlException ex)
            {
                return null;
            }
        }


        public ClUser Login(ClUser cluser)
        {

            ClUser clUser_result = new ClUser();
            try
            {
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_Login", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;


                        SqlParameter sqlParameter3 = command.Parameters.Add("@Username", SqlDbType.VarChar);
                        sqlParameter3.Value = cluser.UserName;
                        SqlParameter sqlParameter4 = command.Parameters.Add("@Password", SqlDbType.VarChar);
                        sqlParameter4.Value = cluser.Password;


                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        clUser_result.UserID = (int)ds.Tables[0].Rows[0]["UserID"];
                        clUser_result.PlaceID = (int)ds.Tables[0].Rows[0]["PlaceID"];
                        return clUser_result;

                    }
                }
            }
            catch (SqlException ex)
            {
                clUser_result.UserID = -1;
                return clUser_result;
            }
        }
        public ClBetting Betting(ClBetting clBetting)
        {

            ClBetting clBetting_result = new ClBetting();
            try
            {
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_Betting", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        SqlParameter sqlParameter1 = command.Parameters.Add("@GameID", SqlDbType.Int);
                        sqlParameter1.Value = clBetting.GameID;

                        SqlParameter sqlParameter2 = command.Parameters.Add("@PlaceID", SqlDbType.Int);
                        sqlParameter2.Value = clBetting.PlaceID;

                        SqlParameter sqlParameter3 = command.Parameters.Add("@SlotNumber", SqlDbType.VarChar);
                        sqlParameter3.Value = clBetting.SlotNumber;
                        SqlParameter sqlParameter4 = command.Parameters.Add("@BetType", SqlDbType.VarChar);
                        sqlParameter4.Value = clBetting.BetType;
                        SqlParameter sqlParameter5 = command.Parameters.Add("@BetNumber", SqlDbType.VarChar);
                        sqlParameter5.Value = clBetting.BetNumber;
                        SqlParameter sqlParameter51 = command.Parameters.Add("@BetAmount", SqlDbType.Int);
                        sqlParameter51.Value = clBetting.BetAmount;
                        SqlParameter sqlParameter6 = command.Parameters.Add("@UnitWinAmount", SqlDbType.Int);
                        sqlParameter6.Value = clBetting.UnitWinAmount;

                        SqlParameter sqlParameter7 = command.Parameters.Add("@WinAmount", SqlDbType.Int);
                        sqlParameter7.Value = clBetting.UnitWinAmount * clBetting.BetAmount;
                        SqlParameter sqlParameter8 = command.Parameters.Add("@TotalBet", SqlDbType.Int);
                        sqlParameter8.Value = clBetting.BetAmount * clBetting.SlotNumber.Split(",").Length * clBetting.BetNumber.Split(",").Length;
                        SqlParameter sqlParameter9 = command.Parameters.Add("@CreatedBy", SqlDbType.VarChar);
                        sqlParameter9.Value = clBetting.CreatedBy;
  

                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);
                            
                        }

                        clBetting_result.BettingID = (int)ds.Tables[0].Rows[0]["BettingID"];
                        clBetting_result.CreatedDate = ((DateTime)ds.Tables[0].Rows[0]["CreatedDate"]).ToString("dd/MM/yyyy HH:mm:ss");
                        clBetting_result.GameID = clBetting.GameID;
                        return clBetting_result;

                    }
                }
            }
            catch (SqlException ex)
            {
                  clBetting_result.BettingID=-1;
                return clBetting_result;
            }
        }

        public string updateTimespent(ClGame clGame)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {
                    String sql = "update tblGame set timeSpent=" + clGame.timespent + ",TimeRemaining=" + clGame.timeremaining + " Where GameID=" + clGame.gameid;

                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        connection.Open();
                        command.ExecuteNonQuery();
                        connection.Close();
                    }
                }
                return "success";

            }
            catch (SqlException ex)
            {
                return "error";
            }
        }

        public ClResult GenerateResult(int gameid)
        {

            try
            {
                ClResult clResult = new ClResult();
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_Selection", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        SqlParameter sqlParameter = command.Parameters.Add("@GameID", SqlDbType.Int);
                        sqlParameter.Value = gameid;


                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);
                        }

                        clResult.GameID = gameid;
                        clResult.ResultDate= (String)ds.Tables[0].Rows[0]["CreatedDate"];
                        clResult.Result1 = (int)ds.Tables[0].Rows[0]["R1"];
                        clResult.Result2 = (int)ds.Tables[0].Rows[0]["R2"];
                        clResult.Result3 = (int)ds.Tables[0].Rows[0]["R3"];
                        clResult.Result4 = (int)ds.Tables[0].Rows[0]["R4"];
                        clResult.Result5 = (int)ds.Tables[0].Rows[0]["R5"];
                        

                    }
                }
                //string jsonString = JsonSerializer.Serialize(clResult);

                return clResult;

            }
            catch (SqlException ex)
            {
                return null;
            }
        }

        public List<string> getLatestResult()
        {

            try
            {
                List<string> list = new List<string>();
                ClResult clResult = new ClResult();
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_LatestResult", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                       


                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);
                        }

                        for (int i = ds.Tables[0].Rows.Count-1; i >= 0; i--)
                        {
                            clResult.GameID = (int)ds.Tables[0].Rows[i]["GameID"];
                            clResult.ResultDate = (String)ds.Tables[0].Rows[i]["CreatedDate"];
                            clResult.Result1 = (int)ds.Tables[0].Rows[i]["R1"];
                            clResult.Result2 = (int)ds.Tables[0].Rows[i]["R2"];
                            clResult.Result3 = (int)ds.Tables[0].Rows[i]["R3"];
                            clResult.Result4 = (int)ds.Tables[0].Rows[i]["R4"];
                            clResult.Result5 = (int)ds.Tables[0].Rows[i]["R5"];
                            string jsonString = JsonSerializer.Serialize(clResult);
                            list.Add(jsonString);

                        }

                    }
                }

                return list;

            }
            catch (SqlException ex)
            {
                return null;
            }
        }

        public string EndGame(int gameid)
        {

            try
            {
                ClResult clResult = new ClResult();
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_EndGame", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        SqlParameter sqlParameter = command.Parameters.Add("@GameID", SqlDbType.Int);
                        sqlParameter.Value = gameid;

                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);
                        }

                       return ds.Tables[0].Rows[0]["Success"].ToString();


                    }
                }
              

            }
            catch (SqlException ex)
            {
                return "error";
            }
        }

        public byte[] getQRCode(qrcode clQrcode)
        {
            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeGenerator.QRCode qrCode = qrGenerator.CreateQrCode(clQrcode.qrCode, QRCodeGenerator.ECCLevel.Q);
            //System.Web.UI.WebControls.Image imgBarCode = new System.Web.UI.WebControls.Image();
            Image imgBarCode;

            //imgBarCode.Height = 150;

            //imgBarCode.Width = 150;
            using (Bitmap bitMap = qrCode.GetGraphic(20))
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    bitMap.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                    byte[] byteImage = ms.ToArray();
                    //imgBarCode = Image.FromStream("data:image/png;base64," + Convert.ToBase64String(byteImage));
                    //return "data:image/png;base64," + Convert.ToBase64String(byteImage);
                    return byteImage;
                }
                // PlaceHolder1.Controls.Add(imgBarCode);
            }

        }


    }
}
