var editorHTML;
var editorCSS;
var tableDiv = 0;
var tab = "    ";

$(document).ready(function() {

    $('.templ_input').blur(function() {
    });


    $('#templates_wrapper').click(function() {
        alert("fsdfs");
        showTemplates();
    });

    $('#source_code_wrapper').click(function() {
        showSourceCode();
    });

    $('.border_types').click(function() {
        focusedElement.css('borderStyle', $(this).text());
        $('.border_types').css('background', 'transparent');
        $(this).css('background', 'green');
    });

    $('.color_item').click(function() {
        focusedElement.css('background', $(this).css('background'));
    });

    normalizePage();
    normalizeProperties();
    $(document).resize(function() {
       if (propResize) {
           normalizeProperties();
       }
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


});

function showAuth() {
    $("#vertical_context_menu").css({
        visibility: 'hidden'
    });
    $(".near_block").css({
        visibility: 'hidden'
    });
    var x = $('#header_authorization_img').offset().left;
    console.log(x);
    $('#user_block').css({
        left: x + 'px'
    });
    if ($('#user_block').css('display') == 'none') {
        $('#user_block').css('display', 'block');
    } else {
        $('#user_block').css('display', 'none');
    }
}

function showProperties() {
    $("#vertical_context_menu").css({
        visibility: 'hidden'
    });
    $(".near_block").css({
        visibility: 'hidden'
    });
    console.log('showProperties()');
    $('#vertical_context_menu').css('visibility', 'hidden');
    var w = document.documentElement.clientWidth;
    var pos = $('#header_menu_wrap').css('left').split('p')[0];
    if (pos == w) {
        $('#header_menu_wrap').animate({
           left: 0
        }, 700);
        $('#workplace').animate({
            top: '265px'
        }, 700);
    } else {
        $('#header_menu_wrap').animate({
            left: w
        }, 700);
        $('#workplace').animate({
            top: '93px'
        }, 700);
    }

}

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
    $("#vertical_context_menu").css({
        visibility: 'hidden'
    });
    $(".near_block").css({
        visibility: 'hidden'
    });
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
    $("#vertical_context_menu").css({
        visibility: "hidden"
    });
    $(".near_block").css({
        visibility: 'hidden'
    });
    $('#vertical_context_menu').css('visibility', 'hidden');
    var x = $('#left_bar').css('left').split('p')[0];
    var w = $('#status_line').css('width').split('p')[0];
    if (x == 0) {
        $('#left_bar').animate({
            left: "-230px"
        }, 400);
        $('#status_line').animate({
            'margin-left': "10px"
        }).css({

        });
        $('#left_btn').css('backgroundImage', 'url(images/arrRight.png)');
    } else {
        $('#left_bar').animate({
            left: "0px"
        }, 400);
        $('#status_line').animate({
            'margin-left': "230px"
        }).css({

        });
        $('#left_btn').css('backgroundImage', 'url(images/arrLeft.png)');
    }
}

function normalizeProperties() {
    if ($('body').css('cursor').split('-')[1] != 'resize') {
        var w = document.documentElement.clientWidth;
        $('#header_menu_wrap').css('left', w);
    }

}

function normalizePage() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    //



    if (w < 1300) {
        $(".header_item_box").css({
            width: (w - 260) / 4 - 40 + "px",
            fontSize: '16px'

        });
        $('#props_box').css('width', (w - 260) / 4 - 10 + 'px');

    } else {
        $(".header_item_box").css({
            width: (w - 260) / 4 - 30 + "px"
        });
    }
    //$('#props_box').css('width', (w - 260) / 4 - 10 + 'px');
    if (w < 1000) {
        $('#header_block').css('margin-right', '10px');
        $(".header_item_box").css({
            width: (w - 260) / 4 - 45 + "px",
            fontSize: '16px'

        });
        $('#props_box').css('width', (w - 260) / 4 + 5 + 'px');
        $('#signup_box').css('width', (w - 260) / 4 - 20 + 'px');
        $('#cab_box').css('width', (w - 260) / 4 - 30 + 'px');
    }


    $('#templates_wrap').css('height', h);
    //
    if (w > 1800)
        $('#top_menu').css('width', w);
    else
        $('#top_menu').css('width', w);
    $('#left_bar').css('height', h - 62);
    $('#left_btn_col').css('padding-top', (h - 240) / 2);

    if (w > 1800)
        $('.menu_tab').css('width', Math.floor((w - 20) / 4) - 13);
    else if (w > 2400)
        $('.menu_tab').css('width', (w - 20) / 4 - 16);
    else
        $('.menu_tab').css('width', (w - 20) / 4 - 11);

    if (w < 1300)
        $('.property').css('width', $('#properties').width() / 2 - 44);
    else
        $('.property').css('width', $('#properties').width() / 2 - 42);
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

function showTemplates() {
    if ($('#templates_wrap').css('display') == 'block') {
        $('#templates_wrap').css('display', 'none');
        $('#templates_panel').css('display', 'none');
        allowkeys = true;
    } else {
        $('#templates_wrap').css('display', 'block');
        $('#templates_panel').css('display', 'block');
        allowkeys = false;
        $("#vertical_context_menu").css({
            visibility: "hidden"
        });
    }
}

function showTable() {
    $('#table_box').css({
        visibility: 'visible'
    });
    $('#list_box').css({
        visibility: 'hidden'
    });
    $('#table_tab').css({
        color: '#ffffff'
    });
    $('#list_tab').css({
        color: '#a0a295'
    });
}

function showList() {
    $('#table_box').css({
        visibility: 'hidden'
    });
    $('#list_box').css({
        visibility: 'visible'
    });
    $('#table_tab').css({
        color: '#a0a295'
    });
    $('#list_tab').css({
        color: '#ffffff'
    });
}

function addTable() {

    var rows = $('#templ_rows').val();
    var cols = $('#templ_cols').val();
    var cellH = $('#templ_height').val() == '' ? '10px' : $('#templ_height').val();
    var cellW = $('#templ_width').val() == '' ? '10px' : $('#templ_width').val();
    var tdSpacing = $('#templ_spacing').val() == '' ? '0' :  $('#templ_spacing').val();
    var tdPadding = $('#templ_padding').val() == '' ? '0' : $('#templ_padding').val();
    var tableBorder = $('#templ_table_border').val() == '' ? '' : $('#templ_table_border').val();
    var tdBorder = $('#templ_td_border').val() == '' ? '' : $('#templ_td_border').val();

    var table = "<table>";
    if (rows != "" && cols != "") {
        for (var i = 0; i < rows; ++i) {
            table += "<tr>"
            for (var j = 0; j < cols; ++j) {
                table += "<td></td>"
            }
            table += "</tr>";
        }
        table += "</table>";

        var divId = 'tDiv_' + tableDiv++;
        var div = {
            id: divId,
            type: "div",
            parent: "#workplace",
            focused: false,
            zIndex_: zindex,
            locked: false
        };


        // setting div styles
        var divW = (+cellW + +tdPadding + +tdSpacing + tdBorder.split('p')[0] * 2) * cols + +tableBorder.split('p')[0] * 2;
        var divH = (+cellH + +tdPadding + +tdSpacing  + tdBorder.split('p')[0] * 2) * rows + +tableBorder.split('p')[0] * 2;
        generateAgain(div, '', false);
        $('#' + divId).css({
            width: divW + 'px',
            height: +divH +20 + 'px',
            background: getLightColor()
        })
            //.resizable("disable")
            .append(table);


        $('#' + divId + ' table').css({
            'border-spacing': tdSpacing,
            border: tableBorder
        });
        $('#' + divId + ' td').each(function(e) {
            $(this).css({
                width: cellW,
                height: cellH,
                border: tdBorder,
                padding: tdPadding
            });
        });

        showTemplates();
        shiftLeftBar();
    }

}
