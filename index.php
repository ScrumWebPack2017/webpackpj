<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="styles/common.css">
    <link rel="stylesheet" type="text/css" href="styles/editor.css">
    <link rel="stylesheet" type="text/css" href="styles/jquery-ui.css">

    <script type="text/javascript" src="scripts/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="scripts/jquery.treeview.js"></script>
    <script type="text/javascript" src="scripts/jquery-ui.js"></script>
    <script type="text/javascript" src="scripts/library.js"></script>
    <script type="text/javascript" src="scripts/html2canvas.js"></script>
    <script type="text/javascript" src="scripts/FileSaver.js"></script>

    <script type="text/javascript" src="scripts/graphicsEditor.js"></script>
    <script type="text/javascript" src="scripts/common.js"></script>
    <title>Title</title>
</head>

<body>
<header>
    <div class="header_elements" id="logo">

    </div>
    <div class="header_elements" id="top_menu">
        <div class="header_elements" id="header_menu_wrap">
            <div id="header_menu_tabs">
                <div class="menu_tab selected_tab" id="props1tab">
                    Properties1
                </div>
                <div class="menu_tab" id="props2tab">
                    Properties2
                </div>
                <div class="menu_tab" id="props3tab">
                    Properties3
                </div>
                <div class="menu_tab" id="source_code_btn">
                    Source code
                </div>
            </div>
            <div id="properties">
                <div id="props1" class="property_list" style="z-index: 5; visibility: visible">
                    <div class="property">
                        <div class="property_label"> Position </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Float </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Width </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Height </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Margin </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Padding </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Position </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Position </div>
                        <input class="property_input" type="text">
                    </div>
                </div>
                <div id="props2" class="property_list" style="z-index: 6">
                    <div class="property">
                        <div class="property_label"> Background </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Border </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Border-radius </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Height </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Margin </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Padding </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Position </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Position </div>
                        <input class="property_input" type="text">
                    </div>
                </div>
                <div id="props3" class="property_list" style="z-index: 7">
                    <div class="property">
                        <div class="property_label"> Font-size </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Color </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Text-decoration </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Height </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Margin </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Padding </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Position </div>
                        <input class="property_input" type="text">
                    </div>
                    <div class="property">
                        <div class="property_label"> Position </div>
                        <input class="property_input" type="text">
                    </div>
                </div>
            </div>
            <div id="status_line">
                <div id="left_btn" class="status_element" onclick="shiftLeftBar()"></div>
                <!--<div class="status_element" onclick="deleteFocused()" style="cursor: pointer">
                            Delete
                        </div>-->

                <div class="status_element">
                    Width:
                    <input class="status_input" id="current_width" type="text" disabled>

                </div>
                <div class="status_element">
                    Height:
                    <input class="status_input" id="current_height" type="text" disabled>
                </div>
                <div class="status_element">
                    Id:
                    <input class="status_input" id="current_id" type="text" style="width: 100px" disabled>
                </div>
                <!-- <div class="status_element" id="status_parent" onclick="parentFocus()" style="cursor: pointer">
                            Parent
                        </div>-->
                <div id="locker_ico" class="status_element" title="Lock\unlock focused element to enable\disable element interaction.">
                </div>
                <div id="camera_ico" class="status_element" title="Save workplace as image.">
                </div>
            </div>
        </div>
    </div>
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
                    <div class="auth_box" id="res_pass" style="font-size: 14px; margin-top: 1px">
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


</header>
<div id="workplace">
    <ul id="menu_tools">
        <li>
            <div><span class="ui-icon ui-icon-disk"></span>Save</div>
        </li>
        <li class="ui-state-disabled">
            <div onclick="detach_child()" id="detach_list"><span class="ui-icon ui-icon-arrowrefresh-1-e"></span>Detach</div>
        </li>
        <li>
            <div>Actions</div>
            </span>
            <ul>
                <li class="ui-state-disabled">
                    <div onclick="copy()" id="copy_list"><span class="ui-icon ui-icon-copy"></span>Copy</div>
                </li>
                <li class="ui-state-disabled">
                    <div onclick="cut()" id="cut_list"><span class="ui-icon ui-icon-scissors"></span>Cut</div>
                </li>
                <li class="ui-state-disabled">
                    <div onclick="paste()" id="paste_list"><span class="ui-icon ui-icon-clipboard"></span>Paste</div>
                </li>
                <li class="ui-state-disabled">
                    <div onclick="deleteFocused()" id="delete_list"><span class="ui-icon ui-icon-trash"></span>Delete</div>
                </li>
                <li>
                    <div onclick="$('#locker_ico').trigger('click')" id="lock_list"><span class="ui-icon ui-icon-locked"></span>Lock\Unlock</div>
                </li>
                <li class="ui-state-disabled">
                    <div onclick="parentFocus()" id="parentFoc_list"><span class="ui-icon ui-icon-extlink"></span>Focus Parent</div>
                </li>
                <li>
                    <div><span class="ui-icon ui-icon-arrowthick-1-n"></span>To Front</div>
                </li>
                <li>
                    <div><span class="ui-icon ui-icon-arrowthick-1-s"></span>To Back</div>
                </li>
            </ul>
        </li>
    </ul>
</div>
<div id="left_bar">
    <div id="left_menu">
        <ul id="red" class="treeview-red">
            <li>
                <span> Blocks </span>
                <ul class="elements">
                    <li id="el_div" class="element">
                        <span class="inner_element" id="div"> Div </span>
                    </li>
                    <li>
                        <span class="inner_element" id="span"> Span </span>
                    </li>
                    <li>
                        <span class="inner_element" id="p"> P </span>
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
<!--<div id="context_menu">
    <ul>
        <li>
            <div class="context_item" id="context_delete" onclick="deleteFocused()">
                Delete
            </div>
        </li>
        <li>
            <div class="context_item" id="context_styles">
                Show styles
            </div>
        </li>
        <li>
            <div class="context_item" id="context_1">
                choto eshe
            </div>
        </li>
        <li>
            <div class="context_item" id="context_2">
                i eshe
            </div>
        </li>
    </ul>
</div>-->

</body>

</html>
