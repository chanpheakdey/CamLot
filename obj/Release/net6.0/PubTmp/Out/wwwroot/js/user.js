


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

function deleteuser(username) {
    var createdby = $("#hdUsername").val();
    if (confirm('Are you sure to delete this user?')) {
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
                }
            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });
    } 

}


function unlockuser(username) {
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
                }
            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });
    }

}