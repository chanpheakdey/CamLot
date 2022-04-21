﻿function preview() {
    var startdate;
    startdate = $("#txtstartdate").val();
    enddate = $("#txtenddate").val();
    if (startdate != "" && enddate != "") {
        loadreport(startdate, enddate);
    }
}



const formatToCurrency = amount => {
    return formatter.format(amount).replace("$","R");
};

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})


function loadreport(startdate, enddate,) {
    var username = $("#hdUsername").val();
    console.log(startdate + ';' + enddate);
    $.ajax({
        //cache: false,
        async: false,
        type: "Get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getReport/" + startdate + "/" + enddate + "/" + username,
        data: '',
        success: function (data) {
            console.log(data);
            
            var html = "";

            var htmlheader = "";
            htmlheader += "<div class='report-panel'>"
            htmlheader += "<div class='report-title'>របាយការណ៌សង្ខេប</div>"
            htmlheader += "<div class='report-title-date'>" + startdate + " ដល់​ " + enddate + "</div>"
            htmlheader += "</div>"

            var betamount = 0;
            var winamount = 0;
            var profit = 0;
            var comission = 0;
            var agentBalance = 0;
            var agent_username = '';

            var total_betamount = 0;
            var total_winamount = 0;
            var total_profit = 0;


            for (var i = 0; i < data.length; i++) {
                betamount = data[i].betAmount;
                winamount = data[i].winAmount;
                profit = data[i].profit;
                total_betamount += betamount;
                total_winamount += winamount;
                total_profit += profit;
                comission = data[i].comission;
                agentBalance = data[i].agentBalance;
                agent_username = data[i].username;
                html += "<div class='report-usergroup'>"
                html += "<div class='report-username'>" + agent_username + "</div>"
                //html += "<div class='report-title-date'>" + startdate + "-" + enddate + "</div>"
                //html += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់ភ្នាក់ងារ</span><span class='row-value'>" + formatToCurrency(agentBalance) + "</span></div>"

                html += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់លក់</span><span class='row-value'>" + formatToCurrency(betamount) + "</span></div>"
                html += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់រង្វាន់</span><span class='row-value'>" + formatToCurrency(winamount) + "</span></div>"
                //html += "<div class='report-row'><span class='row-caption'>កំរៃជើងសារ(៨០%)</span><span class='row-value'>" + formatToCurrency(comission) + "</span></div>"
                html += "<hr>"
                //html += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់ភ្នាក់ងារចុងគ្រា</span><span class='row-value'>" + formatToCurrency(agentBalance - profit) + "</span></div>"
                html += "</div>"
            }
       

            var htmltotal = ""
            if (username == "admin") {
                htmltotal += "<div class='report-usergroup'>"
                htmltotal += "<div class='report-username'>សរុប</div>"
                
                htmltotal += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់ភ្នាក់ងារ</span><span class='row-value'>" + formatToCurrency(agentBalance) + "</span></div>"

                htmltotal += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់លក់</span><span class='row-value'>" + formatToCurrency(total_betamount) + "</span></div>"
                htmltotal += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់រង្វាន់</span><span class='row-value'>" + formatToCurrency(total_winamount) + "</span></div>"
                htmltotal += "<hr>"
                htmltotal += "</div>"

            }

            $("#div_report").html(htmlheader + htmltotal + html);
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}


$(document).ready(function () {

    checktokendetail();
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
