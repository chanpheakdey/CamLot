

const GUI_VALUE_PAIRS = [
    ['size', 'px'],
    ['minversion', ''],
    ['quiet', ' modules'],
    ['radius', '%'],
    ['msize', '%'],
    ['mposx', '%'],
    ['mposy', '%']
];

const update_gui = () => {
    JQ.each(GUI_VALUE_PAIRS, (idx, pair) => {
        const $label = JQ('label[for="' + pair[0] + '"]');
        $label.text($label.text().replace(/:.*/, ': ' + JQ('#' + pair[0]).val() + pair[1]));
    });
};


function update_qrcode() {
    const options = {
        render: 'canvas',
        ecLevel: 'L',
        minVersion: 1,

        fill: '#000',
        background: null,

        text: 'no text',
        size: 200,
        radius: 0,
        quiet: 0,

        mode: 0,

        mSize: 0.1,
        mPosX: 0.5,
        mPosY: 0.5,

        label: 'no label',
        fontname: 'sans',
        fontcolor: '#000',

        image: null
    };

    // options.fill = JQ('#img-buffer')[0];
    // options.fill = 'rgba(255,0,0,0.5)';
    // options.background = JQ('#img-buffer')[0];
    // options.background = 'rgba(255,0,0,0.5)';

    //JQ('#qrcode').empty().qrcode(options);
    jquery('#qrcode').qrcode("this plugin is great");
};

function updateqr() {
    update_qrcode();
}
const update = () => {
    //update_gui();
    update_qrcode();
};

const on_img_input = () => {
    const input = JQ('#image')[0];
    if (input.files && input.files[0]) {
        const reader = new WIN.FileReader();
        reader.onload = event => {
            JQ('#img-buffer').attr('src', event.target.result);
            JQ('#mode').val('4');
            setTimeout(update, 250);
        };
        reader.readAsDataURL(input.files[0]);
    }
};

const init = () => {
    JQ('#image').on('change', on_img_input);
    JQ('input, textarea, select').on('input change', update);
    JQ(WIN).on('load', update);
    update();
};


