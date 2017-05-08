<?php
    require ("database_framework.php");
    include "database_connect.php";

    session_start();

    if(!$_POST["pjname"] && !$_SESSION["user"]) {
        echo "post fail";
        exit();
    }

    $del_query = "DELETE FROM `Projects` WHERE `Projects`.`path` = '" . $_POST["pjname"] . "' 
            AND `Projects`.`userid` = (SELECT DISTINCT `id` FROM `User` WHERE `User`.`email` = '" . $_SESSION["user"] . "')";
    $result_del = mysql_query($del_query);
    if(!$result_del) { //вдруг не удалось сделать запрос
        echo "not sent: " . mysql_error();
        exit();
    }

    $pts = "..\\userprojects\\" . $_SESSION["user"] . "\\" . $_POST["pjname"];

    if(!unlink($pts)) {
        echo "critical error";
        exit();
    }

    echo "OK";

?>