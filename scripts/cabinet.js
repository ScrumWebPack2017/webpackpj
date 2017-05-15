var focused = null;
var t, l = (new Date()).getTime();
var active = null;
var allow = true;

/*
 confirmUserInfo() - send changed data
 serializeUserForm() - GET string for used info

 */


$(document).ready(function() {
    //alert("You did a great job out there! You worked for <span class=\"red_dot\">10</span> hours for last 3 days! This is <span style=\"text-decoration: underline; text-decoration-color:  lawngreen;\">very good</span> result. We glad that you like using our system. We hope, that we fully help you with developing your own web pages. <span style=\"color:  darkorange;\">\"Everything you can imagine is real.\" ― Pablo Picasso</span>");
    centerize();
    normalizeCabinet();
    //feelUserInfo("someEmail.@gmail.com", "Sonya Marmeladova", "3807766999", "Male", "USA");
    $(window).resize(function () {
        normalizeCabinet();
    });

    $(".query_btn").click(function (event) {
        if(active == $(this).index()) {
            allow = false;
        } else {
            active = $(this).index();
            $(".query_btn").css({background: '#294752'});
            $(this).css({background: '#467180'});
            allow = true;
        }
    });

    $('#change_user_box input').focus(function() {
        if (this.id == 'input_email') {
            borderDefault(this.id);
            $('#email_error').html('');
        } else if (this.id == 'input_phone') {
            borderDefault(this.id);
            $('#phone_error').html('');
        } else if (this.id == 'input_country') {
            borderDefault(this.id);
            $('#country_error').html('');
        }
        normalizeBorders();
    });

    $('#control_wrapper, #templates_wrapper').on("click", function() {if($('#drop_menu').css('visibility') == 'visible') {
        dropMenu();
    }})

    $(document).on("scroll",function(){
        if($('#drop_menu').css('visibility') == 'visible') {
            dropMenu();
        }
    });

    $.ajax({
        url: 'database_scripts/load_projects.php',
        type: 'POST',
        data: '',
        dataType: "text",
        success: generateProjectTemplate
    });

    $.ajax({
        url: 'database_scripts/get_data.php',
        type: 'POST',
        data: '',
        dataType: "text",
        success: function(data) {
            if(data != "Error") {
                var input = data.split("*");
                feelUserInfo(input[0], input[1], input[2], input[3], input[4]);
                $("#top_photo img").attr('src', "../images/png/" + input[5]);
            }
        }
    });

    $("#btn_1").click(function () {
        $(".image_block").html('');
        $(".image_block").animate({'opacity' : '0'}, 400, function() {
            $(".image_block").css({
                background: "rgb(250, 250, 250) url('../images/Cheering-Office-Workers.png') no-repeat",
                backgroundSize: "100% 100%"
            });
            $(".image_block").animate({'opacity' : '1'}, 400, function () {
                setTimeout(function () {
                    $(".image_block").animate({'opacity' : '0'}, 400, function () {
                        $(".image_block").css({
                            background: "rgb(250, 250, 250)",
                        });
                        showTextAboutTime(".image_block");
                        $(".image_block").animate({'opacity' : '1'}, 400);
                    });
                }, 1000);
            });
        });
    });

    $("#btn_2").click(function () {
        $(".image_block").html('');
        $(".image_block").animate({'opacity' : '0'}, 400, function() {
            $(".image_block").css({
                background: "rgb(250, 250, 250) url('../images/Web-Development-With-Angular-Javascript.png') no-repeat",
                backgroundSize: "100% 100%"
            });
            $(".image_block").animate({'opacity' : '1'}, 400, function () {
                setTimeout(function () {
                    $(".image_block").animate({'opacity' : '0'}, 400, function () {
                        $(".image_block").css({
                            background: "rgb(250, 250, 250)",
                        });
                        showTextAboutPj(".image_block");
                        $(".image_block").animate({'opacity' : '1'}, 400);
                    });
                }, 1000);
            });
        });
    });

    $('#templates').on("mouseover", ".template_box",  function(e) {
        if(focused != this) {
            $(this).css({
                background: "#e4e8eb"
            });
        }
    }).on("mouseout", ".template_box", function(e) {
        if(focused != this) {
            $(this).css({
                background: "#ffffff"
            });
        }
    }).on("click", ".template_box",  function(e) {
        focused = this;
        $(".template_box").css({ background: "#ffffff" });
        $(this).css({ background: "#c0c5c8" });
    });

    $('#templates').dblclick(function(event) {
        $("#load_btn").trigger('click');
    });

    $('#saveTemplate').click(function() {
        createTemplateString();
    });

    $("#createBtn").click(function (event) {
        event.preventDefault();
        createProject();
    });
    
    $("#load_btn").click(function (event) {
       event.preventDefault();
        if(focused != null) {
            $.ajax({
                url: 'database_scripts/load_p.php',
                type: 'POST',
                data: "filename=" + $(focused).children(".template_name").html(),
                dataType: "text",
                success: function (data) {
                    if(data == "OK") {
                        window.location.replace("http://webpackpj.com");
                    }
                }
            });
        }
    });
    
    $("#delete_btn").click(function (event) {
       event.preventDefault();
       if(focused != null) {
           $.ajax({
               url: 'database_scripts/project_delete.php',
               type: 'POST',
               data: "pjname=" + $(focused).children(".template_name").html(),
               dataType: "text",
               success: function (data) {
                   if(data == "OK") {
                       $(focused).remove();
                       focused = null;
                   }
               }
           });
       }
    });
});

