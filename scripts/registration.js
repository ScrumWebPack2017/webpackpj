window.onload = function() {
    $('#registration_form').submit(function(e) {
        e.preventDefault();
        if (validateRegistration()) {
            sendRegistration();
        }
        else
            errorRegistration();
    });

    instaRegCheck();
};

function checkEmail() {
    var email = $('#email_input').val();

    if (email == "") {
        borderRed('email_input');
        return false;
        // Clear field
    } else {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if(!pattern.test(email)) {
            borderRed('email_input');
            return false;
            // Invalid
        }
    }
    return true;
}

function instaRegCheck() {

    $('#pass_input1').blur(function() {
        var p1 = $('#pass_input1').val();
        var p2 = $('#pass_input2').val();

        if (p1 == "") {
            borderRed('pass_input1');
            // Clear field
        }
        if (p2 == "") {
            if (p1.length < 6) {
                borderRed('pass_input1');
                // Not long enough
            }
        } else {
            if (p1 != p2) {
                borderRed('pass_input1');
                borderRed('pass_input2');
                // Not equal
            }
        }
    });

    $('#pass_input2').blur(function() {
        var p1 = $('#pass_input1').val();
        var p2 = $('#pass_input2').val();

        if (p2 == "") {
            borderRed('pass_input2');
            // Clear field
        }
        if (p1 != p2) {
            borderRed('pass_input1');
            borderRed('pass_input2');
            // Not equal
        }
    });

    $('#email_input').blur(function() {
        checkEmail();
    });

}

function validateRegistration() {
    return checkEmail() && checkPassword();
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

    if (p1 == "" || p2 == "") {
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
    //alert(data);
    $.ajax({
        url: 'database_scripts/reg_script.php',
        type: 'POST',
        data: data,
        dataType: 'text',
        success: function (data) {
            alert("kek");
            alert(data);
        }
    });
}

function errorRegistration() {
    alert("Error");
}
