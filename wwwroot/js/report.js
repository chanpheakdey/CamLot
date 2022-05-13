function initpreview() {
    var d = new Date($.now());
    var datestr = "";
    var day = "";
    if (d.getDate() < 10) {
        day = "0" + d.getDate();
    } else {
        day = d.getDate();
    }
    var month = "";
    if (d.getMonth()+1 < 10) {
        month = "0" + (d.getMonth() + 1);
    } else {
        month = d.getMonth() + 1;
    }
    datestr = (day + "-" + month + "-" + d.getFullYear());
    var startdate;
    startdate = datestr;
    enddate = datestr;
    var reportname = $("#hdReportName").val();
    console.log("reportname:" + reportname);

    if (reportname == "Under Sale") {
        if (startdate != "" && enddate != "") {
            loadreportsale(startdate, enddate);
        }
    } else {
        if (startdate != "" && enddate != "") {
            loadreportBalance(startdate, enddate);
        }
    }

    
}

function preview() {
    var startdate;
    startdate = $("#txtstartdate").val();
    enddate = $("#txtenddate").val();
    var reportname = $("#hdReportName").val();
    console.log("reportname:" + reportname);

    if (reportname == "Under Sale") {
        if (startdate != "" && enddate != "") {
            loadreportsale(startdate, enddate);
        }
    } else {
        if (startdate != "" && enddate != "") {
            loadreportBalance(startdate, enddate);
        }
    }


}
function refreshpage() {
    window.location = window.location.href;
}

const formatToCurrency = amount => {
    return formatter.format(amount).replace("$","R");
};

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

function selectreport(reportname) {
    if (reportname == 'Under Sale') {
        $("#div_balance").removeClass("Report-Header");
        $("#div_undersale").removeClass("Report-Header-inactive");
        $("#div_undersale").addClass("Report-Header");
        $("#div_balance").addClass("Report-Header-inactive");

    } else {
        $("#div_undersale").removeClass("Report-Header");
        $("#div_balance").removeClass("Report-Header-inactive");
        $("#div_undersale").addClass("Report-Header-inactive");
        $("#div_balance").addClass("Report-Header");

    }
    $("#hdReportName").val(reportname);
    preview();

}


function loadreportBalance(startdate, enddate) {
    var username = $("#hdUsername").val();
    console.log(startdate + ';' + enddate);
    $.ajax({
        //cache: false,
        async: false,
        type: "Get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getReportBalance/" + startdate + "/" + enddate + "/" + username,
        data: '',
        success: function (data) {
            //console.log(data);


            $("#div_report").html(data);
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}


function loadreportsale(startdate, enddate) {
    var username = $("#hdUsername").val();
    loadreportUnderSale(username, startdate, enddate,'');
}
function loadreportUnderSale(username,startdate, enddate,userlevel) {
    
    console.log(startdate + ';' + enddate);
    $.ajax({
        //cache: false,
        async: false,
        type: "Get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getReportUnderSale/" + startdate + "/" + enddate + "/" + username,
        data: '',
        success: function (data) {
            //console.log(data);
            console.log(userlevel);
            if (userlevel == '') {
                $("#div_report").html(data);

            } else {
                if (userlevel == 'master') {
                    $("#div_popup_master").show();
                    $("#div_popup_master_detail").html(data);

                } else {
                    if (userlevel == 'agent') {
                        $("#div_popup_agent").show();
                        $("#div_popup_agent_detail").html(data);

                    } else {
                        $("#div_popup_member").show();
                        $("#div_popup_member_detail").html(data);

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

function loadreport(startdate, enddate) {
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
                if (username.toLowerCase() == "admin") {
                    html += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់ចំណេញ</span><span class='row-value'>" + formatToCurrency(betamount - winamount) + "</span></div>"
                }
                //html += "<div class='report-row'><span class='row-caption'>កំរៃជើងសារ(៨០%)</span><span class='row-value'>" + formatToCurrency(comission) + "</span></div>"
                html += "<hr>"
                //html += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់ភ្នាក់ងារចុងគ្រា</span><span class='row-value'>" + formatToCurrency(agentBalance - profit) + "</span></div>"
                html += "</div>"
            }
       

            var htmltotal = ""
            if (username.toLowerCase() == "admin") {
                htmltotal += "<div class='report-usergroup'>"
                htmltotal += "<div class='report-username'>សរុប</div>"
                
                //htmltotal += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់ភ្នាក់ងារ</span><span class='row-value'>" + formatToCurrency(agentBalance) + "</span></div>"

                htmltotal += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់លក់</span><span class='row-value'>" + formatToCurrency(total_betamount) + "</span></div>"
                htmltotal += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់រង្វាន់</span><span class='row-value'>" + formatToCurrency(total_winamount) + "</span></div>"
                htmltotal += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់ចំណេញ</span><span class='row-value'>" + formatToCurrency(total_betamount - total_winamount) + "</span></div>"

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
    initpreview();
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

function closepopup_agent() {
    $("#div_popup_agent").hide();
}

function closepopup_member() {
    $("#div_popup_member").hide();
}

function closepopup_master() {
    $("#div_popup_master").hide();
}