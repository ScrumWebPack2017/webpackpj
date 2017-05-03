var active_id = null;
var super_array_elems = null;
var cur_pos = -1;

function createNewStatus(mesg, pos, array, super_array) {
    if (cur_pos + 1 < pos && cur_pos != -1) {
        while (showCursor() > cur_pos + 1) {
            $("#radio_" + (showCursor() - 1)).remove();
            $('#changes_menu label[for="radio_' + (showCursor() - 1) + '"]').remove();
            cursorMinus();
            array.pop();
        }
        console.log(showCursor());
    }
    pos = showCursor();
    var date = new Date();
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    var d = $("#menu_tools").clone();

    var innerHTML = $('#workplace').clone().attr('id', 'wk');

    $("body").append(innerHTML);
    $("#wk div[class^='ui']").remove();
    $("#wk ul[id='menu_tools']").remove();
    var elems_el = new Array(0);
    var elems = $("#wk .work_elements").each(function() {
        elems_el.push({
            elem: $(this).attr('id'),
            css: $(this).attr('style')
        });
    });

    $("#wk").remove();
    var allofElements = jQuery.extend(true, [], super_array);
    array.push({
        html: elems_el,
        time: time,
        msg: mesg,
        elementors: allofElements
    });

    super_array_elems = allofElements;

    var input = document.createElement("input");
    input.setAttribute('class', '.status_radio');
    input.setAttribute('type', 'radio');
    input.setAttribute('id', 'radio_' + pos);
    input.setAttribute('name', 'radio_s');
    var label = document.createElement("label");
    label.setAttribute('for', 'radio_' + pos);
    label.innerHTML = mesg + "   " + time;
    $("#changes_menu").append(label);
    $("#changes_menu").append(input);
    active_id = "#" + 'radio_' + pos;
    cur_pos = pos;


    $("#" + 'radio_' + pos).checkboxradio({
        icon: false
    }).trigger("click");

    $("#" + 'radio_' + pos).on("click", function() {
        if (active_id == "#" + 'radio_' + pos) return;
        active_id = "#" + 'radio_' + pos;
        cur_pos = pos;
        readChanges(this, array);
        if ($('#menu_tools').length) {
            return;
        }
        $(d).menu().position({
            collision: function() {
                console.log("vihodit");
            }
        });

        $(d).click(function() {
            clicks.menu = true;
        });

        $("#workplace").append(d);
    });

    if ($('#menu_tools').length) {
        return;
    }
    $("#workplace").append(d);
}

function readChanges(thise, elems) {
    $('#workplace').html("");
    var idx = $(thise).index();
    var text = $("#changes_menu").children().eq(idx - 1).html();
    var e = null;
    for (var i = 0; i < elems.length; ++i) {
        if ((elems[i].msg + "   " + elems[i].time) == text) {
            e = elems[i];
            break;
        }
    }

    if (e == null) return;

    var allEl = e.html;

    for (var i = 0; i < allEl.length; ++i) {
        var temp = findElem(allEl[i].elem, e.elementors);
        generateAgain(temp, allEl[i].css);
        var elems = $("#workplace .work_elements").each(function(event) {
            $(this).children().removeClass('ui-icon');
        });
    }

    $("#workplace").trigger('click');

    if (allEl.length == 0) {
        $("#vertical_context_menu").css({
            visibility: 'hidden'
        });
        $(".near_block").css({
            visibility: 'hidden'
        });
    }

}

