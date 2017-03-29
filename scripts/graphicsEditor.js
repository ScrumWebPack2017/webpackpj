var generatedElements = new Array(0);

$(document).ready(function() {
    createLeftMenu();

    $('.inner_element').click(function() {
        shiftLeftBar();
        var e = {
            id: "",
            type: this.id,
            parent: "#workplace",
            position: "absolute",
            float: 'right',
            margin: '5px',
            width: "200px",
            height: "200px",
            background: "lawngreen",
            focused: false
        };

        generatedElements.push(e);
        generateElement(e);
    });

});




function createLeftMenu() {
    $("#red").treeview({
        animated: "normal",
        collapsed: true,
        control: "#treecontrol"
    });

}

function generateElement(element) {
    var el = document.createElement(element.type);

    var number = document.getElementById("workplace");
    var elems = number.getElementsByTagName(element.type);
    var identifier = element.type + '_' + (elems.length + 1);
    element.id = identifier;
    el.setAttribute('id', identifier);
    el.setAttribute('class', 'work_elements');

    el.innerHTML = "Hi, i`m " + element.type;

    $(element.parent).append(el);

    getRandomColorAndSize(element);

    $("#" + identifier).css({
        position: element.position,
        float: element.float,
        margin: element.margin,
        width: element.width,
        height: element.height,
        background: element.background
    });

    $("#" + identifier).attr('tabindex', 1).focus(function() {
        $("#" + identifier).css({
            outline: "dashed 2px #878787"
        });
    }).resizable({
        resize: function(event, ui) {
            document.getElementById("size_container").innerHTML = $("#" + identifier).width() + "x" + $("#" + identifier).height();
            $("#size_container").css({
                top: event.pageY - 45,
                left: event.pageX - 75
            });
            $("#size_container").animate({
                "opacity": "1"
            }, 400);
        },
        stop: function(event, ui) {
            $("#size_container").css({
                top: 0,
                left: 0
            });
        }
    }).draggable({
        containment: "#workplace"
    });

    $("#" + identifier).blur(function() {
        $("#" + identifier).css({
            outline: "",
            cursor: "auto"
        });
    });

}

function getRandomColorAndSize(element) {
    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);
    element.background = "rgb(" + r + ", " + g + ", " + b + ")";

    var widthheight = getRandomInt(70, 200);

    element.width = widthheight + "px";
    element.height = widthheight + "px";
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findElem(id) {
    for (var i = 0; i < generatedElements.length; ++i) {
        if (generatedElements[i].id == id && generatedElements[i].focused) {
            return generatedElements[i];
        }
    }
    return null;
}
