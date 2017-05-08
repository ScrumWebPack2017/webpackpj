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

function normalizeCabinet() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    /* $('#wrapper').css({
        height: h - 100,
        width: w
    }); */
    var templW = $('#templates').width();
    $('.template_box').css({
        width: (templW / 4 - 40) + "px"
    });
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

