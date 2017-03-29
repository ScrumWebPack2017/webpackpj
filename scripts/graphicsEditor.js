var generatedElements = new Array(0);

$(document).ready(function(){
    createLeftMenu();

    $('.inner_element').click(function () {
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

    $('#left_bar').mouseenter(function () {
        $('#left_bar').animate({"opacity":"1"}, 500);
    });

    $('#left_bar').mouseleave(function () {
        $('#left_bar').animate({"opacity":"0.5"}, 500);
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
        $("#" + identifier).css({outline:"dashed 2px #878787"});
        element.focused = true;
    });

    $("#" + identifier).blur(function() {
        $("#" + identifier).css({outline:"", cursor:"auto"});
        element.focused = false;
    });

    $(".work_elements").mousedown(function () {
        $("#" + identifier).css({outline:"dashed 2px #878787"});
    }).resizable().draggable({ containment: "#workplace" });

    /* $(".work_elements").mousemove(function(event){
        var element = findElem(this.id);

        if(element != null) {
            var offset = $(this).offset(),
                x = event.pageX - offset.left,
                y = event.pageY - offset.top;
                h = $("#" + this.id).height();
                w = $("#" + this.id).width();

                checkPos(x, y, w, h, this.id);
        }

    }).resizable().draggable(); */
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

function getRandomInt(min, max) {
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

function cursorType(element, event) {
    var x = event.pageX - element.offset().left;
    var y = event.pageY - element.offset().top;
    var h = element.height();
    var w = element.width();
    if (x >= 0 && x <= 8) {
        if (y >= -4 && y <= 8 + 4) {
            element.css('cursor', 'nw-resize');
        } else if (y >= h - 8 && y <= h + 4) {
            element.css('cursor', 'sw-resize');
        } else {
            element.css('cursor', 'w-resize');
        }
    } else if (x >= w - 8 && x <= w + 4) {
        if (y >= -4 && y <= 8) {
            element.css('cursor', 'ne-resize');
        } else if (y >= h - 8 && y <= h + 4) {
            element.css('cursor', 'se-resize');
        } else {
            element.css('cursor', 'e-resize');
        }
    } else {
        if (y >= -4 && y <= 8) {
            element.css('cursor', 'n-resize');
        } else if (y >= h - 8 && y <= h + 4) {
            element.css('cursor', 's-resize');
        } else {
            element.css('cursor', 'auto');
            resizeFlag = false;
            return false;
        }
    }
    resizeFlag = true;
    return true;
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
