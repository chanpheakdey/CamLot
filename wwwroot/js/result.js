"use strict";
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("ReceiveMessage", function (Eventmessage) {
    $("#hdGameID").val(0);
    if (Eventmessage.subject == "start new game") {

    } else if (Eventmessage.subject == "count down") {
        var objgame = JSON.parse(Eventmessage.message);
        var gameid = objgame.gameid;
        if (objgame.timeremaining <= 10) {
            $("#hdGameID").val(0);
        } else {
            $("#hdGameID").val(gameid);
        }
        $("#div_GameID").html("ឆ្នោតលេខ:" + gameid);

    }
    else if (Eventmessage.subject == "start result") {


    } else if (Eventmessage.subject == "result1") {

    } else if (Eventmessage.subject == "result2") {

    } else if (Eventmessage.subject == "result3") {

    } else if (Eventmessage.subject == "result4") {

    } else if (Eventmessage.subject == "result5") {

    } else if (Eventmessage.subject == "end result") {
        var jsonresult = Eventmessage.message;
        show_result(jsonresult);


    } else if (Eventmessage.subject == "end game") {

    }


});




connection.start().then(function () {
    console.log("hub connected");
    get_latestresult();


}).catch(function (err) {

    return console.log(err.toString());
});



function show_result(datajson) {
    var data = JSON.parse(datajson);
    show_result_html(datajson);

    var divs = document.getElementById("div_result_list").getElementsByClassName("recent-item");


    //$("#div_result_list .recent-item div:last").each(function () {

    //});

    var lastChild = divs[divs.length - 1];
    $(lastChild).remove();

    //end_game(gameid);
}



function show_latest_result(data) {

    var arrlength = data.length;
    for (var i = 0; i < arrlength; i++) {
        console.log(data[i]);
        show_result_html(data[i]);

    }


    //end_game(gameid);
}


function get_latestresult() {
    console.log("get latest result");
    $.ajax({
        //cache: false,
        async: false,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/LatestResult",
        data: '',
        success: function (data) {
            console.log(data);
            show_latest_result(data)

            console.log(data[0]);
            $("#div_resultinfo").html("");
        },
        error: function (result) {
            console.log(result);
            //return "";
            //$('#loading').hide();
        }
    });
}
