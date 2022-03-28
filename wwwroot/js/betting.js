"use strict";
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("ReceiveMessage", function (Eventmessage) {
    $("#hdGameID").val(0);
    if (Eventmessage.subject == "start new game") {
        
    } else if (Eventmessage.subject == "count down") {
        var objgame = JSON.parse(Eventmessage.message);
        var gameid = objgame.gameid;
        $("#hdGameID").val(gameid);
        if (objgame.timeremaining <= 10) {
            $("#hdGameID").val(0);
        };
        $("#div_GameID").html("ឆ្នោតលេខ:" + gameid);

    }
    else if (Eventmessage.subject == "start result") {
        

    } else if (Eventmessage.subject == "result1") {
        
    } else if (Eventmessage.subject == "result2") {
        
    } else if (Eventmessage.subject == "result3") {
        
    } else if (Eventmessage.subject == "result4") {
        
    } else if (Eventmessage.subject == "result5") {
        
    } else if (Eventmessage.subject == "end result") {
        

    } else if (Eventmessage.subject == "end game") {

    }


});




connection.start().then(function () {
    console.log("hub connected");

    //var server = getUrlParameter("server");
    //loadnumbers();
    //clear_result();
   

}).catch(function (err) {
  
    return console.log(err.toString());
});


$(document).ready(function () {
    console.log("page load");
    checktokendetail();
  
});

function alertme(title) {
    $("#div_alert_title").html(title);
    $("#div_alert").show();

}

function alertok() {
    hidealert();
}

function hidealert() {
    $("#div_alert").hide();
}

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




function checktokendetail() {
    var token = getUrlVars()["token"];
    console.log("token:" + token);
    if (token != "" && token != undefined) {
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

                    window.location = "login?toke=";
                } else {
                    $("#hdUsername").val(data.username);
                    var username = $("#hdUsername").val();
                    console.log(username);
                    getusercredit(username);
                    //getuserlist(username);
                }
            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });
    } else {
        window.location = "login?toke=";
    }


}

function qrcode_img_base64(qrcode,html) {
    $.ajax({
        //cache: false,
        async: false,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/QRCode",
        data: '{"QRCode":"' + qrcode + '"}',
        success: function (data) {
            
            //return ("data:image/png;base64," + data);
            PrintElem(html, "data:image/png;base64," + data,qrcode)
            //$("#divqrcode").html("data:image/png;base64," + data);
            //$("#imgqrcode").prop("src", "data:image/png;base64," + data);
            //$("#img_qr").prop("src", "data:image/png;base64," + data);
        },
        error: function (result) {
            console.log(result);
            //return "";
            //$('#loading').hide();
        }
    });
}

