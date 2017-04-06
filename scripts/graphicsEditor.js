var generatedElements = new Array(0);
var focusedElement = null;
var focusedId;
var focusTimer;
var buffer = null;
var zindex = 1;
var clicks = {
    work: false,
    element: false,
    menu: false
};
var allowkeys = true;
var upperID = null;

var keys = {
    right: false,
    left: false
};

$(document).ready(function() {
    $(document).tooltip();

    $('#elements_search').on('#elements_search keyup', function(e) {
        var val = $('#elements_search').val().toLowerCase();
        if (val != '') {
            $('#search_result').css('visibility', 'visible').html('<span class="outer_element" id="shit"> Result </span>');
            $('#red').css('visibility', 'hidden');
            $("#red ul li  span[id^=" +val+ "]").each(function (i, el) {
                $('#search_result').append($(el).parent().clone());
            });
        } else {
            $('#search_result').css('visibility', 'hidden');
            $('#red').css('visibility', 'visible');
        }
    });
    $('#left_bar').on("click", '.inner_element', function() {
        shiftLeftBar();
        var e = {
            id: "",
            type: this.id,
            parent: "#workplace",
            position: "absolute",
            float: 'right',
            margin: '',
            width: "200px",
            height: "200px",
            background: "lawngreen",
            zIndex_: zindex,
            focused: false,
            locked: false
        };

        ++zindex;

        generatedElements.push(e);
        generateElement(e, true);
    });

    $('.property_input').focus(function () {
        allowkeys = false;
        console.log(allowkeys);
    });

    createLeftMenu();
    normalizeWorkplace();

    $("#menu_tools").menu().position({
        collision: function() {
            console.log("vihodit");
        }
    });

    $("#menu_tools").click(function() {
        clicks.menu = true;
    });



    $("#workplace").on("contextmenu", function(e) {
        e.preventDefault();
        $('#menu_tools').css('visibility', 'visible');
        $("#menu_tools").css({
            left: e.pageX,
            top: e.pageY - 200
        });
        return false;
    });

    $('.property_input').blur(function() {
        if(focusedElement != null) {
            propertyValidation("string", $(this), focusedElement);
        }
        allowkeys = true;
        console.log(allowkeys);
    }).keydown(function(e) {
        if (e.which == 13) {
            if(focusedElement != null) {
                propertyValidation("string", $(this), focusedElement);
            }
        }
    });
/*
    $('.inner_element').click(function() {
        shiftLeftBar();
        var e = {
            id: "",
            type: this.id,
            parent: "#workplace",
            position: "absolute",
            float: 'right',
            margin: '',
            width: "200px",
            height: "200px",
            background: "lawngreen",
            zIndex_: zindex,
            focused: false,
            locked: false
        };

        ++zindex;

        generatedElements.push(e);
        generateElement(e, true);
    });
*/
    $("#camera_ico").click(function(event) {
        $("#camera_ico").effect("transfer", {
            to: "#workplace",
            className: "ui-effects-transfer"
        }, 700, function() {
            html2canvas($("#workplace"), {
                onrendered: function(canvas) {
                    theCanvas = canvas;


                    canvas.toBlob(function(blob) {
                        saveAs(blob, "MySite.png");
                    });
                }
            });
        });
    });

    $("#locker_ico").click(function() {
        if (focusedElement == null) {
            $("#locker_ico").effect('shake', {
                distance: 5,
                times: 2
            }, 500, function() {});
            return;
        }
        for (var i = 0; i < generatedElements.length; ++i) {
            if (generatedElements[i].id == focusedId) {
                if (generatedElements[i].locked == true) {
                    $("#locker_ico").css({
                        background: 'url("../images/unlock-png-image-38843.png") no-repeat',
                        backgroundSize: "100% 100%"
                    });
                    generatedElements[i].locked = false;
                    return;
                } else {
                    $("#locker_ico").css({
                        background: 'url("../images/lock-icon-17.png") no-repeat',
                        backgroundSize: "100% 100%"
                    });
                    generatedElements[i].locked = true;
                    return;
                }
            }
        }
    });

    $(document).keydown(function(event) {
        if(allowkeys != false) {
            if (event.which == 68) {
                event.preventDefault();
            }
            manipulate(event);
        }
    });

    $(document).on("click", "#workplace", function(event) {
        $('#menu_tools').css('visibility', 'hidden');
        clicks.work = true;
        if (clicks.work && !clicks.element && !clicks.menu && focusedElement != null) {
            $("#" + focusedId).css({
                outline: "",
                cursor: "auto"
            });
            focusedElement = null;
            focusedId = null;
            clearStatus();
            clearproperty();
            $("#delete_list").parent().addClass('ui-state-disabled');
            $("#copy_list").parent().addClass('ui-state-disabled');
            $("#cut_list").parent().addClass('ui-state-disabled');
            $("#detach_list").parent().addClass('ui-state-disabled');
            $("#parentFoc_list").parent().addClass('ui-state-disabled');
        }
        clicks.work = false;
        clicks.element = false;
        clicks.menu = false;
        upperID = null;
    });

});


