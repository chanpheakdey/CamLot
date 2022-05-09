$(document).ready(function () {
   
   
        checktokendetail();
    
    
   
});


function viewformback() {
    var token = getUrlVars()["token"];
    var backhome = getUrlVars()["backhome"];
    if (token != "" && token != undefined) {
        if (backhome == "0") {
            window.location = 'betnow?token=' + token;
        } else {
            window.location = "login?token=" + token;
        }
    }
    //else {
    //    var username = $("#txt_username").val();
    //    viewformbyusername(formname, username);
    //}
}

function scansearch(qr) {
    scanQRresult(qr);
    closepopupsearch();
}
function closepopupsearch() {
    $("#div_search").hide();
}
function closepopupsearchnotyetwithdraw() {
    $("#div_search_notyet_withdraw").hide();
}
function showsearch() {
    $("#div_search").show();
    $("#div_searchresult").html("");
}

function showsearch_notyet_withdraw() {
    $("#div_search_notyet_withdraw").show();
    $("#div_searchresult_notyearwithdraw").html("");
    loadhistory_notyetwithdraw();
    var username = $("#hdUsername").val();
    if (username.toLowerCase == "admin") {
        $("#span_popup_title_win").html("ស្វែងរកបុងមិនទាន់ដកប្រាក់")
        
    } else {
        $("#span_popup_title_win").html("ស្វែងរកបុងរង្វាន់")
        
    }
}


function searchreceipt() {
    var gameid = $("#txtGameID").val();
    loadhistory(gameid);
}


function loadhistory_notyetwithdraw() {
    var username = $("#hdUsername").val();
    if (username.toLowerCase == "admin") {
        //$("#span_popup_title").html("ស្វែងរកបុងមិនទាន់ដកប្រាក់")
        loadhistory_notyetwithdraw_member(username);
    } else {
        //$("#span_popup_title").html("ស្វែងរកបុងរង្វាន់")
        loadhistory_withdraw_member(username);
    }

   
}


