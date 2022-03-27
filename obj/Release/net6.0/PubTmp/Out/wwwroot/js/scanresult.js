$(document).ready(function () {
    $('#txt_code').keypress(function (e) {
        if (e.keyCode == 13)
            scanresult();
    });
    var qrcode = getUrlVars()["qrcode"];
    console.log(qrcode);
    if (qrcode != "" && qrcode !=null) {        
        scanQRresult(qrcode);
    } else {
        checktokendetail();
    }
    
   
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
                getusercredit(username);
                //getuserlist(username);
            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


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
            console.log(data);
            $("#div_credit").html("R" + data);
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });
}

function gotoscanner() {
    window.location = window.location + "&scanner=1";
}
function scanresult() {
    $("#div_result").show();
    var code = $("#txt_code").val();

    $.ajax({
        //cache: false,
        async: false,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getbettingresult",
        data: '{"bettingID": ' + code + '}',
        success: function (dataobj) {
            console.log(dataobj);
            var html = "";
            
            var win = dataobj.win;
            html += "<table class='tbl-result'>"
            html += "<tr>"
            html += "<td></td><td style='width:40px;text-align:center;'>A</td><td style='width:40px;text-align:center;'>B</td><td>C</td><td>D</td><td>E</td>"
            html += "</tr>"
            html += "<tr>"
            html += "<td>លទ្ធផលៈ</td><td>" + dataobj.resultSlotA + "</td><td>" + dataobj.resultSlotB + "</td><td>" + dataobj.resultSlotC + "</td><td>" + dataobj.resultSlotD + "</td><td>" + dataobj.resultSlotE + "</td>"
            html += "</tr>"
            html += "</table>"

            if (win == true) {
                //qrcode_img_base64(bettingid, html);                  
                var withdrawal = dataobj.withdrawal;
                if (withdrawal == true) {
                    html += "ឈ្នះ: R" + (dataobj.winAmountA + dataobj.winAmountB + dataobj.winAmountC + dataobj.winAmountD + dataobj.winAmountE) + " <span style='color:red;'>(បានដកប្រាក់ហើយ)</span>";
                    html += '<div>អ្នកដកៈ ' + dataobj.withdrawalBy + ' (' + dataobj.withdrawalDate + ')</div>';
                    //html += '<div style="text-align:center;"><input type="button" class="button-print print_button" value="Print" onclick="Printwithdraw()"></div>';

                } else {
                    var totalwin = dataobj.winAmountA + dataobj.winAmountB + dataobj.winAmountC + dataobj.winAmountD + dataobj.winAmountE;
                    html += "<div>ឈ្នះ: R" + totalwin + "</div>";
                    var username = $("#hdUsername").val();
                    console.log("username:" + username);
                    html += '<div style="text-align:center;"><input type="button" class="button-print" value="Withdraw" onclick="withdraw(' + code + ',' + "'" + username+ "'" + ',' + totalwin + ')"></div>';
                }
               
            } else {
                
            }
            html += create_receipt(dataobj);

            $("#div_result").html(html);
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


}


function scanQRresult(qrcode) {
    $("#div_result").show();
    var code = qrcode;

    $.ajax({
        //cache: false,
        async: false,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getbettingresult",
        data: '{"bettingID": ' + code + '}',
        success: function (dataobj) {
            console.log(dataobj);
            var html = "";
            var win = dataobj.win;
            html += "<table class='tbl-result'>"
            html += "<tr>"
            html += "<td></td><td style='width:40px;text-align:center;'>A</td><td style='width:40px;text-align:center;'>B</td><td>C</td><td>D</td><td>E</td>"
            html += "</tr>"
            html += "<tr>"
            html += "<td>លទ្ធផលៈ</td><td>" + dataobj.resultSlotA + "</td><td>" + dataobj.resultSlotB + "</td><td>" + dataobj.resultSlotC + "</td><td>" + dataobj.resultSlotD + "</td><td>" + dataobj.resultSlotE + "</td>"
            html += "</tr>"
            html += "</table>"

            if (win == true) {
                //qrcode_img_base64(bettingid, html);                  
                var withdrawal = dataobj.withdrawal;
                if (withdrawal == true) {
                    html += "ឈ្នះ: R" + (dataobj.winAmountA + dataobj.winAmountB + dataobj.winAmountC + dataobj.winAmountD + dataobj.winAmountE) + " <span style='color:red;'>(បានដកប្រាក់ហើយ)</span>";
                    html += '<div>អ្នកដកៈ ' + dataobj.withdrawalBy + ' (' + dataobj.withdrawalDate + ')</div>';
                    //html += '<div style="text-align:center;"><input type="button" class="button-print print_button" value="Print" onclick="Printwithdraw()"></div>';

                } else {
                    var totalwin = dataobj.winAmountA + dataobj.winAmountB + dataobj.winAmountC + dataobj.winAmountD + dataobj.winAmountE;
                    html += "<div>ឈ្នះ: R" + totalwin + "</div>";
                    var username = $("#hdUsername").val();
                    console.log("username:" + username);
                    html += '<div style="text-align:center;"><input type="button" class="button-print" value="Withdraw" onclick="withdraw(' + code + ',' + "'" + username + "'" + ',' + totalwin + ')"></div>';
                }

            } else {

            }
            html += create_receipt(dataobj);
            $("#div_result").html(html);
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


}

function withdraw(bettingid, username, withdrawalAmount) {
    var html = '';
    html +=`<span class="span-confirm-action"><input type="button" class="button-print" value="Yes" onclick="confirmwithdraw(` + bettingid + `,'` + username + `',` + withdrawalAmount + `)" /></span>
            <span class="span-confirm-action"><input type="button" class="button-print" value="Cancel" onclick="cancelwithdraw()" /></span>`

    $("#div_confirm_action").html(html);
    $("#div_confirm").show();
    $("#div_login").hide();
}

function cancelwithdraw() {
    $("#div_confirm").hide();
    $("#div_login").show();
}

function confirmwithdraw(bettingid, username,withdrawalAmount) {
   
        $.ajax({
            //cache: false,
            async: false,
            type: "POST",
            //dataType: "Json",
            contentType: "application/json; charset=utf-8",
            url: "api/withdraw",
            data: '{"bettingID": ' + bettingid + ',"createdBy":"' + username + '","WithdrawalAmount":' + withdrawalAmount + '}',
            success: function (dataobj) {
                var result_tran = dataobj.d;
                if (result_tran == "error") {
                    //alert("error");
                    window.location = window.location.href;
                } else {
                    var qrcode = getUrlVars()["qrcode"];
                    
                    if (qrcode != "" && qrcode != null) {
                        scanQRresult(qrcode);
                    } else {
                        scanresult();
                    }
                    getusercredit(username);
                    cancelwithdraw();
                }

            },
            error: function (result) {
                console.log(result);
                //$('#loading').hide();
            }
        });
    
   
}

function create_receipt(objBetting) {
    

    var html = "";
    html += '<div style="font-size:xx-large;">';
    html += "<img src='images/CamLotto.png' style='width:100px;'>";
    html += '<span class="logo-title" ><span style="color:black;">CAM</span><span style="color:#c67819"> LOTTO</span> <br></span>';
    html += "</div>";
    html += "<div>ឆ្នោតទី:" + objBetting.gameID + "</div>";
    html += "<div>ម៉ោងចាក់ឆ្នោត:" + objBetting.createdDate + "</div>";


    html += printdetail(objBetting);
    html += "<div style='padding:5px;border-bottom: solid 1px gray;'></div>";

    html += "<div>Printed by:" + objBetting.createdBy + "</div>";
    return html;
}

function printdetail(objresult) {

        var html = "";

        html += "<div>";
        //html += "<div>ប្រភេទ:</div>";
        html += html_slot(objresult);
        html += "</div>";

        html += "<div>";
        //html += "<div>លេខដែលបានចាក់:</div>";
    var betnumber = objresult.betNumber;
    var array = betnumber.split(',');

    html += load_numberlist_html(array);
        html += "</div>";

        html += "<div style='width: 100%;display: inline-block;margin-top: 20px;' >";

     
        html += "<div>ចំនួនទឹកប្រាក់:" + objresult.betAmount + " KHR</div>";
        html += "<div>សរុប:" + objresult.totalBet + " KHR</div>";
        html += "</div>";

        html += "</div>";

        //console.log(html);
    return html;
    

}

function load_numberlist_html(list) {
    var html = "";
    html += "<span class='span-slot'>ចាក់លេខៈ</span> ";
    for (var i = 0; i < list.length; i++) {
        var number = list[i];

        html += "<div class='round-number' style='line-height:30px;float:none;display:inline-block;'>" + number + "</div>";
    }

    return html;
}

function html_slot(objresult) {
    var slotstring = objresult.slotNumber;
    console.log("slot:" + slotstring);
    var array = slotstring.split(',');
    console.log(array);
    var slotA = '';
    var slotB = '';
    var slotC = '';
    var slotD = '';
    var slotE = '';

    for (var i = 0; i < array.length; i++) {
        var slot = array[i];
        console.log(slot);
        if (slot == "1") {
            slotA = 'active';
        } else if (slot == "2") {
            slotB = 'active';
        } else if (slot == "3") {
            slotC = 'active';
        } else if (slot == "4") {
            slotD = 'active';
        } else if (slot == "5") {
            slotE = 'active';
        }
    }

    console.log("slotA:" + slotA);
    var html = "";
    html += "<span class='span-slot'>ប្រភេទ:</span> ";
 
    if (slotA == 'active') {
        html += "<div class='round-number' style='line-height:30px;'>A</div>";
       
    }
    if (slotB == 'active') {
        html += "<div class='round-number' style='line-height:30px;'>B</div>";
       
    }
    if (slotC == 'active') {
        html += "<div class='round-number' style='line-height:30px;'>C</div>";
        
    }
    if (slotD == 'active') {
        html += "<div class='round-number' style='line-height:30px;'>D</div>";
       
    }
    if (slotE == 'active') {
        html += "<div class='round-number' style='line-height:30px;'>E</div>";
      
    }

    return html = "<div style='width: 100%;display: inline-block;'>" + html + "</div>";
}


function Printwithdraw() {
    var html = $("#div_result").html();
    PrintElem(html);
}
function PrintElem(html) {

    //alert("aa");
    var innerhtml = html;

    var mycss = '';

    mycss += '@media all {';
    //mycss += '.page-break { display: none; }';
    mycss += '}';

    mycss += '@media print {';
    mycss += 'body {-webkit-print-color-adjust: exact;color-adjust: exact;}';
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

    mycss += `.tbl-result tr td{
        width:40px;
        text-align:center;
        }`




    mycss += '.page-break{';
    mycss += 'page-break-after: always;';
    mycss += '}';


    var mywindow = window.open('', 'PRINT', 'height=1500,width=1000');
    mywindow.document.write('<html><head>');


    var java = '';
    java += 'function print_receipt(){'
    java += 'window.print();window.close();}';

    mywindow.document.write('<script>');
    mywindow.document.write(java);
    mywindow.document.write('<\/script>');

    mywindow.document.write('<style>');
    mywindow.document.write(mycss);
    mywindow.document.write('</style>');

    mywindow.document.write('</head><body>');
    mywindow.document.write('<div style="width:5.8cm;">');
    //mywindow.document.write('<span id="sp_print" onclick="printme(this)" style="cursor:pointer;position:fixed;top:10px;right:10px;border-radius: 30px;background-color: #908d8d;color: white;padding: 5px;width: 60px;text-align: center;box-shadow: 1px 1px 1px rgb(0 0 0 / 32%), inset 1px 1px 1px rgb(255 255 255 / 44%);">Print</span>');
    mywindow.document.write(innerhtml);
    mywindow.document.write('</div>');
    //mywindow.document.write('<div  style="text-align:center;width:8cm;"><img onload="print_receipt()" src="' + imgdata + '" style="height:80px;" /></div>');

    mywindow.document.write('</body></html>');




    //mywindow.document.close(); // necessary for IE >= 10
    //mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
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
                
                window.location = "index";
            } 
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


}