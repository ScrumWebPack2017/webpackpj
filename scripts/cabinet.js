$(document).ready(function() {
    normalizeCabinet();
    $(window).resize(function () {
        normalizeCabinet();
    });

    $('#templates').on("mouseover", ".template_box",  function(e) {
        $(this).css({
            background: "#e4e8eb"
        });
    }).on("mouseout", ".template_box", function(e) {
        $(this).css({
            background: "#ffffff"
        });
    });

    $('#saveTemplate').click(function() {
        createTemplateString();
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

// New project
function createProject() {
    var prjName = $('#projectName').val();
    $('#projectName').val('');

    // prjName - name of the new project
    showProjectFeild(); // hide field
}

// get string : "path=timer=image&path=timer=image..."
function generateProjectTemplate(data) {
    // test data: data = 'SomeName=1023323=images/logo.jpg&SomeName=1023323=images/logo2.jpg';
    var projects = data.split('&');
    for (var i = 0; i < projects.length; ++i) {
        var prjData = projects[i].split('=');
        var newEl =
            '<div class="template_box"><div class="template_img" style="background: url('+ prjData[2] +
            '); background-size: cover;"></div><div class="template_name">' + prjData[0] +
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

