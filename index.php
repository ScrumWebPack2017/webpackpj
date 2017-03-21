<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="styles/common.css">
    <script type="text/javascript" src="scripts/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="scripts/common.js"></script>
    <title>Title</title>
</head>
<body>
    <header>
        <div id="user_block">
            <?php
            if(!$_SESSION['user'] && !$_SESSION['uname'])
                echo
                '<form id="authorization_form">
                    <div class="auth_box">
                        <input type="text" id="email_input" name="email" class="auth_input" placeholder="E-mail">
                    </div>
                    <div class="auth_box">
                        <input type="password" id="pass_input" name="password" class="auth_input" placeholder="Password">
                    </div>
                    <div id="error_lbl"></div>
                    <div class="auth_box">
                        <div class="auth_btns" style="padding-right: 12px">
                            <input type="submit" class="auth_btn" id="signin_btn" value="Sign In">
                        </div>
                        <div class="auth_btns" style="font-size: 18px; padding: 4px 0 0 0;">
                            <a href="database_scripts/additional/reset/reset_pass.html">  Reset password </a>
                        </div>
                    </div>
                </form>
                <br>
                <div class="auth_box" id="reg_btn_box" style="padding-top: 28px">
                    <a href="registration.html"> <button class="auth_btn" id="reg_btn"> Registration </button> </a>
                </div>';
                else echo '
                    <div class="auth_box">
                        Hello,'.$_SESSION['uname'].'!
                    </div>
                    <div class="auth_box">
                        <a href=""> Personal cabinet </a>
                    </div>
                    <div class="auth_box" onclick="logOut()" id="logOut">
                        Log Out
                    </div>
                ';
            ?>
        </div>

    </header>
    <div id="content">

    </div>
    <div id="left_bar">

    </div>
</body>
</html>