"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();



connection.start().then(function () {



    console.log("hub connected");


    loadnumbers();
    clear_result();
  
        create_game();
 

}).catch(function (err) {
    return console.log(err.toString());
});

var maxsecond = 5;//360seconds=6mn


function show_result_html(datajson) {
    var data =JSON.parse( datajson);
    console.log("display result on result list");
    console.log(data);

    var html = '';
    //html += "<div>";
    //html += "Game #" + data.GameID;
    //html += "</div>";
    //html += "<div>";
    //html += "<span class='round-number-green'>" + data.Result1 + "</span>";;
    //html += "<span class='round-number-green'>" + data.Result2 + "</span>";;
    //html += "<span class='round-number-green'>" + data.Result3 + "</span>";;
    //html += "<span class='round-number-green'>" + data.Result4 + "</span>";;
    //html += "<span class='round-number-green'>" + data.Result5 + "</span>";;
    //html += "</div>"

    html += '<div class="recent-item">'
    html += '<p><span style="margin-right: 15px">#' + data.GameID + '&nbsp;' + data.ResultDate.substr(11, 8) + '</span><a href="javascript: void(0);" onclick="LottoInst.showRecentDetail(0)"> &gt;&gt;</a></p>'
    html += '<div class="special"><div class="special-abcde"><span>' + data.Result1 + '</span><span>' + data.Result2 + '</span><span>' + data.Result3 + '</span><span>' + data.Result4 + '</span><span>' + data.Result5 + '</span></div>'
    html += '<div class="special-x"><span style="background: #f73">U</span><span style="background: #ea8d34">R1</span></div></div>'
    html += '</div>'

    console.log(html);
    var prehtml = $("#div_result_list").html();
    html = prehtml + html;
    $("#div_result_list").html(html);
}
function clientTimer(secondsout) {
  
    var totalminute = parseInt((maxsecond - secondsout) / 60);
    var seconds = maxsecond - totalminute * 60 - secondsout;
    $("#div_timer").html("Minute:" + totalminute + ";Second:" + seconds);
}


var totalminute = 0;
var timespent = 0;
function startCounters(secondsout,gameid) {
    console.log("start count:" + secondsout);
    timespent = secondsout;
    totalminute = parseInt((maxsecond - secondsout) / 60);

    

    var seconds = maxsecond - totalminute * 60 - secondsout;
    

    var interval = setInterval(function () {
        timespent += 1;
        console.log("maxsecond:" + maxsecond + ";totalminute:" + totalminute + ";seconds:" + seconds + ";timespent" + timespent);

        if (seconds > 1) {                            
           
            seconds--; 
        } else {
            seconds = 59;
            if (totalminute <= 0) {
                seconds = 0;
                clearInterval(interval);
                //var gameid = $("#hdGameID").val();
                getresult(gameid);
            }
            totalminute--;
            
        }
        updatetimespent(timespent);


        $("#div_timer").html("Minute:" + totalminute + ";Second:" + seconds);
        
    }, 1000);
}

var result_index = 0;
function load_result(gameid, datajson) {

    console.log("loading result from server:" + datajson);
    var data = JSON.parse(datajson);
    console.log(data);
    var interval = setInterval(function () {
        result_index += 1;
        var result_number;
        if (result_index == 1) {
            result_number = data.Result1;
            $("#span_n" + result_number).removeClass('round-number').addClass('round-number-green');
            $("#span_result1").html(result_number);
        } else {
            if (result_index == 2) {
                var result_number = data.Result2;
                $("#span_n" + result_number).removeClass('round-number').addClass('round-number-green');
                $("#span_result2").html(result_number);
            } else {
                if (result_index == 3) {
                    result_number = data.Result3;
                    $("#span_n" + result_number).removeClass('round-number').addClass('round-number-green');
                    $("#span_result3").html(result_number);
                } else {
                    if (result_index == 4) {
                         result_number = data.Result4;
                        $("#span_n" + result_number).removeClass('round-number').addClass('round-number-green');
                        $("#span_result4").html(result_number);
                    } else {
                        if (result_index == 5) {
                             result_number = data.Result5;
                            $("#span_n" + result_number).removeClass('round-number').addClass('round-number-green');
                            $("#span_result5").html(result_number);
                        } else {
                            result_index = 0;
                            show_result(gameid, datajson);
                            clearInterval(interval);
                        }
                        
                    }

                }

            }

        }
        console.log("result index:" + result_index + ", result number:" + result_number);

        if (result_index > 0) {
            var user = "loading result";

            var msg = '{"gameid":' + gameid + ',"index":' + result_index + ',"result":' + result_number + '}';
            console.log("msg:" + msg);
            connection.invoke("SendMessage", user, msg).catch(function (err) {

                return "error";
            });

        }

       

    }, 1000);
}

