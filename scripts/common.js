var editorHTML;
var editorCSS;
var tab = "    ";

$(document).ready(function() {


    $('.border_types').click(function() {
        focusedElement.css('borderStyle', $(this).text());
        $('.border_types').css('background', 'transparent');
        $(this).css('background', 'green');
    });

    $('.color_item').click(function() {
        focusedElement.css('background', $(this).css('background'));
    });

    normalizePage();
    $(window).resize(function() {
        normalizePage();
    });

    $(document).keyup(function(event) {
        if (event.keyCode == 27) {
            showSourceCode();
        }

    });

    editorHTML = ace.edit("source_code_html");
    editorCSS = ace.edit("source_code_css");
    editorHTML.setTheme("ace/theme/chrome");
    editorHTML.getSession().setMode("ace/mode/html");
    editorCSS.setTheme("ace/theme/chrome");
    editorCSS.getSession().setMode("ace/mode/css");

    instaValidate();
    tabControl();
    $('#authorization_form').submit(function(event) {
        event.preventDefault();
        if (validateAuth()) {
            sendAuthorization();
        } else {
            //alert("Error");
        }

    });

    $("#res_pass").css({
        marginTop: "19px"
    });

    $('#source_code_wrapper').click(function() {
        showSourceCode();
    });
});

function closeWithChanges() {
    submitChangesCSS();
    createNewStatus("CSS was changed with Editor", cursor, changes, generatedElements);
    ++cursor;
    $('#source_code_wrapper').css('display', 'none');
    $('#source_code_panel').css('display', 'none');
    allowkeys = true;
    if (focusedElement != null) {
        fillPropertiesTable(focusedElement);
    }
}

function showSourceCode() {
    if ($('#source_code_wrapper').css('display') == 'block') {
        $('#source_code_wrapper').css('display', 'none');
        $('#source_code_panel').css('display', 'none');
        allowkeys = true;
    } else {
        $('#source_code_wrapper').css('display', 'block');
        $('#source_code_panel').css('display', 'block');
        generateHTML();
        $('.toSource').remove();
        editorHTML.setReadOnly(true);
        editorHTML.clearSelection();
        editorCSS.clearSelection();
        allowkeys = false;
        $("#vertical_context_menu").css({
            visibility: "hidden"
        });
    }
}

function getStylePairs(str) {
    var result = str.split(':');
    if (result.length == 1)
        return null;
    result[0] = $.trim(result[0]);
    result[1] = $.trim(result[1]);
    result[1] = result[1].substring(0, result[1].length - 1);
    return result;
}

function submitChangesCSS() {
    var styles = $.trim(editorCSS.getSession().getValue());
    var styleArr = new Array(0);
    var tmpPointer = 0;
    var pair;
    var tmpId;
    var i = 0;
    while (i < styles.length) {
        if (styles[i] == '#') {
            var j;
            for (j = i; styles[j] != ' '; ++j);
            tmpId = styles.substring(i, j);
            i = j + 1;
            tmpPointer = i;
            for (; styles[i] != '}'; ++i);
            var tmpStyles = styles.substring(tmpPointer, i + 1).split('\n');
            $(tmpId).attr('style', '""');
            for (var k = 1; k < tmpStyles.length - 1; ++k) {
                pair = getStylePairs(tmpStyles[k]);
                if (pair != null) {
                    $(tmpId).css(pair[0], pair[1]);
                }

            }
        } else {
            i++;
        }
    }

}


function tabControl() {
    $('.menu_tab').click(function() {
        if (this.id == 'source_code_btn') {
            showSourceCode();
        } else {
            $('.menu_tab').removeClass('selected_tab');
            this.setAttribute('class', 'menu_tab selected_tab');
            $('.property_list').css('visibility', 'hidden');
            $('#' + this.id.split('t')[0]).css('visibility', 'visible');
        }
    })
}

function shiftLeftBar() {
    var x = $('#left_bar').css('left').split('p')[0];
    if (x == 0) {
        $('#left_bar').animate({
            left: "-230px"
        }, 400);
        $('#left_btn').css('backgroundImage', 'url(images/arrRight.png)');
    } else {
        $('#left_bar').animate({
            left: "0px"
        }, 400);
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
    $('#left_btn_col').css('padding-top', (h - 240) / 2);

    if (w > 1800)
        $('.menu_tab').css('width', Math.floor((w - 460) / 4) - 13);
    else if (w > 2400)
        $('.menu_tab').css('width', (w - 460) / 4 - 16);
    else
        $('.menu_tab').css('width', (w - 460) / 4 - 11);


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
        success: function(data) {
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
        success: function(data) {
            if (data == "not confirmed") {
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
        $('#res_pass').css('margin-top', '2px');
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
        if (!pattern.test(email)) {
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
