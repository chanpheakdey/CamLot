

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
    if (username == '' || password == '') {
        alert("Please enter both username and password.");
    } else {
        $.ajax({
            //cache: false,
            async: false,
            type: "POST",
            //dataType: "Json",
            contentType: "application/json; charset=utf-8",
            url: "api/login",
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

                        if (Betting == false) {
                            $("#span_betting").hide();
                        }
                        if (Withdrawal == false) {
                            $("#span_withdrawal").hide();
                        }
                        if (Report == false) {
                            $("#span_report").hide();
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