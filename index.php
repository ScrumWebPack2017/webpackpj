<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="styles/common.css">
    <link rel="stylesheet" type="text/css" href="styles/editor.css">
    <link rel="stylesheet" type="text/css" href="styles/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="styles/panel.css">

    <script type="text/javascript" src="scripts/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="scripts/jquery-ui.js"></script>
    <script type="text/javascript" src="scripts/menus_and_elements.js"></script>
    <script type="text/javascript" src="scripts/jquery.treeview.js"></script>
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
                    <div class="auth_box" id="res_pass" style="font-size: 14px; margin-top: 0px">
                            <a href="database_scripts/additional/reset/reset_pass.html" style="color: #c2c7cb">  Reset password </a>
                    </div>
                    <div class="auth_box" style="padding-bottom: 0">
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
        <div id="elements_search">
            <input type="text" id="search_input" class="auth_input">
            <div id="search_ico"></div>
        </div>


        <ul class="elements" id="search_result">
            <span class="outer_element" id="shit"> Result </span>

        </ul>
        <ul id="red" class="treeview-red">
            <li>
                <span class="outer_element" id="shit">
                    <div class="el_arrow"></div>
                    Semantic elements
                </span>
                <ul class="elements">
                    <li>
                        <span class="inner_element" id="article"> &lt;article&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="aside"> &lt;aside&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="details"> &lt;details&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="figcaption"> &lt;figcaption&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="figure"> &lt;figure&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="footer"> &lt;footer&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="header"> &lt;header&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="main"> &lt;main&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="mark"> &lt;mark&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="nav"> &lt;nav&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="section"> &lt;section&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="summary"> &lt;summary&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="time"> &lt;time&gt; </span>
                    </li>
                </ul>
            </li>
            <li>
                <span class="outer_element">
                    <div class="el_arrow"></div>
                    Forms
                </span>
                <ul class="elements">
                    <li>
                        <span class="inner_element" id="form"> &lt;form&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="select"> &lt;select&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="textarea"> &lt;textarea&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="input"> &lt;input&gt; </span>
                    </li>
                </ul>
            </li>
            <li>
                <span class="outer_element">
                    <div class="el_arrow"></div>
                    Tables
                </span>
                <ul class="elements">
                    <li>
                        <span class="inner_element" id="table"> &lt;table&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="tr"> &lt;tr&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="td"> &lt;td&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="th"> &lt;th&gt; </span>
                    </li>
                </ul>
            </li>
            <li>

                <span class="outer_element">
                    <div class="el_arrow"></div>
                    Block elements
                </span>
                <ul class="elements">
                    <li>
                        <span class="inner_element" id="div"> &lt;div&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="pre"> &lt;pre&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="p"> &lt;p&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="hr"> &lt;hr&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="blockquote"> &lt;blockquote&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="h1"> &lt;h1&gt; </span>
                    </li>
                </ul>
            </li>
            <li>
                <span class="outer_element">
                    <div class="el_arrow"></div>
                    Lists
                </span>
                <ul class="elements">
                    <li>
                        <span class="inner_element" id="dl"> &lt;dl&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="dt"> &lt;dt&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="dd"> &lt;dd&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="ol"> &lt;ol&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="ul"> &lt;ul&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="li"> &lt;li&gt; </span>
                    </li>
                </ul>
            </li>
            <li>
                <span class="outer_element" style="border-bottom: 1px solid #768888;">
                    <div class="el_arrow"></div>
                    Text formatting
                </span>
                <ul class="elements">
                    <li>
                        <span class="inner_element" id="span"> &lt;span&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="br"> &lt;br&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="a"> &lt;a&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="h1"> &lt;h1&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="pre"> &lt;pre&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="b"> &lt;b&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="i"> &lt;i&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="cite"> &lt;cite&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="em"> &lt;em&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="img"> &lt;img&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="small"> &lt;small&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="strong"> &lt;strong&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="sub"> &lt;sub&gt; </span>
                    </li>
                    <li>
                        <span class="inner_element" id="sup"> &lt;sup&gt; </span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>

<div id="changes_menu" title="Changes menu">
</div>

<div id="vertical_context_menu">
    <div class="vertical_inner_icon" id="i_i_1"></div>
    <div onclick="showWin('layout_win')" class="vertical_inner_icon" id="i_i_2"></div>
    <div onclick="showWin('color_win')" class="vertical_inner_icon" id="i_i_3"></div>
    <div onclick="showWin('border_win')" class="vertical_inner_icon" id="i_i_4"></div>
    <div onclick="showWin('font_win')" class="vertical_inner_icon" id="i_i_5"></div>
</div>
<div class="near_block" id="layout_win">
    <div class="l_column">
        <div class="column_label">Color:</div>
        <div class="column_label">Size:</div>
        <div class="column_label">X-Shift:</div>
        <div class="column_label">Y-Shift:</div>
        <div class="column_label">Blur:</div>
    </div>
    <div class="r_column">
        <div class="column_label colors_in">
            <div class="shadow_types" id="full_shad">
                "outside"
            </div>
            <div class="shadow_types" id="grad_shad">
                "inside"
            </div>
            <div class="shadow_types" id="no_shad">
                "none"
            </div>
        </div>
        <div class="column_label slide"></div>
        <div class="column_label slide"></div>
        <div class="column_label slide"></div>
        <div class="column_label slide"></div>
    </div>
