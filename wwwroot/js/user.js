$(document).ready(function () {
    var username = getUrlVars()["username"];
    getuserlist(username);
});


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


function createuser() {
    var username = $("#txt_username").val();
    var password = $("#txt_password").val();
    if (username == '' || password == '') {
        alert("Please enter both username and password.");
    }
    var betting = $('#chkBetting').val();
    var withdrawal = $('#chkWithdrawal').val();
    var report = $('#chkReport').val();
    var display = $('#chkDisplay').val();

    if (betting == false && withdrawal == false && report == false && display == false) {
        alert("Please select a permission");
    } else {

        $.ajax({
            //cache: false,
            async: false,
            type: "Get",
            //dataType: "Json",
            contentType: "application/json; charset=utf-8",
            url: "api/CreateUser",
            data: '{"Username":"' + username + '","Password":"' + password + '","Betting":' + betting.toString() + ',"Withdrawal":' + withdrawal.toString() + ',"Report":' + report.toString() + ',"Display":' + display.toString() + '}',
            success: function (data) {

                $("#userlist").html(data);
            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });
    }

}
