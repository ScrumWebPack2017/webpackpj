var dark = false;
var vSplit = true;
var shadow_col = '#000000';

function colorBgInput() {
    focusedElement.css('background', $('#color_changer').val());
    createNewStatus("Color was changed for " + focusedId, cursor, changes, generatedElements);
    ++cursor;
}

function colorTransparent() {
    focusedElement.css('background', 'transparent');
    createNewStatus(focusedId + " became transparent", cursor, changes, generatedElements);
    ++cursor;
}

function colorBorderInput() {
    focusedElement.css('borderColor', $('#border_color_changer').val());
    createNewStatus("Border color was changed for " + focusedId, cursor, changes, generatedElements);
    ++cursor;
}

function textAlignLeft() {
    focusedElement.css('textAlign', 'left');
    createNewStatus("Text will align to left for " + focusedId, cursor, changes, generatedElements);
    ++cursor;
}

function textAlignCenter() {
    focusedElement.css('textAlign', 'center');
    createNewStatus("Text will align to center for " + focusedId, cursor, changes, generatedElements);
    ++cursor;
}

function textAlignRight() {
    focusedElement.css('textAlign', 'right');
    createNewStatus("Text will align to right for " + focusedId, cursor, changes, generatedElements);
    ++cursor;
}

function fontItalic() {
    focusedElement.css('fontStyle', 'italic');
    createNewStatus("Font was changed to Italic for " + focusedId, cursor, changes, generatedElements);
    ++cursor;
}

function fontBold() {
    focusedElement.css('font-stretch', '800');
    createNewStatus("Font thickness was changed for " + focusedId, cursor, changes, generatedElements);
    ++cursor;
}

function fontSize() {
    focusedElement.css('fontSize', $('#font_size_changer').val() + 'px');
    createNewStatus("Font size was changed for " + focusedId, cursor, changes, generatedElements);
    ++cursor;
}

function colorFontInput() {
    focusedElement.css('color', $('#font_color_changer').val());
    createNewStatus("Font color was changed for " + focusedId, cursor, changes, generatedElements);
    ++cursor;
}

function fontFamilyChanger() {
    focusedElement.css('fontFamily', $('#font_family_changer').val());
    createNewStatus("Font family was changed for " + focusedId, cursor, changes, generatedElements);
    ++cursor;
}

function shadowColorInput() {
    shadow_col = $('#shadow_color_changer').val();
    setBoxShadow();
}

function setBoxShadow() {
    var str = $('#shadow_x').slider('option', 'value') + "px " + $('#shadow_y').slider('option', 'value') + "px " + $('#shadow_size').slider('option', 'value') + 'px ' + shadow_col;
    focusedElement.css('boxShadow', str);
    $('#slider_display').css({
        visibility: 'hidden'
    });
    createNewStatus("Shadow was changed with " + focusedId, cursor, changes, generatedElements);
    ++cursor;
}

function sliderDisplay(event, ui) {
    $('#slider_display').css({
        top: event.clientY - 15,
        left: event.clientX + 15,
        visibility: 'visible'
    }).html(ui.value);
}

function borderWidthSlider(event, ui) {
    if ($(ui.handle).parent().attr('id') == 'border_radius_input')
        focusedElement.css('borderRadius', ui.value);
    else if ($(ui.handle).parent().attr('id') == 'border_width') {
        focusedElement.css('borderWidth', ui.value);
    }
    $('#slider_display').css({
        visibility: 'hidden'
    });
    createNewStatus("Border was changed with " + focusedId, cursor, changes, generatedElements);
    ++cursor;
}

function source_switchTheme() {
    if (dark) {
        editorHTML.setTheme("ace/theme/chrome");
        editorCSS.setTheme("ace/theme/chrome");
        $('#source_code_panel').css({
            background: '#eaeef1'
        });
        $('.out_btn').css('color', 'black');
        $('#source_switch').css('backgroundImage', 'url("images/code_editor/switch_light.jpg")');
        $('#source_vsplit').css('backgroundImage', 'url("images/code_editor/vSplit_light.jpg")');
        $('#source_hsplit').css('backgroundImage', 'url("images/code_editor/hSplit_light.jpg")');
        $('#source_comment').css('backgroundImage', 'url("images/code_editor/comment_light.jpg")');
        $('#source_uncomment').css('backgroundImage', 'url("images/code_editor/uncomment_light.jpg")');
        $('#source_undo').css('backgroundImage', 'url("images/code_editor/undo_light.jpg")');
        $('#source_repeat').css('backgroundImage', 'url("images/code_editor/repeat_light.jpg")');
        dark = false;
    } else {
        editorHTML.setTheme("ace/theme/monokai");
        editorCSS.setTheme("ace/theme/monokai");
        $('#source_code_panel').css({
            background: '#1f272a'
        });
        $('.out_btn').css('color', 'white');
        $('#source_switch').css('backgroundImage', 'url("images/code_editor/switch_dark.jpg")');
        $('#source_vsplit').css('backgroundImage', 'url("images/code_editor/vSplit_dark.jpg")');
        $('#source_hsplit').css('backgroundImage', 'url("images/code_editor/hSplit_dark.jpg")');
        $('#source_comment').css('backgroundImage', 'url("images/code_editor/comment_dark.jpg")');
        $('#source_uncomment').css('backgroundImage', 'url("images/code_editor/uncomment_dark.jpg")');
        $('#source_undo').css('backgroundImage', 'url("images/code_editor/undo_dark.jpg")');
        $('#source_repeat').css('backgroundImage', 'url("images/code_editor/repeat_dark.jpg")');
        dark = true;
    }
}

function source_vSplit() {
    if (!vSplit) {
        $('#source_code_css, #source_code_html').css({
            width: '447px',
            height: '500px'

        });
        $('#source_code_css').css('margin', '0 0 0 2px');
        vSplit = true;
    }
}

