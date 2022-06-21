


$(document).ready(function () {

    checktokendetail();

});


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
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

            if (data.expired == true) {

                window.location = "login";
            } else {
                $("#hdUsername").val(data.username);
                var nickname = data.nickname;
                //var username = $("#hdUsername").val();
                //getuserlist(username);
                filteruser();
                var url = window.location.href;
                if (url.includes("uploadphoto")) {
                    var username = getUrlVars()["username"];
                    var password = getUrlVars()["password"];
                    var nickname = getUrlVars()["nickname"];
                    showoption(username, password,"active",nickname);
                }

            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


}


function filteruser() {
    var usertype = $("#selectusertype").val();
    var username = $("#hdUsername").val();
    getuserlist(username);
    console.log("usertype:" + usertype);

    if (usertype == "All") {
        
    } else {
        if (usertype == "Active") {
            hide_elementbyclass("row-user-locked");
        } else {
            console.log("hide active users");
            hide_elementbyclass("row-user-active");

        }
    }

}

function filteruserlevel(username) {
    var usertype = $("#selectusertype").val();
    //var username = $("#hdUsername").val();
    getuserlist(username);
    console.log("usertype:" + usertype);

    if (usertype == "All") {

    } else {
        if (usertype == "Active") {
            hide_elementbyclass("row-user-locked");
        } else {
            console.log("hide active users");
            hide_elementbyclass("row-user-active");

        }
    }

}

function hide_elementbyclass(className) {
    var elements = document.getElementsByClassName(className)

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
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

function hidedivuser() {
    $("#divuser").hide();

}
function showdivuser(userlevel, username) {
    $("#divuser").show();
    $("#txt_username").val("");
    $("#txt_password").val("");
    $("#txt_retypepassword").val("");
    $("#hdOwner").val(username);
    var html = "";
    console.log(userlevel);
    if (userlevel == 'Admin') {
        html += "<select id='selectlevel' class='select-level'>"
        html += "<option value='Admin'>Senior</option>";
        //html += "<option value='Agent'>Agent</option>";
        //html += "<option value='Member'>Member</option>";
        html += "</select>";
    } else {
        if (userlevel == 'Master') {
            html += "<select id='selectlevel' class='select-level'>"
            html += "<option value='Master'>Master</option>";
            if (username.toLowerCase() == "admin") {
                html += "<option value='Senoir'>Senoir</option>";
            }
            html += "</select>";
        } else {
            if (userlevel == 'Agent') {
                html += "<select id='selectlevel' class='select-level'>"
                html += "<option value='Agent'>Agent</option>";
                //html += "<option value='Member'>Member</option>";
                html += "</select>";
            } else {
                html += "<select id='selectlevel' class='select-level'>"
                html += "<option value='Member'>Member</option>";
                html += "</select>";

            }
        }
    }
    $("#spanlevel").html(html);

}
function addnewuser() {
    
    var username = $("#txt_username").val();
    var password = $("#txt_password").val();
    if (username == '' || password == '') {
        alert("Please enter both username and password.");
        return;
    }
    var retypepassword = $("#txt_retypepassword").val();
    if (password != retypepassword) {
        alert("Password not matched.");
        return;
    }
    var userlevel = $("#selectlevel").val();
    var owner = $("#hdOwner").val();
    var betting = true; //$('#chkBetting').prop('checked');
    var withdrawal = true; //$('#chkWithdrawal').prop('checked');
    var report = true; //$('#chkReport').prop('checked');
    var display = true;//$('#chkDisplay').prop('checked');
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
            data: '{"UserName":"' + username + '","UserLevel":"' + userlevel + '","Password":"' + password + '","Betting":' + betting.toString() + ',"Withdrawal":' + withdrawal.toString() + ',"Report":' + report.toString() + ',"Display":' + display.toString() + ',"CreatedBy":"' + owner + '","CreatedByOriginal":"' + createdby + '"}',
            success: function (data) {

                if (data == "Success") {
                    $("#divuser").hide();
                    filteruser();
                    hidedivuser();
                    showuserbylevel(owner, userlevel);
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
    //var username = $("#hdSelectedUser").val();

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
                    filteruser()
                    //closepopup();
                }
            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });
    

}


function unlockuser(username,oldstatus) {
    //var username = $("#hdSelectedUser").val();
    var createdby = $("#hdUsername").val();
    //if (confirm('Are you sure to unlock this user?')) {
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
                    //var username = $("#hdUsername").val();
                    //getuserlist(createdby);
                    filteruser();
                    userstatus(oldstatus,username);
                    //closepopup();
                }
            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });
    //}

}

function userstatus(oldstatus,username) {
    if (oldstatus == "active") {
        $("#div_action").html('<div style="color:#19ff00;">Status<span class="lock-icon" onclick="unlockuser(' + "'" + username + "','inactive'" + ')" ><i style="font-size: xx-large;" class="fa fa-toggle-on"></i></span></div>')
    } else {
        $("#div_action").html('<div style="color:red;">Status<span class="lock-icon" onclick="unlockuser(' + "'" + username + "','active'" + ')" ><i style="font-size: xx-large;" class="fa fa-toggle-off"></i></span></div>')

    }
}
function uploadid() {
    var username = $("#hdSelectedUser").val();
    var createdby = $("#hdUsername").val();
    var password = $("#txtchangepassword").val();

    window.location = window.location + "&uploadphoto=1&username=" + username + "&password=" + password;

}

function resetpassword() {
    var randomstring = Math.random().toString(36).slice(-6);
    updatepassword(randomstring);
}