function showTextAboutPj(elem_id) {
    var dret;
    var text;
    $.ajax({
        url: 'database_scripts/proj_summary.php',
        type: 'POST',
        data: '',
        dataType: "text",
        success: function(data) {
            dret = data;
            var seconds = parseInt(dret);
            if(seconds >= 200) {
                text = "That’s how we do this! Did you know that you created <span class=\"red_dot\">" + seconds + "</span> elements for last 3 projects? Oh, yeah, we forgot that you also see this chart down there. Anyway, congratulations! <span style=\"color:  darkorange;\">“Others have seen what is and asked why. I have seen what could be and asked why not. ” ― Pablo Picasso</span>";
            } else {
                if(seconds < 200 && seconds >= 50) {
                    text = "Straight and simple! Good design choice, but not the best one. Otherwise, you have created <span style='font-size: 25px; color: darkorange; font-family: \"GothaProLig\";'>" + seconds + "</span> elements for last 3 projects. Next time, try to use <span style='text-decoration: underline; text-decoration-color: darkorange;'>more elements</span> to impress your potential users. <span style=\"color: cornflowerblue\">“Shoot for the moon. Even if you miss, you'll land among the stars.” ― Norman Vincent Peale</span>";
                } else {
                    text = "Well, don’t explain anything. We know why you have created <span style='font-size: 25px; color: orangered; font-family: \"GothaProLig\";'>" + seconds + "</span> elements for last 3 projects: we have found out that you are an artist, who works with minimalistic art. We hope that wasn’t a secret. <span style=\"color: blueviolet\">“It is hard to fail, but it is worse never to have tried to succeed.” ― Theodore Roosevelt</span>";
                }
            }
            $(elem_id).html(text);
        }
    });
}

function showTextAboutTime(elem_id) {
    var dret;
    var text;
    $.ajax({
        url: 'database_scripts/time_summary.php',
        type: 'POST',
        data: '',
        dataType: "text",
        success: function(data) {
            dret = data;
            var seconds = parseInt(dret);
            if(seconds >= 72000) {
                text = "You did a great job! You worked for <span class=\"red_dot\">" + tm(seconds) + "</span> hours for last 3 days! This is <span style=\"text-decoration: underline; text-decoration-color:  lawngreen;\">very good</span> result. We glad that you like using our system. We hope, that we fully help you with web page developing. <span style=\"color:  darkorange;\">\"Everything you can imagine is real.\" ― Pablo Picasso</span>";
            } else {
                if(seconds < 72000 && seconds >= 18000) {
                    text = "You did good. You worked for <span style='font-size: 25px; color: darkorange; font-family: \"GothaProLig\";'>" + tm(seconds) + "</span> hours for last 3 days. We advice you to <span style=\"text-decoration: underline; text-decoration-color: darkorange;\">practice more</span> with web developing. <span style=\"color: cornflowerblue\">“And, when you want something, all the universe conspires in helping you to achieve it.”― Paulo Coelho, The Alchemist</span>";
                } else {
                    text = "We <span style=\"text-decoration: line-through\">must</span> couldn’t say your results are awful, but there is really nothing to be proud of :( You worked for <span style=\"font-size: 25px; color: orangered; font-family: \"GothaProLig\";\">" + tm(seconds) + "</span> hours for last 3 days. <span style=\"color: blueviolet\">“I have not failed. I've just found 10,000 ways that won't work.” ― Thomas A. Edison</span>";
                }
            }
            $(elem_id).html(text);
        }
    });
}

