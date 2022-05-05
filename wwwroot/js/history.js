function bettype(typename) {

    $("#hdbettype").val(typename);

    $("#btnCurrent").removeClass("active");
    $("#btnPrevious").removeClass("active");

    if (typename == "Current") {
        $("#btnCurrent").addClass("active");

    } else if (typename == "Previous") {
        $("#btnPrevious").addClass("active");
    }
    preview();
}


function preview() {
    var bettingtype;
    bettingtype = $("#hdbettype").val();

    loadhistory(bettingtype);

}



const formatToCurrency = amount => {
    return formatter.format(amount).replace("$", "R");
};

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})


function loadhistory(bettingtype) {
    var username = $("#hdUsername").val();
    console.log(bettingtype + ';');
    $.ajax({
        //cache: false,
        async: false,
        type: "Get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getHistory/" + bettingtype + "/" + username,
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
                html += '<span class="span-print" onclick="reprint(' + bettingID + ')"><i class="fa fa-print" aria-hidden="true"></i></span>';
                html += "</div>";
                html += "</td>";
                html += "</tr>";


            }

            html += "</table>"

            html += "<div>ចំនួនភ្នាល់: <span>" + data.length + " វិក័យបត្រ</span></div>"
            html += "<div>ទឹកប្រាក់ភ្នាល់សរុប: <span>R" + G_totalBet + "</span></div>"
            html += "<div>រង្វាន់សរុប: <span>R" + G_WinAmount + "</span></div>"

            if (html == "") {
                $("#div_result").html("គ្មានលទ្ធផល");

            } else {
                $("#div_result").html(html);

            }
            
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}

function reprint(bettingid) {
    var token = getUrlVars()["token"];
    window.location = "print?qrcode=" + bettingid + "&token=" + token;
}


$(document).ready(function () {

    checktokendetail();
    preview();
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

                window.location = "login";
            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


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

                //getuserlist(username);
            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


}

function back() {
    var token = getUrlVars()["token"];
    window.location = "betnow?token=" + token;
}

