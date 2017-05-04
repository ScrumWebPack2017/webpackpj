$(document).ready(function() {
    normalizeCabinet();
    $(window).resize(function () {
        normalizeCabinet();
    });

});

function normalizeCabinet() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    $('#wrapper').css({
        height: h - 100
    });
}