function normalizeWorkplace() {
    var w = document.body.scrollWidth;
    $('#workplace').css('width', w - 20);
    $("#res_pass").css({
        marginTop: "19px"
    });

}

function deleteFocused() {
    if (focusedElement != null) {
        if($("#" + focusedId).parent().attr('id') != "workplace") {
            $("#" + $("#" + focusedId).parent().attr('id')).resizable("option", "minWidth", '');
            $("#" + $("#" + focusedId).parent().attr('id')).resizable("option", "minHeight", '');
        }
        focusedElement.remove();
        clearStatus();
        clearproperty();
        $("#delete_list").parent().addClass('ui-state-disabled');
        $("#copy_list").parent().addClass('ui-state-disabled');
        $("#cut_list").parent().addClass('ui-state-disabled');
        $("#detach_list").parent().addClass('ui-state-disabled');
        $("#parentFoc_list").parent().addClass('ui-state-disabled');
    }
}

function parentFocus() {
    if (focusedElement != null) {
        $("#" + $("#" + focusedId).parent().attr('id')).trigger('click');
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

    $(element.parent).append(el);

    if (point)
        getRandomColorAndSize(element);

    $("#" + identifier).css({
        position: element.position,
        float: element.float,
        margin: element.margin,
        width: element.width,
        height: element.height,
        background: element.background,
        zIndex: element.zIndex_
    });

    //printStatus(identifier);

    $("#" + identifier).on("click", function(e) {
        if (upperID == null) {
            upperID = this.id;
        } else {
            if (checkChildren(this.id, upperID)) {
                upperID = this.id;
                return;
            }
        }
        lock(this.id);
        clicks.element = true;
        if (focusedElement != null && focusedId != null && identifier != focusedId) {
            $("#" + focusedId).css({
                outline: "",
                cursor: "auto"
            });
        }
        //alert(checkChildren(identifier, "div_1"));
        $("#" + identifier).css({
            outline: "dashed 2px #878787"
        });

        $("#delete_list").parent().removeClass('ui-state-disabled');
        $("#copy_list").parent().removeClass('ui-state-disabled');
        $("#cut_list").parent().removeClass('ui-state-disabled');
        $("#detach_list").parent().removeClass('ui-state-disabled');
        $("#parentFoc_list").parent().removeClass('ui-state-disabled');
        focusedElement = $(this);
        focusedId = identifier;
        fillPropertiesTable(focusedElement);
        printStatus(identifier);
    }).resizable({
        handles: 'all',
        resize: function(event, ui) {
            $("#" + this.id).trigger("click");
            var parent_id = $("#" + this.id).parent().attr("id");
            if (parent_id != "workplace") {
                //console.log($("#" + this.id).position().top + ":" + $("#" + this.id).position().left);
                $("#" + parent_id).resizable("option", "minHeight", ($("#" + this.id).height() - 1 + $("#" + this.id).position().top));
                $("#" + parent_id).resizable("option", "minWidth", ($("#" + this.id).width() - 1 + $("#" + this.id).position().left));
            }
            keys.left = false;
            keys.right = false;
            if (focusedId != null) {
                printStatus(focusedId);
                elem = findElemPos(focusedId);
                if (elem != -1) {
                    generatedElements[elem].width = $("#" + identifier).width();
                    generatedElements[elem].height = $("#" + identifier).height();
                }
            }
        }
    }).draggable({
        containment: "#workplace",
        scroll: true,
        drag: function(event, ui) {
            $("#" + this.id).trigger("click");
            var parent_id = $("#" + this.id).parent().attr("id");
            if (parent_id != "workplace") {
                //ole.log($("#" + this.id).position().top + ":" + $("#" + this.id).position().left);
                $("#" + parent_id).resizable("option", "minHeight", ($("#" + this.id).height() + 1 + $("#" + this.id).position().top));
                $("#" + parent_id).resizable("option", "minWidth", ($("#" + this.id).width() + 1 + $("#" + this.id).position().left));
            }
        }
    }).droppable({
        over: function(event, ui) {
            var pps = findElemPos(this.id);
            if (generatedElements[pps].locked == true) return;
            if ($("#" + ui.draggable.prop('id')).parent().attr("id") == this.id || checkChildren(this.id, ui.draggable.prop('id'))) return;
            swapIndexes(event, ui, this);
            checkSizes(event, ui, this);
        },
        out: function(event, ui) {
            clearOutlines(this);
        },
        drop: function(event, ui) {
            var pps = findElemPos(this.id);
            if (generatedElements[pps].locked == true) return;
            if ($("#" + ui.draggable.prop('id')).parent().attr("id") == this.id || checkChildren(this.id, ui.draggable.prop('id'))) return;
            if (checkSizes(event, ui, this)) {
                var div = $("#" + ui.draggable.prop('id')).detach();
                $(this).append(div);
                $("#" + ui.draggable.prop('id')).css({
                    top: 0,
                    left: 0
                });
                $("#" + ui.draggable.prop('id')).draggable("option", "containment", $("#" + this.id));
                $("#" + ui.draggable.prop('id')).resizable("option", "containment", $("#" + this.id));
                $("#" + this.id).resizable("option", "minHeight", ($("#" + ui.draggable.prop('id')).height() + 1));
                $("#" + this.id).resizable("option", "minWidth", ($("#" + ui.draggable.prop('id')).width() + 1));
            } else {

            }
            clearOutlines(this);
        }
    });

    $("#" + identifier).children().eq(4).removeClass("ui-icon-gripsmall-diagonal-se");
    $("#" + identifier).children().eq(4).removeClass("ui-icon");
}

function lock(ider) {
    for (var i = 0; i < generatedElements.length; ++i) {
        if (generatedElements[i].id == ider) {
            if (generatedElements[i].locked == true) {
                $("#locker_ico").css({
                    background: 'url("../images/lock-icon-17.png") no-repeat',
                    backgroundSize: "100% 100%"
                });
                return;
            } else {
                $("#locker_ico").css({
                    background: 'url("../images/unlock-png-image-38843.png") no-repeat',
                    backgroundSize: "100% 100%"
                });
                return;
            }
        }
    }
}

function clearOutlines(thisel) {
    $("#" + thisel.id).css({
        "outline": ""
    });
}

function checkSizes(event, ui, thisel) {
    var parent_width = $("#" + thisel.id).width();
    var parent_height = $("#" + thisel.id).height();
    var child_width = $("#" + ui.draggable.prop('id')).width();
    var child_height = $("#" + ui.draggable.prop('id')).height();
    if (parent_width <= child_width || parent_height <= child_height) {
        $("#" + thisel.id).css({
            "outline": "solid 3px #FF5F5F"
        });
        return false;
    }
    $("#" + thisel.id).css({
        "outline": "solid 3px #6CFF69"
    });
    return true;
}

function swapIndexes(event, ui, thisel) {
    var index1 = $(thisel).css("z-index");
    var index2 = $("#" + ui.draggable.prop('id')).css("z-index");
    //console.log(index1 + ":" + index2);
    var maxi = index1 < index2 ? index2 : index1;
    var mini = index1 < index2 ? index1 : index2;
    $(thisel).css({
        zIndex: mini
    });
    $("#" + ui.draggable.prop('id')).css({
        zIndex: maxi
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

function countType(type) {
    var count = 0;
    for (var i = 0; i < generatedElements.length; ++i) {
        if (generatedElements[i].type == type) {
            ++count;
        }
    }
    return count;
}

function manipulate(eve) {
    if (eve.which == 46) {
        deleteFocused();
    } else {
        if (eve.which == 67 && eve.ctrlKey) {
            copy();
        } else {
            if (eve.which == 86 && eve.ctrlKey) {
                paste();
            } else {
                if (eve.which == 88 && eve.ctrlKey) {
                    cut();
                } else {
                    if (eve.which == 68 && eve.ctrlKey) {
                        detach_child();
                    }
                }
            }
        }
    }
}

function detach_child() {
    if (focusedElement != null) {
        if ($("#" + focusedId).parent().attr('id') != "workplace") {
            $("#" + $("#" + focusedId).parent().attr('id')).resizable("option", "minWidth", '');
            $("#" + $("#" + focusedId).parent().attr('id')).resizable("option", "minHeight", '');
            var pos = $("#" + focusedId).offset();
            var elem = $("#" + focusedId).detach();
            $("#workplace").append(elem);

            $("#" + focusedId).resizable("option", "minHeight", '');
            $("#" + focusedId).resizable("option", "minWidth", '');
            $("#" + focusedId).draggable("option", "containment", $("#workplace"));
            $("#" + focusedId).resizable("option", "containment", '');
            $("#" + focusedId).css({
                left: pos.left,
                top: (pos.top - 204)
            });
            $("#" + focusedId).effect('highlight', {}, 700, function() {});
        }
    }
}

function copy() {
    if (focusedId == null)
        return;
    var elem = findElem(focusedId);
    if (elem != null) {
        buffer = {
            element: elem,
            type: "copy"
        };
    }
    $("#paste_list").parent().removeClass('ui-state-disabled');
}

function paste() {
    if (buffer != null) {
        if (buffer.type == "cut") {
            buffer.element.draggable("option", "containment", $("#workplace"));
            buffer.element.resizable("option", "minWidth", '');
            buffer.element.resizable("option", "minHeight", '');
            buffer.element.css({
                left: 0,
                top: 0
            });
            $("#workplace").append(buffer.element);
            buffer = null;
            $("#paste_list").parent().addClass('ui-state-disabled');
        } else {
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
                focused: false,
                zIndex_: zindex,
                locked: false
            };
            ++zindex;
            generatedElements.push(e);
            generateElement(e, false);
        }
    }
}

function cut() {
    if (focusedId == null)
        return;
    var elem = findElemPos(focusedId);
    if (elem != -1) {
        clearStatus();
        clearproperty();
        if($("#" + focusedId).parent().attr('id') != "workplace") {
            $("#" + $("#" + focusedId).parent().attr('id')).resizable("option", "minWidth", '');
            $("#" + $("#" + focusedId).parent().attr('id')).resizable("option", "minHeight", '');
        }
        focusedElement = null;
        focusedId = null;
        $("#paste_list").parent().removeClass('ui-state-disabled');
        $("#delete_list").parent().addClass('ui-state-disabled');
        $("#copy_list").parent().addClass('ui-state-disabled');
        $("#cut_list").parent().addClass('ui-state-disabled');
        $("#detach_list").parent().addClass('ui-state-disabled');
        $("#parentFoc_list").parent().addClass('ui-state-disabled');

        var tmp = new Array(0);
        for (var i = generatedElements.length - 1; i >= 0; --i) {
            if (i == elem) {
                buffer = {
                    element: $("#" + generatedElements[i].id).detach(),
                    type: "cut"
                };
                break;
            }
        }
    }
}

function maxId(type) {
    if (generatedElements.length == 0) return 0;
    var maxid = -1;
    for (var i = 0; i < generatedElements.length; ++i) {
        if (+(generatedElements[i].id.split("_")[1]) > maxid && generatedElements[i].type == type) {
            maxid = +(generatedElements[i].id.split("_")[1]);
        }
    }
    if (maxid == -1) return 0;
    return maxid;
}

function checkChildren(parentId, childId) {
    return $('#' + parentId).html().indexOf(childId) != -1;
}