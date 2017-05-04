$(document).ready(function() {
    normalizeCabinet();
    $(window).resize(function () {
        normalizeCabinet();
    });

    $('#saveTemplate').click(function() {
        createTemplateString();
    });
});

function normalizeCabinet() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    $('#wrapper').css({
        height: h - 100
    });
}

