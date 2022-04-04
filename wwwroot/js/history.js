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
            for (var i = 0; i < data.length; i++) {
                var GameID = data[i].gameID;
                var CreatedDate = data[i].createdDate;
                var BetAmount =  data[i].betAmount;
                var WinAmount = data[i].winAmount;
                console.log(GameID)
                html += "<div>";
                html += "<div class=''>ឆ្នោតទី:" + GameID ;
                html += "<div>";
                html += "</div>";
            }
            $("#div_result").html(html);

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
