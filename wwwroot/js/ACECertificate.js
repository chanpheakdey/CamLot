

function createBlob(base64string) {
    var BASE64_MARKER = ';base64,';
    if (base64string.indexOf(BASE64_MARKER) == -1) {
        var parts = base64string.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    var parts = base64string.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function ConvertImageToPdf(ReferenceID, DateString, FileType, certificateType) {

    $.ajax({
        type: "POST",
        url: "TrainingCertificate.aspx/ConvertImageToPdf",
        data: '{ReferenceID:"' + ReferenceID + '",DateString:"' + DateString + '",FolderName:"Certificate", CertificateType:"' + certificateType + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (FileType == "PDF") {
                $('#div_certificate').css("background-image", "");
                //window.location = "Upload_s/Courses/" + pdfFileName + '?now=' + datetime;
                load_certificate(data.d, DateString);
            } else {
                $("#div_loadding").hide();
                //$('#div_png_certificate').css("max-width", "21cm");
                $('#div_png_certificate').css("width", "100%");
                $('#div_png_certificate').css("height", (141.43) + "%");
                //$('#div_png_certificate').css("background-image", "url(Upload_s/Courses/" + filename + ")");

                var image_name = data.d.replace(".pdf", ".jpg");
                $('#div_png_certificate').html("<img src='" + image_name + "?now=" + DateString + "' style='width:100%' />");
                $("#div_certificate").css("width", "100%");
                $("#div_certificate").css("height", (141.43) + "%");
            }
            console.log(data.d);
        },
        failure: function (response) {
            alert(response.d);
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

function load_data(pagename) {
    console.log("load data");
    //var q_ContactID = getParameterByName('ContactID');
    var ReferenceID = getParameterByName('ContactID');

            download_certificate(data.d.ReferenceID, data.d.CertificateType);
      
}

function redirect_tocertificate(pdfFileName,datetime) {
    window.location = pdfFileName + '?now=' + datetime;
}
function load_certificate(pdfFileName, datetime) {

    setTimeout(function () { redirect_tocertificate(pdfFileName, datetime); }, 1000);

}
function filter(node) {
    return (node.tagName !== 'i');
}

function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

function svgString2Image(svgString, width, height, format, callback) {
    // set default for format parameter
    format = format ? format : 'png';
    // SVG data URL from SVG string
    var svgData = svgString; //'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
    // create canvas in memory(not in DOM)
    var canvas = document.createElement('canvas');
    // get canvas context for drawing on canvas
    var context = canvas.getContext('2d');
    // set canvas size
    canvas.width = width;
    canvas.height = height;
    // create image in memory(not in DOM)
    var image = new Image();
    // later when image loads run this
    image.onload = function () { // async (happens later)
        // clear canvas
        context.clearRect(0, 0, width, height);
        // draw image with SVG data to canvas
        context.drawImage(image, 0, 0, width, height);
        // snapshot canvas as png
        var pngData = canvas.toDataURL('image/' + format);
        // pass png data URL to callback
        callback(pngData);
    }; // end async
    // start loading SVG data into in memory image
    image.src = svgData;
}


function saveasimage() {
    //var node = document.getElementById('div_png_certificate');
    //domtoimage.toBlob(node)
    //    .then(function (blob) {
    //        var objectURL = URL.createObjectURL(blob);
            
    //        var a = document.createElement("a"); //Create <a>
    //        a.href = objectURL; //Image Base64 Goes here
    //        a.download = "Image.png"; //File name Here
    //        a.click(); //Downloaded file


    //        console.log(blob);
    //        //save_blob(blob)
    //    });


                    var currentdate = new Date();
                var datetime = currentdate.getDate() + ""
                    + (currentdate.getMonth() + 1) + ""
                    + currentdate.getFullYear() + ""
                    + currentdate.getHours() + ""
                    + currentdate.getMinutes() + ""
        + currentdate.getSeconds();

    var filename = $("#txtfilename").val();
    var icon_html = $("#txticon").val();
    $("#div_icon").html(icon_html);

    domtoimage.toPng(document.getElementById('div_png_certificate'))
        .then((dataUrl) => {
            var link = document.createElement('a')
            link.download = filename + '_' + datetime + '.jpg'
            link.href = dataUrl
            link.click()
            this.clearBasket()
        })



    //domtoimage.toJpeg(node, { quality: 1.00 })
    //    .then(function (dataUrl) {
    //        //save_image(dataUrl, "abc.jpg");
    //        //save_blob("13", dataUrl);
           
     
    //        var base64ImageContent = dataUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    //        $("#imgfile").prop("src", 'data:image/png;base64,' + base64ImageContent)
            

    //            //var blob = createBlob(base64ImageContent);
    //            var currentdate = new Date();
    //            var datetime = currentdate.getDate() + ""
    //                + (currentdate.getMonth() + 1) + ""
    //                + currentdate.getFullYear() + ""
    //                + currentdate.getHours() + ""
    //                + currentdate.getMinutes() + ""
    //                + currentdate.getSeconds();
    //            //save_blob(blob, ReferenceID + "_" + datetime + ".jpg")
           


    //        //var link = document.createElement('a');

    //        //link.download = '0013.jpeg';
    //        //link.href = dataUrl;

    //    }

    //);

}

//**blob to dataURL**
function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function (e) { callback(e.target.result); }
    a.readAsDataURL(blob);
}

        ////////////////////////




function save_blob(blob) {


            



    var currentdate = new Date();
    var datetime = currentdate.getDate() + ""
        + (currentdate.getMonth() + 1) + ""
        + currentdate.getFullYear() + ""
        + currentdate.getHours() + ""
        + currentdate.getMinutes() + ""
        + currentdate.getSeconds();


     slice = blob.slice(0, 100, { type: "application/octet-stream" });

    var formdata = new FormData();
    formdata.append("blobData", slice);
    formdata.append("blobName", "Photo");


    
    console.log(formdata);
    
    var url = "api/UploadImage";

    //var image_name = ReferenceID + datetime + '.jpg';
    $.ajax({
        type: 'POST',
        url: 'api/UploadImage',
        data: formdata,
        processData: false,
        contentType: "image/png"
    }).done(function (data) {
        console.log(data);
    });

    return false;

}