function showoption(username, password, oldstatus, nickname) {
    console.log("show option");
    getusercredit(username);
    
    $("#div_alert").show();
    $("#div_popup_title").html("គ្រប់គ្រងគណនី");
    $("#hdSelectedUser").val(username);
    $("#spanusername").html(username);
    $("#txtchangepassword").val(password);
    $("#txtnickname").val(nickname);

    userdocument();
    userstatus(oldstatus,username);

    //var d = new Date($.now());
    //var datestr = (d.getDate() + (d.getMonth() + 1) + d.getFullYear() + d.getHours() + d.getMinutes() + d.getSeconds());
    //$("#imgupload").prop("src", "https://gamestorage.azurewebsites.net/id/" + username + ".jpg?" + datestr);

}
function closepopup() {
    $("#div_alert").hide();
    $("#hdSelectedUser").val("");
}

function refreshpage() {
    window.location = window.location.href;
}
function updatenickname() {
    var username = $("#hdSelectedUser").val();
    var newnickname = $("#txtnickname").val();
    $.ajax({
        //cache: false,
        async: false,
        type: "Post",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/updatenickname",
        data: '{"UserName":"' + username + '","NickName":"' + newnickname + '"}',
        success: function (data) {
            if (data == "Success") {
                //var username = $("#hdUsername").val();
                //getuserlist(username);
                filteruser();
                closepopup();
            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });

}
function updateusername() {
    var username = $("#hdSelectedUser").val();
    var newusername = $("#txtusername").val();
    $.ajax({
        //cache: false,
        async: false,
        type: "Post",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/updateusername",
        data: '{"UserName":"' + username + '","Newusername":"' + newusername  + '"}',
        success: function (data) {
            if (data == "Success") {
                //var username = $("#hdUsername").val();
                //getuserlist(username);
                filteruser();
                closepopup();
            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });

}
function updatepassword(newpassword) {
    var username = $("#hdSelectedUser").val();
    //var newpassword = $("#txtchangepassword").val();
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
                //var username = $("#hdUsername").val();
                //getuserlist(username);
                //filteruser();
                //closepopup();
                $("#div_passwordreset").html("<div style='padding:5px'>Password: " + newpassword + "</div>");

            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });

}

function addcredit() {
    $("#divinfo").html('');
	var amount_string = $("#txtcredit").val();
	amount_string = replaceAll(amount_string,",","");
	
    var amount = parseInt(amount_string);
    
    var username = $("#hdSelectedUser").val();
    var createdby = $("#hdUsername").val();

    console.log(username);
    $.ajax({
        //cache: false,
        async: false,
        type: "Post",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/addcredit",
        data: '{"UserName":"' + username + '","Amount":' + amount + ',"CreatedBy":"' + createdby + '"}',
        success: function (data) {
            console.log(data);
            if (data == "success") {
                cancelcredit();
                //getusercredit(username);
                //getuserlist(createdby);
                filteruser();
               
            } else {
                if (data == 'Out of credit') {
                    $("#divinfo").html('ទឹកប្រាក់មិនគ្រប់');
                }
            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}

function deductcredit() {
    var amount_string = $("#txtcredit").val();
	amount_string = replaceAll(amount_string,",","");
	
    var amount = parseInt(amount_string);
    
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
               //getusercredit(username);
               //getuserlist(createdby);
               filteruser();
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
function showaddcredit(username, credit) {
  
   
    $("#div_update_credit").show();
    $("#div_usercredit").html(username + ": " + credit + 'R');
    $("#span_credit_title").html("ទឹកប្រាក់ត្រូវដាក់បន្ថែម");
    $("#spanaddcredit").show();
    $("#spandeductcredit").hide();
    $("#spanshowaddcredit").hide();
    $("#spanshowdeductcredit").hide();
    $("#hdSelectedUser").val(username);
    $("#divinfo").html('');
}

String.prototype.reverse = function () {
    return this.split("").reverse().join("");
}

function onlyNumberAmount(input) {
    var x = input.value;
    x = x.replace(/,/g, ""); // Strip out all commas
    x = x.reverse();
    x = x.replace(/.../g, function (e) {
        return e + ",";
    }); // Insert new commas
    x = x.reverse();
    x = x.replace(/^,/, ""); // Remove leading comma
    input.value = x;
}

function showdeductcredit(username,credit) {
    $("#div_update_credit").show();
    $("#div_usercredit").html(username + ": " + credit + 'R');
    $("#span_credit_title").html("ទឹកប្រាក់ត្រូវដកចេញ");
    $("#spanaddcredit").hide();
    $("#spandeductcredit").show();
    $("#spanshowaddcredit").hide();
    $("#spanshowdeductcredit").hide();
    $("#hdSelectedUser").val(username);
    $("#divinfo").html('');

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

function showuserbylevel(createdby,userlevel) {
    
    $.ajax({
        //cache: false,
        async: false,
        type: "Get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getuserlistbylevel/" + createdby + "/" + userlevel,
        data: '',
        success: function (data) {
            console.log("success");
            //console.log(data);

            //$("#div_credit").html("R" + data);
            if (userlevel == "Agent") {
                $("#div_popup_title_agent").html(createdby + " > " + userlevel);
                $("#div_popup_agent").show();
                $("#div_popup_agent_detail").html(data.result);
            } else {
                if (userlevel == "Member") {
                    $("#div_popup_title_member").html(createdby + " > " + userlevel);

                    $("#div_popup_member").show();
                    $("#div_popup_member_detail").html(data.result);
                } else {
                    if (userlevel == "Master") {
                        $("#div_popup_title_master").html(createdby + " > " + userlevel);

                        $("#div_popup_master").show();
                        $("#div_popup_master_detail").html(data.result);
                    }
                }

            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}

function closepopup_agent() {
    $("#div_popup_agent").hide();
}

function closepopup_member() {
    $("#div_popup_member").hide();
}

function closepopup_master() {
    $("#div_popup_master").hide();
}