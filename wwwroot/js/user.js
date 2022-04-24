


$(document).ready(function () {

    checktokendetail();

});


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

            if (data.expired == true) {

                window.location = "login";
            } else {
                $("#hdUsername").val(data.username);
                var username = $("#hdUsername").val();
                getuserlist(username);
                var url = window.location.href;
                if (url.includes("uploadphoto")) {
                    var username = getUrlVars()["username"];
                    var password = getUrlVars()["password"];
                    showoption(username, password);
                }

            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


}



function getuserlist(username) {


    $.ajax({
        //cache: false,
        async: false,
        type: "Get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getuserlist/" + username,
        data: '',
        success: function (data) {

            $("#userlist").html(data);
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}


function addnewuser() {
    var username = $("#txt_username").val();
    var password = $("#txt_password").val();
    if (username == '' || password == '') {
        alert("Please enter both username and password.");
    }
    var betting = $('#chkBetting').prop('checked');
    var withdrawal = $('#chkWithdrawal').prop('checked');
    var report = $('#chkReport').prop('checked');
    var display = $('#chkDisplay').prop('checked');
    var createdby = $("#hdUsername").val();

    console.log("betting:" + betting.toString());

    if (betting == false && withdrawal == false && report == false && display == false) {
        alert("Please select a permission");
    } else {

        $.ajax({
            //cache: false,
            async: false,
            type: "Post",
            //dataType: "Json",
            contentType: "application/json; charset=utf-8",
            url: "api/CreateUser",
            data: '{"UserName":"' + username + '","Password":"' + password + '","Betting":' + betting.toString() + ',"Withdrawal":' + withdrawal.toString() + ',"Report":' + report.toString() + ',"Display":' + display.toString() + ',"CreatedBy":"' + createdby + '"}',
            success: function (data) {

                if (data == "Success") {
                    var username = $("#hdUsername").val();
                    getuserlist(username);
                }
            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });
    }

}

function deleteuser() {
    var createdby = $("#hdUsername").val();
    var username = $("#hdSelectedUser").val();

        $.ajax({
            //cache: false,
            async: false,
            type: "Post",
            //dataType: "Json",
            contentType: "application/json; charset=utf-8",
            url: "api/DeleteUser",
            data: '{"UserName":"' + username + '","CreatedBy":"' + createdby + '"}',
            success: function (data) {

                if (data == "Success") {
                    var username = $("#hdUsername").val();
                    getuserlist(username);
                    closepopup();
                }
            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });
    

}


function unlockuser() {
    var username = $("#hdSelectedUser").val();
    var createdby = $("#hdUsername").val();
    if (confirm('Are you sure to unlock this user?')) {
        $.ajax({
            //cache: false,
            async: false,
            type: "Post",
            //dataType: "Json",
            contentType: "application/json; charset=utf-8",
            url: "api/UnlockUser",
            data: '{"UserName":"' + username + '","CreatedBy":"' + createdby + '"}',
            success: function (data) {

                if (data == "Success") {
                    var username = $("#hdUsername").val();
                    getuserlist(username);
                    closepopup();
                }
            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });
    }

}


function uploadid() {
    var username = $("#hdSelectedUser").val();
    var createdby = $("#hdUsername").val();
    var password = $("#txtchangepassword").val();
    window.location = window.location + "&uploadphoto=1&username=" + username + "&password=" + password;

}



function showoption(username, password) {
    console.log("show option");
    getusercredit(username);
    
    $("#div_alert").show();
    $("#div_popup_title").html("Username: " + username);
    $("#hdSelectedUser").val(username);
    $("#txtchangepassword").val(password);

    userdocument();
    //var d = new Date($.now());
    //var datestr = (d.getDate() + (d.getMonth() + 1) + d.getFullYear() + d.getHours() + d.getMinutes() + d.getSeconds());
    //$("#imgupload").prop("src", "https://gamestorage.azurewebsites.net/id/" + username + ".jpg?" + datestr);

}
function closepopup() {
    $("#div_alert").hide();
    $("#hdSelectedUser").val("");
}

function updatepassword() {
    var username = $("#hdSelectedUser").val();
    var newpassword = $("#txtchangepassword").val();
    $.ajax({
        //cache: false,
        async: false,
        type: "Post",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/updatePassword",
        data: '{"UserName":"' + username + '","Password":"' + newpassword + '"}',
        success: function (data) {

            if (data == "Success") {
                var username = $("#hdUsername").val();
                getuserlist(username);
                closepopup();
            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });

}

function addcredit() {
    var amount = parseInt($("#txtcredit").val());

    var username = $("#hdSelectedUser").val();
    var createdby = $("#hdUsername").val();
    $.ajax({
        //cache: false,
        async: false,
        type: "Post",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/addcredit",
        data: '{"UserName":"' + username + '","Amount":' + amount + ',"CreatedBy":"' + createdby + '"}',
        success: function (data) {
            if (data == "success") {
                cancelcredit();
                getusercredit(username);
            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}

function deductcredit() {
    var amount = parseInt($("#txtcredit").val());
    var username = $("#hdSelectedUser").val();
    var createdby = $("#hdUsername").val();
    amount = -amount;
    $.ajax({
        //cache: false,
        async: false,
        type: "Post",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/addcredit",
        data: '{"UserName":"' + username + '","Amount":' + amount + ',"CreatedBy":"' + createdby + '"}',
       success: function (data) {
           if (data == "success") {
               cancelcredit();
               getusercredit(username);
           }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}

function fullscreen(url) {
    $("#div_popup_credithistory").show();
    $("#span_popup_title").html("លិខិតបញ្ជាក់អត្តសញ្ញាណ");
    //$("#div_credithistory").html("");
    //console.log($(e).attr("src"));
    $("#div_credithistory").html('<img style="width:100%" src="' + url + '" />');
    
}

function deletefile(uploadid) {
    var createdby = $("#hdUsername").val();
    $.ajax({
        //cache: false,
        async: false,
        type: "Post",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/deletedocument",
        data: '{"UploadID":' + uploadid + ',"CreatedBy":"' + createdby + '"}',
        success: function (data) {
            if (data == "success") {
                userdocument();
            }
            
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}

function credithistory() {
    var username = $("#hdSelectedUser").val();
    $.ajax({
        //cache: false,
        async: false,
        type: "Get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getUserCreditHistory/" + username,
        data: '',
        success: function (data) {
            var html = '';
            html += '<table style="width:100%"><tr>';
            html += '<td>ថ្ងៃទី</td><td>ទឹកប្រាក់</td>';
            html += '</tr>';
            for (var i = 0; i < data.length; i++) {
                var createdDate = data[i].createdDate;
                var amount = data[i].amount;
                var createdBy = data[i].createdby;
                html += '<tr>';
                html += '<td>'+ createdDate + '</td><td>' + amount + 'R</td>';
                html += '</tr>';

            }
            html += '</table>';
            $("#div_popup_credithistory").show();
            $("#span_popup_title").html("ទឹកប្រាក់បានដាក់ ឬដក");
            $("#div_credithistory").html(html);
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}

function userdocument() {
    var username = $("#hdSelectedUser").val();
    $.ajax({
        //cache: false,
        async: false,
        type: "Get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getUserDocument/" + username,
        data: '',
        success: function (data) {
            var html = '';
            html += '<table style="width:100%">';
            //html += '<tr>'
            //html += '<td>ថ្ងៃទី</td><td>ឈ្មោះ</td>';
            //html += '</tr>';
            for (var i = 0; i < data.length; i++) {
                var createdDate = data[i].createdDate;
                var filename = data[i].filename;
                var createdBy = data[i].createdby;
                var photoUrl = data[i].photoUrl;
                var uploadid = data[i].uploadID;
                html += '<tr>';
                html += '<td style="text-align:left;">រូបថត ' + createdDate + '</td>'
                html += '<td><span id="actionimg" class="icon-fullscreen"  onclick="fullscreen(' + "'" + photoUrl + "'" + ')"><i class="fa fa-picture-o"></i> </span>';
                html += '<span id="actionimg" class="icon-fullscreen"  onclick="deletefile(' + uploadid + ')"><i class="fa fa-trash"></i> </span></td> ';
                html += '</tr>';

            }
            html += '</table>';
           
            $("#div_doc").html(html);
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}
function closepopupcredithistory() {
    $("#div_popup_credithistory").hide();
}
function showaddcredit() {
  
   
    $("#div_update_credit").show();
    $("#span_credit_title").html("ទឹកប្រាក់ត្រូវដាក់បន្ថែម");
    $("#spanaddcredit").show();
    $("#spandeductcredit").hide();
    $("#spanshowaddcredit").hide();
    $("#spanshowdeductcredit").hide();

}


function showdeductcredit() {
    $("#div_update_credit").show();
    $("#span_credit_title").html("ទឹកប្រាក់ត្រូវដកចេញ");
    $("#spanaddcredit").hide();
    $("#spandeductcredit").show();
    $("#spanshowaddcredit").hide();
    $("#spanshowdeductcredit").hide();

}
function cancelcredit() {
    $("#div_update_credit").hide();
    $("#spanshowaddcredit").show();
    $("#spanshowdeductcredit").show();
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
            
            //$("#div_credit").html("R" + data);
            $("#spancredit").html("R" + data);
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}