function showBArMenu(bar) {
        if (bar == "show") {
            $(".chart_bar").css({visibility: 'visible'});
            $(".chart_bar").animate({'opacity': '1'}, 400, function () {

            });
        } else {
            $(".chart_bar").animate({'opacity': '0'}, 400, function () {
                $(".chart_bar").css({visibility: 'hidden'});
            });
        }
}

function showChartMenu() {
    if($("#chart_container").css('height') == '0px') {
        $("#chart_container").animate({'height':'600px'}, 300, function () {
            //$(".chart_bar").css({visibility:'visible'});
            $("#upper_line").css({visibility:'visible'});
            $("#upper_line").animate({'opacity':'1'}, 400, function() {
                $("#control_wrapper").css({marginTop: '5px'});
                $("#btn_1").trigger("click");
            });
            /*$(".chart_bar").animate({'opacity':'1'}, 400, function () {

            });*/
        });
    } else {
        $("#upper_line").animate({'opacity':'0'}, 400, function () {
            $("#control_wrapper").css({marginTop: '0px'});
            $("#chart_container").animate({'height':'0px'}, 300, function () {
                //$(".chart_bar").css({visibility:'hidden'});
                $("#upper_line").css({visibility:'hidden'});
            });
        });
        /*$(".chart_bar").animate({'opacity':'0'}, 400, function () {

        });*/
    }
}

function centerize() {
    var height = document.documentElement.clientHeight;
    $('#change_menu_panel').css('top', (height - $('#change_menu_panel').css('height').split('p')[0] - 30)/2);
}

function logOut() {
    $.ajax({
        url: 'database_scripts/session_close.php',
        success: function(data) {
            if (data == 'closing')
                window.location.replace("http://webpackpj.com");
        }
    });

}

// Function to put userInfo
function feelUserInfo(email, login, phone, gender, country) {
    $('#drop_email').html(email);
    $('#input_email').val(email);
    if (login != 0) {
        $('#top_name').html(login);
        $('#input_login').val(login);
    } else {
        var names = [
            ".titanic {float: none;}",
            "Code Monkey",
            "accepted Chief Hacking Office",
            "Princess of Software",
            "Coding Zombie",
            "BugMaker",
            "Chief Bug Creator",
            "Software Ninjaneer",
            "Jesus404",
            "2B||!2B",
            "Byte me",
            "Codebuster",
            "Web Nerd",
            "ITGeekyFreaky",
            "Tutty Frutty",
            "Caveman",
            "Rebooter",
            "Server jockey",
            "Overgeek"
        ];
        $('#top_name').html(names[Math.floor(Math.random() * names.length)]);
    }
    if (phone != 0) {
        $('#drop_phone').html(phone);
        $('#input_phone').val(phone);
    } else {
        $('#drop_phone').html('-');
    }
    if (gender != 0) {
        $('#drop_gender').html(gender);
        $('#input_gender').val(gender);
    } else {
        $('#drop_phone').html('-');
    }
    if (country != 0) {
        $('#drop_cpuntry').html(country);
        $('#input_country').val(country);

    } else {
        $('#drop_phone').html('-');
    }
}

function loadPjs() {
    showBArMenu("hid");
    $.ajax({
        url: 'database_scripts/proj_stats.php',
        type: 'POST',
        data: "",
        dataType: "text",
        success: function (data) {
            if(data.indexOf("|") != -1) {
                newChartBars(data);
                showBArMenu("show");
            }
        }
    });
}

function loadTime() {
    showBArMenu("hid");
    $.ajax({
        url: 'database_scripts/get_hours.php',
        type: 'POST',
        data: "",
        dataType: "text",
        success: function (data) {
            if(data.indexOf("|") != -1) {
                newChart(data);
                showBArMenu("show");
            }
        }
    });
}

