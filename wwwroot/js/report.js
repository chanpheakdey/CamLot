function preview() {
    var startdate;
    startdate = $("#txtstartdate").val();
    enddate = $("#txtenddate").val();
    loadreport(startdate, enddate);
}



const formatToCurrency = amount => {
    return formatter.format(amount).replace("$","R");
};

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})


function loadreport(startdate, enddate) {

    console.log(startdate + ';' + enddate);
    $.ajax({
        //cache: false,
        async: false,
        type: "Get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getReport/" + startdate + "/" + enddate,
        data: '',
        success: function (data) {
            console.log(data);
            
            var html = "";
            var betamount = data.betAmount;
            var winamount = data.winAmount;
            var profit = data.profit;
            var comission = data.comission;
            var agentBalance = data.agentBalance;

            html += "<div class='report-panel'>"
            html += "<div class='report-title'>របាយការណ៌សង្ខេប</div>"
            html += "<div class='report-title-date'>" + startdate + "-" + enddate + "</div>"
            html += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់ភ្នាក់ងារ</span><span class='row-value'>" + formatToCurrency(agentBalance) + "</span></div>"

            html += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់លក់</span><span class='row-value'>" + formatToCurrency(betamount) + "</span></div>"
            html += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់រង្វាន់</span><span class='row-value'>" + formatToCurrency(winamount) + "</span></div>"
            html += "<div class='report-row'><span class='row-caption'>ចំណេញ</span><span class='row-value'>" + formatToCurrency(profit) + "</span></div>"
            html += "<div class='report-row'><span class='row-caption'>កំរៃជើងសារ(៨០%)</span><span class='row-value'>" + formatToCurrency(comission) + "</span></div>"
            html += "<hr>"
            html += "<div class='report-row'><span class='row-caption'>ទឹកប្រាក់ភ្នាក់ងារចុងគ្រា</span><span class='row-value'>" + formatToCurrency(agentBalance-profit) + "</span></div>"
            html += "</div>"
            $("#div_report").html(html);
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}


$(document).ready(function () {

    checktoken();
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

