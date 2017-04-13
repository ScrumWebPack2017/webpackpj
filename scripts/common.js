var editorHTML;
var editorCSS;

$(document).ready(function() {
    normalizePage();
    $(window).resize(function () {
        normalizePage();
    });

    editorHTML = ace.edit("source_code_html");
    editorCSS = ace.edit("source_code_css");
    editorHTML.setTheme("ace/theme/monokai");
    editorHTML.getSession().setMode("ace/mode/html");
    editorCSS.setTheme("ace/theme/monokai");
    editorCSS.getSession().setMode("ace/mode/css");




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

    $("#res_pass").css({marginTop:"19px"});

    $('#source_code_wrapper').click(function() {
        $('#source_code_wrapper').css({
            'display':'none'
        });
        $('#source_code_panel').css('display','none');
    });
});

function showSourceCode() {
    if ($('#source_code_wrapper').css('display') == 'block') {
        $('#source_code_wrapper').css('display', 'none');
        $('#source_code_panel').css('display', 'none');
    } else {
        $('#source_code_wrapper').css('display', 'block');
        $('#source_code_panel').css('dis' +
            'play', 'block');
        generateHTML();
    }

}

function generateHTML() {
    var innerHTML = $('#workplace').html();
    $("[class^='ui']").remove();

    var html = $('#workplace').html();
    //var css = '';
    var result = '';
    while (true) {
        var tmpPos = html.indexOf('class="');
        if (tmpPos != -1) {
            result += html.substr(0, tmpPos);
            var i;
            for (i = tmpPos + 8; html[i] != '"'; ++i);
            html = html.substring(i + 2);
        } else {
            break;
        }
    }
    result += html;
    /*
    $.trim(result);
    while (true) {
        var idPos = result.indexOf('id="');
        alert(idPos);
        if (idPos == -1) {
            break;
        } else {
            var ip;
            for (ip = idPos + 4; result[ip] != '"'; ++ip);
            var tmpId = html.substr(idPos + 4, ip);
            alert(tmpId);
            break;
        }
    }*/
    editorHTML.setValue(result);
    //$('#source_code_html').text(result);
    $('#workplace').html(innerHTML);
}

function tabControl() {
    $('.menu_tab').click(function () {
        if (this.id == 'source_code_btn') {
            showSourceCode();
        } else {
            $('.menu_tab').removeClass('selected_tab');
            this.setAttribute('class', 'menu_tab selected_tab');
            $('.property_list').css('visibility', 'hidden');
            $('#'+this.id.split('t')[0]).css('visibility', 'visible');
        }
    })
}

function shiftLeftBar() {
    var x = $('#left_bar').css('left').split('p')[0];
    if (x == 0) {
        $('#left_bar').animate({ left: "-230px" } , 400);
        $('#left_btn').css('backgroundImage', 'url(images/arrRight.png)');
    } else {
        $('#left_bar').animate({ left: "0px" } , 400);
        $('#left_btn').css('backgroundImage', 'url(images/arrLeft.png)');
    }
}

function normalizePage() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    if (w > 1800)
        $('#top_menu').css('width', w - 444);
    else
        $('#top_menu').css('width', w - 440);
    $('#left_bar').css('height', h - 200);
    $('#left_btn_col').css('padding-top', (h - 240)/2);

    if (w > 1800)
        $('.menu_tab').css('width', Math.floor((w - 460)/4) - 13);
    else if (w > 2400)
        $('.menu_tab').css('width', (w - 460)/4 - 16);
    else
        $('.menu_tab').css('width', (w - 460)/4 - 11);


    $('.property').css('width', $('#properties').width() / 2 - 40);
    $('.property_label').css('width', $('.property').width() * 0.35);

    $('.property_input').css('width', $('.property').width() * 0.65 - 10);
    $('select.property_input').css({
        'width': $('.property_input').width() + 4
    });

    $('#source_code_wrapper').css('height', h);
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