</div>
<div class="near_block" id="color_win">
    <div class="vertical_inner_icon" style="padding-top: 7px; height: 21px; !important; background: url('images/transparent_graphic.png') no-repeat;"></div>
    <div class="vertical_inner_icon" style="background: blue;"></div>
    <div class="vertical_inner_icon" style="background: orange;"></div>
    <div class="vertical_inner_icon" style="background: darkcyan;"></div>
    <div class="vertical_inner_icon" style="background: pink;"></div>
    <div class="vertical_inner_icon" style="background: darkgreen;"></div>
    <div class="vertical_inner_icon" style="background: mediumpurple;"></div>
    <div class="vertical_inner_icon" style="background: saddlebrown;"></div>
    <div class="vertical_inner_icon" style="background: yellow"></div>
    <div class="vertical_inner_icon">
        <input type="color">
    </div>
</div>
<div class="near_block" id="border_win">
    <div class="l_column">
        <div class="column_label">Color:</div>
        <div class="column_label">Width:</div>
        <div class="column_label">Radius:</div>
        <div class="column_label" style="margin-top: 25px">Style:</div>
    </div>
    <div class="r_column" style="margin-top: -5px">
        <div class="column_label colors_in">
            <div class="border_types" style="background: #2a4852;">
            </div>
            <div class="border_types" style="background: url('images/transparent_graphic.png') no-repeat;">
            </div>
        </div>
        <div class="column_label slide"></div>
        <div class="column_label slide"></div>
        <div class="column_label colors_in" id="bord_list">
            <div class="border_types" style="border: 2px dotted #2a4852;">
                dotted
            </div>
            <div class="border_types" style="border: 2px dashed #2a4852;">
                dashed
            </div>
            <div class="border_types" style="border: 2px solid #2a4852;">
                solid
            </div>
            <div class="border_types" style="border: 2px double #2a4852;">
                double
            </div>
            <div class="border_types" style="border: 2px groove #2a4852;">
                groove
            </div>
            <div class="border_types" style="border: 2px ridge #2a4852;">
                ridge
            </div>
            <div class="border_types" style="border: 2px inset #2a4852;">
                inset
            </div>
            <div class="border_types" style="border: 2px outset #2a4852;">
                outset
            </div>
        </div>
    </div>
</div>
<div class="near_block" id="font_win">
    <div class="l_column" style="height: 149px">
        <div class="column_label">Color:</div>
        <div class="column_label">Border:</div>
        <div class="column_label">Font:</div>
        <div class="column_label">Size:</div>
    </div>
    <div class="r_column" style="height: 149px">
        <div class="column_label colors_in font_linear">
            <div class="border_types" style="background: #2a4852;">
            </div>
        </div>
        <div class="column_label colors_in font_linear">
            <div class="border_types" style="background: #2a4852;">
            </div>
            <div class="border_types" style="background: url('images/transparent_graphic.png') no-repeat;">
            </div>
        </div>
        <div class="column_label colors_in">
                <select class="op_picker" style="width: 170px; height: 25px">
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                </select>
        </div>
        <div class="column_label colors_in">
                <select class="op_picker" style="width: 170px; height: 25px">
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>12</option>
                    <option>14</option>
                    <option>18</option>
                    <option>24</option>
                    <option>28</option>
                    <option>32</option>
                </select>
        </div>
    </div>
    <div class="formatting">
        <div class="iconer" style="background: url('images/menu/font_icon_1.png') no-repeat; background-size: 100% 100%;"></div>
        <div class="iconer" style="background: url('images/menu/a.png') no-repeat; background-size: 100% 100%;"></div>
        <div class="iconer" style="background: url('images/menu/font_icon_3.png') no-repeat; background-size: 100% 100%;"></div>
        <div class="iconer" style="background: url('images/menu/font_icon_4.png') no-repeat; background-size: 100% 100%;"></div>
        <div class="iconer" style="background: url('images/menu/font_icon_5.png') no-repeat; background-size: 100% 100%;"></div>
        <div class="iconer" style="background: url('images/menu/font_icon_6.png') no-repeat; background-size: 100% 100%;"></div>
    </div>
</div>


<div id="source_code_wrapper"></div>
<div id="source_code_panel">
    <div id="source_code_control">
        <div class="source_icon" id="source_switch" onclick="source_switchTheme()">

        </div>
        <div class="source_icon" id="source_vsplit" onclick="source_vSplit()">

        </div>
        <div class="source_icon" id="source_hsplit" onclick="source_hSplit()">

        </div>
        <div class="source_icon" id="source_comment" onclick="source_comment()">

        </div>
        <div class="source_icon" id="source_uncomment" onclick="source_uncomment()">

        </div>
        <div class="source_icon" id="source_undo" onclick="source_undo()">

        </div>
        <div class="source_icon" id="source_repeat" onclick="source_repeat()">

        </div>
        <div class="out_btn source_icon" id="discard_changes" style="margin-left: 10px;" onclick="showSourceCode()">
            Close
        </div>
        <div class="out_btn source_icon" id="save_changes" onclick="closeWithChanges()">
            Save
        </div>
    </div>
    <div id="source_code_html" class="source_code_block">

    </div>
    <div id="source_code_css" class="source_code_block">

    </div>

</div>

</body>

</html>