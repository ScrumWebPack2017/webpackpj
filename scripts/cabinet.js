var focused = null;
var t, l = (new Date()).getTime();

/*
 confirmUserInfo() - send changed data
 serializeUserForm() - GET string for used info

 */


$(document).ready(function() {
    centerize();
    normalizeCabinet();
    //feelUserInfo("someEmail.@gmail.com", "Sonya Marmeladova", "3807766999", "Male", "USA");
    $(window).resize(function () {
        normalizeCabinet();
    });

    $('#change_user_box input').focus(function() {
        if (this.id == 'input_email') {
            borderDefault(this.id);
            $('#email_error').html('');
        } else if (this.id == 'input_phone') {
            borderDefault(this.id);
            $('#phone_error').html('');
        } else if (this.id == 'input_country') {
            borderDefault(this.id);
            $('#country_error').html('');
        }
        normalizeBorders();
    });

    $('#control_wrapper, #templates_wrapper').on("click", function() {if($('#drop_menu').css('visibility') == 'visible') {
        dropMenu();
    }})

    $(document).on("scroll",function(){
        if($('#drop_menu').css('visibility') == 'visible') {
            dropMenu();
        }
    });

    $.ajax({
        url: 'database_scripts/load_projects.php',
        type: 'POST',
        data: '',
        dataType: "text",
        success: generateProjectTemplate
    });

    $.ajax({
        url: 'database_scripts/get_data.php',
        type: 'POST',
        data: '',
        dataType: "text",
        success: function(data) {
            if(data != "Error") {
                var input = data.split("*");
                feelUserInfo(input[0], input[1], input[2], input[3], input[4]);
                $("#top_photo img").attr('src', "../images/png/" + input[5]);
            }
        }
    });

    $('#templates').on("mouseover", ".template_box",  function(e) {
        if(focused != this) {
            $(this).css({
                background: "#e4e8eb"
            });
        }
    }).on("mouseout", ".template_box", function(e) {
        if(focused != this) {
            $(this).css({
                background: "#ffffff"
            });
        }
    }).on("click", ".template_box",  function(e) {
        focused = this;
        $(".template_box").css({ background: "#ffffff" });
        $(this).css({ background: "#c0c5c8" });
    });

    $('#saveTemplate').click(function() {
        createTemplateString();
    });

    $("#createBtn").click(function (event) {
        event.preventDefault();
        createProject();
    });
    
    $("#load_btn").click(function (event) {
       event.preventDefault();
        if(focused != null) {
            $.ajax({
                url: 'database_scripts/load_p.php',
                type: 'POST',
                data: "filename=" + $(focused).children(".template_name").html(),
                dataType: "text",
                success: function (data) {
                    if(data == "OK") {
                        window.location.replace("http://webpackpj.com");
                    }
                }
            });
        }
    });
    
    $("#delete_btn").click(function (event) {
       event.preventDefault();
       if(focused != null) {
           $.ajax({
               url: 'database_scripts/project_delete.php',
               type: 'POST',
               data: "pjname=" + $(focused).children(".template_name").html(),
               dataType: "text",
               success: function (data) {
                   if(data == "OK") {
                       $(focused).remove();
                       focused = null;
                   }
               }
           });
       }
    });
});

function centerize() {
    var height = document.documentElement.clientHeight;
    $('#change_menu_panel').css('top', (height - $('#change_menu_panel').css('height').split('p')[0] - 30)/2);
}

function logOut() {
    $.ajax({
        url: 'database_scripts/session_close.php',
        success: function(data) {
            if (data == 'closing')
                window.location.replace("http://webpackpj.com");
        }
    });

}

// Function to put userInfo
function feelUserInfo(email, login, phone, gender, country) {
    $('#drop_email').html(email);
    $('#input_email').val(email);
    if (login != 0) {
        $('#top_name').html(login);
        $('#input_login').val(login);
    } else {
        $('#top_name').html(email);
    }
    if (phone != 0) {
        $('#drop_phone').html(phone);
        $('#input_phone').val(phone);
    } else {
        $('#drop_phone').html('-');
    }
    if (gender != 0) {
        $('#drop_gender').html(gender);
        $('#input_gender').val(gender);
    } else {
        $('#drop_phone').html('-');
    }
    if (country != 0) {
        $('#drop_cpuntry').html(country);
        $('#input_country').val(country);

    } else {
        $('#drop_phone').html('-');
    }
}


function showPassChanger() {
    $('#change_pass_tab').css('color', '#ffffff');
    $('#change_user_tab').css('color', '#a0a295');
    $('#change_pass_box').css('display', 'block');
    $('#change_user_box').css('display', 'none');
}

function showUserDataChanger() {
    $('#change_pass_tab').css('color', '#a0a295');
    $('#change_user_tab').css('color', '#ffffff');
    $('#change_pass_box').css('display', 'none');
    $('#change_user_box').css('display', 'block');
}

function normalizeCabinet() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var templW = $('#templates').width();
    $('.template_box').css({
        width: (templW / 4 - 40) + "px"
    });
    $('#drop_menu').css({
        left: w - 510 + "px"
    });
    $('#change_menu_wrapper').css('height', h + 'px');

}

