function scanresult() {
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
            var html = create_receipt(dataobj);
            var win = dataobj.win;
            html += "<table>"
            html += "<tr>"
            html += "<td></td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td>"
            html += "</tr>"
            html += "<tr>"
            html += "<td>លទ្ធផលៈ</td><td>" + dataobj.resultSlotA + "</td><td>B</td><td>C</td><td>D</td><td>E</td>"
            html += "</tr>"
            html += "</table>"

            if (win == true) {
                //qrcode_img_base64(bettingid, html);                  
                var withdrawal = dataobj.withdrawal;
                if (withdrawal == true) {
                    html += "ឈ្នះ:" + dataobj.winAmountA + "(បានដកប្រាក់ហើយ)";
                } else {
                    html += "ឈ្នះ:" + dataobj.winAmountA;
                }
               
            } else {
                
            }
            $("#div_result").html(html);
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
    var slotA = '';
    if (slotstring.includes('1') == true) {
        slotA == 'active'
    }
    var slotB = '';
    if (slotstring.includes('2') == true) {
        slotB == 'active'
    }
    var slotC = '';
    if (slotstring.includes('3') == true) {
        slotC == 'active'
    }
    var slotD = '';
    if (slotstring.includes('4') == true) {
        slotD == 'active'
    }
    var slotE = '';
    if (slotstring.includes('5') == true) {
        slotE == 'active'
    }

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
