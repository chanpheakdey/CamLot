
$(document).ready(function () {

    $(function () {
        $("#txtstartdate").datepicker(
            {
                dateFormat: 'dd-mm-yy',

            }).datepicker("setDate", 'now');
        $("#txtenddate").datepicker(
            {
                dateFormat: 'dd-mm-yy',

            }).datepicker("setDate", 'now');
    });


   
    checktokendetail();



});

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
                get_resultbydate(username);

                //getuserlist(username);
            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


}

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


function get_resultbydate(username) {
    console.log("get latest result");
    var startdate = "";
    var enddate = "";
    startdate = $("#txtstartdate").val();
    enddate = $("#txtenddate").val();

    if (startdate == "" || enddate == "") {
        var d = new Date($.now());
        var m = (d.getMonth() + 1);
        var mm = m;
        if (m < 10) {
            mm = "0" + m;
        }
        var day = d.getDate();
        var dd = d;
        if (day < 10) {
            dd = "0" + day;
        }

        var datestr = (d.getFullYear() + "-" + mm + "-" + dd);
        startdate = datestr;
        enddate = datestr;
    }
    $.ajax({
        //cache: false,
        async: false,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getResult/" + startdate + "/" + enddate + "/" + username,
        data: '',
        success: function (data) {
            console.log(data);
            show_latest_result(data)

           
        },
        error: function (result) {
            console.log(result);
            //return "";
            //$('#loading').hide();
        }
    });
}




function show_result_html(datajson) {
    var data = JSON.parse(datajson);
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

    var result1, result2, result3, result4, result5;
    result1 = parseInt(data.Result1);
    result2 = parseInt(data.Result2);
    result3 = parseInt(data.Result3);
    result4 = parseInt(data.Result4);
    result5 = parseInt(data.Result5);
    var result1str, result2str, result3str, result4str, result5str;
    result1str = data.Result1;
    result2str = data.Result2;
    result3str = data.Result3;
    result4str = data.Result4;
    result5str = data.Result5;

    if (result1 < 10) {
        result1str = '0' + data.Result1;
    }
    if (result2 < 10) {
        result2str = '0' + data.Result2;
    }
    if (result3 < 10) {
        result3str = '0' + data.Result3;
    }
    if (result4 < 10) {
        result4str = '0' + data.Result4;
    }
    if (result5 < 10) {
        result5str = '0' + data.Result5;
    }
    html += '<div class="recent-item">'
    html += '<p><span style="margin-right: 15px">#' + data.GameID + '&nbsp;' + data.ResultDate.substr(11, 8) + '</span><a href="javascript: void(0);" onclick="LottoInst.showRecentDetail(0)"> &gt;&gt;</a></p>'
    html += '<div class="special"><div class="special-abcde"><span>' + result1str + '</span><span>' + result2str + '</span><span>' + result3str + '</span><span>' + result4str + '</span><span>' + result5str + '</span></div>'
    html += '<div class="special-x"><span style="background: #f73">U</span><span style="background: #ea8d34">R1</span></div></div>'
    html += '</div>'

    //console.log(html);





    var prehtml = $("#div_result_list").html();
    html = html + prehtml;
    $("#div_result_list").html(html);
}