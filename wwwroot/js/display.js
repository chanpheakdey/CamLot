
var mytimer;
function load_drawing() {
    mytimer = setInterval(function () {
        $("#div_popup_drawing").show();
      var number = 1 + Math.floor(Math.random() * 99);
      if (number < 10) {
          $("#div_loto").html('0' + number);
      } else {
          $("#div_loto").html(number);
      }
      
    }, 10);
}


function stop_drawing(resultstring) {
    clearInterval(mytimer);
    var intresult = parseInt(resultstring);

    if (intresult < 10) {
        $("#div_loto").html('0' + resultstring);
    } else {
        $("#div_loto").html(resultstring);
    }
}

