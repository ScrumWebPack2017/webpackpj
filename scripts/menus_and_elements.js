var active_id = null;

function createNewStatus(mesg, pos, array) {
    var date = new Date();
    var time = date.getHours() + ":" + date.getMinutes();

    var d = $("#menu_tools").clone();

    var innerHTML = $('#workplace').clone().attr('id', 'wk');

    $("body").append(innerHTML);
    $("#wk div[class^='ui']").remove();
    var elems_el = new Array(0);
    var elems = $("#wk .work_elements").each(function() {
        elems_el.push({
            elem: $(this).attr('id'),
            css: $(this).attr('style')
        });
    });

    $("#wk").remove();

    array.push({
        html: elems_el,
        time: time,
        msg: mesg
    });

    var input = document.createElement("input");
    input.setAttribute('class', '.status_radio');
    input.setAttribute('type', 'radio');
    input.setAttribute('id', 'radio_' + pos);
    input.setAttribute('name', 'radio_s');
    var label = document.createElement("label");
    label.setAttribute('for', 'radio_' + pos);
    label.innerHTML = array[pos].msg + "   " + time;
    $("#changes_menu").append(label);
    $("#changes_menu").append(input);
    active_id = "#" + 'radio_' + pos;
    

    $("#" + 'radio_' + pos).checkboxradio({
        icon: false
    }).trigger("click");

    $("#" + 'radio_' + pos).on("click", function() {
        if(active_id == "#" + 'radio_' + pos) return;
        active_id = "#" + 'radio_' + pos;
        readChanges(this, array);
    });


    $("#workplace").append(d);
}

function readChanges(thise, elems) {
    $('#workplace').html("");
    var idx = $(thise).index();
    var text = $("#changes_menu").children().eq(idx - 1).html();
    var element = null;
    for (var i = 0; i < elems.length; ++i) {
        if ((elems[i].msg + "   " + elems[i].time) == text) {
            element = elems[i];
            break;
        }
    }

    if (element == null) return;

    var allEl = element.html;

    for (var i = 0; i < allEl.length; ++i) {
        var temp = findElem(allEl[i].elem);
        generateAgain(temp, allEl[i].css);
    }

}

function generateAgain(element, css) {
    el = document.createElement(element.type);
    el.setAttribute('id', element.id);
    el.setAttribute('class', 'work_elements');
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
                elem = findElemPos(focusedId);
                if (elem != -1) {
                    generatedElements[elem].width = $("#" + element.id).width();
                    generatedElements[elem].height = $("#" + element.id).height();
                }
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
                findElemPos(ui.draggable.prop('id')).parent = "#" + this.id;
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
        }
    });


    if (element.type == "input") {
        $("#" + element.id + " input").css({
            border: 'black 1px solid'
        });
        $("#" + element.id).resizable({
            alsoResize: $("#" + element.id + " input"),
            minWidth: '50',
            minHeight: '20'
        });
        $("#" + element.id).dblclick(function() {
            $("#" + element.id + " input").trigger('focus');
        });
    } else {
        if (element.type == "textarea") {
            $("#" + element.id + " textarea").css({
                border: 'black 1px solid',
                resize: 'none'
            });
            $("#" + element.id).resizable({
                alsoResize: $("#" + element.id + " textarea"),
                minWidth: '50',
                minHeight: '50'
            });
            $("#" + element.id).dblclick(function() {
                $("#" + element.id + " textarea").trigger('focus');
            });
        } else {
            if (element.type == "select") {
                $("#" + element.id + " select").css({
                    border: 'black 1px solid'
                });
                $("#" + element.id).resizable({
                    alsoResize: $("#" + element.id + " select"),
                    minWidth: '50',
                    minHeight: '20'
                });
                $("#" + element.id).dblclick(function() {
                    $("#" + element.id + " select").trigger('focus');
                });
            }
        }
    }

    if(element.parent != "#workplace") {
        $(element.parent).trigger('drop', $("#" + element.id));
    }
}

function showChangesWindow() {
    if($("#changes_menu").parent().position().top == 0) {
        $("#changes_menu").parent().css({top:'200px'});
    }
    if($("#changes_menu").parent().css('opacity') == 0 ) {
        $("#changes_menu").parent().animate({'opacity':'1'}, 400);
    } else {
        $("#changes_menu").parent().animate({'opacity':'0'}, 400);
    }
}