function loadhistory_withdraw_member(username) {

    var startdate = "";
    var enddate = "";
    startdate = $("#txtstartdate").val();
    enddate = $("#txtenddate").val();
    $.ajax({
        //cache: false,
        async: false,
        type: "Get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getHistorywithdraw/" + startdate + "/" + enddate + "/" + username,
        data: '',
        success: function (data) {
            console.log(data);
            var html = "";
            var G_totalBet = 0;
            var G_WinAmount = 0;
            html += "<table style='width:100%'>"

            for (var i = 0; i < data.length; i++) {
                var GameID = data[i].gameID;
                var CreatedDate = data[i].createdDate;
                var BetAmount = data[i].betAmount;
                var totalBet = data[i].totalBet;
                G_totalBet += totalBet;

                var WinAmount = data[i].winAmount;
                var Win = data[i].win;

                var betnumber = data[i].betNumber;
                var slotnumber = data[i].slotNumber;
                var bettingID = data[i].bettingID;
                var nickname = data[i].nickname;
                var withdrawal = data[i].withdrawal;
                var withdrawalby = data[i].withdrawalBy;
                var withdrawaldate = data[i].withdrawalDate;
                console.log(GameID)
                html += "<tr style='border-bottom:solid 1px white;'>"
                html += "<td style='width:40%;    vertical-align: top;'>";
                html += "<div>"
                html += "<div>ឆ្នោតទី:" + GameID + "</div>";
                html += "<div>" + CreatedDate + "</div>";
                html += "<div>លេខសំគាល់ #" + bettingID + "</div>";

                html += "<div>ភ្នាល់ R" + BetAmount; + '</div>';
                html += "<div>  សរុប R" + totalBet + "</div>";
                html += "<div style='font-weight:bold;'>" + nickname + "</div>";
                html += "</div>";
                html += "</td>";
                html += "<td style='width:40%'>";
                html += "<div>"
                html += "<div>ប្រភេទ:" + slotnumber + "</span></div>";
                html += "<div>លេខភ្នាល់:" + betnumber + "</div>";
                if (Win == true) {
                    html += "<div style='color:#f73'>រង្វាន់: R" + WinAmount + "</div>";
                    G_WinAmount += WinAmount;
                    if (withdrawal == true) {
                        html += "<div>បានដកប្រាក់ហើយ</div>"
                        html += "<div>អ្នកដក " + withdrawalby + "</div><div> " + withdrawaldate + "</div>"

                    } else {
                        html += "<div style='color:#f73'>មិនទាន់ដកប្រាក់</div>"

                    }
                }

                html += "</div>";
                html += "</td>";

                html += "<td>";

                html += "<div style='text-align:center;'>";
                html += '<span class="span-print" onclick="scansearch(' + bettingID + ')"><i class="fa fa-qrcode" aria-hidden="true"></i></span>';
                html += "</div>";
                html += "</td>";
                html += "</tr>";

            }
            html += "</table>"

            html += "<div>ចំនួនភ្នាល់: <span>" + data.length + " វិក័យបត្រ</span></div>"
            html += "<div>ទឹកប្រាក់ភ្នាល់សរុប: <span>R" + G_totalBet + "</span></div>"
            html += "<div>រង្វាន់សរុប: <span>R" + G_WinAmount + "</span></div>"

            if (html == "") {
                $("#div_searchresult_notyearwithdraw").html("គ្មានលទ្ធផល");

            } else {
                $("#div_searchresult_notyearwithdraw").html(html);

            }

        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}


function loadhistory_notyetwithdraw_member(username) {
   
    var startdate="";
    var enddate="";
    startdate = $("#txtstartdate").val();
    enddate = $("#txtenddate").val();
    $.ajax({
        //cache: false,
        async: false,
        type: "Get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getHistoryNotyetwithdraw/" + startdate + "/" + enddate + "/" + username,
        data: '',
        success: function (data) {
            console.log(data);
            var html = "";
            var G_totalBet = 0;
            var G_WinAmount = 0;
            html += "<table style='width:100%'>"

            for (var i = 0; i < data.length; i++) {
                var GameID = data[i].gameID;
                var CreatedDate = data[i].createdDate;
                var BetAmount = data[i].betAmount;
                var totalBet = data[i].totalBet;
                G_totalBet += totalBet;

                var WinAmount = data[i].winAmount;
                var Win = data[i].win;

                var betnumber = data[i].betNumber;
                var slotnumber = data[i].slotNumber;
                var bettingID = data[i].bettingID;
                var nickname = data[i].nickname;
                var withdrawal = data[i].withdrawal;
                var withdrawalby = data[i].withdrawalBy;
                var withdrawaldate = data[i].withdrawalDate;
                console.log(GameID)
                html += "<tr style='border-bottom:solid 1px white;'>"
                html += "<td style='width:40%;    vertical-align: top;'>";
                html += "<div>"
                html += "<div>ឆ្នោតទី:" + GameID + "</div>";
                html += "<div>" + CreatedDate + "</div>";
                html += "<div>លេខសំគាល់ #" + bettingID + "</div>";

                html += "<div>ភ្នាល់ R" + BetAmount; + '</div>';
                html += "<div>  សរុប R" + totalBet + "</div>";
                html += "<div style='font-weight:bold;'>" + nickname + "</div>";
                html += "</div>";
                html += "</td>";
                html += "<td style='width:40%'>";
                html += "<div>"
                html += "<div>ប្រភេទ:" + slotnumber + "</span></div>";
                html += "<div>លេខភ្នាល់:" + betnumber + "</div>";
                if (Win == true) {
                    html += "<div style='color:#f73'>រង្វាន់: R" + WinAmount + "</div>";
                    G_WinAmount += WinAmount;
                    if (withdrawal == true) {
                        html += "<div>បានដកប្រាក់ហើយ</div>"
                        html += "<div>អ្នកដក " + withdrawalby + "</div><div> " + withdrawaldate + "</div>"

                    } else {
                        html += "<div style='color:#f73'>មិនទាន់ដកប្រាក់</div>"

                    }
                }

                html += "</div>";
                html += "</td>";

                html += "<td>";

                html += "<div style='text-align:center;'>";
                html += '<span class="span-print" onclick="scansearch(' + bettingID + ')"><i class="fa fa-qrcode" aria-hidden="true"></i></span>';
                html += "</div>";
                html += "</td>";
                html += "</tr>";

            }
            html += "</table>"

            html += "<div>ចំនួនភ្នាល់: <span>" + data.length + " វិក័យបត្រ</span></div>"
            html += "<div>ទឹកប្រាក់ភ្នាល់សរុប: <span>R" + G_totalBet + "</span></div>"
            html += "<div>រង្វាន់សរុប: <span>R" + G_WinAmount + "</span></div>"

            if (html == "") {
                $("#div_searchresult_notyearwithdraw").html("គ្មានលទ្ធផល");

            } else {
                $("#div_searchresult_notyearwithdraw").html(html);

            }

        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}

function loadhistory(gameid) {
    var username = $("#hdUsername").val();
  
    $.ajax({
        //cache: false,
        async: false,
        type: "Get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getHistorybyGameID/" + gameid + "/" + username,
        data: '',
        success: function (data) {
            console.log(data);
            var html = "";
            var G_totalBet = 0;
            var G_WinAmount = 0;
            html += "<table style='width:100%'>"

            for (var i = 0; i < data.length; i++) {
                var GameID = data[i].gameID;
                var CreatedDate = data[i].createdDate;
                var BetAmount = data[i].betAmount;
                var totalBet = data[i].totalBet;
                G_totalBet += totalBet;

                var WinAmount = data[i].winAmount;
                var Win = data[i].win;

                var betnumber = data[i].betNumber;
                var slotnumber = data[i].slotNumber;
                var bettingID = data[i].bettingID;
                var nickname = data[i].nickname;
                var withdrawal = data[i].withdrawal;
                var withdrawalby = data[i].withdrawalBy;
                var withdrawaldate = data[i].withdrawalDate;
                console.log(GameID)
                html += "<tr style='border-bottom:solid 1px white;'>"
                html += "<td style='width:40%;    vertical-align: top;'>";
                html += "<div>"
                html += "<div>ឆ្នោតទី:" + GameID + "</div>";
                html += "<div>" + CreatedDate + "</div>";
                html += "<div>លេខសំគាល់ #" + bettingID + "</div>";

                html += "<div>ភ្នាល់ R" + BetAmount; + '</div>';
                html += "<div>  សរុប R" + totalBet + "</div>";
                html += "<div style='font-weight:bold;'>" + nickname + "</div>";
                html += "</div>";
                html += "</td>";
                html += "<td style='width:40%'>";
                html += "<div>"
                html += "<div>ប្រភេទ:" + slotnumber + "</span></div>";
                html += "<div>លេខភ្នាល់:" + betnumber + "</div>";
                if (Win == true) {
                    html += "<div style='color:#f73'>រង្វាន់: R" + WinAmount + "</div>";
                    G_WinAmount += WinAmount;
                    if (withdrawal == true) {
                        html += "<div>បានដកប្រាក់ហើយ</div>"
                        html += "<div>អ្នកដក " + withdrawalby + " </div><div>" + withdrawaldate + "</div>"

                    } else {
                        html += "<div style='color:#f73'>មិនទាន់ដកប្រាក់</div>"

                    }
                }

                html += "</div>";
                html += "</td>";

                html += "<td>";

                html += "<div style='text-align:center;'>";
                html += '<span class="span-print" onclick="scansearch(' + bettingID + ')"><i class="fa fa-qrcode" aria-hidden="true"></i></span>';
                html += "</div>";
                html += "</td>";
                html += "</tr>";

            }
            html += "</table>"

            html += "<div>ចំនួនភ្នាល់: <span>" + data.length + " វិក័យបត្រ</span></div>"
            html += "<div>ទឹកប្រាក់ភ្នាល់សរុប: <span>R" + G_totalBet + "</span></div>"
            html += "<div>រង្វាន់សរុប: <span>R" + G_WinAmount + "</span></div>"

            if (html == "") {
                $("#div_searchresult").html("គ្មានលទ្ធផល");

            } else {
                $("#div_searchresult").html(html);

            }

        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


function checktokendetail() {
    var token = getUrlVars()["token"];

    $.ajax({
        //cache: false,
        async: false,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/CheckTokenDetail",
        data: '{"TokenID":"' + token + '"}',
        success: function (data) {
            console.log(data);
            if (data.expired == true) {

                window.location = "login";
            } else {
                $("#hdUsername").val(data.username);
                var username = $("#hdUsername").val();
                console.log(username);
                if (username == "admin" || username == "Admin") {
                    $("#span_notyetwithdrawal").show();

                } else {
                    $("#span_notyetwithdrawal").show();
                }
                getusercredit(username);
                var qrcode = getUrlVars()["qrcode"];
                console.log(qrcode);
                if (qrcode != "" && qrcode != null) {
                    scanQRresult(qrcode);
                }

                //getuserlist(username);
            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


}




function getusercredit(username) {

    $.ajax({
        //cache: false,
        async: false,
        type: "Get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getusercredit/" + username,
        data: '',
        success: function (data) {
            console.log(data);
            $("#div_credit").html("R" + data);
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}

function gotoscanner() {
    window.location = window.location + "&scanner=1";
}
function scanresult() {
    $("#div_result").show();
    var code = $("#txt_code").val();

    $.ajax({
        //cache: false,
        async: false,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/`1                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ",
        data: '{"bettingID": ' + code + '}',
        success: function (dataobj) {
            console.log(dataobj);
            var html = "";
            
            var win = dataobj.win;
            html += "<table class='tbl-result'>"
            html += "<tr>"
            html += "<td></td><td style='width:40px;text-align:center;'>A</td><td style='width:40px;text-align:center;'>B</td><td>C</td><td>D</td><td>E</td>"
            html += "</tr>"
            html += "<tr>"
            html += "<td>លទ្ធផលៈ</td><td>" + dataobj.resultSlotA + "</td><td>" + dataobj.resultSlotB + "</td><td>" + dataobj.resultSlotC + "</td><td>" + dataobj.resultSlotD + "</td><td>" + dataobj.resultSlotE + "</td>"
            html += "</tr>"
            html += "</table>"

            if (win == true) {
                //qrcode_img_base64(bettingid, html);                  
                var withdrawal = dataobj.withdrawal;
                if (withdrawal == true) {
                    html += "ឈ្នះ: R" + (dataobj.winAmountA + dataobj.winAmountB + dataobj.winAmountC + dataobj.winAmountD + dataobj.winAmountE) + " <span style='color:red;'>(បានដកប្រាក់ហើយ)</span>";
                    html += '<div>អ្នកដកៈ ' + dataobj.withdrawalBy + ' (' + dataobj.withdrawalDate + ')</div>';
                    //html += '<div style="text-align:center;"><input type="button" class="button-print print_button" value="Print" onclick="Printwithdraw()"></div>';

                } else {
                    var totalwin = dataobj.winAmountA + dataobj.winAmountB + dataobj.winAmountC + dataobj.winAmountD + dataobj.winAmountE;
                    html += "<div>ឈ្នះ: R" + totalwin + "</div>";
                    var username = $("#hdUsername").val();
                    console.log("username:" + username);
                    html += '<div style="text-align:center;"><input type="button" class="button-print" value="Withdraw" onclick="withdraw(' + code + ',' + "'" + username+ "'" + ',' + totalwin + ')"></div>';
                }
               
            } else {
                
            }
            html += create_receipt(dataobj);

            $("#div_result").html(html);
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


}


function scanQRresult(qrcode) {
    $("#div_result").show();
    var code = qrcode;

    $.ajax({
        //cache: false,
        async: false,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getbettingresult",
        data: '{"bettingID": ' + code + '}',
        success: function (dataobj) {
            console.log(dataobj);
            var html = "";
            var win = dataobj.win;
            html += "<table class='tbl-result'>"
            html += "<tr>"
            html += "<td></td><td style='width:40px;text-align:center;'>A</td><td style='width:40px;text-align:center;'>B</td><td>C</td><td>D</td><td>E</td>"
            html += "</tr>"
            html += "<tr>"
            var result1 = ""; var result2 = ""; var result3 = ""; var result4 = ""; var result5 = "";
            if (parseInt(dataobj.resultSlotA) < 10) { result1 = '0' + dataobj.resultSlotA } else { result1 = dataobj.resultSlotA }
            if (parseInt(dataobj.resultSlotB) < 10) { result2 = '0' + dataobj.resultSlotB } else { result2 = dataobj.resultSlotB }
            if (parseInt(dataobj.resultSlotC) < 10) { result3 = '0' + dataobj.resultSlotC } else { result3 = dataobj.resultSlotC }
            if (parseInt(dataobj.resultSlotD) < 10) { result4 = '0' + dataobj.resultSlotD } else { result4 = dataobj.resultSlotD }
            if (parseInt(dataobj.resultSlotE) < 10) { result5 = '0' + dataobj.resultSlotE } else { result5 = dataobj.resultSlotE }

            html += "<td>លទ្ធផលៈ</td><td>" + result1 + "</td><td>" + result2 + "</td><td>" + result3 + "</td><td>" + result4 + "</td><td>" + result5 + "</td>"
            html += "</tr>"
            html += "</table>"

            if (win == true) {
                //qrcode_img_base64(bettingid, html);                  
                var withdrawal = dataobj.withdrawal;
                if (withdrawal == true) {
                    html += "ឈ្នះ: R" + (dataobj.winAmountA + dataobj.winAmountB + dataobj.winAmountC + dataobj.winAmountD + dataobj.winAmountE);
                    html += '<div>អ្នកដកៈ ' + dataobj.withdrawalBy + ' (' + dataobj.withdrawalDate + ')</div>';
                    html += " <div class='div-scan-lost'>បានដកប្រាក់ហើយ</div>"
                    //html += '<div style="text-align:center;"><input type="button" class="button-print print_button" value="Print" onclick="Printwithdraw()"></div>';

                } else {
                    var totalwin = dataobj.winAmountA + dataobj.winAmountB + dataobj.winAmountC + dataobj.winAmountD + dataobj.winAmountE;
                    html += "<div class='div-scan-lost'>ឈ្នះ: R" + totalwin + "</div>";
                    var username = $("#hdUsername").val();
                    console.log("username:" + username);
                    html += '<div style="text-align:center;"><input type="button" class="button-withdrawal" value="ដកប្រាក់" onclick="confirmwithdraw(' + code + ',' + "'" + username + "'" + ',' + totalwin + ')"></div>';
                }

            } else {
                html += "<div class='div-scan-lost'>មិនត្រូវរង្វាន់</div>";
            }
            html += create_receipt(dataobj);
            $("#div_result").html(html);
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


}

function withdraw(bettingid, username, withdrawalAmount) {
    var html = '';
    html +=`<span class="span-confirm-action"><input type="button" class="button-print" value="Yes" onclick="confirmwithdraw(` + bettingid + `,'` + username + `',` + withdrawalAmount + `)" /></span>
            <span class="span-confirm-action"><input type="button" class="button-print" value="Cancel" onclick="cancelwithdraw()" /></span>`

    $("#div_confirm_action").html(html);
    $("#div_confirm").show();
    $("#div_login").hide();
}

function cancelwithdraw() {
    $("#div_confirm").hide();
    $("#div_login").show();
}
function refreshpage() {
    window.location = window.location.href;
}
function confirmwithdraw(bettingid, username,withdrawalAmount) {
   
        $.ajax({
            //cache: false,
            async: false,
            type: "POST",
            //dataType: "Json",
            contentType: "application/json; charset=utf-8",
            url: "api/withdraw",
            data: '{"bettingID": ' + bettingid + ',"createdBy":"' + username + '","WithdrawalAmount":' + withdrawalAmount + '}',
            success: function (dataobj) {
                var result_tran = dataobj.d;
                if (result_tran == "error") {
                    //alert("error");
                    window.location = window.location.href;
                } else {
                    var qrcode = getUrlVars()["qrcode"];
                    
                    if (qrcode != "" && qrcode != null) {
                        scanQRresult(qrcode);
                    } else {
                        scanresult();
                    }
                    getusercredit(username);
                   // cancelwithdraw();
                }

            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });
    
   
}

function create_receipt(objBetting) {
    

    var html = "";
    html += '<div style="font-size:xx-large;">';
    html += "<img src='images/CamLotto.png' style='width:100px;'>";
    html += '<span class="logo-title" ><span style="color:black;">CAM</span><span style="color:#c67819"> LOTTO</span> <br></span>';
    html += "</div>";
    html += "<div>ឆ្នោតទី:" + objBetting.gameID + "</div>";
    html += "<div>ម៉ោងចាក់ឆ្នោត:" + objBetting.createdDate + "</div>";


    html += printdetail(objBetting);
    html += "<div style='padding:5px;border-bottom: solid 1px gray;'></div>";

    html += "<div>Printed by:" + objBetting.createdBy + "</div>";
    return html;
}

function printdetail(objresult) {

        var html = "";

        html += "<div>";
        //html += "<div>ប្រភេទ:</div>";
        html += html_slot(objresult);
        html += "</div>";

        html += "<div>";
        //html += "<div>លេខដែលបានចាក់:</div>";
    var betnumber = objresult.betNumber;
    var array = betnumber.split(',');

    html += load_numberlist_html(array);
        html += "</div>";

        html += "<div style='width: 100%;display: inline-block;margin-top: 20px;' >";

     
        html += "<div>ចំនួនទឹកប្រាក់:" + objresult.betAmount + " KHR</div>";
        html += "<div>សរុប:" + objresult.totalBet + " KHR</div>";
        html += "</div>";

        html += "</div>";

        //console.log(html);
    return html;
    

}

function load_numberlist_html(list) {
    var html = "";
    html += "<span class='span-slot'>ចាក់លេខៈ</span> ";
    for (var i = 0; i < list.length; i++) {
        var number = list[i];
        if (parseInt(number) < 10) {
            html += "<div class='round-number' style='line-height:30px;float:none;display:inline-block;'>0" + number + "</div>";
        } else {
            html += "<div class='round-number' style='line-height:30px;float:none;display:inline-block;'>" + number + "</div>";
        }
        
    }

    return html;
}

function html_slot(objresult) {
    var slotstring = objresult.slotNumber;
    console.log("slot:" + slotstring);
    var array = slotstring.split(',');
    console.log(array);
    var slotA = '';
    var slotB = '';
    var slotC = '';
    var slotD = '';
    var slotE = '';

    for (var i = 0; i < array.length; i++) {
        var slot = array[i];
        console.log(slot);
        if (slot == "1") {
            slotA = 'active';
        } else if (slot == "2") {
            slotB = 'active';
        } else if (slot == "3") {
            slotC = 'active';
        } else if (slot == "4") {
            slotD = 'active';
        } else if (slot == "5") {
            slotE = 'active';
        }
    }

    console.log("slotA:" + slotA);
    var html = "";
    html += "<span class='span-slot'>ប្រភេទ:</span> ";
 
    if (slotA == 'active') {
        html += "<div class='round-number' style='line-height:30px;'>A</div>";
       
    }
    if (slotB == 'active') {
        html += "<div class='round-number' style='line-height:30px;'>B</div>";
       
    }
    if (slotC == 'active') {
        html += "<div class='round-number' style='line-height:30px;'>C</div>";
        
    }
    if (slotD == 'active') {
        html += "<div class='round-number' style='line-height:30px;'>D</div>";
       
    }
    if (slotE == 'active') {
        html += "<div class='round-number' style='line-height:30px;'>E</div>";
      
    }

    return html = "<div style='width: 100%;display: inline-block;'>" + html + "</div>";
}


function Printwithdraw() {
    var html = $("#div_result").html();
    PrintElem(html);
}
function PrintElem(html) {

    //alert("aa");
    var innerhtml = html;

    var mycss = '';

    mycss += '@media all {';
    //mycss += '.page-break { display: none; }';
    mycss += '}';

    mycss += '@media print {';
    mycss += 'body {-webkit-print-color-adjust: exact;color-adjust: exact;}';
    mycss += '.page-break { display: none; }';
    mycss += '.printhidden{';
    mycss += 'display:block !important;page-break-after: always;'
    mycss += '}';
    mycss += '}';

    mycss += '.print_button{';
    mycss += 'display:none !important;'
    mycss += '}';

    mycss += 'img {';
    mycss += 'vertical-align: middle';
    mycss += '}';

    mycss += '.span-slot {';
    mycss += 'DISPLAY: inline-block;';
    mycss += 'padding: 10px 5px;';
    mycss += 'width: 100%;';
    mycss += '}';

    mycss += '.round-number{'
    mycss += 'width: 34px;'
    mycss += 'height: 34px;'
    mycss += 'line-height: 34px;'
    mycss += 'text-align: center;'
    mycss += 'font-size: 20px;'
    mycss += 'border: solid 1px gray;'
    mycss += 'border-radius:50%;'
    mycss += 'float: left;'
    mycss += 'margin: 5px;'
    mycss += '}'

    mycss += `.tbl-result tr td{
        width:40px;
        text-align:center;
        }`




    mycss += '.page-break{';
    mycss += 'page-break-after: always;';
    mycss += '}';


    var mywindow = window.open('', 'PRINT', 'height=1500,width=1000');
    mywindow.document.write('<html><head>');


    var java = '';
    java += 'function print_receipt(){'
    java += 'window.print();window.close();}';

    mywindow.document.write('<script>');
    mywindow.document.write(java);
    mywindow.document.write('<\/script>');

    mywindow.document.write('<style>');
    mywindow.document.write(mycss);
    mywindow.document.write('</style>');

    mywindow.document.write('</head><body>');
    mywindow.document.write('<div style="width:5.8cm;">');
    //mywindow.document.write('<span id="sp_print" onclick="printme(this)" style="cursor:pointer;position:fixed;top:10px;right:10px;border-radius: 30px;background-color: #908d8d;color: white;padding: 5px;width: 60px;text-align: center;box-shadow: 1px 1px 1px rgb(0 0 0 / 32%), inset 1px 1px 1px rgb(255 255 255 / 44%);">Print</span>');
    mywindow.document.write(innerhtml);
    mywindow.document.write('</div>');
    //mywindow.document.write('<div  style="text-align:center;width:8cm;"><img onload="print_receipt()" src="' + imgdata + '" style="height:80px;" /></div>');

    mywindow.document.write('</body></html>');




    //mywindow.document.close(); // necessary for IE >= 10
    //mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}



function checktoken() {
    var token = getUrlVars()["token"];

    $.ajax({
        //cache: false,
        async: false,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/CheckToken",
        data: '{"TokenID":"' + token + '"}',
        success: function (data) {
            
            if (data == true) {
                
                window.location = "index";
            } 
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


}