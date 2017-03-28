$(document).ready(function(){
    var generatedElements = new Array(0);

    var e = {
        type: "div",
        position: "absolute",
        width: "100px",
        height: "100px",
        background: "yellow"
    }

    $("#red").treeview({
        animated: "normal",
        collapsed: true,
        control: "#treecontrol"
    });

    $('.element').click(function () {
        var e = {
            type: "div",
            position: "relative",
            float: 'right',
            margin: 'auto',
            width: "400px",
            height: "400px",
            background: "yellow"
        };

        generatedElements.push(e);
        generateElement(e);
    });
});

function generateElement(element) {
    var el = document.createElement(element.type);
    el.setAttribute('id', 'div15');

    $('#workplace').append(el);

    $('#div15').css({
        position: element.position,
        float: element.float,
        margin: element.margin,
        width: element.width,
        height: element.height,
        background: element.background
    });



}