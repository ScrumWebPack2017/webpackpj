<?php
    require ("database_framework.php");
    include "database_connect.php";

    session_start();

    $sel_q = "SELECT `date` as 'date', `seconds` as 'seconds' FROM `WorkTime` 
            WHERE `userid` = (SELECT DISTINCT `id` FROM `User` WHERE `email` = '" . $_SESSION["user"] . "') ORDER BY 'date'";
    $result_sel = mysql_query($sel_q);
    if(!$result_sel) {
        echo "not sent: " . mysql_error();
        exit();
    }

    $result = "";

    while($row = mysql_fetch_array($result_sel)) {
        $result .= $row["date"] . "|" . $row["seconds"] . "$";
    }

    echo $result;
?>