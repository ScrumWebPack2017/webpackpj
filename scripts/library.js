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
}

function fillPropertiesTable(focused) {
    $('.property_input').map(function(i, el) {
        $(el).val(focused.css($.trim($(el).parent().children()[0].innerHTML.toLowerCase())));
    });
}

function clearproperty(){
    $('.property_input').val("");
}

function checkChildren(parentId, childId) {
    return $('#' + parentId).html().indexOf(childId) != -1;
}