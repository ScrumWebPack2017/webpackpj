window.onload = function() {
    centerize();
    $('#registration_form').submit(function(e) {
        e.preventDefault();
        if (validateRegistration())
            sendRegistration();
        else
            errorRegistration();
    });

    instaRegCheck();
};

function instaRegCheck() {

    $('#pass_input1').keyup(function() {
        var p1 = $('#pass_input1').val();
        var p2 = $('#pass_input2').val();
        if (p1 == p2) {
            borderDefault('pass_input2');
            $('#pass2_msg').html('');
        }
        centerize();
    });

    $('#pass_input1').blur(function() {
        var p1 = $('#pass_input1').val();
        var p2 = $('#pass_input2').val();

        if (p1.length < 6) {
            borderRed('pass_input1');
            $('#pass1_msg').html('Password must contain at least 6 symbols');
        }
        if (p2 != p1 && p2 != "") {
            borderRed('pass_input2');
            $('#pass2_msg').html('Passwords are not equal');
        } else if (p1 == p2) {
            borderDefault('pass_input2');
            $('#pass2_msg').html('');
        }
        var pattern = /^[a-z0-9_-]{6,18}$/i;
        if (!pattern.test(p1)) {
            borderRed('pass_input1');
            $('#pass1_msg2').html('Password contains irregular symbols');
        }
        normalizeBorders();
        centerize();
    });

    $('#pass_input2').blur(function() {
        var p1 = $('#pass_input1').val();
        var p2 = $('#pass_input2').val();

        if (p2 != p1) {
            borderRed('pass_input2');
            $('#pass2_msg').html('Passwords are not equal');
        }
        normalizeBorders();
        centerize();
    });

    $('#email_input').blur(function(e) {
        checkEmail();
        centerize();
    });

    $('#phone_input').blur(function() {
        checkPhone();
        centerize();
    });

    $('#country_input').blur(function() {
        checkCountry();
        centerize();
    });

    $('.reg_input').focus(function() {
        if (this.id == 'pass_input1') {
            borderDefault(this.id);
            $('#pass1_msg').html('');
            $('#pass1_msg2').html('');
        } else if (this.id == 'pass_input2') {
            $('#pass2_msg').html('');
            borderDefault(this.id);
        } else if (this.id == 'email_input') {
            borderDefault(this.id);
            $('#email_msg').html('');
        } else if (this.id == 'phone_input') {
            borderDefault(this.id);
            $('#phone_msg').html('');
        } else if (this.id == 'country_input') {
            borderDefault(this.id);
            $('#country_msg').html('');
        }
        normalizeBorders();
        centerize();
    });
}

function centerize() {
    var height = document.body.scrollHeight;
    $('#registration').css('top', (height - $('#registration').css('height').split('p')[0] - 40)/2);
}

// Checkers :
function checkCountry() {
    var country = $('#country_input').val();
    if (country.length == 0)
        return true;
    if (country.indexOf(' ') != 0) {
        var pattern = /^[a-zA-Zа-яА-ЯЇї()-]{2,28}$/i;
        if (!pattern.test(country)) {
            borderRed('country_input');
            $('#country_msg').html('Invalid input');
            return false;
        }
    }
    return true;
}

function checkPhone() {
    var phone = $('#phone_input').val();
    if (phone.length == 0)
        return true;
    if (phone.indexOf(' ') != 0) {
        var pattern = /^[0-9()-]{6,18}$/i;
        if (!pattern.test(phone)) {
            borderRed('phone_input');
            $('#phone_msg').html('Invalid phone');
            return false;
        }
    }
    return true;
}

function checkEmail() {
    var email = $('#email_input').val();
    if (email == "") {
        borderRed('email_input');
        $('#email_msg').html('This field is required');
        return false;
    } else {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if(!pattern.test(email)) {
            borderRed('email_input');
            $('#email_msg').html('Invalid input');
            return false;
        }
    }
    var data = "email=" + $('#email_input').val();
    $.ajax({
        url: 'database_scripts/emailChecker.php',
        type: 'POST',
        data: data,
        dataType: 'text',
        success: function (data) {
            if (data.indexOf('yes') == -1) {
                borderRed('email_input');
                $('#email_msg').html('Email is exists');
            }
        }
    });
    return $('#email_msg').val().length == 0;
}

function normalizeBorders() {
    if ($('#pass1_msg').html() == '' && $('#pass1_msg2').html() == '') {
        borderDefault('pass1_input');
    }
    if ($('#pass2_msg').html() == '') {
        borderDefault('pass_input2');
    }
}

function validateRegistration() {
    return checkEmail() && checkPassword() && checkPhone() && checkCountry();
}

function borderRed(id) {
    $('#' + id).css('border', '1px solid red');
}

function borderDefault(id) {
    $('#' + id).css('border', '1px solid #e7e7e7');
}

function checkPassword() {
    var p1 = $('#pass_input1').val();
    var p2 = $('#pass_input2').val();

    if (p1 == "") {
        borderRed('pass_input1');
        borderRed('pass_input2');
        return false;
        // Clear field
    }
    if (p1 != p2) {
        borderRed('pass_input1');
        borderRed('pass_input2');
        return false;
        // Not equal
    }
    var pattern = /^[a-z0-9_-]{6,18}$/i;
    if (!pattern.test(p1)) {
        borderRed('pass_input1');
        borderRed('pass_input2');
        return false;
        // Invalid
    }
    return true;

}

function sendRegistration() {
    var data = $('#registration_form').serialize();
    $.ajax({
        url: 'database_scripts/reg_script.php',
        type: 'POST',
        data: data,
        dataType: 'text',
        success: function (data) {
            alert(data);
        }
    });
}

function errorRegistration() {
    alert("Error");
}
