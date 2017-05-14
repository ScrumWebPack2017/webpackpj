<?php
    require ("database_framework.php");
    include "database_connect.php";

    session_start();

    if(!$_SESSION["user"]) {
        echo "post error";
        exit();
    }

    $email = $_SESSION["user"];

    $select_q = "SELECT `path` as 'name' FROM `Projects` WHERE `userid` = (SELECT DISTINCT `id` FROM `User` WHERE `email` = '" . $email . "') ORDER BY 'name'";
    $q = mysql_query($select_q);
    if(!$q) {
        echo "retrieve error: " . mysql_error();
        exit();
    }

    $result = "";

    while($row = mysql_fetch_array($q)) {
        $file = fopen("..\\userprojects\\" . $email . "\\" . $row["name"], "r");
        $count = countFile($file);
        if($count == - 1) {
            echo "file error";
            exit();
        }
        $result .= $row["name"] . "|" . $count . "$";
        fclose($file);
    }

    echo $result;
?>