function generateAgain(element, css) {
    el = document.createElement(element.type);
    el.setAttribute('id', element.id);
    if (element.type != "textarea" && element.type != "input" && element.type != "select") {
        el.setAttribute('class', 'work_elements');
    }
    $(element.parent).append(el);

    /*if(element.type == "input") {
     var el1 = document.createElement('input');
     $("#" + element.id).append(el1);
     } else {
     if(element.type == "textarea") {
     var el1 = document.createElement('textarea');
     $("#" + element.id).append(el1);
     } else {
     if(element.type == "select") {
     var el1 = document.createElement('select');
     $("#" + element.id).append(el1);
     $("#" + element.id + " select").css({width: '100px', height: '25px'});
     }
     }
     }*/
    /*$("#" + identifier).css({
     position: element.position,
     float: element.float,
     margin: element.margin,
     width: element.width,
     height: element.height,
     background: element.background,
     zIndex: element.zIndex_
     });*/
    /* if(element.type == "input" || element.type == "textarea" || element.type == "select") {
     $("#" + identifier).css({
     background:"rgba(0,0,0,0)",
     width: '',
     height: ''
     });
     }*/


    //printStatus(identifier)

    $("#" + element.id).attr('style', css);
    $("#" + element.id).css({
        outline: ''
    });


    if (element.type != "textarea" && element.type != "input" && element.type != "select") {
        $("#" + element.id).on("click", function(e) {
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
            if (focusedElement != null && focusedId != null && element.id != focusedId) {
                $("#" + focusedId).css({
                    outline: "",
                    cursor: "auto"
                });
            }
            //alert(checkChildren(identifier, "div_1"));
            $("#" + element.id).css({
                outline: "dashed 2px #878787"
            });

            $("#delete_list").parent().removeClass('ui-state-disabled');
            $("#copy_list").parent().removeClass('ui-state-disabled');
            $("#cut_list").parent().removeClass('ui-state-disabled');
            $("#detach_list").parent().removeClass('ui-state-disabled');
            $("#parentFoc_list").parent().removeClass('ui-state-disabled');
            focusedElement = $(this);
            focusedId = element.id;
            fillPropertiesTable(focusedElement);
            printStatus(element.id);
            $("#vertical_context_menu").position({
                my: 'left+5 top',
                at: 'right top',
                of: "#" + element.id,
                collision: 'flip flip'
            });

            $("#vertical_context_menu").css({
                zIndex: $("#" + element.id).css('z-index')
            });

            $(".near_block").position({
                my: 'left+49 top',
                at: 'right top',
                of: "#" + element.id,
                collision: 'flip flip'
            });

            $(".near_block").css({
                zIndex: $("#" + element.id).css('z-index')
            });

            if (!busy) {
                $("#vertical_context_menu").css({
                    visibility: 'visible'
                });
            }
        }).resizable({
            // be careful!
            containment: element.parent,
            minWidth: 25,
            minHeight: 25,
            handles: 'all',
            resize: function(event, ui) {
                busy = true;
                $("#vertical_context_menu").css({
                    visibility: 'hidden'
                });
                $(".near_block").css({
                    visibility: 'hidden'
                });
                $("#" + this.id).trigger("click");
                var ch = preventAxis(event, ui, this);
                if (ch) {
                    $(this).resizable('option', 'minWidth', $(this).width());
                    $(this).resizable('option', 'minHeight', $(this).height());
                } else {
                    $(this).resizable('option', 'minWidth', 25);
                    $(this).resizable('option', 'minHeight', 25);
                    var parent_id = $("#" + this.id).parent().attr("id");
                    if (parent_id != "workplace") {
                        //console.log($("#" + this.id).position().top + ":" + $("#" + this.id).position().left);
                        //$("#" + parent_id).resizable("option", "minHeight", ($("#" + this.id).height() - 1 + $("#" + this.id).position().top));
                        //$("#" + parent_id).resizable("option", "minWidth", ($("#" + this.id).width() - 1 + $("#" + this.id).position().left));
                    }
                    keys.left = false;
                    keys.right = false;
                    if (focusedId != null) {
                        printStatus(focusedId);
                        elem = findElemPos(focusedId, generatedElements);
                        if (elem != -1) {
                            generatedElements[elem].width = $("#" + element.id).width();
                            generatedElements[elem].height = $("#" + element.id).height();
                        }
                    }
                }
            },
            stop: function(event, ui) {
                busy = false;
                createNewStatus(this.id + " was resized to W:" + $(this).width() + " H:" + $(this).height(), showCursor(), showChanges(), showGE());
                setCur(1);
                $("#vertical_context_menu").css({
                    visibility: 'visible'
                });
            }
        }).droppable({
            over: function(event, ui) {
                var pps = findElemPos(this.id, super_array_elems);
                if (generatedElements[pps].locked == true) return;
                if ($("#" + ui.draggable.prop('id')).parent().attr("id") == this.id || checkChildren(this.id, ui.draggable.prop('id'))) return;
                swapIndexes(event, ui, this);
                checkSizes(event, ui, this);
            },
            out: function(event, ui) {
                clearOutlines(this);
            },
            drop: function(event, ui) {
                var pps = findElemPos(this.id, super_array_elems);
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
                    //$("#" + this.id).resizable("option", "minHeight", ($("#" + ui.draggable.prop('id')).height() + 1));
                    //$("#" + this.id).resizable("option", "minWidth", ($("#" + ui.draggable.prop('id')).width() + 1));
                    findElemPos(ui.draggable.prop('id'), super_array_elems).parent = "#" + this.id;
                    createNewStatus(ui.draggable.prop('id') + " was dropped into " + this.id, showCursor(), showChanges(), showGE());
                    setCur(1);
                } else {

                }
                clearOutlines(this);
                $(ui.draggable).trigger('click');
            }
        }).draggable({
            cancel: null,
            containment: element.parent,
            scroll: true,
            drag: function(event, ui) {
                busy = true;
                $("#" + this.id).trigger("click");
                $("#vertical_context_menu").css({
                    visibility: 'hidden'
                });
                $(".near_block").css({
                    visibility: 'hidden'
                });
                var parent_id = $("#" + this.id).parent().attr("id");
                if (parent_id != "workplace") {
                    //ole.log($("#" + this.id).position().top + ":" + $("#" + this.id).position().left);
                    //$("#" + parent_id).resizable("option", "minHeight", ($("#" + this.id).height() + 1 + $("#" + this.id).position().top));
                    //$("#" + parent_id).resizable("option", "minWidth", ($("#" + this.id).width() + 1 + $("#" + this.id).position().left));
                }
            },
            stop: function(event, ui) {
                busy = false;
                createNewStatus("Block " + this.id + " was moved to (" + $(this).position().left + ", " + $(this).position().top + ")", showCursor(), showChanges(), showGE());
                setCur(1);
                $("#vertical_context_menu").css({
                    visibility: 'visible'
                });
            }
        });
    }


    if (element.type == "input") {
        $("#" + element.id).css({
            border: 'black 1px solid'
        });
        $(element.parent).resizable({
            alsoResize: $("#" + element.id),
            minWidth: '100',
            minHeight: '35'
        });
        $(element.parent).dblclick(function() {
            $("#" + element.id).trigger('focus');
        });
    } else {
        if (element.type == "textarea") {
            $("#" + element.id).css({
                border: 'black 1px solid',
                resize: 'none'
            });
            $(element.parent).resizable({
                alsoResize: $("#" + element.id),
                minWidth: '100',
                minHeight: '35'
            });
            $(element.parent).dblclick(function() {
                $("#" + element.id).trigger('focus');
            });
        } else {
            if (element.type == "select") {
                $("#" + element.id).css({
                    border: 'black 1px solid'
                });
                $(element.parent).resizable({
                    alsoResize: $("#" + element.id),
                    minWidth: '100',
                    minHeight: '35'
                });
                $(element.parent).dblclick(function() {
                    $("#" + element.id).trigger('focus');
                });
            }
        }
    }

    //$("#" + element.id).trigger("resize");

    if (element.parent != "#workplace") {
        var ee = $("#" + element.id).detach();
        $(element.parent).append(ee);
        $(element.parent).trigger('drop', $("#" + element.id));
    }

    $("#" + element.id).trigger('click');

}

