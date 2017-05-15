var dark = false;
var vSplit = true;
var shadow_col = '#000000';
var saved = "";

function createTemplateString() {
    if(currentFile != null) {
        var innerHTML = $('#workplace').clone().addClass("toSource");
        $('body').append(innerHTML);
        $(".toSource [class^='ui']").remove();
        var html = $('.toSource').html();
        $('.toSource').remove();
        var result = "";
        for (var i = 0; i < html.length; ++i) {
            if (html[i] == '<' && html[i + 1] != '/') {
                var current = "";
                var endPos;
                for (endPos = i + 1; html[endPos] != ' '; ++endPos);
                var currentType = html.substring(i + 1, endPos);
                var j;
                for (j = endPos; html[j] != 'i' && html[j + 1] != 'd'; ++j);
                j += 4;
                for (endPos = j; html[endPos] != '"'; ++endPos);
                var currentId = html.substring(j, endPos);
                var k = html.indexOf("style=", endPos);
                k += 7;
                for (endPos = k; html[endPos] != '"'; ++endPos);
                var currentStyle = html.substring(k, endPos);
                var currentParent = $('#' + currentId).parent().attr('id');
                current = "{ \"element\":{\"locked\":" + findElem(currentId, generatedElements).locked + ", \"type\":\"" + currentType + "\", \"id\":\"" + currentId + "\", \"parent\":\"#" + currentParent + "\" }, \"style\":\"" + currentStyle + "\" }";
                if (i < html.length - 1) {
                    current += "\r\n";
                }
                result += current;
                i = endPos;
            }

        }

        var query = "name=" + currentFile + "&data=" + result + "&secs=" + sec_counter;

        $.ajax({
            url: 'database_scripts/saver.php',
            type: 'POST',
            data: query,
            dataType: "text",
            success: function (data) {
                if (data.length > 0) {
                    showTime(data);
                }
            }
        });

        html2canvas($("#workplace"), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                var dataURL = canvas.toDataURL();
                $.ajax({
                    url: 'database_scripts/photo_saver.php',
                    type: 'POST',
                    data: {
                        img: dataURL
                    }
                });
            }
        });
        document.title = currentFile;
        saved = result;
    } else {
        $("#last_time").html("You cannot save until you sign up");
    }
}

function showTime(data) {
    var time = data.split(" ")[1];
    $("#last_time").html("Last save: " + time);
}

function appendSaved(data) {
    var array = data.split('?');
    var elements = new Array(0);
    generatedElements = new Array(0);
    for (var i = 0; i < array.length - 1; ++i) {
        var e = JSON.parse(array[i]);
        var b = jQuery.extend(true, {}, e.element);
        generatedElements.push(b);
        generateAgain(b, e.style, true);
    }
}

function saveFromMenu() {
    $('#menu_tools').css('visibility', 'hidden');
    createTemplateString();
}


function generateHTML() {
    var innerHTML = $('#workplace').clone().addClass("toSource");
    $('body').append(innerHTML);
    $(".toSource [class^='ui']").remove();

    var html = $('.toSource').html();

    $('.toSource').remove();
    if (html.length < 10) {
        return;
    }
    var css = new Array(0);
    var result = '';
    while (true) {
        var tmpPos = html.indexOf('class="');

        if (tmpPos != -1) {
            result += html.substr(0, tmpPos);
            var i;
            for (i = tmpPos + 8; html[i] != '"'; ++i);
            html = html.substring(i + 2);
        } else {
            break;
        }
    }
    result += html;

    result = trim(result);
    var resultWithoutStyles = "<";
    var tmp = 0;
    while (true) {
        var idPos = result.indexOf('id="', tmp);
        css.push("");
        if (idPos == -1) {
            break;
        } else {
            var ip;
            for (ip = idPos + 4; result[ip] != '"'; ++ip);
            var tmpId = result.substring(idPos + 4, ip);
            css[css.length - 1] += "#" + tmpId + " {\n";
            var stylesPos = result.indexOf('style="', tmp);

            for (ip = stylesPos + 8; result[ip] != '"'; ++ip);
            var styles = result.substring(stylesPos + 7, ip);
            styles = parseStylesString(styles);
            css[css.length - 1] += styles + "}\n\n";
            resultWithoutStyles += result.substring(tmp + 1, stylesPos - 1);
            tmp = ip;
        }
    }
    resultWithoutStyles += result.substring(tmp + 1);
    resultWithoutStyles = parseHTML(resultWithoutStyles);
    editorHTML.setValue(resultWithoutStyles);
    editorCSS.setValue(css.join(''));
}

