function getStartObj(array, pos) {
    var date = new Date();
    var time = date.getHours() + ":" + date.getMinutes();
    array.push({html: $("#workplace").html(), time: time, msg: "Load project"});
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
    $("#" + 'radio_' + pos).checkboxradio({icon: false}).trigger("click");
}

function createNewStatus(mesg, pos, array) {
    var date = new Date();
    var time = date.getHours() + ":" + date.getMinutes();
    array.push({html: $("#workplace").html(), time: time, msg: mesg});
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
    $("#" + 'radio_' + pos).checkboxradio({icon: false}).trigger("click");
}
