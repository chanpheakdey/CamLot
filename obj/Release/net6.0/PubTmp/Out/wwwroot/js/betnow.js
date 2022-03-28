function loadnumbers() {
    var html = "";
    for (var i = 1; i < 100; i++) {

        if (i % 10 == 0) {
            html += "<div>";
        }
        if (i < 10) {
            html += "<div class='round-number' id='span_n0" + i + "'>0" + i + "</div>";

        } else {
            html += "<div class='round-number' id='span_n" + i + "'>" + i + "</div>";

        }
        if (i % 10 == 0) {
            html += "</div>";
        }

    }



    $("#div_numbers").html(html);
}