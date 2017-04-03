var generatedElements = new Array(0);
var focusedElement = null;
var focusedId;
var focusTimer;
var buffer = null;
var clicks = { work:false, element:false };

$(document).ready(function() {
    createLeftMenu();
    normalizeWorkplace();

    $('.property_input').blur(function() {
        propertyValidation("string", $(this), 100, focusedElement);
    });

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
        generateElement(e, true);
    });

    $(document).keydown(function(event) {
        manipulate(event);
    });

    $(document).on("click", "#workplace", function (event) {
        clicks.work = true;
        if(clicks.work && !clicks.element && focusedElement != null) {
            $("#" + focusedId).css({
                outline: "",
                cursor: "auto"
            });
            focusedElement = null;
            focusedId = null;
        }
        clicks.work = false;
        clicks.element = false;
    });

});


function normalizeWorkplace() {
    var w = document.body.scrollWidth;
    $('#workplace').css('width', w - 20);
    $("#res_pass").css({marginTop:"19px"});

}

function deleteFocused() {
    if (focusedElement != null) {
        focusedElement.remove();
        clearStatus();
    } else {
        alert("Element isn't selected!");
    }
}

function parentFocus() {
    if (focusedElement != null) {
        var event = new Event("click");
        $('#' + searchParent(focusedElement.attr('id'))).click();
    } else {
        alert("Element isn't selected!");
    }
}

function printStatus(id) {
    $('#current_id').val(id);
    $('#current_width').val(Math.floor($("#" + id).width()));
    $('#current_height').val(Math.floor($("#" + id).height()));
}
function clearStatus() {
    $('#current_id').val('');
    $('#current_width').val('');
    $('#current_height').val('');
};

function createLeftMenu() {
    $("#red").treeview({
        animated: "normal",
        collapsed: true,
        control: "#treecontrol"
    });

}


function generateElement(element, point) {
    var el = document.createElement(element.type);
    var identifier = element.type + '_' + (maxId(element.type) + 1);

    element.id = identifier;
    el.setAttribute('id', identifier);
    el.setAttribute('class', 'work_elements');

    el.innerHTML = "Hi, i`m " + element.type;

    $(element.parent).append(el);

    if(point)
        getRandomColorAndSize(element);

    $("#" + identifier).css({
        position: element.position,
        float: element.float,
        margin: element.margin,
        width: element.width,
        height: element.height,
        background: element.background
    });

    //printStatus(identifier);

    $("#" + identifier).click(function() {
        clicks.element = true;
        if(focusedElement != null && focusedId != null && identifier != focusedId) {
            $("#" + focusedId).css({
                outline: "",
                cursor: "auto"
            });
        }
            $("#" + identifier).css({
                outline: "dashed 2px #878787"
            });
        focusedElement = $(this);
        focusedId = identifier;
        fillPropertiesTable(focusedElement);
        printStatus(identifier);
    }).resizable({resize:function () {
        if(focusedId != null) {
            printStatus(focusedId);
            elem = findElemPos(focusedId);
            if(elem != -1) {
                generatedElements[elem].width = $("#" + identifier).width();
                generatedElements[elem].height = $("#" + identifier).height();
            }
        }
    }}).draggable({
        containment: "#workplace",
        scroll: true
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

function searchParent(id) {
    for (var i = 0; i < generatedElements.length; ++i) {
        if (generatedElements[i].id == id) {
            return generatedElements[i].parent;
        }
    }
}

function findElem(id) {
    for (var i = 0; i < generatedElements.length; ++i) {
        if (generatedElements[i].id == id) {
            return generatedElements[i];
        }
    }
    return null;
}

function findElemPos(id) {
    for (var i = 0; i < generatedElements.length; ++i) {
        if (generatedElements[i].id == id) {
            return i;
        }
    }
    return -1;
}

function countType(type){
    var count = 0;
    for (var i = 0; i < generatedElements.length; ++i) {
        if (generatedElements[i].type == type) {
            ++count;
        }
    }
    return count;
}

function manipulate(eve){
    if(eve.which == 46){
        deleteFocused();
    } else {
        if(eve.which == 67 && eve.ctrlKey) {
            copy();
        } else {
            if(eve.which == 86 && eve.ctrlKey) {
                paste();
            } else {
                if(eve.which == 88 && eve.ctrlKey) {
                    cut();
                }
            }
        }
    }
}

function copy() {
    if(focusedId == null)
        return;
    var elem = findElem(focusedId);
    if(elem != null) {
        buffer = { element:elem, type:"copy" };
    }
}

function paste() {
    if(buffer != null) {
        var e = {
            id: "",
            type: buffer.element.type,
            parent: buffer.element.parent,
            position: buffer.element.position,
            float: buffer.element.float,
            margin: buffer.element.margin,
            width: buffer.element.width,
            height: buffer.element.height,
            background: buffer.element.background,
            focused: false
        };
        generatedElements.push(e);
        generateElement(e, false);
        if(buffer.type == "cut")
            buffer = null;
    }
}

function cut() {
    if(focusedId == null)
        return;
    var elem = findElemPos(focusedId);
    if(elem != -1) {
        focusedElement.remove();
        clearStatus();

        var tmp = new Array(0);
        for (var i = generatedElements.length - 1; i >= 0; --i) {
            if (i == elem) {
                buffer = { element:generatedElements.pop(), type:"cut" };
                continue;
            }
            tmp.push(generatedElements.pop());
        }

        generatedElements = tmp;
    }
}

function maxId(type) {
    if(generatedElements.length == 0) return 0;
    var maxid = -1;
    for (var i = 0; i < generatedElements.length; ++i) {
        if (+(generatedElements[i].id.split("_")[1]) > maxid && generatedElements[i].type == type) {
            maxid = +(generatedElements[i].id.split("_")[1]);
        }
    }
    if(maxid == -1) return 0;
    return maxid;
}
