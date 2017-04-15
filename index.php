<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="styles/common.css">
    <link rel="stylesheet" type="text/css" href="styles/editor.css">
    <link rel="stylesheet" type="text/css" href="styles/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="styles/panel.css">

    <script type="text/javascript" src="scripts/menus_and_elements.js"></script>
    <script type="text/javascript" src="scripts/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="scripts/jquery.treeview.js"></script>
    <script type="text/javascript" src="scripts/jquery-ui.js"></script>
    <script type="text/javascript" src="scripts/library.js"></script>
    <script type="text/javascript" src="scripts/html2canvas.js"></script>
    <script type="text/javascript" src="scripts/FileSaver.js"></script>
    <script src="scripts/src-min/ace.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript" src="scripts/jquery.ui.touch-punch.js"></script>
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
                        <select class="property_input">
                            <option>  </option>
                            <option> absolute </option>
                            <option> fixed </option>
                            <option> relative </option>
                            <option> static </option>
                            <option> inherit </option>
                        </select>
                        <!--<input class="property_input" type="text"> -->
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
        <li>
            <div onclick="showChangesWindow()"><span class="ui-icon ui-icon-clock"></span>Changes</div>
        </li>
    </ul>
</div>
<div id="left_bar">
    <div id="left_menu">
        <input type="text" id="elements_search" class="auth_input">

        <ul class="elements" id="search_result">
            <span class="outer_element" id="shit"> Result </span>

        </ul>
        <ul id="red" class="treeview-red">
            <li><span class="outer_element" id="shit"> Semantic elements </span>
                <ul class="elements">
                    <li>
                        <span class="inner_element" id="article"> Article </span>
                    </li>
                    <li>
                        <span class="inner_element" id="aside"> Aside </span>
                    </li>
                    <li>
                        <span class="inner_element" id="details"> Details </span>
                    </li>
                    <li>
                        <span class="inner_element" id="figcaption"> Figcaption </span>
                    </li>
                    <li>
                        <span class="inner_element" id="figure"> Figure </span>
                    </li>
                    <li>
                        <span class="inner_element" id="footer"> Footer </span>
                    </li>
                    <li>
                        <span class="inner_element" id="header"> Header </span>
                    </li>
                    <li>
                        <span class="inner_element" id="main"> Main </span>
                    </li>
                    <li>
                        <span class="inner_element" id="mark"> Mark </span>
                    </li>
                    <li>
                        <span class="inner_element" id="nav"> Nav </span>
                    </li>
                    <li>
                        <span class="inner_element" id="section"> Section </span>
                    </li>
                    <li>
                        <span class="inner_element" id="summary"> Summary </span>
                    </li>
                    <li>
                        <span class="inner_element" id="time"> Time </span>
                    </li>
                </ul>
            </li>
            <li><span class="outer_element"> Forms </span>
                <ul class="elements">
                    <li>
                        <span class="inner_element" id="form"> Form </span>
                    </li>
                    <li>
                        <span class="inner_element" id="select"> Select </span>
                    </li>
                    <li>
                        <span class="inner_element" id="option"> Option </span>
                    </li>
                    <li>
                        <span class="inner_element" id="textarea"> Textarea </span>
                    </li>
                    <li>
                        <span class="inner_element" id="input"> Input </span>
                    </li>
                </ul>
            </li>
            <li><span class="outer_element"> Tables </span>
                <ul class="elements">
                    <li>
                        <span class="inner_element" id="table"> Table </span>
                    </li>
                    <li>
                        <span class="inner_element" id="tr"> Tr </span>
                    </li>
                    <li>
                        <span class="inner_element" id="td"> Td </span>
                    </li>
                    <li>
                        <span class="inner_element" id="th"> Th </span>
                    </li>
                </ul>
            </li>
            <li><span class="outer_element"> Block elements </span>
                <ul class="elements">
                    <li>
                        <span class="inner_element" id="div"> Div </span>
                    </li>
                    <li>
                        <span class="inner_element" id="pre"> Pre </span>
                    </li>
                    <li>
                        <span class="inner_element" id="p"> P </span>
                    </li>
                    <li>
                        <span class="inner_element" id="hr"> Hr </span>
                    </li>
                    <li>
                        <span class="inner_element" id="blockquote"> Blockquote </span>
                    </li>
                    <li>
                        <span class="inner_element" id="h1"> H1 </span>
                    </li>
                </ul>
            </li>
            <li><span class="outer_element"> Lists </span>
                <ul class="elements">
                    <li>
                        <span class="inner_element" id="dl"> Dl </span>
                    </li>
                    <li>
                        <span class="inner_element" id="dt"> Dt </span>
                    </li>
                    <li>
                        <span class="inner_element" id="dd"> Dd </span>
                    </li>
                    <li>
                        <span class="inner_element" id="ol"> Ol </span>
                    </li>
                    <li>
                        <span class="inner_element" id="ul"> Ul </span>
                    </li>
                    <li>
                        <span class="inner_element" id="li"> Li </span>
                    </li>
                </ul>
            </li>
            <li><span class="outer_element"> Text formatting </span>
                <ul class="elements">
                    <li>
                        <span class="inner_element" id="span"> Span </span>
                    </li>
                    <li>
                        <span class="inner_element" id="br"> Br </span>
                    </li>
                    <li>
                        <span class="inner_element" id="a"> A </span>
                    </li>
                    <li>
                        <span class="inner_element" id="h1"> H1 </span>
                    </li>
                    <li>
                        <span class="inner_element" id="pre"> Pre </span>
                    </li>
                    <li>
                        <span class="inner_element" id="b"> B </span>
                    </li>
                    <li>
                        <span class="inner_element" id="i"> I </span>
                    </li>
                    <li>
                        <span class="inner_element" id="cite"> Cite </span>
                    </li>
                    <li>
                        <span class="inner_element" id="em"> Em </span>
                    </li>
                    <li>
                        <span class="inner_element" id="img"> Img </span>
                    </li>
                    <li>
                        <span class="inner_element" id="small"> Small </span>
                    </li>
                    <li>
                        <span class="inner_element" id="strong"> Strong </span>
                    </li>
                    <li>
                        <span class="inner_element" id="sub"> Sub </span>
                    </li>
                    <li>
                        <span class="inner_element" id="sup"> Sup </span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>

<div id="changes_menu" title="Changes menu">
</div>

<div id="source_code_wrapper">

</div>
<div id="source_code_panel">
    <div id="source_code_html" class="source_code_block">

    </div>
    <div id="source_code_css" class="source_code_block">

    </div>
</div>

</body>

</html>