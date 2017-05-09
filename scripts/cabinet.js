var focused = null;

$(document).ready(function() {
    normalizeCabinet();

    $(window).resize(function () {
        normalizeCabinet();
    });

    $.ajax({
            url: 'database_scripts/load_projects.php',
            type: 'POST',
            data: '',
            dataType: "text",
            success: generateProjectTemplate
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



