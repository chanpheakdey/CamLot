function preview() {
    var startdate;
    startdate = $("#txtstartdate").val();
    enddate = $("#txtenddate").val();
    loadreport(startdate, enddate);
}

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
            
            $("#div_report").html(data);
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

