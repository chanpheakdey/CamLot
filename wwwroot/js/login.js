

$(document).ready(function () {
    console.log("page load");
    var token = getUrlVars()["token"];
    if (token != "" && token != undefined) {
        loginbytoken(token);
    } else {
        $("#div_calculator").hide();
        $("#div_login").show();
    }
    
});


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


function viewform(formname) {
    var token = getUrlVars()["token"];
    if (token != "" && token != undefined) {
        viewformbytoken(formname,token);
    }
    //else {
    //    var username = $("#txt_username").val();
    //    viewformbyusername(formname, username);
    //}
}

function viewformbytoken(formname, token) {
    //console.log(startdate + ';' + enddate);

    var data = token;

            if (formname == 'betting') {
                window.location = 'betnow?token=' + data;
            } else if (formname == 'withdrawal') {
                window.location = 'scanresult?token=' + data;
            } else if (formname == 'report') {
                window.location = 'report?token=' + data;
            } else if (formname == 'display') {
                window.location = 'result?token=' + data;
            } else if (formname == 'user') {
                window.location = 'user?token=' + data;
            }
        


}

function viewformbyusername(formname,username) {
    //console.log(startdate + ';' + enddate);

    
    $.ajax({
        //cache: false,
        async: false,
        type: "Get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getToken/" + username,
        data: '',
        success: function (data) {

            if (formname == 'betting') {
                window.location = 'bet?username=' + username + '&token=' + data;
            } else if (formname == 'withdrawal') {
                window.location = 'scanresult?username=' + username + '&token=' + data;
            } else if (formname == 'report') {
                window.location = 'report?username=' + username + '&token=' + data;
            } else if (formname == 'display') {
                window.location = 'display?username=' + username + '&token=' + data;
            } else if (formname == 'user') {
                window.location = 'user?username=' + username + '&token=' + data;
            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


  
}

function showchangepassword() {
    $("#div_alert").show();
   
}

function closepopup() {
    $("#div_alert").hide();

} 

function changepassword() {
    console.log("chage password")
    var currentpassword = $("#txtcurentpassword").val();
    console.log("currentpassword" + currentpassword)

    var newpassword = $("#txtnewpassword").val();
    var retypepassword = $("#txtretypenewpassword").val();
    if (newpassword == retypepassword && newpassword != "" && newpassword.length>=6) {
        var token = getUrlVars()["token"];
        if (token != "" && token != undefined) {
            console.log(token);
            $.ajax({
                //cache: false,
                async: false,
                type: "POST",
                //dataType: "Json",
                contentType: "application/json; charset=utf-8",
                url: "api/changepassword",
                data: '{"Password":"' + currentpassword + '","NewPassword":"' + newpassword + '","Token":"' + token + '"}',
                success: function (data) {
                    console.log(data);
                    if (data == "Not matched") {
                        $("#div_info").html("Current Password not matched");
                    } else {
                        if (data == "Success") {
                            $("#div_info").html("Password updated");
                        } else {
                            $("#div_info").html("Enter your current password");
                        }
                    }
                },
                error: function (result) {
                    console.log(result);
                    //$('#loading').hide();
                }
            });

        } else {
            window.location = "login?token="
        }
    } else {
        if (newpassword != "") {
            if (newpassword.length >= 6) {
                $("#div_info").html("New Password not matched");
            } else {
                
                $("#div_info").html("6 characters up");
            }
        } else {
            $("#div_info").html("Please enter new password.");
        }
    }
    
}

function login() {
    var token = getUrlVars()["token"];
    var username = $("#txt_username").val();
    var password = $("#txt_password").val();
    console.log(username + ',' + password);
    if (username == '' || password == '') {
        alert("Please enter both username and password.");
    } else {
        $.ajax({
            //cache: false,
            async: false,
            type: "POST",
            //dataType: "Json",
            contentType: "application/json; charset=utf-8",
            url: "api/userlogin",
            data: '{"Username":"' + username + '","Password":"' + password + '","Token":"' + token + '"}',
            success: function (dataobj) {
                console.log(dataobj);
                var userid = dataobj.userID;
                console.log("UserID:" + userid);
                if (userid == -1) {
                    alert("error");
                } else {
                    if (userid == 0) {
                        alert("invalid username or password!");
                    } else {
                        console.log("PlaceID:" + dataobj.placeID);



                        $("#hd_placeid").val(dataobj.placeID);
                        $("#div_calculator").show();
                        $("#div_login").hide();

                        var Betting = dataobj.betting;
                        var Withdrawal = dataobj.withdrawal;
                        var Report = dataobj.report;
                        var Admin = dataobj.admin;

                        if (Betting == false) {
                            $("#span_betting").hide();
                        }
                        if (Withdrawal == false) {
                            $("#span_withdrawal").hide();
                        }
                        if (Report == false) {
                            $("#span_report").hide();
                        }
                        if (Admin == false) {
                            $("#span_user").hide();
                        }


                        //    var withdrawurl = getwithdrawurl(username);
                        //    console.log("withdrawurl:" + withdrawurl);
                        //    window.location = withdrawurl;
                        

                    }
                }


            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });
    }
}


function loginbytoken(token) {
    console.log(token);
        $.ajax({
            //cache: false,
            async: false,
            type: "POST",
            //dataType: "Json",
            contentType: "application/json; charset=utf-8",
            url: "api/userloginbytoken",
            data: '{"TokenID":"' + token + '"}',
            success: function (dataobj) {
                console.log(dataobj);
                var userid = dataobj.userID;
                console.log("UserID:" + userid);
                if (userid == -1) {
                    alert("error");
                    $("#div_calculator").hide();
                    $("#div_login").show();
                } else {
                    if (userid == 0) {
                        //token expired
                        $("#div_calculator").hide();
                        $("#div_login").show();
                    } else {
                        console.log("PlaceID:" + dataobj.placeID);



                        $("#hd_placeid").val(dataobj.placeID);
                        $("#div_calculator").show();
                        $("#div_login").hide();

                        var Betting = dataobj.betting;
                        var Withdrawal = dataobj.withdrawal;
                        var Report = dataobj.report;
                        var Admin = dataobj.admin;

                        if (Betting == false) {
                            $("#span_betting").hide();
                        }
                        if (Withdrawal == false) {
                            $("#span_withdrawal").hide();
                        }
                        if (Report == false) {
                            $("#span_report").hide();
                        }
                        if (Admin == false) {
                            $("#span_user").hide();
                        }


                        //    var withdrawurl = getwithdrawurl(username);
                        //    console.log("withdrawurl:" + withdrawurl);
                        //    window.location = withdrawurl;


                    }
                }


            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });
   
}

function logout() {
    var token = getUrlVars()["token"];
    if (token != "" && token != undefined) {
        $.ajax({
            //cache: false,
            async: false,
            type: "POST",
            //dataType: "Json",
            contentType: "application/json; charset=utf-8",
            url: "api/logout",
            data: '{"TokenID":"' + token + '"}',
            success: function (dataobj) {

                window.location = "login?token=" + token;


            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });

    } else {
        window.location = "login?token="
    }
}

function viewpassword(index) {
    if (index == 0) {
        $('#txtcurentpassword').attr('type', 'text');
    } else {
        if (index == 1) {
            $('#txtnewpassword').attr('type', 'text');
        } else {
            $('#txtretypenewpassword').attr('type', 'text');
        }
    }
}

function hidepassword(index) {
    if (index == 0) {
        $('#txtcurentpassword').attr('type', 'password');
    } else {
        if (index == 1) {
            $('#txtnewpassword').attr('type', 'password');
        } else {
            $('#txtretypenewpassword').attr('type', 'password');
        }
    }
}