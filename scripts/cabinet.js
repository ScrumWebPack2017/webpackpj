$(document).ready(function() {
    normalizeCabinet();
    $(window).resize(function () {
        normalizeCabinet();
    });

    $(".template_box").on("mouseover", function(e) {
        $(this).css({
            background: "#e4e8eb"
        });
    }).on("mouseout", function(e) {
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


function selectProject() {

}

