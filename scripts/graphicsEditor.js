var generatedElements = new Array(0);
var focusedElement = null;
var focusedId;
var focusTimer;
var buffer = null;
var busy = false;
var zindex = 1;
var clicks = {
    work: false,
    element: false,
    menu: false
};
var allowkeys = true;
var upperID = null;

var allowResize = true;

var keys = {
    right: false,
    left: false
};

var changes = new Array(0);
var cursor = 0;
var my_cur = cursor;

var allowMe = true;

var currentFile = null;

var borderWidth = 0;
var borderColor = "#ffffff";
var borderType = "solid";
var sec_counter = 0;
var timer;

var propResize = true;

window.onclose = function() {
    if(currentFile != null) {
        createTemplateString();
        sendStatistics();
    }
}

$(document).ready(function() {

    var timer1 = setInterval(function () {
        window.scrollTo(0, 0);
    }, 1);

    timer = setInterval(function () {
        ++sec_counter;
        var today = new Date();
        if(today.getHours() == 0 && today.getMinutes() == 0) {
            saveFromMenu();
            sec_counter = 0;
        }
    }, 1000);

    $("#custom_i_i").focus(function() {
        allowMe = false;
    });

    $("#custom_i_i").blur(function() {
        allowMe = true;
    });
    /*$.ajax({
        url: 'database_scripts/check_session.php',
        type: 'POST',
        data: '',
        dataType: "text",
        success: function(data) {
            if(data.indexOf("#") != -1) {
                $("#left_btn").trigger('click');
                currentFile = data.split("#")[data.split("#").length - 2];
                makeLoaded(data);
                $("#last_time").html("Last modifications: " + data.split("#")[data.split("#").length - 1]);

            }
        }
    });*/

    $("#custom_i_i").keypress(function(e){
        if (e.which == 13) {
            var txt = $('#custom_i_i').val();
            if(ValidURL(txt)) {
                var el = document.createElement("li");
                var el2 = document.createElement("img");
                el2.setAttribute('class', 'imgs');
                el2.setAttribute('src', txt);
                el.appendChild(el2);
                $("#kuk").append(el);

                $(".imgs").click(function () {
                    shiftLeftBar();
                    var hello = $(".imgs").toArray();
                    var eleme = hello[hello.length - 1];
                    var eve = {
                        id: "",
                        type: "div",
                        parent: "#workplace",
                        top: 0,
                        position: "absolute",
                        float: 'right',
                        margin: '',
                        width: "200px",
                        height: "200px",
                        background: '',
                        font_size: '14px',
                        border: 'none',
                        zIndex_: zindex,
                        focused: false,
                        locked: false
                    };
                    generatedElements.push(eve);
                    generateElement(eve, true, "div");
                    var w = $(eleme).naturalWidth();
                    var h = $(eleme).naturalHeight();
                    if(w >= 1300 || h >= 800) {
                        w /= 2;
                        h /= 2;
                        if(w >= 1300 || h >= 800) {
                            w /= 2;
                            h /= 2;
                        }
                    }
                    $("#" + generatedElements[generatedElements.length - 1].id).css({
                        width: w + 'px',
                        height: h + 'px',
                        background: "url(" + $(eleme).attr('src') + ") no-repeat",
                        backgroundSize: '100% 100%'
                    });
                    var elems = $("#workplace .work_elements").each(function(event) {
                        $(this).children().removeClass('ui-icon');
                    });
                    $($(".status_radio").toArray()[$(".status_radio").toArray().length - 1]).trigger('click');
                    createNewStatus(generatedElements[generatedElements.length - 1].id + " image was created", cursor, changes, generatedElements);
                    ++cursor;
                    my_cur = cursor
                });
            } else {
                $('#custom_i_i').css({outline:'2px solid red'});
                    setTimeout(function () {
                        $('#custom_i_i').css({outline: 'none'});
                    }, 700);
            }
            return false;
        }
    });

    /*$(".imgs").click(function () {
        var eve = {
            id: "",
            type: "div",
            parent: "#workplace",
            top: 0,
            position: "absolute",
            float: 'right',
            margin: '',
            width: "200px",
            height: "200px",
            background: '',
            font_size: '14px',
            border: 'none',
            zIndex_: zindex,
            focused: false,
            locked: false
        };
        generatedElements.push(eve);
        generateElement(eve, true, "div");
        $("#" + generatedElements[generatedElements.length - 1].id).css({
            width: (document.getElementById(eve.id).naturalWidth / 2) + 'px',
            height: (document.getElementById(eve.id).naturalWidth / 2) + 'px',
            background: "url(" + txt + ") no-repeat",
            backgroundSize: '100% 100%'
        });
    });*/

    $.when(run()).done(function () {
        setTimeout(function () {
            $("#cover").css({visibility: 'hidden', zIndex: '0'});
            clearInterval(timer1);
        }, 3000);
    });

    var timer = setInterval(function () {
        if(currentFile != null) {
            createTemplateString();
        }
    }, 60000);

    $(document).tooltip();

    $('#elements_search').on('#search_input keyup', function(e) {
        var val = $('#search_input').val().toLowerCase();
        if (val != '') {
            $('#search_result').css('visibility', 'visible').html('<span class="outer_element" id="shit"> Result </span>');
            $('#red').css('visibility', 'hidden');
            $("#red ul li  span[id^=" + val + "]").each(function(i, el) {
                $('#search_result').append($(el).parent().clone());
            });
        } else {
            $('#search_result').css('visibility', 'hidden');
            $('#red').css('visibility', 'visible');
        }
    });
    $('#left_bar').on("click", '.inner_element', function() {
        shiftLeftBar();
        var e = elementPreProperties(this.id);
        ++zindex;
        generatedElements.push(e);
        var tt = e.type;
        if (e.type == "textarea" || e.type == "select" || e.type == "input") {
            e.type = 'div';
        }
        generateElement(e, true, tt);
        var elems = $("#workplace .work_elements").each(function(event) {
            $(this).children().removeClass('ui-icon');
        });
    });

    $('.property_input').focus(function() {
        allowkeys = false;
    });

    createLeftMenu();
    normalizeWorkplace();

    $("#menu_tools").menu().position({
        collision: function() {}
    });

    $("#menu_tools").click(function() {
        clicks.menu = true;
    });



    $("#workplace").on("contextmenu", function(e) {
        e.preventDefault();
        $("#vertical_context_menu").css({
            visibility: 'hidden'
        });
        $(".near_block").css({
            visibility: 'hidden'
        });
        $('#menu_tools').css('visibility', 'visible');
        calculatePos(e);
        return false;
    });

    $('.property_input').blur(function() {
        if (focusedElement != null) {
            propertyValidation("string", $(this), focusedElement);
        }
        allowkeys = true;
    }).keydown(function(e) {
        if (e.which == 13) {
            if (focusedElement != null) {
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
                        var file = currentFile != null ? currentFile + ".png" : "unknown_project.png";
                        saveAs(blob, file);
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

    $('.slide').slider({
        min: 0,
        max: 99,
        change: function(event, ui) { borderWidthSlider(event, ui); },
        slide: function(event, ui) { sliderDisplay(event, ui); }
    });

    $('.slide2').slider({
        min: 0,
        max: 99,
        change: function(event, ui) { setBoxShadow(event, ui); },
        slide: function(event, ui) { sliderDisplay(event, ui); },
        change: function(event, ui) {
            borderWidthSlider(event, ui);
        },
        slide: function(event, ui) {
            sliderDisplay(event, ui);
        }
    });

    $('.slide2').slider({
        change: function(event, ui) {
            setBoxShadow(event, ui);
        },
        slide: function(event, ui) {
            sliderDisplay(event, ui);
        }
    });

    $("#download_but").click(function(event) {
        event.preventDefault();
        var temp = generateHTML().split("&");
        var html_text = "<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset=\"UTF-8\">\n\t<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\">\n</head>\n<body style=\" margin: 0px; padding: 0px;\">\n\t" + temp[0] + "</body>\n</html>"
        var css_text = temp[1];
        var query = "html=" + html_text + "&css=" + css_text;
        $.ajax({
            url: 'database_scripts/delete_last.php',
            type: 'POST',
            success: function(dataa) {
                $.ajax({
                    url: 'database_scripts/project_giver.php',
                    type: 'POST',
                    data: query,
                    dataType: "text",
                    success: function(data) {
                        $("#download_me").attr('href', data);
                        $("#download_me").click(function (event) {
                            this.click();
                        }).click();
                    }
                });
            }
        });
    });

    $('#border_width').slider({
        animate: 'slow',
        min: 0,
        max: 20,
        change: function(event, ui) {
            borderWidthSlider(event, ui);
        },
        slide: function(event, ui) {
            sliderDisplay(event, ui);
        }
    });

    $(".border_types select").selectmenu();

    $(document).keydown(function(event) {
        if (allowkeys != false) {
            if (event.which == 68 && event.ctrlKey) {
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
            $("#vertical_context_menu").css({
                visibility: "hidden"
            });
            $(".near_block").css({
                visibility: 'hidden'
            });
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

    $("#changes_menu").dialog();
    $("#changes_menu input").checkboxradio();
    $("#changes_menu").css({
        overflowX: "hidden"
    });
    $("#changes_menu").parent().css({
        height: '',
        maxHeight: '180px',
        overflow: 'auto',
        top: '200px',
        left: ($("#workplace").width() - 200) + "px"
    });
    $("#changes_menu").parent().draggable({
        containment: $("#workplace")
    }).css({
        width: '200px'
    });
    /*createNewStatus("Load", cursor, changes, generatedElements);
    ++cursor;*/
    $("#changes_menu").parent().css({
        opacity: '0',
        top: '0'
    });
    $('.ui-dialog-titlebar-close').remove();
    $("#changes_menu").parent().resizable("disable");

    /*$("#newProject").click(function (e) {
        e.preventDefault();
        $.ajax({
            url: 'database_scripts/file_creator.php',
            type: 'POST',
            data: "data=mypj",
            dataType: "text",
            success: function (data) {
                console.log(data);
                if (data.length > 0) {
                    currentFile = data;
                    $("#currentFile").html(currentFile);
                }
            }
        });
    });*/

    /*$("#saveTemplate").click(function (e) {
        e.preventDefault();
        if(currentFile != null) {
            createTemplateString();
        }
    });*/

});

jQuery.extend(jQuery.expr[':'], {
    focus: "a == document.activeElement"
});

(function($) {
    function img(url) {
        var i = new Image;
        i.src = url;
        return i;
    }

    if ('naturalWidth' in (new Image)) {
        $.fn.naturalWidth  = function() { return this[0].naturalWidth; };
        $.fn.naturalHeight = function() { return this[0].naturalHeight; };
        return;
    }
    $.fn.naturalWidth  = function() { return img(this.src).width; };
    $.fn.naturalHeight = function() { return img(this.src).height; };
})(jQuery);

function ValidURL(str) {
    var pattern = new RegExp('(https?:\/\/.*\.(?:png|jpg|jpeg|gif|png|svg))'); // fragment locater
    if(!pattern.test(str)) {
        return false;
    } else {
        return true;
    }
}

function calculatePos(e) {
    if(($("#menu_tools").width() > $("#workplace").width() -  e.pageX) && ($("#menu_tools").height() > e.pageY - 200)) {
        $("#menu_tools").css({
            left: e.pageX - $("#menu_tools").width(),
            top: e.pageY - 200 + $("#menu_tools").height()
        });
    } else {
        if ($("#menu_tools").width() > $("#workplace").width() - e.pageX) {
            $("#menu_tools").css({
                left: e.pageX - $("#menu_tools").width(),
                top: e.pageY - 200
            });
        } else {
            if ($("#menu_tools").height() > e.pageY - 200) {
                $("#menu_tools").css({
                    left: e.pageX,
                    top: e.pageY - 200 + $("#menu_tools").height()
                });
            } else {
                $("#menu_tools").css({
                    left: e.pageX,
                    top: e.pageY - 200
                });
            }
        }
    }
}

function run() {
    $.ajax({
        url: 'database_scripts/check_session.php',
        type: 'POST',
        data: '',
        dataType: "text",
        success: function(data) {
            if(data.indexOf("#") != -1) {
                $("#left_btn").trigger('click');
                currentFile = data.split("#")[data.split("#").length - 2];
                makeLoaded(data);
                $("#last_time").html("Last modifications: " + data.split("#")[data.split("#").length - 1]);

            }
        }
    });
}

function normalizeWorkplace() {

    var w = document.body.scrollWidth;
    $('#workplace').css('width', w - 8);
    $("#res_pass").css({
        marginTop: "19px"
    });

}

function deleteFocused() {
    if (focusedElement != null) {
        if ($("#" + focusedId).parent().attr('id') != "workplace") {
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
        $("#vertical_context_menu").css({
            visibility: 'hidden'
        });
        $(".near_block").css({
            visibility: 'hidden'
        });
        generateHTML();
        createNewStatus(focusedId + " was deleted", cursor, changes, generatedElements);
        ++cursor;
        my_cur = cursor
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

function checkBlock(elem) {
    if(($(elem).position().top + $(elem).height()) <= $("#workplace").height() && ($(elem).position().top + $(elem).height()) >= $("#workplace").height() - 10 && allowResize) {
        $("#workplace").css({height: $("#workplace").height() + ($(elem).height() * 2) + 'px'});
    }
}

function createLeftMenu() {
    $("#red").treeview({
        animated: "normal",
        collapsed: true,
        control: "#treecontrol"
    });

}


function generateElement(element, point, tt) {
    el = document.createElement(element.type);
    var identifier = element.type + '_' + (maxId(element.type) + 1);

    element.id = identifier;
    el.setAttribute('id', identifier);
    el.setAttribute('class', 'work_elements');

    $(element.parent).append(el);

    if (tt == "input") {
        var el1 = document.createElement('input');
        el1.setAttribute('id', "input_" + (maxId('input') + 1));
        el1.setAttribute('class', 'work_elements');
        var e = {
            id: "input_" + (maxId('input') + 1),
            type: "input",
            parent: "#" + identifier,
            top: 0,
            left: 0,
            position: "absolute",
            margin: '',
            font_size: '14px',
            border: 'none',
            zIndex_: zindex++,
            focused: false,
            locked: false
        };
        generatedElements.push(e);
        $("#" + identifier).append(el1);
        $("#" + identifier + " input").css({
            width: '100px',
            height: '35px'
        });
    } else {
        if (tt == "textarea") {
            var el1 = document.createElement('textarea');
            el1.setAttribute('id', "textarea_" + (maxId("textarea") + 1));
            el1.setAttribute('class', 'work_elements');
            var e = {
                id: "textarea_" + (maxId("textarea") + 1),
                type: "textarea",
                parent: "#" + identifier,
                top: 0,
                left: 0,
                position: "absolute",
                margin: '',
                font_size: '14px',
                border: 'none',
                zIndex_: zindex++,
                focused: false,
                locked: false
            };
            generatedElements.push(e);
            $("#" + identifier).append(el1);
            $("#" + identifier + " textarea").css({
                width: '100px',
                height: '35px'
            });
        } else {
            if (tt == "select") {
                var el1 = document.createElement('select');
                el1.setAttribute('id', "select_" + (maxId('select') + 1));
                el1.setAttribute('class', 'work_elements');
                var e = {
                    id: "select_" + (maxId('select') + 1),
                    type: "select",
                    parent: "#" + identifier,
                    top: 0,
                    left: 0,
                    position: "absolute",
                    margin: '',
                    font_size: '14px',
                    border: 'none',
                    zIndex_: zindex++,
                    focused: false,
                    locked: false
                };
                generatedElements.push(e);
                $("#" + identifier).append(el1);
                $("#" + identifier + " select").css({
                    width: '100px',
                    height: '35px'
                });
            }
        }
    }

    if (point && tt != "input" && tt != "textarea" && tt != "select")
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

    if (tt == "input" || tt == "textarea" || tt == "select") {
        $("#" + identifier).css({
            background: "rgba(0,0,0,0)",
            width: '',
            height: ''
        });
    }

    //printStatus(identifier)

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
        $("#vertical_context_menu").position({
            my: 'left+5 top',
            at: 'right top',
            of: '#' + identifier,
            collision: 'flip flip'
        });

        $("#vertical_context_menu").css({
            zIndex: zindex + 1
        });

        if($("#" + element.id).width() >= 1300) {
            $(".near_block").position({
                my: 'left+44 top+5',
                at: 'left bottom',
                of: '#' + identifier,
                collision: 'flip flip'
            });
            $("#vertical_context_menu").position({
                my: 'left top+5',
                at: 'left bottom',
                of: '#' + identifier,
                collision: 'flip flip'
            });
        } else {
            $(".near_block").position({
                my: 'left+49 top',
                at: 'right top',
                of: '#' + identifier,
                collision: 'flip flip'
            });
            $("#vertical_context_menu").position({
                my: 'left+5 top',
                at: 'right top',
                of: '#' + identifier,
                collision: 'flip flip'
            });
        }

        $(".near_block").css({
            visibility: 'hidden',
            zIndex: zindex + 1
        });

        if (element.type == "table") {
            $("#i_i_6").css({
                height: '35px'
            });
        } else {
            $("#i_i_6").css({
                height: '0px'
            });
        }

        if (!busy) {
            $("#vertical_context_menu").css({
                visibility: 'visible'
            });
        }
    }).resizable({
        // be careful!
        containment: "#workplace",
        minWidth: 25,
        minHeight: 25,
        handles: 'all',
        resize: function(event, ui) {
            propResize = false;
            busy = true;
            $("#vertical_context_menu").css({
                visibility: 'hidden'
            });
            $(".near_block").css({
                visibility: 'hidden'
            });
            $("#" + this.id).trigger("click");
            var ch = preventAxis(event, ui, this);
            //checkBlock(this);
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
                        generatedElements[elem].width = $("#" + identifier).width();
                        generatedElements[elem].height = $("#" + identifier).height();
                    }
                }
            }
            if($("#" + element.id).width() >= 1300) {
                $(".near_block").position({
                    my: 'left+44 top+5',
                    at: 'left bottom',
                    of: '#' + identifier,
                    collision: 'flip flip'
                });
                $("#vertical_context_menu").position({
                    my: 'left top+5',
                    at: 'left bottom',
                    of: '#' + identifier,
                    collision: 'flip flip'
                });
            } else {
                $(".near_block").position({
                    my: 'left+49 top',
                    at: 'right top',
                    of: '#' + identifier,
                    collision: 'flip flip'
                });
                $("#vertical_context_menu").position({
                    my: 'left+5 top',
                    at: 'right top',
                    of: '#' + identifier,
                    collision: 'flip flip'
                });
            }
            propResize = true;
        },
        stop: function(event, ui) {
            propResize = false;
            createNewStatus(this.id + " was resized to W:" + $(this).width() + " H:" + $(this).height(), cursor, changes, generatedElements);
            ++cursor;
            my_cur = cursor
            $("#vertical_context_menu").css({
                visibility: 'visible'
            });
            busy = false;
            propResize = true;
        }
    }).droppable({
        over: function(event, ui) {
            var pps = findElemPos(this.id, generatedElements);
            if (generatedElements[pps].locked == true) return;
            if ($("#" + ui.draggable.prop('id')).parent().attr("id") == this.id || checkChildren(this.id, ui.draggable.prop('id'))) return;
            swapIndexes(event, ui, this);
            checkSizes(event, ui, this);
        },
        out: function(event, ui) {
            clearOutlines(this);
        },
        drop: function(event, ui) {
            var pps = findElemPos(this.id, generatedElements);
            if (generatedElements[pps].locked == true) return;
            if ($("#" + ui.draggable.prop('id')).parent().attr("id") == this.id || checkChildren(this.id, ui.draggable.prop('id'))) return;
            if (checkSizes(event, ui, this)) {
                var div = $("#" + ui.draggable.prop('id')).detach();
                $(this).append(div);
                $("#" + ui.draggable.prop('id')).css({
                    top: 0,
                    left: 0
                });
                findElem(ui.draggable.prop('id'), generatedElements).parent = "#" + this.id;
                $("#" + ui.draggable.prop('id')).draggable("option", "containment", $("#" + this.id));
                $("#" + ui.draggable.prop('id')).resizable("option", "containment", $("#" + this.id));
                //$("#" + this.id).resizable("option", "minHeight", ($("#" + ui.draggable.prop('id')).height() + 1));
                //$("#" + this.id).resizable("option", "minWidth", ($("#" + ui.draggable.prop('id')).width() + 1));
                createNewStatus(ui.draggable.prop('id') + " was dropped into " + this.id, cursor, changes, generatedElements);
                ++cursor;
                my_cur = cursor
                $("#" + ui.draggable.prop('id')).trigger('click');
            } else {

            }

            clearOutlines(this);
        }
    }).draggable({
        cancel: null,
        containment: "#workplace",
        scroll: true,
        drag: function(event, ui) {

            busy = true;
            $("#vertical_context_menu").css({
                visibility: 'hidden'
            });
            $(".near_block").css({
                visibility: 'hidden'
            });
            $("#" + this.id).trigger("click");
            var parent_id = $("#" + this.id).parent().attr("id");
            if (parent_id != "workplace") {
                //ole.log($("#" + this.id).position().top + ":" + $("#" + this.id).position().left);
                //$("#" + parent_id).resizable("option", "minHeight", ($("#" + this.id).height() + 1 + $("#" + this.id).position().top));
                // $("#" + parent_id).resizable("option", "minWidth", ($("#" + this.id).width() + 1 + $("#" + this.id).position().left));
            }
            if($("#" + element.id).width() >= 1300) {
                $(".near_block").position({
                    my: 'left+44 top+5',
                    at: 'left bottom',
                    of: '#' + identifier,
                    collision: 'flip flip'
                });
                $("#vertical_context_menu").position({
                    my: 'left top+5',
                    at: 'left bottom',
                    of: '#' + identifier,
                    collision: 'flip flip'
                });
            } else {
                $(".near_block").position({
                    my: 'left+49 top',
                    at: 'right top',
                    of: '#' + identifier,
                    collision: 'flip flip'
                });
                $("#vertical_context_menu").position({
                    my: 'left+5 top',
                    at: 'right top',
                    of: '#' + identifier,
                    collision: 'flip flip'
                });
            }
            //checkBlock(this);
        },
        stop: function(event, ui) {
            busy = false;
            createNewStatus("Block " + this.id + " was moved to (" + $(this).position().left + ", " + $(this).position().top + ")", cursor, changes, generatedElements);
            ++cursor;
            my_cur = cursor
            $("#vertical_context_menu").css({
                visibility: 'visible'
            });
        }
    });


    if (tt == "input") {
        $("#" + identifier + " input").css({
            border: 'black 1px solid'
        });
        $("#" + identifier).resizable({
            alsoResize: $("#" + identifier + " input"),
            minWidth: 100,
            minHeight: 35
        });
        $("#" + identifier).dblclick(function() {
            $("#" + identifier + " input").trigger('focus');
        });
    } else {
        if (tt == "textarea") {
            $("#" + identifier + " textarea").css({
                border: 'black 1px solid',
                resize: 'none'
            });
            $("#" + identifier).resizable({
                alsoResize: $("#" + identifier + " textarea"),
                minWidth: 100,
                minHeight: 35
            });
            $("#" + identifier).dblclick(function() {
                $("#" + identifier + " textarea").trigger('focus');
            });
        } else {
            if (tt == "select") {
                $("#" + identifier + " select").css({
                    border: 'black 1px solid'
                });
                $("#" + identifier).resizable({
                    alsoResize: $("#" + identifier + " select"),
                    minWidth: 100,
                    minHeight: 35
                });
                $("#" + identifier).dblclick(function() {
                    $("#" + identifier + " select").trigger('focus');
                });
            }
        }
    }
    
    if(element.type == "header") {
        $("#" + element.id).css({top: '0', left: '0'});
    }

    if (point == true) {
        createNewStatus("New " + element.type + " was created (" + element.id + ")", cursor, changes, generatedElements);
        ++cursor;
        my_cur = cursor
    }

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

function findElem(id, array) {
    for (var i = 0; i < array.length; ++i) {
        if (array[i].id == id) {
            return array[i];
        }
    }
    return null;
}

function findElemPos(id, array) {
    for (var i = 0; i < array.length; ++i) {
        if (array[i].id == id) {
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
    if(!allowMe) return;
    if (eve.which == 46) {
        deleteFocused();
        $("#vertical_context_menu").css({
            visibility: "hidden"
        });
        $(".near_block").css({
            visibility: 'hidden'
        });
    } else {
        if (eve.which == 67 && eve.ctrlKey) {
            copy();
        } else {
            if (eve.which == 86 && eve.ctrlKey) {
                if($("#custom_i_i").is(":focus") == false) {
                    paste();
                    createNewStatus(focusedId + " was pasted", cursor, changes, generatedElements);
                    ++cursor;
                    my_cur = cursor
                    $("#vertical_context_menu").css({
                        visibility: 'hidden'
                    });
                    $(".near_block").css({
                        visibility: 'hidden'
                    });
                }
            } else {
                if (eve.which == 88 && eve.ctrlKey) {
                    cut();
                    createNewStatus(focusedId + " was cut", cursor, changes, generatedElements);
                    ++cursor;
                    my_cur = cursor;
                    $("#vertical_context_menu").css({
                        visibility: "hidden"
                    });
                    $(".near_block").css({
                        visibility: 'hidden'
                    });

                } else {
                    if (eve.which == 68 && eve.ctrlKey) {
                        detach_child();
                    } else {
                        if (eve.which == 83 && eve.ctrlKey) {
                            eve.preventDefault();
                            createTemplateString();
                        } else {
                            if (eve.which == 90 && eve.ctrlKey) {
                                eve.preventDefault();
                                if(my_cur>= 0) {
                                    --my_cur;
                                    $("#" + 'radio_' + my_cur).trigger('click');
                                }
                            } else {
                                if (eve.which == 89 && eve.ctrlKey) {
                                    eve.preventDefault();
                                    if(my_cur <= ($("#changes_menu").children().length / 2) - 1) {
                                        my_cur++;
                                        $("#" + 'radio_' + my_cur).trigger('click');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function detach_child() {
    if (focusedElement != null) {
        if ($("#" + focusedId).parent().attr('id') != "workplace") {
            $("#" + focusedId).draggable({
                disabled: true
            });
            //$("#" + $("#" + focusedId).parent().attr('id')).resizable("option", "minWidth", '');
            //$("#" + $("#" + focusedId).parent().attr('id')).resizable("option", "minHeight", '');
            var pos = $("#" + focusedId).offset();
            var elem = $("#" + focusedId).detach();
            findElem(focusedId, generatedElements).parent = "#workplace";
            $("#workplace").append(elem);
            $("#" + focusedId).css({
                left: pos.left,
                top: (pos.top - 204)
            });
            setTimeout(function() {
                $("#" + focusedId).effect('highlight', {}, 200, function() {});
                $("#" + focusedId).draggable({
                    disabled: false
                });
            }, 200);
            $("#" + focusedId).resizable("option", "minHeight", '');
            $("#" + focusedId).resizable("option", "minWidth", '');
            $("#" + focusedId).draggable("option", "containment", $("#workplace"));
            $("#" + focusedId).resizable("option", "containment", '');
            createNewStatus("Block " + focusedId + " was detached", cursor, changes, generatedElements);
            ++cursor;
            my_cur = cursor
        }
    }
}

function copy() {
    if (focusedId == null)
        return;
    var elem = findElem(focusedId, generatedElements);
    if (elem != null) {
        if (checkChildren(focusedId, 'input') || checkChildren(focusedId, 'select') || checkChildren(focusedId, 'textarea')) {
            var typer;
            if (checkChildren(focusedId, 'input')) {
                typer = 'input';
            } else {
                if (checkChildren(focusedId, 'select')) {
                    typer = 'select';
                } else {
                    typer = 'textarea';
                }
            }
            elem.type = 'div';
            buffer = {
                element: elem,
                type: "copy",
                e_type: typer
            };
        } else {
            buffer = {
                element: elem,
                type: "copy",
                e_type: elem.type
            };
        }

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
                id: buffer.element.type + '_' + (maxId(buffer.element.type) + 1),
                type: buffer.element.type,
                parent: "#workplace",
                focused: false,
                zIndex_: zindex,
                locked: false
            };
            ++zindex;
            generatedElements.push(e);
            generateAgain(e, $("#" + buffer.element.id).clone().css({left:'10px', top:'10px'}).attr('style'), false);
        }
        createNewStatus(e.id + " was pasted", cursor, changes, generatedElements);
        ++cursor;
        my_cur = cursor;
    }
}

function cut() {
    if (focusedId == null)
        return;
    var elem = findElemPos(focusedId, generatedElements);
    if (elem != -1) {
        clearStatus();
        clearproperty();
        if ($("#" + focusedId).parent().attr('id') != "workplace") {
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

function changeCurrent(pos) {
    current_cursor = pos;
    return current_cursor;
}

function showCursor() {
    return cursor;
}

function cursorMinus() {
    --cursor;
}

function showGE() {
    return generatedElements;
}

function showChanges() {
    return changes;
}

function setCur(val) {
    cursor += val;
}