function source_hSplit() {
    if (vSplit) {
        $('#source_code_css, #source_code_html').css({
            width: '890px',
            height: '250px'
        });
        $('#source_code_css').css('margin', '2px 0 0 0');
        vSplit = false;
    }
}

function source_undo() {
    //editorCSS.setValue(history[curVersion - 1]);
    editorCSS.undo();
    if ($.trim(editorCSS.getValue()) == '')
        editorCSS.redo();
    editorCSS.clearSelection();
}

function source_repeat() {
    editorCSS.redo();
    editorCSS.clearSelection();
}

function elementPreProperties(type) {
    var e = {
        id: "",
        type: type,
        parent: "#workplace",
        top: 0,
        position: "absolute",
        float: 'right',
        margin: '',
        width: "200px",
        height: "200px",
        background: getRandColor(),
        font_size: '14px',
        border: 'none',
        zIndex_: zindex,
        focused: false,
        locked: false
    };
    if (type == 'div' || type == 'pre') {
        e.width = "200px";
        e.height = "200px";
    } else if (type == 'p' || type == 'h1' || type == 'b' || type == 'i' || type == 'small' || type == 'strong') {
        e.width = "500px";
        e.height = "25px";
        e.background = getLightColor();
    } else if (type == 'footer') {
        e.width = document.body.scrollWidth - 20;
        e.height = '100px';
        e.margin = document.body.scrollHeight - 310 + "px 0 0 10px";
    } else if (type == 'header') {
        e.width = document.body.scrollWidth - 20;
        e.height = '100px';
        e.margin = "0 0 0 10px";
    } else if (type == 'span') {
        e.width = '250px';
        e.height = '100px';
        e.background = getLightColor();
    } else if (type == 'article') {
        e.width = '400px';
        e.height = '50px';
        e.font_size = '16px';
        e.left = (document.body.scrollWidth - 400) / 2 + 'px';
    } else if (type == 'aside') {
        e.width = '200px';
        e.height = '250px';
    } else if (type == 'details') {
        e.width = '200px';
        e.height = '250px';
    } else if (type == 'figcaption') {
        e.width = '200px';
        e.height = '60px';
    } else if (type == 'figure') {
        e.background = getDarkColor();
    } else if (type == 'main') {
        e.width = '1200px';
        e.height = '270px';
        e.top = '70px';
        e.left = (document.body.scrollWidth - 1200) / 2 + 'px';
    } else if (type == 'form') {
        e.width = '400px';
        e.height = '200px';
    } else if (type == 'tr') {
        e.width = '400px';
        e.height = '23px';
        e.border = '1px solid black';
    } else if (type == 'td') {
        e.width = '35px';
        e.height = '23px';
        e.border = '1px solid black';
    } else if (type == 'table') {
        e.width = '50px';
        e.height = '150px';
    } else if (type == 'ul' || type == 'ol') {
        e.width = '250px';
        e.height = '150px';
    } else if (type == 'li') {
        e.width = '250px';
        e.height = '25px';
    } else if (type == 'sub' || type == 'sup' || type == 'cite' || type == 'em') {
        e.width = '150px';
        e.height = '25px';
        e.background = getLightColor();
    } else if (type == 'input') {
        e.width = '150px';
        e.height = '20px';
        e.border = '2px inset rgb(0, 0, 0)';
    }
    return e;
}

function getDarkColor() {
    var r = getRandomInt(0, 80);
    var g = getRandomInt(0, 80);
    var b = getRandomInt(0, 80);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function getLightColor() {
    var r = getRandomInt(180, 255);
    var g = getRandomInt(180, 255);
    var b = getRandomInt(180, 255);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function getRandColor() {
    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function generateElement(element, point) {
    var el = document.createElement(element.type);
    var identifier = element.type + '_' + (maxId(element.type) + 1);

    element.id = identifier;
    el.setAttribute('id', identifier);
    el.setAttribute('class', 'work_elements');
    $(element.parent).append(el);

    //if (point)
    //getRandomColorAndSize(element);

    $("#" + identifier).css({
        position: element.position,
        float: element.float,
        margin: element.margin,
        width: element.width,
        height: element.height,
        top: element.top,
        left: element.left,
        fontSize: element.font_size,
        background: element.background,
        zIndex: element.zIndex_,
        border: element.border
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
}

function getRandomColorAndSize(element) {
    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);
    element.background = "rgb(" + r + ", " + g + ", " + b + ")";

    var widthheight = getRandomInt(70, 200);

    //element.width = widthheight + "px";
    //element.height = widthheight + "px";
}

function propertyValidation(type, field, focused) {

    var pattern;
    if (type == "string") {
        pattern = /[a-zA-Z0-9.]$/i;
    } else if (type == "number") {
        pattern = /[0-9.]$/i;
    }
    var prop = $.trim(field.parent().children()[0].innerHTML.toLowerCase());
    if (!pattern.test(field.val())) {
        if (focused.css(prop) != undefined)
            field.val(focused.css(prop))
        else
            field.val("");
    } else {
        focused.css(prop, field.val());
    }

    createNewStatus("CSS values of " + focusedId + " were changed", cursor, changes, generatedElements);
    ++cursor;
}

function fillPropertiesTable(focused) {
    $('.property_input').map(function(i, el) {
        $(el).val(focused.css($.trim($(el).parent().children()[0].innerHTML.toLowerCase())));
    });
}

function elementsSearch(e) {
    var val = $('#elements_search').val();
    alert(val);
    if (val != '') {
        $('#red').css('visibility', 'hidden');
    } else {
        $('#red').css('visibility', 'visible');
    }
}

function clearproperty() {
    $('.property_input').val("");
}
