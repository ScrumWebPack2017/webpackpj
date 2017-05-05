<?php session_start() ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="styles/cabinet.css">

    <script type="text/javascript" src="scripts/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="scripts/jquery-ui.js"></script>
    <script type="text/javascript" src="scripts/cabinet.js"></script>
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
    <div id="wrapper">
        <div id="top">
            <div id="top_logo">
                <img src="images/cabinet/logo.jpg" height="90">
            </div>

            <!-- float changed -->
            <div id="top_menu_box" class="top" style="margin: 0 40px 0 40px;">
                <img src="images/cabinet/menu.jpg" height="40" style="cursor: pointer;">
            </div>
            <div id="top_name_box" class="top">
                <div id="top_name">
                    Unknown rhino
                </div>
            </div>
            <div id="top_photo_box" class="top" style="margin-right: 40px;">
                <div id="top_photo"></div>
            </div>

        </div>
        <div id="control_wrapper">
            <div id="control">
                <div class="control_element">
                    <img src="images/cabinet/addProject.jpg" width="50" style="cursor: pointer" onclick="showProjectFeild()">
                </div>
                <div class="control_element" id="createForm">
                    <input type="text" id="projectName" class="control_element">
                    <div id="createBtn" class="control_element" onclick="createProject()">
                        Add
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
</body>
</html>
