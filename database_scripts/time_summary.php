<?php
    require ("database_framework.php");
    include "database_connect.php";

    session_start();

    if(!$_SESSION["user"]) {
        echo "post error";
        exit();
    }

    $email = $_SESSION["user"];

    $qer = "SELECT `seconds` as 'secs', `date` as 'date' FROM `WorkTime` WHERE `userid` = 
                  (SELECT DISTINCT `id` FROM `User` WHERE `email` = '" . $email . "') ORDER BY `date` DESC LIMIT 3";
    $q = mysql_query($qer);
    if(!$q) {
        echo mysql_error();
        exit();
    }

    $result = 0;

    while($row = mysql_fetch_array($q)) {
        $result += intval($row["secs"]);
    }

    echo $result;
?>