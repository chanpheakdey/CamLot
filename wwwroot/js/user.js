


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



function showoption(username,password) {
    $("#div_alert").show();
    $("#div_popup_title").html("Username: " + username);
    $("#hdSelectedUser").val(username);
    $("#txtchangepassword").val(password);
    $("#imgupload").prop("src", username + ".jpg");
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

function addcredit(amount) {
    var username = $("#hdSelectedUser").val();
    $.ajax({
        //cache: false,
        async: false,
        type: "Post",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/addcredit",
        data: '{"UserName":"' + username + '","Amount":' + amount + '}',
        success: function (data) {

        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}

function deductcredit(amount) {
    var username = $("#hdSelectedUser").val();
    $.ajax({
        //cache: false,
        async: false,
        type: "Post",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/deductcredit",
        data: '{"UserName":"' + username + '","Amount":' + amount + '}',
        success: function (data) {

        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}

function showaddcredit() {
    $("#div_update_credit").show();
    $("#span_credit_title").html("ទឹកប្រាក់ត្រូវដាក់បន្ថែម");
    $("#spanaddcredit").show();
    $("#spandeductcredit").hide();
}


function showdeductcredit() {
    $("#div_update_credit").show();
    $("#span_credit_title").html("ទឹកប្រាក់ត្រូវដកចេញ");
    $("#spanaddcredit").hide();
    $("#spandeductcredit").show();
}