function showChangesWindow() {
    if ($("#changes_menu").parent().position().top == 0) {
        $("#changes_menu").parent().css({
            top: '200px'
        });
    }
    if ($("#changes_menu").parent().css('opacity') == 0) {
        $("#changes_menu").parent().animate({
            'opacity': '1'
        }, 400);
    } else {
        $("#changes_menu").parent().animate({
            'opacity': '0'
        }, 400);
    }
}

function preventAxis(event, ui, temp) {
    var count2 = $(temp).children('.work_elements').length;
    if (count2 > 0) {
        var dir = $(ui.element).data('ui-resizable').axis;
        switch (dir) {
            case "w":
            case "s":
            case "n":
            case "e":
            case "ne":
            case "sw":
            case "se":
            case "nw":
                return checkResize(temp);
        }
    }
    return false;
}

function checkResize(temp) {
    var checker = false;
    var elems = $(temp).children('.work_elements').each(function() {
        var w = $(this).width();
        var h = $(this).height();
        var x = $(this).position().left;
        var y = $(this).position().top;
        if (checker == false) {
            checker = pos(temp, w, h, x, y);
        }
        if (checker) return false;
    });
    return checker;
}

function pos(temp, w, h, x, y) {
    var wW = $(temp).width();
    var wH = $(temp).height();
    var wX = $(temp).position().left;
    var wY = $(temp).position().top;
    var formulaeW = w + x;
    var formulaeH = h + y;
    if (formulaeH >= wH) {
        $(temp).height(formulaeH);
        return true;
    } else {
        if (formulaeW >= wW) {
            $(temp).width(formulaeW);
            return true;
        }
    }
    return false;
}

function showWin(id) {
    var vs = $("#" + id).css('visibility');
    $(".near_block").css({
        visibility: 'hidden'
    });
    $("#" + id).css({
        visibility: vs
    });
    if ($("#" + id).css("visibility") == "hidden") {
        $("#" + id).css({
            visibility: 'visible'
        });
    } else {
        $("#" + id).css({
            visibility: 'hidden'
        });
    }
}

jQuery.fn.appendAt = function(content, index) {
    this.each(function(i, item) {
        var $content = $(content).clone();
        if (index === 0) {
            $(item).prepend($content);
        } else {
            $content.insertAfter($(item).children().eq(index - 1));
        }
    });
    $(content).remove();
    return this;
};
