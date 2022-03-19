

$(document).ready(function () {
    console.log("page load");
    var token = getUrlVars()["token"];
    if (token != "" && token != undefined) {
        loginbytoken(token);
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
    //console.log(startdate + ';' + enddate);
    var username = $("#txt_username").val();
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
                window.location = 'index?username=' + username + '&token=' + data;
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
function login() {
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
            data: '{"Username":"' + username + '","Password":"' + password + '"}',
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

                window.location = "login?token="


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