function newChartBars(data) {
    var spl = data.split("$");
    spl.pop();
    var projects = [];
    var elems = [];
    for(var i = 0; i < spl.length; ++i) {
        var temp = spl[i].split("|");
        projects.push(temp[0]);
        elems.push(parseInt(temp[1]));
    }

    var point = false;

    $(".chart_bar").html('');

    var chart = new Chartist.Bar('.chart_bar', {
        labels: projects,
        series: elems
    }, {
        distributeSeries: true
    });
}

function newChart(data) {
    var spl = data.split("$");
    spl.pop();
    var dates = [];
    var times = [];
    for(var i = 0; i < spl.length; ++i) {
        var temp = spl[i].split("|");
        dates.push(temp[0]);
        times.push(parseInt(temp[1]));
    }

    $(".chart_bar").html('');

    var chart = new Chartist.Line('.chart_bar', {
        labels: dates,
        series: [
            times
        ]
    }, {
        low: 0,
        showArea: true,
        axisY: {
            offset: 80,
            labelInterpolationFnc: function(value) {
                var sec_num = parseInt(value, 10); // don't forget the second param
                var hours   = Math.floor(sec_num / 3600);
                var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
                var seconds = sec_num - (hours * 3600) - (minutes * 60);

                if (hours   < 10) {hours   = "0"+hours;}
                if (minutes < 10) {minutes = "0"+minutes;}
                if (seconds < 10) {seconds = "0"+seconds;}
                return hours+':'+minutes+':'+seconds;
            }
        }
    });

    chart.on("created", function () {
        $('.ct-chart-line .ct-point').mouseover(function (event) {
            var val = $(this).attr("ct:value");
            $("#date").html(dates[times.indexOf(parseInt(val))]);
            var sec_num = parseInt(val, 10);
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            var to = hours+':'+minutes+':'+seconds;
            $("#time").html(to);

            $("#data_shower").css({ visibility:'visible', left: event.pageX, top: event.pageY - 60 });
            $("#data_shower").animate({'opacity': '1'}, 400);
            $("#data_shower").parent().css({cursor:'pointer'});
        });

        $('.ct-chart-line .ct-point').mouseout(function () {
            $("#data_shower").animate({'opacity': '0'}, 400, function () {
                $("#data_shower").css({ visibility:'hidden', left: "0", top: "0" });
                $("#data_shower").parent().css({cursor:'auto'});
            });

        });
    });
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function tm(sec_num) {
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+' hours '+minutes+' minutes '+seconds + " seconds";
}


function showPassChanger() {
    $('#change_pass_tab').css('color', '#ffffff');
    $('#change_user_tab').css('color', '#a0a295');
    $('#change_pass_box').css('display', 'block');
    $('#change_user_box').css('display', 'none');
}

function showUserDataChanger() {
    $('#change_pass_tab').css('color', '#a0a295');
    $('#change_user_tab').css('color', '#ffffff');
    $('#change_pass_box').css('display', 'none');
    $('#change_user_box').css('display', 'block');
}

function normalizeCabinet() {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var templW = $('#templates').width();
    $('.template_box').css({
        width: (templW / 4 - 40) + "px"
    });
    $('#drop_menu').css({
        left: w - 510 + "px"
    });
    $('#change_menu_wrapper').css('height', h + 'px');

}

function createProject() {
    var prjName = $('#projectName').val();
    $('#projectName').val('');
    //empty-featured2-1.png
    var get;
    var query = "data=" + prjName;
    $.ajax({
        url: 'database_scripts/file_creator.php',
        type: 'POST',
        data: query,
        dataType: "text",
        success: function (data) {
            get = data + "=images/1234.png&";
            generateProjectTemplate(get);
            showProjectFeild();
        }
    });
}

// get string : "path=timer=image&path=timer=image..."
function generateProjectTemplate(data) {
    // test data: data = 'SomeName=1023323=images/logo.jpg&SomeName=1023323=images/logo2.jpg';
    var projects = data.split('&');
    for (var i = 0; i < projects.length - 1; ++i) {
        var prjData = projects[i].split('=');
        var newEl =
            '<div class="template_box"><div class="template_img" style="background: url('+ prjData[2] +
            '); background-size: 100% 100%;"></div><div class="template_name">' + prjData[0] +
            '</div><div class="template_time">' + prjData[1] +
            '</div></div>';
        $('#templates').append(newEl);
    }
    normalizeCabinet();
}

function showProjectFeild() {
    if ($('#createForm').css('visibility') == 'hidden') {
        $('#createForm').css('visibility', 'visible');
        $('#projectName').val("");
    } else {
        $('#createForm').css('visibility', 'hidden');
    }

}

function dropMenu() {
    if ($('#drop_menu').css('visibility') == 'hidden') {
        $('#drop_menu').css('visibility', 'visible');
    } else {
        $('#drop_menu').css('visibility', 'hidden');
    }
}

function showChangeMenu() {
    if ($('#change_menu_wrapper').css('display') == 'block') {
        $('#change_menu_wrapper').css('display', 'none');
        $('#change_menu_panel').css('display', 'none');
    } else {
        $('#change_menu_wrapper').css('display', 'block');
        $('#change_menu_panel').css('display', 'block');

    }
}


function serializeUserForm() {
    var result = "email=";
    result += $('#input_email').val();
    result += "&name=";
    result += $('#input_login').val();
    result += "&phone=";
    result += $('#input_phone').val();
    result += "&country=";
    result += $('#input_country').val();
    alert(result);
}

function confirmNewPassword() {
    if (checkPassword()) {
        var password = "password=" + $('#input_new_pass').val();

        //sending to DB...
    }
}

function checkPrevPassword(prevPass) {
    // prevPass - string
    // return true; if input is equal to DB value
}

function checkPassword() {
    var newPass = $('#input_new_pass').val();
    var prevPass = $('#input_prev_pass').val();

    if (!checkPrevPassword(prevPass)) {
        borderRed('input_prev_pass');
        $('#prev_pass_error').html('Password is incorrect');
        return false;
    }

    if (newPass.length < 6) {
        borderRed('input_new_pass');
        $('#new_pass_error').html('Password must contain at least 6 symbols');
        return false;
    }

    var pattern = /^[a-z0-9_-]{6,18}$/i;
    if (!pattern.test(newPass)) {
        borderRed('input_new_pass');
        $('#new_pass_error1').html('Password contains irregular symbols');
        return false;
        // Invalid
    }
    return true;

}

function checkCountry() {
    var country = $('#input_country').val();
    if (country.length == 0)
        return true;
    if (country.indexOf(' ') != 0) {
        var pattern = /^[a-zA-Zа-яА-ЯЇї()-]{2,28}$/i;
        if (!pattern.test(country)) {
            borderRed('input_country');
            $('#country_error').html('Invalid input');
            return false;
        }
    }
    return true;
}

function checkPhone() {
    var phone = $('#input_phone').val();
    if (phone.length == 0)
        return true;
    if (phone.indexOf(' ') != 0) {
        var pattern = /^[0-9()-]{6,18}$/i;
        if (!pattern.test(phone)) {
            borderRed('input_phone');
            $('#phone_error').html('Invalid phone');
            return false;
        }
    }
    return true;
}

function checkEmail() {
    var email = $('#input_email').val();
    if (email == "") {
        borderRed('input_email');
        $('#email_error').html('This field is required');
        return false;
    } else {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if(!pattern.test(email)) {
            borderRed('input_email');
            $('#email_error').html('Invalid input');
            return false;
        }
    }
    var data = "email=" + $('#input_email').val();
    $.ajax({
        url: 'database_scripts/emailChecker.php',
        type: 'POST',
        data: data,
        dataType: 'text',
        success: function (data) {
            if (data.indexOf('yes') == -1) {
                borderRed('input_email');
                $('#email_error').html('Email exists');
            }
        }
    });
    return $('#email_error').html().length == 0;
}

function borderRed(id) {
    $('#' + id).css('border', '1px solid red');
}

function borderDefault(id) {
    $('#' + id).css('border', '1px solid #e7e7e7');
}

function confirmUserInfo() {
    if(checkUserInfo()) {
        var get = serializeUserForm();
        $.ajax({
            url: 'database_scripts/personal_changes.php',
            type: 'POST',
            data: get,
            dataType: 'text',
            success: function (data) {
                if (data != "OK") {
                    console.log("NOT OK");
                }
            }
        });
    }
}

function checkUserInfo() {
    return checkEmail() & checkPhone() & checkCountry();
}

