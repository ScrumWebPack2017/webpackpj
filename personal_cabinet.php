<?php session_start() ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="scripts/chartist.css">
    <link rel="stylesheet" type="text/css" href="styles/cabinet.css">


    <script type="text/javascript" src="scripts/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="scripts/jquery-ui.js"></script>
    <script type="text/javascript" src="scripts/cabinet.js"></script>
    <script type="text/javascript" src="scripts/chartist.js"></script>

    <!--
    <script type="text/javascript" src="scripts/menus_and_elements.js"></script>
    <script type="text/javascript" src="scripts/jquery.treeview.js"></script>
    <script type="text/javascript" src="scripts/library.js"></script>
    <script type="text/javascript" src="scripts/html2canvas.js"></script>
    <script type="text/javascript" src="scripts/FileSaver.js"></script>
    <script src="scripts/src-min/ace.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" src="scripts/jquery.ui.touch-punch.js"></script>
    <script type="text/javascript" src="scripts/graphicsEditor.js"></script>
    <script type="text/javascript" src="scripts/common.js"></script>
    <script type="text/javascript" src="scripts/colResizable-1.6.js"></script>
    -->
</head>
<body>
    <div id="data_shower">
        <div id="date"></div>
        <div id="time"></div>
    </div>
    <div id="wrapper">
        <div id="top">
            <div id="top_logo">
                <img src="images/cabinet/logo.jpg" height="62">
            </div>

            <!-- float changed -->
            <div id="top_menu_box" class="top" style="margin: 0 40px 0 40px;">
                <img src="images/cabinet/menu.jpg" height="30" style="cursor: pointer;" onclick="dropMenu()">
            </div>
            <div id="top_name_box" class="top">
                <div id="top_name">
                    Unknown rhino
                </div>
            </div>
            <div id="top_photo_box" class="top" style="margin-right: 40px;">
                <div id="top_photo">
                    <img src="images/png/boy-0.png">
                </div>
            </div>

        </div>
        <div id="chart_container">
            <div id="upper_line">
                <div id="query_chart">
                    <div id="chart_column">
                        <div class="query_btn" onclick="loadTime()" id="btn_1">Work Time</div>
                        <div class="query_btn" onclick="loadPjs()" id="btn_2">Projects</div>
                    </div>
                    <div id="text_area_block">
                        <div class="image_block">

                        </div>
                    </div>
                </div>
            </div>
            <div class="chart_bar"></div>
        </div>
        <div id="control_wrapper">
            <div id="control">
                <div class="control_element" id="load_btn">
                    <img src="images/cabinet/icons_DB/iconDB1.png" width="46" style="cursor: pointer">
                </div>
                <div class="control_element" id="delete_btn">
                    <img src="images/cabinet/icons_DB/iconDB2.png" width="46" style="cursor: pointer">
                </div>
                <div class="control_element">
                    <img src="images/cabinet/icons_DB/iconDB3.png" width="46" style="cursor: pointer" onclick="showProjectFeild()">
                </div>
                <div class="control_element" id="createForm" style="margin-left: 40px">
                    <input type="text" id="projectName" class="control_element" style="margin-right: -34px;">
                        <div class="control_element" id="createBtn">
                            <img src="images/cabinet/icons_DB/iconsDB_04.gif" width="50" style="cursor: pointer">
                        </div>
                </div>
            </div>
        </div>

        <div id="templates_wrapper">
            <div id="templates">
                <!--
                <div class="template_box">
                    <div class="template_img">

                    </div>
                    <div class="template_name">
                        MyProject1
                    </div>
                    <div class="template_time">
                        1 year ago
                    </div>
                </div>
                -->
            </div>
        </div>
    </div>

    <div id="drop_menu">
        <div class="drop_menu_line">
            <div class=" drop drop_left">
                E-mail:
            </div>
            <div class="drop drop_center"  id="drop_email">
                testemail...
            </div>
            <div class="drop drop_center"  id="drop_email_input" style="display: none">
                <input class="drop_input" type="text" id="input_email">
            </div>
            <div class="drop drop_right">
                <img src="images/cabinet/top_arrow.jpg" height="34" style="cursor: pointer;" onclick="dropMenu()">
            </div>
        </div>
        <div class="drop_menu_line">
            <div class="drop drop_left">
                Login
            </div>
            <div class="drop drop_center" id="drop_login">
                -
            </div>
            <div class="drop drop_center" id="drop_login_input" style="display: none">
                <input class="drop_input" type="text" id="input_login">
            </div>
            <div class="drop drop_right">
                <img src="images/cabinet/pencil.jpg" height="34" style="cursor: pointer;" onclick="showChangeMenu()">
            </div>
        </div>
        <div class="drop_menu_line">
            <div class="drop drop_left">
                Phone:
            </div>
            <div class="drop drop_center"  id="drop_phone">
                380669341903
            </div>
            <div class="drop drop_center"  id="drop_phone_input" style="display: none">
                <input class="drop_input" type="text" id="input_phone">
            </div>
            <div class="drop drop_right">
                <img src="images/cabinet/stats.jpg" onclick="showChartMenu()" height="34" style="cursor: pointer;">
            </div>
        </div>
        <div class="drop_menu_line">
            <div class="drop drop_left">
                Country:
            </div>
            <div class="drop drop_center" id="drop_country">
                Ukraine
            </div>
            <div class="drop drop_center" id="drop_country_input" style="display: none">
                <input  class="drop_input" type="text" id="input_country">
            </div>
            <div class="drop drop_right">
                <img src="images/cabinet/exit.jpg" height="34" style="cursor: pointer;" onclick="logOut()">
            </div>
        </div>
        <div id="change_line" style="display: none">
            <div id="user_info_confirm" onclick="confirmUserInfo()" class="confirmBtn" style="cursor: pointer;">
                Confirm
            </div>
        </div>



    </div>

    <div id="change_menu_wrapper" onclick="showChangeMenu()"> </div>
    <div id="change_menu_panel">
        <div id="tab_line">
            <div id="change_user_tab" class="tab" onclick="showUserDataChanger()">
                Change personal data
            </div>
            <div id="change_pass_tab" class="tab" onclick="showPassChanger()" style="border-right: none;">
                Change password
            </div>
        </div>

        <div id="changers_wrapper">
            <div id="change_user_box" class="change_box">
                <div class="change_line">
                    <div class="descr">
                        E-mail:
                    </div>
                    <div class="inputs">
                        <!--  <input type="text" id="input_email"> -->
                    </div>
                    <div id="email_error" class="error_changer"></div>
                </div>

                <div class="change_line">
                    <div class="descr">
                        Login:
                    </div>
                    <div class="inputs">

                    </div>
                    <div id="login_error" class="error_changer"></div>
                </div>

                <div class="change_line">
                    <div class="descr">
                        Phone:
                    </div>
                    <div class="inputs">
                    </div>
                    <div id="phone_error" class="error_changer"></div>
                </div>

                <div class="change_line">
                    <div class="descr">
                        Country:
                    </div>
                    <div class="inputs">

                    </div>
                    <div id="country_error" class="error_changer"></div>
                </div>

            </div>

            <div id="change_pass_box" class="change_box">
                <div class="change_line">
                    <div class="descr">
                        Enter previous password:
                    </div>
                    <div class="inputs">
                        <input type="password" id="input_prev_pass">
                    </div>
                    <div id="prev_pass_error" class="error_changer"></div>
                </div>
                <div class="change_line">
                    <div class="descr">
                        Enter new password:
                    </div>
                    <div class="inputs">
                        <input type="password" id="input_new_pass">
                    </div>
                    <div id="new_pass_error" class="error_changer"></div>
                    <div id="new_pass_error1" class="error_changer"></div>
                </div>
                <div class="change_line">
                    <div id="password_confirm" onclick="confirmNewPassword()" class="confirmBtn">
                        Confirm
                    </div>
                </div>
            </div>
        </div>

    </div>


    <div id="ajax"></div>
</body>
</html>
