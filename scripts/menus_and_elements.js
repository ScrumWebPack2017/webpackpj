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
        console.log($(this).attr('id'));
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
        if($('#menu_tools').length) { return; }
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

    if($('#menu_tools').length) { return; }
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
        }).resizable({
            // be careful!
            containment: element.parent,
            // !!!
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
                    elem = findElemPos(focusedId, super_array_elems);
                    if (elem != -1) {
                        generatedElements[elem].width = $("#" + element.id).width();
                        generatedElements[elem].height = $("#" + element.id).height();
                    }
                }
            },
            stop: function(event, ui) {
                createNewStatus(this.id + " was resized to W:" + $(this).width() + " H:" + $(this).height(), showCursor(), showChanges(), showGE());
                setCur(1);
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
                    $("#" + this.id).resizable("option", "minHeight", ($("#" + ui.draggable.prop('id')).height() + 1));
                    $("#" + this.id).resizable("option", "minWidth", ($("#" + ui.draggable.prop('id')).width() + 1));
                    findElemPos(ui.draggable.prop('id'), super_array_elems).parent = "#" + this.id;
                    createNewStatus(ui.draggable.prop('id') + " was dropped into " + this.id, showCursor(), showChanges(), showGE());
                    setCur(1);
                } else {

                }
                clearOutlines(this);
            }
        }).draggable({
            cancel: null,
            containment: element.parent,
            scroll: true,
            drag: function(event, ui) {
                $("#" + this.id).trigger("click");
                var parent_id = $("#" + this.id).parent().attr("id");
                if (parent_id != "workplace") {
                    //ole.log($("#" + this.id).position().top + ":" + $("#" + this.id).position().left);
                    $("#" + parent_id).resizable("option", "minHeight", ($("#" + this.id).height() + 1 + $("#" + this.id).position().top));
                    $("#" + parent_id).resizable("option", "minWidth", ($("#" + this.id).width() + 1 + $("#" + this.id).position().left));
                }
            },
            stop: function(event, ui) {
                createNewStatus("Block " + this.id + " was moved to (" + $(this).position().left + ", " + $(this).position().top + ")", showCursor(), showChanges(), showGE());
                setCur(1);
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