function createProject() {
    var prjName = $('#projectName').val();
    $('#projectName').val('');
    //empty-featured2-1.png
    var get;
    var query = "data=" + prjName;
    $.ajax({
        url: 'database_scripts/file_creator.php',
        type: 'POST',
        data: query,
        dataType: "text",
        success: function (data) {
            get = data + "=images/1234.png&";
            generateProjectTemplate(get);
            showProjectFeild();
        }
    });
}

// get string : "path=timer=image&path=timer=image..."
function generateProjectTemplate(data) {
    // test data: data = 'SomeName=1023323=images/logo.jpg&SomeName=1023323=images/logo2.jpg';
    var projects = data.split('&');
    for (var i = 0; i < projects.length - 1; ++i) {
        var prjData = projects[i].split('=');
        var newEl =
            '<div class="template_box"><div class="template_img" style="background: url('+ prjData[2] +
            '); background-size: 100% 100%;"></div><div class="template_name">' + prjData[0] +
            '</div><div class="template_time">' + prjData[1] +
            '</div></div>';
        $('#templates').append(newEl);
    }
    normalizeCabinet();
}

function showProjectFeild() {
    if ($('#createForm').css('visibility') == 'hidden') {
        $('#createForm').css('visibility', 'visible');
        $('#projectName').val("");
    } else {
        $('#createForm').css('visibility', 'hidden');
    }

}

function dropMenu() {
    if ($('#drop_menu').css('visibility') == 'hidden') {
        $('#drop_menu').css('visibility', 'visible');
    } else {
        $('#drop_menu').css('visibility', 'hidden');
    }
}

function showChangeMenu() {
    if ($('#change_menu_wrapper').css('display') == 'block') {
        $('#change_menu_wrapper').css('display', 'none');
        $('#change_menu_panel').css('display', 'none');
    } else {
        $('#change_menu_wrapper').css('display', 'block');
        $('#change_menu_panel').css('display', 'block');

    }
}

function serializeUserForm() {
    var result = "email=";
    result += $('#input_email').val();
    result += "&name=";
    result += $('#input_login').val();
    result += "&phone=";
    result += $('#input_phone').val();
    result += "&country=";
    result += $('#input_country').val();
    alert(result);
}

function confirmNewPassword() {
    if (checkPassword()) {
        var password = "password=" + $('#input_new_pass').val();

        //sending to DB...
    }
}

function checkPrevPassword(prevPass) {
    // prevPass - string
    // return true; if input is equal to DB value
}

function checkPassword() {
    var newPass = $('#input_new_pass').val();
    var prevPass = $('#input_prev_pass').val();

    if (!checkPrevPassword(prevPass)) {
        borderRed('input_prev_pass');
        $('#prev_pass_error').html('Password is incorrect');
        return false;
    }

    if (newPass.length < 6) {
        borderRed('input_new_pass');
        $('#new_pass_error').html('Password must contain at least 6 symbols');
        return false;
    }

    var pattern = /^[a-z0-9_-]{6,18}$/i;
    if (!pattern.test(newPass)) {
        borderRed('input_new_pass');
        $('#new_pass_error1').html('Password contains irregular symbols');
        return false;
        // Invalid
    }
    return true;

}

function checkCountry() {
    var country = $('#input_country').val();
    if (country.length == 0)
        return true;
    if (country.indexOf(' ') != 0) {
        var pattern = /^[a-zA-Zа-яА-ЯЇї()-]{2,28}$/i;
        if (!pattern.test(country)) {
            borderRed('input_country');
            $('#country_error').html('Invalid input');
            return false;
        }
    }
    return true;
}

function checkPhone() {
    var phone = $('#input_phone').val();
    if (phone.length == 0)
        return true;
    if (phone.indexOf(' ') != 0) {
        var pattern = /^[0-9()-]{6,18}$/i;
        if (!pattern.test(phone)) {
            borderRed('input_phone');
            $('#phone_error').html('Invalid phone');
            return false;
        }
    }
    return true;
}

function checkEmail() {
    var email = $('#input_email').val();
    if (email == "") {
        borderRed('input_email');
        $('#email_error').html('This field is required');
        return false;
    } else {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if(!pattern.test(email)) {
            borderRed('input_email');
            $('#email_error').html('Invalid input');
            return false;
        }
    }
    var data = "email=" + $('#input_email').val();
    $.ajax({
        url: 'database_scripts/emailChecker.php',
        type: 'POST',
        data: data,
        dataType: 'text',
        success: function (data) {
            if (data.indexOf('yes') == -1) {
                borderRed('input_email');
                $('#email_error').html('Email exists');
            }
        }
    });
    return $('#email_error').html().length == 0;
}

function borderRed(id) {
    $('#' + id).css('border', '1px solid red');
}

function borderDefault(id) {
    $('#' + id).css('border', '1px solid #e7e7e7');
}

function confirmUserInfo() {
    if(checkUserInfo()) {
        var get = serializeUserForm();
        $.ajax({
            url: 'database_scripts/personal_changes.php',
            type: 'POST',
            data: get,
            dataType: 'text',
            success: function (data) {
                if (data != "OK") {
                    console.log("NOT OK");
                }
            }
        });
    }
}

function checkUserInfo() {
    return checkEmail() & checkPhone() & checkCountry();
}

