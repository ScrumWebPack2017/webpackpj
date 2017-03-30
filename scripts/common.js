window.onload = function() {
    $(window).resize(function () {
        normalizePage();
    });
    normalizePage();
    instaValidate();
    tabControl();
    $('#authorization_form').submit(function (event) {
        event.preventDefault();
        if (validateAuth()) {
            sendAuthorization();
        } else {
            //alert("Error");
        }

    });

};

function tabControl() {
    $('.menu_tab').click(function () {
        if (this.id == 'source_code_btn')
            return;
        $('.menu_tab').removeClass('selected_tab');
        this.setAttribute('class', 'menu_tab selected_tab');

    })
}

function shiftAuth() {
    var x = $('#user_block').css('width').split('p')[0];
    alert(x);
    if (x == 200) {
        ('#user_block').animate({width: '0'}, 400);
    }
    else {
        ('#user_block').animate({width: '200px'}, 400);
    }
}

function shiftLeftBar() {
    var x = $('#left_bar').css('left').split('p')[0];
    if (x == 0) {
        $('#left_bar').animate({ left: "-200px" } , 400);
        $('#left_btn').css('backgroundImage', 'url(images/arrRight.png)');
    } else {
        $('#left_bar').animate({ left: "0px" } , 400);
        $('#left_btn').css('backgroundImage', 'url(images/arrLeft.png)');
    }
}

function normalizePage() {
    var w = document.body.scrollWidth;
    var h = document.body.scrollHeight;
    $('#left_bar').css('height', h - 200);
    $('#left_btn_col').css('padding-top', (h - 240)/2);
    if (w > 1800)
        $('.menu_tab').css('width', Math.floor((w - 460)/4) - 12);
    else if (w > 2400)
        $('.menu_tab').css('width', (w - 460)/4 - 14);
    else
        $('.menu_tab').css('width', (w - 460)/4 - 10.5);

}

/* Authorization





 */

function logOut() {
    $.ajax({
        url: 'database_scripts/session_close.php',
        success: function (data) {
            if (data == 'closing')
                location.reload();
        }
    });
}

/* Authorization





 */

function sendAuthorization() {
    var data = $('#authorization_form').serialize();
    $.ajax({
        url: 'database_scripts/auth_script.php',
        type: 'POST',
        data: data,
        dataType: 'text',
        success: function (data) {
            if(data == "not confirmed") {
                errorAuth("Confirm your email first!");
            } else {
                if (data == 'bad data')
                    errorAuth('Wrong input data');
                else {
                    location.reload();
                }
            }
        }
    });
}

function errorAuth(text) {
    if (text != '') {
        $('#res_pass').css('margin-top', '0px');
        $('#error_lbl').html(text);
    } else {
        $('#res_pass').css('margin-top', '19px');
        $('#error_lbl').html('');
    }
}

function checkPasswordAuth() {
    var p = $('#pass_input').val();
    if (p.length < 6) {
        borderRed('pass_input');
        return false;
    }
    var pattern = /^[a-z0-9_-]{6,18}$/i;
    if (!pattern.test(p)) {
        borderRed('pass_input');
        return false;
    }
    return true;
}

function checkEmailAuth() {
    var email = $('#email_input').val();
    if (email == "") {
        borderRed('email_input');
        return false;
    } else {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if(!pattern.test(email)) {
            borderRed('email_input');
            return false;
        }
    }
    return true;
}

function validateAuth() {
    var a = checkEmailAuth();
    var b = checkPasswordAuth();
    if (!(a && b)) {
        errorAuth('Invalid input');
    }
    return a && b;
}

function instaValidate() {
    $('#email_input').focus(function() {
        borderDefault('email_input');
        errorAuth('');
    });
    $('#pass_input').focus(function() {
        borderDefault('pass_input');
        errorAuth('');
    });
}

function borderRed(id) {
    $('#' + id).css('border', '1px solid red');
}

function borderDefault(id) {
    $('#' + id).css('border', '1px solid #e7e7e7');
}
