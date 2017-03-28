<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="styles/common.css">
    <link rel="stylesheet" type="text/css" href="styles/editor.css">

    <script type="text/javascript" src="scripts/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="scripts/jquery.treeview.js"></script>

    <script type="text/javascript" src="scripts/graphicsEditor.js"></script>
    <script type="text/javascript" src="scripts/common.js"></script>
    <title>Title</title>
</head>
<body>
    <header>
        <div class="header_elements" id="user_block">
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
                    <div class="auth_box" style="font-size: 14px">
                            <a href="database_scripts/additional/reset/reset_pass.html">  Reset password </a>
                    </div>
                    <div class="auth_box" style="padding-bottom: 0px">
                            <input type="submit" class="auth_btn"  value="Sign In">
                    </div>
                </form>
               
                <div class="auth_box" id="reg_btn_box" style="">
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
        <div class="header_elements" id="top_menu">
            <div class="header_elements" id="header_menu_wrap">
                <div id="header_menu_tabs">
                    <div class="menu_tab selected_tab">
                        Properties1
                    </div>
                    <div class="menu_tab">
                        Properties2
                    </div>
                    <div class="menu_tab">
                        Properties3
                    </div>
                    <div class="menu_tab" id="source_code_btn">
                        Source code
                    </div>
                </div>
            </div>
        </div>
        <div class="header_elements" id="logo">

        </div>
    </header>
    <div id="content">

    </div>
    <div id="left_bar">
        <div id="left_btn_col">
            <div id="left_btn" onclick="shiftLeftBar()">
                <!-- <img src="images/arrLeft.png" id="left_col_img" width="20"> -->
            </div>
        </div>
        <div id="left_menu">
            <ul id="red" class="treeview-red">
                <li> <span>Item 1</span>
                    <ul class="elements">
                        <li><span>Item 1.0</span>

                        </li>
                        <li><span>Item 1.1</span></li>
                        <li><span>Item 1.2</span>

                        </li>
                    </ul>
                </li>
                <li> <span>Item 2</span>
                    <ul class="elements">
                        <li><span>Item 2.0</span>

                        </li>
                        <li><span>Item 2.1</span>

                        </li>
                    </ul>
                </li>
                <li><span>Item 3</span>
                    <ul class="elements">
                        <li><span>Item 3.0</span>

                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</body>
</html>