function checkTag(tag) {
    var singleTags = ['br', 'hr', 'img', 'input'];
    for (var i = 0; i < singleTags.length; ++i)
        if (tag == singleTags[i])
            return false;
    return true;
}

function parseHTML(str) {
    var tagSingle = false;
    var tagQ = 0;
    var result = "";
    var shift = "";
    var flag = false;
    var curPos = 0;
    for (var i = 0; i < str.length; ++i) {
        shift = "";
        if (str[i] == '<') {
            if (str[i + 1] != '/') {
                var j = 0;
                for (j = i; j < str.length && str[j] != ' '; ++j);
                var currTag = str.substring(i + 1, j);
                if (checkTag(currTag)) {
                    tagQ++;
                } else {
                    tagSingle = true;
                }
            } else {
                flag = true;
            }
        }
        if (str[i] == '>') {
            for (var k = 0; k < tagQ - 1; ++k)
                shift += tab;
            if (tagSingle) {
                shift += tab;
                tagSingle = false;
            }

            result += shift + str.substring(curPos, i + 1) + '\n';
            curPos = i + 1;
            if (flag) {
                tagQ--;
                tagSingle = false;
                flag = false;
            }
        }
    }
    return result;
}

function parseStylesString(str) {
    var result = "";
    var curPos = 0;
    for (var i = 0; i < str.length; ++i) {
        if (str[i] == ';') {
            result += tab + str.substring(curPos, i + 1) + '\n';
            curPos = i + 2;
        }
    }
    return result;
}

function trim(str) {
    var i = 0;
    for (i = 0; str[i] != '<'; ++i);
    return str.substring(i);

}

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
        vSplit = true
        var css = editorCSS.getValue();
        var html = editorHTML.getValue();

        editorHTML = ace.edit("source_code_html");
        editorCSS = ace.edit("source_code_css");
        editorHTML.getSession().setMode("ace/mode/html");
        editorCSS.getSession().setMode("ace/mode/css");
        editorCSS.setValue(css);
        editorHTML.setValue(html);
        editorCSS.clearSelection();
        editorHTML.clearSelection();
        if (dark) {
            editorHTML.setTheme("ace/theme/monokai");
            editorCSS.setTheme("ace/theme/monokai");
        } else {
            editorHTML.setTheme("ace/theme/chrome");
            editorCSS.setTheme("ace/theme/chrome");
        }
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
        var css = editorCSS.getValue();
        var html = editorHTML.getValue();
        editorHTML = ace.edit("source_code_html");
        editorCSS = ace.edit("source_code_css");
        editorHTML.setTheme("ace/theme/chrome");
        editorHTML.getSession().setMode("ace/mode/html");
        editorCSS.setTheme("ace/theme/chrome");
        editorCSS.getSession().setMode("ace/mode/css");
        editorCSS.setValue(css);
        editorHTML.setValue(html);
        editorCSS.clearSelection();
        editorHTML.clearSelection();
        if (dark) {
            editorHTML.setTheme("ace/theme/monokai");
            editorCSS.setTheme("ace/theme/monokai");
        } else {
            editorHTML.setTheme("ace/theme/chrome");
            editorCSS.setTheme("ace/theme/chrome");
        }
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

/*function generateElement(element, point) {
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
}*/

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
    if (val != '') {
        $('#red').css('visibility', 'hidden');
    } else {
        $('#red').css('visibility', 'visible');
    }
}

function clearproperty() {
    $('.property_input').val("");
}

function makeLoaded(data) {
    var rrys = data.split("#");
    var name = rrys[rrys.length - 2];
    $.ajax({
        url: 'database_scripts/get_proj_containment.php',
        type: 'POST',
        data: '',
        dataType: "text",
        success: function(data) {
            appendSaved(data);
            createNewStatus("Load", cursor, changes, generatedElements);
            ++cursor;
            document.title = currentFile;
            var elems = $("#workplace .work_elements").each(function(event) {
                $(this).children().removeClass('ui-icon');
            });
            $("#workplace").trigger("click");
        }
    });
}


