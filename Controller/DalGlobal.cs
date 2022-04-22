using SignalR.Classes;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Drawing;
using QRCoder;
using System.IO;
using Microsoft.AspNetCore.Mvc;


using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;


namespace GameAPI.App_Code
{
    public sealed class DalGlobal

    {
  
        


        public async Task<dynamic> GetAudio(string filename)
        {
            try
            {
                FileStream fs = System.IO.File.Open($"wwwroot/Audio/{filename}.wav", FileMode.Open, FileAccess.Read, FileShare.Read);
                FileStreamResult fsresult;
                fsresult = new FileStreamResult(fs, "audio/wav");
              
                return fsresult;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return "Internal server error !";
            }
        }


        public async Task<string> getUserlist(string Username)
        {
            try
            {
                DataSet ds = new DataSet();
                await using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_GetUserList", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        SqlParameter sqlParameter1 = command.Parameters.Add("@Username", SqlDbType.VarChar);
                        sqlParameter1.Value = Username;
                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();
                        string userlist = (string)ds.Tables[0].Rows[0]["Userlist"];




                        return userlist;

                    }
                }
            }
            catch (SqlException ex)
            {
                return ex.ToString();
            }


        }


        public async Task<string> getUserCredit(string Username)
        {
            try
            {
                DataSet ds = new DataSet();
                await using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_getUserCredit", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        SqlParameter sqlParameter1 = command.Parameters.Add("@Username", SqlDbType.VarChar);
                        sqlParameter1.Value = Username;
                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();
                        int usercredit = (int)ds.Tables[0].Rows[0]["Credit"];




                        return usercredit.ToString("#,##0");

                    }
                }
            }
            catch (SqlException ex)
            {
                return ex.ToString();
            }


        }


        public async Task<string> getToken(string Username)
        {
            try
            {
                DataSet ds = new DataSet();
                await using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_GenerateToken", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        SqlParameter sqlParameter1 = command.Parameters.Add("@Username", SqlDbType.VarChar);
                        sqlParameter1.Value = Username;
                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();
                        string token = (string)ds.Tables[0].Rows[0]["TokenID"];




                        return token;

                    }
                }
            }
            catch (SqlException ex)
            {
                return ex.ToString();
            }


        }


        public async Task<string> getnewToken(string token)
        {
            try
            {
                DataSet ds = new DataSet();
                await using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_GenerateNewToken", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        SqlParameter sqlParameter1 = command.Parameters.Add("@Token", SqlDbType.VarChar);
                        sqlParameter1.Value = token;
                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();
                        string newtoken = (string)ds.Tables[0].Rows[0]["TokenID"];




                        return newtoken;

                    }
                }
            }
            catch (SqlException ex)
            {
                return ex.ToString();
            }


        }

        public async Task<List<ClReport>> getReport(Object? StartDate, Object? EndDate, Object? Username)
        {
            try
            {
                List<ClReport> lstReport = new List<ClReport>();
                DataSet ds = new DataSet();
                await using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_ReportSummary", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        SqlParameter sqlParameter1 = command.Parameters.Add("@StartDate", SqlDbType.Date);
                        sqlParameter1.Value = StartDate.ToString().Substring(6, 4) + "-" + StartDate.ToString().Substring(3, 2) + "-" + StartDate.ToString().Substring(0,2);
                        SqlParameter sqlParameter2 = command.Parameters.Add("@EndDate", SqlDbType.Date);
                        sqlParameter2.Value = EndDate.ToString().Substring(6, 4) + "-" + EndDate.ToString().Substring(3, 2) + "-" + EndDate.ToString().Substring(0, 2);
                        SqlParameter sqlParameter3 = command.Parameters.Add("@Username", SqlDbType.VarChar);
                        sqlParameter3.Value = Username.ToString();
                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();
                        for (var i = 0; i < ds.Tables[0].Rows.Count; i++)
                        {
                            ClReport clReport = new ClReport();
                            clReport.TotalGames = (int)ds.Tables[0].Rows[i]["TotalGames"];
                            clReport.BetAmount = (int)ds.Tables[0].Rows[i]["BetAmount"];
                            clReport.WinAmount = (int)ds.Tables[0].Rows[i]["WinAmount"];
                            clReport.AgentBalance = (int)ds.Tables[0].Rows[i]["AgentBalance"];
                            clReport.Profit = (int)ds.Tables[0].Rows[i]["Profit"];
                            clReport.Comission = (int)ds.Tables[0].Rows[i]["Comission"];
                            clReport.Username = (string)ds.Tables[0].Rows[i]["Username"];
                            lstReport.Add(clReport);
                        }



                        return lstReport;

                    }
                }
            }
            catch (SqlException ex)
            {
                return null ;
            }

           
        }

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
                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                             da.Fill(ds);
                        }
                        connection.Close();
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


        public ClUser UserLogin(ClUser cluser)
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
                        SqlParameter sqlParameter5 = command.Parameters.Add("@Token", SqlDbType.VarChar);
                        sqlParameter5.Value = cluser.Token;
                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();
                        clUser_result.UserID = (int)ds.Tables[0].Rows[0]["UserID"];
                        clUser_result.PlaceID = (int)ds.Tables[0].Rows[0]["PlaceID"];
                        clUser_result.Betting = (bool)ds.Tables[0].Rows[0]["Betting"];
                        clUser_result.Withdrawal = (bool)ds.Tables[0].Rows[0]["Withdrawal"];
                        clUser_result.Report = (bool)ds.Tables[0].Rows[0]["Report"];
                        clUser_result.Display = (bool)ds.Tables[0].Rows[0]["Display"];
                        clUser_result.Admin = (bool)ds.Tables[0].Rows[0]["Admin"];
                        return clUser_result;

                    }
                }
            }
            catch (SqlException ex)
            {
                clUser_result.UserID = -1;
                clUser_result.UserName = ex.ToString();
                return clUser_result;
            }
        }

        public ClUser UserLoginbyToken(ClToken clToken)
        {

            ClUser clUser_result = new ClUser();
            try
            {
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_Login_byToken", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;


                        SqlParameter sqlParameter3 = command.Parameters.Add("@TokenID", SqlDbType.VarChar);
                        sqlParameter3.Value = clToken.TokenID;

                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();
                        clUser_result.UserID = (int)ds.Tables[0].Rows[0]["UserID"];
                        clUser_result.PlaceID = (int)ds.Tables[0].Rows[0]["PlaceID"];
                        clUser_result.Betting = (bool)ds.Tables[0].Rows[0]["Betting"];
                        clUser_result.Withdrawal = (bool)ds.Tables[0].Rows[0]["Withdrawal"];
                        clUser_result.Report = (bool)ds.Tables[0].Rows[0]["Report"];
                        clUser_result.Display = (bool)ds.Tables[0].Rows[0]["Display"];
                        clUser_result.Admin = (bool)ds.Tables[0].Rows[0]["Admin"];
                        return clUser_result;

                    }
                }
            }
            catch (SqlException ex)
            {
                clUser_result.UserID = -1;
                clUser_result.UserName = ex.ToString();
                return clUser_result;
            }
        }

        public string UserLogout(ClToken clToken)
        {

            ClUser clUser_result = new ClUser();
            try
            {
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_Logout", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;


                        SqlParameter sqlParameter3 = command.Parameters.Add("@TokenID", SqlDbType.VarChar);
                        sqlParameter3.Value = clToken.TokenID;

                        connection.Open();
                        command.ExecuteNonQuery();
                        connection.Close();
                        return "success";

                    }
                }
            }
            catch (SqlException ex)
            {
                return "failed";
            }
        }
        public string CreateUser(ClUser cluser)
        {

            ClUser clUser_result = new ClUser();
            try
            {
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_CreateUser", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;


                        SqlParameter sqlParameter3 = command.Parameters.Add("@Username", SqlDbType.VarChar);
                        sqlParameter3.Value = cluser.UserName;
                        SqlParameter sqlParameter4 = command.Parameters.Add("@Password", SqlDbType.VarChar);
                        sqlParameter4.Value = cluser.Password;
                        SqlParameter sqlParameter5 = command.Parameters.Add("@Betting", SqlDbType.Bit);
                        sqlParameter5.Value = cluser.Betting;
                        SqlParameter sqlParameter6 = command.Parameters.Add("@Withdrawal", SqlDbType.Bit);
                        sqlParameter6.Value = cluser.Betting;
                        SqlParameter sqlParameter7 = command.Parameters.Add("@Report", SqlDbType.Bit);
                        sqlParameter7.Value = cluser.Betting;
                        SqlParameter sqlParameter8 = command.Parameters.Add("@Display", SqlDbType.Bit);
                        sqlParameter8.Value = cluser.Betting;
                        SqlParameter sqlParameter9 = command.Parameters.Add("@CreatedBy", SqlDbType.VarChar);
                        sqlParameter9.Value = cluser.CreatedBy;
                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();
                        return (string)ds.Tables[0].Rows[0]["Status"]; ;

                    }
                }
            }
            catch (SqlException ex)
            {
                clUser_result.UserID = -1;
                return "error";
            }
        }

        public string DeleteUser(ClUser cluser)
        {

            ClUser clUser_result = new ClUser();
            try
            {
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_DeleteUser", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;


                        SqlParameter sqlParameter3 = command.Parameters.Add("@Username", SqlDbType.VarChar);
                        sqlParameter3.Value = cluser.UserName;
                        SqlParameter sqlParameter4 = command.Parameters.Add("@DeletedBy", SqlDbType.VarChar);
                        sqlParameter4.Value = cluser.CreatedBy;
                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();
                        return (string)ds.Tables[0].Rows[0]["Status"]; ;

                    }
                }
            }
            catch (SqlException ex)
            {
                clUser_result.UserID = -1;
                return "error";
            }
        }

        public string UnlockUser(ClUser cluser)
        {

            ClUser clUser_result = new ClUser();
            try
            {
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_UnlockUser", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;


                        SqlParameter sqlParameter3 = command.Parameters.Add("@Username", SqlDbType.VarChar);
                        sqlParameter3.Value = cluser.UserName;
                        SqlParameter sqlParameter4 = command.Parameters.Add("@CreatedBy", SqlDbType.VarChar);
                        sqlParameter4.Value = cluser.CreatedBy;
                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();
                        return (string)ds.Tables[0].Rows[0]["Status"]; ;

                    }
                }
            }
            catch (SqlException ex)
            {
                clUser_result.UserID = -1;
                return "error";
            }
        }

        public string UpdatePassword(ClUser cluser)
        {

            ClUser clUser_result = new ClUser();
            try
            {
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_UpdatePassword", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;


                        SqlParameter sqlParameter3 = command.Parameters.Add("@Username", SqlDbType.VarChar);
                        sqlParameter3.Value = cluser.UserName;
                        SqlParameter sqlParameter4 = command.Parameters.Add("@Password", SqlDbType.VarChar);
                        sqlParameter4.Value = cluser.Password;
                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();
                        return (string)ds.Tables[0].Rows[0]["Status"]; ;

                    }
                }
            }
            catch (SqlException ex)
            {
                clUser_result.UserID = -1;
                return "error";
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
  
                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);
                            
                        }
                        connection.Close();
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




        public ClBettingResult GetBettingResult(ClBettingResult clBettingResult)
        {

            ClBettingResult clBetting_result = new ClBettingResult();
            try
            {
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_GeBettingResult", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        SqlParameter sqlParameter1 = command.Parameters.Add("@BettingID", SqlDbType.Int);
                        sqlParameter1.Value = clBettingResult.BettingID;                    

                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close(); 
                        clBetting_result.BettingID = (int)ds.Tables[0].Rows[0]["BettingID"];
                        clBetting_result.BetNumber = (string)ds.Tables[0].Rows[0]["BetNumber"];
                        clBetting_result.SlotNumber = (string)ds.Tables[0].Rows[0]["SlotNumber"];

                        clBetting_result.BetAmount = (int)ds.Tables[0].Rows[0]["BetAmount"];
                        clBetting_result.TotalBet = (int)ds.Tables[0].Rows[0]["TotalBet"];


                        clBetting_result.CreatedDate = ((DateTime)ds.Tables[0].Rows[0]["CreatedDate"]).ToString("dd/MM/yyyy HH:mm:ss");
                        clBetting_result.CreatedBy = (string)ds.Tables[0].Rows[0]["CreatedBy"];

                        clBetting_result.GameID = (int)ds.Tables[0].Rows[0]["GameID"];
                        clBetting_result.PlaceID = (int)ds.Tables[0].Rows[0]["PlaceID"];
                        clBetting_result.ResultID = (int)ds.Tables[0].Rows[0]["ResultID"];

                        clBetting_result.WinAmountA = (int)ds.Tables[0].Rows[0]["WinAmountA"];
                        clBetting_result.WinAmountB = (int)ds.Tables[0].Rows[0]["WinAmountB"];
                        clBetting_result.WinAmountC = (int)ds.Tables[0].Rows[0]["WinAmountC"];
                        clBetting_result.WinAmountD = (int)ds.Tables[0].Rows[0]["WinAmountD"];
                        clBetting_result.WinAmountE = (int)ds.Tables[0].Rows[0]["WinAmountE"];

                        clBetting_result.ResultSlotA = (int)ds.Tables[0].Rows[0]["SlotA"];
                        clBetting_result.ResultSlotB = (int)ds.Tables[0].Rows[0]["SlotB"];
                        clBetting_result.ResultSlotC = (int)ds.Tables[0].Rows[0]["SlotC"];
                        clBetting_result.ResultSlotD = (int)ds.Tables[0].Rows[0]["SlotD"];
                        clBetting_result.ResultSlotE = (int)ds.Tables[0].Rows[0]["SlotE"];

                        clBetting_result.Win = (bool)ds.Tables[0].Rows[0]["Win"];
                        clBetting_result.Withdrawal = (bool)ds.Tables[0].Rows[0]["Withdrawal"];
                        clBetting_result.WithdrawalDate = (string)ds.Tables[0].Rows[0]["WithdrawalDate"];
                        clBetting_result.WithdrawalBy = (string)ds.Tables[0].Rows[0]["WithdrawalBy"];

                        return clBetting_result;

                    }
                }
            }
            catch (SqlException ex)
            {
                clBetting_result.BettingID = -1;
                return clBetting_result;
            }
        }

        public ClBettingResult GetBettingReceipt(ClBettingResult clBettingResult)
        {

            ClBettingResult clBetting_result = new ClBettingResult();
            try
            {
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_GeBettingReceipt", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        SqlParameter sqlParameter1 = command.Parameters.Add("@BettingID", SqlDbType.Int);
                        sqlParameter1.Value = clBettingResult.BettingID;

                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();
                        clBetting_result.BettingID = (int)ds.Tables[0].Rows[0]["BettingID"];
                        clBetting_result.BetNumber = (string)ds.Tables[0].Rows[0]["BetNumber"];
                        clBetting_result.SlotNumber = (string)ds.Tables[0].Rows[0]["SlotNumber"];

                        clBetting_result.BetAmount = (int)ds.Tables[0].Rows[0]["BetAmount"];
                        clBetting_result.TotalBet = (int)ds.Tables[0].Rows[0]["TotalBet"];


                        clBetting_result.CreatedDate = ((DateTime)ds.Tables[0].Rows[0]["CreatedDate"]).ToString("dd/MM/yyyy HH:mm:ss");
                        clBetting_result.CreatedBy = (string)ds.Tables[0].Rows[0]["CreatedBy"];

                        clBetting_result.GameID = (int)ds.Tables[0].Rows[0]["GameID"];
                        clBetting_result.PlaceID = (int)ds.Tables[0].Rows[0]["PlaceID"];
                        clBetting_result.Withdrawal = (bool)ds.Tables[0].Rows[0]["Withdrawal"];
                        clBetting_result.WithdrawalDate = (string)ds.Tables[0].Rows[0]["WithdrawalDate"];
                        clBetting_result.WithdrawalBy = (string)ds.Tables[0].Rows[0]["WithdrawalBy"];

                        return clBetting_result;

                    }
                }
            }
            catch (SqlException ex)
            {
                clBetting_result.BettingID = -1;
                return clBetting_result;
            }
        }

        public string Withdraw(ClBettingResult clBettingResult)
        {

            ClBettingResult clBetting_result = new ClBettingResult();
            try
            {
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_Withdraw", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        SqlParameter sqlParameter1 = command.Parameters.Add("@BettingID", SqlDbType.Int);
                        sqlParameter1.Value = clBettingResult.BettingID;

                        SqlParameter sqlParameter2 = command.Parameters.Add("@Username", SqlDbType.VarChar);
                        sqlParameter2.Value = clBettingResult.CreatedBy;

                        SqlParameter sqlParameter3 = command.Parameters.Add("@WithdrawalAmount", SqlDbType.Int);
                        sqlParameter3.Value = clBettingResult.WithdrawalAmount;


                        connection.Open();
                        command.ExecuteNonQuery();
                        connection.Close();
  

                        return "success";

                    }
                }
            }
            catch (SqlException ex)
            {
                return "error";
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

                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);
                        }
                        connection.Close();
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



        public string getCurrentGame()
        {

            try
            {
                ClResult clResult=new ClResult();
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_getCurrentGame", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;


                        connection.Open();

                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);
                        }
                        connection.Close();

                        clResult.GameID = (int)ds.Tables[0].Rows[0]["GameID"];
                        clResult.GameDate = (string)ds.Tables[0].Rows[0]["CreatedDate"];
                        string jsonString = JsonSerializer.Serialize(clResult);
                        return jsonString;


                    }
                }

         

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

                       
                        connection.Open();

                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);
                        }
                        connection.Close();
                        for (int i = ds.Tables[0].Rows.Count-1; i >= 0; i--)
                        {
                            clResult.GameID = (int)ds.Tables[0].Rows[i]["GameID"];
                            clResult.LastGameID = (int)ds.Tables[0].Rows[i]["LastGameID"];
                            clResult.GameDate = (String)ds.Tables[0].Rows[i]["GameDate"];
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
                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);
                        }
                        connection.Close();
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



        public IActionResult? UploadFile(IFormFile file)
        {
            List<string> errors = new List<string>(); // added this just to return something

            if (file != null)
            {
                // do something
                return null;
            }
            else
            {
                return null;
            }

            
        }



        public string WithdrawUrl(ClUser cluser)
        {

            ClUser clUser_result = new ClUser();
            try
            {
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_WithdrawUrl", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;


                        SqlParameter sqlParameter3 = command.Parameters.Add("@Username", SqlDbType.VarChar);
                        sqlParameter3.Value = cluser.UserName;
            

                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();
                        return (string)ds.Tables[0].Rows[0]["WithdrawUrl"];
                        
                    }
                }
            }
            catch (SqlException ex)
            {
                return "";
            }
        }


        public bool CheckToken(ClToken clToken)
        {
            try
            {
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_CheckTokenID", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;


                        SqlParameter sqlParameter3 = command.Parameters.Add("@TokenID", SqlDbType.VarChar);
                        sqlParameter3.Value = clToken.TokenID;


                        connection.Open();  
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();    
                        return (bool)ds.Tables[0].Rows[0]["TokenExpired"];

                    }
                }
            }
            catch (SqlException ex)
            {
                return true;
            }

        }

        public ClToken CheckTokenDetail(ClToken clToken)
        {
           ClToken clTokendetail = new ClToken();
            try
            {
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_CheckTokenID", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;


                        SqlParameter sqlParameter3 = command.Parameters.Add("@TokenID", SqlDbType.VarChar);
                        sqlParameter3.Value = clToken.TokenID;


                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();
                        clTokendetail.Expired = (bool)ds.Tables[0].Rows[0]["TokenExpired"];
                        clTokendetail.Username = (string)ds.Tables[0].Rows[0]["Username"];
                        clTokendetail.PlaceID = (int)ds.Tables[0].Rows[0]["PlaceID"];
                        return clTokendetail;

                    }
                }
            }
            catch (SqlException ex)
            {
                clTokendetail.Expired = true;
                clTokendetail.Expired.ToString();
                return clTokendetail;
            }

        }


        public async Task<List<ClHistory>> getHistory(Object? BettingType, Object? Username)
        {
            try
            {
               List<ClHistory> lstHistory = new List<ClHistory>();
                DataSet ds = new DataSet();
                await using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_History", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        SqlParameter sqlParameter1 = command.Parameters.Add("@BettingType", SqlDbType.VarChar);
                        sqlParameter1.Value = BettingType.ToString();
                        SqlParameter sqlParameter2 = command.Parameters.Add("@Username", SqlDbType.VarChar);
                        sqlParameter2.Value = Username.ToString();
                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();

                        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                        {
                            ClHistory clHistory = new ClHistory();
                            clHistory.BettingID = (int)ds.Tables[0].Rows[i]["BettingID"];
                            clHistory.GameID = (int)ds.Tables[0].Rows[i]["GameID"];
                            clHistory.CreatedDate = (string)ds.Tables[0].Rows[i]["CreatedDate"];
                            clHistory.WinAmount = (int)ds.Tables[0].Rows[i]["WinAmount"];
                            clHistory.BetAmount = (int)ds.Tables[0].Rows[i]["BetAmount"];
                            clHistory.TotalBet = (int)ds.Tables[0].Rows[i]["TotalBet"];
                            clHistory.BetNumber = ds.Tables[0].Rows[i]["BetNumber"].ToString().Replace(",",", ");
                            clHistory.SlotNumber = ds.Tables[0].Rows[i]["SlotNumber"].ToString().Replace("1","A").Replace("2", "B").Replace("3", "C").Replace("4", "D").Replace("5", "E");
                            clHistory.Win = (bool)ds.Tables[0].Rows[i]["Win"];

                            lstHistory.Add(clHistory);
                        }



                        return lstHistory;

                    }
                }
            }
            catch (SqlException ex)
            {
                return null;
            }


        }

        public async Task<List<UserCredit>> getUserCreditHistory( Object? Username)
        {
            try
            {
                List<UserCredit> lstuserCredit = new List<UserCredit>();
                DataSet ds = new DataSet();
                await using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_UserCreditHistory", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                
                        SqlParameter sqlParameter2 = command.Parameters.Add("@Username", SqlDbType.VarChar);
                        sqlParameter2.Value = Username.ToString();
                        connection.Open();
                        using (SqlDataAdapter da = new SqlDataAdapter(command))
                        {
                            da.Fill(ds);

                        }
                        connection.Close();

                        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                        {
                            UserCredit userCredit = new UserCredit();
                            userCredit.CreatedDate = (string)ds.Tables[0].Rows[i]["CreatedDate"];
                            userCredit.CreatedBy = (string)ds.Tables[0].Rows[i]["CreatedBy"];
                            userCredit.Amount = (int)ds.Tables[0].Rows[i]["Amount"];

                            lstuserCredit.Add(userCredit);
                        }



                        return lstuserCredit;

                    }
                }
            }
            catch (SqlException ex)
            {
                return null;
            }


        }
        public string AddCredit(UserCredit usercredit)
        {

            
            try
            {
                DataSet ds = new DataSet();
                using (SqlConnection connection = new SqlConnection(DalConnection.EDBConnectionString))
                {


                    using (SqlCommand command = new SqlCommand("Sp_AddCredit", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        SqlParameter sqlParameter1 = command.Parameters.Add("@Amount", SqlDbType.Int);
                        sqlParameter1.Value = usercredit.Amount;
                        SqlParameter sqlParameter2 = command.Parameters.Add("@Username", SqlDbType.VarChar);
                        sqlParameter2.Value = usercredit.Username;
                        SqlParameter sqlParameter3 = command.Parameters.Add("@CreatedBy", SqlDbType.VarChar);
                        sqlParameter3.Value = usercredit.CreatedBy;


                        connection.Open();
                        command.ExecuteNonQuery();
                        connection.Close();


                        return "success";

                    }
                }
            }
            catch (SqlException ex)
            {
                return "error";
            }
        }


    }
}