function getwithdrawurl(username) {
    var returnurl = "";
    $.ajax({
        //cache: false,
        async: false,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/WithdrawUrl",
        data: '{"Username":"' + username + '"}',
        success: function (data) {
           
            returnurl = data;
           


        },
        error: function (result) {
            console.log(result);
            
        }
    });
    return returnurl;
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

            $("#div_credit").html("$" + data);
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}
function confirmprint() {
    var jsonslot = $("#hdSlot").val();
    console.log(jsonslot);
    var objslot = JSON.parse(jsonslot);
    var slotA = objslot.slotA;
    var slotB = objslot.slotB;
    var slotC = objslot.slotC;
    var slotD = objslot.slotD;
    var slotE = objslot.slotE;
    var slotNumber = "";
    if (slotA == 'active') {
        slotNumber += "1,"
    }
    if (slotB == 'active') {
        slotNumber += "2,"
    }
    if (slotC == 'active') {
        slotNumber += "3,"
    }
    if (slotD == 'active') {
        slotNumber += "4,"
    }
    if (slotE == 'active') {
        slotNumber += "5,"
    }

    slotNumber = slotNumber.substr(0, slotNumber.length - 1);
    var betNumbers = "";
    for (var i = 0; i < listnumber.length; i++) {
        var number = listnumber[i];
        betNumbers += number + ","        
    }
    betNumbers = betNumbers.substr(0, betNumbers.length - 1);
    var betamount = $("#hd_betamount").val()
    var gameid = $("#hdGameID").val();
    var placeid = $("#hd_placeid").val();
    var username = $("#hdUsername").val();

    console.log(username);

    $.ajax({
        //cache: false,
        async: false,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/betting",
        data: '{"gameId": ' + gameid + ',"placeid":' + placeid + ',"slotNumber":"' + slotNumber + '","BetType":"N","BetNumber":"' + betNumbers + '","BetAmount":' + betamount + ',"UnitWinAmount":90,"CreatedBy":"' + username + '"}',
        success: function (dataobj) {
            console.log(dataobj);
            var bettingid = dataobj.bettingID;
            console.log("BettingID:" + bettingid);
            if (bettingid == -1) {
                //alert("error!")
                alertme("error!");
            } else {
                if (bettingid == 0) {
                    //alert("ឆ្នោតចាប់លេងហើយ។")
                    alertme("ឆ្នោតចាប់លេងហើយ។")
                    cancelprint();
                } else {
                    //var html = create_receipt(dataobj);
                    //qrcode_img_base64(bettingid,html);
                    cancelprint();
                    clear_betting();
                    getusercredit(username);
                    window.location = "print?qrcode=" + bettingid;
                }
                

            }

        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


}

function clear_betting() {
    listnumber = [];
    //$("#div_betamount").val("0R");
    $("#div_range").val("XX-YY");
    $("#hdinput_number").val("");
    $("#hd_betamount").val("0");
    
    $("#hd_numberofslot").val("0");
    $("#hdSlot").val('{"slotA":"inactive","slotB":"inactive","slotC":"inactive","slotD":"inactive","slotE":"inactive"}');
    $("#spanA").removeClass("slot-active");
    $("#spanB").removeClass("slot-active");
    $("#spanC").removeClass("slot-active");
    $("#spanD").removeClass("slot-active");
    $("#spanE").removeClass("slot-active");
    $("#div_numbers").html("");
}


function PrintElem(html,imgdata,qrcode) {

    //alert("aa");
    var innerhtml = html;

    var mycss = '';

    mycss += '@media all {';
    //mycss += '.page-break { display: none; }';
    mycss += '}';

    mycss += '@media print {';
    mycss += '@page {';
    mycss += 'margin: 0.1cm;';
    mycss += '}';
    mycss += 'body {-webkit-print-color-adjust: exact;color-adjust: exact;width:5cm;height:8cm;}';
    mycss += '.page-break { display: none; }';
    mycss += '.printhidden{';
    mycss += 'display:block !important;page-break-after: always;'
    mycss += '}';
    mycss += '}';

    mycss += '.print_button{';
    mycss += 'display:none !important;'
    mycss += '}';

    mycss += 'img {';
    mycss += 'vertical-align: middle';
    mycss += '}';

    mycss += '.span-slot {';
    mycss += 'DISPLAY: inline-block;';
    mycss += 'padding: 10px 5px;';
    mycss += 'width: 100%;';
    mycss += '}';

    mycss += '.round-number{'
    mycss += 'width: 34px;'
    mycss += 'height: 34px;'
    mycss += 'line-height: 34px;'
    mycss += 'text-align: center;'
    mycss += 'font-size: 20px;'
    mycss += 'border: solid 1px gray;'
    mycss += 'border-radius:50%;'
    mycss += 'float: left;'
    mycss += 'margin: 5px;'
    mycss += '}'


  

    mycss += '.page-break{';
    mycss += 'page-break-after: always;';
    mycss += '}';

    mycss += `.button-print {
        padding: 10px;
        border-radius: 15px;
        background-color: white;
        font-weight: bold;
        border: solid 1px gray;
        margin-right: 10px;
    }`

    mycss += `.div-popup {
    position: absolute;
    z-index: 9999;
    background-color: rgb(0 0 0 / 70%);
    width: 100vw;
    height: 100vh;
    left: 0px;
    padding-top: 40vh;
    padding-left: 40vw;
}`

    var mywindow = window.open('', 'PRINT', 'height=1000,width=500');
    mywindow.document.write('<html><head>');


    var java = '';
    java += 'function print_receipt(){'
    //java += 'window.print();setTimeout(function(){window.close()}, 2000);}';
    java += 'window.print();load_close();}';

    java += 'function load_close(){'
    java += 'setTimeout(function(){$("#div_popup_close").show()}, 1000);}';

    java += 'function Closepopup(){'
    java += 'window.close()}';

    java += 'function Reprint(){'
    java += '$("#div_popup_close").hide();window.print();setTimeout(function(){$("#div_popup_close").show()}, 1000);}';


    mywindow.document.write('<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>');
    mywindow.document.write('<script>');
    mywindow.document.write(java);
    mywindow.document.write('<\/script>');

    mywindow.document.write('<style>');
    mywindow.document.write(mycss);
    mywindow.document.write('</style>');

    mywindow.document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0" />')
    mywindow.document.write('</head><body>');
    mywindow.document.write('<div class="div-popup" style="display:none;" id="div_popup_close"><input type="button" class="button-print" value="Reprint" onclick="Reprint()" /><input class="button-print"  type="button" value="Close" onclick="Closepopup()" /></div>')
    mywindow.document.write('<div style="width:8cm;">');
    //mywindow.document.write('<span id="sp_print" onclick="printme(this)" style="cursor:pointer;position:fixed;top:10px;right:10px;border-radius: 30px;background-color: #908d8d;color: white;padding: 5px;width: 60px;text-align: center;box-shadow: 1px 1px 1px rgb(0 0 0 / 32%), inset 1px 1px 1px rgb(255 255 255 / 44%);">Print</span>');
    mywindow.document.write(innerhtml);
    mywindow.document.write('</div>');
    mywindow.document.write('<div  style="text-align:center;width:8cm;"><img onload="print_receipt()" src="' + imgdata + '" style="height:80px;" /></div>');
    mywindow.document.write('<div  style="text-align:center;width:8cm;font-weight:bold;">' + qrcode + '</div>');

    mywindow.document.write('</body></html>');

 
 
    
    //mywindow.document.close(); // necessary for IE >= 10
    //mywindow.focus(); // necessary for IE >= 10*/

    //mywindow.print();
    //mywindow.close();

    return true;
}

function create_receipt(objBetting) {
    var username = $("#hdUsername").val();

    var html = "";
    html += '<div style="font-size:xx-large;">';
    html += "<img src='images/CamLotto.png' style='width:100px;'>";
    html += '<span class="logo-title" ><span style="color:black;">CAM</span><span style="color:#c67819"> LOTTO</span> <br></span>';
    html += "</div>";
    html += "<div>ឆ្នោតទី:" + objBetting.gameID + "</div>";
    html += "<div>ម៉ោងចាក់ឆ្នោត:" + objBetting.createdDate + "</div>";
    

    html += $("#div_printdetail").html();
    html += "<div style='padding:5px;border-bottom: solid 1px gray;'></div>";

    html += "<div>Printed by:" + username + "</div>";
    return html;
}
function cancelprint() {
    $("#div_printpopup").hide();
}
function print() {

    var jsonslot = $("#hdSlot").val();
    console.log(jsonslot);
    var objslot = JSON.parse(jsonslot);
    var slotA = objslot.slotA;
    var slotB = objslot.slotB;
    var slotC = objslot.slotC;
    var slotD = objslot.slotD;
    var slotE = objslot.slotE;

    if (slotA == 'inactive' && slotB == 'inactive' && slotC == 'inactive' && slotD == 'inactive' && slotE == 'inactive') {
        //alert("Please select slot!");
        alertme("Please select slot!");

    } else {



        var gameid = $("#hdGameID").val();
        if (gameid == "0") {
            //alert("time up! bet later!")
            alertme("time up! bet later!");
            cancelprint();
        } else {
            var betamount = parseInt($("#hd_betamount").val());


            if (betamount <= 0) {
                //alert("Please enter bet amount.");
                alertme("Please enter bet amount.");
            }
            else {
                $("#div_printpopup").show();

                var html = "";

                html += "<div>";
                //html += "<div>ប្រភេទ:</div>";
                html += html_slot();
                html += "</div>";

                html += "<div>";
                //html += "<div>លេខដែលបានចាក់:</div>";
                html += load_numberlist_html(listnumber);
                html += "</div>";

                html += "<div style='width: 100%;display: inline-block;margin-top: 20px;' >";

                var numberofslot = parseInt($("#hd_numberofslot").val());
                html += "<div>" + $("#div_GameID").html() + "</div>";
                html += "<div>ចំនួនទឹកប្រាក់:" + betamount + " KHR</div>";
                html += "<div>សរុប:" + (betamount * numberofslot * listnumber.length) + " KHR</div>";
                html += "</div>";


                html += "<div style='width: 100%;margin-top: 20px;' id='div_print_button' class='print_button'>";
                html += '<input type="button" class="button-round" value="Print" onclick="confirmprint()" />';
                html += '<input type="button" class="button-round" value="Cancel" onclick="cancelprint()" />';

                html += "</div>";

                //console.log(html);
                $("#div_printdetail").html(html);

            }
        }
    }

}



function betnow(amount) {
    if (amount > 5000) {
        //alert("Can not bet more then 2000Riel");
        alertme("Can not bet more then 5000Riel");
    } else {
        var currentamount = parseInt($("#hd_betamount").val());
        if (amount == 0) {
            $("#hd_betamount").val("0");
            //$("#div_betamount").html("0R");
        } else {
            currentamount += amount;
            $("#hd_betamount").val(currentamount);
            //$("#div_betamount").html(currentamount + "R");
        }

    }
    load_numberlist(listnumber);


}
function select_range() {
    var hdrange = $("#hdselectrange").val();
    if (hdrange == "") {
        $("#spanConnect").addClass("slot-active");
        $("#hdselectrange").val("yes");
        $("#div_range").show();
        $("#div_range").html("XX-YY")
    } else {
        $("#spanConnect").removeClass("slot-active");
        $("#hdselectrange").val("");
        $("#div_range").hide();
    }
}
function select_slot(slotname) {
    var newjsonstring = "";
    var jsonslot = $("#hdSlot").val();
    console.log(jsonslot);
    var objslot = JSON.parse(jsonslot);
    var slotA = objslot.slotA;
    var slotB = objslot.slotB;
    var slotC = objslot.slotC;
    var slotD = objslot.slotD;
    var slotE = objslot.slotE;

    //newjsonstring = '{"slotA":"inactive","slotB":"inactive","slotC":"inactive","slotD":"inactive","slotE":"inactive"}';
    if (slotname == "A") {
        if (slotA == "active") {
            newjsonstring = jsonslot.replace('"slotA":"active"', '"slotA":"inactive"');
        } else {
            newjsonstring = jsonslot.replace('"slotA":"inactive"', '"slotA":"active"');
        }        
    } else if (slotname == "B") {
        if (slotB == "active") {
            newjsonstring = jsonslot.replace('"slotB":"active"', '"slotB":"inactive"');
        } else {
            newjsonstring = jsonslot.replace('"slotB":"inactive"', '"slotB":"active"');
        }
    }
    else if (slotname == "C") {
        if (slotC == "active") {
            newjsonstring = jsonslot.replace('"slotC":"active"', '"slotC":"inactive"');
        } else {
            newjsonstring = jsonslot.replace('"slotC":"inactive"', '"slotC":"active"');
        }
    }
    else if (slotname == "D") {
        if (slotD == "active") {
            newjsonstring = jsonslot.replace('"slotD":"active"', '"slotD":"inactive"');
        } else {
            newjsonstring = jsonslot.replace('"slotD":"inactive"', '"slotD":"active"');
        }
    }
    else if (slotname == "E") {
        if (slotE == "active") {
            newjsonstring = jsonslot.replace('"slotE":"active"', '"slotE":"inactive"');
        } else {
            newjsonstring = jsonslot.replace('"slotE":"inactive"', '"slotE":"active"');
        }
    }
    var objslotnew = JSON.parse(newjsonstring);
    slotA = objslotnew.slotA;
    slotB = objslotnew.slotB;
    slotC = objslotnew.slotC;
    slotD = objslotnew.slotD;
    slotE = objslotnew.slotE;

    if (slotname == "A") {
        if (slotA == "active") {
            $("#spanA").addClass("slot-active");
        } else {
            $("#spanA").removeClass("slot-active");
        }
    }

    if (slotname == "B") {
        if (slotB == "active") {
            $("#spanB").addClass("slot-active");
        } else {
            $("#spanB").removeClass("slot-active");
        }
    }

    if (slotname == "C") {
        if (slotC == "active") {
            $("#spanC").addClass("slot-active");
        } else {
            $("#spanC").removeClass("slot-active");
        }
    }

    if (slotname == "D") {
        if (slotD == "active") {
            $("#spanD").addClass("slot-active");
        } else {
            $("#spanD").removeClass("slot-active");
        }
    }

    if (slotname == "E") {
        if (slotE == "active") {
            $("#spanE").addClass("slot-active");
        } else {
            $("#spanE").removeClass("slot-active");
        }
    }

    console.log(newjsonstring);
    $("#hdSlot").val(newjsonstring);

    load_numberlist(listnumber);

}
var listnumber = new Array();
function html_slot() {
    var jsonslot = $("#hdSlot").val();
    console.log(jsonslot);
    var objslot = JSON.parse(jsonslot);
    var slotA = objslot.slotA;
    var slotB = objslot.slotB;
    var slotC = objslot.slotC;
    var slotD = objslot.slotD;
    var slotE = objslot.slotE;

    var html = "";
    html += "<span class='span-slot'>ប្រភេទ:</span> ";
    var numberofslot = 0;
    var slotcss = 'line-height: 20px;float:none;display:inline-block;padding: 2px;height: 25px;width: 25px;font-size: 16px;font-weight: bold;'
    if (slotA == 'active') {
        html += "<div class='round-number' style='" + slotcss + "'>A</div>";
        numberofslot += 1;
    }
    if (slotB == 'active') {
        html += "<div class='round-number' style='" + slotcss + "'>B</div>";
        numberofslot += 1;
    }
    if (slotC == 'active') {
        html += "<div class='round-number' style='" + slotcss + "'>C</div>";
        numberofslot += 1;
    }
    if (slotD == 'active') {
        html += "<div class='round-number' style='" + slotcss + "'>D</div>";
        numberofslot += 1;
    }
    if (slotE == 'active') {
        html += "<div class='round-number' style='" + slotcss + "'>E</div>";
        numberofslot += 1;
    }

    $("#hd_numberofslot").val(numberofslot);
    return html = "<div style='width: 100%;display: inline-block;'>" + html + "</div>";
}

function input_number(inputnumber) {
    var jsonslot = $("#hdSlot").val();
    console.log(jsonslot);
    //var objslot = JSON.parse(jsonslot);
    //var slotA = objslot.slotA;
    //var slotB = objslot.slotB;
    //var slotC = objslot.slotC;
    //var slotD = objslot.slotD;
    //var slotE = objslot.slotE;

    //if (slotA == 'inactive' && slotB == 'inactive' && slotC == 'inactive' && slotD == 'inactive' && slotE == 'inactive') {
    //    alert("Please select slot!");
    //    return;
    //}

    var hdrange = $("#hdselectrange").val();
    if (hdrange == "") {
        var string_number = $("#hdinput_number").val();
        string_number += inputnumber;
        set_list(string_number);
        load_numberlist(listnumber);
    } else {
        input_range(inputnumber);
    }


}

function input_range(inputnumber) {
    var newrange = $("#div_range").html();
    if (newrange.indexOf("X") >= 0 || newrange.indexOf("Y") >= 0) {
        if (newrange.indexOf("X") >= 0) {
            newrange = newrange.replace("X", inputnumber);
        } else {
            newrange = newrange.replace("Y", inputnumber);
        }

        if (newrange.indexOf("X") >= 0 || newrange.indexOf("Y") >= 0) {
            $("#div_range").html(newrange);
        } else {
            var num1 = newrange.trim().substr(0, 2);
            var num2 = newrange.trim().substr(3, 2);
            console.log("text:" + newrange.trim() + ";num1:" + num1 + ";num2:" + num2);
            if (num1 <= num2) {
                newrange += "<span class='add-range' onclick='addrange(\"" + newrange.trim() + "\")'>Add</span>"
                $("#div_range").html(newrange);
            } else {
                newrange = newrange.trim().substr(0, newrange.trim().length - 2) + 'YY';
                $("#div_range").html(newrange);
            }
        }

    }
}
function set_list(string_number) {
    
    $("#hdinput_number").val(string_number);
    var num_length = string_number.length;
    var display_text = ""

    listnumber = [];
    var onenumber = '';
    for (var i = 0; i < num_length; i++) {
        var digit_number = string_number.substr(i, 1);
        onenumber += digit_number
        //console.log("digit number:" + digit_number + ";number:" + onenumber);

        if ((i + 1) % 2 == 0) {
            listnumber.push(onenumber);
            //console.log("number:" + onenumber);
            onenumber = '';
        }
        else {
            if (i == num_length-1) {
                listnumber.push(digit_number);
                //console.log("number:" + digit_number);
            }
        }
    }

    listnumber = unique(listnumber);
    console.log(listnumber);
}

function unique(list) {
    var result = [];
    $.each(list, function (i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}
function load_numberlist(list) {
    var html = "";
    var betamount = $("#hd_betamount").val();
    html += '<div class="span-slot" style="width:auto;">ទឹកប្រាក់ភ្នាល់: ' + betamount + "R" + '</div>';
    html += html_slot();
    html += load_numberlist_html(list);

    $("#div_numbers").html(html);
}

function load_numberlist_html(list) {
    var html = "";
    html += "<span class='span-slot'>ចាក់លេខៈ</span> ";
    for (var i = 0; i < list.length; i++) {
        var number = list[i];

        html += "<div class='round-number' style='line-height: 20px;float:none;display:inline-block;padding: 2px;height: 25px;width: 25px;font-size: 16px;font-weight: bold;'>" + number + "</div>";
    }

    return html;
}

function delete_number() {
    var hdrange = $("#hdselectrange").val();
    if (hdrange == "") {
        var string_number = $("#hdinput_number").val();
        var num_length = string_number.length;

        string_number = string_number.substr(0, num_length - 1);
        $("#hdinput_number").val(string_number);
        console.log("hdinput:" + string_number);
        set_list(string_number);

        load_numberlist(listnumber);
    } else {
        $("#div_range").html("XX-YY");
    }

}

function select_auto() {
   
}

function multiply() {
    var string_number = $("#hdinput_number").val();
    var num_length = string_number.length;
    if (num_length % 2 == 0) {
        var newnumber = string_number.substr(num_length - 1, 1) + string_number.substr(num_length - 2, 1);
        string_number += newnumber;
        $("#hdinput_number").val(string_number);
        set_list(string_number);
        load_numberlist(listnumber);
    }
}
function addrange(stringrange) {
    console.log("str-range:" + stringrange);
    var num1 = parseInt(stringrange.substr(0, 2));
    var num2 = parseInt(stringrange.substr(3, 2));

    var string_number = $("#hdinput_number").val();
    for (var i = num1; i <= num2; i++) {
        if (i < 10) {
            listnumber.push('0' + i);
        } else {
            listnumber.push(i);
        }
        
        string_number += i;
    }
    listnumber = unique(listnumber);
    load_numberlist(listnumber);
    $("#hdinput_number").val(string_number);
    $("#spanConnect").removeClass("slot-active");
    $("#hdselectrange").val("");
    $("#div_range").hide();
}