function show_result(gameid, datajson) {
    var data = JSON.parse(datajson);
    show_result_html(datajson);

    var user = "show result";
    var msg = datajson;
    connection.invoke("SendMessage", user, msg).catch(function (err) {
        return "error";
    });

    end_game(gameid);
}

function end_game(gameid) {
    console.log("ending game.")

    $.ajax({
        //cache: false,
        async: false,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "http://nailbarspa-001-site5.etempurl.com/api/endGame",
        data: '{"gameId": ' + gameid + ',"timeSpent": 0}',
        success: function (datajson) {
            console.log("ended game status:" + datajson);
            if (datajson == "1") {
                var user = "End game";
                timespent = 0;
                var msg = gameid;
                connection.invoke("SendMessage", user, msg).catch(function (err) {
                    return "error";
                });
                clear_result();
                loadnumbers();
                create_game();
            }

        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });

    
}

function updatetimespent(timespent) {
    var gameid = $("#hdGameID").val();
    //console.log("update gameid:" + gameid + ", timespent:" + timespent);
    var user = "timer";

    connection.invoke("SendMessage", user, timespent.toString()).catch(function (err) {
        return "error";
    });
    if (timespent % 5 == 0) {
        $.ajax({
            //cache: false,
            async: false,
            type: "POST",
            //dataType: "Json",
            contentType: "application/json; charset=utf-8",
            url: "http://nailbarspa-001-site5.etempurl.com/api/updateTimeSpent",
            data: '{"gameId": ' + gameid + ',"timeSpent": ' + timespent + '}',
            success: function (data) {
                console.log("update success:" + data);
                
            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });

    }
}

//$(document).ready(    
//    clear_result_list
//);
 


function clear_result() {
    $("#span_result1").html("");
    $("#span_result2").html("");
    $("#span_result3").html("");
    $("#span_result4").html("");
    $("#span_result5").html("");

   
  


}

function clear_result_list() {
    $("#div_result_list").html("");

}
function loadnumbers() {
    var html = "";
    for (var i = 1; i < 100; i++) {
        html += "<div class='round-number' id='span_n" + i + "'>" + i + "</div>";
    }
      


    $("#div_numbers").html(html);
}

function create_game() {
    //clear_result();
  
    var user = "start game";

    connection.invoke("SendMessage", user, "").catch(function (err) {
        return "error";
    });
 
    

        $.ajax({
            //cache: false,
            async: false,
            type: "POST",
            //dataType: "Json",
            contentType: "application/json; charset=utf-8",
            url: "http://nailbarspa-001-site5.etempurl.com/api/createGame",
            data: '',
            success: function (data) {
                var timespent = data.timespent;
                var gameid = data.gameid;

                $("#hdGameID").val(gameid);
                console.log('GameID:' + gameid);
                startCounters(timespent,gameid);

            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });

       
  
}



var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1)


    var uri_encoded = replaceAll(sPageURL, '%', '%25');
    console.log(uri_encoded);
    var sURLVariables = uri_encoded.split('&'),
        sParameterName,
        i;


    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}


function getresult(gameid) {
    console.log("get result");
    //gameid = 6;
    $.ajax({
        //cache: false,
        async: true,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "http://nailbarspa-001-site5.etempurl.com/api/getresult",
        data: '{"gameId": ' + gameid + ',"timeSpent": 0}',
        success: function (data) {
            console.log("result out:" );
           
            load_result(gameid, data)
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}

