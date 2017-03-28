var generatedElements = new Array(0);
$(document).ready(function(){

    /*var e = {
        type: "div",
        position: "absolute",
        width: "100px",
        height: "100px",
        background: "yellow"
    }*/

    $("#red").treeview({
        animated: "normal",
        collapsed: true,
        control: "#treecontrol"
    });

    $('.inner_element').click(function () {
        var e = {
            id:"",
            type: this.id,
            parent: "#workplace",
            position: "relative",
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

    $('#left_bar').mouseenter(function () {
        $('#left_bar').animate({"opacity":"1"}, 500);
    });

    $('#left_bar').mouseleave(function () {
        $('#left_bar').animate({"opacity":"0.5"}, 500);
    });
});

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
        $("#" + identifier).css({outline:"dashed 2px #878787"});
        element.focused = true;
    });

    $("#" + identifier).blur(function() {
        $("#" + identifier).css({outline:"", cursor:"auto"});
        element.focused = false;
    });

    $(".work_elements").mousemove(function(event){
        var element = findElem(this.id);
        if(element != null) {
            var offset = $(this).offset(),
                x = event.pageX - offset.left,
                y = event.pageY - offset.top;
                h = $("#" + this.id).height();
                w = $("#" + this.id).width();
                checkPos(x, y, w, h, this.id);
        }
    });
}

function getRandomColorAndSize(element){
    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);
    element.background = "rgb(" + r + ", " + g + ", " + b + ")";

    var widthheight = getRandomInt(70, 200);

    element.width = widthheight + "px";
    element.height = widthheight + "px";
};

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findElem(id) {
    for(var i = 0; i < generatedElements.length; ++i) {
        if(generatedElements[i].id == id && generatedElements[i].focused) {
            return generatedElements[i];
        }
    }
    return null;
}

function checkPos(x, y, w, h, id) {
    if(((x >= 0 && x <= 8) && (y >= 0 && y <= 8)) || ((x >= w - 8 && x <= w) && (y >= h - 8 && y <= h))) {
        $("#"+id).css({cursor:"se-resize"});
        return;
    } else {
        if (((x >= 0 && x <= 8) && (y >= h - 8 && y <= h)) || ((x >= w - 8 && x <= w) && (y >= 0 && y <= 8))) {
            $("#" + id).css({cursor: "sw-resize"});
            return;
        } else {
            if ((x >= 0 && x <= 8)) {
                $("#" + id).css({cursor: "w-resize"});
                return;
            } else {
                if ((x >= w - 8 && x <= w)) {
                    $("#" + id).css({cursor: "e-resize"});
                    return;
                } else {
                    if ((y >= 0 && y <= 8)) {
                        $("#" + id).css({cursor: "n-resize"});
                        return;
                    } else {
                        if ((y >= h - 8 && y <= h)) {
                            $("#" + id).css({cursor: "s-resize"});
                            return;
                        } else {
                            $("#" + id).css({cursor: "auto"});
                        }
                    }
                }
            }
        }
    }
}
