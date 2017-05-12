<?php
    require ("database_framework.php");
    include "database_connect.php";

    session_start();

    if(!$_POST["data"] && !$_SESSION["file"]) {
        echo "post fail";
        exit();
    }

    $file = fopen("..\\userprojects\\" . $_SESSION["user"] . "\\" . $_SESSION["file"], "w+");

    fwrite($file, $_POST["data"]);
    $date_format = date('Y/m/d');
    $date = date('Y/m/d H:i:s');

    $sel_query = "SELECT DISTINCT `date` FROM `WorkTime` WHERE `date` = '" . $date_format . "'";
    $result_sel = mysql_query($sel_query);
    if(!$result_sel) {
        echo "not sent: " . mysql_error();
        exit();
    }

    if(mysql_num_rows($result_sel) == 0) {
        $sel_query_id = "SELECT `id` as 'ide' FROM `User` GROUP BY 'ide'";
        $result_sel_id = mysql_query($sel_query_id);
        if(!$result_sel_id) {
            echo "not sent: " . mysql_error();
            exit();
        }

        while($row = mysql_fetch_array($result_sel_id)) {
            $in_query_id = "INSERT INTO `WorkTime` (`userid`, `date`) VALUES ('" . $row['ide'] . "', '" . $date_format . "')";
            $in_sel_id = mysql_query($in_query_id);
            if(!$in_sel_id) {
                echo "not sent: " . mysql_error();
                exit();
            }
        }
    }

    $seconds = $_POST['secs'];

    $upd_query = "UPDATE `WorkTime` SET `seconds` = `seconds` + " . $seconds . " 
                    WHERE `userid` = (SELECT DISTINCT `id` FROM `User` WHERE `email` = '" . $_SESSION["user"] . "')";
    $result_upd = mysql_query($upd_query);
    if(!$result_upd) {
        echo "not sent: " . mysql_error();
        exit();
    }

    $insert_query = "UPDATE `Projects` SET `timer` = '" . $date . "' WHERE `path` = '" . $_SESSION["file"] . "'";
    $result_insert = mysql_query($insert_query);
    if(!$result_insert) {
        echo "not sent: " . mysql_error();
        exit();
    }
    echo $date;
?>