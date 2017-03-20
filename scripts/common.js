window.onload = function() {

    normalizePage();
}

function normalizePage() {
    var h = document.body.scrollHeight;
    $('#left_bar').css('height', h - 200);
}